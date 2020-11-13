import React from 'react';
import Footer from "./Footer";
import CssBaseline from '@material-ui/core/CssBaseline';
import TopBar from "./TopBar";
import { NewAppointmentFormContainer } from './NewAppointment';


function Layout(props) {


    return (
        <React.Fragment>
            <CssBaseline />
            <TopBar {...props}/>
                {props.children}
            <Footer />
        </React.Fragment>
    )
}

export default Layout