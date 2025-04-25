import React,{useState,createContext} from "react"
import '../assets/css/TherapistPage/TherapistPage.css'
import Header from ".././components/ArticlesPageComponents/ArticlesHeader/ArticlesHeader"
import Main from ".././components/ArticlesPageComponents/ArticlesMain/ArticlesMain"


export const PageContext = createContext();



const ArticlesPage = () => {
  return (
    
    <>
        {/* <Header/> */}
        <Main/>
    </>
  )
}
export default ArticlesPage