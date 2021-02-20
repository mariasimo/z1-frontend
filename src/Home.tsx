import React from "react";
import { Link } from "wouter";
import { Container, Title, Paragraph } from "./styles/components";

const Home = ({
  picture,
  outcome,
}: {
  picture: string | undefined;
  outcome: string | undefined;
}) => (
  <main>
    <Container>
      <Title as="h1">Scan your id</Title>
      <Paragraph>
        Take a picture. It may take time to validate your personal information.
      </Paragraph>
      {outcome && picture && (
        <>
          <img src={picture} alt="output" width="400" height="225" />
          <p>{outcome}</p>
        </>
      )}
      <Link to="/take-picture">Take Picture</Link>
    </Container>
  </main>
);

export default Home;
