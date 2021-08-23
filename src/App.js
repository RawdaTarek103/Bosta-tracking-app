import './App.css';
import Routes from './Routes';
import {BrowserRouter as  Router } from 'react-router-dom';
import { createBrowserHistory } from "history";
import  i18n  from 'i18next';
const history = createBrowserHistory();

document.body.dir = i18n.dir()

function App() {
  return (
      <Router history={history} >
        <Routes/>
      </Router>
  );
}

export default App;
