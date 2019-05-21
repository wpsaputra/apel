import React, { Component } from 'react'
import { Card, DatePicker, Table, Divider, Tag, notification } from 'antd'

const { MonthPicker } = DatePicker;
const axios = require('axios');

export class penilaian extends Component {
    constructor(props){
        super(props);
        this.state = {
            columns: [
                {
                    title: 'Nama Pegawai',
                    dataIndex: 'niplama',
                    key: 'niplama',
                    render: text => <a href="javascript:;">{text}</a>,
                },
                {
                    title: 'Skor Realisasi Pekerjaan',
                    dataIndex: 'skor_realisasi_pekerjaan',
                    key: 'skor_realisasi_pekerjaan',
                },
                {
                    title: 'Skor Ketepatan Waktu',
                    dataIndex: 'skor_ketepatan_waktu',
                    key: 'skor_ketepatan_waktu',
                },
                {
                    title: 'Skor Daily Activity',
                    dataIndex: 'skor_daily_activity',
                    key: 'skor_daily_activity',
                },
                {
                    title: 'Skor TL & PSW',
                    dataIndex: 'skor_tl_psw',
                    key: 'skor_tl_psw',
                },
                {
                    title: 'Nilai CKP R',
                    dataIndex: 'nilai_ckp_r',
                    key: 'nilai_ckp_r',
                },
                {
                    title: 'Status',
                    key: 'status',
                    dataIndex: 'status',
                    render: status => (
                        <span>
                            <Tag color={status==='incomplete'? 'volcano':'green'}>
                                {status.toUpperCase()}
                            </Tag>
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
            ],
            data: []
        };
        this.openNotification = this.openNotification.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    openNotification() {
        notification.open({
            message: 'Perubahan Tabel',
            description:
                'Konten tabel berhasil dirubah',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    }

    onChange(date, dateString) {
        // console.log(date, dateString);
        console.log(dateString);
        this.fetchData();
        this.openNotification();
    }

    fetchData() {
        var self = this;
        axios.get('http://localhost/api.php/records/penilaian')
            .then(function (response) {
                // handle success
                console.log(response.data.records);
                self.setState({data: response.data.records});
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    render() {
        return (
            <Card>
                <MonthPicker style={{ marginBottom: "10px" }} onChange={this.onChange} placeholder="Select month" />
                <Table columns={this.state.columns} dataSource={this.state.data} />
            </Card>
        )
    }
}

export default penilaian
