import React, { useEffect } from "react";
import { Link } from "wouter";
import CardFrame from "./CardFrame";
import { Container, Header, Logo, Paragraph, Title } from "./styles/components";

const Scan = ({
  picture,
  setPicture,
  setOutcome,
  status,
}: {
  picture: string | undefined;
  setPicture: any;
  setOutcome: any;
  status: "accepted" | "rejected" | undefined;
}) => {
  useEffect(() => {
    const storedState = localStorage.getItem("currentState");
    if (storedState) {
      const { picture, outcome } = JSON.parse(storedState);

      setPicture(picture);
      setOutcome(outcome);
    }
  }, [setOutcome, setPicture]);

  return (
    <>
      <Header>
        <Container>
          <Logo>
            <Link to="/">BankClient</Link>
          </Logo>
        </Container>
      </Header>
      <main>
        <Container>
          <Title as="h1">Scan your id</Title>
          <Paragraph>
            Take a picture. It may take time to validate your personal
            information.
          </Paragraph>

          <CardFrame picture={picture} status={status} />
        </Container>
      </main>
    </>
  );
};

export default Scan;
