import React, { createContext, useState, useContext } from 'react';

// Context lets components pass information deep down without explicitly passing props
const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

//for single Data passing 
// export function DataProvider({ children }) {
//   const [datalist, setData] = useState([null]);

//   return (
//     <DataContext.Provider value={{ datalist, setData }}>
//       {children}
//     </DataContext.Provider>
//   );
// }

//for multiple data passing
export const DataProvider=props=>{
  const [datalist, setData] = useState([null]);
  const [patientId, setPatientId] = useState(0);

  return (
    <DataContext.Provider value={{ value: [datalist, setData], value2: [patientId, setPatientId] }}>
    {props.children}
  </DataContext.Provider>
  );
}
