import React from "react";
import CardFrame from "./CardFrame";
import { Container, Paragraph, Title } from "./styles/components";

const Scan = ({
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

      <CardFrame picture={picture} outcome={outcome} />
    </Container>
  </main>
);

export default Scan;
