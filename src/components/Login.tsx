import React, { useRef, useState, useEffect, ChangeEvent, SyntheticEvent } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';

const LOGIN_URL = '/auth';

interface LocationState {
  from: {
    pathname: string;
  };
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LocationState)?.from?.pathname || "/";

  const { setAuth, persist, setPersist } = useAuth();
  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLParagraphElement | null>(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, password })
      );
      setUsername('');
      setPassword('');
      setAuth({
        username,
        password,
        accessToken: response?.data?.accessToken,
        roles: response?.data?.roles
      });
      navigate(from, { replace: true });
    } catch (error: any) {
      if (!error?.response) {
        setErrMsg('No Server Response');
      } else if (error.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (error.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef?.current?.focus();
    }
  };

  const togglePersist = (): void => {
    setPersist(!persist);
  };

  useEffect(() => {
    localStorage.setItem('persist', JSON.stringify(persist));
  }, [persist]);

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live='assertive'
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete='off'
          onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          value={username}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          value={password}
          required
        />

        <button>Sign In</button>
        <div className="persistCheck">
          <input
            type="checkbox"
            id="persist"
            onChange={togglePersist}
            checked={persist}
          />
          <label htmlFor="persist">Trust this Device</label>
        </div>
      </form>
      <p>
        Need an Account?<br />
        <span className="line">
          <Link to="/register">Sign Up</Link>
        </span>
      </p>
    </section>
  );
};

export default Login;
