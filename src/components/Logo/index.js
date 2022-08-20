import styled from "styled-components";
import { GRAY_300, YELLOW_500 } from "../colors";
import React from "react";
import { Link } from "react-router-dom";

const LogoIcon = styled.div`
  display: block;
  color: ${GRAY_300};
  padding: 15px;
  &:hover {
    color: ${YELLOW_500};
  }
`;

export default function Logo({ logo, to }) {
  return (
    <Link to={to}>
      <LogoIcon>{logo}</LogoIcon>
    </Link>
  );
}
