import axios from "axios";

export class Api {
    static async getAllTypes() {
        return await axios.get("http://127.0.0.1:8080/roomType")
    }

    static async getRoomsByType(typeId) {
        return await axios.get("http://127.0.0.1:8080/room/type?typeId=" + typeId)
    }

    static async addRooms(rooms) {
        return await axios.post("http://127.0.0.1:8080/room/list", rooms)
    }

    static async deleteRoom(id) {
        return await axios.delete("http://127.0.0.1:8080/room?id=" + id)
    }

    static async getAllRooms() {
        return await axios.get("http://127.0.0.1:8080/room")
    }

    static async addType(type) {
        return await axios.post("http://127.0.0.1:8080/roomType", type).catch(function (error) {
        })
    }

    static async deleteRoomType(id) {
        return await axios.delete("http://127.0.0.1:8080/roomType?id=" + id).catch(function (error) {
        })
    }

    static async editRoom(room) {
        return await axios.put("http://127.0.0.1:8080/room", room)

    }

    static async editRoomType(roomType) {
        return await axios.put("http://127.0.0.1:8080/roomType", roomType).catch(function (error) {
        })
    }

    static async addBooking(booking) {
        return await axios.post("http://127.0.0.1:8080/booking", booking)
    }

    static async getBookingByRoomAndPeriod(roomId, startDate, endDate) {
        return await axios.get("http://127.0.0.1:8080/booking?roomId=" + roomId + "&startDate="
            + startDate + "&endDate=" + endDate)
    }

    static async getAllPeople() {
        return await axios.get("http://127.0.0.1:8080/people")
    }

    static async addPeople(people) {
        return await axios.post("http://127.0.0.1:8080/people", people)
    }

    static async editPeople(people) {
        return await axios.put("http://127.0.0.1:8080/people", people)
    }

    static async deletePeople(id) {
        return await axios.delete("http://127.0.0.1:8080/people?id=" + id)
    }

    static async getAllOrganizations() {
        return await axios.get("http://127.0.0.1:8080/organization")
    }

    static async addOrganization(organization) {
        return await axios.post("http://127.0.0.1:8080/organization", organization)
    }

    static async editOrganization(organization) {
        return await axios.put("http://127.0.0.1:8080/organization", organization)
    }

    static async deleteOrganization(id) {
        return await axios.delete("http://127.0.0.1:8080/organization?id=" + id)
    }

    static async getAllServiceTypes() {
        return await axios.get("http://127.0.0.1:8080/serviceType")
    }

    static async addServiceType(type) {
        return await axios.post("http://127.0.0.1:8080/serviceType", type)
    }

    static async editServiceType(type) {
        return await axios.put("http://127.0.0.1:8080/serviceType", type)
    }

    static async deleteServiceType(id) {
        return await axios.delete("http://127.0.0.1:8080/serviceType?id=" + id)
    }

    static async getServicesByType(typeId) {
        return await axios.get("http://127.0.0.1:8080/service/type?typeId=" + typeId)
    }

    static async addServices(rooms) {
        return await axios.post("http://127.0.0.1:8080/service/list", rooms)
    }

    static async deleteService(id) {
        return await axios.delete("http://127.0.0.1:8080/service?id=" + id)
    }

    static async getAllServices() {
        return await axios.get("http://127.0.0.1:8080/service")
    }

    static async editService(room) {
        return await axios.put("http://127.0.0.1:8080/service", room)

    }

    static async getRoomsAndPeopleByBookingId(bookingId) {
        return await axios.get("http://127.0.0.1:8080/booking/roomPeople?id=" + bookingId)
    }

    static async deleteBooking(id) {
        return await axios.delete("http://127.0.0.1:8080/booking?id=" + id)
    }


    static async getBusyRoomsCnt() {
        return await axios.get("http://127.0.0.1:8080/booking/busyRooms")
    }
}
