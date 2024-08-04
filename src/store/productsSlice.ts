import {Product} from "../products/models/Product.ts";
import {createAsyncThunk, createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {createFetchProductRepository} from "../lib/Product/infrastructure/FetchProductRepository.ts";
import {createProductService} from "../lib/Product/application/ProductService.ts";

export interface ProductsState {
    products: Product[];
    productById: Product | null;
    loading: boolean;
    error: string | null;
}

export const initialState: ProductsState = {
    products: [],
    productById: null,
    loading: false,
    error: null
};

const repository = createFetchProductRepository();
const service = createProductService(repository);

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    return await service.getAll();
});


const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        findProductById(state: Draft<ProductsState>, action: PayloadAction<number>) {
            console.log(state.products);
            console.log("findProductById", state.products.find(product => product.productId === action.payload));
           state.productById = state.products.find(product => product.productId === action.payload) || null;
        },
        resetAndSetProducts(state: Draft<ProductsState>, action: PayloadAction<Product[]>) {
            state.products = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchProducts.pending, (state: Draft<ProductsState>) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state: Draft<ProductsState>, action: PayloadAction<Product[]>) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state: Draft<ProductsState>, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred.';
            });
    }
});

export const { findProductById, resetAndSetProducts } = productsSlice.actions;
export default productsSlice.reducer;