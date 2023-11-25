import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import './App.css';

function App() {
  const mapContainerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="App">
      <div ref={mapContainerRef} className='h-screen	w-screen absolute top-0 z-0 float-left'/>
      <div className='h-screen w-2/5 z-40 relative'>
        <div className=' bg-white m-8 h-fit rounded-lg p-10 flex w-full text-center content-center'>
          <h3 className='text-4xl font-extrabold'>Booking</h3>
        </div>
      </div>
      
    </div>
  );
}

export default App;
