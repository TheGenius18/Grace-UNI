import React, { useContext } from 'react';
import { Context } from "../../../../context/context";
import './PatientTrainingMenu.css';

const MainMenu = () => {
    const { OnMenuChange, setOnMenuChange } = useContext(Context);
    const menuItems = [
        { id: 'therapy-training', label: 'Therapy Tools' },
        { id: 'self-care', label: 'Self Care' },
        { id: 'meditations', label: 'Meditations' },
<<<<<<< HEAD
        { id: 'sounds', label: 'Relaxing Sounds' }
=======
        { id: 'treatment-tools', label: 'Relaxing Sounds' }
>>>>>>> 5cdcdfa78f67d012eb71674650a7704f3fef30e5
    ];

    return (
        <div className="training-menu-container">
            <div className="training-main-menu">
                {menuItems.map((item, index) => (
                    <React.Fragment key={item.id}>
                        <button
                            className={`training-page-menu-button ${OnMenuChange === item.id ? 'active' : ''}`}
                            onClick={() => {setOnMenuChange(item.id)}}
                        >
                            <div className="training-button-dot"></div>
                            <span className="training-button-content">{item.label}</span>
                        </button>
                        {index < menuItems.length - 1 && (
                            <div className={`connector-line ${OnMenuChange === item.id ? 'active-left' : ''} ${OnMenuChange === menuItems[index + 1].id ? 'active-right' : ''}`}></div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default MainMenu;