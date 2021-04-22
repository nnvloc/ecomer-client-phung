import React, {useEffect, memo, useState} from "react";
import {useHistory} from 'react-router-dom';

import "./styles.css";
import HelmetComp from "../../Components/Helmet";
import Loading from '../../Components/Loading';

import Header from "../Header";
import Footer from "../Footer";

import {useGetCurrentUser} from '../../redux/selectors';

import {getProducts, createOrder} from './services';

const Home = (props) => {
  const user = useGetCurrentUser();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [products, setProducts] = useState([]);

  const handleGetProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      const {data: {results}} = res;
      setProducts(results);
      setLoading(false);
    } catch(err) {
      setLoading(false);
      console.log(err);
    }
  }
  useEffect(() => {
    handleGetProducts();
  }, []);

  const buyProduct = async (id) => {
    if (!user) {
      history.push('/login');
      return;
    }
    setLoading(true);
    try {
      const item = products.find((data) => data.id === id);
      if (!item) {
        return;
      }
      const params = {
        items: [item]
      }
      const res = await createOrder(params);
      const {data: {success}} = res;
      setLoading(false);
      if (success) {
        alert('Order created!');
      }
    } catch(err) {
      const {response} = err;
      const {data: {success, error_message}} = response || {data: {}};
      setLoading(false);
      alert(error_message);
    }
  }

  const renderProducts = (data) => {
    return data.map(item => {
      return (
        <div className="product-item" key={item.id}>
          <div className="product-name">{item.name}</div>
          <div className="product-price">{item.price}</div>
          <div className="product-actions">
            <button type="button" onClick={() => buyProduct(item.id)}>Buy</button>
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <Header />
      <div className="container main-container">
        <HelmetComp title={"Home"} />
        
        <h3>Products</h3>
        <div className="product-list">
          <div className="product-item">
            <div className="product-name">Name</div>
            <div className="product-price">|Price</div>
            <div className="product-actions">|Actions</div>
          </div>
          {renderProducts(products)}
        </div>
      </div>
      <Footer />
      <Loading loading={loading} />
    </>
  );
}

export default memo(Home);
