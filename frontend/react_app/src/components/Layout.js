import React from 'react';
import Footer from "./Footer"
import CssBaseline from '@material-ui/core/CssBaseline';
import TopBar from "./TopBar"

function Layout(props) {
    return (
        <React.Fragment>
            <CssBaseline />
            <TopBar {...props}/>
            <div>
                {props.children}
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default Layout