// import RedButton from "./Button/RedButton"
// import GreenButton from "./Button/GreenButton"
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import PageContent from "./components/PageContent";
import React, { useState } from "react";

const Container = styled.div``;

function App() {
  // sidebar is open
  const [isOpen, setIsOpen] = useState(true);

  // right arrow appearance
  const [isClose, setIsClose] = useState(true);

  const arrowClicked = () => {
    setIsOpen(!isOpen);
    setIsClose(!isClose);
  };

  return (
    <Container>
      <Sidebar leftArrowClicked={arrowClicked} isOpen={isOpen} />

      <PageContent rightArrowClicked={arrowClicked} isClose={isClose} />
    </Container>
  );
}

export default App;
