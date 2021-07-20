import React, { useState, useEffect } from 'react';
import "./profile.scss";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useHistory
} from "react-router-dom";
import { GoogleLogout } from 'react-google-login';
import AuthService from '../../service/auth.service';

function Profile() {
    const [user, setUser] = useState(AuthService.getCurrentUser());
    let history = useHistory();
    console.log(user);

    useEffect(() => {
        if (!user)
            history.push('/');
    }, [user])


    function handleLogout() {
        AuthService.logout();
        history.push('/');
        window.location.reload();
    }

    return (
        <div className="container profile">
            <div className="row w-100 h-100">
                <div className="col-sm-7 text-center vertically-center">
                <h1 class="h3 mb-3 fw-bolder text-center header" style={{color:'#3e425b'}}>User Information</h1>
                    <img src={user.imageUrl} className="rounded-circle" style={{maxWidth:'200px'}}/>
                    <h2>{user.name}</h2>
                    <p style={{ fontWeight:'bold'}}>{user.email}</p>
                    <GoogleLogout
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Logout"
                        onLogoutSuccess={handleLogout}
                        className="w-100 btn btn-lg "
                        theme="dark"
                    >
                    </GoogleLogout>
                </div>
                <div className="col-sm-5 p-0 d-sm-none d-md-block d-none">
                    <section className="photo w-100 h-100"></section>
                </div>
            </div>
        </div>
    )
}

export default Profile
