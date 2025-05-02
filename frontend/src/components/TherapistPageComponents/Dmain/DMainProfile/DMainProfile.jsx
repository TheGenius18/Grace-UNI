<<<<<<< HEAD
import React, { useState, useContext, useEffect } from "react";
import axios from "axios"
=======
import React, { useState, useContext } from "react";
>>>>>>> 5cdcdfa78f67d012eb71674650a7704f3fef30e5
import './DMainProfile.css';
import Dicon from "/src/assets/images/therapist_icon1.png";
import { Context } from "../../../../context/context";

export default function DMainProfile() {
    const { setDMainChanger } = useContext(Context);
    const [isEditingTarget, setIsEditingTarget] = useState(false);
    const [targetProfile, setTargetProfile] = useState("Double click to edit your professional focus");
    const [image, setImage] = useState(Dicon);
    const [showUpload, setShowUpload] = useState(false);

<<<<<<< HEAD
    const [username, setUsername] = useState("");
    const [isLoggedIn, setLoggedIn] = useState(false);
 
   useEffect(() => {
     const checkLoggedInUser = async () => {
       try {
         const token = localStorage.getItem("accessToken");
         if (token) {
           const config = {
             headers: {
               Authorization: `Bearer ${token}`,
             },
           };
           const response = await axios.get(
             "http://127.0.0.1:8000/api/user/",
             config
           );
           setLoggedIn(true);
           setUsername(response.data.username);
         } else {
           setLoggedIn(false);
           setUsername("");
         }
       } catch {
         setLoggedIn(false);
         setUsername("");
       }
     };
     checkLoggedInUser();
   }, []); 

=======
>>>>>>> 5cdcdfa78f67d012eb71674650a7704f3fef30e5
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setShowUpload(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const actionItems = [
        { id: "cv", label: "My CV", icon: "📄" },
        { id: "articles", label: "Articles", icon: "📚" },
        { id: "memo", label: "Memo", icon: "📝" }
    ];

    return (
        <div className="profile-container">
            <div className="profile-main-card">
                <div className="profile-header">
                    <div className="avatar-container">
                        <img 
                            src={image} 
                            alt="Profile" 
                            className="profile-avatar"
                            onClick={() => setShowUpload(true)}
                        />
                        {showUpload && (
                            <input 
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="avatar-upload-input"
                            />
                        )}
                        <div className="upload-hint">Click to change</div>
                    </div>
                    
                    <div className="profile-info">
<<<<<<< HEAD
                        <h2 className="profile-name">{username}</h2>
=======
                        <h2 className="profile-name">mohammed zr</h2>
>>>>>>> 5cdcdfa78f67d012eb71674650a7704f3fef30e5
                        <div className="profile-stats">
                            <div className="stat-item">
                                <span className="stat-value">7</span>
                                <span className="stat-label">Rank</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`target-profile-section ${isEditingTarget ? 'editing' : ''}`}>
                    {isEditingTarget ? (
                        <div className="edit-container">
                            <input
                                type="text"
                                value={targetProfile}
                                onChange={(e) => setTargetProfile(e.target.value)}
                                className="edit-input"
                                autoFocus
                                onBlur={() => setIsEditingTarget(false)}
                            />
                            <div className="edit-underline"></div>
                        </div>
                    ) : (
                        <div 
                            className="target-display"
                            onDoubleClick={() => setIsEditingTarget(true)}
                        >
                            <div className="target-content">
                                <span className="target-icon">🎯</span>
                                {targetProfile}
                            </div>
                            <div className="target-underline"></div>
                        </div>
                    )}
                </div>
            </div>

            <div className="action-items-row">
                {actionItems.map((item) => (
                    <div 
                        key={item.id}
                        className="action-item"
                        onClick={() => setDMainChanger(item.id)}
                    >
                        <div className="action-icon-wrapper">
                            <span className="action-icon">{item.icon}</span>
                            <span className="action-pulse"></span>
                        </div>
                        <span className="action-label">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}