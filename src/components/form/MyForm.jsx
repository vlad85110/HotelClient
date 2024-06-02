import React from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";

const MyForm = (props) => {
    return (
        <Form validated={props.validated} onSubmit={props.onFormSubmit}>
            {props.children}
            <Col xs={12} className="justify-content-end">
                <Row className="align-items-end">
                    <Col className="mt-3" style={{display: "flex", justifyContent: "end"}}>
                        <Button className="me-2" type="submit">Сохранить</Button>
                        <Button onClick={props.onCancel}>Отмена</Button>
                    </Col>
                </Row>
            </Col>
        </Form>
    );
};

export default MyForm;