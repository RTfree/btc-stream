import React, { useState, useEffect } from 'react';
import Cards from "./Cards";
import LineChart from "./LineChart";

let messagesArray = [];
for(let i=0;i<10;i++){
  messagesArray.push({
    "x":{
      "inputs":[{
        "prev_out":{"value":0}
      }]
    }
  });
}
console.log(messagesArray)

const createBitcoinWebSocket=(setbitcoinArr)=>{
  var websocket = new WebSocket("wss://ws.blockchain.info/inv");

  websocket.onopen = function(evt) {
    console.log("OPENING")
    startSendingMessages();
  };
  websocket.onclose = function(evt) {
    console.log("CLOSING")
  };
  websocket.onmessage = function(evt) {
    if(messagesArray.length>10){
      messagesArray.shift();
    }
    messagesArray.push(JSON.parse(evt.data))

    console.log("MESSAGE")
  };
  websocket.onerror = function(evt) {
    console.log("ERROR")
  };

  const startSendingMessages = () => {
    // websocket.send(JSON.stringify());
    websocket.send(`{"op":"unconfirmed_sub"}`);
  };

  setInterval(_=>{
    console.log("RENDER")
    setbitcoinArr(prevState=>{
      prevState += 1;
      return prevState;
    });
  },1000)
}

function App() {
  // Declare a new state variable, which we'll call "count"
  const [bitcoinArr, setbitcoinArr] = useState(0);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    createBitcoinWebSocket(setbitcoinArr);
  },[]);
  return (
    <div className="App">
      <LineChart data={messagesArray}/>
      {messagesArray.reverse().map(item=>{
        return <Cards data={item}/>
      })}
    </div>
  );
}

export default App;