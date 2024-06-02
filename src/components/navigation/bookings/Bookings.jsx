import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {Api} from "../../../api/Api";
import Modal from "../../modal/Modal";
import BookingForm from "./form/BookingForm";
import Booking from "./booking/Booking";
import BookingEdit from "./booking/BookingEdit";

const Bookings = () => {
    const [bookingCreateModal, setBookingCreateModal] = useState(false);
    const [bookingEditModal, setBookingEditModal] = useState(false);
    const [currentBooking, setCurrentBooking] = useState({});

    const startDate = new Date()
    startDate.setMilliseconds(0)
    startDate.setHours(0)
    startDate.setSeconds(0)
    startDate.setMinutes(0)

    const [busyRoomsCnt, setBusyRoomsCnt] = useState(0)
    Api.getBusyRoomsCnt().then(r => setBusyRoomsCnt(r.data))

    let colorNum = 0;
    const colors = ['crimson', 'lime', 'blue', 'purple', 'blueviolet', 'yellow', 'navy']

    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + 21)

    const dates = []

    const [roomsByType, setRoomsByType] = useState({});
    const [services, setServices] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [clients, setClients] = useState([]);
    const [people, setPeople] = useState([]);

    for (let i = 0; i < 21; i++) {
        let newDate = new Date(startDate)
        newDate.setDate(newDate.getDate() + i);
        dates.push(newDate)
    }

    useEffect(() => {
        updateRoomsAndServices();
    }, []);

    const updateRoomsAndServices = () => {
        Api.getAllServices().then(r => setServices(r.data))
        Api.getAllRooms().then(r => setRooms(r.data))
        Api.getAllPeople().then(async r => {
            const org = await Api.getAllOrganizations()
            const cls = org.data.concat(r.data)
            setClients(cls)
            setPeople(r.data)
        })
        Api.getAllTypes().then(async r => {
            const rooms = {}
            setRoomTypes(r.data)

            for (const type of r.data) {
                const res = await Api.getRoomsByType(type.id)
                rooms[type.name] = res.data

                for (const room of res.data) {
                    const roomBookings = await Api.getBookingByRoomAndPeriod(room.id,
                        startDate.getTime(), endDate.getTime())

                    room["bookings"] = roomBookings.data
                }
            }

            setRoomsByType(rooms)
        })
    }

    const addBooking = async (booking) => {
        try {
            await Api.addBooking(booking)
            updateRoomsAndServices()
            return true
        } catch (e) {
            return e.response.data
        }
    }

    const deleteBooking = async (id) => {
        await Api.deleteBooking(id)
        setCurrentBooking({})
    }

    const getRoomRow = (room) => {
        if (room.bookings.length === 0) {
            return Array(21).fill({len: 1, text: "", className: "border-start border-end"})
        }

        const roomBookings = [...room.bookings]

        const columns = []

        for (let i = 0; i < dates.length; i++) {
            const firstBooking = roomBookings.at(0)

            if (firstBooking !== undefined && firstBooking.startDate < dates.at(0).getTime()) {
                let len = 21

                for (const date of dates) {
                    if (date.getTime() === firstBooking.endDate) {
                        len = dates.indexOf(date) + 1
                    }
                }

                columns.push({
                    len: len,
                    text: "1",
                    booking: firstBooking,
                    onClick: () => {
                        setCurrentBooking(firstBooking)
                        setBookingEditModal(true)
                    },
                    color: colors.at(colorNum),
                    className: "border-start border-end"
                })

                roomBookings.shift()

                colorNum = (colorNum + 1)

                if (colorNum === colors.length) {
                    colorNum = 0
                }
                i += len - 1
            } else if (firstBooking !== undefined && firstBooking.startDate === dates.at(i).getTime()) {
                const oneDay = 24 * 60 * 60 * 1000;
                const len = (firstBooking.endDate - firstBooking.startDate) / oneDay
                columns.push({
                    len: len,
                    text: "1",
                    booking: firstBooking,
                    onClick: () => {
                        setCurrentBooking(firstBooking)
                        setBookingEditModal(true)
                    },
                    color: colors.at(colorNum),
                    className: "border-start border-end"
                })
                roomBookings.shift()
                i += len - 1

                colorNum = (colorNum + 1)

                if (colorNum === colors.length) {
                    colorNum = 0
                }

            } else {
                columns.push({len: 1, text: "0", className: "border-start border-end"})
            }
        }

        return columns
    }

    return (
        <Container fluid>
            <Row>
                <h4>Занятых номеров : {busyRoomsCnt} </h4>
            </Row>

            <Button onClick={() => setBookingCreateModal(true)}>Добавить бронирование</Button>

            <Modal visible={bookingCreateModal} setVisible={setBookingCreateModal}>
                <BookingForm validate={addBooking} visible={bookingCreateModal} setVisible={setBookingCreateModal}
                             rooms={rooms} roomTypes={roomTypes} roomsByType={roomsByType} clients={clients}
                             people={people}/>
            </Modal>

            <Modal visible={bookingEditModal} setVisible={setBookingEditModal}>
                {currentBooking !== {} && <BookingEdit booking={currentBooking} deleteBooking={deleteBooking}>

                </BookingEdit>}
            </Modal>


            <Col className="pt-2">
                <Table responsive size="sm" className="table border">
                    <thead>
                    <tr>
                        <th>#</th>
                        {dates.map((date, index) => (
                            <th className="border" key={index}>
                                {String(date.getDate()).padStart(2, '0')}
                                .
                                {String(date.getMonth() + 1).padStart(2, '0')}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>

                    {Object.keys(roomsByType).map((key) =>
                        <>
                            {roomsByType[key].length > 0 &&
                                <tr>
                                    <td colSpan={22} className="border-end border-start"><h4>{key}</h4></td>
                                </tr>}
                            {roomsByType[key].map(room =>
                                <tr>
                                    <td className="border-end border-start">{room.name}</td>

                                    {getRoomRow(room).map(col =>
                                        <>
                                            {col.booking === undefined &&
                                                <td className={col.className} onClick={col.onClick} colSpan={col.len}>
                                                </td>}
                                            {col.booking &&
                                                <Booking col={col}></Booking>
                                            }
                                        </>
                                    )}
                                </tr>
                            )}
                        </>
                    )}
                    </tbody>
                </Table>
            </Col>
        </Container>
    );
};

export default Bookings;