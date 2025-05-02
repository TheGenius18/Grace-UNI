import './Sidebar.css'
import React, { useState } from "react"
import {assets} from '../../assets/assets'


const Sidebar = () => {

  const [extended,setExtended] = useState(false)

  return (
    <div className="Sidebar">
      <div className="top">
      <img onClick={()=>setExtended(prev=>!prev)} className='menu' src={assets.menu_icon} alt="" />
      <div className="new-chat">
        <img src={assets.plus_icon} alt="" />
        {extended?<p>new chat</p>:null}
      </div>
      {extended
      ?
      <div className="recent">
      <p className="recent-title">
        <div className="recent-entry">
          <img src={assets.message_icon} alt="" />
          <p>what is react ?</p>
        </div>
      </p>
      </div>
      :null
      }
      </div>
      <div className="bottom">
          <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="" />
            {extended?<p>help</p>:null}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="" />
            {extended?<p>activity</p>:null}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="" />
            {extended?<p>setting</p>:null}
          </div>
      </div>
    </div>
  )
}
export default Sidebar