import React, { Component } from 'react'
import { Card, DatePicker, Table, Divider, Tag, notification, Modal, InputNumber, Form, Button, Input, Icon, Alert } from 'antd'
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import 'moment/locale/id'
import {url_api, url_refresh, url_pegawai} from '../constant/constant';
import XLSX from 'xlsx';

const { MonthPicker } = DatePicker;
const axios = require('axios');

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form, title, row_record, confirmLoading, handleFileChange } = this.props;
            const { getFieldDecorator } = form;

            return (
                <Modal
                    visible={visible}
                    title={title}
                    okText="Save"
                    onCancel={onCancel}
                    onOk={onCreate}
                    confirmLoading={confirmLoading}
                >
                    <Form layout="vertical">
                        <h3>Download Excel dari Menu BOS &gt; Kepegawaian &gt; Cetak Presensi &gt; Rekap Presensi Unit Kerja &gt; Export Excel </h3>
                        <input type="file" onChange={handleFileChange} />
                    </Form>
                </Modal>
            );
        }
    },
);


export class absensi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTableLoading: false,
            filterData: [],
            auth: this.props.auth,
            isAsyncModalVisible: false,
            confirmLoading: false,
            asyncModalText: "Menu ini akan menambahkan rekap nilai seluruh pegawai",
            searchText: '',
            name: '',
            date: moment(),
            dateString: moment().format('MMMM YYYY'),
            isModalVisible: false,
            row_record: {},
            columns: [
                {
                    title: 'NIP Pegawai',
                    dataIndex: 'NIP',
                    key: 'NIP',
                    render: text => <a href="javascript:;">{text}</a>,
                    sorter: (a, b) => a.NIP - b.NIP,
                    // ...this.getColumnSearchProps('niplama'),
                },
                {
                    title: 'Nama Pegawai',
                    dataIndex: 'Nama',
                    key: 'Nama',
                    // render: text => <span>{text.nama}</span>,
                    sorter: (a, b) => a.Nama.localeCompare(b.Nama),
                    ...this.getColumnSearchProps('Nama'),

                },
                {
                    title: 'Jumlah Pulang Sebelum Waktu (PSW)',
                    dataIndex: 'PSW',
                    key: 'PSW',
                    // render: text => <span>{text.kjk}</span>,
                    sorter: (a, b) => a.PSW - b.PSW,
                },
                {
                    title: 'Jumlah Hadir Terlambat (HT)',
                    dataIndex: 'HT',
                    key: 'HT',
                    // render: text => <span>{text.kjk}</span>,
                    sorter: (a, b) => a.HT - b.HT,
                },
                


            ],
            data: []
        };
        this.openNotification = this.openNotification.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.updateData = this.updateData.bind(this);
        //search
        this.getColumnSearchProps = this.getColumnSearchProps.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleReset = this.handleReset.bind(this);
        //asyncModal
        this.showAsyncModal = this.showAsyncModal.bind(this);
        this.cancelAsyncModal = this.cancelAsyncModal.bind(this);
        this.okAsyncModal = this.okAsyncModal.bind(this);

        this.handleFileChange = this.handleFileChange.bind(this);
    }

    //excel
    handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const worksheet = workbook.Sheets['Rekap Presensi Satker'];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { range: 6 });

            // const columnNames = jsonData.shift(); // Remove and get the column names from the first row
            // const jsonOutput = jsonData.map(row => {
            //     const obj = {};
            //     columnNames.forEach((colName, index) => {
            //         obj[colName] = row[index];
            //     });
            //     return obj;
            // });

            // // Do something with the JSON data
            // console.log(jsonOutput);
            console.log(jsonData);
            console.log(this.state.date.format("YYYY-MM"));
        };

        reader.readAsArrayBuffer(file);
    }

    // Table Action
    edit(record) {
        console.log(record);
        this.setState({ row_record: record });
        this.setState({ name: record.niplama.nama });

        // let newData = this.state.data;
        // newData.filter(v => v.id === record.id)[0].niplama.nama = "tsubasa";
        // console.log("edit");
        // this.setState({ data: newData });

        this.setState({ isModalVisible: true });

    }

    delete(record) {
        console.log(record);
        let newData = this.state.data;

        newData = newData.filter(v => v.id !== record.id);
        console.log("delete");

        var self = this;
        let url = url_api + "/records/penilaian/" + record.id;
        axios.delete(url)
            .then(function (response) {
                // handle success
                console.log(response.data.records);
                self.setState({ data: newData });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
                self.openNotification();
            });

        // this.setState({ data: newData });
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
        let url = url_api + "/records/absensi?filter=tanggal_absen,eq,$tanggal_absensi";
        // let url = url_api + "/records/absensi";
        let tanggal_absensi = date.format('YYYY')+"-"+date.format('MM')+"-01";
        url = url.replace("$tanggal_absensi", tanggal_absensi);
        console.log(date.format('MM'));
        // axios.get('http://localhost/api.php/records/penilaian')
        self.setState({ isTableLoading: true });
        axios.get(url)
            .then(function (response) {
                // handle success
                console.log(response.data.records);
                let tempRecord = response.data.records;
                // tempRecord = tempRecord.filter(v =>  self.state.filterData.niplama.includes(v.niplama.niplama));
                // tempRecord = tempRecord.filter(v =>  v.niplama.niplama==="340057236");
                // tempRecord = tempRecord.filter(v =>  v.niplama.niplama===self.state.filterData[0].niplama);
                
                // tempRecord = tempRecord.filter(v =>  self.state.filterData.some(item => item.niplama === v.niplama.niplama));
                console.log("temp record", tempRecord); 
                // self.setState({ data: response.data.records, confirmLoading: false, isAsyncModalVisible: false });
                self.setState({ data: tempRecord, confirmLoading: false, isAsyncModalVisible: false });
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

    updateData(values, form) {
        var self = this;
        let url = url_api + "/records/penilaian/" + this.state.row_record.id;
        let status = "complete";
        for (const key of Object.keys(values)) {
            if (values[key] == 0 && key!=='jumlah_daily_kosong' && key!=='jumlah_tl_psw'&& key!=='skor_ketepatan_waktu'
            && key!=='skor_kesungguhan_kerja'&& key!=='skor_tl_psw'&& key!=='nilai_ckp_r') {
                status = "incomplete";
            }
        }
        values.status = status;

         //calculate skor_daily_activity
         let skor_daily_activity = 96;
         if(values.jumlah_daily_kosong==0){
             skor_daily_activity = 100;
         }
         if(values.jumlah_daily_kosong>=1&&values.jumlah_daily_kosong<=5){
             skor_daily_activity = 99;
         }
         if(values.jumlah_daily_kosong>=6&&values.jumlah_daily_kosong<=10){
             skor_daily_activity = 98;
         }
         if(values.jumlah_daily_kosong>=11&&values.jumlah_daily_kosong<=15){
             skor_daily_activity = 97;
         }
         values.skor_daily_activity = skor_daily_activity;

        // let nilai_ckp_r = 0;
        // nilai_ckp_r = values.skor_realisasi_pekerjaan * 0.3 + values.skor_ketepatan_waktu * 0.2 + values.skor_daily_activity * 0.2 +
        //     values.skor_tl_psw * 0.3;
        // values.nilai_ckp_r = nilai_ckp_r.toFixed(0);

        // calculate field rata_rata_kinerja 
        let rata_rata_kinerja = 0;
        rata_rata_kinerja = (values.skor_realisasi_pekerjaan/3 + values.skor_ketepatan_waktu*0 + values.skor_kualitas_pekerjaan/3 
        + values.skor_kesungguhan_kerja*0 + values.skor_daily_activity/3);
        values.rata_rata_kinerja = rata_rata_kinerja.toFixed(2);

        // calculate field skor_kinerja
        // let skor_kinerja = 98;
        // if(rata_rata_kinerja.toFixed(2)>=95){
        //     skor_kinerja = 100;
        // }
        // if(rata_rata_kinerja.toFixed(2)<95&&rata_rata_kinerja.toFixed(0)>=90){
        //     skor_kinerja = 99;
        // }
        let skor_kinerja = values.rata_rata_kinerja;
        values.skor_kinerja = skor_kinerja;

       

        //calculate skor tl& psw
        // let skor_tl_psw=95;
        // if(values.jumlah_tl_psw<=1){
        //     skor_tl_psw = 100;
        // }
        // if(values.jumlah_tl_psw>=2&&values.jumlah_tl_psw<=3){
        //     skor_tl_psw = 99;
        // }
        // if(values.jumlah_tl_psw>=4&&values.jumlah_tl_psw<=5){
        //     skor_tl_psw = 98;
        // }
        // if(values.jumlah_tl_psw>=6&&values.jumlah_tl_psw<=7){
        //     skor_tl_psw = 97;
        // }
        // if(values.jumlah_tl_psw>=8&&values.jumlah_tl_psw<=9){
        //     skor_tl_psw = 96;
        // }
        // values.skor_tl_psw = skor_tl_psw;

        //calculate ckor ckp-r 
        // let nilai_ckp_r = 0;
        // nilai_ckp_r = skor_kinerja*0.7 + skor_daily_activity*0.2 + skor_tl_psw*0.1;
        // values.nilai_ckp_r = nilai_ckp_r.toFixed(2);

        let nilai_total = 0;
        // nilai_total = skor_kinerja*0.7 + skor_daily_activity*0.2 + skor_tl_psw*0.1;
        nilai_total = skor_kinerja*0.7 + values.core_value*0.3;
        values.nilai_total = nilai_total.toFixed(2);

        values.nilai_ckp_r = values.nilai_total;


        axios.put(url, values)
            .then(function (response) {
                // handle success
                console.log("update data");
                console.log(response.data);

                let newData = self.state.data;
                // newData.filter(v => v.id === self.state.row_record.id)[0] = values;

                // newData.filter(v => v.id === self.state.row_record.id)[0].skor_realisasi_pekerjaan = values.skor_realisasi_pekerjaan;
                // newData.filter(v => v.id === self.state.row_record.id)[0].skor_ketepatan_waktu = values.skor_ketepatan_waktu;
                // newData.filter(v => v.id === self.state.row_record.id)[0].skor_daily_activity = values.skor_daily_activity;
                // newData.filter(v => v.id === self.state.row_record.id)[0].skor_tl_psw = values.skor_tl_psw;
                // newData.filter(v => v.id === self.state.row_record.id)[0].nilai_ckp_r = values.nilai_ckp_r;
                // newData.filter(v => v.id === self.state.row_record.id)[0].status = values.status;

                newData.filter(v => v.id === self.state.row_record.id)[0].skor_realisasi_pekerjaan = values.skor_realisasi_pekerjaan;
                newData.filter(v => v.id === self.state.row_record.id)[0].skor_ketepatan_waktu = values.skor_ketepatan_waktu;
                newData.filter(v => v.id === self.state.row_record.id)[0].skor_kualitas_pekerjaan = values.skor_kualitas_pekerjaan;
                newData.filter(v => v.id === self.state.row_record.id)[0].skor_kesungguhan_kerja = values.skor_kesungguhan_kerja;
                newData.filter(v => v.id === self.state.row_record.id)[0].rata_rata_kinerja = values.rata_rata_kinerja;
                newData.filter(v => v.id === self.state.row_record.id)[0].skor_kinerja = values.skor_kinerja;

                newData.filter(v => v.id === self.state.row_record.id)[0].jumlah_daily_kosong = values.jumlah_daily_kosong;
                newData.filter(v => v.id === self.state.row_record.id)[0].skor_daily_activity = values.skor_daily_activity;
                newData.filter(v => v.id === self.state.row_record.id)[0].jumlah_tl_psw = values.jumlah_tl_psw;
                newData.filter(v => v.id === self.state.row_record.id)[0].skor_tl_psw = values.skor_tl_psw;
                newData.filter(v => v.id === self.state.row_record.id)[0].nilai_ckp_r = values.nilai_ckp_r;
                newData.filter(v => v.id === self.state.row_record.id)[0].status = values.status;
                
                newData.filter(v => v.id === self.state.row_record.id)[0].core_value = values.core_value;
                newData.filter(v => v.id === self.state.row_record.id)[0].nilai_total = values.nilai_total;

                // console.log("newData :");
                // console.log(newData);

                self.setState({ data: newData });
                self.setState({ isModalVisible: false, confirmLoading: false });
                form.resetFields();

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

    // Modal action
    handleCancel = () => {
        const form = this.formRef.props.form;
        this.setState({ isModalVisible: false });
        form.resetFields();
    };

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            this.setState({ confirmLoading: true });
            this.updateData(values, form);

        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

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

            // record.niplama[dataIndex]
            record[dataIndex]
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
                textToHighlight={text.toString()}
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

    //asyncModal
    showAsyncModal() {
        this.setState({ isAsyncModalVisible: true });
    }

    cancelAsyncModal() {
        this.setState({ isAsyncModalVisible: false });
    }

    okAsyncModal() {
        var self = this;
        let url = url_refresh + "?month=$month&year=$year&nip=$nip";
        let nip = "";
        this.state.filterData.forEach(item => nip = nip+item.niplama+",");
        nip = nip.substring(0, nip.length-1);
        console.log(nip);
        url = url.replace("$month", this.state.date.format('M')).replace("$year", this.state.date.format('YYYY')).replace("$nip", nip);
        // axios.get('http://localhost/api.php/records/penilaian')

        this.setState({ confirmLoading: true });

        axios.get(url)
            .then(function (response) {
                // handle success
                console.log(response.data);
                // self.setState({ data: response.data.records });
                self.fetchData(self.state.date);
            })
            .catch(function (error) {
                // handle error
                // self.setState({asyncModalText: error});
                console.log(error);
            })
    }

    componentDidMount() {
        // this.fetchData(this.state.date);
        this.fetchPegawai();
    }

    render() {
        console.log(this.props);
        return (
            <div>
                {this.state.auth.id_level==4 ? (
                    <div>
                        <Alert
                        message="User dengan level 4 (Staff) tidak bisa melakukan penilaian CKP"
                        type="warning"
                        closable
                        />
                        <br/>
                    </div>
                  ) : (<div></div>
                )}
                <Card>
                    <MonthPicker format='MMMM YYYY' style={{ marginBottom: "10px" }} onChange={this.onChange} placeholder="Pilih bulan" />
                    {/* <Button type="primary" shape="round" icon="plus" size="small" style={{ float: 'right' }} onClick={this.showAsyncModal} disabled>Add Penilaian</Button> */}
                    {this.state.auth.id_level==4 ? (
                        <Button type="primary" shape="round" icon="plus" size="small" style={{ float: 'right' }} disabled>Add Penilaian</Button>
                        ) : (<Button type="primary" shape="round" icon="plus" size="small" style={{ float: 'right' }} onClick={this.showAsyncModal}>Import Absensi</Button>
                    )}
                    <h1 style={{ textAlign: 'center' }}>Rekap Absensi Pegawai {this.state.dateString}</h1>
                    <h1 style={{ textAlign: 'center' }}> {this.state.auth.nm_satker} </h1>
                    {/* <Table columns={this.state.columns} dataSource={this.state.data} rowKey={record => record.niplama.niplama} style={{ overflowY: 'auto' }} bordered loading={this.state.isTableLoading} /> */}
                    <Table columns={this.state.columns} dataSource={this.state.data} rowKey={record => record.NIP} style={{ overflowY: 'auto' }} bordered loading={this.state.isTableLoading} />
                    <CollectionCreateForm
                        title={"Import Absensi " + this.state.date.format("MMMM YYYY")}
                        wrappedComponentRef={this.saveFormRef}
                        // visible={this.state.isModalVisible}
                        // onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                        row_record={this.state.row_record}
                        // confirmLoading={this.state.confirmLoading}
                        handleFileChange={this.handleFileChange}

                        visible={this.state.isAsyncModalVisible}
                        onOk={this.okAsyncModal}
                        confirmLoading={this.state.confirmLoading}
                        onCancel={this.cancelAsyncModal}
                    />

                    {/* <Modal
                        title="Add Penilaian"
                        visible={this.state.isAsyncModalVisible}
                        onOk={this.okAsyncModal}
                        confirmLoading={this.state.confirmLoading}
                        onCancel={this.cancelAsyncModal}
                    >
                        <p>{this.state.asyncModalText} {this.state.dateString}</p>
                    </Modal> */}

                </Card>
            </div>
        )
    }
}

export default absensi
