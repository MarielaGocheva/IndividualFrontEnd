import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
<<<<<<< HEAD
import { AuthProvider } from './providers/AuthProvider';
=======
>>>>>>> 853325d4435a0915e0e5eaecc25e6a655a03ebf6

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
<<<<<<< HEAD
    <AuthProvider>
    <App />
    </AuthProvider>
=======
    <App />
>>>>>>> 853325d4435a0915e0e5eaecc25e6a655a03ebf6
    </BrowserRouter>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
