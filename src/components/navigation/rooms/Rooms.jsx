import {Button, Container, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Room from "./room/Room";
import Modal from "../../modal/Modal";
import {Api} from "../../../api/Api";
import RoomForm from "./form/RoomForm";
import RoomsForm from "./form/RoomsForm";

export function Rooms() {
    const [roomCreateModal, setRoomCreateModal] = useState(false);
    const [roomEditModal, setRoomEditModal] = useState(false);

    const [roomsByType, setRoomsByType] = useState({});
    const [types, setTypes] = useState([]);

    useEffect(() => {
        Api.getAllTypes().then(r => setTypes(r.data))
        updateRooms()
    }, []);

    const updateRooms = () => {
        Api.getAllTypes().then(async r => {
            const rooms = {}

            for (const type of r.data) {
                const res = await Api.getRoomsByType(type.id)
                rooms[type.name] = res.data
            }

            setRoomsByType(rooms)
        })
    }

    const editRoom = async (room) => {
        let res = {
            roomNumber: true
        }

        try {
            await Api.editRoom(room)
            updateRooms()
        } catch (e) {
            res.roomNumber = false
        }

        return res
    }

    const showEditRoom = (room) => {
        setRoomEditModal(true)

        const roomNumberField = document.getElementById("roomNumberEdit")
        const roomFloorField = document.getElementById("floorEdit")
        const descriptionField = document.getElementById("descriptionEdit")
        const idField = document.getElementById("roomIdEdit")
        const roomTypeField = document.getElementById("roomType" + room.typeId)

        roomNumberField.value = room.name
        roomFloorField.value = room.floor
        descriptionField.value = room.description
        idField.value = room.id
        roomTypeField.selected = true
    }

    const delRoom = (room) => {
        Api.deleteRoom(room.id).then(() => {
            updateRooms()
        })
    }

    const addRooms = async (rooms) => {

        try {
            await Api.addRooms(rooms)
        } catch (e) {
            return e.response.data
        }

        updateRooms()

        return true
    }

    return (
        <Container>
            <h2>Номера</h2>

            <Button onClick={() => setRoomCreateModal(true)}>Добавить номер</Button>

            {Object.keys(roomsByType).map((key) =>
                <div key={key}>
                    {roomsByType[key].length > 0 &&
                        <Row className="align-items-center"><h4>{key}</h4></Row>}
                    {roomsByType[key].map(room => <Room params={room} delRoom={delRoom} showEditRoom={showEditRoom}
                                                        updateRooms={updateRooms} key={room.id}></Room>)}
                </div>
            )}

            <Modal visible={roomCreateModal} setVisible={setRoomCreateModal}>
                <RoomsForm setVisible={setRoomCreateModal} types={types}
                           validate={addRooms}/>
            </Modal>

            <Modal visible={roomEditModal} setVisible={setRoomEditModal}>
                <RoomForm id="Edit" setVisible={setRoomEditModal} types={types} validate={editRoom}></RoomForm>
            </Modal>
        </Container>
    )
}