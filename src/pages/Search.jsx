import React, { useState } from "react";
import  { db, auth } from '../firebase';
import Player from '../components/player';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../actions";
import { collection, query, where, getDocs } from "@firebase/firestore";
import { onAuthStateChanged } from "@firebase/auth";

let token = '';
const settings = {
    opacity: 0
}
  
const Search = (match) =>{
    const dispatch = useDispatch();
    const [tokenKey, setTokenKey] = useState(false);
    token = match.match.params.token;

    async function checkToken(token){
        const key = token;
        let count = 0;
        let found = false;
        const q = query(collection(db, "tokens"), where("token", "==", key));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            count++;
            if(count > 0){
                found = true;
                return;
            }
        });
        
        setTokenKey(found);
        return found;
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
        } else {
            window.location.href = "/login";
        }
    });

    checkToken(token).then(key=>{
        if(!key) window.location.href = '/join';
        dispatch(setToken(token));
    });

    return (
        <>
            <div className={`overlay`} style={tokenKey ? settings : null}>
                <div className="spinner-border mainspinner" role="status"></div>
            </div>
            <div id="SearchPage" className={tokenKey ? null : 'hidden'}>
                <Header type="desktop"/>
                <Player token={token}/>
                <Footer />
            </div>
        </>
    )
}


export default Search;

