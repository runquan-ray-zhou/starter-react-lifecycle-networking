import { useState, useEffect } from "react";
import days from "./data";
const colors = [
  "papayawhip",
  "blanchedalmond",
  "peachpuff",
  "bisque",
  "cornsilk",
  "lightyellow",
];

function App() {
  const [color, setColor] = useState("lemonchiffon");
  const [dog, setDog] = useState({});
  const [today, setToday] = useState({
    month: "December",
    day: 31,
    weekday: "Sunday",
  });
  const [index, setIndex] = useState(0);
  const [data, setData] = useState(0);
  const [vibe, setVibe] = useState("");
  function handleOnChange(event) {
    setVibe(event.target.value);
  }
  // Demonstrate object is not equal to object
  //   const oneObj = {};
  //   const anotherObj = {};

  //   console.log(oneObj === anotherObj);

  // ES WARNING BAD
  // just value of today bad
  // BUT WE DON't WANT TO CHANGE every time index changes
  // We only want to change when month changes
  // and demo need the nested value
  useEffect(() => {
    setColor(colors[index]);
  }, [today.month]);
  // when does this happen?
  // On button click
  // GIVE THEM THIS FUNCTION
  function updateDay() {
    setIndex((index + 1) % days.length);
    setToday(days[index]);
  }
  function getData() {
    setData(Math.random());
  }

  function getFeaturedDog() {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setDog(json);
      })
      .catch((err) => {
        console.log("error fetching image");
      });
  }
  // first infinite loop
  // no dependency
  // today dependency
  useEffect(() => {
    getData();
  }, [today]);
  // demonstrate log happens after render
  useEffect(() => {
    console.log(vibe);
  }, [vibe]);

  useEffect(() => {
    getFeaturedDog();
  }, []);
  return (
    <div className="App">
      <header style={{ backgroundColor: color }}>
        <h1>Daily Home Page </h1>
        <button onClick={updateDay}>Update Day</button>
      </header>
      <main>
        <div className="date">
          <h2>Todays date:</h2>
          <h3>{today.weekday}</h3>
          <h4>{today.month}</h4>
          <h5>{today.day}</h5>
        </div>
        <div className="lucky">
          <h2>Today's lucky number is: {data}</h2>
        </div>
        <div className="vibe">
          <input type="text" onChange={handleOnChange} />
          <h4>Today's vibe is: </h4>
          <h5>{vibe}</h5>
        </div>
        <div className="dog">
          <h2>Featured dog:</h2>
          <img src={dog.message} alt="Featured Dog" />
        </div>
      </main>
    </div>
  );
}

export default App;
