import React, {useRef, useEffect, useState} from 'react'
import {useTranslation} from "../../context/TranslationContext"
import homeIcon from '../../assets/images/home_icon.png'
import mazeIcon from '../../assets/images/FOT_02.png'
import englishFlag from '../../assets/images/FOT_03.png'
import germanFlag from '../../assets/images/FOT_04.png'
import franceFlag from '../../assets/images/FOT_05.png'
import netherlandsFlag from '../../assets/images/FOT_06.png'
import styles from "./Footer.module.scss"
import { useHistory, useLocation } from "react-router-dom";
import PanicButton from "../../screens/inside/insideComponents/PanicButton";

const Footer = (props) => {
    const [bottommenustyle, setBottommenustyle] = useState(styles['bottom_menu']);
    let bottomElement = useRef(null);
    let logoElement = useRef(null);

    useEffect(() => {
        setTimeout(function(){
            setBottommenustyle([styles.bottom_menu, styles.show_bottom_menu].join(' '))
         }, 100);
    }, []);

    const {changeLanguage} = useTranslation()
    const history = useHistory()
    const {pathname} = useLocation()
    const homeColoredButton = props.homeColoredButton
    const insideDifficultyUrl = props.insideDifficultyUrl

    const handleFullScreen = () => {

        if(document.fullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
            }
        } else {
            let documentElement = document.documentElement;

            if (documentElement.requestFullscreen) {
                documentElement.requestFullscreen();
            } else if (documentElement.webkitRequestFullscreen) { /* Safari */
                documentElement.webkitRequestFullscreen();
            } else if (documentElement.msRequestFullscreen) { /* IE11 */
                documentElement.msRequestFullscreen();
            }
        }
    }



    return(
        <div className={styles.bottom_menu_container}>

                {!(props.homeButtonUrl === pathname) &&
                <div>
                    {/*{homeColoredButton && !(insideDifficultyUrl===pathname) && <PanicButton/>}*/}
                    {props.showHome && <div className={homeColoredButton&&!(insideDifficultyUrl===pathname)?styles.home_icon2:styles.home_icon} onClick={()=>history.replace(props.homeButtonUrl)}>
                    {homeColoredButton?<span className={styles.home_button_color}><img src={homeColoredButton} alt={'home icon'}/></span>:<img src={homeIcon} alt={'home icon'}/>}
                    </div>}
                </div>}

                <div className={bottommenustyle} ref={bottomElement}>
                    <div className={`${styles.bottom_menu_item} ${styles.bottom_menu_flag}`}
                         onClick={()=>changeLanguage('en')}>
                        <img src={englishFlag} alt={'english flag'}/>
                        <div className={styles.language_option}>ENGLISH</div>
                    </div>
                    <div className={`${styles.bottom_menu_item} ${styles.bottom_menu_flag}`}
                         onClick={()=>changeLanguage('fr')}>
                        <img src={franceFlag} alt={'france flag'}/>
                        <div className={styles.language_option}>FRANCAIS</div>
                    </div>
                    <div className={`${styles.bottom_menu_item} ${styles.bottom_menu_logo}`} onDoubleClick={handleFullScreen}>
                        <div className={styles.img_logo_the_maze} >
                            <img src={mazeIcon} ref={logoElement} alt={'maze icon'}/>
                        </div>
                    </div>
                    <div className={`${styles.bottom_menu_item} ${styles.bottom_menu_flag}`}
                         onClick={()=>changeLanguage('de')}>
                        <img src={germanFlag} alt={'german flag'}/>
                        <div className={styles.language_option}>DEUTSCH</div>
                    </div>
                    <div className={`${styles.bottom_menu_item} ${styles.bottom_menu_flag}`}
                         onClick={()=>changeLanguage('nl')}>
                        <img src={netherlandsFlag}  alt={'netherland flag'}/>
                        <div className={styles.language_option}>NEDERLANDS</div>
                    </div>
                </div>
            </div>
    )
};

Footer.defaultProps = {
    showHome: true
}

export default Footer;
