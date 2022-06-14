import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import db from "./firebase";
import Message from "./Message";
import { collectionGroup, getDocs, query } from "firebase/firestore";
import "./Search.css";

function Search() {
  const { searchKeyword } = useParams();
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    setSearchResult([]);
  }, []);

  useEffect(() => {
    if (searchKeyword) {
      // console.log("Showing results for keyword: ", searchKeyword);
      async function readData() {
        // const q = query(collection(db, "rooms", roomId, "messages"));
        let counter = 0;
        const q = query(collectionGroup(db, "messages"));
        const querySnapshot = await getDocs(q);
        // console.log("ttl msg => ", querySnapshot.docs.length);
        setSearchResult(querySnapshot.docs.map((doc) => doc.data()));

        // doc.data() is never undefined for query doc snapshots
        // BELOW WILL FILTER OUT MESSAGES CONTAINING OUR KEYWORD

        // console.log(searchResult);
      }
      readData();
    }
  }, [searchKeyword]);

  return (
    <div className="search">
      <div className="search_resultHeader">
        <h3>
          Showing result(s) for keyword "<strong>{searchKeyword}</strong>" :
        </h3>
      </div>
      <div className="search_resultBody">
        {searchResult
          ?.filter((val) => {
            if (searchKeyword == "") {
              return val;
            } else if (
              val.message.toLowerCase().includes(searchKeyword.toLowerCase())
            ) {
              return val;
            }
          })
          .sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
          .map(({ message, timestamp, user, userImage }, index) => {
            return (
              <Message
                message={message}
                timestamp={timestamp}
                author={user}
                authorImage={userImage}
                key={index}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Search;
