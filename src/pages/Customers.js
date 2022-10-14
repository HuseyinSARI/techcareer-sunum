import React, { useState, useEffect } from 'react'
import { Route, Routes, Link, Outlet, Navigate, redirect, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Table, Button, Modal } from "antd";
import { DeleteOutlined, FormOutlined, InfoCircleOutlined } from '@ant-design/icons';

function Customers() {

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  const getCustomers = () => {
    axios.get('https://northwind.vercel.app/api/customers')
      .then(res => {
        setCustomers(res.data);
        setLoading(false);
      })
      .catch(err=> console.log(err));
  }

  const deleteCustomer = (id) => {

    Modal.confirm({
      title: 'Are you sure delete this customer?',
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',

      onOk() {
        setLoading(true)
        axios.delete(`https://northwind.vercel.app/api/customers/${id}`)
          .then(res => {
            getCustomers();
          })
          .catch(err=> console.log(err));
      },

      onCancel() {
        console.log('Cancel');
      },
    });

  }


  const handleUpdateNavigate = (id) => {
    navigate("/customers/update/" + id);
  }

  const handleDetailNavigate = (id) => {
    navigate("/customers/detail/" + id);
  }



  useEffect(() => {

    getCustomers();
  }, []);



  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id.localeCompare(b.id)

    },
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
      sorter: (a, b) => a.companyName.localeCompare(b.companyName)

    },
    {
      title: 'Contact Name',
      dataIndex: 'contactName',
      key: 'contactName',
      sorter: (a, b) => a.contactName.localeCompare(b.contactName)

    },
    {
      title: 'Delete',
      dataIndex: 'id',
      render: (id) => <Button onClick={() => deleteCustomer(id)} type='primary-outline' danger icon={<DeleteOutlined />}>Delete</Button>
    },
    {
      title: 'Update',
      dataIndex: 'id',
      render: (id) => <Button onClick={() => handleUpdateNavigate(id)} type='primary' icon={<FormOutlined/>}>Update</Button>,

    },
    {
      title: 'Detail',
      dataIndex: 'id',
      render: (id) => <Button  onClick={() => handleDetailNavigate(id)} type='primary' icon={<InfoCircleOutlined/>}>Detail</Button>,
      
    },
  ];

  return (
    <div>
      <Table
        rowKey={customers => customers.id}
        dataSource={customers}
        columns={columns}
        loading={loading}
      />;
    </div>

  )
}

export default Customers