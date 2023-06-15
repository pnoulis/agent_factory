import React from 'react';
import styles from "./ScreenSelectorLayout.module.scss";
import Particles from "../components/Particles";

const ScreenSelectorLayout = ({children}) => {
    return (
        <div className={styles['the-maze-wrapper']}>
            <Particles/>
            {children}
        </div>
    );
};

export default ScreenSelectorLayout;
