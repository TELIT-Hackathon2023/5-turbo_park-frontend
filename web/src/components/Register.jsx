import React, { useState } from "react";

const Register = ({ updateScreen }) => {
    const [state, setState] = useState({
        name: "",
        number: "",
        email: "",
        password: "",
        passwordAgain: "",
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

    return (
        <div className="flex flex-col gap-5">
             <p className="font-extrabold text-4xl">Register</p>

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
                placeholder="your password"
                label="Password"
                type="password"
                value={state.password}
                onChange={(e) => handleChange("email", e.target.value)}
            ></scale-text-field>
            <scale-text-field
                placeholder="your password again"
                label="Password again"
                type="password"
                value={state.passwordAgain}
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
            <scale-button onClick={() => console.log(state)}>Register</scale-button>

            <div>
                <p>Already a member ?</p>
                <p className="text-pink-600" onClick={() => changeScreen('login')}>Log in</p>
            </div>
        </div>
    );
};

export default Register;
