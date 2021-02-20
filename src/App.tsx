import React, { useState } from "react";
import { Link, Route } from "wouter";
import Home from "./Home";
import { Header, Logo, MainContainer } from "./styles/components";
import TakePicture from "./TakePicture";

const App = () => {
  const [picture, setPicture] = useState<string | undefined>();
  const [outcome, setOutcome] = useState<string | undefined>();

  return (
    <body>
      <Header>
        <MainContainer>
          <Logo>
            <Link to="/">BankClient</Link>
          </Logo>
        </MainContainer>
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
