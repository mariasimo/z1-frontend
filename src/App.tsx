import React, { useState, useEffect } from "react";
import { Route } from "wouter";
import Camera from "./Camera";
import Scan from "./Scan";

const App = () => {
  const [picture, setPicture] = useState<string | undefined>();
  const [outcome, setOutcome] = useState<string | undefined>();
  const [status, setStatus] = useState<"accepted" | "rejected" | undefined>();

  useEffect(() => {
    setStatus(
      outcome ? (outcome === "Approved" ? "accepted" : "rejected") : undefined
    );
  }, [outcome]);

  useEffect(() => {
    if (picture && outcome && status) {
      localStorage.setItem(
        "currentState",
        JSON.stringify({ picture, outcome, status })
      );
    }
  }, [picture, outcome, status]);

  return (
    <body>
      <Route path="/take-picture">
        <Camera
          picture={picture}
          setPicture={setPicture}
          setOutcome={setOutcome}
          outcome={outcome}
          status={status}
        />
      </Route>
      <Route path="/">
        <Scan
          picture={picture}
          status={status}
          setPicture={setPicture}
          setOutcome={setOutcome}
        />
      </Route>
    </body>
  );
};

export default App;
