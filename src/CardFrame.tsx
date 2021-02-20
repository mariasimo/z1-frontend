import React, { useEffect, useState } from "react";
import check from "./assets/check.svg";
import error from "./assets/error.svg";
import {
  CardContainer,
  CardImage,
  IdBackground,
  LinkAsButton,
  OutcomeTag,
} from "./styles/components";

const CardFrame = ({
  picture,
  outcome,
}: {
  picture: string | undefined;
  outcome: string | undefined;
}) => {
  const showImage = outcome && picture;
  const [status, setStatus] = useState<"accepted" | "rejected" | undefined>();

  const icon = {
    accepted: check,
    rejected: error,
  };

  const color = {
    accepted: `var(--color-status-success)`,
    rejected: `var(--color-status-error)`,
  };

  useEffect(() => {
    setStatus(outcome === "Approved" ? "accepted" : "rejected");
  }, []);

  return (
    <CardContainer>
      {showImage ? (
        <>
          <CardImage
            src={picture}
            color={status && color[status]}
            alt="output"
          />
          <LinkAsButton to="/take-picture">Retake Picture</LinkAsButton>

          <OutcomeTag color={status && color[status]}>
            <img src={status && icon[status]} alt="Status Icon" />
            {status}
          </OutcomeTag>
        </>
      ) : (
        <>
          <IdBackground role="img" aria-label="id background illustration" />
          <LinkAsButton to="/take-picture">Take Picture</LinkAsButton>
        </>
      )}
    </CardContainer>
  );
};

export default CardFrame;
