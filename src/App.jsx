import {NaviBar} from "./components/navigation/NaviBar";
import {Menu} from "./components/navigation/Menu";
import {useState} from "react";
import {Settings} from "./components/settings/Settings";
import {Routing} from "./routing/Routing";
import Bookings from "./components/navigation/bookings/Bookings";
import {Rooms} from "./components/navigation/rooms/Rooms";
import {RoomTypes} from "./components/navigation/room_types/RoomTypes";
import People from "./components/navigation/clients/people/People";
import Organizations from "./components/navigation/clients/ogranizations/Organizations";
import ServiceTypes from "./components/navigation/service_types/ServiceTypes";
import Services from "./components/navigation/services/Services";
import Statistics from "./components/navigation/statisctics/Statistics";

function App() {
    const [menuItem, setMenuItem] = useState("");

    const map = {
        "Booking": <Bookings/>,
        "Settings": <Settings/>,
        "Rooms": <Rooms/>,
        "RoomTypes": <RoomTypes/>,
        "People": <People/>,
        "Organizations": <Organizations/>,
        "ServiceTypes": <ServiceTypes/>,
        "Services": <Services/>,
        "Statistics": <Statistics/>
    };

    let content = Routing.chooseRoute(menuItem, map)

    return (
        <div>
            <NaviBar/>
            <Menu setItem={setMenuItem}/>
            {content}
        </div>
    );
}

export default App;
