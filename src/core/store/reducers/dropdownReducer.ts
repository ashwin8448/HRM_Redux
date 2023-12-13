import {  ISelectOptionProps } from "../../interfaces/interface.ts";
import * as actionTypes from "../actionTypes.ts";

const initialState = {
    departments: [],
    designations: [],
    empModes: [],
    skills: [],
    loading: true,
};

function dropdownReducer(
    state= initialState,
    action: {
        type: string;
        payload: ISelectOptionProps[] | boolean;
    }
) {
    switch (action.type) {
        
        case actionTypes.SET_DEPARTMENTS:
            return { ...state, departments: action.payload };
        case actionTypes.SET_ROLES:
            return { ...state, roles: action.payload };
        //TODO:
        // case actionTypes.SET_EMP_MODES:
        //     return { ...state, empModes: action.payload };
        case actionTypes.SET_SKILLS:
            return { ...state, skills: action.payload };
        case actionTypes.SET_LOADING:
            return { ...state, loading: action.payload };
        default:
            return state;
    }
};

export default dropdownReducer;
