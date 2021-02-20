import React, { useCallback, useEffect } from "react";

const App = () => {
  const manageCamera = useCallback(() => {
    const constrains: {
      video: boolean | MediaTrackConstraints | undefined;
    } = {
      video: true,
    };

    const successCallback: (
      localMediaStream: MediaStream | undefined
    ) => void = function (localMediaStream) {
      console.log("call sucess", localMediaStream);
      submitImage(localMediaStream);
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

  return <div className="App">Hey girl</div>;
};

export default App;
