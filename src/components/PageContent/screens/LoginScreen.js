import React, {useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import LoginForm from '../components/FormComponent/LoginForm'
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 10px auto;
`

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 900;
`

function LoginScreen() {


    const navigate = useNavigate()
    const location = useLocation()

    const redirect = location.search ? location.search.split('=')[1] : '/'
    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    return (
        <Container>
            {loading && <Loader/>}
            {error && <Message variant='danger'>{error}</Message>}

            <Title>Giriş Formu</Title>


            <LoginForm/>

        </Container>
    )
}

export default LoginScreen