// import { useRef } from 'react';
// import styles from './Map.module.css';
// import mapStyle from './map-style';
// let location = null; 
// function Map(props) {
//   console.log('maps', props)
//   const mapDiv = useRef();

//   if (props.lat && props.lng) {
//     location = {
//       lat: props.lat,
//       lng: props.lng
//     };
//     console.log('location', location);
//     const map = new window.google.maps.Map(
//       mapDiv.current, {
//         zoom: props.zoom || 12,
//         center: location,
//         disableDefaultUI: true,
//         styles: mapStyle,

//       }
//     );
//     // console.log(map)
  


//   }

//   function addMarker(location, map) {
//     new window.google.maps.Marker({
//       position: location,
//       animation: window.google.maps.Animation.DROP,
//       map: map,
  
//     });
//     console.log(location)
// }


//   return (
//     <div ref={mapDiv} className={styles.Map} onClick={(event) => {
//       console.log(event);
//         }}>
    
//     </div>
//   );
// }

// export default Map;