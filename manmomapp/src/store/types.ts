import { ManageableItem } from "../models/ManageableItem";
import {Action} from "redux";

export interface ManageableState {
    manageableItems: ManageableItem[];
}

export const THUNK_ACTION = "THUNK_ACTION";

// Action type definition.
// (GET)
export const GETTING_MANAGEABLE_ITEMS = "GETTING_MANAGEABLE_ITEMS";

// Create (POST)
export const CREATED_NEW_MANAGEABLE = "CREATED_NEW_MANAGEABLE";

// Toggle (PATCH)
export const TOGGLED_DONE_STATUS_FOR_MANAGEABLE = "TOGGLED_DONE_STATUS_FOR_MANAGEABLE";

// Update (PUT)
export const UPDATING_ALL_MANAGEABLE = "UPDATING_ALL_MANAGEABLE";

// Delete (DELETE)
export const DELETED_MANAGEABLE = "DELETED_MANAGEABLE";

// ACTIONS. (SYNC ACTIONS WITH REDUX)
export interface GettingManageableItems extends Action<typeof GETTING_MANAGEABLE_ITEMS> {
    manageableItems: ManageableItem[];
}

export interface CreatedNewManageable extends Action<typeof CREATED_NEW_MANAGEABLE> {
    newManageable : ManageableItem
}

export interface ToggledDoneStatusForManageable extends Action<typeof TOGGLED_DONE_STATUS_FOR_MANAGEABLE> {
    id: string;
}

export interface UpdatingAllManageable extends Action<typeof UPDATING_ALL_MANAGEABLE>{
    manageableItem: ManageableItem
}

export interface DeletedManageable extends Action<typeof DELETED_MANAGEABLE>{
    id: string;
}

export type ManageableActionTypes =
GettingManageableItems |
CreatedNewManageable |
ToggledDoneStatusForManageable |
UpdatingAllManageable |
DeletedManageable;