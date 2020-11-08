import React, { useState, useEffect, } from 'react';
import { useHistory } from "react-router-dom";
import { Order } from './types/Orders'
import fire from './Fire';


const Orders = () => {
  const history = useHistory();
  const [orders, setOrders] = useState<Order[]>();
  const fetchOrders = async () => {
    const citiesRef = fire.firestore().collection('orders');
    const snapshot = await citiesRef.get();
    const data: any = [];
    snapshot.forEach(doc => {
      if(doc.id) data.push({ id: doc.id, ...doc.data() });
      // console.log(doc.id, '=>', doc.data());
    });
    setOrders(data);
  }
  useEffect(() => {
    fetchOrders();
  }, [])

  const formatDate = (seconds: number) => {
    const date = new Date(seconds * 1000)
    return `${date.getDate()}.${(date.getMonth() + 1)}.${date.getFullYear()}`
  }

  return (
    <div className="Orders container">
      <h3>Orders</h3>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Title</th>
            <th>Booking Date</th>
            <th>Address</th>
            <th>Customer</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map(({ id, title, bookingDate, address, customer }) => (
            <tr key={id} onClick={() => history.push(`/orders/${id}`)}>
              <td><b>{title}</b></td>
              <td><i>{formatDate(bookingDate)}</i></td>
              <td><i>{address?.street}</i></td>
              <td><i>{customer?.name}</i></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
