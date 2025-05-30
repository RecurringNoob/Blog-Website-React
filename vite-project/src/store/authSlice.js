import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    status:false,
    userData : null
}

const authslice= createSlice({
  name:"auth",
  initialState:initalState,
  reducers: {
    
    login:(state,action)=>{
        state.status=true;
        state.userData=action.payload.userData;
    },
    logout:(state,action)=>{
      state.status=false;
      state.userData=null;
  }
  }
})

export default authslice.reducer;
export const {login,logout}=authslice.actions;