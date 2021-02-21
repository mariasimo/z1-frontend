import React, { useState, useEffect } from "react";
import { Link, Route } from "wouter";
import { Header, Logo, Container } from "./styles/components";
import Scan from "./Scan";
import Camera from "./Camera";

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
      {/* <Header>
        <Container>
          <Logo>
            <Link to="/">BankClient</Link>
          </Logo>
        </Container>
      </Header> */}
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
