import React from 'react';
import styles from './keyboard.module.scss'

const Keyboard = () => {
    return (
        <div className={[styles.keyboard_wrapper, styles.show_keyboard].join(' ')}>
        <div className={styles['keyboard_container']}>
            <div className={styles['front_keyboard']}>
            <div className={[styles.keyboard_line, styles.keyboard_firstLine].join(' ')}>
                <div className={styles['keyboard_letter']}>Q</div>
                <div className={styles['keyboard_letter']}>W</div>
                <div className={styles['keyboard_letter']}>E</div>
                <div className={styles['keyboard_letter']}>R</div>
                <div className={styles['keyboard_letter']}>T</div>
                <div className={styles['keyboard_letter']}>Y</div>
                <div className={styles['keyboard_letter']}>U</div>
                <div className={styles['keyboard_letter']}>I</div>
                <div className={styles['keyboard_letter']}>O</div>
                <div className={styles['keyboard_letter']}>P</div>
                <div className={styles['keyboard_letter']}>&#60;</div>
            </div>
            <div className={[styles.keyboard_line, styles.keyboard_secondLine].join(' ')}>
                <div className={styles['keyboard_letter']}>A</div>
                <div className={styles['keyboard_letter']}>S</div>
                <div className={styles['keyboard_letter']}>D</div>
                <div className={styles['keyboard_letter']}>F</div>
                <div className={styles['keyboard_letter']}>G</div>
                <div className={styles['keyboard_letter']}>H</div>
                <div className={styles['keyboard_letter']}>J</div>
                <div className={styles['keyboard_letter']}>K</div>
                <div className={styles['keyboard_letter']}>L</div>
                <div className={styles['keyboard_letter']}>LOG IN</div>
            </div>
            <div className={[styles.keyboard_line, styles.keyboard_thirdLine].join(' ')}>
                <div className={styles['keyboard_letter']}>&#94;</div>
                <div className={styles['keyboard_letter']}>Z</div>
                <div className={styles['keyboard_letter']}>X</div>
                <div className={styles['keyboard_letter']}>C</div>
                <div className={styles['keyboard_letter']}>V</div>
                <div className={styles['keyboard_letter']}>B</div>
                <div className={styles['keyboard_letter']}>N</div>
                <div className={styles['keyboard_letter']}>M</div>
                <div className={styles['keyboard_letter']}>&#64;</div>
                <div className={styles['keyboard_letter']}>&#46;</div>
                <div className={styles['keyboard_letter']}>&#94;</div>
            </div>
            <div className={[styles.keyboard_line, styles.keyboard_fourthLine].join(' ')}>
               <div className={[styles.keyboard_letter, styles.ten_percent].join(' ')}>&#46;&#63;123</div>
               <div className={[styles.keyboard_letter, styles.twenty_percent].join(' ')}>&#32;</div>
                <div className={[styles.keyboard_letter, styles.forty_percent].join(' ')}>&#32;</div>
                <div className={[styles.keyboard_letter, styles.ten_percent].join(' ')}>&#95;</div>
                <div className={[styles.keyboard_letter, styles.ten_percent].join(' ')}>&#45;</div>
                <div className={[styles.keyboard_letter, styles.ten_percent, styles.noborder].join(' ')}></div>
            </div>
            </div>
            <div className={styles['back_keyboard']}>
            <div className={[styles.keyboard_line, styles.keyboard_firstLine].join(' ')}>
                <div className={styles['keyboard_letter']}>1</div>
                <div className={styles['keyboard_letter']}>2</div>
                <div className={styles['keyboard_letter']}>3</div>
                <div className={styles['keyboard_letter']}>4</div>
                <div className={styles['keyboard_letter']}>5</div>
                <div className={styles['keyboard_letter']}>6</div>
                <div className={styles['keyboard_letter']}>7</div>
                <div className={styles['keyboard_letter']}>8</div>
                <div className={styles['keyboard_letter']}>9</div>
                <div className={styles['keyboard_letter']}>0</div>
                <div className={styles['keyboard_letter']}>&#60;</div>
            </div>
            <div className={[styles.keyboard_line, styles.keyboard_secondLine].join(' ')}>
                <div className={styles['keyboard_letter']}>&#58;</div>
                <div className={styles['keyboard_letter']}>&#59;</div>
                <div className={styles['keyboard_letter']}>&#37;</div>
                <div className={styles['keyboard_letter']}>&#35;</div>
                <div className={styles['keyboard_letter']}>&#40;</div>
                <div className={styles['keyboard_letter']}>&#41;</div>
                <div className={styles['keyboard_letter']}>&#123;</div>
                <div className={styles['keyboard_letter']}>&#125;</div>
                <div className={styles['keyboard_letter']}>&#34;</div>
                <div className={styles['keyboard_letter']}>LOG IN</div>
            </div>
            <div className={[styles.keyboard_line, styles.keyboard_thirdhLine].join(' ')}>
                <div className={styles['keyboard_letter']}>&#94;</div>
                <div className={styles['keyboard_letter']}>&#39;</div>
                <div className={styles['keyboard_letter']}>&#33;</div>
                <div className={styles['keyboard_letter']}>&#42;</div>
                <div className={styles['keyboard_letter']}>&#61;</div>
                <div className={styles['keyboard_letter']}>&#43;</div>
                <div className={styles['keyboard_letter']}>&#47;</div>
                <div className={styles['keyboard_letter']}>&#92;</div>
                <div className={styles['keyboard_letter']}>&#124;</div>
                <div className={styles['keyboard_letter']}>&#46;</div>
                <div className={styles['keyboard_letter']}>&#94;</div>
            </div>
            <div className={[styles.keyboard_line, styles.keyboard_fourthLine].join(' ')}>                
                <div className={[styles.keyboard_letter, styles.ten_percent].join(' ')}>ABC</div>
                <div className={[styles.keyboard_letter, styles.twenty_percent].join(' ')}>&#32;</div>
                <div className={[styles.keyboard_letter, styles.forty_percent].join(' ')}>&#32;</div>
                <div className={[styles.keyboard_letter, styles.ten_percent].join(' ')}>&#95;</div>
                <div className={[styles.keyboard_letter, styles.ten_percent].join(' ')}>&#45;</div>
                <div className={[styles.keyboard_letter, styles.ten_percent, styles.noborder].join(' ')}></div>
                </div>
        </div>
      </div>
  </div>
    );
};

export default Keyboard;
