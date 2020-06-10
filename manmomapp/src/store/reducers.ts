import {ManageableItem} from "../models/ManageableItem";
import {
    ManageableActionTypes, 
    GETTING_MANAGEABLE_ITEMS, 
    CREATED_NEW_MANAGEABLE,
    TOGGLED_DONE_STATUS_FOR_MANAGEABLE,
    UPDATING_ALL_MANAGEABLE,
    DELETED_MANAGEABLE} from "./types";


export interface IState {
    manageableItems: ManageableItem[];
}

const defaultValue: IState = {
    manageableItems: []
}

export function manageableReducer(state = defaultValue, action: ManageableActionTypes): IState {
    switch(action.type){
        case GETTING_MANAGEABLE_ITEMS:
            return {
                ...state,
                manageableItems: action.manageableItems
            }

            case CREATED_NEW_MANAGEABLE:
                return {
                    ...state,
                    manageableItems: [...state.manageableItems, action.newManageable]
                }

                case TOGGLED_DONE_STATUS_FOR_MANAGEABLE:
                    let manageableItemToModify = state.manageableItems.filter(individualManageable => { return individualManageable.id === action.id })[0];
                    manageableItemToModify.isDone = !manageableItemToModify.isDone;

                    return{
                        ...state,
                        manageableItems: [...state.manageableItems.filter(IndividualManageableItem => IndividualManageableItem.id !== action.id), manageableItemToModify]
                    }

                case UPDATING_ALL_MANAGEABLE:
                    let manageableItemToAnother = state.manageableItems.filter(IndividualManageable => { return IndividualManageable.id === action.manageableItem.id})[0];
                    manageableItemToAnother.title = "priority";
                    return {
                        ...state,
                        manageableItems: [...state.manageableItems.filter(IndividualManageable => IndividualManageable.id !== action.manageableItem.id), manageableItemToAnother]
                    }


                case DELETED_MANAGEABLE:
                    return {
                        ...state,
                        manageableItems: state.manageableItems
                        .filter(individualManageable => { return individualManageable.id !== action.id})
                    }

                default:
                    return state;
    }
}