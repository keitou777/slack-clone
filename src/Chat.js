import React, { useEffect, useState, useRef } from "react";
import Message from "./Message";
import "./Chat.css";
import { useParams } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import db from "./firebase";
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
  query,
} from "firebase/firestore";

import ChatInput from "./ChatInput";

function Chat() {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState(null);
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (roomId) {
      onSnapshot(doc(db, "rooms", roomId), (doc) => {
        setRoomDetails(doc.data());
      });
    }

    // ********************************************

    let collectionRef = collection(db, "rooms", roomId, "messages");
    // console.log(collectionRef);
    let q = query(collectionRef, orderBy("timestamp"));
    // console.log(q);
    onSnapshot(q, (querySnapshot) => {
      setRoomMessages(querySnapshot.docs.map((doc) => doc));
      // console.log(roomMessages);
    });
    // roomMessages?.map((doc) => console.log(doc.id, "=>", doc.data().message));

    // **************************************************
  }, [roomId]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [roomMessages]);

  return (
    <div className="chat_container">
      <div className="chat_spacer"></div>
      <div className="chat">
        <div className="chat_body">
          <div className="chat_header">
            <div className="chat_headerLeft">
              <h4 className="chat_channelName">
                <strong>#{roomDetails?.name}</strong>
                <StarBorderIcon />
              </h4>
            </div>
            <div className="chat_headerRight">
              <p>
                <InfoOutlined />
                Details
              </p>
            </div>
          </div>
          <div className="chat_messages">
            {roomMessages?.map((doc, index) => (
              <Message
                message={doc.data().message}
                timestamp={doc.data().timestamp}
                author={doc.data().user}
                authorImage={doc.data().userImage}
                key={index}
                uid={doc.data().uid}
                messageId={doc.id}
              />
            ))}
            <div className="bottomContainerElement" ref={messageEndRef} />
          </div>
        </div>

        <ChatInput channelName={roomDetails?.name} roomId={roomId} />
      </div>
    </div>
  );
}

export default Chat;
