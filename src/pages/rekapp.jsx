import React, { Component } from 'react'
import { Card, DatePicker, Table, Tag, notification, Button, Input, Icon } from 'antd'
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import 'moment/locale/id'

const { MonthPicker } = DatePicker;
const axios = require('axios');
const modeValue={
    date: 0,
    month: 1,
    year: 2,
    decade: 3
};
const url_api = "http://localhost/api.php";
const url_refresh = "http://localhost/refresh.php";
// const url_api = "http://10.74.8.176/api.php";
// const url_refresh = "http://10.74.8.176/refresh.php";

class MyDatePicker extends React.Component {
    static defaultProps={
        topMode: "month",
        defaultValue: moment(),
        value: moment(),
        format: "YYYY-MM-DD"
    };
    constructor(props) { 
        super(props);        
        this.state={
            value: this.props.value || this.props.defaultValue,
            mode: this.props.topMode,
            preMode: this.props.topMode
        };
        this.isOnChange = false;
    }
    componentWillReceiveProps(nextProps, nextContext){
        if(this.props.topMode != nextProps.topMode){
            this.setState({
                mode: nextProps.topMode
            });
        }
    }
    /**
     * 
     * @param {*} value 
     * @param {要打開面板} mode 
     */
    onPanelChange(value, mode){
        // console.log(`onPanelChange date:${value} mode:${mode}`);
        //mode==null默認是從year返回到month
        mode = mode || "month";
        let open = true;
        //1. 往上打開，沒有任何問題，直接打開
        if(modeValue[this.state.mode] > modeValue[mode] && modeValue[this.props.topMode] > modeValue[mode]) {
            //向下
            open = false;
            mode = this.props.topMode;
        }
        //只關閉窗口和賦值，當前的mode不變
        this.setState({
            value, open, mode,
            preMode: this.state.mode
        });
        this.props.onChange(value, value.format("YYYY"));
    }
    /**
     * 在date的情況下選擇直接退出
     */
    onChange(value, dateStr){
        // console.log(`onChange date:${value} dateStr:${dateStr}`);
        this.isOnChange = true;
        this.setState({
            open: false,
            value
        });
    }
    
    render() {
        // console.log(`state:${JSON.stringify(this.state)}`);
        return (
            <DatePicker 
                value={this.state.value} 
                mode={this.state.mode}
                open={this.state.open}
                format={this.props.format}
                onFocus={()=>!this.isOnChange&&(this.isOnChange=!this.isOnChange,this.setState({open:true}))}
                onChange={this.onChange.bind(this)}
                onPanelChange={this.onPanelChange.bind(this)}
                onOpenChange={(open)=>this.setState({open})}
            />
        );
    }

}

export class rekapp extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                    render: text => <a href="javascript:;">{text.niplama}</a>,
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
                    render: status => (
                        <span>
                            <Tag color={status === 'incomplete' ? 'volcano' : 'green'}>
                                {status.toUpperCase()}
                            </Tag>
                        </span>
                    ),
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
        let url = url_api+"/records/penilaian?filter=niplama,eq,$niplama&filter=tahun_ckp,eq,$year&join=master_pegawai&order=bulan_ckp,asc";
        url = url.replace("$niplama", this.state.auth.niplama).replace("$year", date.format('YYYY'));
        // axios.get('http://localhost/api.php/records/penilaian')
        axios.get(url)
            .then(function (response) {
                // handle success
                console.log(response.data.records);
                self.setState({ data: response.data.records, confirmLoading: false, isAsyncModalVisible: false });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
                self.openNotification();
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


    componentDidMount(){
        this.fetchData(this.state.date);
    }

    render() {
        console.log(this.props);
        return (
            <Card>
                {/* <MonthPicker format='YYYY' style={{ marginBottom: "10px" }} onChange={this.onChange} placeholder="Pilih tahun" /> */}
                <MyDatePicker format='YYYY' style={{ marginBottom: "10px" }} onChange={this.onChange} placeholder="Pilih tahun" topMode='year'/>
                <Button type="primary" shape="round" icon="download" size="small" style={{ float: 'right' }} >Download Pdf</Button>
                <h1 style={{ textAlign: 'center' }}>Rekap Penilaian CKP-R Pegawai Tahun {this.state.date.format("YYYY")}</h1>
                <h1 style={{ textAlign: 'center' }}> {this.state.auth.nm_satker} </h1>
                <Table columns={this.state.columns} dataSource={this.state.data} rowKey={record => record.id} style={{overflowY: 'auto'}} pagination={false} bordered />
            </Card>
        )
    }
}

export default rekapp
