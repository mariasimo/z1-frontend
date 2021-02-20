import React, { useState } from "react";
import { Link, Route } from "wouter";
import Home from "./Home";
import { Header, Logo, Container } from "./styles/components";
import TakePicture from "./TakePicture";

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

export default App;
