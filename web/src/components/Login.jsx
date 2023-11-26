import React, { useState } from "react";
import { ScaleTextField } from "./scaleTextField";

const Login = ({ updateScreen }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const changeScreen = (screen) => {
        updateScreen(screen);
    };

    const login = async () => {
        await fetch("http://147.232.155.76:8080/employee/login", {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          if (!response.ok) {
            console.log({response})
            return;
          }
          response.json().then((value) => {
            const token = value.token;
            console.log(`received token: ${token}`);
            localStorage.setItem("UserToken", token);
            // storeUserToken(token);
            changeScreen('home');
          });
        });
      };


    return (
        <div className='gap-5 flex flex-col'>
            <p className="font-extrabold text-4xl">Login</p>
            <ScaleTextField
                placeholder="your email"
                label="Email"
                type="email"
                value={email}
                onScaleChange={(e) => setEmail(e.detail.value)}
            ></ScaleTextField>
            <ScaleTextField
                placeholder="password"
                label="Password"
                type="password"
                value={password}
                onScaleChange={(e) => setPassword(e.detail.value)}
            ></ScaleTextField>
            <scale-button onClick={login}>Log in</scale-button>
            <scale-divider></scale-divider>
            <div>
                <p>Not a member ?</p>
                <p className="text-pink-600" onClick={() => changeScreen('register')}>Sing up</p>
            </div>
        </div>
    )
}

export default Login