import React, { Component } from 'react'
import { Card } from 'antd'
import logo from '../logo_work.svg';

export class home extends Component {
  render() {
    return (
      <Card>
        <h1>
          Apel Sicakep
        </h1>
        <p>
          Aplikasi ini diperuntukan sebagai alat penilaian kinerja pegawai dalam waktu 1 bulan. 
          Nilai dihitung dari penilaian atasan, absensi, serta ketepatan pengisian daily activity.
        </p>
        <img src={logo} className="App-logo" alt="logo" />
      </Card>
    )
  }
}

export default home
