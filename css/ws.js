function WS() {
    this.latitude = -3.964663;
    this.longitude = 122.5067898;
    this.Ikhtiyat = 2;
    this.setLatLng = function (lat, lng) {
        this.latitude = lat;
        this.longitude = lng;
    };
    this.calc_toTime = function (num, retarray) {
        var jam = Math.floor(num);
        var vmn = (num - jam) * 60;
        var mnt = Math.floor(vmn);
        var dtk = Math.round((vmn - mnt) * 60);
        var ret = [jam, mnt, dtk];
        if (retarray) return ret;
        return ret.join(":");
    };
    this.timeToString = function (num) {
        var arr = this.calc_toTime(num, true);
        arr[0] += "";
        arr[1] += "";
        if (arr[0].length == 1) arr[0] = "0" + arr[0];
        if (arr[1].length == 1) arr[1] = "0" + arr[1];

        // melakukan pembulatan keatas jika detik diatas 30
        if (arr[2] >= 30) {
            var m = parseInt(arr[1]) + 1;
            if (m == 60) {
                arr[0] = (parseInt(arr[0]) + 1).toString();
                m = "00";
            }
            if (m < 10) {
                m = "0" + m.toString();
            }
            arr[1] = m.toString();
        }

        return arr[0] + ":" + arr[1];
    };

    // this.timeToString = function (num) {
    //     var arr = this.calc_toTime(num, true);
    //     arr[0] += "";
    //     arr[1] += "";
    //     arr[2] += "";
    //     if (arr[0].length == 1) arr[0] = "0" + arr[0];
    //     if (arr[1].length == 1) arr[1] = "0" + arr[1];
    //     if (arr[2].length == 1) arr[2] = "0" + arr[2];
    //     return arr.join(":");
    // };

    this.jd = function (thn, bln, tgl, tz) {
        if (bln <= 2) {
            bln += 12;
            thn--;
        }
        var UT = 12 - tz;
        // Nilai 1 Tahun = 365.25 Hari ( 366 = 1x kabisat, 365 = 3x )
        // Nilai 1 Bulan = 30.6001 Hari
        // Alghoritma dapat dibaca di: http://www.gmat.unsw.edu.au/snap/gps/gps_survey/chap2/214.htm
        var jd =
            Math.floor(365.25 * thn) +
            Math.floor(30.6001 * (bln + 1)) +
            tgl +
            UT / 24 +
            1720981.5;
        return jd;
    };
    this.JD2000 = this.jd(2000, 1, 1, 0);
    this.jd_jumlahHari = function (jd_from, jd_to) {
        return jd_to - jd_from;
    };

    this.jd_jumlahAbad = function (jumlahHari) {
        /* Jumlah Hari dalam 1 Abad = 36525 Hari */
        return jumlahHari / 36525;
    };
    this.elip_ratarata = function (T) {
        var g_awal = 280.46 + 36000.77129 * T;
        var g = g_awal;
        if (g_awal > 360) {
            var cg = 360 * Math.floor(g_awal / 360);
            g -= cg;
        }
        return g;
    };
    var M = {
        deg2rad: function (d) {
            return (d / 180) * Math.PI;
        },
        rad2deg: function (d) {
            return d * 57.29577951308232;
        },
        sin: function (d) {
            return Math.sin(M.deg2rad(d));
        },
        cos: function (d) {
            return Math.cos(M.deg2rad(d));
        },
        tan: function (d) {
            return Math.tan(M.deg2rad(d));
        },
        acos: function (r) {
            return M.rad2deg(Math.acos(r));
        },
        asin: function (r) {
            return M.rad2deg(Math.asin(r));
        },
        atan: function (r) {
            return M.rad2deg(Math.atan(r));
        },
    };
    this.elip_bujur = function (T) {
        var b_awal = 357.528 + 35999.05096 * T;
        var c_b = 360 * Math.floor(b_awal / 360);
        var b = b_awal - c_b;
        var lo = this.elip_ratarata(T) + 1.915 * M.sin(b) + 0.02 * M.sin(2 * b);
        return lo;
    };
    this.elip_kemiringan = function (n) {
        return 23.439 - 0.0000004 * n;
    };
    this.cari_ra0 = function (L0, E) {
        var _L0 = L0;
        var _E = E;
        var cos_L0 = M.cos(_L0);

        var Ra01 = M.atan((M.sin(_L0) * M.cos(_E)) / cos_L0);
        var Ra02 = Ra01;
        if (cos_L0 >= 0) Ra02 += 360;
        else Ra02 += 180;
        var CRa = 360 * Math.floor(Ra02 / 360);
        var Ra0 = Ra02 - CRa;
        return Ra0;
    };
    this.cari_deklinasi = function (L0, E) {
        var d0 = M.asin(M.sin(L0) * M.sin(E));
        return d0;
    };
    this.cari_meridianpas = function (Ra0, g) {
        var MP = 12 - (g - Ra0) / 15;
        if (MP < 0) MP += 24;
        else if (MP > 24) MP -= 24;
        return MP;
    };
    this.calc_kwd = function (tz, longitude) {
        var KWD = tz - longitude / 15;
        return KWD;
    };
    this.calcWaktu = function (d0, latitude, KWD, MP, Z) {
        var t = 0;
        if (Z != 0) {
            var _Z = Math.abs(Z);
            var cosZ =
                (M.cos(_Z) - M.sin(d0) * M.sin(latitude)) /
                (M.cos(d0) * M.cos(latitude));
            t = M.acos(cosZ) / 15;
            if (Z < 0) t = 0 - t;
        }
        var Waktu = MP + t + KWD + this.Ikhtiyat / 60;
        return Waktu;
    };
    this.get = function (thn, bln, tgl, gmt) {
        if (!gmt) gmt = 8;
        var JD = this.jd(thn, bln, tgl, gmt);
        var n = this.jd_jumlahHari(this.JD2000, JD);
        var T = this.jd_jumlahAbad(n);

        var g = this.elip_ratarata(T);

        var Lo = this.elip_bujur(T);

        var E = this.elip_kemiringan(n);

        var Ra0 = this.cari_ra0(Lo, E);

        var d0 = this.cari_deklinasi(Lo, E);

        var MP = this.cari_meridianpas(Ra0, g);

        var KWD = this.calc_kwd(gmt, this.longitude);

        var posMatahari = {
            zuhur: 0,
            ashar: M.atan(M.tan(Math.abs(d0 - this.latitude)) + 1),
            maghrib: 91,
            isya: 108,
            subuh: -110,
            imsak: -18,
            terbit: -90,
            dhuha: 45,
        };

        var WS = {
            subuh: this.timeToString(
                this.calcWaktu(d0, this.latitude, KWD, MP, posMatahari.subuh)
            ),
            imsak: this.timeToString(
                this.calcWaktu(d0, this.latitude, KWD, MP, posMatahari.imsak)
            ),
            terbit: this.timeToString(
                this.calcWaktu(d0, this.latitude, KWD, MP, posMatahari.terbit)
            ),
            dhuha: this.timeToString(
                this.calcWaktu(d0, this.latitude, KWD, MP, posMatahari.dhuha)
            ),
            zuhur: this.timeToString(
                this.calcWaktu(d0, this.latitude, KWD, MP, posMatahari.zuhur)
            ),
            ashar: this.timeToString(
                this.calcWaktu(d0, this.latitude, KWD, MP, posMatahari.ashar)
            ),
            maghrib: this.timeToString(
                this.calcWaktu(d0, this.latitude, KWD, MP, posMatahari.maghrib)
            ),
            isya: this.timeToString(
                this.calcWaktu(d0, this.latitude, KWD, MP, posMatahari.isya)
            ),
            terbit: this.timeToString(
                this.calcWaktu(d0, this.latitude, KWD, MP, posMatahari.terbit)
            ),
        };
        console.log(WS);
        return WS;
    };
}
