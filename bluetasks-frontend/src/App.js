import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import NavBar from './components/NavBar';
import TaskForm from './components/TaskForm';
import TaskListTable from './components/TaskListTable';


class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <div className="container" style={{ marginTop: 20}}>
          <Switch>
            <Route exact path="/form" component={TaskForm}/>
            <Route exact path="/form/:id" component={TaskForm}/>
            <Route exact path="/login" component={Login}/>
            <Route path="/" component={TaskListTable}/>
          </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
