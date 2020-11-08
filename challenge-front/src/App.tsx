import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import firebase from "firebase";
import fire from './Fire';
import Login from './Login';
import Dashboard from './Dashboard';
import Orders from './Orders';
import Details from './Details';
import Nav from './components/Nav';

type Doc = {
  email: string;
  name: string;
  phone: string;
  uid: string;
}
/*
  TODO: move logic to an 'utils' file (re-usable methods)
  TODO: error handling
*/
const App = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [doc, setDoc] = useState<any>(null);

  const authListener = () => {
    fire.auth().onAuthStateChanged((user: firebase.User | null) => {
      if (user) {
        setUser(user)
        localStorage.setItem('user', user.uid);
        console.log('logged in', user);
        fetchDoc(user.uid);
      } else {
        console.log('logged out');
        setUser(null);
        localStorage.removeItem('user');
      }
    });
  }

  const fetchDoc = async (uid: string) => {
    const userRef = fire.firestore().collection('users').doc(uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
      setDoc(doc.data())
    }
  }

  useEffect(() => {
    authListener();
  }, [])

  if (!user) return <Login />; // simple, yet effective
  // in production we would use authenticated routes + roles

  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact>
            {user && doc ? <Dashboard user={user} doc={doc} /> : <p>loading...</p>}
          </Route>
          <Route path="/orders" exact>
            <Orders />
          </Route>
          <Route path="/orders/:orderId" children={<Details />} />
        </Switch>
      </div>
    </Router>
  );
}


export default App;
