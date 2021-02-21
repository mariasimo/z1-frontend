import React from "react";
import { Link } from "wouter";
import CardFrame from "./CardFrame";
import { Container, Header, Logo, Paragraph, Title } from "./styles/components";

const Scan = ({
  picture,
  status,
}: {
  picture: string | undefined;
  status: "accepted" | "rejected" | undefined;
}) => {
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
