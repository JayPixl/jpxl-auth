import './App.css';
import { useState, useEffect } from 'react';

import Header from './components/Header';
import Form from './components/Form';
import Footer from './components/Footer';
import Bar from './components/Bar';
import LoggedIn from './components/LoggedIn';
import Loading from './components/Loading'

import Cookie from 'universal-cookie';
const cookies = new Cookie();

const API_BASE = 'https://jpxl-auth-api.onrender.com';

function App() {
  const [inputVal, setInputVal] = useState({});
  const [user, setUser] = useState({});
  //Pages: 1 Sign Up page, 2 Log In page, 3 Logged in page
  const [page, setPage] = useState(1);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = cookies.get('token');
    if (token) {
      auth(token, data => {
        setUser(data);
        setPage(3);
      });
    }
    setLoading(e => false);
  }, []);

  const auth = async (token, callback) => {
    console.log(`ACCESS TOKEN (PASSED): ${token}`);
    const data = await fetch(API_BASE + "/users/auth/", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token
      }
    })
      .then(res => res.json())
      .catch(err => console.log(err))

    if (data.err) {
      console.log(data.err);
    } else {
      callback(data);
    }
    // console.log(`USERNAME: ${user.username}`);
    // console.log(`ACCESS TOKEN (VAR): ${accessToken}`);
  }

  const handleChange = (e) => {
    setInputVal({ ...inputVal, [e.target.id]: e.target.value});
  }

  const logOut = () => {
    cookies.remove('token');
    setUser({});
    setPage(1);
  }

  const deleteUser = async () => {
    setLoading(e => true);
    setInputVal({...inputVal, ['popupPassword']: ''})
    auth(cookies.get('token'), async () => {
      const data = await fetch(API_BASE + "/users/delete/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: user.username,
          password: inputVal.popupPassword
        })
      })
        .then(res => res.json())
        .catch(err => console.log(err))

      if (data.err) {
        console.log(data.err);
      } else {
        console.log(data);
        logOut();
      }
    })
    setLoading(e => false);
  }

  const submit = async (e) => {
    // Validation
    setErrors(e => []);
    setLoading(e => true);
    if (page===1) {
      const data = await fetch(API_BASE + "/users/new/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: inputVal.username,
          password: inputVal.password
        })
      })
        .then(res => res.json())
        .catch(err => console.log(err))

      if (data.err) {
        console.log(data.err);
        setErrors(e => [...e, data.err]);
      } else {
        cookies.set('token', data.accessToken);
        auth(data.accessToken, data => {
          setUser(data);
          setPage(3);
        });
      }
    } else {
      const data = await fetch(API_BASE + "/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: inputVal.username,
          password: inputVal.password
        })
      })
        .then(res => res.json())
        .catch(err => console.log(err))
      console.log(inputVal)
      if (data.err) {
        console.log(data.err);
        setErrors([...errors, data.err]);
      } else {
        cookies.set('token', data.accessToken);
        console.log(user);
        auth(data.accessToken, data => {
          setUser(data);
          setPage(3);
        });
      }
    }
    setLoading(e => false);
  }

  if (page===1) {
    return (
      <div className="App">
        <Bar page={page} setPage={setPage} logOut={logOut} />
        <Header text="Sign Up" />
        <Form page="1" inputVal={inputVal} handleChange={handleChange} submit={submit} errors={errors} />
        {loading ? <Loading /> : '' }
      </div>
    )
  } else if (page===2) {
    return (
      <div className="App">
        <Bar page={page} setPage={setPage} logOut={logOut} />
        <Header text="Log In" />
        <Form page="2" inputVal={inputVal} handleChange={handleChange} submit={submit} errors={errors} />
        {loading ? <Loading /> : '' }
      </div>
    )
  } else if (page===3) {
    return (
      <div className="App">
        <Bar page={page} setPage={setPage} logOut={logOut} />
        <Header text={`Welcome, ${user.username}!`} />
        <Footer user={user} />
        <LoggedIn deleteUser={deleteUser} inputVal={inputVal} handleChange={handleChange} />
        {loading ? <Loading /> : '' }
      </div>
    )
  } else {
    return (
      <div className="App">
        <Header text="Page Not Found" />
      </div>
    )
  }
}

export default App;
