import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { store } from './store';
import axios from 'axios';
import { ProductModel } from '../modules/products/models/ProductsModel';


export interface ProductState
{
    loading: boolean;
    products: ProductModel[];
    selectedProduct: ProductModel;
    error: string;
}

export let initialState: ProductState = {
    loading: false,
    products: [] as ProductModel[],
    selectedProduct: {} as ProductModel,
    error: ''
};

export const productSlice = createSlice( {
    name: 'product',
    initialState,
    extraReducers: ( builder ) =>
    {
        builder
            .addCase( getProductsThunk.pending, ( state, action ) =>
            {
                state.loading = true;
            } )
            .addCase( getProductsThunk.fulfilled, ( state, action ) =>
            {
                state.loading = false;
                state.products = action.payload;
            } )
            .addCase( getProductsThunk.rejected, ( state, action ) =>
            {
                console.error( 'Error', action.payload );
                state.loading = false;
                state.error = action.error.message!;
            } )
            //get single product
            .addCase( getSingleProductThunk.pending, ( state, action ) =>
            {
                state.loading = true;
            } )
            .addCase( getSingleProductThunk.fulfilled, ( state, action ) =>
            {
                state.loading = false;
                state.selectedProduct = action.payload.product;
            } )
            .addCase( getSingleProductThunk.rejected, ( state, action ) =>
            {
                console.error( 'Error', action.payload );
                state.loading = false;
                state.error = action.error.message!;
            } )
            //Create product
            .addCase( createProductThunk.pending, ( state, action ) =>
            {
                state.loading = true;
            } )
            .addCase( createProductThunk.fulfilled, ( state, action ) =>
            {
                state.loading = false;
                // state.products.push(action.payload);
                state.products = action.payload;
            } )
            .addCase( createProductThunk.rejected, ( state, action ) =>
            {
                console.error( action.payload );
                state.loading = false;
                state.error = action.error.message!;
            } )
            //Update product
            .addCase( updateProductThunk.pending, ( state, action ) =>
            {
                state.loading = true;
            } )
            .addCase( updateProductThunk.fulfilled, ( state, action ) =>
            {
                state.loading = false;
                state.selectedProduct = action.payload;
            } )
            .addCase( updateProductThunk.rejected, ( state, action ) =>
            {
                console.error( 'Error', action.payload );
                state.loading = false;
                state.error = action.error.message!;
            } )
            //Delete product
            .addCase( deleteProductThunk.pending, ( state, action ) =>
            {
                state.loading = true;
            } )
            .addCase( deleteProductThunk.fulfilled, ( state, action ) =>
            {
                state.loading = false;
                state.selectedProduct = action.payload.product;
            } )
            .addCase( deleteProductThunk.rejected, ( state, action ) =>
            {
                console.error( 'Error', action.payload );
                state.loading = false;
                state.error = action.error.message!;
            } );
    }, reducers: {
        updateProductState: ( state, action ) =>
        {
            const  { name, value } = action.payload;

            return {
                ...state,
                selectedProduct: {
                    ...state.selectedProduct,
                    [name]: value
                  }
            };
            
        }
    }
}  )

export const { updateProductState} = productSlice.actions
export default productSlice.reducer;

//Actions
// Get all the products
export const getProductsThunk = createAsyncThunk( 'product/getProducts', async () =>
{
    
    let dataURL: string = `${ process.env.REACT_APP_SERVER_URL }/api/products`;
    let response = await axios.get( dataURL );
    return response.data.products;
})

// Get single product
export const getSingleProductThunk = createAsyncThunk( 'product/getProduct', async (productId:string) =>
{
    let dataURL:string = `${process.env.REACT_APP_SERVER_URL}/api/products/${productId}`
    let response = await axios.get( dataURL );
    return response.data;
} )

//create a new product

export const createProductThunk = createAsyncThunk( 'product/createProduct', async({ product, navigate }: { product: ProductModel; navigate: any }) =>
{
    try
    {
        let dataURL: string = `${process.env.REACT_APP_SERVER_URL}/api/products`;
        let response = await axios.post( dataURL, product );//second parameter is sending the form data
        navigate( '/products/admin' )
        return response.data;
    }
    catch ( e )
    {
        //return rejectWithValue( e );
        console.error("error", e );
    }
    
})
 

// Update product
export const updateProductThunk = createAsyncThunk( 'product/updateProduct', async ( { product, productId, navigate }: { product: ProductModel; productId:string; navigate: any } ) =>
{                  
    try{
        
        let dataURL: string = `${ process.env.REACT_APP_SERVER_URL }/api/products/${ productId }`;
        let response = await axios.put( dataURL, product );//second parameter is sending the form data
        navigate( '/products/admin' )
        return response.data;
    }
    catch(e)
    {
    console.error("Error ", e)
    }
})

// Delete product
export const deleteProductThunk = createAsyncThunk( 'product/deleteProduct', async (productId:string) =>
{
    let dataURL:string =`${process.env.REACT_APP_SERVER_URL}/api/products/${productId}`;
    let response = await axios.delete( dataURL );
    return response.data;
    
}
)



