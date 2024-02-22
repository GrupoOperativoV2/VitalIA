import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, ButtonLink, Card, Input, Label } from "../components/ui";
import { useRooms } from "../context/roomsContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
import { Navbar } from "../components/NavbarGestion";

dayjs.extend(utc);

export function RoomFormPage(){
    const { createRoom, getRoom, updateRoom } = useRooms();
    const navigate = useNavigate();
    const params = useParams();
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const onSubmit = async (data) => {
        try {
          if (params.id) {
            await updateRoom(params.id, data);
          } else {
            await createRoom(data);
          }
          navigate("/room"); // Asegúrate de tener esta ruta configurada
        } catch (error) {
          console.log(error);
          window.location.href = "/";
        }
      };

      useEffect(() => {
        const loadRoom = async () => {
          if (params.id) {
            const room = await getRoom(params.id);
            Object.keys(room).forEach(key => {
              setValue(key, room[key]);
            });
          }
        };
        loadRoom();
      }, [params.id, getRoom, setValue]);

      return(
        <>
        <Navbar />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Cuartos</h3>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              name="title"
              placeholder="Title"
              {...register("title")}
              autoFocus
            />
            {errors.title && (
              <p className="text-red-500 text-xs italic">Please enter a title.</p>
            )}
  
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              id="description"
              rows="3"
              placeholder="Description"
              {...register("description")}
            ></Textarea>
  
            <Label htmlFor="date">Date</Label>
            <Input type="date" name="date" {...register("date")} />
            <Button>Save</Button>
          </form>
          <ButtonLink to="/tasks">Registros</ButtonLink>
        </Card>
        </div>
      </>
      );
}