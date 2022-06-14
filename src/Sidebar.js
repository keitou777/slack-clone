import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Create from "@mui/icons-material/Create";
import SidebarOption from "./SidebarOption";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AppsIcon from "@mui/icons-material/Apps";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import db from "./firebase";
import {
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
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function Sidebar({ cName }) {
  const [channels, setChannels] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    //   run this once: fetch channel information from database

    const q = query(collection(db, "rooms"));
    onSnapshot(q, (querySnapshot) => {
      setChannels(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      );
    });

    //
    //
    //
  }, []);

  return (
    <div className={cName}>
      <div className="sidebar_header">
        <div className="sidebar_info">
          <h2>Channel name</h2>
          <h3>
            <FiberManualRecordIcon />
            {user ? user.displayName : "user unknown"}
          </h3>
        </div>
        <Create />
      </div>
      <SidebarOption Icon={Create} title="Threads" />
      <SidebarOption Icon={InboxIcon} title="Mention & reactions" />
      <SidebarOption Icon={DraftsIcon} title="Saved items" />
      <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
      <SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
      <SidebarOption Icon={AppsIcon} title="Apps" />
      <SidebarOption Icon={FileCopyIcon} title="File browser" />
      <SidebarOption Icon={ExpandLessIcon} title="Show less" />
      <hr />
      <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
      <hr />
      <SidebarOption Icon={AddIcon} title="Add Channel" addChannelOption />

      {/* connect to DB and get all channels */}
      {channels?.map((channel, index) => (
        <SidebarOption title={channel.name} id={channel.id} key={index} />
      ))}

      {/* footer */}
    </div>
  );
}

export default Sidebar;
