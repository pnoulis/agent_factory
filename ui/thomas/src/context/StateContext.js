import React, {createContext, useContext, useReducer} from 'react';

const stateContext = createContext({})
const SET_USER = 'SET_USER'
const SET_MERGE_TEAM_USERS = 'SET_MERGE_TEAM_USERS'
const SET_MERGE_TEAM_NAME = 'SET_MERGE_TEAM_NAME'
const CLEAR_MERGE_TEAM_USERS  = 'CLEAR_MERGE_TEAM_USERS'
const SET_GAME_ID  = 'SET_GAME_ID'
const SET_GAME_SESSION  = 'SET_GAME_SESSION'
const UPDATE_GAME_SCORE  = 'UPDATE_GAME_SCORE'
const SET_PERSON_RESPONSIBLE  = 'SET_PERSON_RESPONSIBLE'
const SET_WRISTBAND_NUMBER_GROUP_EVENT  = 'SET_WRISTBAND_NUMBER_GROUP_EVENT'

const reducer = (state, action) => {
    switch (action.type) {
        case SET_USER:
            return {...state, user: action.payload}
        case SET_MERGE_TEAM_USERS:
            return {...state, mergeTeamUsers: [...state.mergeTeamUsers, action.payload]}
        case SET_MERGE_TEAM_NAME:
            return {...state, mergeTeamName: action.payload}
        case CLEAR_MERGE_TEAM_USERS:
            return {...state, mergeTeamUsers: []}
        case SET_GAME_ID:
            return {...state, gameId: action.payload}
        case SET_GAME_SESSION:
            return {...state, gameSession: action.payload}
        case UPDATE_GAME_SCORE:
            return {...state, gameSession: {...state.gameSession, pointsToWin: action.payload}}
        case SET_PERSON_RESPONSIBLE:
            return {...state, personResponsible: action.payload}
        case SET_WRISTBAND_NUMBER_GROUP_EVENT:
            return {...state, wristbandNumberGroupEvent: action.payload}
        default:
            return state
    }
}

const initialState = {
    user: {},
    mergeTeamUsers: [],
    mergeTeamName: '',
    personResponsible: {},
    wristbandNumberGroupEvent: ''
}

const StateContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const setUser = (user) => {
        dispatch({
            type: SET_USER,
            payload: user
        })
    }

    const setPersonResponsible = (user) => {
        dispatch({
            type: SET_PERSON_RESPONSIBLE,
            payload: user
        })
    }

    const setMergeTeamUser = (user) => {
        dispatch({
            type: SET_MERGE_TEAM_USERS,
            payload: user
        })
    }

    const setMergeTeamName = (name) => {
        console.log('name', name)
        dispatch({
            type: SET_MERGE_TEAM_NAME,
            payload: name
        })
    }
    const clearMergeTeamUsers = () => {
        dispatch({
            type: CLEAR_MERGE_TEAM_USERS,
        })
    }

    const setGameId = (gameId) => {
        dispatch({
            type: SET_GAME_ID,
            payload: gameId
        })
    }
    const setGameSession = (gameSession) => {
        dispatch({
            type: SET_GAME_SESSION,
            payload: gameSession
        })
    }

    const updateScore = (pointsToWin) => {
        dispatch({
            type: UPDATE_GAME_SCORE,
            payload: pointsToWin
        })
    }

    const setWristbandNumberGroupEvent = (wristbandNumber) => {
        dispatch({
            type: SET_WRISTBAND_NUMBER_GROUP_EVENT,
            payload: wristbandNumber
        })
    }

    return (
        <stateContext.Provider value={{setUser, setMergeTeamUser, setMergeTeamName, clearMergeTeamUsers, setGameId, setGameSession, updateScore, setPersonResponsible, setWristbandNumberGroupEvent, ...state}}>
            {children}
        </stateContext.Provider>
    );
};

export const useStateHook = () => {
    return useContext(stateContext)
}

export default StateContextProvider;
