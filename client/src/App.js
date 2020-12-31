import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LandingPage from '../src/components/views/LandingPage/LandingPage';
import LoginPage from '../src/components/views/LoginPage/LoginPage';
import RegisterPage from '../src/components/views/RegisterPage/RegisterPage';
import NavBar from '../src/components/views/NavBar/NavBar';
import Footer from '../src/components/views/Footer/Footer';
import Auth from './hoc/Auth';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route
              exact
              path="/register"
              component={Auth(RegisterPage, false)}
            />
            <Route exact path="/navbar" component={NavBar} />
            <Route exact path="/footer" component={Footer} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
