import React, { useState } from "react";
import styled from "styled-components";
import { GRAY_300, MD_500, MD_900 } from "../colors";

const Container = styled.div`
  background: ${({ isOpen }) => (isOpen ? MD_900 : `unset`)};
  border-radius: 3px;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2px;
  padding: 8px 10px;
  color: ${GRAY_300};
  text-decoration: none;
  border-radius: 3px;
  background: ${({ active }) => (active ? MD_900 : `unset`)};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${MD_900};
  }
`;

const Icon = styled.div`
  color: ${GRAY_300};
`;

const Title = styled.div`
  flex-grow: 4;
`;

const Count = styled.div`
  background: ${MD_500};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  padding: 2px 4px;
  min-width: 20px;
  height: 20px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
`;

const SubMenuContent = styled.div`
  background: #09212e;
  padding: 5px 0;
  border-radius: 3px;
  text-align: center;
`;

export default function SidebarMenu({
  icon,
  title,
  count = 0,
  active,
  children = null,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (children === null) {
      return;
    }

    setIsOpen(!isOpen);
  };

  return (
    <Container isOpen={isOpen}>
      <Row active={active} onClick={handleClick} {...props}>
        <Icon>{icon}</Icon>
        <Title>{title}</Title>
        {count > 0 && <Count>{count}</Count>}
      </Row>
      {isOpen && <SubMenuContent>{children}</SubMenuContent>}
    </Container>
  );
}
