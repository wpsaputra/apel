import React, { Component } from 'react'
import { Card, DatePicker, Table, Divider, Tag, notification } from 'antd'

const { MonthPicker } = DatePicker;
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
                    }else{
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
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <span>
                <a href="javascript:;">Edit</a>
                <Divider type="vertical" />
                <a href="javascript:;">Delete</a>
            </span>
        ),
    },
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 90,
        tepat: 90,
        address: 100,
        tl: 100,
        ckpr: 95,
        tags: ['complete'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 99,
        tepat: 99,
        address: 95,
        tl: 95,
        ckpr: 90,
        tags: ['complete'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 100,
        tepat: "",
        address: 90,
        tl: 90,
        ckpr: "",
        tags: ['incomplete'],
    },
    {
        key: '1',
        name: 'John Brown',
        age: 90,
        tepat: 90,
        address: 100,
        tl: 100,
        ckpr: 95,
        tags: ['complete'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 99,
        tepat: 99,
        address: 95,
        tl: 95,
        ckpr: 90,
        tags: ['complete'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 100,
        tepat: "",
        address: 90,
        tl: 90,
        ckpr: "",
        tags: ['incomplete'],
    },
    {
        key: '1',
        name: 'John Brown',
        age: 90,
        tepat: 90,
        address: 100,
        tl: 100,
        ckpr: 95,
        tags: ['complete'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 99,
        tepat: 99,
        address: 95,
        tl: 95,
        ckpr: 90,
        tags: ['complete'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 100,
        tepat: "",
        address: 90,
        tl: 90,
        ckpr: "",
        tags: ['incomplete'],
    },
    {
        key: '1',
        name: 'John Brown',
        age: 90,
        tepat: 90,
        address: 100,
        tl: 100,
        ckpr: 95,
        tags: ['complete'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 99,
        tepat: 99,
        address: 95,
        tl: 95,
        ckpr: 90,
        tags: ['complete'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 100,
        tepat: "",
        address: 90,
        tl: 90,
        ckpr: "",
        tags: ['incomplete'],
    },
];

export class penilaian extends Component {
    render() {
        return (
            <Card>
                <MonthPicker style={{ marginBottom: "10px" }} onChange={onChange} placeholder="Select month" />
                <Table columns={columns} dataSource={data} />
            </Card>
        )
    }
}

export default penilaian
