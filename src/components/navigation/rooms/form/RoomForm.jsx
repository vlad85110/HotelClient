import React, {useState} from 'react';
import MyForm from "../../../form/MyForm";
import RoomInputs from "./RoomInputs";
import {Form} from "react-bootstrap";

const RoomForm = ({id, setVisible, validate, types}) => {
    const [validated, setValidated] = useState(false);
    const [roomNumberInvalid, setRoomNumberInvalid] = useState(false);
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

        const room = {
            'id': inputs.id.value,
            'name': inputs.roomNumber.value,
            'floor': inputs.roomFloor.value,
            'description': inputs.description.value,
            'typeId': inputs.roomType.value
        }

        const res = await validate(room)
        setRoomNumberInvalid(!res.roomNumber)

        if (res.roomNumber) {
            clear(inputs)
        }
    }

    const clear = (inputs) => {
        if (inputs === undefined) {
            inputs = getInputs()
        }

        inputs.roomNumber.value = ""
        inputs.roomFloor.value = ""
        inputs.description.value = ""
        inputs.id.value = ""

        setVisible(false)
        setValidated(false)
        setRoomNumberInvalid(false)
    }

    const getInputs = () => {
        return {
            roomType: document.getElementById("roomTypeId" + id),
            roomNumber: document.getElementById("roomNumber"  + id),
            roomFloor: document.getElementById("floor" + id),
            description: document.getElementById("description" + id),
            id: document.getElementById("roomId" + id)
        }
    }

    return (
        <MyForm onFormSubmit={onFormSubmit} validated={validated} onCancel={() => clear()}>
            <Form.Select style={{minWidth: 600}} id={"roomTypeId" + id}>
                {types !== undefined && types.map(type => <option id={"roomType" + type.id} key={type.id} value={type.id}> {type.name}
                </option>)}
            </Form.Select>

            <RoomInputs id={id} isNumberInvalid={roomNumberInvalid}></RoomInputs>
        </MyForm>
    );
};

export default RoomForm;