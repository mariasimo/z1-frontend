import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import BackToHome from "./BackToHome";
import useCountDown from "./hooks/useCountDown";
import useWindowSize from "./hooks/useWindowSize";
import loader from "./assets/loader.svg";

import {
  Video,
  Title,
  Paragraph,
  CameraContainer,
  ContentsLayout,
  Canvas,
  CanvasContainer,
  Alert,
  Blur,
  Loading,
  CountDown,
  Button,
} from "./styles/components";
import { statusColor, statusIcon } from "./styles/utils";

const Camera = ({
  picture,
  setPicture,
  outcome,
  setOutcome,
  status,
}: {
  picture: string | undefined;
  setPicture: any;
  outcome: string | undefined;
  setOutcome: any;
  status: "accepted" | "rejected" | undefined;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const [loading, setLoading] = useState<boolean>(false);
  const [timeToCancel, readyToTakeImg] = useCountDown(5);
  const [canceled, setCancel] = useState(false);
  const controller = new AbortController();
  const [, setLocation] = useLocation();
  const endpoint = "https://front-exercise.z1.digital/evaluations";

  const submitImage: (img: string | undefined) => void = useCallback(
    (img) => {
      return fetch(endpoint, {
        signal: controller.signal,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ img: img }),
      })
        .then((response) => response.json())
        .then(({ summary: { outcome } }) => {
          setOutcome(outcome);
        })
        .catch((err) => {
          setOutcome(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [setPicture, setOutcome]
  );

  const takeImage = useCallback(() => {
    if (canvasRef.current) {
      var context = canvasRef.current.getContext("2d");
      if (context && videoRef.current && canvasRef.current) {
        context.drawImage(
          videoRef.current,
          canvasRef.current.getBoundingClientRect().x,
          canvasRef.current.getBoundingClientRect().y,
          videoRef.current.width,
          videoRef.current.height,
          0,
          0,
          videoRef.current.width + canvasRef.current.width,
          videoRef.current.height + canvasRef.current.height
        );
        videoRef.current.pause();

        const img = canvasRef.current.toDataURL("image/png");
        setPicture(img);
        submitImage(img);
      }
    }
  }, [submitImage, setPicture]);

  const manageCamera = useCallback(() => {
    const constrains: {
      video: boolean;
    } = {
      video: true,
    };

    navigator.mediaDevices
      .getUserMedia(constrains)
      .then(successCallback)
      .catch(errorCallback);

    function successCallback(stream: MediaStream | null): void {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        videoRef.current.addEventListener("canplay", () => {
          if (readyToTakeImg && !canceled) {
            setLoading(true);
            takeImage();
          }
        });
      }
    }
    function errorCallback(err: MediaStreamError): void {
      setOutcome(err.message);
    }
  }, [readyToTakeImg, takeImage, canceled, videoRef, setOutcome]);

  function handleCancel() {
    if (!canceled) {
      controller.abort();
      setCancel(controller.signal.aborted);
    }
    setLocation("/");
  }

  useEffect(() => {
    setOutcome("");
    setPicture("");
    manageCamera();
  }, [manageCamera, setOutcome, setPicture]);

  return (
    <CameraContainer className="camera">
      <Blur />
      <Video ref={videoRef} width={windowWidth} height={windowHeight}>
        Cámara no disponible
      </Video>
      <CanvasContainer>
        <Canvas
          ref={canvasRef}
          onClick={takeImage}
          color={status ? statusColor[status] : undefined}
        />
        {loading && <Loading src={loader} />}

        {outcome && (
          <Alert color={status && statusColor[status]}>
            {status && <img src={statusIcon[status]} alt="Status Icon" />}
            {outcome === "Approved" ? "Picture taken" : outcome}
          </Alert>
        )}
        {!readyToTakeImg && <CountDown>{timeToCancel}</CountDown>}
      </CanvasContainer>

      <ContentsLayout>
        <div className="item">
          <Title as="h1" color={"var(--color-text-inverse)"}>
            Scan your id
          </Title>
          <Paragraph color={"var(--color-text-inverse)"}>
            Take a picture. It may take time to validate your personal
            information.
          </Paragraph>
          {outcome === "Approved" && <BackToHome />}
        </div>

        <div className="item">
          <Button onClick={handleCancel} ghost={true}>
            {picture ? "Go back" : "Cancel"}
          </Button>
        </div>
      </ContentsLayout>
    </CameraContainer>
  );
};

export default Camera;
