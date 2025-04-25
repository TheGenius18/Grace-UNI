import React,{useState,createContext} from "react"
import Connection from ".././components/Connectionpage//Connection"


export const PageContext = createContext();



const ConnectionPage = () => {
  return (
    
    <>
        <Connection/>
    </>
  )
}
export default ConnectionPage