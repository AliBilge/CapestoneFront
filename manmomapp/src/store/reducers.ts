import {ManageableItem} from "../models/ManageableItem";
import {ManageableActionTypes, GETTING_MANAGEABLE_ITEMS, CREATED_NEW_MANAGEABLE, DELETED_MANAGEABLE} from "./types";


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
