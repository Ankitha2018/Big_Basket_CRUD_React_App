import React, { FormEvent, useState } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector ,TypedUseSelectorHook} from 'react-redux'
import type { RootState, AppDispatch,store } from '../../../../redux/store';
import { ProductModel } from '../../models/ProductsModel'
import {createProductThunk } from '../../../../redux/productsSlice'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


interface IProps{ }
interface IState
{
  product:ProductModel
}

const CreateProduct: React.FC<IProps> = ( { } ) =>
{
  const productState = useAppSelector( state => state.bigBasket.products )
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  
  const [state, setState] = useState<IState>( {
    product:{} as ProductModel
  })

  let updateInput = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  {
    setState(
      {
        product: {
          ...state.product,
          [event.target.name]: event.target.value
        }
      }
    )
  }
  let updateImage = async (event:React.ChangeEvent<HTMLInputElement | any>) => {
    let imageFile:Blob = event.target.files[0];
    let base64Image:string | ArrayBuffer = await convertBase64String(imageFile);
    setState({
        product : {
            ...state.product,
            image : base64Image.toString()
        }
    });
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
  
  const submitCreateProduct =(event:FormEvent<HTMLFormElement>) =>
  {
    event.preventDefault();//to stop page from refresh
    dispatch(createProductThunk({product: state.product, navigate}));
    
   }
  return (
    <React.Fragment>
    {/* <pre>{JSON.stringify(state.product)}</pre> */}
      
          <section className=' mt-3'>
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-success">Create New</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur eos exercitationem harum id illum in, ipsa maiores minus, mollitia nisi pariatur, perspiciatis quos repellat sapiente soluta tempore voluptas. Nihil, placeat.</p>
            </div>
          </div>
        </div>
      </section>
      <section className='mt-3'>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-header bg-success bg-white">
                  <p className="h4">Create Product</p>
                </div>
                <div className="card-body rgba-green-light">
                  <form onSubmit={submitCreateProduct}>
                    <div className="mb-3">
                      <input required type="text"
                        name="name"
                        value={ state.product.name }
                        onChange={ updateInput}  className='form-control' placeholder='Product Name' />
                    </div>
                    <div className="mb-3">
                      <input type="file"
                        required
                        onChange={ updateImage } className="form-control" id="formFile" />
                      {
                        state.product.image &&
                        <img src={state.product.image}  alt="" width="25" height="25"/>
                      }
                    </div>
                    <div className="mb-3">
                      <input required type="number"
                        name="price"
                        value={ state.product.price }
                        onChange={ updateInput} className='form-control' placeholder='Price' />
                      </div>
                    <div className="mb-3">
                      <input required type="number"
                        name="qty"
                        value={ state.product.qty }
                        onChange={ updateInput} className='form-control' placeholder='Available Quantity' />
                    </div>
                    <div className="mb-3">
                      <textarea required name="info"
                        value={ state.product.info }
                        onChange={ updateInput }
                        rows={ 3 } className='form-control' placeholder='General Info' />
                    </div>
                    <div className="" >
                    <input type="submit" className="btn btn-success btn-sm" value="Create"/>
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

export default CreateProduct