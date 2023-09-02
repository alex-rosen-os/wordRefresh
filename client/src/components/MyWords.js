import { useState } from "react";
import axios from "axios";

function MyWords() {
  const [words, setWords] = useState([]);
  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handlePost = async (event) => {
    try {
      const response = await axios.post(`http://localhost:5000/words/`, {
        words: [],
      });
      console.log("data", response.data);
      setWords(response.data);
    } catch (error) {
      console.log("1", error);
    }
    console.log("handling posts");
  };

  const fetchData = async (event) => {
    let wordType =
      event.target.previousElementSibling.previousElementSibling.value;

    setValue(wordType);

    if (wordType === "noun") {
      console.log("this is a noun");
    } else {
      console.log("this is a verb");
    }
    try {
      const response = await axios.get(
        `http://localhost:5000/words/teacherwords/${wordType}`
      );
      setWords(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wordBox">
      <form onSubmit={handleSubmit}>
        <h2>Word Refresh</h2>
        <input type="text" list="getWords"></input>
        <datalist id="getWords">
          <option value="verb" />
          <option value="noun" />
        </datalist>
        <button onClick={fetchData}>Get </button>
      </form>
      <tbody>
        <tr>
          <th>word type</th>
          <th>word</th>
          <th>checkbox</th>
        </tr>
        {words.map((word, index) => (
          <tr>
            <td key={index + new Date().getTime()}> {value} </td>
            <td key={index * new Date().getTime()}> {word} </td>
            <td>
              <input type="checkbox"></input>
            </td>
          </tr>
        ))}
      </tbody>
      <div className="divButton">
        <button className={"postButton"} onClick={handlePost}>
          post
        </button>
      </div>
    </div>
  );
}

export default MyWords;
