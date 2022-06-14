import React from "react";
import "./Welcome.css";
import { useStateValue } from "./StateProvider";

function Welcome() {
  const [{ user }] = useStateValue();
  console.log(user);

  return (
    <div className="welcome_container">
      <div className="welcome_spacer"></div>
      <div className="welcome">
        <div className="welcome_body">
          <br />
          <br />
          <h1>{user.metadata.lastSignInTime ? "Welcome back!" : "Welcome!"}</h1>
          {user ? (
            <>
              <br />
              <h3>Your are logged in as:</h3>
              <br />
              <h3>
                Name: <span>{user.displayName}</span>
              </h3>
              <h3>
                Email: <span>{user.email}</span>
              </h3>
              {user.metadata.lastSignInTime ? (
                <h3>
                  Last Sign-in:{" "}
                  <span>{Date(user.metadata.lastSignInTime)}</span>
                </h3>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Welcome;
