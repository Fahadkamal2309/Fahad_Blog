import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import Login from './components/account/Login';
import DataProvider from './components/context/DataProvider';
import Home from './components/home/Home';
import Header from './components/header/Header';
import CreatePost from './components/create/CreatePost';
import DetailView from './components/details/DetailView';
import Update from './components/create/Update';
import About from './components/about/About';
import Contact from './components/contact/Contact';

const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>

        <Routes>

          <Route path="/login" element={<Login isUserAuthenticated={isUserAuthenticated} />} />

          <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="create" element={<CreatePost />} />
            <Route path="details/:id" element={<DetailView />} />
            <Route path="update/:id" element={<Update />} />
          </Route>

        </Routes>

      </BrowserRouter>
    </DataProvider>
  );
}

export default App;