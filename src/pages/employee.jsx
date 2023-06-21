import React, { Component } from 'react'
import { Card, DatePicker, Table, Divider, Tag, notification, Modal, InputNumber, Form, Button, Input, Icon, Alert } from 'antd'
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import 'moment/locale/id'
import {url_api, url_refresh, url_pegawai} from '../constant/constant';
import { PDFExport } from '@progress/kendo-react-pdf';

const { MonthPicker } = DatePicker;
const axios = require('axios');

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form, title, row_record, confirmLoading } = this.props;
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
                        <h3>Apakah akan menjadikan pegawai sebagai best employee?</h3>
                    </Form>
                </Modal>
            );
        }
    },
);


export class employee extends Component {
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
                    dataIndex: 'niplama',
                    key: 'niplama',
                    render: text => <a href="javascript:;">{text.niplama}</a>,
                    sorter: (a, b) => a.niplama.niplama - b.niplama.niplama,
                    // ...this.getColumnSearchProps('niplama'),
                },
                {
                    title: 'Nama Pegawai',
                    dataIndex: 'niplama',
                    key: 'nama',
                    // render: text => <span>{text.nama}</span>,
                    sorter: (a, b) => a.niplama.nama.localeCompare(b.niplama.nama),
                    ...this.getColumnSearchProps('nama'),

                },
                {
                    title: 'Nilai Total/Nilai CKP-R',
                    dataIndex: 'nilai_total',
                    key: 'nilai_total',
                    sorter: (a, b) => a.nilai_total - b.nilai_total,
                    defaultSortOrder: 'descend',
                },

                {
                    title: 'Jumlah Pulang Sebelum Waktu (PSW)',
                    dataIndex: 'PSW',
                    key: 'PSW',
                    render: text => <span>{text==null?"Data absensi belum diimport":text}</span>,
                    sorter: (a, b) => a.PSW - b.PSW,
                },
                {
                    title: 'Jumlah Hadir Terlambat (HT)',
                    dataIndex: 'HT',
                    key: 'HT',
                    // render: text => <span>{text.kjk}</span>,
                    render: text => <span>{text==null?"Data absensi belum diimport":text}</span>,
                    sorter: (a, b) => a.HT - b.HT,
                },
                {
                    title: 'Best Employee',
                    key: 'best_employee',
                    dataIndex: 'best_employee',
                    render: best_employee => (
                        <span>
                            <Tag style={{ display: best_employee === 0 ? 'none' : 'flex'}} color={best_employee === 0 ? 'volcano' : 'green'} >
                                {best_employee === 0 ? "": "Best Employee"}
                            </Tag>
                        </span>
                    ),
                    filters: [{ text: 'Non Best Employee', value: 0 }, { text: 'Best Employee', value: 1 }],
                    onFilter: (value, record) => record.best_employee === value,
                },
                {
                    title: 'Action',
                    key: 'action',
                    render: (text, record) => (
                        <span>
                            <a href="javascript:;" onClick={() => this.edit(record)}>Nominate</a>
                            {/* <Button type="primary" icon="search" /> */}
                            <Divider type="vertical" />
                            {/* <Button type="primary" icon="search" /> */}
                            <a href="javascript:;" onClick={() => this.delete(record)}>Delete</a>
                        </span>
                    ),
                },
            ],
            data: [],
            absen: [],
            columns2: [
                {
                    title: 'NIP Pegawai',
                    dataIndex: 'niplama',
                    key: 'niplama',
                    render: text => <a href="javascript:;">{text.niplama}</a>,
                    sorter: (a, b) => a.niplama.niplama - b.niplama.niplama,
                    // ...this.getColumnSearchProps('niplama'),
                },
                {
                    title: 'Nama Pegawai',
                    dataIndex: 'niplama',
                    key: 'nama',
                    // render: text => <span>{text.nama}</span>,
                    sorter: (a, b) => a.niplama.nama.localeCompare(b.niplama.nama),
                    ...this.getColumnSearchProps('nama'),

                },
                {
                    title: 'Nilai Total/Nilai CKP-R',
                    dataIndex: 'nilai_total',
                    key: 'nilai_total',
                    sorter: (a, b) => a.nilai_total - b.nilai_total,
                    defaultSortOrder: 'descend',
                },

                {
                    title: 'Jumlah Pulang Sebelum Waktu (PSW)',
                    dataIndex: 'PSW',
                    key: 'PSW',
                    render: text => <span>{text==null?"Data absensi belum diimport":text}</span>,
                    sorter: (a, b) => a.PSW - b.PSW,
                    defaultSortOrder: 'ascend',
                },
                {
                    title: 'Jumlah Hadir Terlambat (HT)',
                    dataIndex: 'HT',
                    key: 'HT',
                    // render: text => <span>{text.kjk}</span>,
                    render: text => <span>{text==null?"Data absensi belum diimport":text}</span>,
                    sorter: (a, b) => a.HT - b.HT,
                    defaultSortOrder: 'ascend',
                },
                {
                    title: 'Best Employee',
                    key: 'best_employee',
                    dataIndex: 'best_employee',
                    render: best_employee => (
                        <span>
                            <Tag style={{ display: best_employee === 0 ? 'none' : 'flex'}} color={best_employee === 0 ? 'volcano' : 'green'} >
                                {best_employee === 0 ? "": "Best Employee"}
                            </Tag>
                        </span>
                    ),
                    filters: [{ text: 'Non Best Employee', value: 0 }, { text: 'Best Employee', value: 1 }],
                    onFilter: (value, record) => record.best_employee === value,
                },
                // {
                //     title: 'Action',
                //     key: 'action',
                //     render: (text, record) => (
                //         <span>
                //             <a href="javascript:;" onClick={() => this.edit(record)}>Nominate</a>
                //             {/* <Button type="primary" icon="search" /> */}
                //             <Divider type="vertical" />
                //             {/* <Button type="primary" icon="search" /> */}
                //             <a href="javascript:;" onClick={() => this.delete(record)}>Delete</a>
                //         </span>
                //     ),
                // },
            ],
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
        var self = this;
        let url = url_api + "/records/penilaian/" + record.id;

        let values = {
            best_employee: 0
        };
        console.log(values);
        values.best_employee = 0;
        console.log(values);


        axios.put(url, values)
            .then(function (response) {
                // handle success
                console.log("update data");
                console.log(response.data);

                let newData = self.state.data;
                // newData.filter(v => v.id === self.state.row_record.id)[0] = values;

                newData.filter(v => v.id === record.id)[0].best_employee = values.best_employee;

                self.setState({ data: newData });
                // self.setState({ isModalVisible: false, confirmLoading: false });
                // form.resetFields();

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
                self.openNotification();
            });
        



        //ete
        // console.log(record);
        // let newData = this.state.data;

        // newData = newData.filter(v => v.id !== record.id);
        // console.log("delete");

        // var self = this;
        // let url = url_api + "/records/penilaian/" + record.id;
        // axios.delete(url)
        //     .then(function (response) {
        //         // handle success
        //         console.log(response.data.records);
        //         self.setState({ data: newData });
        //     })
        //     .catch(function (error) {
        //         // handle error
        //         console.log(error);
        //     })
        //     .finally(function () {
        //         // always executed
        //         self.openNotification();
        //     });

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

    async fetchData(date) {
        var self = this;
        let url = url_api + "/records/absensi?filter=tanggal_absen,eq,$tanggal_absen";
        url = url.replace("$tanggal_absen", date.format('YYYY-MM')+"-01");
        let absensi = await axios.get(url);
        absensi = absensi.data.records;
        console.log(absensi);
        
        
        url = url_api + "/records/penilaian?filter=bulan_ckp,eq,$month&filter=tahun_ckp,eq,$year&join=master_pegawai";
        url = url.replace("$month", date.format('M')).replace("$year", date.format('YYYY'));
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
                
                tempRecord = tempRecord.filter(v =>  self.state.filterData.some(item => item.niplama === v.niplama.niplama));
                console.log("temp record", tempRecord); 
                // self.setState({ data: response.data.records, confirmLoading: false, isAsyncModalVisible: false });

                let merged = tempRecord.map(a => Object.assign(a, absensi.find(b => b.NIP == a.niplama.niplama)));
                merged = merged.filter(v=>v.PSW==0||v.PSW==null);
                merged = merged.filter(v=>v.HT==0||v.PSW==null);
                console.log(merged);


                // self.setState({ data: tempRecord, confirmLoading: false, isAsyncModalVisible: false });
                self.setState({ data: merged, confirmLoading: false, isAsyncModalVisible: false });
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
        
        // url2
        // url = url_api + "/records/absensi?filter=tanggal_absen,eq,$tanggal_absen";
        // url = url.replace("$tanggal_absen", date.format('YYYY-MM')+"-01");
        // let response = await axios.get(url);
        // console.log(response.data.records);

        // axios.get('http://localhost/api.php/records/penilaian')
        // axios.get(url)
        //     .then(function (response) {
        //         // handle success
        //         console.log(response.data.records);
        //         let tempRecord = response.data.records;
        //         // tempRecord = tempRecord.filter(v =>  self.state.filterData.niplama.includes(v.niplama.niplama));
        //         // tempRecord = tempRecord.filter(v =>  v.niplama.niplama==="340057236");
        //         // tempRecord = tempRecord.filter(v =>  v.niplama.niplama===self.state.filterData[0].niplama);
                
        //         // tempRecord = tempRecord.filter(v =>  self.state.filterData.some(item => item.niplama === v.niplama.niplama));
        //         console.log("temp record", tempRecord); 
        //         // self.setState({ data: response.data.records, confirmLoading: false, isAsyncModalVisible: false });
        //         self.setState({ absen: tempRecord });
        //     })
        //     .catch(function (error) {
        //         // handle error
        //         console.log(error);
        //     })
    }

    fetchPegawai() {
        var self = this;
        // let url = url_pegawai + "?id_lvl=$id_lvl&id_org=$id_org&id_satker=$id_satker";
        // let url = url_api + "?id_satker=$id_satker";
        let url = url_api + "/records/master_pegawai?filter=id_satker,eq,$id_satker";;
        url = url.replace("$id_lvl", this.state.auth.id_level).replace("$id_org", this.state.auth.id_org).replace("$id_satker", this.state.auth.id_satker);
        // axios.get('http://localhost/api.php/records/penilaian')
        console.log(url);
        axios.get(url)
            .then(function (response) {
                // handle success
                // console.log(response.data);
                console.log(response.data.records);
                // self.setState({ filterData: response.data });
                self.setState({ filterData: response.data.records });
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

        values = {
            best_employee: 1
        };
        console.log(values);
        values.best_employee = 1;
        console.log(values);


        axios.put(url, values)
            .then(function (response) {
                // handle success
                console.log("update data");
                console.log(response.data);

                let newData = self.state.data;
                // newData.filter(v => v.id === self.state.row_record.id)[0] = values;

                newData.filter(v => v.id === self.state.row_record.id)[0].best_employee = values.best_employee;

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

    exportPDFWithComponent = () => {
        this.pdfExportComponent.save();
    }

    componentDidMount() {
        // this.fetchData(this.state.date);
        this.fetchPegawai();
    }

    render() {
        console.log(this.props);
        // if(!(this.state.auth.niplama=="340016171"||this.state.auth.niplama=="340012043")){
        //     let col = this.state.columns;
        //     // col = col;
        //     col.splice(6, 1);
        //     console.log(col);
        //     this.setState({columns: col});

        // }
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
                    {/* {this.state.auth.id_level==4 ? (
                        <Button type="primary" shape="round" icon="plus" size="small" style={{ float: 'right' }} disabled>Add Penilaian</Button>
                        ) : (<Button type="primary" shape="round" icon="plus" size="small" style={{ float: 'right' }} onClick={this.showAsyncModal}>Add Penilaian</Button>
                    )} */}

                    <Button type="primary" shape="round" icon="download" size="small" style={{ float: 'right' }} onClick={this.exportPDFWithComponent} >Download Pdf</Button>
                    <PDFExport ref={(component) => this.pdfExportComponent = component} paperSize="A4" landscape scale={0.8} margin="2cm" >
                        <h1 style={{ textAlign: 'center' }}>Rekap Best Employee {this.state.dateString}</h1>
                        <h1 style={{ textAlign: 'center' }}> {this.state.auth.nm_satker} </h1>
                        <Table pagination={false} columns={(!(this.state.auth.niplama=="340016171"||this.state.auth.niplama=="340012043"))?this.state.columns2:this.state.columns} dataSource={this.state.data} rowKey={record => record.niplama.niplama} style={{ overflowY: 'auto' }} bordered loading={this.state.isTableLoading} />
                        <CollectionCreateForm
                            title={"Edit Nilai " + this.state.name}
                            wrappedComponentRef={this.saveFormRef}
                            visible={this.state.isModalVisible}
                            onCancel={this.handleCancel}
                            onCreate={this.handleCreate}
                            row_record={this.state.row_record}
                            confirmLoading={this.state.confirmLoading}
                        />

                    </PDFExport>

                    <Modal
                        title="Add Penilaian"
                        visible={this.state.isAsyncModalVisible}
                        onOk={this.okAsyncModal}
                        confirmLoading={this.state.confirmLoading}
                        onCancel={this.cancelAsyncModal}
                    >
                        <p>{this.state.asyncModalText} {this.state.dateString}</p>
                    </Modal>

                </Card>
            </div>
        )
    }
}

export default employee
