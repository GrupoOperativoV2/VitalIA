import React, { useState, useEffect } from "react";
import styled from "styled-components";
import defaultAvatar from "../../../assets/Profile.jpg"; // Asegúrate de tener una imagen de avatar por defecto
import { useAuth } from "../../../context/authContext";  

export function Contacts({ contacts, changeChat }) {
    const { user, isAuthenticated, photoUser } = useAuth();
    const [userPhoto, setUserPhoto] = useState(defaultAvatar);

    console.log(contacts);

    useEffect(() => {
        const fetchUserPhoto = async () => {
            try {
                const photoPath = await photoUser(user.id); // Llamamos a la función photoUser para obtener la ruta de la foto
                const formattedPhotoPath = `http://159.223.161.190:4000/${photoPath.replace(/\\+/g, "/")}`; // Formateamos la ruta de la foto como una URL válida
                setUserPhoto(formattedPhotoPath); // Actualizamos el estado con la ruta de la foto formateada
            } catch (error) {
                console.error("Error fetching user photo:", error);
                // Aquí puedes manejar el error según tu lógica de la aplicación
            }
        };

        if (isAuthenticated) {
            fetchUserPhoto(); // Llamamos a la función al cargar el componente si el usuario está autenticado
        }
    }, [isAuthenticated, user.id, photoUser]);

    return (
        <Container>
            <div className="brand">
                <h3>VitalIA</h3>
            </div>
            <div className="contacts">
                {contacts.map((contact) => (
                    <div key={contact._id} className="contact" onClick={() => changeChat(contact)}>
                        <div className="avatar">
                            <img
                                src={contact.doctorPhoto ? `http://159.223.161.190:4000${contact.doctorPhoto.replace(/\\+/g, "/")}` : defaultAvatar}
                                alt={contact.name}
                                style={{ width: 50, height: 50, borderRadius: "50%" }}
                            />
                        </div>
                        <div className="username">
                            <h3>{contact.name}</h3>
                            <p>{contact.specialization}</p>
                        </div>
                    </div>
                ))}
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
        h3 {
            color: black;
            text-transform: uppercase;
        }
    }
    .contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: auto;
        height: 100%;
        gap: 0.8rem;
        padding: 0.5rem;
        &::-webkit-scrollbar {
            width: 0.5rem;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #888;
            border-radius: 1rem;
        }
        &::-webkit-scrollbar-thumb:hover {
            background-color: #555;
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
        padding: 0.5rem;
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
