import { useEffect } from "react";
import { useRooms } from "../context/roomsContext";
import { TaskCard } from "../components/tasks/TaskCard";
import { Navbar } from "../components/NavbarPersonal";
import { ImFileEmpty } from "react-icons/im";

export function RoomPage() {
  const { rooms, getRooms } = useRooms();

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <>
    <Navbar />
      {rooms.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              Urgente que te pongas a chambear Donovan  
            </h1>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {rooms.map((room) => (
          <TaskCard room={room} key={room._id} />
        ))}
      </div>
    </>
  );
}
