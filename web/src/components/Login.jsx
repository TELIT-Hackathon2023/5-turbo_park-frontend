import React, { useState } from "react";

const Login = ({ updateScreen }) => {

    const changeScreen = (screen) => {
        updateScreen(screen);
    };


    return (
        <div className='gap-5 flex flex-col'>
            <p className="font-extrabold text-4xl">Login</p>
            <scale-text-field
                placeholder="your email"
                label="Email"
                // value={state.email}
                // onChange={(e) => handleChange("email", e.target.value)}
            ></scale-text-field>
            <scale-text-field
                placeholder="password"
                label="Password"
                // value={state.email}
                // onChange={(e) => handleChange("email", e.target.value)}
            ></scale-text-field>
            <scale-button onClick={() => changeScreen('home')}>Log in</scale-button>
            <div>
                <p>Not a member ?</p>
                <p className="text-pink-600" onClick={() => changeScreen('register')}>Sing up</p>
            </div>
        </div>
    )
}

export default Login