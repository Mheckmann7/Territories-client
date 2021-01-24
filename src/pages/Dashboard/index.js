import { GoogleMap, useLoadScript, Marker, InfoWindow, Polygon} from '@react-google-maps/api';
import { useState, useCallback, useRef, useEffect  } from 'react';
import mapStyles from './map-style';
import { formatRelative, setISOWeekYear } from 'date-fns';
import Locate from '../../components/Locate/Locate';
import { fetchAreas, addAreas, fetchPlayerAreas } from '../../services/areasService';


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


  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    
  })

  const [markers, setMarkers] = useState([]);
  console.log('markers', markers)
  const [playersMarkers, setPlayersMarkers] = useState([]);
  console.log('players markers',playersMarkers) 
  
  const [selected, setSelected] = useState(null);


  //ADD AREAS FROM BACKEND

  //run side effects such as making AJAX requesets 
  //make AJAX request when compoenent first renders 
  useEffect(() => {
    getAreas();
    getPlayerAreas();
  }, []);

  //peice of state to hold data returned from AJAX 


  //makes the AJAX request with service module 
  async function getAreas() {
    const data = await fetchAreas(props.user.username); //props.user.username
    //add data from AJAX request to state 
    setMarkers(data) //can use the same peice of state for markers 
  }

  async function getPlayerAreas() {
    const data = await fetchPlayerAreas(props.user.username);
   //console.log(data)
    setPlayersMarkers(data) //need a new state? 
  }


  //CALLS ADD AREA INSIDE AREAS SERVICE 
  async function handleAddArea(markers) { //how to call this function? 
    const data = await addAreas(markers)

    setMarkers(markers)
  
   
  }

  

  const onMapClick = useCallback((event) => { //change event to location for production 
    setMarkers(current => [ //receive current state and spread out the new version of it 
      ...current,

      {
        //Change for production version 
        // lat: +location.lat,
        // lng: +location.lng, 
        username: props.user.username,
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date()
      },
    ]);
    setPlayersMarkers(current => [ 
      ...current,

      {
        //Change for production version 
        // lat: +location.lat,
        // lng: +location.lng, 
        username: props.user.username,
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
        //onClick={handleAddArea}
        onLoad={onMapLoad}
      >
        {markers.map(marker => (
          <Marker
            key={marker.lat} //marker.time.toISOString()
            position={{lat: marker.lat, lng: marker.lng}} //repalce { lat: marker.lat, lng: marker.lng } with location 
            onClick={() => setSelected(marker)} //keep same 
          />
        ))}
        {/* //Other Marker */}
        {playersMarkers.map(marker => (
          <Marker
            key={marker.lat} //marker.time.toISOString()
            position={{lat: marker.lat, lng: marker.lng}} //repalce { lat: marker.lat, lng: marker.lng } with location 
            onClick={() => setSelected(marker)} //keep same 
          />
        ))}
        
        {selected ? (
          <InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => setSelected(null)}>
          <div>
              <h2>Player {props.user.username} holds this area</h2>
            {/* <p>Since {formatRelative(selected.time, new Date())}</p> */}
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
        {/* Players Polygon */}
              <Polygon
            path={playersMarkers}
            key={markers.time}
            options={{
                fillColor: "#FFF",
                fillOpacity: 0.4,
                strokeColor: "#FFF",
                strokeOpacity: 1,
                strokeWeight: 1
          }} /> 
        
        
   
      </GoogleMap>
      <Locate panTo={panTo} /> 
      {/* <button onClick={() => onMapClick(location)}>Set Markers</button>  ADD for production version*/}
      <button onClick={() => handleAddArea(markers)}>Testing</button>
    </div>
    
  );
}



export default Dashboard;