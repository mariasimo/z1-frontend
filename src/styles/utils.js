import check from "../assets/check.svg";
import error from "../assets/error.svg";

export const statusIcon = {
  accepted: check,
  rejected: error,
};

export const statusColor = {
  accepted: `var(--color-status-success)`,
  rejected: `var(--color-status-error)`,
};
