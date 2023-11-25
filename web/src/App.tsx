// @ts-nocheck
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './App.css';
import Profile from './components/Profile'
import BookNow from './components/BookNow';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [screen, setScreen] = useState<string>('');

  useEffect(() => {
    if (mapContainerRef.current) {
      mapboxgl.accessToken = 'pk.eyJ1IjoibnBzbG92ZW5za3lyYWoiLCJhIjoiY2w1Y3p0ODBjMDYzazNkbXA1d2xpeGJ4OCJ9.dSzeXhNwm8mS200lquNoyg';
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [21.24783183853421, 48.70616417660523],
        zoom: 17,
      });
      return () => map.remove();
    }
  }, []);

    // Function to update screen state
    const updateScreen = (newScreen) => {
      setScreen(newScreen);
    };

  return (
    <div className="App">
      <div ref={mapContainerRef} className='h-screen w-screen absolute top-0 z-0 float-left'/>
      <div className='h-screen w-2/5 z-40 relative flex justify-items-center align-items-center'>
        <div className=' bg-white m-8 h-fit rounded-3xl p-10 flex flex-col gap-5 w-full text-center justify-start '>
          <scale-logo variant="magenta" transparent="true"></scale-logo>
          {screen === 'home' ? (
            <BookNow updateScreen={updateScreen}></BookNow>
          ): screen === 'profile' ? (
            <Profile updateScreen={updateScreen}></Profile>
          ): screen === 'login' ? (
            <Login updateScreen={updateScreen}></Login>
          ): screen === 'register' ? (
            <Register updateScreen={updateScreen}></Register>
          ):(
            <div className='gap-5 flex flex-col'>
              <p>In order to use the app you need to be logged in</p>
              <scale-button onClick={() => setScreen('login')}>Login</scale-button>
            </div>
          )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
