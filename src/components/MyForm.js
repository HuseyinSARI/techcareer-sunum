import React, { useState, useEffect } from 'react';
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";



import { Button, Modal, Form, Input } from 'antd';



function MyForm() {

    const { isLogin, setUserInfo, checkUser } = useUserContext();
    let navigate = useNavigate();
    const [form] = Form.useForm();


    const onFinish = (values) => {
        console.log('Submit-Success:', values);
        
        setUserInfo({
            email: values.email,
            password: values.password,
        })        

    };

    useEffect(() => {
        console.log("isLogin : ", isLogin);
        
        if (isLogin) {
            navigate("/");
        }
    }, [isLogin])



    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    const onFill = () => {
        form.setFieldsValue({
            email: 'dgpays@mail.com',
            password: '123',
        });
    };

    const error = () => {
        Modal.error({
            title: 'Wrong e-mail or password',
            content: 'Please try again!',
        });
    };

    return (
        <div>
            <Form
                form={form}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="E-Mail"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your e-mail!',

                        },
                        {
                            type: "email",
                            message: 'Please enter a valid e-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>

                    <Button type="link" htmlType="button" onClick={onFill}>
                        Fill form
                    </Button>

                </Form.Item>
            </Form>



        </div>
    )
}

export default MyForm

