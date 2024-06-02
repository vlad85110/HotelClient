import React from 'react';
import {Button, Col, Row} from "react-bootstrap";
import cl from './Room.module.css';

const Room = ({params, showEditRoom, delRoom}) => {
    console.log(params)

    return (
        <Row onClick={() => showEditRoom(params)} className={["align-items-center", cl.roomType].join(" ")}>
            <Col>
                <span>{params.name}, {params['floor']} этаж</span>
            </Col>
            <Col className="d-flex justify-content-end">
                <Button onClick={(e) => {e.stopPropagation(); delRoom(params)}}>Удалить</Button>
            </Col>
        </Row>
    );
};

export default Room;