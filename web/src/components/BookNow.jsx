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
                <span className="material-symbols-rounded" onClick={changeScreen}>person</span>
            </div>

            <p className="font-extrabold">Available spaces</p>

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
                    <p className="font-light">Select available parking space in the map dfjakgjalksjv fklds jf</p>
                </div>

            )}

            <scale-button>Continue</scale-button>
        </div>
    );
};

export default BookNow;
