import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import BackToHome from "./BackToHome";
import useCountDown from "./hooks/useCountDown";
import useWindowSize from "./hooks/useWindowSize";
import {
  Video,
  Container,
  Title,
  Paragraph,
  CameraContainer,
  ContentsLayout,
  Canvas,
  CanvasFeedbackOverlay,
  Blur,
} from "./styles/components";
import { statusColor } from "./styles/utils";

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
  const imgRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { width: windowWidth, height: windowHeight } = useWindowSize();

  const [newRequest, setNewRequest] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [timeToCancel, readyToTakeImg] = useCountDown(5);
  const [cancel, setCancel] = useState(false);
  const controller = new AbortController();
  const [, setLocation] = useLocation();
  const endpoint = "https://front-exercise.z1.digital/evaluations";

  const submitImage: (img: string | undefined) => void = useCallback(
    (img) => {
      setPicture(img);
      setOutcome("Too Much Glare");
      setNewRequest(true);

      //   return fetch(endpoint, {
      //     signal: controller.signal,
      //     method: "POST",
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ img: "" }),
      //   })
      //     .then((response) => response.json())
      //     .then(({ summary: { outcome } }) => {
      //       setPicture(img);
      //       setOutcome(outcome);
      //       setNewRequest(true);
      //     })
      //     .catch((err) => console.log({ err }))
      //     .finally(() => setLoading(false));
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
        submitImage(img);
      }
    }
  }, [submitImage]);

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
          if (readyToTakeImg && !cancel) {
            setLoading(true);
            takeImage();
          }
        });
      }
    }
    function errorCallback(err: MediaStreamError): void {
      console.log({ err });
    }
  }, [readyToTakeImg, takeImage, cancel, videoRef]);

  function handleCancel() {
    controller.abort();
    setCancel(controller.signal.aborted);
    setLocation("/");
  }

  useEffect(() => {
    manageCamera();
  }, [manageCamera]);

  return (
    <CameraContainer className="camera">
      <Blur />
      <Video ref={videoRef} width={windowWidth} height={windowHeight}>
        Cámara no disponible
      </Video>
      <Canvas ref={canvasRef} onClick={takeImage} />
      <CanvasFeedbackOverlay color={status && statusColor[status]} />
      {outcome && <p>{outcome}</p>}
      <ContentsLayout>
        <div className="item">
          <Title as="h1" color={"var(--color-text-inverse)"}>
            Scan your id
          </Title>
          <Paragraph color={"var(--color-text-inverse)"}>
            Take a picture. It may take time to validate your personal
            information.
          </Paragraph>
        </div>

        <div className="item">
          {!readyToTakeImg && <p>time for cancel... {timeToCancel}</p>}
          {loading && <p>Loading...</p>}

          {outcome === "Approved" && <BackToHome />}
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </ContentsLayout>
    </CameraContainer>
  );
};

export default Camera;
