import React, { useState } from "react";

const BookNow = ({ updateScreen }) => {
    const [availableScreen, setAvailableScreen] = useState(true);

    const changeScreen = () => {
        updateScreen('profile');
    };

    return (
        <div className='gap-5 flex flex-col'>
            <div className="flex justify-between">
                <span className="opacity-0">fdsf</span>
                <h3 className='text-4xl font-extrabold'>Booking</h3>
                <span className="material-symbols-rounded bg-gray-200 h-fit p-2 text-pink-600 rounded-full cursor-pointer" onClick={changeScreen}>person</span>
            </div>

            

            <scale-date-picker
                label="Select date"
                value={new Date}
            ></scale-date-picker>

            <div className="flex flex-row gap-2">
                <scale-text-field
                    placeholder="0 - 24"
                    label="Time from"
                ></scale-text-field>
                <scale-text-field
                    placeholder="0 - 24"
                    label="Time to"
                ></scale-text-field>
            </div>

            {availableScreen && (
                <div className="flex justify-between flex-col">
                    <scale-divider></scale-divider>
                    <p className="font-extrabold">Available spaces</p>
                    <p className="font-light">Select available parking space in the map dfjakgjalksjv fklds</p>
                    <scale-divider></scale-divider>
                    <div className="flex flex-row gap-2">
                        <span className="text-emerald-500 text-6xl material-symbols-rounded">directions_car</span>
                        <div className="flex flex-col text-left">
                            <p>Status: <span className="font-extrabold">free</span></p>
                            <p>Time: <span className="font-extrabold">9:00 - 11:00</span></p>
                        </div>
                    </div>
                </div>
            )}

            <scale-button>Continue</scale-button>
        </div>
    );
};

export default BookNow;
