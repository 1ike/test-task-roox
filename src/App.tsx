import React from 'react';
import { Provider } from 'react-redux';

import { store } from './services/store';
import Layout from './components/Layout';
import Home from './pages/Home';


function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Home />
      </Layout>
    </Provider>
  );
}

export default App;
