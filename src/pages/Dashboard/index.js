import { GoogleMap, useLoadScript, Marker, InfoWindow, Polygon} from '@react-google-maps/api';
import { useState, useCallback, useRef, useEffect  } from 'react';
import mapStyles from './map-style';
import Locate from '../../components/Locate/Locate';
import { fetchAreas, addAreas, fetchPlayerAreas} from '../../services/areasService';
import { FindArea } from '../../components/FindArea/FindArea';
import styles from './Dashboard.module.css';


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
  
  }); 


  const [markers, setMarkers] = useState([]);
  const [playersMarkers, setPlayersMarkers] = useState([]);
  const [selected, setSelected] = useState(null);


  useEffect(() => {
    getAreas();
    getPlayerAreas();
   // eslint-disable-next-line
  }, []);



  async function getAreas() {
    const data = await fetchAreas(); 
    
    setMarkers(data) 
  }

  async function getPlayerAreas() {
    const data = await fetchPlayerAreas(props.user.username);

    setPlayersMarkers(data) 
  }



  async function handleAddArea(playersMarkers) { 
    await addAreas(playersMarkers)
    setPlayersMarkers(playersMarkers)
   
  }



  const onMapClick = useCallback((event) => { //change event to location for production 

    setPlayersMarkers(current => [ 
      ...current,

      {
        //Change for production version 
        // lat: +location.lat,
        // lng: +location.lng, 
        username: props.user.username,
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },

    ]);
     // eslint-disable-next-line
  }, []);



  const mapRef = useRef(); 
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
            key={marker.lat}
            position={{lat: marker.lat, lng: marker.lng}} 
            onClick={() => setSelected(marker)} 

          />
        ))}
        {/* //Other Marker */}
        {playersMarkers.map(marker => (
          <Marker
            key={marker.lat} 
            position={{ lat: marker.lat, lng: marker.lng }} //repalce { lat: marker.lat, lng: marker.lng } with location 
            onClick={() => setSelected(marker)} //keep same 
       
          />
        ))}
        
        {selected ? (
          <InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => setSelected(null)}>
          <div>
              <h2>Player holds this area</h2>
            </div>
          </InfoWindow>) : null}
          <Polygon
          path={markers}
          area={markers}
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
            key={playersMarkers.time}
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
      <button className={styles.button} onClick={() => handleAddArea(playersMarkers)}>Submit</button>
      <FindArea playersMarkers={playersMarkers} username={props.user.username}/>
    </div>
    
  );
}



export default Dashboard;