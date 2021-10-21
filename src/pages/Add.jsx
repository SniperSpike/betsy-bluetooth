import { onAuthStateChanged } from '@firebase/auth';
import React from 'react'
import { useDispatch } from 'react-redux';
import { setUser } from '../actions';
// import Form from '../components/form';
// import Footer from '../components/layout/footer';
// import Header from '../components/layout/header'
// import Playlist from '../components/playlist';
// import PlaylistInfo from '../components/playlistInfo';
import {auth} from '../firebase';

const Home = () => {

    const dispatch = useDispatch();
    // const userToken = useSelector((state) => state.user);
    // const selectedPlaylist = useSelector((state) => state.selectedPlaylist);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            dispatch(setUser(user));
        } else {
            window.location.href = "/login";
        }
    });



    return (
        <></>
        // <div style={{display: "flex", flexDirection:"column"}}>
        //     <div className={`overlay`} style={userToken ? {opacity: 0} : null}>
        //         <div className="spinner-border mainspinner" role="status"></div>
        //     </div>
        //     <div>
        //         <Header page="home" type="desktop"/>
        //         <div className="homepage fix-nav">
        //             <Form />
        //         </div>
        //     </div>
        // </div>
    )
}

export default Home
