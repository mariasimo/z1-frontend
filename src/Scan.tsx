import React from "react";
import { Link } from "wouter";
import CardFrame from "./CardFrame";
import { Container, Header, Logo, Paragraph, Title } from "./styles/components";

const Scan = ({
  picture,
  outcome,
}: {
  picture: string | undefined;
  outcome: string | undefined;
}) => (
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

        <CardFrame picture={picture} outcome={outcome} />
      </Container>
    </main>
  </>
);

export default Scan;
