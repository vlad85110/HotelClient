import React from 'react';
import {Col, Form, Row} from "react-bootstrap";

const RoomInputs = ({id, isNumberInvalid}) => {
    return (
        <Row key={id} className="align-items-end mt-3">
            <Col>
                <Form.Label>Номер комнаты</Form.Label>
                <Form.Control.Feedback type="invalid"> Комната с таким номером уже существует </Form.Control.Feedback>
                <Form.Control required id={"roomNumber" + id} isInvalid={isNumberInvalid} type="text"/>
            </Col>
            <Col>
                <Form.Label>Этаж</Form.Label>
                <Form.Control id={'floor' + id} type="number" required/>
            </Col>
            <Col>
                <Form.Label>Описание</Form.Label>
                <Form.Control id={'description' + id} type="text"/>
            </Col>

            <Form.Control hidden id={"roomId" + id}></Form.Control>
        </Row>
    );
};

export default RoomInputs;