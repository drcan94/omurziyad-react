import React from "react";
import styled from "styled-components";
import {GRAY_200, YELLOW_400, MD_600, MD_700} from "../../colors";
import {Button} from "react-bootstrap";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  border: 1px solid ${MD_600};
  background: ${GRAY_200};
  width: 30%;
  min-width: 350px;
  max-width: 450px;
  height: fit-content;
  margin: 0 auto 20px auto;
  overflow: hidden;
  @media screen and (max-width: 1100px) {
    width: 47%;
  }

  @media screen and (max-width: 768px) {
    width: 95%;
  }
`;

const Image = styled.img`
  max-width: 100%;
  object-fit-c
`;

const Header = styled.div`
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${MD_700};
  color: ${YELLOW_400};
  font-size: 2.7rem;
  font-weight: 600;
  height: 45px;
`;

const Footer = styled(Header)`
  justify-content: flex-start;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  font-size: 2.3rem;
  font-weight: 500;
  height: fit-content;
`;

const Subtitle = styled(Title)`
  padding: 0 12px;
  margin-top: -12px;
  align-items: flex-start;
  font-size: 1.2rem;
  font-weight: 300;
`;

const Content = styled(Title)`
  padding: 12px;
  font-size: 1.6rem;
  font-weight: 400;
`;

function Card({
                  imgSrc = null,
                  header = null,
                  title = null,
                  subtitle = null,
                  content = null,
                  footer = null,
                  timeAgo = null,
                  currentUserId = null,
                  contentUserId = null,
                  deleteHandler
              }) {


    return (
        <Container>
            {header && <Header>{header}</Header>}
            {imgSrc && <Image src={imgSrc} alt="CardImage"/>}
            {title && (
                <Title>
                    <span>
                        {title}
                    </span>
                    <div style={{fontSize: "1.4rem"}}>{timeAgo && timeAgo}</div>
                </Title>
            )}

            {subtitle && <Subtitle>{subtitle}</Subtitle>}
            {content && (
                <Content>
                    {/*{content.length > 120 ? `${content.substring(0, 120)}...` : content}*/}
                    {content}
                </Content>
            )}
            {footer && <Footer>{footer}</Footer>}
            {contentUserId === currentUserId && <Button onClick={deleteHandler}>Sil</Button>}
        </Container>
    );
}

export default Card;
