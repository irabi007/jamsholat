function jam() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);

    var date = today.getDate();
    var month = today.getMonth();
    var montharr = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];
    month = montharr[month];
    var year = today.getFullYear();

    var day = today.getDay();
    var dayarr = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
    ];
    day = dayarr[day];

    document.getElementById("jam").innerHTML = h + ":" + m + ":" + s;
    document.getElementById("hari").innerHTML = day + ",";
    document.getElementById("tgl").innerHTML = date + " " + month + " " + year;

    var t = setTimeout(jam, 1000);
}
