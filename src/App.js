import { useState, useEffect} from 'react';
import { getUser, logout } from './services/userService';

import Header from './components/Header'; 
import Footer from './components/Footer';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';

import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { getCurrentLatLng } from './services/geolocation';


import './App.css';



function App(props) {


  const [appData, setAppData] = useState({
    lat: null,
    lng: null
  });
  
  async function getAppData() {
    const data = await getCurrentLatLng();
    setAppData(data);
  };
  
  useEffect(() => {
    getAppData();
  }, []);


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


  return (
    <div className="App">
      < Header handleLogout={handleLogout} user={userState.user} />

      <main>
   
        <Switch>
          <Route exact path="/" render={props => 
            <Home lat={appData.lat} lng={appData.lng}/> 
             
          } /> 
          <Route exact path="/dashboard" render={props => 
            userState.user ? 
              <Dashboard
                {...props}
                lat={appData.lat} lng={appData.lng}
                user={userState.user}
         
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
