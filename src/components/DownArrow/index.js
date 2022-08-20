import styled from "styled-components";
import {GRAY_100} from "../colors";


const MenuIcon = styled.div `
  color: ${GRAY_100};
  cursor:pointer;
 
`;


export default function DownArrow({arrow}) {

  
    return (
        <MenuIcon>{arrow}</MenuIcon>
    )
}

