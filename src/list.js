import React from "react";
import { useData } from './Datacontext';
import { useSelector, useDispatch } from 'react-redux';
import logo from './lotus.png'; // Tell webpack this JS file uses this image
import { useNavigate  } from 'react-router-dom';
import { assignitem } from './itemsSlice';
import FileSaver from 'file-saver';
import { FaEdit,FaDownload   } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function RenderList(){

//get data from redux
const datalist = useSelector((state) => state.items.items);

const dispatch=useDispatch();

//contextApi
//const { datalist } = useData();
//get from contextApi
const { value2 } = useData();
const [stateValue2, setStateValue2] = value2;


//for navigation to another component
const navigateList = useNavigate();
const handleEdit = (value) => {
    
    setStateValue2(value);
    // Conditional redirect logic
    const shouldRedirect = true; // Replace with your condition
    if (shouldRedirect) {
        navigateList('/');
    }
  };



  const handleDelete=(value)=>{
    
    fetch("https://localhost:44371/api/Patient/DeletePatientRecored?"+ new URLSearchParams({
      patientId: value
    }),{
      method: 'GET'
    }).then(response=>{
      if (!response.ok) {
        // If the response status is not OK, throw an error
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Parse the JSON response
    }).then(responseData=>{
      debugger
      if(responseData)
      {
        //remove the deleted data from list
        var finalList=datalist.filter(a=>a.patientId !== value);
        //assign finallist in reduxState
        dispatch(assignitem(finalList));
      }
      
    
    }).catch(error => {
      console.error('Fetch error:', error); // Handle and log any errors
    });


  }


  const DownloadDocument=(id,name)=>{
    
  
    fetch("https://localhost:44371/api/Patient/DownloadPatientDocumentByPatientId?"+ new URLSearchParams({
      patientId: id
    }),{
      method: 'GET'
    }).then(response=>{
      if (!response.ok) {
        // If the response status is not OK, throw an error
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.blob();
    //return response.json(); // Parse the JSON response
    }).then(function(blob) {
      debugger
      FileSaver.saveAs(blob, name);
      
      //return new Blob([blob], { type: 'application/pdf' })
    
    }).catch(error => {
      console.error('Fetch error:', error); // Handle and log any errors
    });


  }

return(
<div className="list">
    
<h3>Lotus Hospital</h3>
<img src={logo} alt="LotusImg" style={{width:"3%"}} />
<div>
<button onClick={(e)=>navigateList('/')}>New Patient</button>

<p>Patient List</p>
{Array.isArray(datalist) && datalist[0] != null ? (

            <div>
              
                <table style={{width:"70%", marginLeft:"auto",marginRight:"auto"}}>
                <tr>
                  <th>FirstName</th>
                  <th>LastName</th>  
                  <th>Age</th> 
                  <th>Mail</th>  
                  <th>Status</th>  
                  <th>Document</th>  
                  <th colSpan={3}>Action</th>  
                </tr>
                
            {datalist.map((dat,index)=>(
              
                <tr>
   <td style={{width:"30%"}}> {dat.firstName} </td>
   <td style={{width:"30%"}}>{dat.lastName} </td> 
   <td style={{width:"10%"}}> {dat.age} </td> 
   <td style={{width:"30%"}}>  {dat.mailId} </td> 
   <td style={{width:"30%"}}>  {dat.status} </td> 
   <td style={{width:"30%"}}>  {dat.patientDocumentName} </td> 
   <td> <FaEdit id="Icons" onClick={(e)=>handleEdit(dat.patientId)} /></td> 

   <td> <MdDelete  id="Icons" size={20} onClick={(e)=>handleDelete(dat.patientId)} /></td>  
   <td> <FaDownload  id="Icons" onClick={(e)=>DownloadDocument(dat.patientId,dat.patientDocumentName)}  />
   </td> 
</tr>

))}
</table>
            </div>
            
             ):(<p>No data</p>)} 
</div>
</div>
);
}

export default RenderList
