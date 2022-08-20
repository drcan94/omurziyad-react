import React from 'react'
import { Alert } from 'react-bootstrap'
import styled from "styled-components";

const AlertDiv = styled(Alert)`
    font-size: 1.5rem;
`

function Message({variant, children}) {
    return (
        <AlertDiv variant={variant}>
            {children}
        </AlertDiv>
    )
}

export default Message