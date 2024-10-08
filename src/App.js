import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { DataProvider } from './Datacontext';
import { Provider } from 'react-redux';
import store from './store';

import AppForm from './form';
// import Navbar from './Navbar';

import RenderList from "./list";
import Login from "./Login";



function App() {
  return (

    
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    // <div>{AppForm}</div>
    
    
    // <div className="container mt-2" style={{ marginTop: 40 }}>
        //{/* Render the page here */}
        // {/* <AppForm/> */}

        //{/* <Navbar /> */}
      // </div>
      <React.StrictMode>
      {/* Provider is for redux component */}
      <Provider store={store}>
        
        {/* DataProvider is for contextapi */}
        <DataProvider>

       {/* router is for compoent redirection */}
        <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/form" element={<AppForm />} />
        <Route path="/list" element={<RenderList />} />
      </Routes>
    </Router>

    </DataProvider>

      </Provider>
    </React.StrictMode>
  );
  
}

export default App;
