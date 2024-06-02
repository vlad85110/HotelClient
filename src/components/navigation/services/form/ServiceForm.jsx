import React, {useState} from 'react';
import MyForm from "../../../form/MyForm";
import {Form} from "react-bootstrap";
import ServiceInputs from "./ServiceInputs";

const ServiceForm = ({id, setVisible, validate, types}) => {
    const [validated, setValidated] = useState(false);
    const [serviceNameInvalid, setServiceNameInvalid] = useState(false);
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
            'name': inputs.name.value,
            'cost': inputs.cost.value,
            'description': inputs.description.value,
            'typeId': inputs.serviceType.value
        }

        const res = await validate(room)
        setServiceNameInvalid(!res.name)

        if (res.roomNumber) {
            clear(inputs)
        }
    }

    const clear = (inputs) => {
        if (inputs === undefined) {
            inputs = getInputs()
        }

        inputs.name.value = ""
        inputs.cost.value = ""
        inputs.description.value = ""
        inputs.id.value = ""

        setVisible(false)
        setValidated(false)
        setServiceNameInvalid(false)
    }

    const getInputs = () => {
        return {
            serviceType: document.getElementById("serviceTypeId" + id),
            name: document.getElementById("name"  + id),
            cost: document.getElementById("cost" + id),
            description: document.getElementById("description" + id),
            id: document.getElementById("serviceId" + id)
        }
    }

    return (
        <MyForm onFormSubmit={onFormSubmit} validated={validated} onCancel={() => clear()}>
            <Form.Select style={{minWidth: 600}} id={"serviceTypeId" + id}>
                {types !== undefined && types.map(type => <option id={"serviceType" + type.id} key={type.id} value={type.id}> {type.name}
                </option>)}
            </Form.Select>

            <ServiceInputs id={id} isNameInvalid={serviceNameInvalid}></ServiceInputs>
        </MyForm>
    );
};

export default ServiceForm;