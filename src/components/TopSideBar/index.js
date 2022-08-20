import styled from "styled-components";
import { MD_600 } from "../colors";
import Logo from "../Logo";
import LeftArrow from "../LeftArrow";
import { DashboardIcon, ArrowLeftIcon } from "../icons";
import React from "react";

const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${MD_600};
  width: ${({ width }) => width};
  height: 60px;
  @media (max-width: 360px) {
    width: ${({ screenWidth }) => `${screenWidth}px`};
  }
`;

const ArrowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${MD_600};
  padding: 15px;
  width: fit-content;
  height: 60px;
  cursor: pointer;
`;

export default function TopSideBar({
  leftArrowClicked,
  sideBarWidth,
  screenWidth,
  ...props
}) {
  const handleClick = () => {
    leftArrowClicked();
  };
  return (
    <Container width={sideBarWidth} screenWidth={screenWidth} {...props}>
      <Logo to="/" logo={<DashboardIcon />} />
      <ArrowContainer onClick={handleClick}>
        <LeftArrow arrow={<ArrowLeftIcon />} />
      </ArrowContainer>
    </Container>
  );
}
