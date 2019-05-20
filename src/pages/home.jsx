import React, { Component } from 'react'
import { Card, Row, Col } from 'antd'
import logo from '../logo_work.svg';

export class home extends Component {
  render() {
    return (
      <Card>
        <h1>
          APEL CAKEP
        </h1>
        <Row>
          <Col span={16}>
          <p>
            Aplikasi ini merupakan alat bantu penilaian kinerja pegawai secara bulanan. 
            Nilai dihitung berdasarkan komponen Realisasi Pekerjaan, Ketepatan Waktu Pengumpulan CKP, 
            Kepatuhan Pengisian Daily Activity dan Skoring Terlambat dan Cepat Pulang Pegawai Bulanan.
            </p>
          </Col>
          {/* <Col span={8}>col-12</Col> */}
        </Row>
        
        <img src={logo} className="App-logo" alt="logo" />
      </Card>
    )
  }
}

export default home
