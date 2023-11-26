// @ts-nocheck
import React, { useState, useCallback, useEffect } from 'react';
import Map, {Source, Layer} from 'react-map-gl';
import './App.css';
import Profile from './components/Profile'
import BookNow from './components/BookNow';
import Login from './components/Login';
import Register from './components/Register';
import { dataLayer } from './components/mapstyle';

function App() {
  const [screen, setScreen] = useState<string>('');
  const [clickInfo, setClickInfo] = useState(null);
  const [shape, setShape] = useState(null);

  const checkUserLogin = () => {
    const user = localStorage.getItem("UserToken");
    if (user){
      setScreen('home')
    }
  }

  useEffect(() => {
    // check user login
    checkUserLogin()
    /* global fetch */
    fetch('http://147.232.155.76:8080/parkingslot/all')
      .then(resp => resp.json())
      .then((json) => {
        const shape: GeoJSON.FeatureCollection = {
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
                color: slot.status === "FREE" ? "green" : "red",
              },
            })),
        };
        setShape(shape);
      })
      .catch(err => console.error('Could not load data', err)); // eslint-disable-line
  }, []);

  // Function to update screen state
  const updateScreen = (newScreen) => {
    setScreen(newScreen);
  };

  const handleSourceClick = useCallback(event => {
        const {
        features,
        point: {x, y}
      } = event;
      const hoveredFeature = features && features[0];
      console.log(hoveredFeature && {feature: hoveredFeature, x, y});
      setClickInfo(hoveredFeature && {feature: hoveredFeature, x, y});
  }, []);

  return (
    <div className="App">
      <div className='h-screen w-screen absolute top-0 z-0 float-left'>
        <Map
          initialViewState={{
            latitude: 48.70616417660523,
            longitude: 21.24783183853421,
            zoom: 17
          }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken="pk.eyJ1IjoibnBzbG92ZW5za3lyYWoiLCJhIjoiY2w1Y3p0ODBjMDYzazNkbXA1d2xpeGJ4OCJ9.dSzeXhNwm8mS200lquNoyg"
          interactiveLayerIds={['data']}
          // onMouseMove={onHover}
          onClick={handleSourceClick}
        >
          <Source type="geojson" data={shape}>
            <Layer {...dataLayer} />
          </Source>
          {clickInfo && (
          <div className='absolute top-0 z-50 float-left' style={{left: clickInfo.x, top: clickInfo.y}}>
            <div className=' bg-white m-2 h-fit rounded-xl p-10 flex flex-col gap-5 w-full text-center justify-start align-self-center shadow-lg'>
                      <span className="text-emerald-500 text-6xl material-symbols-rounded">directions_car</span>
                        <div className="flex flex-col text-left">
                            <p>Status: <span className="font-extrabold">free</span></p>
                            <p>Time: <span className="font-extrabold">9:00 - 11:00</span></p>
                        </div>
                        <scale-button>Book</scale-button>
            </div>
          </div>
        )}
        </Map>
      </div>
      <div className='h-screen w-2/5 z-40 relative flex justify-center items-center'>
        <div className=' bg-white m-8 h-fit rounded-3xl p-10 flex flex-col gap-5 w-full text-center justify-start align-self-center shadow-lg'>
          <scale-logo variant="magenta" transparent="true"></scale-logo>
          {screen === 'home' ? (
            <BookNow updateScreen={updateScreen} selectedSpace={clickInfo}></BookNow>
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
