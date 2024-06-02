import React from 'react';
import {Button, Col, Row} from "react-bootstrap";
import cl from "../../rooms/room/Room.module.css";

const Service = ({params, showEditRoom, delRoom}) => {
    return (
        <Row onClick={() => showEditRoom(params)} className={["align-items-center", cl.roomType].join(" ")}>
            <Col>
                <span>{params.name}, {params.cost}</span>
            </Col>
            <Col className="d-flex justify-content-end">
                <Button onClick={(e) => {e.stopPropagation(); delRoom(params)}}>Удалить</Button>
            </Col>
        </Row>
    );
};

export default Service;