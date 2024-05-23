import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as productActions from '../../../../redux/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';
import Spinner from '../../../layout/spinner/spinner';
import { error } from 'console';

interface IProps{ }
interface IState
{
  bigBasket: productActions.ProductState;
}

const ProductAdmin: React.FC<IProps> = ( { } ) =>
{
  const dispatch = useDispatch<AppDispatch>()
  
  useEffect( () =>
  {
    dispatch(productActions.getProductsThunk())
  }, [] )

  const clickDeleteProduct = (productId: string) => {
    dispatch(productActions.deleteProductThunk(productId))
      .then((resultAction) => {
        if (resultAction.type === 'product/deleteProduct/fulfilled') {
          dispatch(productActions.getProductsThunk());
        } else {
          console.error('Error deleting product:', resultAction.payload);
        }
      });
  };
  //fetchdata  from store
  let productState: productActions.ProductState = useSelector( ( state: IState ) => state.bigBasket )
  
  let {products,error,loading} = productState

  return (
      <React.Fragment>
      <section className=' mt-3'>
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-success">Products Admin</p>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque unde voluptate harum error culpa tenetur? Fugit, doloribus qui! Facere, voluptatem!</p>
              <Link className="btn btn-success btn-sm" to='/products/create'>Create Product</Link>
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
            <div className="col">
              <table className='table text-center table-hover table-striped table-hover'>
                <thead className='bg-dark  text-white'>
                <tr>
                    <th>ID</th>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                  {
                    products.length > 0 && products.map( (product) =>
                    {
                      return ( 
                        <React.Fragment>
                          <tr key={product._id}>
                            <td>{ product._id?.substring( product._id?.length - 4 ) }</td> 
                            <td><img src={ product.image} width="50" height="50" alt="" /></td>
                            <td>{ product.name }</td>
                            <td>{ product.price }</td>
                            <td>{ product.qty }</td>
                            <td>
                            <Link to={ `/products/${ product._id }` } ><button className="btn btn-success btn-sm btn-rounded d-inline btn-space"><i className="fa fa-edit"></i></button></Link>
                            <button className="btn btn-danger btn-sm btn-rounded d-inline btn-space" onClick={()=>product._id &&  clickDeleteProduct( product._id)}><i className="fa fa-trash"></i></button>
                            </td>                                
                        </tr>
                      </React.Fragment>  
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
          </React.Fragment>
      }
    </React.Fragment>
  )
}

export default ProductAdmin