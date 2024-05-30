import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  privacy: "public",
};

const profilePrivacySlice = createSlice({
    name:"profilePrivacy",
    initialState,
    reducers:{
        togglePrivacy:(state) =>{
            if(state.privacy==="public")
                 state.privacy = "private"
            else state.privacy = "public"
        }
    }
})

export const {togglePrivacy} = profilePrivacySlice.actions;

export default profilePrivacySlice.reducer;
