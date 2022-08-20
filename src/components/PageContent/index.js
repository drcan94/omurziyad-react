import React, {useState, useRef, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Routes, Route, Link} from "react-router-dom";

import styled from "styled-components";

import {logout} from '../../components/PageContent/redux/actions/userActions'

import {
    MD_700, MD_800, MD_900, GRAY_100, YELLOW_500, GRAY_300,
} from "../colors";

import {
    ArrowRightIcon,
    DashboardIcon,
    ArrowDownIcon,
    DefaultUserIcon,
} from "../icons";

import RightArrow from "../RightArrow";
import Logo from "../Logo";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import OmurScreen from "./screens/OmurScreen";

const sideBarWidth = `220px`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${GRAY_300};
  margin-left: ${({isClose}) => (isClose ? `${sideBarWidth}` : `0`)};
  min-height: 100vh;
  width: ${({isClose}) => !isClose ? `100%` : `calc(100% - ${sideBarWidth})`};
  transition: 0.3s all;
  @media (max-width: 768px) {
    margin-left: ${({isClose}) => (!isClose ? `${sideBarWidth}` : `0`)};
    width: ${({isClose}) => isClose ? `100%` : `calc(100% - ${sideBarWidth})`};
  }
`;

const TopMenu = styled.div`
  position: fixed;
  top: ${({top}) => top};
  left: 0;
  width: 100%;
  height: 60px;
  background: ${MD_700};
  display: flex;
  justify-content: ${({isClose}) => (isClose ? "flex-end" : "space-between")};
  align-items: center;
  z-index: 1;
  transition: 0.4s all;

  @media (max-width: 768px) {
    justify-content: ${({isClose}) => isClose ? `space-between` : `flex-end`};
  }
  @media (max-width: 550px) {
    background: ${MD_900};
  }
`;

const Icons = styled.div`
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  height: 60px;
  background: ${MD_900};
`;

const LeftIcons = styled(Icons)`
  display: ${({isClose}) => (isClose ? `none` : `flex`)};
  @media (max-width: 768px) {
    display: ${({isClose}) => (isClose ? `flex` : `none`)};
  }
`;

const RightIcons = styled(Icons)`
  display: flex;
  padding: 0 10px;
`;

const IconContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  color: ${GRAY_300};
`;

const RightSubMenu = styled.div`
  position: absolute;
  display: none;
  top: 60px;
  right: 0;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  border: 2px solid ${MD_700};
  border-top: none;
  width: 220px;
  background: ${GRAY_100};
`;

const RightMenu = styled.div`
  padding: 0 10px;
  display: flex;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 0;
  height: 60px;
  max-width: 70px;
  cursor: pointer;

  &:hover ${RightSubMenu} {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  &:hover ${IconContainer} {
    color: ${YELLOW_500};
  }
`;

const List = styled.div`
  width: 100%;
  padding: 0px 18px;
`;

const LS = {};

LS.ListItem = styled(Link)`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px 0px;

  text-align: center;
  color: ${MD_900};

  border-top: 1px solid ${MD_900};

  :first-of-type {
    border-top: none;
  }

  &:hover {
    color: ${YELLOW_500};
  }
`;

const Main = styled.main`
  display: flex;
  padding: 70px 10px 10px 10px;
  width: 100%;
  min-height: ${({footerHeight}) => `calc(100vh - ${footerHeight}px)`};
  @media (max-width: 680px) {
    filter: ${({isClose}) => !isClose && `blur(10px)`};
    -webkit-filter: ${({isClose}) => !isClose && `blur(10px)`};
  }
`

const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 50px 20px;
  background: ${MD_900};
  border-top: 1px solid ${MD_800};
  width: 100%;
  font-size: 1.3rem;
  font-weight: 400;
  color: ${GRAY_300};
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  height: fit-content;
  max-width: 420px;
  border-radius: 4px;
  overflow: hidden;
  gap: 1px;
  @media screen and (max-width: 1100px) {
    width: 40%;
    margin-bottom: 40px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const FooterTitle = styled.div`
  display: flex;
  padding: 0 0 10px 0;
  font-size: 2rem;
  font-weight: 600;
`;

const FI = {};

FI.FooterItem = styled(Link)`
  display: flex;
  padding: 3px 0;
  color: ${GRAY_300};

  &:hover {
    color: ${YELLOW_500};
  }
`;

const SocialIcons = styled.div`
  display: flex;
  padding: 3px 0;
`;

const SocialMediaIcon = styled.div`
  display: flex;
  width: fit-content;
  padding: 0 5px 0 0;
`;

export default function PageContent({isClose, rightArrowClicked}) {
    const currentScreenWidth = useSelector(
        (state) => state.getScreenWidth
    );
    const {dynamicWidth: width} = currentScreenWidth;

    const [top, setTop] = useState("0");

    const [footerHeight, setFooterHeight] = useState(0)
    const heightRef = useRef(null)

    const resized = (entries) => {
        const el = entries[0]
        const borderBox = el.borderBoxSize[0]
        const currentFooterHeight = borderBox.blockSize
        setFooterHeight(currentFooterHeight)
    }

    useEffect(() => {
        const resizeObserver = new ResizeObserver(resized)
        heightRef.current && resizeObserver.observe(heightRef.current)
    });


    const dispatch = useDispatch();

    let prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
        let currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            setTop("0");
        } else {
            setTop("-60px");
        }
        prevScrollpos = currentScrollPos;
    };

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;

    const handleClick = () => {
        rightArrowClicked();
    };

    const logoutHandler = () => {
        dispatch(logout())
    };
    return (
        <Container isClose={isClose} screenWidth={width}>
            <TopMenu top={top} isClose={isClose}>
                <LeftIcons isClose={isClose}>
                    <Logo to="/" logo={<DashboardIcon/>}/>

                    <div onClick={handleClick}>
                        <RightArrow arrow={<ArrowRightIcon/>}/>
                    </div>
                </LeftIcons>
                <RightIcons>

                    <RightMenu>
                        <IconContainer>
                            {/* Giriş Yapılmamışsa */}
                            <DefaultUserIcon/>

                            {/* Giriş Yapılmışsa */}
                            {/* <CurrentUserIcon/> */}

                            <ArrowDownIcon/>
                        </IconContainer>

                        <RightSubMenu>
                            <List>
                                {!userInfo ? (
                                    <LS.ListItem to="/login">Giriş Yap</LS.ListItem>
                                ) : (
                                    <>
                                        <LS.ListItem to="/omur/">Ömür'e Yaz</LS.ListItem>
                                        <LS.ListItem to="/" onClick={logoutHandler}>Çıkış</LS.ListItem>
                                    </>
                                )
                                }
                            </List>

                        </RightSubMenu>
                    </RightMenu>
                </RightIcons>
            </TopMenu>

            <Main footerHeight={footerHeight} isClose={isClose}>
                <Routes>
                    <Route path="/" element={<HomeScreen/>} exact/>

                    <Route path="/login/" element={<LoginScreen/>}/>
                    <Route path="/omur/" element={<OmurScreen/>}/>

                </Routes>
            </Main>

            <Footer ref={heightRef}>
                <Column>
                    <FooterTitle>Site Haritası</FooterTitle>
                    <FI.FooterItem to="/">Anasayfa</FI.FooterItem>
                    <FI.FooterItem to="/about">Hakkımızda</FI.FooterItem>
                </Column>
                <Column>
                    <FooterTitle>Bilgilendirme</FooterTitle>
                    <FI.FooterItem to="/privacy-policy">
                        Gizlilik Politikası
                    </FI.FooterItem>
                </Column>
            </Footer>
        </Container>);
}
