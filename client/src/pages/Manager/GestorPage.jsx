import React, { useState } from "react";
import styled from "styled-components";
import { Sidebar } from "./Sidebar.jsx";

const GestorPageContainer = styled.div`
  display: flex; // Cambiado a flex para un mejor control del layout
  background: ${({ theme }) => theme.bgtotal};
  transition: all 0.3s;
  height: 100vh;
`;

const SidebarContainer = styled.div`
  width: ${({ isOpen }) => (isOpen ? "300px" : "90px")};
  transition: width 0.3s;
  height: 1000px;
`;

const BodyContainer = styled.div`
  flex-grow: 1; // Ocupa el espacio restante
  background: ${({ theme }) =>
    theme.bg}; // Asume que tienes un tema con color de fondo
  transition: all 0.3s;
  overflow: auto; // Para el desplazamiento del contenido si es necesario
`;

export function GestorPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (  
    <GestorPageContainer>
      <SidebarContainer isOpen={sidebarOpen}>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </SidebarContainer>
      <BodyContainer>
        <h1>Gestor</h1>
        </BodyContainer>
    </GestorPageContainer>
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

