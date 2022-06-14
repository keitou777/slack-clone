import React, { useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useStateValue } from "./StateProvider";
import Sidebar from "./Sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
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

function Header() {
  const [{ user }] = useStateValue();
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const history = useNavigate();

  const handleKeyDown = (event) => {
    console.log("keydown");
    if (event.key === "Enter") {
      // 👇️ your logic here
      console.log("enter key pressed");
      history("search/" + searchInput);
      setSearchInput("");
    }
  };

  const sendSearch = (e) => {
    e.preventDefault();
    history("search/" + searchInput);
    setSearchInput("");
  };

  return (
    <>
      <div className="header">
        <div className="header_left">
          {showSidebar ? (
            <CloseIcon
              className="menuIcon"
              onClick={() => setShowSidebar(!showSidebar)}
            />
          ) : (
            <MenuIcon
              className="menuIcon"
              onClick={() => setShowSidebar(!showSidebar)}
            />
          )}

          <Avatar
            className="header_avatar"
            alt={user?.displayName}
            src={user?.photoURL}
          />
        </div>
        <div className="header_search">
          <SearchIcon />
          <div className="form">
            <input
              type="text"
              value={searchInput}
              onKeyDown={handleKeyDown}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search..."
            />
            {/* <button type="submit" onClick={sendSearch}></button> */}
          </div>
        </div>
        <div className="header_right">
          <HelpOutlineIcon />
        </div>
      </div>
      {showSidebar ? (
        <div onClick={() => setShowSidebar(!showSidebar)}>
          <Sidebar cName="sidebar active" />
        </div>
      ) : (
        <div onClick={() => setShowSidebar(!showSidebar)}>
          <Sidebar cName="sidebar" />
        </div>
      )}
    </>
  );
}

export default Header;
