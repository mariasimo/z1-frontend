import React, { useCallback, useEffect, useRef, useState } from "react";
import { Redirect } from "wouter";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const endpoint = "https://front-exercise.z1.digital/evaluations";

  const submitImage: (img: string | undefined) => void = useCallback(
    (img) => {
      return fetch(endpoint, {
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
          setOutcome(outcome);
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
          takeImage();
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
  }, [takeImage]);

  useEffect(() => {
    manageCamera();
  }, [manageCamera]);

  useEffect(() => {
    setLoading(true);
    setPicture(undefined);
  }, [setPicture, setLoading]);

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
      {loading && <p>Loading...</p>}
      <div className="output">
        <canvas
          ref={canvasRef}
          width="400"
          height="225"
          style={{ display: "none" }}
        ></canvas>

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
      <button>Cancel</button>
    </div>
  );
};

const BackToHome = () => {
  const [count, setCount] = useState<number>(5);
  useEffect(() => {
    if (count !== 0) {
      const time = 1000;
      const timer = setTimeout(() => setCount(count - 1), time);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [count]);

  return count === 0 ? (
    <Redirect to="/" />
  ) : (
    <p>Please wait while we redirect you {count}</p>
  );
};

export default TakePicture;
