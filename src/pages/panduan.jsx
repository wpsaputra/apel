import React, { Component } from 'react';
import { Card } from 'antd';
import {url_panduan} from '../constant/constant';
// import video_login from '../video/login.webm';
import video_login from '../video/login.gif';
import video_penilaian from '../video/penilaian.gif';
import video_rekap from '../video/rekap.gif';

export class panduan extends Component {
  render() {
    return (
      <Card>
        <div style={{width:'100%', maxWidth: '900px'}}>
          <h1>FAQ</h1>
          <hr></hr>
          <strong>Q: Apa tujuan APEL CAKEP?</strong>
          <p>A: Aplikasi ini merupakan alat bantu penilaian kinerja pegawai secara bulanan. Nilai dihitung berdasarkan 3 (tiga) komponen yaitu
             Komponen Kinerja, Komponen Kepatuhan Pengisian Daily Activity dan Komponen Absensi (Terlambat dan Cepat Pulang Pegawai) secara Bulanan.
             Bagi pejabat struktural Eselon III, Komponen Kinerja terdiri dari pengukuran atas 5 (lima) hal, yaitu Realisasi Pekerjaan, Ketepatan Waktu, Kualitas Pekerjaan, Kesungguhan Kerja dan Administrasi. Sedangkan bagi pejabat struktural Eselon IV, fungsional tertentu, serta fungsional umum, Komponen Kinerja terdiri dari pengukuran atas 4 (empat) hal, yaitu Realisasi Pekerjaan, Ketepatan Waktu, Kualitas Pekerjaan, dan Kesungguhan Kerja.</p>
          <br/>
          <strong>Q: Apa saja fitur-fitur APEL CAKEP?</strong>
          <p>A: (1) Pembuatan penilaian ckp berdasarkan komponen perhitungan. (2) Rekapitulasi nilai per pegawai dan per tahun. 
            (3) FAQ.</p>
          <br/>
          <strong>Q: Browser apa yang disupport oleh APEL CAKEP?</strong>
          <p>A: Browser terbaru (evergreen) firefox dan chrome disuport oleh APEL CAKEP, sedangkan internet explorer dan browser versi lawas tidak disupport oleh APEL CAKEP.</p>
          <br/>
          <strong>Q: Bagaimana tata cara untuk pelaporan bug aplikasi dan request penambahan fitur?</strong>
          <p>A: Silahkan menghubungi via email <strong>kpg7400@bps.go.id</strong>.</p>
          <br/>
          <strong>Q: Apakah ada panduan tata cara penggunaan aplikasi?</strong>
          <p>A: Panduan penggunaan aplikasi dapat di download pada <a href={url_panduan} target="_blank" >link</a> berikut</p>
          <br/>
          
          <h1>Login</h1>
          <hr></hr>
          <p>Berikut merupakan tampilan panduan tata cara login. Login menggunakan username dan password daily activity.</p>
          <img src={video_login} className="App-logo" alt="gif_login" style={{position: 'relative', width:'100%', maxWidth: '664.747px'}}/>
          <br/>
          <br/>
          
          <h1>Penilaian</h1>
          <hr></hr>
          <p>Berikut merupakan tampilan panduan tata cara pengisian form penilaian.</p>
          <img src={video_penilaian} className="App-logo" alt="gif_penilaian" style={{position: 'relative', width:'100%', maxWidth: '664.747px'}}/>
          <br/>
          <br/>

          <h1>Rekapitulasi</h1>
          <hr></hr>
          <p>Berikut merupakan tampilan panduan tata cara untuk mendownload rekapitulasi pengisian APEL CAKEP.</p>
          <img src={video_rekap} className="App-logo" alt="gif_rekap" style={{position: 'relative', width:'100%', maxWidth: '664.747px'}}/>
          <br/>
          <br/>
          {/* <video autoplay loop muted playsinline>
            <source src={video_login} type="video/webm"/>
          </video> */}
        </div>

      </Card>
    )
  }
}

export default panduan
