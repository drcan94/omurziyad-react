import styled from "styled-components";
import TopSideBar from "../TopSideBar";
import {MD_700, YELLOW_700} from "../colors";
import SidebarMenu from "../SidebarMenu";
import MenuGroup from "../MenuGroup";
import {DashboardIcon} from "../icons";
import SubMenu from "../SubMenu";
import React, {useCallback, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {get_screen_width} from "../PageContent/redux/actions/screenActions";

const sideBarWidth = `220px`;

const Container = styled.div`
  position: fixed;
  left: ${({isOpen}) => (isOpen ? `0` : `-${sideBarWidth}`)};
  height: 100%;
  width: ${sideBarWidth};
  background: ${MD_700};
  color: white;
  transition: 0.3s all;
  z-index: 1000;

  @media (max-width: 768px) {
    left: ${({isOpen}) => (isOpen ? `-${sideBarWidth}` : `0`)};
  }

  @media (max-width: 360px) {
    width: ${({screenWidth}) => `${screenWidth}px`};
    left: ${({isOpen, screenWidth}) => (isOpen ? `-${screenWidth}px` : `0`)};
  }
`;

const SidebarMenus = styled.div`
  width: ${sideBarWidth};
  padding: 16px;
  position: fixed;
  top: 60px;
  overflow: auto;
  max-height: calc(100vh - 60px);

  @media (max-width: 360px) {
    width: ${({screenWidth}) => `${screenWidth}px`};
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${YELLOW_700};
    border-radius: 5px;
  }
`;

export default function Sidebar({isOpen, leftArrowClicked, ...props}) {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;

    const setDimension = useCallback(() => {
        dispatch(get_screen_width());
    }, [dispatch]);

    const isClicked = useCallback(() => {
        leftArrowClicked();
    }, [leftArrowClicked]);

    const ref = useRef(null);

    const currentScreenWidth = useSelector((state) => state.getScreenWidth);
    const {dynamicWidth: width} = currentScreenWidth;

    useEffect(() => {
        window.addEventListener("resize", setDimension);

        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                if (width <= 768) {
                    !isOpen && isClicked();
                }
            }
        };
        window.addEventListener("click", handleClickOutside, true);

        return () => {
            window.removeEventListener("click", handleClickOutside, true);
            window.removeEventListener("resize", setDimension);
        };
    }, [isClicked, isOpen, setDimension, width]);

    return (
        <Container screenWidth={width} ref={ref} isOpen={isOpen} {...props}>
            <TopSideBar
                screenWidth={width}
                sideBarWidth={sideBarWidth}
                leftArrowClicked={isClicked}
            />
            <SidebarMenus screenWidth={width}>
                <Link to="/">
                    <SidebarMenu
                        title="Anasayfa"
                        active={false}
                        icon={<DashboardIcon/>}
                        count={0}
                    />
                </Link>


                <MenuGroup title="Bize Dair">
                    {userInfo && (
                        <Link to="omur">
                            <SidebarMenu
                                title="Ömür'e Yaz"
                                active={false}
                                icon={<DashboardIcon/>}
                            />
                        </Link>
                    )}

                    <Link to="about-us">
                        <SidebarMenu
                            title="Hakkımızda"
                            active={false}
                            icon={<DashboardIcon/>}
                        />
                    </Link>

                </MenuGroup>
            </SidebarMenus>
        </Container>
    );
}
