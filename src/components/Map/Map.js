import { GoogleMap, useLoadScript, Marker, InfoWindow, Data, MarkerClusterer } from '@react-google-maps/api';
import { useState, useCallback, useRef } from 'react';
import mapStyles from './map-style';
import { formatRelative } from 'date-fns';
import Locate from '../../components/Locate/Locate';
import { Polygon } from '@react-google-maps/api';


const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: 25.774,
  lng: -80.19 
}

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
}


function Map(props) {

  const {isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    
  }) 

  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  console.log(markers);
  const onMapClick = useCallback((event) => {
    setMarkers(current => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date()
      },
    ]);
  }, []);

  const mapRef = useRef(); //retains state without a rerender 
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
}, []);

  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Laoding Maps"; 


  return (
    <div> 
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        <Polygon
        path={markers}
        key={markers.time}
        options={{
            fillColor: "#000",
            fillOpacity: 0.4,
            strokeColor: "#000",
            strokeOpacity: 1,
            strokeWeight: 1
        }} /> 
        {markers.map(marker => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => setSelected(marker)}
            // icon={{
            //   url: '/',
            //   scaledSize: new window.google.maps.Size(30, 30),
            //   origin: new window.google.maps.Point(0,0),
            //   anchor: new window.google.maps.Point(15,15),
            // }}
          />
        ))}
        {selected ? (
          <InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => setSelected(null)}>
          <div>
          <h2>Player holds this area</h2>
            <p>Since {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>) : null}
   
      </GoogleMap>
      <Locate panTo={panTo}/> 
    </div>
    
  );
}



export default Map; 