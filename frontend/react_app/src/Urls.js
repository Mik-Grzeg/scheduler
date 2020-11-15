import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

import Login from "./components/Login";
import Schedule from "./components/Schedule";
import InstructorDashboard from './components/InstructorDashBoard';
import { NewAppointmentFormContainer } from './components/NewAppointment';

import TopBar from './components/TopBar';

function PrivateRoute({ isAuthenticated, children, ...rest}) {
    return (
        <Route
        {...rest}
        render={({location }) => 
        isAuthenticated? (
            children
        ) : (
            <Redirect
                to={{ 
                    pathname:"/login/",
                    state: { from: location }
                }}
                />
            )}
        />
    );
}

function Urls(props) {

    const triggerText = 'Zarezerwuj';
    const onSubmit = (event) => {
        event.preventDefault(event);
        console.log(event.target.name.value);
        console.log(event.target.instructor.value);
        console.log(event.target.time.value);
    }

    return (
        <div>
            <BrowserRouter>
                <TopBar {...props}/>

                <Switch>
                    <Route exact path="/login/"> <Login {...props} /></Route>
                    <PrivateRoute exact path="/" isAuthenticated={props.isAuthenticated}>
                        <NewAppointmentFormContainer triggerText={triggerText} onSubmit={onSubmit}/>
                        <Schedule {...props}/>
                    </PrivateRoute>
                    <PrivateRoute exact path="/instructor" isAuthenticated={props.isAuthenticated}>
                        <NewAppointmentFormContainer triggerText={triggerText} onSubmit={onSubmit}/>
                        <InstructorDashboard {...props}/>
                    </PrivateRoute>

                </Switch>
            </BrowserRouter>
        </div>
    )
};

export default Urls;