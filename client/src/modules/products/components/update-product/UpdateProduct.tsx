import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useParams} from 'react-router-dom';
import { AppDispatch } from '../../../../redux/store';
//import { getSingleProductThunk,updateProductState } from './../../../../redux/productsSlice';
import * as productActions from '../../../../redux/productsSlice';
import { useNavigate } from 'react-router';

interface IProps{ }
interface IState
{
  bigBasket: productActions.ProductState;
}

type URLParams=
{
    productId: string;
}
const UpdateProduct: React.FC<IProps> = ( { } ) =>
{
  let dispatch = useDispatch<AppDispatch>();
  const { productId } = useParams<URLParams>();
  const navigate = useNavigate()


  let productState: productActions.ProductState = useSelector( ( store: IState ) => store.bigBasket )

  let { error, loading, selectedProduct } = productState;
  
  useEffect( () =>
    {
      dispatch( productActions.getSingleProductThunk( productId as string) );
    }, [productId] )
    
 
//get data from  redux store
        
  let updateInput = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  {
    dispatch( productActions.updateProductState( {
      name: event.target.name,
      value:event.target.value
    } ) );
  }
  
  

  let updateImage = async (event:React.ChangeEvent<HTMLInputElement | any>) => {
    let imageFile:Blob = event.target.files[0];
    let base64Image:string | ArrayBuffer = await convertBase64String(imageFile);
    // dispatch( productActions.updateProductState( {"image" :base64Image}   ))
    dispatch( productActions.updateProductState( 
      {name: "image", value:base64Image }
     ) );
};

let convertBase64String = (imageFile:Blob):Promise<string | ArrayBuffer> => {
    return new Promise((resolve, reject) => {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(imageFile);
        fileReader.addEventListener('load', () => {
            if(fileReader.result){
                resolve(fileReader.result);
            }
            else {
                reject('Error Occurred');
            }
        })
    });
  };
  
  let submitUpdateProduct = ( event: React.FormEvent<HTMLFormElement> ) =>
  {
    event.preventDefault();
    dispatch( productActions.updateProductThunk( { product: selectedProduct, productId: productId as string, navigate } ) );
  }
  return (
    <React.Fragment>
      {/* { <pre>{ JSON.stringify( selectedProduct ) }</pre> } */}
      <section className='mt-3'>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-header bg-secondary bg-white">
                  <p className="h4 text-white">Update Product</p>
                </div>
                <div className="card-body rgba-green-light">
                  <form onSubmit={submitUpdateProduct}>
                    <div className="mb-3">
                    <input
                      required
                      name="name"
                        value={selectedProduct.name}
                        onChange={updateInput}
                        // { ( e ) => setNameUpdate( e.target.value ) }
                      type="text" className="form-control" placeholder="Name"/>
                    </div>
                    <div className="mb-3">
                      <input
                          onChange={updateImage}
                          className="form-control" type="file" id="formFile"/>
                      {
                          selectedProduct.image &&
                          <img src={selectedProduct.image} alt="" width="25" height="25"/>
                      }
                  </div>
                    <div className="mb-3">
                      <input required type="number"
                        name="price"
                        value={selectedProduct.price} 
                        onChange={ updateInput }
                       className='form-control' placeholder="Price"/>
                      </div>
                    <div className="mb-3">
                      <input required type="number"
                        name="qty"
                        value={selectedProduct.qty}
                        onChange={ updateInput }
                        className='form-control' placeholder='Available Quantity'/>
                    </div>
                    <div className="mb-3">
                      <textarea required name="info"
                        value={selectedProduct.info} 
                        onChange={ updateInput }
                      rows={ 3 } className='form-control' placeholder="General Info" />
                    </div>
                    <div className="" >
                    <input type="submit" className="btn btn-secondary btn-sm" value="Update"/>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default UpdateProduct




