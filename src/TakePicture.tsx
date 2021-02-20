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
  const endpoint = "https://front-exercise.z1.digital/evaluations";
  const controller = new AbortController();
  const [, setLocation] = useLocation();

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
          setOutcome("Approved");
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
        context.drawImage(videoRef.current, 0, 0, 400, 225);
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

    const successCallback: (
      stream: MediaStream | Blob | MediaSource | null
    ) => void = function (stream) {
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
    };
    const errorCallback: (err: MediaStreamError) => void = function (err) {
      console.log({ err });
    };
    navigator.mediaDevices
      .getUserMedia(constrains)
      .then(successCallback)
      .catch(errorCallback);
  }, [readyToTakeImg, takeImage, cancel, videoRef]);

  const handleCancel = () => {
    controller.abort();
    setCancel(controller.signal.aborted);
    setLocation("/");
  };

  useEffect(() => {
    manageCamera();
  }, [manageCamera]);

  return (
    <div className="take-picture">
      <div className="camera">
        <video
          ref={videoRef}
          style={{ backgroundColor: "grey" }}
          width="400"
          height="225"
        >
          Video stream not available.
        </video>
      </div>
      {!readyToTakeImg && <p>time for cancel... {timeToCancel}</p>}
      {loading && <p>Loading...</p>}
      <div className="output">
        <canvas
          ref={canvasRef}
          width="400"
          height="225"
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
                  width="400"
                  height="225"
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
