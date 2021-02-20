import React, { useState } from "react";
import { Link, Route } from "wouter";
import TakePicture from "./TakePicture";

const App = () => {
  const [picture, setPicture] = useState<string | undefined>();
  const [outcome, setOutcome] = useState<string | undefined>();

  return (
    <body>
      <Link to="/">BankClient</Link>
      <Route path="/take-picture">
        <TakePicture
          picture={picture}
          setPicture={setPicture}
          outcome={outcome}
          setOutcome={setOutcome}
        />
      </Route>
      <Route path="/">
        <Home picture={picture} outcome={outcome} />
      </Route>
    </body>
  );
};

const Home = ({
  picture,
  outcome,
}: {
  picture: string | undefined;
  outcome: string | undefined;
}) => (
  <main>
    <h1>Scan your id</h1>
    <p>
      Take a picture. It may take time to validate your personal information.
    </p>
    {outcome && picture && (
      <>
        <img src={picture} alt="output" width="400" height="225" />
        <p>{outcome}</p>
      </>
    )}
    <Link to="/take-picture">Take Picture</Link>
  </main>
);

export default App;
