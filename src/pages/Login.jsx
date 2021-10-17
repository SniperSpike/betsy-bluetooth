import React from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { setUser } from "../actions";
import { firebase, auth} from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import GoogleLogo from "../images/google.png"
import Betsy from "../images/trekker.png";
const Login = () =>{
    const dispatch = useDispatch();
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider(firebase);
        signInWithPopup(auth, provider).then((result) => {
            // The signed-in user info.
            const user = result.user;
            dispatch(setUser(user));
          }).catch((error) => {
            // Handle Errors here.
            const errorMessage = error.message;
            alert(errorMessage);
          });
      }

      return (
          <div className="wrapper">
            <div className="login">
                <img className="login__logo" src={Betsy} alt=""/>
                <h1 className="logo__title">Betsy Bluetooth Mediaplayer</h1>
                <Button className="login__googleButton" onClick={signInWithGoogle}><img className="login__googleLogo" src={GoogleLogo} alt=""/>Login met Google</Button>
            </div>
          </div>
      )
}

export default Login;