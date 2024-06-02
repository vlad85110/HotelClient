import React from 'react';
import {Col, Form, Row} from "react-bootstrap";

const ServiceInputs = ({id, isNameInvalid}) => {
    return (
        <Row key={id} className="align-items-end mt-3">
            <Col>
                <Form.Label>Имя</Form.Label>
                <Form.Control.Feedback type="invalid">
                    Товар или услуга с таким номером уже существует
                </Form.Control.Feedback>
                <Form.Control required id={"name" + id} isInvalid={isNameInvalid} type="text"/>
            </Col>
            <Col>
                <Form.Label>Цена</Form.Label>
                <Form.Control id={'cost' + id} type="number" required/>
            </Col>

            <Col>
                <Form.Label>Описание</Form.Label>
                <Form.Control id={'description' + id} type="text"/>
            </Col>

            <Form.Control hidden id={"serviceId" + id}></Form.Control>
        </Row>
    );
};

export default ServiceInputs;