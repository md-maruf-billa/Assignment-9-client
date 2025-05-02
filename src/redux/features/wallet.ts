import { createSlice } from "@reduxjs/toolkit";

const WalletClice = createSlice({
  name: "wallet",
  initialState: {
    wallet: null,
    loading: false,
    error: null,
  },
  reducers: {
    setWallet: (state, action) => {
      state.wallet = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setWallet, setLoading, setError } = WalletClice.actions;
export default WalletClice.reducer;
