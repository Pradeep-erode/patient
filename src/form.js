import "./App.css";
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "./Datacontext";
import { useDispatch } from "react-redux";
import { assignitem } from "./itemsSlice";

// https://www.geeksforgeeks.org/create-a-form-using-reactjs/

//functional component
function AppForm() {
  //contextapi
  const { value2 } = useData();
  const [patientId, setpatient] = value2;

  //load on pageload
  useEffect(() => {
    if (patientId > 0) {
      handleDataEdit(patientId);
    }
  });

  //for navigation to another component
  const navigateList = useNavigate();
  const handleRedirect = () => {
    // Conditional redirect logic
    const shouldRedirect = true; // Replace with your condition
    if (shouldRedirect) {
      navigateList("/list");
    }
  };

  //to send data to redux
  const dispatch = useDispatch();

  //form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("male");
  const [subjects, setSubjects] = useState({
    Room: true,
    Bed: false,
    Food: false,
  });
  const [resume, setResume] = useState("");
  const [documentName, setdocumentName] = useState("");
  //const [url, setUrl] = useState();
  const [selectedOption, setSelectedOption] = useState("");
  const [about, setAbout] = useState("");
  const [age, setAge] = useState(0);
  const [patientstatus, setStatus] = useState("");
  const [queryType, setQueryType] = useState("INSERT");

  //local state for formValues
  const [objs, setobj] = useState([]);

  //yet to learn
  // export enum actionTypes={
  //     create,
  //     update,
  //     Delete,
  //     FetchAll
  // }

  // export interface IProps{
  //     Label?: string;
  //     Size: Sizes;
  // }
  //var obj=null;

  //spread syntex
  //...prev - copy the element in sub and find clicked subject by [sub] and replace it non previous condition
  const handleSubjectChange = (sub) => {
    setSubjects((prev) => ({
      ...prev,
      [sub]: !prev[sub],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your form submission logic here
    const formdata = new FormData();
    formdata.append("FirstName", firstName);
    formdata.append("LastName", lastName);
    formdata.append("MailId", email);
    formdata.append("Status", patientstatus);
    formdata.append("Age", age);
    debugger;
    formdata.append("queryType", queryType);
    formdata.append("patientDoc", resume);

    try {
      // Send the FormData object in a POST request
      fetch("https://localhost:44371/api/Patient/SavePatientName/",
        {
          method: "POST",
          body: formdata,
        }).then((response)=>{
          if(response.ok)
          {
            handleReset();
            handleListRender();
          }
        });

      

      
     
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleReset = () => {
    // Reset all state variables here
    setFirstName("");
    setLastName("");
    setEmail("");
    setContact("");
    setGender("male");
    setSubjects({
      Room: true,
      Bed: false,
      Food: false,
    });
    setResume("");
    //setUrl("");
    setSelectedOption("");
    setAbout("");
    setAge("");
    setStatus("");
  };

  const handleListRender = () => {

    fetch("https://localhost:44371/api/Patient/GetPatientInfoList/", {
      method: "GET",
    }).then((response) => {
        if (!response.ok) {
          // If the response status is not OK, throw an error
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the JSON response
      })
      .then((responseData) => {
        console.log(responseData); // Log the data to the console

        //set in local const
        //setobj(responseData);

        //sample array for test
        // const fetchedData = [
        //     { firstName: 'John', lastName: 'Doe', age: 30, mailId: 'john.doe@example.com' },
        //     { firstName: 'Jane', lastName: 'Smith', age: 25, mailId: 'jane.smith@example.com' }
        //   ];
        //setData(fetchedData);

        //set in contextapi
        //setData(responseData);

        //assign value in redux
        dispatch(assignitem(responseData));

        //handle redirection
        handleRedirect();
      })
      .catch((error) => {
        console.error("Fetch error:", error); // Handle and log any errors
      });
  };

  const handleDataEdit = (id) => {
    debugger;
    const formdata1 = new FormData();
    //formdata.append("queryType","EDIT");
    formdata1.append("patientId", id);
    setQueryType("EDIT");
    fetch(
      "https://localhost:44371/api/Patient/GetPatientInfoList?" +
        new URLSearchParams({
          patientId: id,
        }),
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (!response.ok) {
          // If the response status is not OK, throw an error
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the JSON response
      })
      .then((responseData) => {
        debugger;
        console.log(responseData); // Log the data to the console
        var responseData = responseData[0];
        setFirstName(responseData.firstName);
        setLastName(responseData.lastName);
        setEmail(responseData.mailId);
        setAge(responseData.age);
        setStatus(responseData.status);
        setdocumentName(responseData.patientDocumentName);
        //set in local const
        //setobj(responseData);

        //sample array for test
        // const fetchedData = [
        //     { firstName: 'John', lastName: 'Doe', age: 30, mailId: 'john.doe@example.com' },
        //     { firstName: 'Jane', lastName: 'Smith', age: 25, mailId: 'jane.smith@example.com' }
        //   ];
        //setData(fetchedData);

        //set in contextapi
        //setData(responseData);

        //assign value in redux
        //dispatch(assignitem(responseData));

        //tested but not works
        // <RenderList list={responseData}/>
        //return <Navigate to='/list' list={responseData}  />

        //handle redirection
        //handleRedirect()
      })
      .catch((error) => {
        console.error("Fetch error:", error); // Handle and log any errors
      });
  };

  return (
    <div className="App">
      <h1>Patient Form</h1>
      <fieldset>
        <form action="#" method="get">
          <label for="firstname">First Name*</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter First Name"
            required
          />
          <label for="lastname">Last Name*</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter Last Name"
            required
          />
          <label for="email">Enter Email* </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
          <label for="tel">Contact*</label>
          <input
            type="tel"
            name="contact"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Enter Mobile number"
            required
          />
          <label for="gender">Gender*</label>
          <input
            type="radio"
            name="gender"
            value="male"
            id="male"
            checked={gender === "male"}
            onChange={(e) => setGender(e.target.value)}
          />
          Male
          <input
            type="radio"
            name="gender"
            value="female"
            id="female"
            checked={gender === "female"}
            onChange={(e) => setGender(e.target.value)}
          />
          Female
          <input
            type="radio"
            name="gender"
            value="other"
            id="other"
            checked={gender === "other"}
            onChange={(e) => setGender(e.target.value)}
          />
          Other
          <label for="lang">Your Required Things</label>
          <input
            type="checkbox"
            name="lang"
            id="Room"
            checked={subjects.Room === true}
            onChange={(e) => handleSubjectChange("Room")}
          />
          Room
          <input
            type="checkbox"
            name="lang"
            id="Bed"
            checked={subjects.Bed === true}
            onChange={(e) => handleSubjectChange("Bed")}
          />
          Bed
          <input
            type="checkbox"
            name="lang"
            id="Food"
            checked={subjects.Food === true}
            onChange={(e) => handleSubjectChange("Food")}
          />
          Food
          <label for="file">Upload Id Proof*</label>
          <input
            type="file"
            name="file"
            id="file"
            onChange={(e) => setResume(e.target.files[0])}
            placeholder="Enter Upload File"
            required
          />
          <label style={{ color: "darkcyan" }}>
            {patientId > 0 ? documentName : ""}
          </label>
          {/* <label for="url">Enter URL*</label>
                    <input
                        type="url"
                        name="url"
                        id="url"
                        onChange={(e) =>
                            setUrl(e.target.value)
                        }
                        placeholder="Enter url"
                        required
                    /> */}
          <label for="Number">Select your Age</label>
          <input
            type="number"
            name="Number"
            id="Number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter Age"
            required
          />
          <label for="Status">Select Patient status</label>
          <select id="Status" value={patientstatus} onChange={(e) => setStatus(e.target.value)} placeholder="Patient status">
            <option value="INIT">INIT</option>
            <option value="DEATH">DEATH</option>
          </select>
          
          <label>Select Mode on Injuiry</label>
          <select
            name="select"
            id="select"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="" disabled selected={selectedOption === ""}>
              Select your Ans
            </option>
            <optgroup label="Arificial">
              <option value="1">Blade scratch</option>
              <option value="2">Poison Intaken</option>
              <option value="3">Accident</option>
            </optgroup>
            <optgroup label="Natural">
              <option value="4">Slipping</option>
              <option value="5">Animals</option>
              <option value="6">handTools</option>
              <option value="t">Fall</option>
            </optgroup>
          </select>
          <label for="about">Patient Stage in brief</label>
          <textarea
            name="about"
            id="about"
            cols="30"
            rows="10"
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Patient Injuiry detail"
            required
          ></textarea>
          <button type="reset" value="reset" onClick={() => handleReset()}>
            Reset
          </button>
          <button type="submit" value="Submit" onClick={(e) => handleSubmit(e)}>
            Submit
          </button>
          <button
            type="button"
            value="button"
            onClick={(e) => handleListRender(e)}
          >
            GetList
          </button>
        </form>
      </fieldset>
      <h1>Patient List</h1>

      {/* load list in same component */}
      {/* {Array.isArray(objs) ? (
            <ul>
            {objs.map((data)=>{
                debugger
                return(
                    <li>{data.firstName} {data.lastName} {data.age} {data.mailId}</li>
                )
            })}
            </ul>
             ):(<p>No data</p>)}  */}
    </div>
  );
}

export default AppForm;
