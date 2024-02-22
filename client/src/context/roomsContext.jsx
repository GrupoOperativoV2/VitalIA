import { createContext, useContext, useState } from "react";
import {
    createRoomRequest,
    deleteRoomRequest,
    getRoomsRequest,
    getRoomRequest,
    updateRoomRequest,
  } from "../api/rooms";

  const RoomContext = createContext();

  export const useRooms = () => {
    const context = useContext(RoomContext);
    if (!context) throw new Error("useRooms must be used within a RoomProvider");
    return context;
  };
  
  export function RoomProvider({ children }) {
    const [rooms, setRooms] = useState([]);
  
    const getRooms = async () => {
      const res = await getRoomsRequest();
      setRooms(res.data);
    };
  
    const deleteRoom = async (id) => {
      try {
        const res = await deleteRoomRequest(id);
        if (res.status === 204) setRooms(rooms.filter((room) => room._id !== id));
      } catch (error) {
        console.log(error);
      }
    };
  
    const createRoom = async (room) => {
      try {
        const res = await createRoomRequest(room);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    const getRoom = async (id) => {
      try {
        const res = await getRoomRequest(id);
        return res.data;
      } catch (error) {
        console.error(error);
      }
    };
  
    const updateRoom = async (id, room) => {
      try {
        await updateRoomRequest({ _id: id, ...room });
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <RoomContext.Provider
        value={{
          rooms,
          getRooms,
          deleteRoom,
          createRoom,
          getRoom,
          updateRoom,
        }}
      >
        {children}
      </RoomContext.Provider>
    );
  }
  
  