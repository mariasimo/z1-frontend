import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import BackToHome from "./BackToHome";
import useCountDown from "./hooks/useCountDown";

const TakePicture = ({
  picture,
  setPicture,
  outcome,
  setOutcome,
}: {
  picture: string | undefined;
  setPicture: any;
  outcome: string | undefined;
  setOutcome: any;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [newRequest, setNewRequest] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [timeToCancel, readyToTakeImg] = useCountDown(1);
  const [cancel, setCancel] = useState(false);
  const controller = new AbortController();

  const [, setLocation] = useLocation();

  const endpoint = "https://front-exercise.z1.digital/evaluations";

  const submitImage: (img: string | undefined) => void = useCallback(
    (img) => {
      console.log(controller.signal);
      return fetch(endpoint, {
        signal: controller.signal,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ img: "" }),
      })
        .then((response) => response.json())
        .then(({ summary: { outcome } }) => {
          setPicture(img);
          setOutcome("Too Much Glare");
          setNewRequest(true);
        })
        .catch((err) => console.log({ err }))
        .finally(() => setLoading(false));
    },
    [setPicture, setOutcome]
  );

  const takeImage = useCallback(() => {
    if (canvasRef.current) {
      var context = canvasRef.current.getContext("2d");
      if (context && videoRef.current) {
        context.drawImage(videoRef.current, 0, 0, 284.4, 160);
        const img = canvasRef.current.toDataURL("image/png");
        submitImage(img);
      }
    }
  }, [submitImage]);

  const manageCamera = useCallback(() => {
    const constrains: {
      video: boolean | MediaTrackConstraints | undefined;
      audio: boolean | MediaTrackConstraints | undefined;
    } = {
      video: true,
      audio: false,
    };

    navigator.mediaDevices
      .getUserMedia(constrains)
      .then(successCallback)
      .catch(errorCallback);

    function successCallback(
      stream: MediaStream | Blob | MediaSource | null
    ): void {
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
    <div className="take-picture">
      <div className="camera">
        <video
          ref={videoRef}
          style={{ backgroundColor: "grey" }}
          width="284.4"
          height="160"
        >
          Video stream not available.
        </video>
      </div>
      {!readyToTakeImg && <p>time for cancel... {timeToCancel}</p>}
      {loading && <p>Loading...</p>}
      <div className="output">
        <canvas
          ref={canvasRef}
          width="284.4"
          height="160"
          style={{ display: "none" }}
        ></canvas>

        {newRequest && (
          <div>
            {outcome && picture && (
              <>
                <img
                  ref={imgRef}
                  src={picture}
                  alt="output"
                  width="284.4"
                  height="160"
                />
                <p>{outcome}</p>
              </>
            )}
            {outcome === "Approved" && <BackToHome />}
          </div>
        )}
      </div>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default TakePicture;
