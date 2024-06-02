import React, {useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import Modal from "../../../modal/Modal";
import {Api} from "../../../../api/Api";
import PeopleForm from "./form/PeopleForm";
import PeopleModel from "./PeopleModel";

const People = () => {
    const [peopleCreateModal, setPeopleCreateModal] = useState(false);
    const [peopleEditModal, setPeopleEditModal] = useState(false);
    const [people, setPeople] = useState([]);

    useEffect(() => {
        Api.getAllPeople().then(p => setPeople(p.data))
    }, []);

    const editPeople = async (people) => {
        try {
            await Api.editPeople(people)
            Api.getAllPeople().then(p => setPeople(p.data))
            return true
        } catch (e) {
            return e.response.data
        }
    }

    const showEditPeople = (people) => {
        setPeopleEditModal(true)

        const firstNameInput = document.getElementById("firstNameEdit")
        const lastNameInput = document.getElementById("lastNameEdit")
        const birthdayDateInput = document.getElementById("birthdayDateEdit")
        const passportNumberInput = document.getElementById("passportNumberEdit")
        const peopleIdInput = document.getElementById("peopleIdEdit")

        let date = new Date(people.birthdayDate).toISOString().substring(0,10);

        firstNameInput.value = people.firstName
        lastNameInput.value = people.lastName
        birthdayDateInput.value = date
        passportNumberInput.value = people.passportNumber
        peopleIdInput.value = people.id
    }

    const deletePeople = async (people) => {
        try {
            await Api.deletePeople(people.id)
            Api.getAllPeople().then(p => setPeople(p.data))
        } catch (e) {
            alert("Нельзя удалить клиента, к нему привязаны бронирования")
        }
    }

    const addPeople = async (people) => {
        try {
            await Api.addPeople(people)
            await Api.getAllPeople().then(p => setPeople(p.data))
            return true
        } catch (e) {
            return e.response.data
        }
    }

    return (
        <Container>
            <h2>Физ. лица</h2>

            <Button onClick={() => setPeopleCreateModal(true)}>Добавить физ. лицо</Button>

            {people.map(p => <PeopleModel params={p} deletePeople={deletePeople} showEditPeople={showEditPeople}
                                          key={p.id}/>)}

            <Modal visible={peopleCreateModal} setVisible={setPeopleCreateModal}>
                <PeopleForm setVisible={setPeopleCreateModal}
                            validate={addPeople}/>
            </Modal>

            <Modal visible={peopleEditModal} setVisible={setPeopleEditModal}>
                <PeopleForm id="Edit" setVisible={setPeopleEditModal} validate={editPeople}></PeopleForm>
            </Modal>
        </Container>
    );
};

export default People;