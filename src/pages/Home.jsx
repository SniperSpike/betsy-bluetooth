import { onAuthStateChanged } from '@firebase/auth';
import { collection, onSnapshot, query} from '@firebase/firestore';
import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { setUser } from '../actions';
// import Footer from '../components/layout/footer';
import Header from '../components/layout/header'
import Playlist from '../components/playlist';
import PlaylistInfo from '../components/playlistInfo';
import {auth, db} from '../firebase';
import $ from 'jquery';

const Home = () => {

    const dispatch = useDispatch();
    const [playlist, setPlaylist] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [used, setUsed] = useState([]);
    const [scrollLock, setScrollLock] = useState(false);
    const [initial, setInitial] = useState(false);

    useEffect(() => {
        if(!localStorage.getItem("recommended")){
            onSnapshot(
                query(
                collection(db, "recommended")
                ),
                (querySnapshot) => {
                    const items = [];
                    querySnapshot.forEach((doc) => {
                        items.push(doc.data());
                    });
                    setPlaylist(items);
                    localStorage.setItem("recommended", JSON.stringify(items))
                    $('.load').click();
                    $('.load').click();
                    setTimeout(() =>{
                        setInitial(true);
                    },200)
                }
            );
        }else{
            const json = JSON.parse(localStorage.getItem("recommended"));
            setPlaylist(json);
            
            setTimeout(() => {
                $('.load').click();
                $('.load').click();
            }, 200)
        }
    // eslint-disable-next-line
    }, []);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            dispatch(setUser(user));
            setInitial(true);
        } else{
            setInitial(true);
        }
    });
    
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min) - min)
    }

    const scrollLoad = () => {
        setScrollLock(true);
        if(playlist.length > 0){
            if(used.length !== playlist.length){
                const random = randomInt(0, playlist.length);
                if(!used.includes(random)){
                    setRecommended([...recommended, playlist[random]]);
                    setUsed([...used, random]);
                    setTimeout(()=>{
                        setScrollLock(false);
                    }, 2000)
                    
                }else{
                    scrollLoad();
                }
            }
        }
    }


     $(window).scroll(function() {
        if($(window).scrollTop() < 5){
            $('#search-nav').css('background-color', 'unset');
        }else{
            $('#search-nav').css('background-color', '#030303');
        }
        if($(window).scrollTop() + $(window).height() === $(document).height()) {
            $('.load').click();
        }
     });
    

    return (
        <div style={{display: "flex", flexDirection:"column"}}>
            <div className={`overlay`} style={initial ? {opacity: 0} : null}>
                <div className="spinner-border mainspinner" role="status"></div>
            </div>
            <div>
                <Header page="home" type="desktop"/>
                <div className="homebackground"></div>
                <div className="homepage fix-nav">
                    {recommended.map((item, index) => {
                        return(<Playlist key={index} subs="" user={item.name} isVerified={true} channelId={item.channelId}/>);
                    })}
                    <button className="load" style={{opacity: 0, width: "1px", height: "1px"}} onClick={() => scrollLoad()}></button>
                    {scrollLock ? <div className="homespinner"><div className="spinner-border" role="status"></div></div> : <></>}
                </div>
                <PlaylistInfo/>
            </div>
        </div>
    )
}

export default Home
