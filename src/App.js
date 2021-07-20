import { useEffect, useState } from 'react'
import { GoogleLogin } from 'react-google-login';
import { useHistory, Redirect } from "react-router-dom";
import AuthService from './service/auth.service';
import refreshTokenSetup from './service/refreshTokenSetup';
import FacebookLogin from 'react-facebook-login';
import { FaFacebookF } from 'react-icons/fa';
import './App.scss';

function App() {
  let history = useHistory();
  let user = AuthService.getCurrentUser();
  const [msg, setMsg] = useState('');


  useEffect(() => {
    if (user)
      history.push('/user');
  }, [])

  const handleLogin = (e) => {
    e.preventDefault();
    if (e.currentTarget.email.value === "test@t.com" && e.currentTarget.password.value == "test") { 
      AuthService.login("Test User", e.currentTarget.email.value, "https://images-eu.ssl-images-amazon.com/images/I/61%2Bf9AEPPZL.png"); 
      history.push('/user');
    }
    else
      setMsg("Invalid Credentials");
  }
  const responseGoogle = (res) => {
    console.log(res.profileObj);
    const { name, email, imageUrl } = res.profileObj;
    AuthService.login(name, email, imageUrl)
    history.push('/user');
    window.location.reload();

    refreshTokenSetup(res);
  }

  const responseFacebook = (response) => {
    console.log(response.picture);
    const { name, email, picture } = response;
    console.log(picture.url);
    AuthService.login(name, email, picture.data.url)
    history.push('/user');
  }

  return (
    <div className="container rounded shadow-lg">
      <div className="row h-100">
        <div className="col-sm-7">
          <section className="form-normal-signin">
            {msg === '' ? null : <p>{msg}</p>}
            <form onSubmit={handleLogin}>
              <h1 class="h3 mb-3 fw-bolder text-center" style={{color:'#3e425b'}}>Welcome</h1>
              <div class="form-floating">
                <label for="email">Email address</label>
                <input type="email" class="form-control" id="email" placeholder="name@example.com" />
              </div>
              <div class="form-floating">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" placeholder="Password" />
              </div>
              <div class="alert alert-primary" role="alert" style={{ padding: '10px 10px 0 10px' }}>
                <p>Email: test@t.com<br /> Password: test</p>

                <p></p>
              </div>
              <div class="checkbox mb-3">
                <label>
                  <input type="checkbox" value="remember-me" /> Remember me
                </label>
              </div>
              <button class="w-100 btn btn-lg primary-color-bg text-white" type="submit">Sign in</button>
            </form>
          </section>
          <h3 className="text-center" style={{color:'grey'}}>----------- Or ------------</h3>
          <section className="form-social-signin w-100">
            <div>
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                isSignedIn={true}
                cookiePolicy={'single_host_origin'}
                className="btn w-100 btnGoogle"
              />
            </div>
            <div>
              <FacebookLogin
                appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                fields="name,email,picture"
                cssClass="btnFacebook w-100"
                icon={<FaFacebookF />}
                callback={responseFacebook} />
            </div>
          </section>
        </div>   
        <div className="col-sm-5 p-0 pb-0 d-sm-none d-md-block d-none">
          <section className="photo w-100 h-100"></section>
        </div>
      </div>
    </div>
  );
}

export default App;
