import React from "react";
import svg from "../assets/404.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <Container>
            <img src={svg} alt="svg" />
            <Link to="/">
                <Button>Back to Home</Button>
            </Link>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const Button = styled.button`
    background-color: #6a0dad;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 20px;

    &:hover {
        background-color: #5a0dad;
    }
`;

export { Page404 };
