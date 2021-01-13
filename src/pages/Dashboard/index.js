//import Map from '../../components/Map/Map';
//import Marker from '../../components/Marker/Marker';
import { GoogleMap, useLoadScript, Marker, InfoWindow, Data, MarkerClusterer } from '@react-google-maps/api';
//import { getCurrentLatLng } from '../../services/geolocation';
import { useState, useEffect } from 'react';
//import styles from './Dashboard.module.css';
import mapStyles from '../../components/Map/map-style';

const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: 37.334789,
  lng: -121.88813
}

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
}

function Dashboard(props) {
  // const [appData, setAppData] = useState({
  //   lat: null,
  //   lng: null
  // });

  // async function getAppData() {
  //   const data = await getCurrentLatLng();
  //   console.log(data);
  //   setAppData(data);
  // };

  // useEffect(() => {
  //   getAppData();
  // }, []);


 //function _onClick(obj){ console.log(obj.x, obj.y, obj.lat, obj.lng, obj.event);}
  const {isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    
  }) 

  const [markers, setMarkers] = useState([]);

  function onMapClick(event) {
    setMarkers(current => [...current,
    {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date()
    }]);
    //console.log(event)
  }

  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Laoding Maps"; 


  return (
    <div> 
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={() => onMapClick}
      >
        {markers.map(marker => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            // icon={{
            //   url: '/',
            //   scaledSize: new window.google.maps.Size(30, 30),
            //   origin: new window.google.maps.Point(0,0),
            //   anchor: new window.google.maps.Point(15,15),
            // }}
          />
        ))}
      </GoogleMap>
      {/* <Map lat={appData.lat} lng={appData.lng} /> */}
      
      {/* <button className={styles.button} onClick={() => alert('clicked!')} /> */}
    </div>
    
  );
}

export default Dashboard; 