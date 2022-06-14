import React, { useState } from "react";
import "./ChatInput.css";
import { Button } from "@mui/material";
import {
  orderBy,
  collectionGroup,
  collection,
  addDoc,
  QuerySnapshot,
  onSnapshot,
  getDocs,
  getDoc,
  where,
  doc,
  serverTimestamp,
  query,
} from "firebase/firestore";
import db, { firebaseApp } from "./firebase";
import { useStateValue } from "./StateProvider";

function ChatInput({ channelName, roomId }) {
  const [input, setInput] = useState("");
  const [{ user }, dispatch] = useStateValue();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // 👇️ your logic here
      if (roomId) {
        async function writeData() {
          const q = query(collection(db, "rooms", roomId, "messages"));
          const docs = await getDocs(q);
          await addDoc(collection(db, "rooms", roomId, "messages"), {
            uid: user.uid,
            user: user.displayName,
            userImage: user.photoURL,
            timestamp: serverTimestamp(),
            message: input,
          });
        }
        writeData();
        setInput("");
      }
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (roomId) {
      async function writeData() {
        const q = query(collection(db, "rooms", roomId, "messages"));
        const docs = await getDocs(q);
        await addDoc(collection(db, "rooms", roomId, "messages"), {
          uid: user.uid,
          user: user.displayName,
          userImage: user.photoURL,
          timestamp: serverTimestamp(),
          message: input,
        });
      }
      writeData();
      setInput("");
    }
  };

  return (
    <div className="chatInput">
      <div className="form">
        <input
          type="text"
          value={input}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Type message here at #${channelName?.toLowerCase()}`}
        />
        {/* <button type="submit" onClick={sendMessage}>
          SEND
        </button> */}
      </div>
    </div>
  );
}

export default ChatInput;
