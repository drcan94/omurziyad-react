import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import {useLocation, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import Card from "../components/Card";
import Loader from "../components/Loader";
import {Form, FormGroup, Input, Message, Button} from "../components/FormComponent/styles";
import {isFilled} from "../../validation";
import {addInitial} from "../redux/actions/omurActions";
import Moment from "react-moment";
import {INITIAL_ADD_RESET} from "../redux/constants/omurConstants";


const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: fit-content;
`

const InitialAddContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
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
    const navigate = useNavigate()

    const [content, setContent] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isFieldsFill, setIsFieldsFill] = useState(false)


    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;


    const initialCreateProcess = useSelector(state => state.initialCreate)
    const {
        loading: initialLoading,
        success: initialSuccess,
        error: initialError
    } = initialCreateProcess

    const [remainSec, setRemainSec] = useState(3)

    const submitHandler = (e) => {
        e.preventDefault();
        setIsSubmitted(true)
        if (!isFilled(content)) {
            return;
        }
        dispatch(addInitial(content));
    }

    useEffect(() => {
        isFilled(content) ? (setIsFieldsFill(true)) : (setIsFieldsFill(false))
        if (initialSuccess) {
            dispatch({type: INITIAL_ADD_RESET})
            navigate("/")
        }
    }, [content, initialSuccess]);


    useEffect(() => {
        if (!userInfo) {
            let interval = setTimeout(() => {
                setRemainSec((remainSec) => remainSec - 1)
            }, 1000)
            if (remainSec === 0) {
                clearInterval(interval);
                navigate("/login?redirect=/omur");
            }
        }
    }, [navigate, userInfo, remainSec])

    return (
        <MainContainer>
            {(userInfo) ? (
                <InitialAddContainer>
                    {initialLoading ? (<Loader/>) : (
                        initialError && (
                            <p style={{fontSize: "2rem", fontWeight: "900"}}>{initialError}</p>
                        )
                    )}
                    <h1 style={{textAlign: "center", margin: "20px auto 10px auto"}}>Ömür'e Dair Yazabilirsin</h1>
                    <Form onSubmit={submitHandler}>
                        {isSubmitted && !isFieldsFill && <Message>Lütfen Bir İçerik Giriniz!</Message>}
                        <FormGroup>
                            <Input
                                placeholder="İçerik Giriniz"
                                type="text"
                                id="content"
                                name="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </FormGroup>

                        <Button
                            type="submit"
                        >
                            Ekle
                        </Button>
                    </Form>
                </InitialAddContainer>
            ) : (
                <UnloggedContainer>
                    Giriş Yapmadan Olmaz.. {remainSec} saniye kaldı.
                </UnloggedContainer>
            )}
        </MainContainer>
    );
}

export default HomeScreen;
