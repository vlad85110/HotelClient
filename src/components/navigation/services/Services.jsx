import React, {useEffect, useState} from 'react';
import {Api} from "../../../api/Api";
import {Button, Container, Row} from "react-bootstrap";
import Modal from "../../modal/Modal";
import ServicesForm from "./form/ServicesForm";
import ServiceForm from "./form/ServiceForm";
import Service from "./service/Service";

const Services = () => {
    const [serviceCreateModal, setServiceCreateModal] = useState(false);
    const [serviceEditModal, setServiceEditModal] = useState(false);

    const [servicesByType, setServicesByType] = useState({});
    const [types, setTypes] = useState([]);

    useEffect(() => {
        Api.getAllServiceTypes().then(r => setTypes(r.data))
        updateRooms()
    }, []);

    const updateRooms = () => {
        Api.getAllServiceTypes().then(async r => {
            const rooms = {}

            for (const type of r.data) {
                const res = await Api.getServicesByType(type.id)
                rooms[type.name] = res.data
            }

            setServicesByType(rooms)
        })
    }

    const editRoom = async (room) => {
        let res = {
            name: true
        }

        try {
            await Api.editService(room)
            updateRooms()
        } catch (e) {
            res.name = false
        }

        return res
    }

    const showEditRoom = (room) => {
        setServiceEditModal(true)

        const roomNumberField = document.getElementById("nameEdit")
        const roomFloorField = document.getElementById("costEdit")
        const descriptionField = document.getElementById("descriptionEdit")
        const idField = document.getElementById("serviceIdEdit")
        const roomTypeField = document.getElementById("serviceType" + room.typeId)

        roomNumberField.value = room.name
        roomFloorField.value = room.floor
        descriptionField.value = room.description
        idField.value = room.id
        roomTypeField.selected = true
    }

    const delRoom = (room) => {
        Api.deleteService(room.id).then(() => {
            updateRooms()
        })
    }

    const addRooms = async (rooms) => {

        try {
            await Api.addServices(rooms)
        } catch (e) {
            return e.response.data
        }

        updateRooms()

        return true
    }

    return (
        <Container>
            <h2>Товары и услуги</h2>

            <Button onClick={() => setServiceCreateModal(true)}>Добавить</Button>

            {Object.keys(servicesByType).map((key) =>
                <div key={key}>
                    {servicesByType[key].length > 0 &&
                        <Row className="align-items-center"><h4>{key}</h4></Row>}
                    {servicesByType[key].map(room => <Service params={room} delRoom={delRoom} showEditRoom={showEditRoom}
                                                        updateRooms={updateRooms} key={room.id}></Service>)}
                </div>
            )}

            <Modal visible={serviceCreateModal} setVisible={setServiceCreateModal}>
                <ServicesForm setVisible={setServiceCreateModal} types={types}
                           validate={addRooms}/>
            </Modal>

            <Modal visible={serviceEditModal} setVisible={setServiceEditModal}>
                <ServiceForm id="Edit" setVisible={setServiceEditModal} types={types} validate={editRoom}></ServiceForm>
            </Modal>
        </Container>
    )
};

export default Services;