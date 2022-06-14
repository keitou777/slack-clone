import React from "react";
import "./Login.css";
import { Button } from "@mui/material";
import db, { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { query, collection, where, getDocs, addDoc } from "firebase/firestore";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      console.log(res);
      dispatch({
        type: actionTypes.SET_USER,
        user: res.user,
      });
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  //   *******************************************

  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://apiway.ai/storage/softs/YisONm9JLhNxkKDlmWkpbKGrotSo13uAuZxZhked.jpg"
          alt=""
        />
        <h1>Sign in to Slack</h1>
        <p>abc.slack.com</p>
        <Button onClick={signIn} className="button">
          Sign In with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
