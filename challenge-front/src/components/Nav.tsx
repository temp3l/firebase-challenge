import React from 'react';
import { Link } from "react-router-dom";
import fire from '../Fire';

export default () => (
  <ul className="nav justify-content-center">
    <li className="nav-item">
      <Link to="/" className="nav-link active">Home</Link>
    </li>
    <li className="nav-item">
      <Link to="/orders" className="nav-link active">Orders</Link>
    </li>
    <li className="nav-item">
      <button className="btn btn-outline-danger btn-sm" onClick={() => fire.auth().signOut()}>logout</button>
    </li>
  </ul>
)
