import React from 'react';
import Urls from './Urls';
import { connect } from 'react-redux';
import * as actions from './store/authActions';
import { NewAppointmentFormContainer } from './components/NewAppointment';

import TopBar from './components/TopBar';
import Footer from './components/Footer';

import CssBaseline from '@material-ui/core/CssBaseline';


function App(props) {
  React.useEffect(() => {
    props.setAuthenticatedIfRequired();
  }, []);



  return (
    <div className="App">
        <CssBaseline />
        <Urls {...props}/>   
        <Footer />
    </div>
  );
}

// This means that one or more of redux states in the store are available as props
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null && typeof state.auth.token !== 'undefined',
    token: state.auth.token,
    id: state.auth.id,
    instructor: state.auth.instructor
  }
}

// This means that one or more of the redux actions in the form of dispatch(action) 
// combinations are available as props
const mapDispatchProps = (dispatch) => {
  return {
    setAuthenticatedIfRequired: () => dispatch(actions.authCheckState()),
    logout: () => dispatch(actions.authLogout())
  }
}

export default connect(mapStateToProps, mapDispatchProps)(App);