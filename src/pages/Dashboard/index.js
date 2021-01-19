import { GoogleMap, useLoadScript, Marker, InfoWindow, Polygon} from '@react-google-maps/api';
import { useState, useCallback, useRef } from 'react';
import mapStyles from './map-style';
import { formatRelative } from 'date-fns';
import Locate from '../../components/Locate/Locate';


const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
}


function Dashboard(props) {

  const location = {
    lat: +props.lat,
    lng: +props.lng
  };


  const {isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    
  }) 

  const [markers, setMarkers] = useState([]);
  console.log(markers);
  const [selected, setSelected] = useState(null);
  console.log(selected);

  const onMapClick = useCallback((event) => { //change event to location for production 
    setMarkers(current => [ //receive current state and spread out the new version of it 
      ...current,

      {
        //Change for production version 
        // lat: +location.lat,
        // lng: +location.lng, 
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
        zoom={12}
        center={location}
        options={options}
        onClick={onMapClick} //remove for production
        onLoad={onMapLoad}
      >

        {markers.map(marker => (
          <Marker
            key={marker.time.toISOString()}
            position={{lat: marker.lat, lng: marker.lng}} //repalce { lat: marker.lat, lng: marker.lng } with location 
            onClick={() => setSelected(marker)} //keep same 
          />
        ))}
        {selected ? (
          <InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => setSelected(null)}>
          <div>
          <h2>Player holds this area</h2>
            <p>Since {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>) : null}
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
   
      </GoogleMap>
      <Locate panTo={panTo} /> 
      {/* <button onClick={() => onMapClick(location)}>Set Markers</button>  ADD for production version*/}
    </div>
    
  );
}



export default Dashboard;