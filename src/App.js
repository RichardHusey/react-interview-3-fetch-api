import react from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Let's fetch data and display!</h1>
      <GenerateList />
    </div>
  );
}

const GenerateList = () => {
  const [activityList, setActivityList] = useState([]);
  const [disableButton, setDisableButton] = useState(false);

  const clickGenerate = () => {
    setDisableButton(true);
    const getActivity = async () => {
      const activity = await axios.get("https://www.boredapi.com/api/activity");
      setActivityList([...activityList, activity.data]);
      setDisableButton(false);
      //console.log(activityList);
    };
    getActivity();
  };

  useEffect(clickGenerate, []);

  return (
    <div
      className="generate-activity"
      display={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flexStart"
      }}
    >
      <button
        display={{
          margin: "auto"
        }}
        onClick={clickGenerate}
        disabled={disableButton}
      >
        Generate Activity
      </button>
      <div className="activity-list">
        {activityList.map((value, index) => (
          <ul key={index}>
            <ExandableListItem item={value} />
          </ul>
        ))}
      </div>
    </div>
  );
};

const ExandableListItem = ({ item }) => {
  const [expand, setExpand] = useState(false);
  const clickExpand = () => {
    setExpand(!expand);
  };
  return (
    <li key={item.key}>
      <div
        className="acticity-list"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <p>{item.activity}</p>
        <button
          style={{
            marginLeft: 20
          }}
          onClick={clickExpand}
        >
          {!expand ? "Expand" : "Collapse"}
        </button>
      </div>
      {expand ? (
        <div
          style={{
            paddingLeft: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flexStart",
            textAlign: "left"
          }}
        >
          <ul>
            {Object.entries(item)
              .filter((pair) => pair[0] !== "activity")
              .map((pair) => (
                <li>
                  {pair[0]}: {pair[1]}
                </li>
              ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
};
