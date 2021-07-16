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
                <h1 class="h3 mb-3 fw-bolder text-center primary-color header">User Information</h1>
                    <img src={user.imageUrl} className="rounded-circle" />
                    <h2>{user.name}</h2>
                    <p style={{ color: "red" }}>{user.email}</p>
                    <GoogleLogout
                        clientId="326703092341-1oio7eebv2js321sts2um35qhnod3onn.apps.googleusercontent.com"
                        buttonText="Logout"
                        onLogoutSuccess={handleLogout}
                        className="w-100 btn btn-lg primary-color-bg"
                        theme="dark"
                    >
                    </GoogleLogout>
                </div>
                <div className="col-sm-5 p-0 pb-3 d-sm-none d-md-block d-none">
                    <section className="photo w-100 h-100"></section>
                </div>
            </div>
        </div>
    )
}

export default Profile
