import React, { Component } from 'react'
import { Card } from 'antd'

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
      </Card>
    )
  }
}

export default home
