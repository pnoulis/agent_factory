import LaserTrap from '../assets/videos/rooms/LaserTrap.webm'
import AlleyOops from '../assets/videos/rooms/AlleyOops.webm'
import BubbleBobble from '../assets/videos/rooms/BubbleBobble.webm'
import Goal from '../assets/videos/rooms/Goal.webm'
import GrandPiano from '../assets/videos/rooms/GrandPiano.webm'
import JustDoIt from '../assets/videos/rooms/JustDoIt.webm'
import LetterFloor from '../assets/videos/rooms/LetterFloor.webm'
import Reflections from '../assets/videos/rooms/Reflections.webm'
import Scarecrow from '../assets/videos/rooms/Scarecrow.webm'
import SpaceJam from '../assets/videos/rooms/SpaceJam.webm'
import SuckerPunch from '../assets/videos/rooms/SuckerPunch.webm'

export const classNameGenerator = (styles) => (classnames) => {
    if(Array.isArray(classnames)) {
        return classnames.map((classname)=>styles[classname]).join(" ")
    } else {
        return styles[classnames]
    }
}


export const keyboardOnChange = ({submit, elementOpenedKeyboard, values, setValues}) => (value, e) => {

    if(elementOpenedKeyboard?.target?.name && elementOpenedKeyboard?.target?.pattern === 'date') {
        e.preventDefault()

        let newValue = values[elementOpenedKeyboard?.target?.name]
        let selectionStart = elementOpenedKeyboard?.target?.selectionStart
        let selectionEnd = elementOpenedKeyboard?.target?.selectionEnd

        if (value.toLowerCase() === 'back') {
            if(!(selectionStart === 0 && newValue.length > 0)) {
                if(!(selectionStart === newValue.length )) {
                    return
                } else if(selectionStart === 7) {
                    newValue = newValue.slice(0, selectionStart - 2) + newValue.slice(selectionStart);
                } if(selectionStart === 4) {
                    newValue = newValue.slice(0, selectionStart - 2) + newValue.slice(selectionStart);
                } else {
                    newValue = newValue.slice(0, selectionStart - 1) + newValue.slice(selectionStart);
                }
            }
        } else if (value.toLowerCase() === 'submit') {
            submit()
        } else if (value.toLowerCase() === 'space') {
                return
        } else {
            if((newValue + value).length === 3) {
                newValue = newValue.slice(0, 2) + '/'
                selectionStart = selectionStart + 1
            }
            if((newValue + value).length === 6) {
                newValue = newValue.slice(0, 5) + '/'
                selectionStart = selectionStart + 1
            }
            newValue = newValue.slice(0, selectionStart) + value + newValue.slice(selectionStart)
        }

        setValues(prevState => ({...prevState, [elementOpenedKeyboard?.target?.name]: newValue}))
        elementOpenedKeyboard.target.focus()

        if (selectionStart === selectionEnd && selectionStart !== newValue.length - 1) {
            setTimeout(() => {
                if(!(selectionStart === 0 && newValue.length > 0)) {
                    elementOpenedKeyboard.target.selectionStart = selectionStart - (value === 'back' ? 1 : -1)
                    elementOpenedKeyboard.target.selectionEnd = selectionEnd - (value === 'back' ? 1 : -1)
                }
            }, 10)

        }
    }
    else if(elementOpenedKeyboard?.target?.name) {
        e.preventDefault()

        let newValue = values[elementOpenedKeyboard?.target?.name]
        let selectionStart = elementOpenedKeyboard?.target?.selectionStart
        let selectionEnd = elementOpenedKeyboard?.target?.selectionEnd

        if (value.toLowerCase() === 'back') {
            if(!(selectionStart === 0 && newValue.length > 0)) {
                newValue = newValue.slice(0, selectionStart - 1) + newValue.slice(selectionStart);
            }
        } else if (value.toLowerCase() === 'submit') {
            submit()
        } else if (value.toLowerCase() === 'space') {
            newValue = newValue.slice(0, selectionStart) + " " + newValue.slice(selectionStart)
        } else {
            newValue = newValue.slice(0, selectionStart) + value + newValue.slice(selectionStart)
        }

        setValues(prevState => ({...prevState, [elementOpenedKeyboard?.target?.name]: newValue}))
        elementOpenedKeyboard.target.focus()

        if (selectionStart === selectionEnd && selectionStart !== newValue.length - 1) {
            setTimeout(() => {
                if(!(selectionStart === 0 && newValue.length > 0)) {
                    elementOpenedKeyboard.target.selectionStart = selectionStart - (value === 'back' ? 1 : -1)
                    elementOpenedKeyboard.target.selectionEnd = selectionEnd - (value === 'back' ? 1 : -1)
                }
            }, 10)

        }
    }
}

const videoPath = {
    'LaserTrap.webm': LaserTrap,
    'AlleyOops.webm': AlleyOops,
    'BubbleBobble.webm': BubbleBobble,
    'Goal.webm': Goal,
    'GrandPiano.webm': GrandPiano,
    'JustDoIt.webm': JustDoIt,
    'LetterFloor.webm': LetterFloor,
    'Reflections.webm': Reflections,
    'Scarecrow.webm': Scarecrow,
    'SpaceJam.webm': SpaceJam,
    'SuckerPunch.webm': SuckerPunch,

}
export const getVideoFromName = (name) => {
    return videoPath[name]
}

const randomString = (length, chars) => {
    let result = '';
    for (let i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
export const createRandomPlayerName = () => {
    return `AGENT#${randomString(6, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ')}`
}
export const createRandomTeamName = () => {
    return `TEAMAGENT#${randomString(6, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ')}`
}
