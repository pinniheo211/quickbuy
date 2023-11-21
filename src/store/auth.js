import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AuthService } from "./api/index";

const actionRegister = createAsyncThunk("auth/register", async (data) => {
  try {
    const res = await AuthService.doRegister(data);
    if (res.status === 200) {
      return res.data.data;
    } else {
      toast.error(res.data.message);
      return [];
    }
  } catch (error) {
    const message = error.response.data?.message || error.message;
    toast.error(message);
    return message;
  }
});

const actionLogin = createAsyncThunk("auth/login", async (data) => {
  try {
    const res = await AuthService.doLogin(data);
    if (res.status === 200) {
      return res.data.data;
    } else {
      toast.error(res.data.message);
      return [];
    }
  } catch (error) {
    const message = error.response.data?.message || error.message;
    toast.error(message);
    return message;
  }
});

const actionForgot = createAsyncThunk("auth/forgot", async (data) => {
  try {
    const res = await AuthService.doForgot(data);
    if (res.status === 200) {
      return res.data.data;
    } else {
      toast.error(res.data.message);
      return [];
    }
  } catch (error) {
    const message = error.response.data?.message || error.message;
    toast.error(message);
    return message;
  }
});

const actionResetPass = createAsyncThunk("auth/resetPass", async (data) => {
  try {
    const res = await AuthService.doResetPass(data);
    if (res.status === 200) {
      return res.data.data;
    } else {
      toast.error(res.data.message);
      return [];
    }
  } catch (error) {
    const message = error.response.data?.message || error.message;
    toast.error(message);
    return message;
  }
});

const actionVerifyMail = createAsyncThunk("auth/verifyMail", async (data) => {
  try {
    const res = await AuthService.doVerifyMail(data);
    if (res.status === 200) {
      return res.data.data;
    } else {
      toast.error(res.data.message);
      return [];
    }
  } catch (error) {
    const message = error.response.data?.message || error.message;
    toast.error(message);
    return message;
  }
});

const { reducer, actions } = createSlice({
  name: "auth",
  initialState: {
    register: {
      loading: false,
      data: [],
      error: "",
    },
    login: {
      loading: false,
      data: [],
      error: "",
    },
    forgot: {
      loading: false,
      data: [],
      error: "",
    },
    resetPass: {
      loading: false,
      data: [],
      error: "",
    },
    verifyMail: {
      loading: false,
      data: [],
      error: "",
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actionRegister.pending, (state) => {
        state.register.loading = true;
      })
      .addCase(actionRegister.rejected, (state, action) => {
        state.register.loading = false;
        state.register.error = action.payload;
        state.register.data = {};
      })
      .addCase(actionRegister.fulfilled, (state, action) => {
        state.register.loading = false;
        state.register.data = action.payload;
        state.register.error = "";
      })
      .addCase(actionLogin.pending, (state) => {
        state.login.loading = true;
      })
      .addCase(actionLogin.rejected, (state, action) => {
        state.login.loading = false;
        state.login.error = action.payload;
        state.login.data = {};
      })
      .addCase(actionLogin.fulfilled, (state, action) => {
        state.login.loading = false;
        state.login.data = action.payload;
        state.login.error = "";
      })
      .addCase(actionForgot.pending, (state) => {
        state.forgot.loading = true;
      })
      .addCase(actionForgot.rejected, (state, action) => {
        state.forgot.loading = false;
        state.forgot.error = action.payload;
        state.forgot.data = {};
      })
      .addCase(actionForgot.fulfilled, (state, action) => {
        state.forgot.loading = false;
        state.forgot.data = action.payload;
        state.forgot.error = "";
      })
      .addCase(actionResetPass.pending, (state) => {
        state.resetPass.loading = true;
      })
      .addCase(actionResetPass.rejected, (state, action) => {
        state.resetPass.loading = false;
        state.resetPass.error = action.payload;
        state.resetPass.data = {};
      })
      .addCase(actionResetPass.fulfilled, (state, action) => {
        state.resetPass.loading = false;
        state.resetPass.data = action.payload;
        state.resetPass.error = "";
      })
      .addCase(actionVerifyMail.pending, (state) => {
        state.verifyMail.loading = true;
      })
      .addCase(actionVerifyMail.rejected, (state, action) => {
        state.verifyMail.loading = false;
        state.verifyMail.error = action.payload;
        state.verifyMail.data = {};
      })
      .addCase(actionVerifyMail.fulfilled, (state, action) => {
        state.verifyMail.loading = false;
        state.verifyMail.data = action.payload;
        state.verifyMail.error = "";
      });
  },
});

export default reducer;

export {
  actionForgot,
  actionLogin,
  actionRegister,
  actionResetPass,
  actionVerifyMail,
};
