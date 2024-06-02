import React, {useState} from 'react';
import MyForm from "../../../../form/MyForm";
import {Form, Row} from "react-bootstrap";

const PeopleForm = ({setVisible, id, validate}) => {
    const [validated, setValidated] = useState(false);
    const [nameInvalid, setNameInvalid] = useState(false);

    if (id === undefined || id === null) {
        id = ""
    }

    const onFormSubmit = async (e) => {
        e.preventDefault()

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            return
        }

        setValidated(false);
        const inputs = getInputs()

        const people = {
            'id': inputs.peopleIdInput.value,
            'firstName': inputs.firstNameInput.value,
            'lastName': inputs.lastNameInput.value,
            'birthdayDate': new Date(inputs.birthdayDateInput.value).getTime(),
            'passportNumber': inputs.passportNumberInput.value
        }

        const isValid = await validate(people)

        if (isValid === true) {
            clear(inputs)
            return
        }

        setNameInvalid(true)
    }

    const clear = (inputs) => {
        if (inputs === undefined) {
            inputs = getInputs()
        }

        inputs.firstNameInput.value = ""
        inputs.lastNameInput.value = ""
        inputs.birthdayDateInput.value = ""
        inputs.passportNumberInput.value = ""
        inputs.peopleIdInput.value = ""

        setVisible(false)
        setValidated(false)
        setNameInvalid(false)
    }

    const getInputs = () => {
        return {
            firstNameInput: document.getElementById("firstName" + id),
            lastNameInput: document.getElementById("lastName" + id),
            birthdayDateInput: document.getElementById("birthdayDate" + id),
            passportNumberInput: document.getElementById("passportNumber" + id),
            peopleIdInput: document.getElementById("peopleId" + id)
        }
    }

    return (
        <MyForm onFormSubmit={onFormSubmit} validated={validated} onCancel={() => clear()}>
            <Row className='align-items-end'>
                <Form.Label>Имя</Form.Label>
                <Form.Control type="text" id={"firstName" + id} required></Form.Control>

                <Form.Label>Фамилия</Form.Label>
                <Form.Control type="text" id={"lastName" + id} required></Form.Control>

                <Form.Label>Дата рождения</Form.Label>
                <Form.Control type="date" id={"birthdayDate" + id} required></Form.Control>

                <Form.Label>Номер паспорта</Form.Label>
                <Form.Control type="number" id={"passportNumber" + id} isInvalid={nameInvalid} required>

                </Form.Control>

                <Form.Control.Feedback type="invalid">
                    Клиент с таким номером паспорта уже существует
                </Form.Control.Feedback>

                <Form.Control hidden id={"peopleId" + id}></Form.Control>
            </Row>
        </MyForm>
    );
};

export default PeopleForm;