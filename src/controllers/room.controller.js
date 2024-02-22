import Room from "../models/room.model.js";

export const createRoom = async(req, res) => {
    try{
        const { number, floor, type, status, capacity, equipment } = req.body;
        const newRoom = new Room({
            number,
            floor,
            type,
            status,
            capacity,
            equipment,
            user: req.user.id,
          });
          await newRoom.save()
          res.json(newRoom);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
};

export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.json(room);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateRoom = async (req, res) => {
    try {
        const { number, floor, type, status, capacity, equipment } = req.body;
        const room = await Room.findByIdAndUpdate(req.params.id, {
            number,
            floor,
            type,
            status,
            capacity,
            equipment,
        }, { new: true });

        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.json(room);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.json({ message: "Room deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};