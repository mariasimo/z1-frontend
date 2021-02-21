import React from "react";
import { Redirect } from "wouter";
import useCountDown from "../hooks/useCountDown";
import { Paragraph } from "../styles/components";

const BackToHome = () => {
  const [count, ready] = useCountDown(5);

  return ready ? (
    <Redirect to="/" />
  ) : (
    <Paragraph color={"var(--color-text-inverse)"}>
      Please wait while we redirect you in... {count}
    </Paragraph>
  );
};

export default BackToHome;
