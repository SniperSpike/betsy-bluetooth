import React from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { setUser } from "../actions";
import { firebase, auth} from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
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
          <div>
              <center><br/><br/><Button variant="danger" onClick={signInWithGoogle}>Login met Google</Button></center>
          </div>
      )
}

export default Login;