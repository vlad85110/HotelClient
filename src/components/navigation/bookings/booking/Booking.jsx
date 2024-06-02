import React from 'react';
import {Col, Container, Row} from "react-bootstrap";

const Booking = ({col}) => {
    const myStyle = {
        backgroundColor: col.color,
    };


    return (
        <td style={myStyle} onClick={col.onClick} colSpan={col.len}>
        </td>
    );
};

export default Booking;