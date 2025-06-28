import { Box, Span } from "@chakra-ui/react";
import React from "react";

const orderStatusColors = {
  pending: {
    bg: "#FFF7E6", // light yellow
    text: "#B26A00", // dark amber
  },
  processing: {
    bg: "#E6F7FF", // light blue
    text: "#0050B3", // blue
  },
  "out for delivery": {
    bg: "#F0F5FF", // soft indigo
    text: "#1D39C4", // indigo
  },
  delivered: {
    bg: "#E6FFFB", // mint green
    text: "#006D75", // teal
  },
  cancelled: {
    bg: "#FFF1F0", // blush pink
    text: "#A8071A", // crimson
  },
};
const StatusBadge = ({ status }) => {
  const colors = orderStatusColors[status] || {
    bg: "#F5F5F5",
    text: "#333",
  };

  return (
    <Span bgColor={colors.bg} color={colors.text} borderRadius={"10px"} p={'0.5rem 1rem'} fontWeight={'semibold'} textTransform={'capitalize'}>
      {status}
    </Span>
  );
};

export default StatusBadge;
