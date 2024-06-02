import React, {useState} from 'react';
import {Form, Row} from "react-bootstrap";
import MyForm from "../../../form/MyForm";

const RoomTypeForm = ({setVisible, id, validate}) => {
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

        const typeNameInput = document.getElementById("typeName" + id)
        const bedCntInput = document.getElementById("bedCnt" + id)
        const costInput = document.getElementById("cost" + id)
        const typeIdInput = document.getElementById("typeId" + id)

        const type = {
            'id': typeIdInput.value,
            'bedCnt': bedCntInput.value,
            'name': typeNameInput.value,
            'cost': costInput.value
        }

        const isValid = await validate(type)
        setNameInvalid(!isValid.name)

        if (isValid.name) {
            clear({
                typeIdInput: typeIdInput,
                typeNameInput: typeNameInput,
                bedCntInput: bedCntInput,
                costInput: costInput
            })
        }
    }

    const clear = (inputs) => {
        if (inputs === undefined) {
            document.getElementById("typeName" + id).value = ""
            document.getElementById("bedCnt" + id).value = ""
            document.getElementById("typeId" + id).value = ""
            document.getElementById("cost" + id).value = ""
        } else {
            inputs.typeIdInput.value = ""
            inputs.bedCntInput.value = ""
            inputs.typeNameInput.value = ""
            inputs.costInput.value = ""
        }

        setVisible(false)
        setValidated(false)
        setNameInvalid(false)
    }

    return (
        <MyForm onFormSubmit={onFormSubmit} validated={validated} onCancel={() => clear()}>
            <Row className='align-items-end'>
                <Form.Label>Название категории</Form.Label>
                <Form.Control isInvalid={nameInvalid} type="text" id={"typeName" + id}></Form.Control>
                <Form.Control.Feedback type="invalid"> Категория с таким именем уже существует </Form.Control.Feedback>
                <Form.Label>Количество мест</Form.Label>
                <Form.Control type="number" id={"bedCnt" + id} required></Form.Control>
                <Form.Label>Стоимость за ночь</Form.Label>
                <Form.Control type="number" id={"cost" + id} required></Form.Control>
                <Form.Control hidden id={"typeId" + id}></Form.Control>
            </Row>
        </MyForm>
    );
};

export default RoomTypeForm;