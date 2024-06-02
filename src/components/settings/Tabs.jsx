import {ListGroup} from "react-bootstrap";

export function Tabs({setItem}) {
    return (
        <ListGroup>
            <ListGroup.Item action onClick={() => setItem("RoomTypes")}>
                Категории номеров
            </ListGroup.Item>
            <ListGroup.Item action onClick={() => setItem("Rooms")}>
                Номера
            </ListGroup.Item>
        </ListGroup>
    )
}