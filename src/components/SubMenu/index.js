import styled from "styled-components";
import { GRAY_300, YELLOW_500 } from "../colors";
import React from "react";
import { Link } from "react-router-dom";

const LS = {};

LS.Link = styled(Link)`
  display: block;
  margin-bottom: 2px;
  padding: 8px 0;
  color: ${GRAY_300};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: ${YELLOW_500};
  }
`;

export default function SubMenu({ children, ...props }) {
  return <LS.Link {...props}>{children}</LS.Link>;
}
