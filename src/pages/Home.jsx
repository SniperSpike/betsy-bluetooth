import { onAuthStateChanged } from '@firebase/auth';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../actions';
// import Footer from '../components/layout/footer';
import Header from '../components/layout/header'
import Playlist from '../components/playlist';
import PlaylistInfo from '../components/playlistInfo';
import {auth} from '../firebase';

const Home = () => {

    const dispatch = useDispatch();
    const userToken = useSelector((state) => state.user);
    // const selectedPlaylist = useSelector((state) => state.selectedPlaylist);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            dispatch(setUser(user));
        } else {
            window.location.href = "/login";
        }
    });



    return (
        <div style={{display: "flex", flexDirection:"column"}}>
            <div className={`overlay`} style={userToken ? {opacity: 0} : null}>
                <div className="spinner-border mainspinner" role="status"></div>
            </div>
            <div>
                <Header page="home" type="desktop"/>
                <div className="homepage fix-nav">
                    {/* <Playlist type="library" /> */}
                    <Playlist subs="658K" user="Dirty Workz" isVerified={true} channelId="UCt8hUmML7zjM6effdZ3Ip5A"/>
                    <Playlist subs="2.64M" user="Radiohead" isVerified={true} channelId="UCq19-LqvG35A-30oyAiPiqA"/>
                    <Playlist subs="31.3M" user="NoCopyrightSounds" isVerified={true} channelId="UC_aEa8K-EOJ3D6gOs7HcyNg"/>
                    <Playlist subs="9.32M" user="Lofi Girl" isVerified={true} channelId="UCSJ4gkVC6NrvII8umztf0Ow"/>
                    <Playlist subs="1.5M" user="the bootleg boy 2" isVerified={true} channelId="UCwkTfp14Sj7o6q9_8ADJpnA"/>
                    <Playlist subs="8.37M" user="AC/DC" isVerified={true} channelId="UCB0JSO6d5ysH2Mmqz5I9rIw" />
                    {/* <Playlist subs="10" user="Torretto" isVerified={false} channelId="UC1yJ_8WU1Abdw161j2ld4EQ" /> */}
                </div>
                <PlaylistInfo/>
                {/* <Footer /> */}
            </div>
        </div>
    )
}

export default Home
