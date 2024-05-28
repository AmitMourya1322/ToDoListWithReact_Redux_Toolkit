import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux';
import store from './store';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';

import ItemList from './components/ItemList';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Router>
         <Header/>
            <main>
                <Routes>
                    <Route path="/" element={<ItemList />} />
                    <Route 
                        path="/login" 
                        element={
                            <PrivateRoute>
                                <Login />
                            </PrivateRoute>
                        } 
                    />
                    <Route 
                        path="/register" 
                        element={
                            <PrivateRoute>
                                <Register />
                            </PrivateRoute>
                        } 
                    />
                </Routes>
            </main>
        </Router>
    </Provider>
);

reportWebVitals();
