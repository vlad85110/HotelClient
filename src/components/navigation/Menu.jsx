import {Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export function Menu({setItem}) {
    return (
        <Nav variant="tabs">
            <Nav.Item>
                <Nav.Link onClick={() => setItem("Booking")}>Бронирования</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => setItem("Rooms")}>Номера</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => setItem("RoomTypes")}>Категории Номеров</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => setItem("People")}>Физ. лица</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => setItem("Organizations")}>Юр. лица</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => setItem("Services")}>Товары и услуги</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => setItem("ServiceTypes")}>Типы товаров и услуг</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => setItem("Statistics")}>Статистика</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}