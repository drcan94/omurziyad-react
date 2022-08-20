import React, {useEffect} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import Card from "../components/Card";
import {getInitials, deleteInitial} from '../redux/actions/omurActions'
import Loader from "../components/Loader";
import Moment from 'react-moment';
import 'moment/locale/tr'
import {Link} from "react-router-dom";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: fit-content;
`

const InitialsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const Content = styled(InitialsContainer)`
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
`

const UnloggedContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.2rem;
  padding: 10px 20px;
  text-align: center;
  font-weight: bold;
  line-height: 1.8;

  @media (max-width: 1100px) {
    font-size: 1.6rem
  }

  @media (max-width: 768px) {
    font-size: 1rem
  }
`

function HomeScreen() {

    const dispatch = useDispatch()


    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const initialDelete = useSelector(state => state.initialDelete)
    const {
        loading: deleteLoading,
        success: deleteSuccess,
        error: deleteError
    } = initialDelete


    const initials = useSelector(state => state.omurInitials)
    const {initialsData, error: initialsError, loading: initialsLoading, success: initialsSuccess} = initials;

    useEffect(() => {
        if (deleteSuccess) {
            dispatch({type: "INITIAL_DELETE_RESET"})
        }
        if (userInfo) {
            dispatch(getInitials())
        }
    }, [dispatch, userInfo, deleteSuccess]);


    return (
        <MainContainer id="main">
            {(userInfo) ? (
                <InitialsContainer>
                    {deleteError &&
                        <p style={{fontSize: "2rem", fontWeight: "900"}}>Silerken hata oluştu: {deleteError}</p>}
                    {initialsLoading || deleteLoading ? (<Loader/>) : (
                        initialsError ? (
                            <p style={{fontSize: "2rem", fontWeight: "900"}}>{initialsError}</p>
                        ) : (
                            initialsSuccess && (
                                <Content>
                                    <h1 style={{textAlign: "center", margin: "20px"}}>Ömüşümüze Dair Yazılanlar</h1>
                                    {initialsSuccess && initialsData.map(initial => {
                                        const date = initial.created_at
                                        return (
                                            <Card
                                                key={initial.id}
                                                title={initial.full_name}
                                                timeAgo={<Moment fromNow>{date}</Moment>}
                                                content={initial.content}
                                                currentUserId={userInfo.id}
                                                contentUserId={initial.commenter}
                                                deleteHandler={() => {
                                                    if (userInfo.id === initial.commenter) {
                                                        dispatch(deleteInitial(initial.id))
                                                    }
                                                }}
                                            />
                                        )
                                    })}
                                </Content>
                            )
                        )


                    )}

                </InitialsContainer>
            ) : (
                <UnloggedContainer>
                    Ailemizin bir üyesiysen lütfen <Link style={{marginLeft: 5}} to={"/login"}>Giriş Yap</Link>
                </UnloggedContainer>
            )}
        </MainContainer>
    );
}

export default HomeScreen;
