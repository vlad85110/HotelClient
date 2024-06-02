import React, {useState} from 'react';
import {Col, Container, Form, Row} from "react-bootstrap";
import MyForm from "../../../form/MyForm";

const BookingForm = ({setVisible, id, validate, rooms, roomTypes, roomsByType, clients, people}) => {
    const [validated, setValidated] = useState(false);

    const [datesInvalid, setDatesInvalid] = useState(false);
    const [dateError, setDateError] = useState("");

    const [roomInvalid, setRoomInvalid] = useState(false);
    const [roomNumberError, setRoomNumberError] = useState("");

    if (id === undefined || id === null) {
        id = ""
    }

    const typesByName = {}

    for (const roomType of roomTypes) {
        typesByName[roomType.name] = roomType
    }

    const [typesCnt, setTypesCnt] = useState(1);
    const [roomsCntArr, setRoomsCntArr] = useState([1]);
    const [selectedTypes, setSelectedTypes] = useState(Array.from({length: typesCnt}))

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

        const rooms = []

        for (let i = 0; i < typesCnt; i++) {
            for (let j = 0; j < roomsCntArr[i]; j++) {
                const input = document.getElementById("room-" + i + "-" + j)
                const room = {
                    id: input.value,
                    people: []
                }

                for (let k = 0; k < typesByName[selectedTypes[i]].bedCnt; k++) {
                    const inp = document.getElementById("people-" + i + "-" + j + "-" + k)
                    room.people.push(inp.value)
                }

                rooms.push(room)
            }
        }

        const startDate = new Date(inputs.startDate.value)
        startDate.setMilliseconds(0)
        startDate.setHours(0)
        startDate.setSeconds(0)
        startDate.setMinutes(0)
        const endDate = new Date(inputs.endDate.value)
        endDate.setMilliseconds(0)
        endDate.setHours(0)
        endDate.setSeconds(0)
        endDate.setMinutes(0)

        //todo add 12h
        if (startDate > endDate) {
            setDatesInvalid(true)
            setDateError("Дата заезда должна быть меньше даты выезда")
        }

        const booking = {
            startDate: startDate.getTime(),
            endDate: endDate.getTime(),
            ownerId: inputs.ownerId.value,
            id: inputs.id.value,
            rooms: rooms
        }

        const res = await validate(booking)

        if (res === true) {
            clear()
        } else {
            if (res.roomNumberError !== null && res.roomNumberError !== undefined) {
                setRoomNumberError(res.roomNumberError)
                setRoomInvalid(true)
            }

            if (res.dateError !== null && res.dateError !== undefined) {
                setDateError(res.dateError)
                setDatesInvalid(true)
            }
        }
    }

    const getInputs = () => {
        return {
            startDate: document.getElementById("startDate" + id),
            endDate: document.getElementById("endDate" + id),
            id: document.getElementById("bookingId" + id),
            ownerId: document.getElementById("ownerId")
        }
    }

    const clear = (inputs) => {
        if (inputs === undefined) {
            inputs = getInputs()
        }

        for (let inputsKey in inputs) {
            inputs[inputsKey].value = ""
        }

        setRoomNumberError("")
        setRoomInvalid(false)
        setDatesInvalid(false)
        setDateError("")
        setVisible(false)
    }

    return (
        <MyForm onFormSubmit={onFormSubmit} validated={validated} onCancel={() => clear()}>
            <Container style={{overflow: "scroll", maxHeight: 500}}>

                <Container>
                    <Form.Control.Feedback type="invalid"> 2222 </Form.Control.Feedback>
                </Container>

                <Row className='align-items-end'>
                    <Row>
                        <Col>
                            <Form.Label>Дата заезда</Form.Label>
                            <Form.Control isInvalid={datesInvalid} type="date" id={"startDate" + id}
                                          required></Form.Control>
                        </Col>

                        <Col>
                            <Form.Label>Дата выезда</Form.Label>
                            <Form.Control isInvalid={datesInvalid} type="date" id={"endDate" + id}
                                          required></Form.Control>
                        </Col>

                        <Form.Control.Feedback type="invalid"
                                               id={"dateFeedback" + id}>{dateError}</Form.Control.Feedback>

                        <Form.Control hidden id={"bookingId" + id}></Form.Control>
                    </Row>


                    {Array.from({length: typesCnt}).map((_, index) => (
                        <Row key={index} className='align-items-end p-2'>
                            <Col>
                                <Form.Select required style={{minWidth: 550}} onChange={(event) => {
                                    let copy = [...selectedTypes];
                                    copy[index] = event.target.value;
                                    setSelectedTypes(copy)
                                }}>
                                    <option disabled defaultValue value id="type">
                                        Выберите категорию номера
                                    </option>
                                    {roomTypes.map(type => <option key={type.id}
                                                                   value={type.name}> {type.name} </option>)}
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Label>Количество номеров</Form.Label>
                                <Form.Control id="roomCnt" type="number"
                                              value={roomsCntArr[index]}
                                              onChange={event => {
                                                  let copy = [...roomsCntArr];
                                                  copy[index] = event.target.value;
                                                  setRoomsCntArr(copy)
                                              }}
                                />
                            </Col>

                            {Array.from({length: roomsCntArr[index]}).map((_, i) => (
                                <Container className="p-2">
                                    <Form.Select isInvalid={roomInvalid} required id={"room-" + index + "-" + i}>
                                        <option disabled defaultValue value id="type" selected>Выберите номер</option>
                                        {roomsByType[selectedTypes[index]] !== undefined
                                            && roomsByType[selectedTypes[index]].map(type =>
                                                <option key={type.id} value={type.id}> {type.name} </option>)}

                                    </Form.Select>

                                    <Container className="pt-1">
                                        <h6> Гости </h6>
                                    </Container>
                                    {typesByName[selectedTypes[index]] !== undefined &&
                                        Array.from({length: typesByName[selectedTypes[index]].bedCnt}).map((_, j) => (
                                            <Form.Select required id={"people-" + index + "-" + i + "-" + j}>
                                                <option disabled defaultValue selected>Выберите гостя</option>
                                                {people.map(type =>
                                                    <option key={type.id} value={type.id}>
                                                        {type.firstName} {type.lastName} {type.passportNumber}
                                                    </option>)}
                                            </Form.Select>

                                        ))}
                                </Container>
                            ))}
                        </Row>
                    ))}
                    <Row>
                        <Col>
                            <span className="text-primary" onClick={() => setTypesCnt(typesCnt + 1)}>
                                add type
                            </span>
                        </Col>
                        <Col>
                            <span className="text-primary" onClick={() => {
                                if (typesCnt !== 1) setTypesCnt(typesCnt - 1)
                            }}> delete type </span>
                        </Col>
                    </Row>
                </Row>

                <Row className='pt-2'>
                    <h4>Заказчик</h4>
                    <Container>
                        <Form.Select id={"ownerId" + id}>
                            <option disabled defaultValue value id="type" selected>Выберите заказчика</option>
                            {clients.map(type =>
                                <option key={type.id} value={type.id}>
                                    {type.name} {type.firstName} {type.lastName}
                                </option>)}
                        </Form.Select>
                    </Container>
                </Row>


            </Container>


        </MyForm>
    );
};

export default BookingForm;