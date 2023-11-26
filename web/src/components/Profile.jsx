import React, { useState, useEffect } from "react";
import { ScaleTextField } from "./scaleTextField";

const Profile = ({ updateScreen }) => {

    const [user, setUser] = useState({
        email: "bob@example.com",
        id: 1,
        licencePlateNumber: "",
        name: "",
        personalId: 123456,
        phoneNumber: "+421000000000",
        surname: "Bobers"
    });

    const [state, setState] = useState({
        personalNumber: user.phoneNumber,
        licensePlates: [
            { id: 1, placeholder: "your licence plate number", label: "Licence plate number", value: user.licencePlateNumber }
        ],
    });

    const fetchUserInfo = (userId) => {
        fetch("http://147.232.155.76:8080/employee/" + userId)
            .then(resp => resp.json())
            .then(json => setUser(json));
    };

    const fetchData = () => {
        const userId = localStorage.getItem("UserToken");
        if (userId) {
            fetchUserInfo(userId);
        }
    }


    useEffect(() => {
        fetchData();
    }, []);


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

    const updateUser = () => {
        const req = {
            phoneNumber: state.number,
            licencePlateNumber: state.licensePlates[0].value
        }

        console.log(req);
        fetch("http://147.232.155.76:8080/employee/" + user.id, {
            method: "PUT",
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
            <ScaleTextField
                placeholder="your name"
                label="Name"
                value={user.name}
                disabled
            ></ScaleTextField>
            <ScaleTextField
                placeholder="Number"
                label="number"
                value={state.number}
                onScaleChange={(e) => handleChange("number", e.detail.value)}
            ></ScaleTextField>
            <ScaleTextField
                placeholder="your email"
                label="Email"
                value={user.email}
                disabled
            ></ScaleTextField>
            <ScaleTextField
                placeholder="your personal number"
                label="Personal number"
                value={user.number}
                disabled
            ></ScaleTextField>

            <p className="font-extrabold">License plates</p>
            {state.licensePlates.map((plate) => (
                <ScaleTextField
                    key={plate.id}
                    placeholder={plate.placeholder}
                    label={plate.label}
                    value={plate.value}
                    onScaleChange={(e) => handleLicensePlateChange(plate.id, e.detail.value)}
                ></ScaleTextField>
            ))}
            <button
                className="text-emerald-500 flex flex-row justify-center align-items-center gap-2"
                onClick={addLicensePlate}
            >
                <span className=" material-symbols-rounded">add</span>add licence plate
            </button>
            <scale-button onClick={updateUser}>Save</scale-button>
        </div>
    );
};

export default Profile;
