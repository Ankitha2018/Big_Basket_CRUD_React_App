import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import Navbar from './modules/layout/navbar/navbar';
import Home from './modules/layout/home/Home';
import ProductList from './modules/products/components/product-list/ProductList';
import ProductAdmin from './modules/products/components/product-admin/ProductAdmin';
import CreateProduct from './modules/products/components/create-product/CreateProduct';
import UpdateProduct from './modules/products/components/update-product/UpdateProduct';

interface IProps{}

let App:React.FC<IProps>= () => {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route  path='/' element={<Home/>}/>
          <Route  path='/products/list' element= {<ProductList />} />  
          <Route  path='/products/admin' element= {<ProductAdmin />} />
          <Route  path='/products/create' element= {<CreateProduct />} />
          <Route  path='/products/:productId' element= {<UpdateProduct />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
