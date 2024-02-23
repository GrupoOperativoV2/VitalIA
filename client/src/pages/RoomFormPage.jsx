import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, ButtonLink, Card, Input, Label } from "../components/ui";
import { useRooms } from "../context/roomsContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
import { Navbar } from "../components/NavbarCRUD";

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
          navigate("/rooms"); // Asegúrate de tener esta ruta configurada
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
                        {/* Ajuste de campos según el modelo */}
                        <Label htmlFor="number">Number</Label>
                        <Input
                            type="text"
                            name="number"
                            {...register("number", { required: true })}
                            placeholder="Room Number"
                            autoFocus
                        />

                        <Label htmlFor="floor">Floor</Label>
                        <Input
                            type="number"
                            name="floor"
                            {...register("floor", { required: true })}
                            placeholder="Floor"
                        />

                        <Label htmlFor="building">Building</Label>
                        <Input
                            type="text"
                            name="building"
                            {...register("building", { required: true })}
                            placeholder="Building"
                        />

                        <Label htmlFor="type">Type</Label>
                        <select {...register("type", { required: true })}>
                            <option value="individual">Individual</option>
                            <option value="compartido">Compartido</option>
                            <option value="intensivo">Intensivo</option>
                        </select>

                        <Label htmlFor="status">Status</Label>
                        <select {...register("status", { required: true })}>
                            <option value="disponible">Disponible</option>
                            <option value="ocupado">Ocupado</option>
                            <option value="mantenimiento">Mantenimiento</option>
                        </select>

                        <Label htmlFor="capacity">Capacity</Label>
                        <Input
                            type="number"
                            name="capacity"
                            {...register("capacity", { required: true })}
                            placeholder="Capacity"
                        />

                        {/* Ejemplo para 'equipment', asumiendo entrada múltiple como texto por simplicidad */}
                        <Label htmlFor="equipment">Equipment</Label>
                        <Textarea
                            name="equipment"
                            {...register("equipment")}
                            placeholder="List equipment, separated by commas"
                        />

                        <Button type="submit">Save</Button>
                    </form>
                    <ButtonLink to="/rooms">Back to Rooms</ButtonLink>
                </Card>
        </div>
      </>
      );
}