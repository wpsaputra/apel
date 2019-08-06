import React, { Component } from 'react'
import { Card, DatePicker, Table, Tag, notification, Button, Input, Icon } from 'antd'
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import 'moment/locale/id'
import { url_api, url_refresh, url_pegawai, url_absensi } from '../constant/constant';
import { PDFExport } from '@progress/kendo-react-pdf';

const { MonthPicker } = DatePicker;
const axios = require('axios');
const tabletojson = require('tabletojson');

export class absensiu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterData: [],
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
                    title: 'Day',
                    dataIndex: 'Day',
                    key: 'Day',
                },
                {
                    title: 'Date',
                    dataIndex: 'Date',
                    key: 'Date',
                    // render: text => <span>{text.nama}</span>,
                    // sorter: (a, b) => a.niplama.nama.localeCompare(b.niplama.nama),
                    // ...this.getColumnSearchProps('nama'),

                },
                {
                    title: 'Working Hour',
                    dataIndex: 'Working Hour',
                    key: 'Working Hour',
                    // render: text => <span>{moment(text, 'M').format('MMMM')}</span>,
                },
                {
                    title: 'Activity',
                    dataIndex: 'Activity',
                    key: 'Activity',
                    // render: text => <span color={"volcano"}>{text}</span>
                    // sorter: (a, b) => a.skor_realisasi_pekerjaan - b.skor_realisasi_pekerjaan,
                },
                {
                    title: 'Duty On',
                    dataIndex: 'Duty On',
                    key: 'Duty On',
                    render: (text, row) => (
                        // <span>
                        //     <font color={(text > '07:30:00'&&!(row.Day=="Sat"||row.onFilterDay=="Mon")) ? 'red' : ''}>
                        //         {text.toUpperCase()}
                        //     </font>
                        // </span>
                        <span>
                            <font color={(text > row["Working Hour"].slice(0,5)+":00"&&!(row.Day=="Sat"||row.Day=="Sun")) ? 'red' : ''}>
                                {text.toUpperCase()}
                            </font>
                        </span>
                    ),
                    // sorter: (a, b) => a.skor_ketepatan_waktu - b.skor_ketepatan_waktu,
                },
                {
                    title: 'Duty Off',
                    dataIndex: 'Duty Off',
                    key: 'Duty Off',
                    render: (text, row) => (
                        // <span>
                        //     <font color={(text < '16:00:00'&&!(row.Day=="Sat"||row.Day=="Mon"||row.Day=="Fri"))||(text < '16:30:00'&&(row.Day=="Fri")) ? 'red' : ''}>
                        //         {text.toUpperCase()}
                        //     </font>
                        // </span>

                        <span>
                            <font color={(text < row["Working Hour"].slice(-5)+":00"&&!(row.Day=="Sat"||row.Day=="Sun")) ? 'red' : ''}>
                                {text.toUpperCase()}
                            </font>
                        </span>
                    ),
                    // sorter: (a, b) => a.skor_daily_activity - b.skor_daily_activity,
                },
                {
                    title: 'Notes',
                    dataIndex: 'Notes',
                    key: 'Notes',
                    // sorter: (a, b) => a.skor_tl_psw - b.skor_tl_psw,
                }
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
        this.createTable = this.createTable.bind(this);
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
        let niplama = "";
        self.state.filterData.forEach(function (filterData, index) {
            niplama = niplama + filterData.niplama.slice(-5) + ",";
        });

        let url = url_absensi + "?datestart=$datestart&dateend=$dateend&userid=$userid&idkabkot=$idkabkot";
        let yearmonth = date.format('YYYY-MM');
        // url = url.replace("$datestart", yearmonth+"-01").replace("$dateend", yearmonth+"-31")
        //     .replace("$userid", self.state.auth.niplama.slice(-5)).replace("$idkabkot", self.state.auth.id_satker);
        url = url.replace("$datestart", yearmonth+"-01").replace("$dateend", yearmonth+"-31")
            .replace("$userid", niplama).replace("$idkabkot", self.state.auth.id_satker);
        self.setState({ isTableLoading: true });
        axios.get(url)
            .then(function (response) {
                // handle success
                // console.log(response.data);
                console.log(tabletojson.convert(response.data));
                // let newData = tabletojson.convert(response.data)[0];
                let newData = tabletojson.convert(response.data);
                // newData.pop();
                self.setState({ data: newData, confirmLoading: false, isAsyncModalVisible: false });

                

                // console.log(response.data.records);
                // let tempRecord = response.data.records;
                // tempRecord = tempRecord.filter(v =>  self.state.filterData.some(item => item.niplama === v.niplama.niplama));
                // console.log("temp record", tempRecord); 
                // self.setState({ data: tempRecord, confirmLoading: false, isAsyncModalVisible: false });
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

    fetchPegawai() {
        var self = this;
        let url = url_pegawai + "?id_lvl=$id_lvl&id_org=$id_org&id_satker=$id_satker";
        url = url.replace("$id_lvl", this.state.auth.id_level).replace("$id_org", this.state.auth.id_org).replace("$id_satker", this.state.auth.id_satker);
        // axios.get('http://localhost/api.php/records/penilaian')
        console.log(url);
        axios.get(url)
            .then(function (response) {
                // handle success
                console.log(response.data);
                self.setState({ filterData: response.data });
                self.fetchData(self.state.date);
                // self.setState({ data: response.data.records, confirmLoading: false, isAsyncModalVisible: false });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
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
        this.fetchPegawai();
        this.fetchData(this.state.date);
    }

    exportPDFWithComponent = () => {
        this.pdfExportComponent.save();
    }

    createTable() {
        // let table = []

        // for (let i = 0; i < 3; i++) {
        //     table.push(<tr>
        //         {
        //             //inner loop to create columns
        //         }
        //     </tr>)
        // }
        // return table

        // let table = [];
        // {this.state.data.map((item, key) =>
        //     // <p>{item.Day}</p>
        //     table.push(<Table columns={this.state.columns} dataSource={item} rowKey={record => record.Date} style={{ overflowY: 'auto' }} pagination={false} bordered loading={this.state.isTableLoading} />)
        // )}

        let content = [];
        let arrTable = this.state.data;
        // arrTable.forEach(element => {
        //     content.push(<b>{element.Day}</b>);
        // });

        for (let i = 0; i < arrTable.length; i++) {
            const element = arrTable[i];
            // content.push(<b>{element[0].Day}</b>);
            content.push(<pre>{JSON.stringify(element)}</pre>);
            content.push(<br></br>);
            // content.push(<Table columns={this.state.columns} dataSource={element} rowKey={record => record.Date} 
            //     style={{ overflowY: 'auto' }} pagination={false} bordered loading={this.state.isTableLoading} />);
            
        }

        // console.log(content);
        // return <b>sfsdfs</b>;
        return content;
    }

    render() {
        console.log(this.props);
        return (
            <Card>
                <MonthPicker format='MMMM YYYY' style={{ marginBottom: "10px" }} onChange={this.onChange} placeholder="Pilih bulan" />
                {/* <MyDatePicker format='YYYY' style={{ marginBottom: "10px" }} onChange={this.onChange} placeholder="Pilih tahun" topMode='year'/> */}
                <Button type="primary" shape="round" icon="download" size="small" style={{ float: 'right' }} onClick={this.exportPDFWithComponent} >Download Pdf</Button>
                <PDFExport ref={(component) => this.pdfExportComponent = component} paperSize="A4" landscape scale={0.8} margin="2cm" >
                    <h1 style={{ textAlign: 'center' }}>{"Rekap Absensi Pegawai "+this.state.date.format("MMMM YYYY")}</h1>
                    <h1 style={{ textAlign: 'center' }}>{this.state.auth.nm_satker} </h1>
                    {this.createTable()}
                    {/* {this.state.data.map((item, key) =>
                        // <p>{item.Day}</p>
                        <Table columns={this.state.columns} dataSource={item} rowKey={record => record.Date} style={{ overflowY: 'auto' }} pagination={false} bordered loading={this.state.isTableLoading} />
                    )} */}
                    {/* {this.state.data.map(function (object, i) {
                        // return <ObjectRow obj={object} key={i} />;
                        return <pre>object</pre>;
                        // return <Table columns={this.state.columns} dataSource={object} rowKey={record => record.Date} style={{ overflowY: 'auto' }} pagination={false} bordered loading={this.state.isTableLoading} />
                    })} */}
                    {/* <Table columns={this.state.columns} dataSource={this.state.data} rowKey={record => record.Date} style={{ overflowY: 'auto' }} pagination={false} bordered loading={this.state.isTableLoading} /> */}
                </PDFExport>
            </Card>
        )
    }
}

export default absensiu
