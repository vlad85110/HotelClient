import React from 'react';
import {Button, Col, Row} from "react-bootstrap";
import cl from "../../../rooms/room/Room.module.css";

const Organization = ({params, showEditOrganization, deleteOrganization}) => {
    return (
        <Row onClick={() => showEditOrganization(params)} className={["align-items-center", cl.roomType].join(" ")}>
            <Col>
                <span>{params.name}, {params.inn}</span>
            </Col>
            <Col className="d-flex justify-content-end">
                <Button onClick={(e) => {e.stopPropagation(); deleteOrganization(params)}}>Удалить</Button>
            </Col>
        </Row>
    );
};

export default Organization;