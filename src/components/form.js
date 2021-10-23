import React, { useState } from "react";
import axios from "axios";
import { db } from "../firebase";
import { doc, setDoc } from "@firebase/firestore";

const Form = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const api = "AIzaSyDDRrKbPOjqy7r1VnoGjpKOhq7g7ZCNtjE";

  const sendForm = (e) => {
    e.preventDefault();
    

    axios
      .get(
        `https://www.googleapis.com/youtube/v3/channels?key=${api}&forUsername=${value}&part=id,snippet,statistics`
      )
      .then(async (res) => {
        if (res.data.items) {
            setError("");
            let channelId = res.data.items[0].id;
            let channelTitle = res.data.items[0].snippet.localized.title;
            await setDoc(
                doc(db, "recommended", channelId),
                {
                  channelId,
                  name: channelTitle,
                }
              );
        }else{
            setError("Could not find user")
        }
      });
  };

  return (
    <div>
      <form
        style={{
          backgroundColor: "#111",
          padding: "1em",
          display: "flex",
          flexDirection: "column",
          borderRadius: 20,
        }}
      >
        <span style={{color: "red", fontWeight: "bold"}}>{error}</span>
        <div>
            <label style={{ color: "white", marginRight: "20px" }}>
            Channel url
            </label>
            <input
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            />
            <input type="submit" onClick={(e) => sendForm(e)} value="Add+" />
        </div>
      </form>
    </div>
  );
};

export default Form;
