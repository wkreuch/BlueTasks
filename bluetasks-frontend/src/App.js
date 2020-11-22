import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import NavBar from './components/NavBar';
import TaskForm from './components/TaskForm';
import TaskListTable from './components/TaskListTable';


class App extends Component {
  
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)

    this.onRefreshHandler = this.onRefreshHandler.bind(this);
  }

  onRefreshHandler() {
    this.forceUpdate();
  }

  on
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar onLinkClick={ this.onRefreshHandler }/>
          <div className="container" style={{ marginTop: 20}}>
          <Switch>
            <Route exact path="/form" component={TaskForm}/>
            <Route exact path="/form/:id" component={TaskForm}/>
            <Route exact path="/login" render={() => <Login onLoginSucess={this.onRefreshHandler} />}/>
            <Route path="/" component={TaskListTable}/>
          </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
