import 'antd/dist/antd.css';
import React from 'react';
import { useUserContext } from "./context/UserContext";
import { Layout, Menu } from 'antd';
import { Link, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Customers from './pages/Customers';
import AddCustomers from './pages/AddCustomers';
import Update from "./pages/Update";
import Detail from './pages/Detail';

const { Header, Content, Footer } = Layout;


function App() {

  const { isLogin ,userInfo} = useUserContext();

  const menu_items = [
    { label: <Link to='/customers'>Customers</Link>, key: '2' },
    { label: <Link to='/addcustomers'>Add Custumers</Link>, key: '3' },
    { label: <Link to='/login'>Login</Link>, key: '4' },

  ];

  if (!isLogin) {
    return <Login />;
  }


  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={menu_items}
        />

      </Header>

      <Content
        style={{
          padding: '20px 50px',
        }}
      >

        <div className="site-layout-content">

          <Routes>
            <Route path='/' element={<Customers />} ></Route>
            <Route path='customers' element={<Customers />} ></Route>
            <Route path='customers/update' element={<Update />}>
              <Route path=":id" element={<Update />} />
            </Route>
            <Route path='customers/detail' element={<Detail />}>
              <Route path=":id" element={<Detail />} />
            </Route>
            <Route path='addcustomers' element={<AddCustomers />} ></Route>
            <Route path='login' element={<Login />} ></Route>
          </Routes>

        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        {isLogin && <h2>{JSON.stringify(userInfo)}</h2>}
      </Footer>
    </Layout>
  );
}

export default App;
