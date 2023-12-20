import { useState } from "react";
import axios from "axios";

function MyWords({ students }) {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState([]);
  const [words, setWords] = useState([]);
  //new Array(words.length).fill(false)
  console.log("students", students);
  const handleSubmit = (event) => {
    event.preventDefault();
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

  const handleCheckBox = (word, wordType) => async (event) => {
    console.log("students", students.length);
    // const checkedStatus = event.target.value;
    const isChecked = event.target.checked;
    let updatedChecked;
    console.log(isChecked);

    if (isChecked > 0) {

        updatedChecked = [
          ...checked,
          {
            word,
            wordType,
            userId: students[0].id,
          },
        ];
        console.log("checked:", updatedChecked);
      
    } else {
      updatedChecked = checked.filter((selectedWord) => selectedWord !== word);
      console.log("unchecked: ", updatedChecked);
    }
    setChecked(updatedChecked);
  };

  const handlePost = async () => {
    if (words.length > 0) {
      try {
        const response = await axios.post(
          `http://localhost:5000/words/checked`,
          { data: checked }
        );
        console.log("checked", checked);
        setWords(response.data);
      } catch (error) {
        console.error("error:", error);
      }
    }
  };

  return (
    <>
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

        <table>
          <tbody>
            <tr className="wordTable">
              <th>word type</th>
              <th>word</th>
              <th>checkbox</th>
            </tr>
            {words.map((word, index) => (
              <tr key={index}>
                <td> {value} </td>
                <td> {word} </td>
                <td>
                  <input
                    type="checkbox"
                    onChange={handleCheckBox(word, value)}
                  ></input>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="divButton">
          <button className={"postButton"} onClick={handlePost}>
            post
          </button>
        </div>
      </div>
    </>
  );
}

export default MyWords;
