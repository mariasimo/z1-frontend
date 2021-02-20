import React, { useCallback, useEffect, useRef } from "react";

const TakePicture = () => {
  const videoRef = useRef<HTMLMediaElement>(null);
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
      }
      //   submitImage(localMediaStream);
    };
    const errorCallback: (err: MediaStreamError) => void = function (err) {
      console.log(err);
    };
    navigator.getUserMedia(constrains, successCallback, errorCallback);
  }, []);

  const submitImage: (img: MediaStream | undefined) => void = (img) => {
    return fetch("https://front-exercise.z1.digital/evaluations", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((result) => result.json())
      .then((result) => console.log(result));
  };

  useEffect(() => {
    manageCamera();
  }, [manageCamera]);

  return (
    <div className="App">
      Smile!
      <div className="camera">
        <video ref={videoRef} width="400">
          Video stream not available.
        </video>
      </div>
    </div>
  );
};

export default TakePicture;
