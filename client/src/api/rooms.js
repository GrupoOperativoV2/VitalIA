import axios from "./axios";

export const getRoomsRequest = async () => axios.get("/rooms");

export const createRoomRequest = async (room) => axios.post("/rooms", room);

export const updateRoomRequest = async (room) =>
  axios.put(`/rooms/${room._id}`, room);

export const deleteRoomRequest = async (id) => axios.delete(`/rooms/${id}`);

export const getRoomRequest = async (id) => axios.get(`/rooms/${id}`);
