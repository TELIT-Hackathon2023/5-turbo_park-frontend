import React, { useState, useEffect } from "react";
import { ScaleTextField } from "./scaleTextField";

const BookNow = ({ updateScreen, selectedSpace }) => {
    const [availableScreen, setAvailableScreen] = useState(true);
    const [user, setUser] = useState({
        email: "bob@example.com",
        id: 1,
        licencePlateNumber: "KE456RI",
        name: "Bob",
        personalId: 123456,
        phoneNumber: "+421000000000",
        surname: "Bobers"
    });
    const [ticket, setTicket] = useState({
        employeeID: 1,
        endDate: "2023-11-26T05:00:00+01:00",
        id: 2,
        parkingSlotID: 2,
        startDate: "2023-11-26T03:00:00+01:00"
    });
    const [date, setDate] = useState();
    const [timeFrom, setTimeFrom] = useState();
    const [timeTo, setTimeTo] = useState();

    const fetchUserTicketInfo = (userId) => {
      fetch("http://147.232.155.76:8080/ticket/user/" + userId)
        .then(resp => resp.json())
        .then(json => setTicket(json))
    }
  
    const fetchUserInfo = (userId) => {
      fetch("http://147.232.155.76:8080/employee/" + userId)
        .then(resp => resp.json())
        .then(json => setUser(json))
    }

    const changeScreen = () => {
        updateScreen('profile');
    };

    useEffect(() => {
        const userId = localStorage.getItem("UserToken");
        if (userId){
            fetchUserInfo(userId);
            fetchUserTicketInfo(userId);
        }   
    }, []);

    return (
        <div className='gap-5 flex flex-col'>
            <div className="flex justify-between text-left">
                <h3 className='text-4xl font-extrabold'>Welcome back {user.name} 👋 </h3>
                <span className="material-symbols-rounded bg-gray-200 h-fit p-2 text-pink-600 rounded-full cursor-pointer" onClick={changeScreen}>person</span>
            </div>

            {!ticket ? (
                <div className="gap-2 flex flex-col">
                    <p className="">You currently park at space <span className="font-extrabold">{ ticket.id }</span></p>
                    <span className="text-emerald-500 text-6xl material-symbols-rounded">directions_car</span>
                    <p>{ ticket.startDate } - {ticket.endDate}</p>
                    <p>{ user.licencePlateNumber }</p>
                    <scale-button>Edit</scale-button>
                </div>
            ) : (
                <div className='gap-5 flex flex-col'>
                    <scale-date-picker
                        label="Select date"
                        value={new Date()}
                    ></scale-date-picker>

                    <div className="flex flex-row gap-2">
                        <ScaleTextField
                            placeholder="0 - 24"
                            type="number"
                            label="Time from"
                            onScaleChange={(e) => setTimeFrom(e.detail.value)}
                        ></ScaleTextField>
                        <ScaleTextField
                            placeholder="0 - 24"
                            type="number"
                            label="Time to"
                            onScaleChange={(e) => setTimeTo(e.detail.value)}
                        ></ScaleTextField>
                    </div>

                    <div className="flex justify-between flex-col">
                            <scale-divider></scale-divider>
                            <p className="font-extrabold">Available spaces</p>
                            <p className="font-light">Select available parking space in the map dfjakgjalksjv fklds</p>
                            <scale-divider></scale-divider>
                            <div className="flex flex-row gap-2">
                                <span className="text-emerald-500 text-6xl material-symbols-rounded">directions_car</span>
                                <div className="flex flex-col text-left">
                                    <p>Space number: <span className="font-extrabold">{selectedSpace && selectedSpace.feature ? selectedSpace.feature.id : " "}</span></p>
                                    <p>Time: <span className="font-extrabold">{timeFrom} - {timeTo}</span></p>
                                </div>
                            </div>
                    </div>

                    <scale-button>Continue</scale-button>
                </div>
            )}
        </div>
    )
};

export default BookNow;
