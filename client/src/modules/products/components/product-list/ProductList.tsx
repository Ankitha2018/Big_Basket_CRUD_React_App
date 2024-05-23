import React, { useEffect, useState } from 'react'
import * as productActions from '../../../../redux/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';
import Spinner from '../../../layout/spinner/spinner';


interface IProps{ }
interface IState
{
  bigBasket:productActions.ProductState
}
const ProductList: React.FC<IProps> = ( { } ) =>
{
  let dispatch = useDispatch<AppDispatch>()
  //fetch data from redux store
  let productState:productActions.ProductState= useSelector( (state:IState) => state.bigBasket )

  let { loading, products, selectedProduct, error } = productState;

  useEffect( () =>
  {
    dispatch(productActions.getProductsThunk())
  } ,[])
  
  return (
    <React.Fragment>
      {/* <pre>{ JSON.stringify(products)}</pre> */}
      <section className=' mt-3'>
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-success">Products List</p>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque unde voluptate harum error culpa tenetur? Fugit, doloribus qui! Facere, voluptatem!</p>
            </div>
          </div>
        </div>
      </section>
      {
        loading ? <Spinner /> : 
    <React.Fragment>
      <section className='mt-3'>
        <div className="container">
          <div className="row">
           
              {
                      products.length > 0 &&
                      products.map( (product) =>
                      {
                        return (
                        <div className="col-md-3" key={product._id}>
                          <div className="card mt-3">
                            <div className="card-header text-center bg-white">
                              <img src={product.image}  alt="" width="150" height="150"/>
                            </div>
                            <div className="card-body">
                              <ul className="list-group">
                                <li className='list-group-item'>Name: {product.name}</li>
                                <li className='list-group-item'>Price: ${product.price.toFixed(2)}</li>
                                <li className='list-group-item'>Quantity: {product.qty} Kgs</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        )
                      })  
              }
          </div>
        </div>
      </section>
    </React.Fragment>
     }
    </React.Fragment>
  )
}

export default ProductList