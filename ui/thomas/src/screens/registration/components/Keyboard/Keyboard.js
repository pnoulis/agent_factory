import React, {useState, useEffect} from 'react';
import styles from './keyboard.module.scss'
import schema from './schema'

const KEYBOARD_SIDES = {
    FRONT: 'FRONT',
    BACK: 'BACK'
}

const KEYBOARD_CASES = {
    UPPERCASE: 'UPPERCASE',
    LOWERCASE: 'LOWERCASE'
}
const linesClassNameMap = {
    1: 'keyboard_firstLine',
    2: 'keyboard_secondLine',
    3: 'keyboard_thirdLine',
    4: 'keyboard_fourthLine'
}

const DURATIONANIMATION = {
    START: {},
    END: {
        animationDuration: "1s"
    }
}
const Keyboard = ({showKeyboard, onChange, submitText = 'ENTER'}) => {
    const [animationDuration, setAnimationDuration] = useState(DURATIONANIMATION.START)
    useEffect(() => {
        setTimeout(function(){
            setAnimationDuration(DURATIONANIMATION.END)
         }, 1000);
      }, [])

    const [keyboardSide, setKeyboardSide] = useState(KEYBOARD_SIDES.FRONT)
    const [keyboardCaps, setKeyboardCaps] = useState(KEYBOARD_CASES.UPPERCASE)
    const [keyboardContainerClasses, setKeyboardContainerClasses] = useState([styles.keyboard_container])

    const activeKeyboardSide = schema[keyboardSide]
    const groupKeyboardLetters = [...activeKeyboardSide].reduce((total, currentValue) => {
        if (total[currentValue.line]) {
            total[currentValue.line] = [...total[currentValue.line], currentValue]
        } else {
            total[currentValue.line] = [currentValue]
        }
        return total
    }, {})

    const onButtonClick = (value, e) => {

        if (value === 'shift') {
            setKeyboardCaps(keyboardCaps === KEYBOARD_CASES.UPPERCASE ? KEYBOARD_CASES.LOWERCASE : KEYBOARD_CASES.UPPERCASE)
        } else if (value === 'sidechanger') {
            setKeyboardSide(keyboardSide === KEYBOARD_SIDES.FRONT ? KEYBOARD_SIDES.BACK : KEYBOARD_SIDES.FRONT)

            setKeyboardContainerClasses(keyboardSide === KEYBOARD_SIDES.FRONT ? [styles.keyboard_container, styles.show_back_keyboard] : [styles.keyboard_container])
        } else if (value !== 'empty') {
            onChange(value, e)
        }

    }

    const letterComponent = Object.entries(groupKeyboardLetters).map(([key, value]) => {
        return <div key={key} className={[styles.keyboard_line, styles[linesClassNameMap[key]]].join(' ')}>
            {value.map((keyboardLetter, index) => {
                if (keyboardLetter.renderer) {
                    if(keyboardLetter.extraclasses){
                        let classesArr = keyboardLetter.extraclasses.map((classname)=>{
                            return styles[classname]
                         })
                         classesArr.push(styles['keyboard_letter'])
                        return <div key={keyboardLetter.key + index} className={classesArr.join(' ')}
                                    onClick={(e) => onButtonClick(keyboardLetter.key, e)}>{keyboardLetter.renderer(keyboardCaps)}</div>
                    }
                    return <div key={keyboardLetter.key + index} className={styles['keyboard_letter']}
                                onClick={(e) => onButtonClick(keyboardLetter.key, e)}>{keyboardLetter.renderer(keyboardCaps)}</div>
                }
                let value = keyboardLetter.key
                if (keyboardCaps === KEYBOARD_CASES.UPPERCASE) {
                    value = value.toUpperCase()
                }
                if(keyboardLetter.key === 'submit') {

                    return <div className={styles['keyboard_letter']} key={keyboardLetter.key + index}
                                onClick={(e) => onButtonClick(value, e)}>{submitText}</div>
                }
                return <div className={styles['keyboard_letter']} key={keyboardLetter.key + index}
                            onClick={(e) => onButtonClick(value, e)}>{value}</div>
            })}
        </div>
    })

    return (
        <div>
            <div className={[styles.keyboard_wrapper, showKeyboard && styles.show_keyboard].join(' ')}>
                <div className={keyboardContainerClasses.join(' ')} style={animationDuration}>
                    <div className={styles['']}>
                        {letterComponent}
                    </div>
                </div>
            </div>

        </div>
    )
};

export default Keyboard;
