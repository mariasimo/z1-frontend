import React, { useState } from "react";
import { Link, Route } from "wouter";
import { Header, Logo, Container } from "./styles/components";
import Scan from "./Scan";
import Camera from "./Camera";

const App = () => {
  const [picture, setPicture] = useState<string | undefined>();
  const [outcome, setOutcome] = useState<string | undefined>();

  return (
    <body>
      <Header>
        <Container>
          <Logo>
            <Link to="/">BankClient</Link>
          </Logo>
        </Container>
      </Header>
      <Route path="/take-picture">
        <Camera
          picture={picture}
          setPicture={setPicture}
          outcome={outcome}
          setOutcome={setOutcome}
        />
      </Route>
      <Route path="/">
        <Scan picture={picture} outcome={outcome} />
      </Route>
    </body>
  );
};

export default App;
