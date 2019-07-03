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
            Aplikasi ini merupakan alat bantu penilaian kinerja pegawai secara bulanan. Nilai dihitung berdasarkan 3 (tiga) komponen yaitu 
            Komponen Kinerja, Komponen Kepatuhan Pengisian Daily Activity dan Komponen Absensi (Terlambat dan Cepat Pulang Pegawai) secara Bulanan.
            Bagi pejabat struktural Eselon III, Komponen Kinerja terdiri dari pengukuran atas 5 (lima) hal, yaitu Realisasi Pekerjaan, Ketepatan Waktu, Kualitas Pekerjaan, Kesungguhan Kerja dan Administrasi. Sedangkan bagi pejabat struktural Eselon IV, fungsional tertentu, serta fungsional umum, Komponen Kinerja terdiri dari pengukuran atas 4 (empat) hal, yaitu Realisasi Pekerjaan, Ketepatan Waktu, Kualitas Pekerjaan, dan Kesungguhan Kerja.
            </p>
          </Col>
          {/* <Col span={8}>col-12</Col> */}
        </Row>
        <img src={logo} className="App-logo" alt="logo" style={{position: 'relative', width:'100%', maxWidth: '664.747px'}}/>
      </Card>
    )
  }
}

export default home
