import React, { useState, useEffect } from "react";
import { ScaleTextField } from "./scaleTextField";
import { ScaleDatePicker } from "./scaleDatePicker";

const BookNow = ({ updateScreen, selectedSpace, setShape }) => {
    const [availableScreen, setAvailableScreen] = useState(false);
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
        setTicket(null)
        fetch("http://147.232.155.76:8080/ticket/user/" + userId)
            .then(resp => resp.json())
            .then(json => setTicket(json))
            .catch(err => setTicket(null));;
    };

    const fetchUserInfo = (userId) => {
        fetch("http://147.232.155.76:8080/employee/" + userId)
            .then(resp => resp.json())
            .then(json => setUser(json));
    };

    const fetchData = () => {
        const userId = localStorage.getItem("UserToken");
        if (userId) {
            fetchUserInfo(userId);
            fetchUserTicketInfo(userId);
        }
    }

    const changeScreen = () => {
        updateScreen('profile');
    };

    const getAvailableSpots = () => {
        const startTime = new Date(new Date(date).getTime() + timeFrom * 60 * 60 * 1000).toISOString();
        const endTime = new Date(new Date(date).getTime() + timeTo * 60 * 60 * 1000).toISOString();
        console.log(startTime, endTime)
                fetch("http://147.232.155.76:8080/parkingslot", {
            method: "POST",
            body: JSON.stringify({
                startDate: startTime,
                endDate: endTime
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          if (!response.ok) {
            console.log({response})
            return;
          }
          response.json().then((json) => {
            console.log(json);
            const shape = {
                type: "FeatureCollection",
                features: 
                  json.map((slot) => ({
                    type: "Feature",
                    id: slot.id,
                    geometry: {
                      type: "Polygon",
                      coordinates: [
                        [
                          slot.coordinate1,
                          slot.coordinate2,
                          slot.coordinate3,
                          slot.coordinate4,
                          slot.coordinate1,
                        ],
                      ],
                    },
                    properties: {
                      color: slot.status === "FREE" ? "green" : "orange",
                    },
                  })),
              };
              setShape(shape);
          });
        });

    }

    const bookClick = () => {
        const startTime = new Date(new Date(date).getTime() + timeFrom * 60 * 60 * 1000).toISOString();
        const endTime = new Date(new Date(date).getTime() + timeTo * 60 * 60 * 1000).toISOString();
        const req = {
            employeeID: user.id,
            parkingSlotID: selectedSpace.feature.id,
            startDate: startTime,
            endDate: endTime
      }
      console.log(req)
        fetch("http://147.232.155.76:8080/ticket", {
            method: "POST",
            body: JSON.stringify(req),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          if (!response.ok) {
            console.log({response})
            return;
          }
          response.json().then((json) => {
            console.log(json);
          })
        })
        fetchData()
    }

    const edit = () => {
        setAvailableScreen(true)
    }

    const Search = () => {
        getAvailableSpots();
        setAvailableScreen(true);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='gap-5 flex flex-col'>
            <div className="flex justify-between text-left">
                <h3 className='text-4xl font-extrabold'>Welcome back {user.name} 👋 </h3>
                <span className="material-symbols-rounded bg-gray-200 h-fit p-2 text-pink-600 rounded-full cursor-pointer" onClick={changeScreen}>person</span>
            </div>

            { ticket && ticket.id ? (
                <div className="gap-2 flex flex-col">
                    <p className="">You currently park at space <span className="font-extrabold">{ticket.parkingSlotID}</span></p>
                    <span className="text-emerald-500 text-6xl material-symbols-rounded">directions_car</span>
                    <p>{ticket.startDate} - {ticket.endDate}</p>
                    <p>{user.licencePlateNumber}</p>
                    <scale-button onClick={edit}>Edit</scale-button>
                </div>
            ) : (
                <div className='gap-5 flex flex-col'>
                    <p className="text-left">Book a parking for your next visit in the office</p>
                    <ScaleDatePicker
                        label="Select date"
                        value=""
                        onScaleChange={(e) => setDate(e.detail.value)}
                    ></ScaleDatePicker>

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

                    <scale-button onClick={Search}>Search</scale-button>

                    {availableScreen === true ? (
                        <div className="flex justify-between flex-col">
                            <scale-divider></scale-divider>
                            <p className="font-extrabold">Available spaces</p>
                            <p className="font-light">Select available parking space in the map</p>
                            <scale-divider></scale-divider>
                            <div className="flex flex-row gap-2">
                                <span className="text-emerald-500 text-6xl material-symbols-rounded">directions_car</span>
                                <div className="flex flex-col text-left">
                                    <p>Space number: <span className="font-extrabold">{selectedSpace && selectedSpace.feature ? selectedSpace.feature.id : " "}</span></p>
                                    <p>Time: <span className="font-extrabold">{timeFrom} - {timeTo}</span></p>
                                </div>
                            </div>
                            <scale-button onClick={bookClick}>Book</scale-button>
                        </div>
                        
                    ) : (
                        <div>
                            {/* Placeholder for content when availableScreen is false */}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default BookNow;
