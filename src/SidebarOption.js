import React from "react";
import "./SidebarOption.css";
import { useNavigate } from "react-router-dom";
import db from "./firebase";
import {
  collection,
  addDoc,
  QuerySnapshot,
  getDocs,
  getDoc,
  doc,
  setDoc,
  query,
} from "firebase/firestore";

function SidebarOption({ Icon, title, id, addChannelOption }) {
  const history = useNavigate();

  const selectChannel = () => {
    if (id) {
      history(`/room/${id}`);
    } else {
      history(title);
    }
  };

  const addChannel = () => {
    const channelName = prompt("enter channel name");
    async function writeData() {
      await addDoc(collection(db, "rooms"), {
        name: channelName,
      });
    }
    if (channelName) {
      writeData();
    }
  };

  return (
    <div
      className="sidebarOption"
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon && <Icon className="sidebarOption_icon" />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <h3 className="sidebarOption_channel">
          <span className="sidebarOption_hash">#</span>
          {title}
        </h3>
      )}
    </div>
  );
}

export default SidebarOption;
