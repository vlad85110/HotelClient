import React, {useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import {Api} from "../../../api/Api";
import Modal from "../../modal/Modal";
import ServiceTypeForm from "./form/ServiceTypeForm";
import ServiceType from "./service_type/ServiceType";

const ServiceTypes = () => {
    const [typeCreateModal, setTypeCreateModal] = useState(false);
    const [typeEditModal, setTypeEditModal] = useState(false);
    const [type, setType] = useState([]);

    useEffect(() => {
        Api.getAllServiceTypes().then(p => setType(p.data))
    }, []);

    const editType = async (type) => {
        try {
            await Api.editServiceType(type)
            Api.getAllServiceTypes().then(p => setType(p.data))
            return true
        } catch (e) {
            return e.response.data
        }
    }

    const showEditType = (type) => {
        setTypeEditModal(true)

        const nameInput = document.getElementById("nameEdit")
        const typeIdInput = document.getElementById("idEdit")

        nameInput.value = type.name
        typeIdInput.value = type.id
    }

    const deleteType = async (type) => {
        try {
            await Api.deleteServiceType(type.id)
            Api.getAllServiceTypes().then(p => setType(p.data))
        } catch (e) {
            alert("Нельзя удалить тип, к нему привязаны товары или услуги")
        }
    }

    const addType = async (type) => {
        try {
            await Api.addServiceType(type)
            await Api.getAllServiceTypes().then(p => setType(p.data))
            return true
        } catch (e) {
            return e.response.data
        }
    }

    return (
        <Container>
            <h2>Типы товаров и услуг</h2>

            <Button onClick={() => setTypeCreateModal(true)}>Добавить Тип</Button>

            {type.map(p => <ServiceType params={p} deleteOrganization={deleteType}
                                                  showEditOrganization={showEditType}
                                                  key={p.id}/>)}

            <Modal visible={typeCreateModal} setVisible={setTypeCreateModal}>
                <ServiceTypeForm setVisible={setTypeCreateModal}
                                  validate={addType}/>
            </Modal>

            <Modal visible={typeEditModal} setVisible={setTypeEditModal}>
                <ServiceTypeForm id="Edit" setVisible={setTypeEditModal}
                                  validate={editType}></ServiceTypeForm>
            </Modal>
        </Container>
    );
};

export default ServiceTypes;