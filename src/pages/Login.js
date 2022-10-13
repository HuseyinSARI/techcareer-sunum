import { Button, Modal, Checkbox, Form, Input } from 'antd';

import React, { useState, useEffect } from 'react';
import { Formik, useFormik } from 'formik';
import { useUserContext } from "../context/UserContext";
import * as Yup from 'yup';
import MyForm from '../components/MyForm';

function Login() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {isLogin, userInfo}  = useUserContext();
    
    useEffect(() => {
        setIsModalOpen(true);
    }, [])


    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };




    return (
        <>
            <Modal
                title="Login"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                {isLogin ? JSON.stringify(userInfo) : <MyForm />}
                

            </Modal>
        </>
    );

}

export default Login