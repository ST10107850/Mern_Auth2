export interface AuthState {
  isAuthenticated: boolean;
  userInfo: {
    _id: string;
    name: string;
    surname: string;
    email: string;
  } | null;
  token: string | null;
}

export interface RootState {
  auth: AuthState;
  // other slices of state
}

// types.ts (or within productApiSlice.ts if you prefer)
export interface Product {
  _id: string;
  productName: string;
  productPrice: number;
  productDescription: string;
  productImage: string;
  productColor: string;
}

