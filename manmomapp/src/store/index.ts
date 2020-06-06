import {combineReducers, applyMiddleware, createStore} from "redux";
import {AppActions} from "../models/action";
import {manageableReducer} from "./reducers"
import thunk, {ThunkMiddleware} from "redux-thunk";

const rootReducer = combineReducers({
    manageableReducer: manageableReducer
})

export type RootState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const store = createStore<RootState, AppActions, {}, {}>(
        rootReducer,
        applyMiddleware (
            thunk as ThunkMiddleware<RootState, AppActions>
        )
    );

    return store;
}