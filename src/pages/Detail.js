import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card } from "antd";


function Detail() {

    const [detail, setDetail] = useState({
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

    const [loading, setLoading] = useState(true);
    const [activeTabKey1, setActiveTabKey1] = useState('tab1');


    let { id } = useParams();

    const tabList = [
        {
            key: 'tab1',
            tab: 'Main',
        },
        {
            key: 'tab2',
            tab: 'Addess',
        },
    ];

    const contentList = {
        tab1: <div>
            <p> ID : {detail.id}</p>
            <p> Company Name : {detail.companyName}</p>
            <p> Contact Name : {detail.contactName}</p>
            <p> Contact Title : {detail.contactTitle}</p>
        </div>,
        tab2: <div>
            <p> Street : {detail.address.street}</p>
            <p> City : {detail.address.city}</p>
            <p> Region : {detail.address.region}</p>
            <p> PostalCode : {detail.address.postalCode}</p>
            <p> Country : {detail.address.country}</p>
            <p> Phone : {detail.address.phone}</p>
        </div>,
    };

    useEffect(() => {
        axios.get(`https://northwind.vercel.app/api/customers/${id}`)
            .then(res => {
                setDetail(res.data);
                setLoading(false)
            })
            .catch(err=> console.log(err));                    
    }, []);

    const onTab1Change = (key) => {
        setActiveTabKey1(key);
    };


    return (<>
        <Card
            style={{
                width: '50%',
                margin:"30px auto"
            }}
            title="Custumer Detail"
            tabList={tabList}
            activeTabKey={activeTabKey1}
            onTabChange={(key) => {
                onTab1Change(key);
            }}
            loading={loading}
        >
            {contentList[activeTabKey1]}
        </Card>
    </>)

}

export default Detail