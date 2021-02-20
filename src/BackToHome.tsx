import React from "react";
import { Redirect } from "wouter";
import useCountDown from "./hooks/useCountDown";

const BackToHome = () => {
  const [count, ready] = useCountDown(5);

  return ready ? (
    <Redirect to="/" />
  ) : (
    <p>Please wait while we redirect you {count}</p>
  );
};

export default BackToHome;
