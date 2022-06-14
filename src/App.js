import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Router, Routes, Route, Link } from "react-router-dom";
import Chat from "./Chat";
import Welcome from "./Welcome";
import { useState } from "react";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import Search from "./Search";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <>
          <Header />
          <div className="app_body">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/room/:roomId" element={<Chat />} />
              <Route path="/search/:searchKeyword" element={<Search />} />
            </Routes>
            {/* react router ==> chat screen */}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
