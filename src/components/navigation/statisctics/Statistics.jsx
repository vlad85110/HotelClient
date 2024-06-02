import React, {useState} from 'react';
import {Container} from "react-bootstrap";
import {Api} from "../../../api/Api";

const Statistics = () => {
    const [busyRoomsCnt, setBusyRoomsCnt] = useState(0)

    Api.getBusyRoomsCnt().then(r => setBusyRoomsCnt(r.data))

    return (
        <Container>

        </Container>
    );
};

export default Statistics;