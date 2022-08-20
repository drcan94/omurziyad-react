import styled from "styled-components";
import { YELLOW_500 } from '../colors'
import React from "react";

const Container = styled.div`
  margin-top: 20px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${YELLOW_500};
  padding-left: 10px;
`;

const Content = styled.div`
  padding-top: 10px;
`;

export default function MenuGroup({ title, children }) {
  return (
    <Container>
      <Title>{title}</Title>
      <Content>{children}</Content>
    </Container>
  );
}