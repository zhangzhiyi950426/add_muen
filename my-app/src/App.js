import React, { Component } from 'react';
import RouterView from './router/MapRouter';
import route from './router/router-config';
import { BrowserRouter } from 'react-router-dom';
  import { Provider } from 'react-redux';
  import store from './store';
import './App.scss'
class App extends Component {
  render() {
    return (
      <>
        <Provider store={store}>
        <BrowserRouter>
          <RouterView route={route} >
          </RouterView>
        </BrowserRouter>
        </Provider>
      </>
    );
  }
}

export default App;
