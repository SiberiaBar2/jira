import { createSlice } from "@reduxjs/toolkit";
import { User } from "screen/project-list/search-panel";
import { AppDispatch, RootState } from "store";
import { AuthForm, bootStrapUser } from "./auth-context";
import * as auth from "auth-provider";

interface State {
    user: User| null
}

const initialState: State= {
    user: null
}

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setUser (state, action) {// payload: 传入的参数
            state.user = action.payload;
        }
    }
});

const {setUser} = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export const login = (form: AuthForm) => (dispatch: AppDispatch) => auth.login(form).then(user => dispatch(setUser(user)));
export const register = (form: AuthForm) => (dispatch: AppDispatch) => auth.register(form).then(user => dispatch(setUser(user)));
export const logout = () => (dispatch: AppDispatch) => auth.logout().then(() => dispatch(setUser(null)));

export const bootstrap = () => (dispatch: AppDispatch) => bootStrapUser().then(user => dispatch(setUser(user)));
