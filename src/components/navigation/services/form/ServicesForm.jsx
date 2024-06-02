import React, {useState} from 'react';
import {Col, Container, Form, Row} from "react-bootstrap";
import MyForm from "../../../form/MyForm";
import ServiceInputs from "./ServiceInputs";

const ServicesForm = ({setVisible, types, validate}) => {
    const [show, setShow] = useState(false);
    const [servicesCnt, setServicesCnt] = useState(1);
    const [currentType, setCurrentType] = useState("");
    const [validated, setValidated] = useState(false);

    const [namesInvalid, setNamesInvalid] = useState([])

    let services

    if (show && servicesCnt > 0) {
        let array = [...Array(parseInt(servicesCnt)).keys()]

        services =
            <Col xs={12}>
                {array.map((i) =>
                    <ServiceInputs key={i} id={i} isNameInvalid={namesInvalid[i]}/>
                )}
            </Col>
    }

    const onFormSubmit = async (e) => {
        e.preventDefault()

        if (currentType === "" || servicesCnt < 1) {
            setValidated(false)
            return
        }

        let roomNumbers = []
        let roomsToAdd = []

        for (let i = 0; i < servicesCnt; i++) {
            const serviceNameField = document.getElementById('name' + i)

            if (roomNumbers.includes(serviceNameField.value)) {
                let copy = [...namesInvalid]
                copy[i] = true
                setNamesInvalid(copy)
                return;
            }

            const cost = document.getElementById('cost' + i).value
            const description = document.getElementById('description' + i).value

            const service = {
                'typeId': currentType,
                'name': serviceNameField.value,
                'cost': parseInt(cost),
                'description': description,
            }

            roomNumbers.push(serviceNameField.value)
            roomsToAdd.push(service)
        }

        const res = await validate(roomsToAdd)

        if (res !== true) {
            let copy = [...namesInvalid]

            for (let i = 0; i < res.length; i++) {
                copy[i] = !res[i]
            }

            setNamesInvalid(copy)
        } else {
            clear()
        }
    }

    const onSelectChange = (e) => {
        setShow(true)
        const typeId = e.target.value
        setCurrentType(typeId)
    }

    const clear = () => {
        setServicesCnt(1)
        setShow(false)
        document.getElementById("type").selected = true
        setCurrentType("")
        setVisible(false)

        let copy =  [...namesInvalid]
        for (let i = 0; i < copy.length; i++) {
            copy[i] = false
        }
        setNamesInvalid(copy)
    }

    return (
        <MyForm onFormSubmit={onFormSubmit} onCancel={clear} validated={validated}>
            <Row className='align-items-end'>
                <Form.Group as={Col} xs={10}>
                    <Form.Label>Категория</Form.Label>
                    <Form.Select onChange={onSelectChange} style={{minWidth: 600}}>
                        <option disabled defaultValue value id="type"> Выберите категорию</option>
                        {types.map(type => <option key={type.id} value={type.id}> {type.name} </option>)}
                    </Form.Select>
                </Form.Group>

                <Col>
                    <Form.Label>Количество</Form.Label>
                    <Form.Control id="serviceCnt" type="number" value={servicesCnt}
                                  onChange={event => setServicesCnt(event.target.value)}/>
                </Col>

                <Container className="pb-2" fluid style={{overflow: "scroll", maxHeight: 350}}>
                    {services}
                </Container>
            </Row>
        </MyForm>
    );
};

export default ServicesForm;