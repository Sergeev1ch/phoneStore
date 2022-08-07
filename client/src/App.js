import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import AddItem from './pages/AddItem';
import OrdersList from './pages/OrdersList';

const App = observer(() => (
  <BrowserRouter>
    <Routes>
      <Route key="/" path="/" element={<Shop />} exact />
      <Route key="/cart" path="/cart" element={<Cart />} exact />
      <Route key="/addItem" path="/addItem" element={<AddItem />} exact />
      <Route key="/ordersList" path="/ordersList" element={<OrdersList />} exact />
      <Route key="*" path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
));

export default App;