// src/App.js
import React, { useState, useEffect } from "react";
// import { fetchData, sendData } from "./services/apiService";
import { fetchData, sendData } from "../../services/apiService";


function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setData(result.message);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getData();
  }, []);

  const handleSendData = async () => {
    try {
      const result = await sendData({ name: "React User" });
      console.log("Response from Flask:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>React and Flask API Integration</h1>
      <p>Message from Flask: {data}</p>
      <button onClick={handleSendData}>Send Data to Flask</button>
    </div>
  );
}

export default App;
