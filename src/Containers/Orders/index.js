import React, {useEffect, memo, useState} from "react";

import "./styles.css";
import HelmetComp from "../../Components/Helmet";
import Loading from '../../Components/Loading';

import Header from "../Header";
import Footer from "../Footer";

import {useGetCurrentUser} from '../../redux/selectors';

import {getOrders} from './services';

const Orders = (props) => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const handleGetOrders = async () => {
    try {
      setLoading(true);
      const res = await getOrders();
      const {data: {results}} = res;
      setOrders(results);
      setLoading(false);
    } catch(err) {
      setLoading(false);
      console.log(err);
    }
  }
  useEffect(() => {
    handleGetOrders();
  }, []);

  const renderProducts = (data) => {
    return data.map(item => {
      return (
        <div className="product-item" key={item.id}>
          <div className="product-name">{item.name}</div>
          <div className="product-price">{item.price}</div>
          <div className="amount">{item.amount}</div>
        </div>
      );
    });
  }

  const renderOrders = (data) => {
    return data.map(order => {
      const {items} = order;
      return (
        <div className="order-item" key={order.id}>
          <div className="order-id">{order.id}</div>
          <div className="order-amount">{order.amount}</div>
          <button type="button" className="order-actions">View</button>
        </div>
      )
    });
  }
  return (
    <>
      <Header />
      <div className="container main-container">
        <HelmetComp title={"Orders"} />
        
        <h3>Orders</h3>
        <div className="order-list">
          <div className="order-item">
            <div className="order-id">Order Id</div>
            <div className="order-amount">Total Amount</div>
            <div className="order-actions">Actions</div>
          </div>
          {renderOrders(orders)}
        </div>
        
      </div>
      <Footer />
      <Loading loading={loading} />
    </>
  );
}

export default memo(Orders);
