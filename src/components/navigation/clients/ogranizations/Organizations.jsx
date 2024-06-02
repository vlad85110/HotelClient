import React, {useEffect, useState} from 'react';
import {Api} from "../../../../api/Api";
import {Button, Container} from "react-bootstrap";
import Modal from "../../../modal/Modal";
import Organization from "./organization/Organization";
import OrganizationForm from "./form/OrganizationForm";

const Organizations = () => {
    const [organizationCreateModal, setOrganizationCreateModal] = useState(false);
    const [organizationEditModal, setOrganizationEditModal] = useState(false);
    const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
        Api.getAllOrganizations().then(p => setOrganizations(p.data))
    }, []);

    const editOrganization = async (people) => {
        try {
            await Api.editOrganization(people)
            Api.getAllOrganizations().then(p => setOrganizations(p.data))
            return true
        } catch (e) {
            return e.response.data
        }
    }

    const showEditOrganization = (organization) => {
        setOrganizationEditModal(true)

        const nameInput = document.getElementById("nameEdit")
        const innInput = document.getElementById("innEdit")
        const organizationIdInput = document.getElementById("idEdit")

        nameInput.value = organization.name
        innInput.value = organization.inn
        organizationIdInput.value = organization.id
    }

    const deleteOrganization = async (people) => {
        try {
            await Api.deleteOrganization(people.id)
            Api.getAllOrganizations().then(p => setOrganizations(p.data))
        } catch (e) {
            alert("Нельзя удалить организацию, к ней привязаны бронирования")
        }
    }

    const addOrganization = async (people) => {
        try {
            await Api.addOrganization(people)
            await Api.getAllOrganizations().then(p => setOrganizations(p.data))
            return true
        } catch (e) {
            return e.response.data
        }
    }

    return (
        <Container>
            <h2>Юр. лица</h2>

            <Button onClick={() => setOrganizationCreateModal(true)}>Добавить Юр. лицо</Button>

            {organizations.map(p => <Organization params={p} deleteOrganization={deleteOrganization}
                                                  showEditOrganization={showEditOrganization}
                                                  key={p.id}/>)}

            <Modal visible={organizationCreateModal} setVisible={setOrganizationCreateModal}>
                <OrganizationForm setVisible={setOrganizationCreateModal}
                                  validate={addOrganization}/>
            </Modal>

            <Modal visible={organizationEditModal} setVisible={setOrganizationEditModal}>
                <OrganizationForm id="Edit" setVisible={setOrganizationEditModal}
                                  validate={editOrganization}></OrganizationForm>
            </Modal>
        </Container>
    );
};

export default Organizations;