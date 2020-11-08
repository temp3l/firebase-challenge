import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Order } from './types/Orders'
import fire from './Fire';
/*
  TODO: move logic to an 'utils' file (re-usable methods)
  TODO: error handling
*/

const Details = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order>();

  const fetchDoc = async () => {
    const userRef = fire.firestore().collection('orders').doc(orderId);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
      const { title, bookingDate, address, customer } = doc.data() || {}; // TODO
      setOrder({ id: doc.id, title, bookingDate, address, customer });
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!order || !order.id) return alert('no order!'); // lazy

    const { id, bookingDate, title } = order;
    const putMethod = {
      method: 'PUT',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ title, bookingDate })
    };

    fetch(`/orders/${id}`, putMethod)
      .then(response => response.json())
      .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
      .catch(err => console.log(err)) // Do something with the error
  };

  useEffect(() => {
    fetchDoc();
  }, []);

  if (!order) return <p>loading ...</p>;

  return (
    <div className="container">
      <h3>Details for Order: {order?.id}</h3>
      {order && <div>
        <form onSubmit={onSubmit}>
          <input type="text" value={order?.title} onChange={(e) => setOrder({ ...order, title: e.target.value })} />
          <br />
          <input type="text" value={order?.bookingDate} onChange={(e) => setOrder({ ...order, bookingDate: Number(e.target.value) })} />
          <input type="submit" />
        </form>
      </div>
      }
    </div>
  )
}
export default Details;
