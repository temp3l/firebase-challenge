import React from 'react';
import firebase from "firebase";


const Dashboard = ({ user, doc }: { user: firebase.User, doc: any }) => (
  <div className="container">
    <h3>Dashboard</h3>
    <p>uid: {user.uid}</p>
    <p>phone: {doc.phone}</p>
  </div>
)
export default Dashboard;
