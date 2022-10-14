import React, { useState, useEffect } from 'react'
import { Button, Modal, Form, Input } from 'antd';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


function AddCustomer() {

  const [custumer] = useState({
    id: "None",
    companyName: "None",
    contactName: "None",
    contactTitle: "None",
    address: {
      street: "None",
      city: "None",
      region: "None",
      postalCode: "None",
      country: "None",
      phone: "None"
    }
  });

  const navigate = useNavigate();
  const [form] = Form.useForm();


  const success = () => {
    Modal.success({
      content: 'Post successfully...',
    });
  };

  const error = (error) => {
    Modal.error({
      title: 'This is an error message',
      content: error.message,
    });
  };

  const onFinish = (values) => {
    const sendData = {
      id: values.id,
      companyName: values.companyName,
      contactName: values.contactName,
      contactTitle: values.contactTitle,
      address: {
        street: values.street,
        city: values.city,
        region: values.region,
        postalCode: values.postalCode,
        country: values.country,
        phone: values.phone
      }
    }

    axios.post(`https://northwind.vercel.app/api/customers`, sendData)
      .then((res) => {
        success();
      })
      .catch(error => {
        error(error);
        console.error('There was an error!', error);
      });

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  useEffect(() => {
    form.setFieldsValue({
      id: custumer.id,
      companyName: custumer.companyName,
      contactName: custumer.contactName,
      contactTitle: custumer.contactTitle,
      street: custumer.address.street,
      city: custumer.address.city,
      region: custumer.address.region,
      postalCode: custumer.address.postalCode,
      country: custumer.address.country,
      phone: custumer.address.phone,
    });
  }, [custumer]);





  return (<>
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 3,
      }}
      wrapperCol={{
        span: 8,
      }}
      initialValues={{

      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="ID"
        name="id"
        rules={[
          {
            required: false,
            message: 'Please input your id!',
          },
        ]}
      >
        <Input 
        />
      </Form.Item>
      <Form.Item
        label="Company Name"
        name="companyName"
        rules={[
          {
            required: true,
            message: 'Please input your company name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Contact Name"
        name="contactName"
        rules={[
          {
            required: true,
            message: 'Please input your contact name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Contact Title"
        name="contactTitle"
        rules={[
          {
            required: true,
            message: 'Please input your contact Title!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Street"
        name="street"
        rules={[
          {
            required: true,
            message: 'Please input your street!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="City"
        name="city"
        rules={[
          {
            required: true,
            message: 'Please input your city!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Region"
        name="region"
        rules={[
          {
            required: true,
            message: 'Please input your region!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Postal Code"
        name="postalCode"
        rules={[
          {
            required: true,
            message: 'Please input your postal code!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Country"
        name="country"
        rules={[
          {
            required: true,
            message: 'Please input your country!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Phone"
        name="phone"
        rules={[
          {
            required: true,
            message: 'Please input your phone!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 3,
          span: 4,
        }}
      >
        <Button type="primary" htmlType="submit">
          Post
        </Button>
        <Button 
        onClick={()=> navigate(-1)}
        style={{marginLeft : 20}}>
          Back
        </Button>

      </Form.Item>

    </Form>
  </>
  );
}

export default AddCustomer