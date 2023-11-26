import React, { useState } from "react";

const Profile = ({ updateScreen }) => {
    const [state, setState] = useState({
        name: "",
        number: "",
        email: "",
        personalNumber: "",
        licensePlates: [
            { id: 1, placeholder: "your licence plate number", label: "Licence plate number", value: "" }
        ],
        nextLicensePlateId: 2,
    });

    const handleChange = (field, value) => {
        setState((prev) => ({ ...prev, [field]: value }));
    };

    const handleLicensePlateChange = (id, value) => {
        setState((prev) => ({
            ...prev,
            licensePlates: prev.licensePlates.map((plate) =>
                plate.id === id ? { ...plate, value } : plate
            ),
        }));
    };

    const addLicensePlate = () => {
        setState((prev) => ({
            ...prev,
            licensePlates: [
                ...prev.licensePlates,
                {
                    id: prev.nextLicensePlateId,
                    placeholder: "your licence plate number",
                    label: "Licence plate number",
                    value: "",
                },
            ],
            nextLicensePlateId: prev.nextLicensePlateId + 1,
        }));
    };

    const changeScreen = (screen) => {
      updateScreen(screen);
    };

    const logout = () => {
        localStorage.removeItem("UserToken");
        changeScreen('login')
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="flex justify-between">
                    <span className="text-pink-600 material-symbols-rounded cursor-pointer" onClick={() => changeScreen('home')}>arrow_back</span>
                    <p className="font-extrabold">Profile</p>
                    <span className="material-symbols-rounded text-pink-600 " onClick={() => logout()}>logout</span>
                </div>
            <scale-text-field
                placeholder="your name"
                label="Name"
                value={state.name}
                onChange={(e) => handleChange("name", e.target.value)}
            ></scale-text-field>
            <scale-text-field
                placeholder="Number"
                label="number"
                value={state.number}
                onChange={(e) => handleChange("number", e.target.value)}
            ></scale-text-field>
            <scale-text-field
                placeholder="your email"
                label="Email"
                value={state.email}
                onChange={(e) => handleChange("email", e.target.value)}
            ></scale-text-field>
            <scale-text-field
                placeholder="your personal number"
                label="Personal number"
                value={state.personalNumber}
                onChange={(e) => handleChange("personalNumber", e.target.value)}
            ></scale-text-field>

            <p className="font-extrabold">License plates</p>
            {state.licensePlates.map((plate) => (
                <scale-text-field
                    key={plate.id}
                    placeholder={plate.placeholder}
                    label={plate.label}
                    value={plate.value}
                    onChange={(e) => handleLicensePlateChange(plate.id, e.target.value)}
                ></scale-text-field>
            ))}
            <button
                className="text-emerald-500 flex flex-row justify-center align-items-center gap-2"
                onClick={addLicensePlate}
            >
                <span className=" material-symbols-rounded">add</span>add licence plate
            </button>
            <scale-button onClick={() => console.log(state)}>Save</scale-button>
        </div>
    );
};

export default Profile;
