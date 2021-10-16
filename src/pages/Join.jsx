import React from 'react';
import { db } from '../firebase';
import Cookies from 'universal-cookie'
import ReactDOM from 'react-dom'
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import $ from 'jquery';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { PlayArrow } from '@material-ui/icons';
import { useDispatch } from "react-redux";
import { setToken } from '../actions'
import { collection, doc, getDocs, query, setDoc, where } from '@firebase/firestore';

const cookies = new Cookies();

const Join = () =>{
    const dispatch = useDispatch();
    const style = {
      width: "1.3em",
      height: "1.3em",
      padding: "0",
      margin: "0 0 -4px 0"
    }
  
    const makeid = async (length) => {
      $('.join-btn').html( 
        ReactDOM.render(
          <Button className="join-btn" type="button" variant="danger">
             <Spinner animation="border" style={style}/>
          </Button>
        , document.getElementById('token-buttons'))
      );
      let result = '';
      const characters = 'ABCDEFGHJKLMNOPQRSTUVWXYZ123456789';
      let charactersLength = characters.length;
      for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
      }
  
      const {uid} = auth.currentUser;

      if(uid === null) window.location.href = '/login';
  
      const tokenRef = doc(db, "tokens", `${result}`);
      await setDoc(tokenRef, {
        token: result,
        createdAt: "fieldValue.serverTimestamp()",
        uid
      }, {merge: true}).catch(err => {
        console.log(err);
      })


      const playlistRef = doc(db, "playlist", `${result}`);
      await setDoc(playlistRef, {
        token: result,
        currently_playing: ''
      }, {merge: true}).catch(err => {
        console.log(err);
      })

      dispatch(setToken(result));
      window.location.href = `/${result}`;
      
    }
    
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) return window.location.href = "/login";
    });

    $(function(){
  
      let tabIndex = 1;
    
      $('.token-input:first').focus();
      $(document).on('input', '.token-input', (event)=>{
        let value = $(`[tabindex=${tabIndex}]`).val().toUpperCase();
        tabIndex = event.currentTarget.attributes[2].value;
        if(value){
          $(`[tabindex=${tabIndex}]`).val(value);
          tabIndex++;
          $(`[tabindex=${tabIndex}]`).prop("disabled", false);
          $(`[tabindex=${tabIndex}]`).focus();
        }
        if(tabIndex > 6){
          $('.join-party-button').attr('disabled', false)
          joinParty();
          tabIndex = 6;
        }
      });
      $(document).on('keydown', '.token-input', (event)=>{
        if(event.which === 8 || event.which === 46){
          if(tabIndex <= 6){
            $('.join-party-button').attr('disabled', true)
          }
          if(tabIndex > 1){
            $(`[tabindex=${tabIndex}]`).val('');
            $(`[tabindex=${tabIndex}]`).prop("disabled", true);
            tabIndex--;
            $(`[tabindex=${tabIndex}]`).focus();
            $(`[tabindex=${tabIndex}]`).select();
          }else{
            $('.token-input:first').focus();
          }
        }
      });
    
      $(document).on('click', '.most-recent-container', ()=>{
        const token = cookies.get('recent-token');
        window.location.href = `/${token}`;
      });
    
      $(".paste").bind("paste", function(e){
        // access the clipboard using the api
        var pastedData = e.originalEvent.clipboardData.getData('text');
        if(pastedData.length === 6){
          for(let i = 0; i < 6; i++){
            $(`[tabindex=${i+1}]`).val(pastedData.charAt(i));
            // joinParty();
          }
          $('.token-input').attr('disabled', false);
          // $(`[tabindex=6]`).focus();
          $('input').blur();
          joinParty();
        }
      });
    
      const joinParty = async () => {
        let input1 = $(`[tabindex=1]`).val();
        let input2 = $(`[tabindex=2]`).val();
        let input3 = $(`[tabindex=3]`).val();
        let input4 = $(`[tabindex=4]`).val();
        let input5 = $(`[tabindex=5]`).val();
        let input6 = $(`[tabindex=6]`).val();
        let found = false;
        let count = 0;
    
        let result = `${input1}${input2}${input3}${input4}${input5}${input6}`;

        const q = query(collection(db, "tokens"), where("token", "==", result));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          count++;
          if(count > 0){
              found = true;
              return;
          }
        });
      
        if(found){
          let d = new Date();
          d.setTime(d.getTime() + (24*60*60*1000));
          cookies.set("recent-token", result, {path: "/" , expires: d})
          dispatch(setToken(result));
          window.location.href = `/${result}`;
        }else{
          $(`[tabindex=1]`).addClass('wrong');
          $(`[tabindex=2]`).addClass('wrong');
          $(`[tabindex=3]`).addClass('wrong');
          $(`[tabindex=4]`).addClass('wrong');
          $(`[tabindex=5]`).addClass('wrong');
          $(`[tabindex=6]`).addClass('wrong');
          setTimeout(()=>{
            $(`[tabindex=1]`).removeClass('wrong').val('');
            $(`[tabindex=2]`).removeClass('wrong').val('').attr('disabled', true);
            $(`[tabindex=3]`).removeClass('wrong').val('').attr('disabled', true);
            $(`[tabindex=4]`).removeClass('wrong').val('').attr('disabled', true);
            $(`[tabindex=5]`).removeClass('wrong').val('').attr('disabled', true);
            $(`[tabindex=6]`).removeClass('wrong').val('').attr('disabled', true);
            $(`[tabindex=1]`).focus();
            tabIndex = 1;
          },800);
        }
      }
    });
  
    return (
        <div className="container">
        <form className="party-form">
            <div className="token-container">
            <h1>BETSY'S MEDIASHARE PLAYLIST</h1>
              <div className="token-content">
              <label>Enter 6-digit code from your authenticator application</label>
                <input type="text" className="token-input paste" tabIndex="1" maxLength="1" placeholder="." autoComplete="off"/>
                <input type="text" className="token-input" tabIndex="2" maxLength="1" placeholder="." autoComplete="off" disabled/>
                <input type="text" className="token-input" tabIndex="3" maxLength="1" placeholder="." autoComplete="off" disabled/>
                <input type="text" className="token-input" tabIndex="4" maxLength="1" placeholder="." autoComplete="off" disabled/>
                <input type="text" className="token-input" tabIndex="5" maxLength="1" placeholder="." autoComplete="off" disabled/>
                <input type="text" className="token-input" tabIndex="6" maxLength="1" placeholder="." autoComplete="off" disabled/>
              </div>
              <div id="token-buttons" className="token-buttons">
                <Button className="join-btn" type="button" variant="danger" onClick={e => {e.preventDefault(); makeid(6)}}>New playlist</Button>
              </div>
            </div>
        </form>
        <br/>
        <div className={`most-recent-container ${cookies.get("recent-token") ? "" : "hidden"}`}>
          <span>Join meest recente playlist</span>
          <PlayArrow className="playarrow"/>
        </div>
        </div>
    )
}

export default Join;