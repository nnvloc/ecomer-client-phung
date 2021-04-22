import React, {memo, useEffect, useState} from "react";
import {useHistory} from 'react-router-dom';
import "./styles.css";
import HelmetComp from "../../Components/Helmet";
import AdminLeftMenu from '../AdminLeftMenu';
import Footer from "../Footer";
import {getProducts} from './services';

const Products = (props) => {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const handleGetProducts = async () => {
    try {
      const res = await getProducts();
      const {data: {results}} = res;
      setProducts(results);
    } catch(err) {
      console.log(err);
    }
  }
  useEffect(() => {
    handleGetProducts();
  }, []);

  const editProduct = (id) => {
    history.push(`/admin/products/${id}`)
  }

  const renderProducts = (data) => {
    return data.map(item => {
      return (
        <div className="product-item" key={item.id}>
          <div className="product-name">{item.name}</div>
          <div className="product-price">{item.price}</div>
          <div className="product-status">{item.isRemoved ? 'removed' : 'active'}</div>
          <div className="product-actions">
            <button type="button" onClick={() => editProduct(item.id)}>Edit</button>
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <div className="admin-container">
        <AdminLeftMenu />
        <div className="container main-container">
          <HelmetComp title={"Admin Products"} />
          
          <h3>Products</h3>

          <div className="product-list">
            <div className="product-item">
              <div className="product-name">Name</div>
              <div className="product-price">|Price</div>
              <div className="product-status">|Status</div>
              <div className="product-actions">|Actions</div>
            </div>
            {renderProducts(products)}
          </div>
          
        </div>
      </div>
      
      <Footer />
    </>
  );
}

export default memo(Products);
