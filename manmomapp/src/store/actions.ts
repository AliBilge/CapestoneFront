import {ThunkAction} from "redux-thunk";
import {RootState} from ".";
import {AppActions} from "../models/action";
import {
    GETTING_MANAGEABLE_ITEMS, 
    CREATED_NEW_MANAGEABLE,
    TOGGLED_DONE_STATUS_FOR_MANAGEABLE,
    UPDATING_ALL_MANAGEABLE,
    DELETED_MANAGEABLE} from "./types";
import { ManageableItem } from "../models/ManageableItem";
import agent from "../api/agent";

type ThunkResult<R> = ThunkAction <R, RootState, undefined, AppActions>;

// Action creater
export function getManageableItems(): ThunkResult<void> {
    return (dispatch, getState) => {
        let a = agent.ManageableApis.getList(); // API call from API agent.

        a.then(
            value => {
                // If that is successful...
                dispatch({type: GETTING_MANAGEABLE_ITEMS, manageableItems: value});
                // Send it to modify the data store in the reducer.
            },
            reason => {
                // Reject
                console.log(reason);
            }
        ).catch(error => console.log(error));
    }
}

export function createNewManageable(manageableItem: ManageableItem): ThunkResult<void> {
    return (dispatch, getState) => {
        let a = agent.ManageableApis.post(manageableItem); //Api call.

        a.then(
            value => {
                dispatch({type: CREATED_NEW_MANAGEABLE, newManageable: manageableItem})
            },
            reason => {
                console.log(reason)
            }
        )
        .catch(error => console.log(error.response))
        .then((response) => console.log(response));
    }
}

export function toggledDoneStatusForManageable(id: string): ThunkResult<void> {
    return (dispatch, getState) => {
        let a = agent.ManageableApis.patch(id); //Api call.

        a.then(
            value => {
                dispatch({type: TOGGLED_DONE_STATUS_FOR_MANAGEABLE, id: id})
            },
            reason => {
                console.log(reason)
            }
        ).catch(error => console.log(error))
        .then((response) => console.log(response));
    }
}

export function updatingAllManageable(manageableItem: ManageableItem): ThunkResult<void> {
    return (dispatch, getState) => {
        let a = agent.ManageableApis.put(manageableItem); //Api call.

        a.then(
            value => {
                dispatch({type: UPDATING_ALL_MANAGEABLE, manageableItem: manageableItem})
            },
            reason => {
                console.log(reason)
            }
        ).catch(error => console.log(error))
        .then((response) => console.log(response));
    }
}

export function deleteManageable(id: string): ThunkResult<void> {
    return (dispatch, getState) => {
        let a = agent.ManageableApis.delete(id); //Api call.

        a.then(
            value => {
                dispatch({type: DELETED_MANAGEABLE, id: id})
            },
            reason => {
                console.log(reason)
            }
        ).catch(error => console.log(error))
        .then((response) => console.log(response));
    }
}