import React, { useCallback, useEffect, useRef } from "react";

const TakePicture = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

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
        setTimeout(() => takeImage(stream), 5000);
      }
    };
    const errorCallback: (err: MediaStreamError) => void = function (err) {
      console.log(err);
    };
    navigator.getUserMedia(constrains, successCallback, errorCallback);
  }, []);

  const takeImage: (video: any) => void = (video) => {
    if (canvasRef.current) {
      var context = canvasRef.current.getContext("2d");
      console.log("hola", videoRef.current);
      if (context && videoRef.current) {
        context.drawImage(videoRef.current, 0, 0, 400, 225);
        var data = canvasRef.current.toDataURL("image/png");
        console.log({ data });
        if (imgRef.current) {
          imgRef.current.src = data;
        }
      }
    }
  };

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
      <div className="output">
        <canvas
          ref={canvasRef}
          width="400"
          height="225"
          style={{ display: "none" }}
        ></canvas>
        <img ref={imgRef} alt="output" width="400" height="225" />
      </div>
    </div>
  );
};

export default TakePicture;
