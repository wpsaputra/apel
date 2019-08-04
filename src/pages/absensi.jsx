import React, { Component } from 'react'
import { Card, DatePicker, Table, Tag, notification, Button, Input, Icon, Select } from 'antd'
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import 'moment/locale/id'
import { url_api, url_refresh, url_pegawai, unit_kerja_prov, unit_kerja_kab, url_absensi } from '../constant/constant';
import { PDFExport } from '@progress/kendo-react-pdf';

const { MonthPicker } = DatePicker;
const { Option } = Select;
const axios = require('axios');
const tabletojson = require('tabletojson');
 
// tabletojson.convertUrl(
//     'http://localhost/absensi.php',
//     function(tablesAsJson) {
//         tablesAsJson[0].pop();
//         console.log(tablesAsJson[0]);
//     }
// );


export class absensi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nama_unit_kerja: '',
            unit_kerja: [],
            bidangFilter: 92000,
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
        this.handleSelectChange = this.handleSelectChange.bind(this);
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
        let url = url_absensi + "?datestart=$datestart&dateend=$dateend&userid=$userid&idkabkot=$idkabkot";
        let yearmonth = date.format('YYYY-MM');
        url = url.replace("$datestart", yearmonth+"-01").replace("$dateend", yearmonth+"-31")
            .replace("$userid", self.state.auth.niplama.slice(-5)).replace("$idkabkot", self.state.auth.id_satker);
        // axios.get('http://localhost/api.php/records/penilaian')
        self.setState({ isTableLoading: true });
        axios.get(url)
            .then(function (response) {
                // handle success
                // console.log(response.data.records);
                console.log(response.data);
                console.log(tabletojson.convert(response.data));
                let newData = tabletojson.convert(response.data)[0];
                newData.pop();
                self.setState({ data: newData, confirmLoading: false, isAsyncModalVisible: false });
                
                // let newData = response.data.records;
                // newData = newData.filter(v => v.niplama.id_satker === self.state.auth.id_satker);
                // newData = newData.sort((a, b) => a.niplama.nama.localeCompare(b.niplama.nama));
                // if(self.state.bidangFilter!=92000 && self.state.auth.id_satker=='7400'){
                //     newData = newData.filter(v => v.niplama.id_org.substring(0,3) == self.state.bidangFilter.toString().substring(0,3));
                // }
                // if(self.state.bidangFilter!=92800 && self.state.auth.id_satker!='7400'){
                //     newData = newData.filter(v => v.niplama.id_org.substring(0,4) == self.state.bidangFilter.toString().substring(0,4));
                // }
                // self.setState({ data: newData, confirmLoading: false, isAsyncModalVisible: false });
                
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
        if(this.state.auth.id_satker==7400){
            this.setState({unit_kerja: unit_kerja_prov, nama_unit_kerja: "BPS Propinsi"});
        }else{
            this.setState({unit_kerja: unit_kerja_kab, bidangFilter: 92800, nama_unit_kerja: "BPS Kabupaten/Kota"});
        }
        this.fetchData(this.state.date);
    }

    exportPDFWithComponent = () => {
        this.pdfExportComponent.save();
    }

    handleSelectChange(value) {
        console.log(`selected ${value}`);
        this.setState({ bidangFilter: value, nama_unit_kerja: this.state.unit_kerja.filter(v => v.id_org === value)[0].nm_org });
        this.fetchData(this.state.date);
        // console.log(this.state.unit_kerja.filter(v => v.id_org === value)[0].nm_org);
    }

    render() {
        console.log(this.props);
        let defaultSelect = "";
        if(this.state.auth.id_satker==7400){
            defaultSelect = "BPS Propinsi"
        }else{
            defaultSelect = "BPS Kabupaten/Kota"
        }
        return (
            <Card>
                <MonthPicker format='MMMM YYYY' style={{ marginBottom: "10px" }} onChange={this.onChange} placeholder="Pilih bulan" />
                {/* <Select defaultValue={defaultSelect} style={{ width: 200, marginLeft: "5px" }} onChange={this.handleSelectChange}>
                    {this.state.unit_kerja.map((val, index) => {
                        return <Option key={index} value={val.id_org}>{val.nm_org}</Option>
                    })}
                </Select> */}
                <Button type="primary" shape="round" icon="download" size="small" style={{ float: 'right' }} onClick={this.exportPDFWithComponent} >Download Pdf</Button>
                <PDFExport ref={(component) => this.pdfExportComponent = component} paperSize="A4" landscape scale={0.8} margin="2cm" >
                    <h1 style={{ textAlign: 'center' }}>{"Rekap Absensi Pegawai " + this.state.date.format("MMMM YYYY")}</h1>
                    <h1 style={{ textAlign: 'center' }}>{this.state.auth.nm_satker} </h1>
                    {/* <h4>Unit Kerja : {this.state.nama_unit_kerja}</h4> */}
                    <h4>Nip Lama : {this.state.auth.niplama}</h4>
                    <h4>Nama Pegawai : {this.state.auth.nama}</h4>
                    <Table columns={this.state.columns} dataSource={this.state.data} rowKey={record => record.Date} style={{ overflowY: 'auto' }} pagination={false} bordered loading={this.state.isTableLoading} />
                </PDFExport>
            </Card>
        )
    }
}

export default absensi
