import React from 'react';
import Urls from './Urls';
import Layout from './components/Layout';
import { connect } from 'react-redux';
import * as actions from './store/authActions';
import { NewAppointmentFormContainer } from './components/NewAppointment';


function App(props) {
  React.useEffect(() => {
    props.setAuthenticatedIfRequired();
  }, []);



  return (
    <div className="App">
        <Layout {...props}>
         <Urls {...props}/>
        </Layout>
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