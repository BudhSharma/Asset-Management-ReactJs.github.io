import React, { createContext, useState } from "react";

export const LoginContext = createContext("");
export const updatedata = createContext("");

const Context = ({ children }) => {
  const [logindata, setLoginData] = useState("");
  const [updata, setUPdata] = useState("");

  return (
    <>
      <LoginContext.Provider value={{ logindata, setLoginData }}>
        <updatedata.Provider value={{ updata, setUPdata }}>
          {children}
        </updatedata.Provider>
      </LoginContext.Provider>
    </>
  );
};

export default Context;
