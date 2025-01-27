import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AUTH_SLICE, User } from './types';

const defaultUser = {
    id: 0,
    profilePic: '',
    name: '',
    username: '',
    email: '',
    city: '',
    phone: '',
};

const initialState: AUTH_SLICE = {
    user: { ...defaultUser },
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state: any, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        updateUserProfile: (state: any, action: any) => {
            state.user = {
                ...state.user,
                ...action.payload,
                address: {
                    ...state.user.address,
                    ...action.payload.address,
                },
            };
            if (action.payload.city) {
                state.user.address.city = action.payload.city;
            }
        },
        logout: (state) => {
            state.user = { ...defaultUser };
            state.isAuthenticated = false;
        },
    },
});

export const { setUser, logout, updateUserProfile } = authSlice.actions;

export default authSlice.reducer;
