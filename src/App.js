import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import UserDetail from './components/UserDetail';
import Admin from './components/Admin';

function App() {
  return (
    <div className="app">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/auth/login" component={Login} />
          <Route path="/auth/register" component={Register} />
          <Route path="/user" component={UserDetail} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
