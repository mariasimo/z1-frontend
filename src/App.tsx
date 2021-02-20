import React, { useEffect } from "react";

const App = () => {
  useEffect(() => {
    fetch("https://front-exercise.z1.digital/evaluations", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        someRandomVal: "someRandomVal",
      }),
    })
      .then((result) => result.json())
      .then((result) => console.log(result));
  }, []);

  return <div className="App">Hey girl</div>;
};

export default App;
