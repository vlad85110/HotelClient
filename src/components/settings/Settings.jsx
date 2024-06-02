import {Col, Row} from "react-bootstrap";
import {Tabs} from "./Tabs";
import {useState} from "react";
import {Rooms} from "../navigation/rooms/Rooms";
import {RoomTypes} from "../navigation/room_types/RoomTypes";
import {Routing} from "../../routing/Routing";

export function Settings() {
    const [settingsItem, setSettingsItem] = useState("");

    const map = {
        Rooms: <Rooms/>,
        RoomTypes: <RoomTypes/>
    };

    let content = Routing.chooseRoute(settingsItem, map)

    return (
        <Row>
            <Col xs={2}>
                <Tabs setItem={setSettingsItem}/>
            </Col>
            <Col>
                {content}
            </Col>
        </Row>
    )
}