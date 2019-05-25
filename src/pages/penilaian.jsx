import React, { Component } from 'react'
import { Card, DatePicker, Table, Divider, Tag, notification, Modal, InputNumber, Form, Button, Input, Icon } from 'antd'
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import 'moment/locale/id'

const { MonthPicker } = DatePicker;
const axios = require('axios');

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form, title, row_record } = this.props;
            const { getFieldDecorator } = form;

            return (
                <Modal
                    visible={visible}
                    title={title}
                    okText="Save"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        {/* <Form.Item label="Title">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(<Input />)}
                        </Form.Item> */}
                        <Form.Item label="Skor Realisasi Pekerjaan">
                            {getFieldDecorator('skor_realisasi_pekerjaan', {
                                rules: [{ required: true, message: 'Silahkan input Skor Realisasi Pekerjaan!' }],
                                initialValue: row_record.skor_realisasi_pekerjaan,
                            })(<InputNumber min={0} max={100} autoFocus={true} />)}
                        </Form.Item>
                        <Form.Item label="Skor Ketepatan Waktu">
                            {getFieldDecorator('skor_ketepatan_waktu', {
                                rules: [{ required: true, message: 'Silahkan input Skor Ketepatan Waktu!' }],
                                initialValue: row_record.skor_ketepatan_waktu,
                            })(<InputNumber min={0} max={100} />)}
                        </Form.Item>
                        <Form.Item label="Skor Daily Activity">
                            {getFieldDecorator('skor_daily_activity', {
                                rules: [{ required: true, message: 'Silahkan input Skor Daily Activity' }],
                                initialValue: row_record.skor_daily_activity,
                            })(<InputNumber min={0} max={100} />)}
                        </Form.Item>
                        <Form.Item label="Skor TL & PSW">
                            {getFieldDecorator('skor_tl_psw', {
                                rules: [{ required: true, message: 'Silahkan input Skor TL & PSW!' }],
                                initialValue: row_record.skor_tl_psw,
                            })(<InputNumber min={0} max={100} />)}
                        </Form.Item>
                        {/* <Form.Item label="Nilai CKP R">
                            {getFieldDecorator('nilai_ckp_r', {
                                rules: [{ required: true, message: 'Silahkan input Nilai CKP R!' }],
                                initialValue: row_record.nilai_ckp_r,
                            })(<InputNumber min={0} max={100} />)}
                        </Form.Item> */}
                    </Form>
                </Modal>
            );
        }
    },
);


export class penilaian extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            name: '',
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
                    title: 'ID Satker',
                    dataIndex: 'niplama',
                    key: 'id_satker',
                    render: text => <span>{text.id_satker}</span>,
                    sorter: (a, b) => a.niplama.id_satker - b.niplama.id_satker,
                },
                {
                    title: 'Skor Realisasi Pekerjaan',
                    dataIndex: 'skor_realisasi_pekerjaan',
                    key: 'skor_realisasi_pekerjaan',
                    sorter: (a, b) => a.skor_realisasi_pekerjaan - b.skor_realisasi_pekerjaan,
                },
                {
                    title: 'Skor Ketepatan Waktu',
                    dataIndex: 'skor_ketepatan_waktu',
                    key: 'skor_ketepatan_waktu',
                    sorter: (a, b) => a.skor_ketepatan_waktu - b.skor_ketepatan_waktu,
                },
                {
                    title: 'Skor Daily Activity',
                    dataIndex: 'skor_daily_activity',
                    key: 'skor_daily_activity',
                    sorter: (a, b) => a.skor_daily_activity - b.skor_daily_activity,
                },
                {
                    title: 'Skor TL & PSW',
                    dataIndex: 'skor_tl_psw',
                    key: 'skor_tl_psw',
                    sorter: (a, b) => a.skor_tl_psw - b.skor_tl_psw,
                },
                {
                    title: 'Nilai CKP R',
                    dataIndex: 'nilai_ckp_r',
                    key: 'nilai_ckp_r',
                    sorter: (a, b) => a.nilai_ckp_r - b.nilai_ckp_r,
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
                    filters: [{ text: 'complete', value: 'complete' }, { text: 'incomplete', value: 'incomplete' }],
                    onFilter: (value, record) => record.status.indexOf(value) === 0,
                },
                {
                    title: 'Action',
                    key: 'action',
                    render: (text, record) => (
                        <span>
                            <a href="javascript:;" onClick={() => this.edit(record)}>Edit</a>
                            {/* <Button type="primary" icon="search" /> */}
                            <Divider type="vertical" />
                            {/* <Button type="primary" icon="search" /> */}
                            <a href="javascript:;" onClick={() => this.delete(record)}>Delete</a>
                        </span>
                    ),
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

        this.setState({ data: newData });
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
            this.setState({ dateString: dateString });
            console.log(date.format('M'));
            this.fetchData(date);
        }
    }

    fetchData(date) {
        var self = this;
        let url = "http://localhost/api.php/records/penilaian?filter=bulan_ckp,eq,$month&filter=tahun_ckp,eq,$year&join=master_pegawai";
        url = url.replace("$month", date.format('M')).replace("$year", date.format('YYYY'));
        // axios.get('http://localhost/api.php/records/penilaian')
        axios.get(url)
            .then(function (response) {
                // handle success
                console.log(response.data.records);
                self.setState({ data: response.data.records });
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

    updateData(values) {
        var self = this;
        let url = "http://localhost/api.php/records/penilaian/" + this.state.row_record.id;
        let status = "complete";
        for (const key of Object.keys(values)) {
            if (values[key] == 0) {
                status = "incomplete";
            }
        }
        values.status = status;

        let nilai_ckp_r = 0;
        nilai_ckp_r = values.skor_realisasi_pekerjaan * 0.3 + values.skor_ketepatan_waktu * 0.2 + values.skor_daily_activity * 0.2 +
            values.skor_tl_psw * 0.3;
        values.nilai_ckp_r = nilai_ckp_r.toFixed(0);

        axios.put(url, values)
            .then(function (response) {
                // handle success
                console.log("update data");
                console.log(response.data);

                let newData = self.state.data;
                newData.filter(v => v.id === self.state.row_record.id)[0].skor_realisasi_pekerjaan = values.skor_realisasi_pekerjaan;
                newData.filter(v => v.id === self.state.row_record.id)[0].skor_ketepatan_waktu = values.skor_ketepatan_waktu;
                newData.filter(v => v.id === self.state.row_record.id)[0].skor_daily_activity = values.skor_daily_activity;
                newData.filter(v => v.id === self.state.row_record.id)[0].skor_tl_psw = values.skor_tl_psw;
                newData.filter(v => v.id === self.state.row_record.id)[0].nilai_ckp_r = values.nilai_ckp_r;
                newData.filter(v => v.id === self.state.row_record.id)[0].status = values.status;

                console.log("newData :");
                console.log(newData);

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
            this.updateData(values);



            form.resetFields();
            this.setState({ isModalVisible: false });
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

    render() {
        return (
            <Card>
                <MonthPicker format='MMMM YYYY' style={{ marginBottom: "10px" }} onChange={this.onChange} placeholder="Pilih bulan" />
                <Button type="primary" shape="round" icon="plus" size="small" style={{ float: 'right' }}>Add Penilaian</Button>
                <h1 style={{ textAlign: 'center' }}>Rekap Penilaian Pegawai {this.state.dateString}</h1>
                <Table columns={this.state.columns} dataSource={this.state.data} rowKey={record => record.niplama.niplama} />
                <CollectionCreateForm
                    title={"Edit Nilai " + this.state.name}
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.isModalVisible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    row_record={this.state.row_record}
                />

            </Card>
        )
    }
}

export default penilaian
