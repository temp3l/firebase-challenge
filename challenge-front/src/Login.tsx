import React, { useState } from 'react';
import fire from './Fire';

function Login() {
  const [email, setEmail] = useState('coding-challenge@construyo.de');
  const [password, setPassword] = useState('coding-challenge@construyo.de');
  const onSubmit = (e: any) => {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(email, password).catch(console.error);
  }
  return (
    <div className="Login">
      <h1>Login Page</h1>
      <div>
        <form onSubmit={onSubmit}>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="submit"/>
        </form>
      </div>
      <br />
      <pre>{JSON.stringify({ email, password }, null, 2)}</pre>
    </div>
  );
}

export default Login;
