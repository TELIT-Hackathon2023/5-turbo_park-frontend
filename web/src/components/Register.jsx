import React, { useState } from "react";
import { ScaleTextField } from "./scaleTextField";

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

    const register = async () => {
        console.log(state);

        const employeeCreate = {
            name: state.name.split(" ")[0],
            surname: state.name.split(" ")[1],
            phoneNumber: state.number,
            personalId: Number(state.personalNumber),
            licencePlateNumber: state.licensePlates[0].value,
            email: state.email,
            password: state.password
        }

        console.log(employeeCreate);

        await fetch("http://147.232.155.76:8080/employee/register", {
            method: "POST",
            body: JSON.stringify({employeeCreate}),
            headers: {"Content-Type": "application/json",},
        }).then((response) => {
            if (response.ok) {
                console.log("Register succesfull");
                changeScreen('login');
            }
        });
    }

    return (
        <div className="flex flex-col gap-5">
             <p className="font-extrabold text-4xl">Register</p>

            <ScaleTextField
                placeholder="your name"
                label="Name"
                value={state.name}
                onScaleChange={(e) => handleChange("name", e.detail.value)}
            ></ScaleTextField>
            <ScaleTextField
                placeholder="Number"
                label="number"
                type="number"
                value={state.number}
                onScaleChange={(e) => handleChange("number", e.detail.value)}
            ></ScaleTextField>
            <ScaleTextField
                placeholder="your email"
                label="Email"
                type="email"
                value={state.email}
                onScaleChange={(e) => handleChange("email", e.detail.value)}
            ></ScaleTextField>
            <ScaleTextField
                placeholder="your password"
                label="Password"
                type="password"
                value={state.password}
                onScaleChange={(e) => handleChange("password", e.detail.value)}
            ></ScaleTextField>
            <ScaleTextField
                placeholder="your password again"
                label="Password again"
                type="password"
                value={state.passwordAgain}
                onScaleChange={(e) => handleChange("passwordAgain", e.detail.value)}
            ></ScaleTextField>
            <ScaleTextField
                placeholder="your personal number"
                label="Personal number"
                type="number"
                value={state.personalNumber}
                onScaleChange={(e) => handleChange("personalNumber", e.detail.value)}
            ></ScaleTextField>

            <p className="font-extrabold">License plates</p>
            {state.licensePlates.map((plate) => (
                <ScaleTextField
                    key={plate.id}
                    placeholder={plate.placeholder}
                    label={plate.label}
                    value={plate.value}
                    type="number"
                    onScaleChange={(e) => handleLicensePlateChange(plate.id, e.detail.value)}
                ></ScaleTextField>
            ))}
            <button
                className="text-emerald-500 flex flex-row justify-center align-items-center gap-2"
                onClick={addLicensePlate}
            >
                <span className=" material-symbols-rounded">add</span>add licence plate
            </button>
            <scale-button onClick={register}>Register</scale-button>
            <scale-divider></scale-divider>
            <div>
                <p>Already a member ?</p>
                <p className="text-pink-600" onClick={() => changeScreen('login')}>Log in</p>
            </div>
        </div>
    );
};

export default Register;
