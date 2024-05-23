import React, { useState, useEffect } from "react";
import styled from "styled-components";
import defaultAvatar from "../../../assets/Profile.jpg"; // Asegúrate de tener una imagen de avatar por defecto
// import Logo from "../../../Godev.svg";
import { useAuth } from "../../../context/authContext";

export function Contacts({ contacts, changeChat }) {
    const { user, isAuthenticated, photoUser } = useAuth();
    const [userPhoto, setUserPhoto] = useState(defaultAvatar);

    useEffect(() => {
        const fetchUserPhoto = async () => {
            try {
                const photoPath = await photoUser(user.id); 
                const formattedPhotoPath = `http://localhost:4000/${photoPath.replace(/\\+/g, "/")}`; 
                setUserPhoto(formattedPhotoPath); 
            } catch (error) {
                console.error("Error fetching user photo:", error);
   
            }
        };

        if (isAuthenticated) {
            fetchUserPhoto(); 
        }
    }, [isAuthenticated, user.id, photoUser]);

    const handleDefaultUser = (contact) => {
        if (!contact) {
            return {
                name: "Usuario por Defecto",
                specialization: "Especialización Desconocida",
                doctorPhoto: defaultAvatar,
            };
        }
        return contact;
    };

    return (
        <Container>
            <div className="brand">
                {/* <img src={Logo} alt="logo" /> */}
                <h3>VitalIA</h3>
            </div>
            <div className="contacts">
                {contacts.map((contact) => {
                    const userContact = handleDefaultUser(contact);
                    return (
                        <div key={userContact._id} className="contact" onClick={() => changeChat(userContact)}>
                            <div className="avatar">
                                <img
                                    src={userContact.doctorPhoto ? `http://localhost:4000/${userContact.doctorPhoto.replace(/\\+/g, "/")}` : defaultAvatar}
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
                    {userPhoto ? (
                        <img src={userPhoto} alt="avatar" style={{ width: 50, height: 50, borderRadius: "50%" }} />
                    ) : (
                        <img src={defaultAvatar} alt="avatar" style={{ width: 50, height: 50, borderRadius: "50%" }} />
                    )}
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
        img {
            height: 2rem;
        }
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
