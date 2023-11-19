import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { CategoryService } from "./api/index";

const actionGetCategory = createAsyncThunk("category/list", async () => {
  try {
    const res = await CategoryService.getAllCategory();
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
  name: "category",
  initialState: {
    category: {
      loading: true,
      data: [],
      error: "",
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actionGetCategory.pending, (state) => {
        state.category.loading = true;
      })
      .addCase(actionGetCategory.rejected, (state, action) => {
        state.category.loading = false;
        state.category.error = action.payload;
        state.category.data = {};
      })
      .addCase(actionGetCategory.fulfilled, (state, action) => {
        state.category.loading = false;
        state.category.data = action.payload;
        state.category.error = "";
      });
  },
});

export default reducer;

export { actionGetCategory };
