import React, {useState} from 'react';
import MyForm from "../../../form/MyForm";
import {Form, Row} from "react-bootstrap";

const ServiceTypeForm = ({setVisible, id, validate}) => {
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
            'id': inputs.serviceTypeIdInput.value,
            'name': inputs.nameInput.value,
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

        inputs.nameInput.value = ""
        inputs.serviceTypeIdInput.value = ""

        setVisible(false)
        setValidated(false)
        setNameInvalid(false)
    }

    const getInputs = () => {
        return {
            nameInput: document.getElementById("name" + id),
            serviceTypeIdInput: document.getElementById("serviceTypeId" + id)
        }
    }

    return (
        <MyForm onFormSubmit={onFormSubmit} validated={validated} onCancel={() => clear()}>
            <Row className='align-items-end'>
                <Form.Label>Название</Form.Label>
                <Form.Control type="text" id={"name" + id} isInvalid={nameInvalid} required></Form.Control>

                <Form.Control.Feedback type="invalid">
                    Такой тип товара или услуги уже существует
                </Form.Control.Feedback>

                <Form.Control hidden id={"serviceTypeId" + id}></Form.Control>
            </Row>
        </MyForm>
    );
};

export default ServiceTypeForm;