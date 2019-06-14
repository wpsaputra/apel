import React, { Component } from 'react'
import { Card, DatePicker, Table, Tag, notification, Button, Input, Icon } from 'antd'
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import 'moment/locale/id'
import { url_api, url_refresh, url_pegawai } from '../constant/constant';
import { PDFExport } from '@progress/kendo-react-pdf';

const { MonthPicker } = DatePicker;
const axios = require('axios');

export class rekapb extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTableLoading: false,
            auth: this.props.auth,
            isAsyncModalVisible: false,
            confirmLoading: false,
            asyncModalText: "Menu ini akan menambahkan rekap nilai seluruh pegawai",
            searchText: '',
            name: '',
            date: moment(),
            dateString: moment().format('YYYY'),
            isModalVisible: false,
            row_record: {},
            columns: [
                {
                    title: 'NIP Pegawai',
                    dataIndex: 'niplama',
                    key: 'niplama',
                    // render: text => <a href="javascript:;">{text.niplama}</a>,
                    render: text => <span>{text.niplama}</span>,
                    // sorter: (a, b) => a.niplama.niplama - b.niplama.niplama,
                },
                {
                    title: 'Nama Pegawai',
                    dataIndex: 'niplama',
                    key: 'nama',
                    render: text => <span>{text.nama}</span>,
                    // sorter: (a, b) => a.niplama.nama.localeCompare(b.niplama.nama),
                    // ...this.getColumnSearchProps('nama'),

                },
                {
                    title: 'Bulan',
                    dataIndex: 'bulan_ckp',
                    key: 'bulan_ckp',
                    render: text => <span>{moment(text, 'M').format('MMMM')}</span>,
                },
                {
                    title: 'Skor Realisasi Pekerjaan',
                    dataIndex: 'skor_realisasi_pekerjaan',
                    key: 'skor_realisasi_pekerjaan',
                    // sorter: (a, b) => a.skor_realisasi_pekerjaan - b.skor_realisasi_pekerjaan,
                },
                {
                    title: 'Skor Ketepatan Waktu',
                    dataIndex: 'skor_ketepatan_waktu',
                    key: 'skor_ketepatan_waktu',
                    // sorter: (a, b) => a.skor_ketepatan_waktu - b.skor_ketepatan_waktu,
                },
                {
                    title: 'Skor Daily Activity',
                    dataIndex: 'skor_daily_activity',
                    key: 'skor_daily_activity',
                    // sorter: (a, b) => a.skor_daily_activity - b.skor_daily_activity,
                },
                {
                    title: 'Skor TL & PSW',
                    dataIndex: 'skor_tl_psw',
                    key: 'skor_tl_psw',
                    // sorter: (a, b) => a.skor_tl_psw - b.skor_tl_psw,
                },
                {
                    title: 'Nilai CKP R',
                    dataIndex: 'nilai_ckp_r',
                    key: 'nilai_ckp_r',
                    // sorter: (a, b) => a.nilai_ckp_r - b.nilai_ckp_r,
                },
                {
                    title: 'Status',
                    key: 'status',
                    dataIndex: 'status',
                    // render: status => (
                    //     <span>
                    //         <Tag color={status === 'incomplete' ? 'volcano' : 'green'}>
                    //             {status.toUpperCase()}
                    //         </Tag>
                    //     </span>
                    // ),
                    // filters: [{ text: 'complete', value: 'complete' }, { text: 'incomplete', value: 'incomplete' }],
                    // onFilter: (value, record) => record.status.indexOf(value) === 0,
                },
            ],
            data: []
        };
        this.openNotification = this.openNotification.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fetchData = this.fetchData.bind(this);
        //search
        this.getColumnSearchProps = this.getColumnSearchProps.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    openNotification() {
        notification.open({
            message: 'Perubahan Tabel',
            description:
                'Konten tabel berhasil diload',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    }

    onChange(date, dateString) {
        // console.log(date, dateString);
        if (date !== null) {
            this.setState({ date: date, dateString: dateString });
            console.log(date.format('M'));
            this.fetchData(date);
        }
    }

    fetchData(date) {
        var self = this;
        let url = url_api + "/records/penilaian?filter=bulan_ckp,eq,$month&filter=tahun_ckp,eq,$year&join=master_pegawai";
        url = url.replace("$month", date.format('M')).replace("$year", date.format('YYYY'));
        // axios.get('http://localhost/api.php/records/penilaian')
        self.setState({ isTableLoading: true });
        axios.get(url)
            .then(function (response) {
                // handle success
                console.log(response.data.records);
                let newData = response.data.records;
                // newData.filter(v => v.id === self.state.row_record.id);
                newData = newData.filter(v => v.niplama.id_satker === self.state.auth.id_satker);
                newData = newData.sort((a, b) => a.niplama.nama.localeCompare(b.niplama.nama));
                self.setState({ data: newData, confirmLoading: false, isAsyncModalVisible: false });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
                self.openNotification();
                self.setState({ isTableLoading: false });
            });
    }


    // Search
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
            </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
            </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            // record[dataIndex]
            //     .toString()
            //     .toLowerCase()
            //     .includes(value.toLowerCase()),

            record.niplama[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        // console.log(value),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.nama.toString()}
            />
        ),
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };


    componentDidMount() {
        this.fetchData(this.state.date);
    }

    exportPDFWithComponent = () => {
        this.pdfExportComponent.save();
    }

    render() {
        console.log(this.props);
        return (
            <Card>
                <MonthPicker format='MMMM YYYY' style={{ marginBottom: "10px" }} onChange={this.onChange} placeholder="Pilih bulan" />
                {/* <MyDatePicker format='YYYY' style={{ marginBottom: "10px" }} onChange={this.onChange} placeholder="Pilih tahun" topMode='year'/> */}
                <Button type="primary" shape="round" icon="download" size="small" style={{ float: 'right' }} onClick={this.exportPDFWithComponent} >Download Pdf</Button>
                <PDFExport ref={(component) => this.pdfExportComponent = component} paperSize="A4" landscape scale={0.8} margin="2cm" >
                    <h1 style={{ textAlign: 'center' }}>{"Rekap Penilaian CKP-R Pegawai Tahun "+this.state.date.format("YYYY")}</h1>
                    <h1 style={{ textAlign: 'center' }}>{this.state.auth.nm_satker} </h1>
                    <Table columns={this.state.columns} dataSource={this.state.data} rowKey={record => record.id} style={{ overflowY: 'auto' }} pagination={false} bordered loading={this.state.isTableLoading} />
                </PDFExport>
            </Card>
        )
    }
}

export default rekapb
