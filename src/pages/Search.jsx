import React, { useState } from "react";
import  { db } from '../firebase';
import Player from '../components/player';
import Header from '../components/layout/header';
import { useDispatch } from "react-redux";
import { setToken } from "../actions";
import { collection, query, where, getDocs } from "@firebase/firestore";

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
            </div>
        </>
    )
}


export default Search;

