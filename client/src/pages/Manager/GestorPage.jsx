import React, { useState } from "react";
import { Sidebar } from "./Sidebar.jsx";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const PatientPageContainer = styled.div`
  display: grid;
  grid-template-columns: 90px auto;
  background: ${({ theme }) => theme.bgtotal};
  transition: all 0.3s;
  justify-items: normal;
  &.active {
    grid-template-columns: 300px auto;
  }
  color: ${({ theme }) => theme.text};
  height: 100vh;
`;

export function GestorPage() {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated, user);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <PatientPageContainer className={sidebarOpen ? "sidebarState active" : ""}>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <h1>Ponganse a chambear gestor 1</h1>
      <Link to="/" onClick={() => logout()}>
        Salir
      </Link>
      <h1>Ahorita lo pongo en Sidebar</h1>
    </PatientPageContainer>
  );
}






// import { useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc";
// import { Button, ButtonLink, Card, Input, Label } from "../components/ui";
// import { useTasks } from "../context/tasksContext";
// import { Textarea } from "../components/ui/Textarea";
// import { useForm } from "react-hook-form";
// import { Navbar } from "../components/NavbarPersonal";

// dayjs.extend(utc);

// export function GestorPage() {
//   const { createTask, getTask, updateTask } = useTasks();
//   const navigate = useNavigate();
//   const params = useParams();
//   const {
//     register,
//     setValue,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       if (params.id) {
//         await updateTask(params.id, {
//           ...data,
//           date: dayjs.utc(data.date).format(),
//         });
//       } else {
//         await createTask({
//           ...data,
//           date: dayjs.utc(data.date).format(),
//         });
//       }

//       navigate("/tasks");
//     } catch (error) {
//       console.log(error);
//       window.location.href = "/";
//     }
//   };

//   useEffect(() => {
//     const loadTask = async () => {
//       if (params.id) {
//         const task = await getTask(params.id);
//         setValue("title", task.title);
//         setValue("description", task.description);
//         setValue(
//           "date",
//           task.date ? dayjs.utc(task.date).format("YYYY-MM-DD") : ""
//         );
//         setValue("completed", task.completed);
//       }
//     };
//     loadTask();
//   }, [params.id, getTask, setValue]);

//   return (
//     <>
//       <Navbar/>
//     </>
//   );
// }

