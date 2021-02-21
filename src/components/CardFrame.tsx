import React from "react";

import {
  CardContainer,
  CardImage,
  IdBackground,
  LinkAsButton,
  OutcomeTag,
} from "../styles/components";
import { statusColor, statusIcon } from "../styles/utils";

type CardFrameProps = {
  picture?: string;
  status?: "accepted" | "rejected";
};

const CardFrame = ({ picture, status }: CardFrameProps) => {
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
