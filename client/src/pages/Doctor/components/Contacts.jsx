import React from "react";
import styled from "styled-components";
import defaultAvatar from "../../../assets/Profile.jpg";
import { useAuth } from "../../../context/authContext";

export function Contacts({ contacts, changeChat }) {
    const { user } = useAuth();

    const handleDefaultUser = (contact) => {
        if (!contact) {
            return {
                name: "Usuario por Defecto",
                patientPhoto: defaultAvatar,
            };
        }
        return contact;
    };

    return (
        <Container>
            <div className="brand">
                <h3>VitalIA</h3>
            </div>
            <div className="contacts">
                {contacts.map((contact) => {
                    const userContact = handleDefaultUser(contact);
                    return (
                        <div key={userContact._id} className="contact" onClick={() => changeChat(userContact)}>
                            <div className="avatar">
                                <img
                                    src={userContact.patientPhoto ? `http://159.223.161.190:4000/${userContact.patientPhoto.replace(/\\+/g, "/")}` : defaultAvatar}
                                    alt={userContact.name}
                                    style={{ width: 50, height: 50, borderRadius: "50%" }}
                                />
                            </div>
                            <div className="username">
                                <h3>{userContact.name}</h3>
                                <p>{userContact.specialization}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="current-user">
                <div className="avatar">
                    <img src={user.doctorPhoto ? `http://159.223.161.190:4000${user.doctorPhoto.replace(/\\+/g, "/")}` : defaultAvatar} 
                        alt="avatar" 
                        style={{ width: 50, height: 50, borderRadius: "50%" }} 
                    />
                </div>
                <div className="username">
                    <h2>{user.username}</h2>
                </div>
            </div>
        </Container>
    );
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: #ffff;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        h3 {
            color: black;
            text-transform: uppercase;
        }
    }
    .contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .contact {
            background-color: #ffffff34;
            min-height: 5rem;
            cursor: pointer;
            width: 90%;
            border-radius: 0.2rem;
            padding: 0.4rem;
            display: flex;
            gap: 1rem;
            align-items: center;
            transition: 0.5s ease-in-out;
            .avatar {
                img {
                    height: 3rem;
                }
            }
            .username {
                h3 {
                    color: black;
                }
                p {
                    color: #555;
                }
            }
        }
        .selected {
            background-color: #9a86f3;
        }
    }

    .current-user {
        background-color: #ffff;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        .avatar {
            img {
                height: 4rem;
                max-inline-size: 100%;
            }
        }
        .username {
            h2 {
                color: black;
            }
        }
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            gap: 0.5rem;
            .username {
                h2 {
                    font-size: 1rem;
                }
            }
        }
    }
`;
