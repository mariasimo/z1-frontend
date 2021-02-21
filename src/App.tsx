import React, { useEffect, useRef, useState } from "react";
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

  return (
    <body>
      <Route path="/take-picture">
        <Camera
          picture={picture}
          setPicture={setPicture}
          outcome={outcome}
          setOutcome={setOutcome}
          status={status}
        />
      </Route>
      <Route path="/">
        <Scan picture={picture} status={status} />
      </Route>
    </body>
  );
};

export default App;
