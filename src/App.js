import { useState, useEffect} from 'react';
import { getUser, logout } from './services/userService';

import Header from './components/Header'; 
import Footer from './components/Footer';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';

//import Map from './components/Map/Map';

import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { getCurrentLatLng } from './services/geolocation';
//import{fetchMarkers} from './services/markers'

//import { GoogleMap, useLoadScript, Marker, InfoWindow, Data, MarkerClusterer } from '@react-google-maps/api';

import './App.css';



function App(props) {

  // const [savedMarker, setSavedMarkers] = useState([]);

  // async function getMarkers() {
  //   const data = await fetchMarkers();
  //   setSavedMarkers(data)
  // }
  
  // useEffect(() => {
  //   getMarkers();
  // }, []);

  //get location 

  const [appData, setAppData] = useState({
    lat: null,
    lng: null
  });
  
  async function getAppData() {
    const data = await getCurrentLatLng();
    console.log(data);
    setAppData(data);
  };
  
  useEffect(() => {
    getAppData();
  }, []);

  //login

  const [ userState, setUserState ] = useState({
    user: getUser()
  });

  function handleSignupOrLogin() {
    setUserState({
      user: getUser()
    });
  }

  function handleLogout() {
    logout();
    setUserState({ user: null });
    props.history.push('/');
  }

  //load map


 


  return (
    <div className="App">
      < Header handleLogout={handleLogout} user={userState.user} />

      <main>
   
        <Switch>
          <Route exact path="/" render={props => 
            <Home/> 
             
          } /> 
          <Route exact path="/dashboard" render={props => 
            userState.user ? 
              <Dashboard
                lat={appData.lat} lng={appData.lng}
              /> 
              :
              <Redirect to="/login" /> 
          } /> 
          <Route exact path="/signup" render={props => 
            <Signup 
            {...props} 
            handleSignupOrLogin={handleSignupOrLogin}
            /> 
          } /> 
          <Route exact path="/login" render={props => 
            <Login 
              {...props} 
          
            handleSignupOrLogin={handleSignupOrLogin}
            /> 
          } />   
        </Switch>
        </main>
      < Footer /> 
    </div>
  );
}

export default withRouter(App);
