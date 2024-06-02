import React from 'react';
import {Button, Col, Row} from "react-bootstrap";
import cl from "../../rooms/room/Room.module.css";

const PeopleModel = ({params, showEditPeople, deletePeople}) => {
    return (
        <Row onClick={() => showEditPeople(params)} className={["align-items-center", cl.roomType].join(" ")}>
            <Col>
                <span>{params.lastName} {params.firstName}, {params.passportNumber}</span>
            </Col>
            <Col className="d-flex justify-content-end">
                <Button onClick={(e) => {e.stopPropagation(); deletePeople(params)}}>Удалить</Button>
            </Col>
        </Row>
    );
};

export default PeopleModel;