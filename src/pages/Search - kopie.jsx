import React, { useState } from "react";
import firebase from '../firebase';
import logo from '../images/trekker.png';
import $ from 'jquery';
import CloseIcon from '@material-ui/icons/Close';
import Player from '../components/player';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = firebase.auth();
const firestore = firebase.firestore();
const API_KEY = "AIzaSyDDRrKbPOjqy7r1VnoGjpKOhq7g7ZCNtjE";
let token = '';
const settings = {
    opacity: 0
}
  
const Search = (match) =>{
    const [tokenKey, setTokenKey] = useState(false);
    const [user, setUser] = useState('');
    const auth = getAuth();
    let searchResults = '';
    token = match.match.params.token;

    $('#search').change(function() {
        searchResults = $('#search').val();
    });
    const sendSearch = async(e) =>{
      e.preventDefault();
      videoSearch(API_KEY, searchResults, 6);
    }

    async function checkToken(token){
        const key = token;
        let count = 0;
        let found = false;
        var query = firestore.collection('tokens').where('token', '==', `${key}`);
        await query.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                count++;
                if(count > 0){
                    found = true;
                    return;
                }
            });
        })
        
        setTokenKey(found);
        return found;
    }

    checkToken(token).then(key=>{
        if(!key) window.location.href = '/join';
    });


    onAuthStateChanged(auth, (user) => {
    if (user) {
        setUser(user);
    } else {
        window.location.href = "/login";
    }
    });

    return (
        <div>
            <div className={`overlay`} style={tokenKey ? settings : null}>
                <div className="spinner-border mainspinner" role="status"></div>
            </div>
            <div id="SearchPage" className={tokenKey ? null : 'hidden'}>
                <header id="searchBar">
                    <nav id="search-nav">
                        <div className="logo">
                            <img className="logo-icon" src={logo} alt="betsy"/>
                            <span>Music</span>
                        </div>
                        <div className="container-sm">
                            <form id="form" onSubmit={sendSearch}>
                                <div className="searchBarInput">
                                    <input id="search" type="text" className="searchBox" autoComplete="off" placeholder="Zoeken" maxLength="170"/>
                                    <CloseIcon className="closeIcon no-pointer"/>
                                </div>
                            </form>
                        </div>
                        <div className="account">
                            <img src={user.photoURL} alt="profile"/>
                        </div>
                    </nav>
                    <nav id="invite-nav">
                        <p>{token}</p>
                    </nav>
                </header>
                <Player token={token}/>
            </div>
        </div>
    )
}



const videoSearch = (key, search, maxResults) => {
    $.get(`https://www.googleapis.com/youtube/v3/search?key=${key}&type=video&part=snippet&maxResults=${maxResults}&q=${search}`, function(data){
      $('#album').html('');
      data.items.forEach(item => {
          let video = `
          <div class="searchItem" data-url="${item.id.videoId}">
              <img src="${item.snippet.thumbnails.default.url}"/>
              <div class="searchInfo">
                  <p class="searchTitle">${item.snippet.title}</p>
                  <span class="searchDisc">Video • ${item.snippet.channelTitle}</span>
              </div>
          </div>
          `; 
          $('#album').append(video);
      });
    });
  }

const addSong = async (songId) => {
    const {uid} = auth.currentUser;
    $.get(`https://www.googleapis.com/youtube/v3/videos?id=${songId}&part=contentDetails&key=${API_KEY}`, function(data){
        data.items.forEach(item => {
            let total = item.contentDetails.duration;
            let duration = total;
            $.get(`https://www.googleapis.com/youtube/v3/videos?id=${songId}&part=snippet&key=${API_KEY}`, function(data2){
                data2.items.forEach(item => {
                    let title = item.snippet.title;
                    let artist = item.snippet.channelTitle;
                    let photoURL = item.snippet.thumbnails.default.url;

                    firestore
                    .collection("playlist")
                    .where("token", "==", token)
                    .onSnapshot(async res => {
                        let queueRef = firestore.collection(`${res.docs[0].ref.path}/queue`);
                        queueRef.doc(songId.replace(/-|_/g,'')).set({
                            token,
                            songId: songId,
                            title,
                            artist,
                            photoURL,
                            duration,
                            uid,
                            createdAt: firebase.firestore.FieldValue.serverTimestamp()
                        });
                    })
                });
            });
        });
    });
}

$(function(){
    $('#search').on('input', ()=>{
        let len = $('#search').val();
        if(len.length !== 0){
            $('.closeIcon').removeClass('no-pointer');
        }else{
            $('.closeIcon').addClass('no-pointer');
        }
    });

    $('.closeIcon').on('click', ()=>{
        $('#search').val('');
        $('#album').html('');
        $('.closeIcon').addClass('no-pointer');
    });

    $(document).on("click",".searchItem",function() {
        let yt = $(this).attr('data-url');
        addSong(yt);
    });

});

export default Search;

