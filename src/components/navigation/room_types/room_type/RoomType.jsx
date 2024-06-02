import React from 'react';
import {Button, Col, Row} from "react-bootstrap";
import cl from './RoomType.module.css'

const RoomType = ({params, showEditType, deleteType}) => {
    return (
        <Row className={["align-items-center", cl.roomType].join(" ")} onClick={showEditType}>
            <Col>
            <span>{params.name}, мест: {params.bedCnt}</span>
            </Col>
            <Col className="d-flex justify-content-end">
                <Button onClick={(e) => {e.stopPropagation(); deleteType(params)}}>Удалить</Button>
            </Col>
        </Row>
    );
};

export default RoomType;