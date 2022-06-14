import React from "react";
import "./Message.css";
import moment from "moment";
import { useStateValue } from "./StateProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  doc,
  deleteDoc,
  getDocs,
  query,
  onSnapshot,
  collection,
  collectionGroup,
  where,
} from "firebase/firestore";
import db from "./firebase";

function Message({ message, author, authorImage, timestamp, uid, messageId }) {
  const [{ user }] = useStateValue();

  const deleteMessage = async () => {
    // console.log(
    //   "you are deleting messageID: ",
    //   messageId,
    //   " message: ",
    //   message
    // );

    const q = query(
      collectionGroup(db, "messages"),
      where("message", "==", message),
      where("timestamp", "==", timestamp),
      where("uid", "==", uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
  };

  return (
    <div className="message">
      <img src={authorImage} alt="" />
      <div className="message_info">
        <h4>
          {author}{" "}
          <span className="message_timestamp">
            {moment(timestamp?.toDate())
              .format("ddd DD-MMM-yyyy hh:mm a")
              .toString()}
          </span>
          {user.uid === uid ? (
            <DeleteIcon onClick={deleteMessage} className="deleteIcon" />
          ) : (
            ""
          )}
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Message;
