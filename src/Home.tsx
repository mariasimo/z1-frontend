import React from "react";
import styled from "styled-components";
import { Link } from "wouter";
import { MainContainer } from "./styles/components";

const Home = ({
  picture,
  outcome,
}: {
  picture: string | undefined;
  outcome: string | undefined;
}) => (
  <MainContainer>
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
  </MainContainer>
);

export default Home;
