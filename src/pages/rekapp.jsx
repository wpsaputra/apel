import React, { Component } from 'react'
import { Card, DatePicker, Table, Tag, notification, Button, Select } from 'antd'

const { MonthPicker } = DatePicker;
const Option = Select.Option;

const openNotification = () => {
    notification.open({
        message: 'Perubahan Tabel',
        description:
            'Konten tabel berhasil dirubah',
        onClick: () => {
            console.log('Notification Clicked!');
        },
    });
};

function onChange(date, dateString) {
    console.log(date, dateString);
    openNotification();
}

function handleChange(value) {
    console.log(`selected ${value}`);
}

const columns = [
    {
        title: 'Nama Pegawai',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>,
    },
    {
        title: 'Skor Realisasi Pekerjaan',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Skor Ketepatan Waktu',
        dataIndex: 'tepat',
        key: 'tepat',
    },
    {
        title: 'Skor Daily Activity',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Skor TL & PSW',
        dataIndex: 'tl',
        key: 'tl',
    },
    {
        title: 'Nilai CKP R',
        dataIndex: 'ckpr',
        key: 'ckpr',
    },
    {
        title: 'Status',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <span>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'incomplete') {
                        color = 'volcano';
                    } else {
                        color = 'green';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </span>
        ),
    },
    // {
    //     title: 'Action',
    //     key: 'action',
    //     render: (text, record) => (
    //         <span>
    //             <a href="javascript:;">Edit</a>
    //             <Divider type="vertical" />
    //             <a href="javascript:;">Delete</a>
    //         </span>
    //     ),
    // },
];

const data = [
    {
        key: '2',
        name: 'Jim Green',
        age: 99,
        tepat: 99,
        address: 95,
        tl: 95,
        ckpr: 90,
        tags: ['complete'],
    },{
        key: '2',
        name: 'Jim Green',
        age: 99,
        tepat: 99,
        address: 95,
        tl: 95,
        ckpr: 90,
        tags: ['complete'],
    },{
        key: '2',
        name: 'Jim Green',
        age: 99,
        tepat: 99,
        address: 95,
        tl: 95,
        ckpr: 90,
        tags: ['complete'],
    },{
        key: '2',
        name: 'Jim Green',
        age: 99,
        tepat: 99,
        address: 95,
        tl: 95,
        ckpr: 90,
        tags: ['complete'],
    },{
        key: '2',
        name: 'Jim Green',
        age: 99,
        tepat: 99,
        address: 95,
        tl: 95,
        ckpr: 90,
        tags: ['complete'],
    },{
        key: '2',
        name: 'Jim Green',
        age: 99,
        tepat: 99,
        address: 95,
        tl: 95,
        ckpr: 90,
        tags: ['complete'],
    },{
        key: '2',
        name: 'Jim Green',
        age: 99,
        tepat: 99,
        address: 95,
        tl: 95,
        ckpr: 90,
        tags: ['complete'],
    },{
        key: '2',
        name: 'Jim Green',
        age: 99,
        tepat: 99,
        address: 95,
        tl: 95,
        ckpr: 90,
        tags: ['complete'],
    },{
        key: '2',
        name: 'Jim Green',
        age: 99,
        tepat: 99,
        address: 95,
        tl: 95,
        ckpr: 90,
        tags: ['complete'],
    },{
        key: '2',
        name: 'Jim Green',
        age: 99,
        tepat: 99,
        address: 95,
        tl: 95,
        ckpr: 90,
        tags: ['complete'],
    },{
        key: '2',
        name: 'Jim Green',
        age: 99,
        tepat: 99,
        address: 95,
        tl: 95,
        ckpr: 90,
        tags: ['complete'],
    },{
        key: '2',
        name: 'Jim Green',
        age: 99,
        tepat: 99,
        address: 95,
        tl: 95,
        ckpr: 90,
        tags: ['complete'],
    },{
        key: '2',
        name: 'Jim Green',
        age: 99,
        tepat: 99,
        address: 95,
        tl: 95,
        ckpr: 90,
        tags: ['complete'],
    },{
        key: '2',
        name: 'Jim Green',
        age: 99,
        tepat: 99,
        address: 95,
        tl: 95,
        ckpr: 90,
        tags: ['complete'],
    },{
        key: '2',
        name: 'Jim Green',
        age: 99,
        tepat: 99,
        address: 95,
        tl: 95,
        ckpr: 90,
        tags: ['complete'],
    },{
        key: '2',
        name: 'Jim Green',
        age: 99,
        tepat: 99,
        address: 95,
        tl: 95,
        ckpr: 90,
        tags: ['complete'],
    },{
        key: '2',
        name: 'Jim Green',
        age: 99,
        tepat: 99,
        address: 95,
        tl: 95,
        ckpr: 90,
        tags: ['complete'],
    },{
        key: '2',
        name: 'Jim Green',
        age: 99,
        tepat: 99,
        address: 95,
        tl: 95,
        ckpr: 90,
        tags: ['complete'],
    },
];

export class rekapp extends Component {
    render() {
        return (
            <Card>
                <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                    <Option value="jack">John Brown</Option>
                    <Option value="lucy">Jim Green</Option>
                    <Option value="Yiminghe">Joe Black</Option>
                </Select>
                {/* <DatePicker mode="year"/> */}
                <MonthPicker mode="year" style={{ marginBottom: "10px" }} onChange={onChange} placeholder="Select year" />
                <Button type="primary" shape="round" icon="download" size="small" style={{ float: 'right' }}>Download Pdf</Button>
                <h1 style={{ textAlign: 'center' }}>Rekap Realisasi Per Pegawai tahun 2019</h1>
                <Table columns={columns} dataSource={data} />
            </Card>
        )
    }
}

export default rekapp
