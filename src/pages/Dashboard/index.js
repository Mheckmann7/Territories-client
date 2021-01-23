import { GoogleMap, useLoadScript, Marker, InfoWindow, Polygon} from '@react-google-maps/api';
import { useState, useCallback, useRef, useEffect  } from 'react';
import mapStyles from './map-style';
import { formatRelative, setISOWeekYear } from 'date-fns';
import Locate from '../../components/Locate/Locate';
import { fetchAreas, addAreas } from '../../services/areasService';


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
  console.log(markers); //saves all of the relavant data from the player in array of 
  //markers: 0: { lat: 37.34483551763062, lng: -121.90567283828123, time: Thu Jan 21 2021 11: 54: 59 GMT - 0800(Pacific Standard Time) }
  //1: {lat: 37.35766266092734, lng: -121.88129692275389, time ... } 
  const [selected, setSelected] = useState(null);
  //console.log(selected);

  //ADD AREAS FROM BACKEND

  //run side effects such as making AJAX requesets 
  //make AJAX request when compoenent first renders 
  useEffect(() => {
    getAreas();
  }, []);
//peice of state to hold data returned from AJAX 


//makes the AJAX request with service module 
  async function getAreas() {
    const data = await fetchAreas();
    console.log('DATA', data)
    //add data from AJAX request to state 
    setMarkers(data) //can use the same peice of state for markers 
  }


  //CALLS ADD AREA INSIDE AREAS SERVICE 
  async function handleAddArea(markers) { //how to call this function? 
    const data = await addAreas(markers)
    console.log('sending data', data, markers)
    setMarkers(markers)
   
  }

  

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
     // handleAddArea()
   
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
           // onClick={() => handleAddArea(marker)}
          />
        ))}
        {selected ? (
          <InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => setSelected(null)}>
          <div>
          <h2>Player holds this area</h2>
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
   
      </GoogleMap>
      <Locate panTo={panTo} /> 
      {/* <button onClick={() => onMapClick(location)}>Set Markers</button>  ADD for production version*/}
      <button onClick={() => handleAddArea(markers)}>Testing</button>
    </div>
    
  );
}



export default Dashboard;