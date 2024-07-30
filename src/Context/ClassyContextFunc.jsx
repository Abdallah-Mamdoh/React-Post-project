import React, { useState } from "react";
import { createContext } from "react";

export const classyContext = createContext("");

export default function ClassyContextFunc(props) {
    const [classy,setClassy] = useState("")
    const [whitey,setWhitey] = useState("")
    const [bgDark,setBgDark] = useState("")
    const [bgWhite,setBgWhite] = useState("")
    const [txtDark,setTxtDark] = useState("")
    
  return (
    <classyContext.Provider value={[classy,setClassy,whitey,setWhitey,bgDark,setBgDark,bgWhite,setBgWhite,txtDark,setTxtDark]}>
        {props.children}
    </classyContext.Provider>
  );
}
