import React, {useEffect, useState} from 'react';
import {Button, Col, Container} from "react-bootstrap";
import {Api} from "../../../../api/Api";

const BookingEdit = ({booking, deleteBooking}) => {
    const [rooms, setRooms] = useState([])
    const [people, setPeople] = useState([])

    const startDate = new Date(booking.startDate)
    const endDate = new Date(booking.endDate)

    useEffect(() => {
        Api.getRoomsAndPeopleByBookingId(booking.id).then((r => {
            setRooms(r.data.rooms);
            setPeople(r.data.people);
        }))

    }, [booking]);

    return (
        <Container>
            <h6>
                C {String(startDate.getDate()).padStart(2, '0')}
                .{String(startDate.getMonth() + 1).padStart(2, '0')}
            </h6>

            <h6>
                До {String(endDate.getDate()).padStart(2, '0')}
                .{String(endDate.getMonth() + 1).padStart(2, '0')}
            </h6>

            <h4> Номера </h4>
            {rooms.map(room =>
                <Col>
                    <span>{room.name}, {room.floor} этаж</span>
                </Col>
            )}

            <h4>Клиенты</h4>
            {people.map(people =>
                <Col>
                    <span>{people.lastName} {people.firstName}, {people.passportNumber}</span>
                </Col>
            )}

            <Col  className="d-flex justify-content-end pt-2">
                <Button onClick={(e) => {
                    e.stopPropagation();
                    deleteBooking(booking.id)
                }}>Удалить</Button>
            </Col>
        </Container>
    );
};

export default BookingEdit;