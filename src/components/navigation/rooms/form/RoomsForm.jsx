import React, {useState} from 'react';
import {Col, Container, Form, Row} from "react-bootstrap";
import MyForm from "../../../form/MyForm";
import RoomInputs from "./RoomInputs";

const RoomsForm = ({setVisible, types, validate}) => {
    const [show, setShow] = useState(false);
    const [roomCnt, setRoomCnt] = useState(1);
    const [currentType, setCurrentType] = useState("");
    const [validated, setValidated] = useState(false);
    const [numsInvalid, setNumsInvalid] = useState([])

    let rooms

    if (show && roomCnt > 0) {
        let array = [...Array(parseInt(roomCnt)).keys()]

        rooms =
            <Col xs={12}>
                {array.map((i) =>
                    <RoomInputs key={i} id={i} isNumberInvalid={numsInvalid[i]}/>
                )}
            </Col>
    }

    const onFormSubmit = async (e) => {
        e.preventDefault()

        if (currentType === "" || roomCnt < 1) {
            setValidated(false)
            return
        }

        let roomNumbers = []
        let roomsToAdd = []

        for (let i = 0; i < roomCnt; i++) {
            const roomNumField = document.getElementById('roomNumber' + i)

            if (roomNumbers.includes(roomNumField.value)) {
                let copy = [...numsInvalid]
                copy[i] = true
                setNumsInvalid(copy)
                return;
            }

            const floorNum = document.getElementById('floor' + i).value
            const description = document.getElementById('description' + i).value

            const room = {
                'typeId': currentType,
                'name': roomNumField.value,
                'floor': parseInt(floorNum),
                'description': description,
            }

            roomNumbers.push(roomNumField.value)
            roomsToAdd.push(room)
        }

        const res = await validate(roomsToAdd)

        if (res !== true) {
            let copy = [...numsInvalid]

            for (let i = 0; i < res.length; i++) {
                copy[i] = !res[i]
            }

            setNumsInvalid(copy)
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
        setRoomCnt(1)
        setShow(false)
        document.getElementById("type").selected = true
        setCurrentType("")
        setVisible(false)

        let copy =  [...numsInvalid]
        for (let i = 0; i < copy.length; i++) {
            copy[i] = false
        }
        setNumsInvalid(copy)
    }

    return (
        <MyForm onFormSubmit={onFormSubmit} onCancel={clear} validated={validated}>
            <Row className='align-items-end'>
                <Form.Group as={Col} xs={10}>
                    <Form.Label>Категория номеров</Form.Label>
                    <Form.Select onChange={onSelectChange} style={{minWidth: 600}}>
                        <option disabled defaultValue value id="type"> Выберите категорию номера</option>
                        {types.map(type => <option key={type.id} value={type.id}> {type.name} </option>)}
                    </Form.Select>
                </Form.Group>

                <Col>
                    <Form.Label>Количество номеров</Form.Label>
                    <Form.Control id="roomCnt" type="number" value={roomCnt}
                                  onChange={event => setRoomCnt(event.target.value)}/>
                </Col>

                <Container className="pb-2" fluid style={{overflow: "scroll", maxHeight: 350}}>
                    {rooms}
                </Container>
            </Row>
        </MyForm>
    );
};

export default RoomsForm;