import React from "react";

import {
  CardContainer,
  CardImage,
  IdBackground,
  LinkAsButton,
  OutcomeTag,
} from "./styles/components";
import { statusColor, statusIcon } from "./styles/utils";

const CardFrame = ({
  picture,
  status,
}: {
  picture: string | undefined;
  status: "accepted" | "rejected" | undefined;
}) => {
  return (
    <CardContainer>
      {picture ? (
        <>
          <CardImage
            src={picture}
            color={status && statusColor[status]}
            alt="output"
          />
          {status === "rejected" && (
            <LinkAsButton to="/take-picture">Retake Picture</LinkAsButton>
          )}
          <OutcomeTag color={status && statusColor[status]}>
            <img src={status && statusIcon[status]} alt="Status Icon" />
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
