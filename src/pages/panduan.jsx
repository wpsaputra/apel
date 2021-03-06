import React, { Component } from 'react';
import { Card } from 'antd';
import {url_panduan} from '../constant/constant';

export class panduan extends Component {
  render() {
    return (
      <Card>
        <h1>FAQ</h1>
        <hr></hr>
        <strong>Q: Apa tujuan APEL CAKEP?</strong>
        <p>A: Aplikasi ini merupakan alat bantu penilaian kinerja pegawai secara bulanan. Nilai dihitung berdasarkan komponen Realisasi Pekerjaan, 
          Ketepatan Waktu Pengumpulan CKP, Kepatuhan Pengisian Daily Activity dan Skoring Terlambat dan Cepat Pulang Pegawai Bulanan.</p>
        <br/>
        <strong>Q: Apa saja fitur-fitur APEL CAKEP?</strong>
        <p>A: (1) Pembuatan penilaian ckp berdasarkan komponen perhitungan. (2) Rekapitulasi nilai per pegawai dan per tahun. 
          (3) Registrasi administrator.</p>
        <br/>
        <strong>Q: Browser apa yang disupport oleh APEL CAKEP?</strong>
        <p>A: Browser terbaru (evergreen) firefox dan chrome disuport oleh APEL CAKEP, sedangkan internet explorer dan browser versi lawas tidak disupport oleh APEL CAKEP.</p>
        <br/>
        <strong>Q: Apakah ada panduan tata cara penggunaan aplikasi?</strong>
        <p>A: Panduan penggunaan aplikasi dapat di download pada <a href={url_panduan} target="_blank" >link</a> berikut</p>
        <br/>
      </Card>
    )
  }
}

export default panduan
