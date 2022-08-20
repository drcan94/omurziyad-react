import React, {useEffect, useState} from 'react'
import {login} from '../../redux/actions/userActions'
import {useDispatch} from 'react-redux'
import {Form, FormGroup, Input, Message, Button} from "./styles";
import {isFilled, emailValidator} from "../../../validation";

function LoginForm() {

    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isValidEmail, setIsValidEmail] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isFieldsFill, setIsFieldsFill] = useState(false)

    const submitHandler = (e) => {
        e.preventDefault();
        setIsSubmitted(true)
        if (!isFilled(password) || !isFilled(email)) {
            return;
        }
        if (!isValidEmail) {
            return
        }
        dispatch(login(email, password));
    }

    useEffect(() => {
        isFilled(password) && isFilled(email) ? (setIsFieldsFill(true)) : (setIsFieldsFill(false))
        !emailValidator(email) ? (setIsValidEmail(false)) : (setIsValidEmail(true))
    }, [password,email]);


    return (

        <Form onSubmit={submitHandler}>
            {isSubmitted && !isFieldsFill && <Message>Lütfen tüm alanları doldurunuz!</Message>}
            <FormGroup>
                <Input
                    placeholder="E-Mail"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {isFilled(email) && isSubmitted && !isValidEmail && <Message>Email Formatına Uygun Değil</Message>}
            </FormGroup>
            <FormGroup>
                <Input
                    placeholder="Parola"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormGroup>
            <Button
                type="submit"
            >
                Giriş
            </Button>
        </Form>)
}

export default LoginForm
