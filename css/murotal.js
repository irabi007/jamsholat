// Jenis Audio
var audioZuhur = new Audio("assets/sholat/murotal/arrahman10m.mp3");
var audioAshar = new Audio("assets/sholat/murotal/murotal-1.mp3");
var audioSubuh = new Audio("assets/sholat/murotal/alwaqiah.mp3");
var audioTahrim = new Audio("assets/sholat/murotal/tahrim.mp3");
var audioMaghrib = new Audio("assets/sholat/murotal/arrahman10m.mp3");
var audioIsya = new Audio("assets/sholat/murotal/almulk.mp3");

var timesubuh = 10;
var timezuhur = 10;
var timeashar = 10;
var timemaghrib = 10;
var timeisya = 10;
var timetahrim = 5;

var totalTimeSubuh = timesubuh + timetahrim;
var totalTimeZuhur = timezuhur + timetahrim;
var totalTimeAshar = timeashar + timetahrim;
var totalTimeMaghrib = timemaghrib + timetahrim;
var totalTimeIsya = timeisya + timetahrim;

// cek waktu putaraudio
setInterval(function () {
    // ------------------------- Ambil Waktu Sholat -------------------------------
    // var waktu = document.getElementById('jam').innerHTML;

    var subuhElem = document.getElementById("subuh").innerHTML;
    var zuhurElem = document.getElementById("zuhur").innerHTML;
    var asharElem = document.getElementById("ashar").innerHTML;
    var maghribElem = document.getElementById("maghrib").innerHTML;
    var isyaElem = document.getElementById("isya").innerHTML;

    // var waktusubuh = subuhElem.innerHTML + ':00';
    var waktu_subuh = subuhElem + ":00";
    var waktu_zuhur = zuhurElem + ":00";
    var waktu_ashar = asharElem + ":00";
    var waktu_maghrib = maghribElem + ":00";
    var waktu_isya = isyaElem + ":00";

    // ------------------------- buat waktu putar murotal -------------------------------
    var now = new Date();

    //waktu zuhur
    var zuhurTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        zuhurElem.split(":")[0],
        zuhurElem.split(":")[1]
    );
    zuhurTime.setMinutes(zuhurTime.getMinutes() - totalTimeZuhur);
    var zuhurPlay =
        zuhurTime.getHours().toString().padStart(2, "0") +
        ":" +
        zuhurTime.getMinutes().toString().padStart(2, "0") +
        ":00";

    //waktu subuh
    var subuhTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        subuhElem.split(":")[0],
        subuhElem.split(":")[1]
    );
    subuhTime.setMinutes(subuhTime.getMinutes() - totalTimeSubuh);
    var subuhPlay =
        subuhTime.getHours().toString().padStart(2, "0") +
        ":" +
        subuhTime.getMinutes().toString().padStart(2, "0") +
        ":00";

    //waktu ashar
    var asharTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        asharElem.split(":")[0],
        asharElem.split(":")[1]
    );
    asharTime.setMinutes(asharTime.getMinutes() - totalTimeAshar);
    var asharPlay =
        asharTime.getHours().toString().padStart(2, "0") +
        ":" +
        asharTime.getMinutes().toString().padStart(2, "0") +
        ":00";

    //waktu maghrib
    var maghribTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        maghribElem.split(":")[0],
        maghribElem.split(":")[1]
    );
    maghribTime.setMinutes(maghribTime.getMinutes() - totalTimeMaghrib);
    var maghribPlay =
        maghribTime.getHours().toString().padStart(2, "0") +
        ":" +
        maghribTime.getMinutes().toString().padStart(2, "0") +
        ":00";

    //waktu isya
    var isyaTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        isyaElem.split(":")[0],
        isyaElem.split(":")[1]
    );
    isyaTime.setMinutes(isyaTime.getMinutes() - totalTimeIsya);
    var isyaPlay =
        isyaTime.getHours().toString().padStart(2, "0") +
        ":" +
        isyaTime.getMinutes().toString().padStart(2, "0") +
        ":00";

    // ------------------------- Cek Waktu sholat dengan waktu sekarng -------------------------------
    var now = new Date();
    var jam = now.getHours().toString().padStart(2, "0");
    var menit = now.getMinutes().toString().padStart(2, "0");
    var detik = now.getSeconds().toString().padStart(2, "0");
    var jamSekarang = jam + ":" + menit + ":" + detik;

    if (subuhPlay == jamSekarang) {
        playMurotalSubuh();
        setTimeout(playTahrim, timesubuh * 60 * 1000);
    }
    if (zuhurPlay == jamSekarang) {
        playMurotalZuhur();
        setTimeout(playTahrim, timezuhur * 60 * 1000);
    }
    if (asharPlay == jamSekarang) {
        playMurotalAzhar();
        setTimeout(playTahrim, timeashar * 60 * 1000);
    }
    if (maghribPlay == jamSekarang) {
        playMurotalMaghrib();
        setTimeout(playTahrim, timemaghrib * 60 * 1000);
    }
    if (isyaPlay == jamSekarang) {
        playMurotalIsya();
        setTimeout(playTahrim, timeisya * 60 * 1000);
    }
}, 1000);

// fungsu Pemutar murotal

function playMurotalSubuh() {
    audioSubuh.play();
    var playTime = timesubuh * 60 * 1000; // 10 menit dalam milidetik
    var start = Date.now();
    audioSubuh.addEventListener("ended", function () {
        var elapsed = Date.now() - start;
        if (elapsed < playTime) {
            audioSubuh.play();
        } else {
            audioIsPlaying = false;
        }
    });
    setTimeout(function () {
        audioSubuh.pause();
        audioIsPlaying = false;
    }, playTime);
}

function playMurotalZuhur() {
    audioZuhur.play();
    var playTime = timezuhur * 60 * 1000; // 10 menit dalam milidetik
    var start = Date.now();
    audioZuhur.addEventListener("ended", function () {
        var elapsed = Date.now() - start;
        if (elapsed < playTime) {
            audioZuhur.play();
        } else {
            audioIsPlaying = false;
        }
    });
    setTimeout(function () {
        audioZuhur.pause();
        audioIsPlaying = false;
    }, playTime);
}

function playMurotalAzhar() {
    audioAshar.play();
    var playTime = timeashar * 60 * 1000; // 10 menit dalam milidetik
    var start = Date.now();
    audioAshar.addEventListener("ended", function () {
        var elapsed = Date.now() - start;
        if (elapsed < playTime) {
            audioAshar.play();
        } else {
            audioIsPlaying = false;
        }
    });
    setTimeout(function () {
        audioAshar.pause();
        audioIsPlaying = false;
    }, playTime);
}

function playMurotalMaghrib() {
    audioMaghrib.play();
    var playTime = timemaghrib * 60 * 1000; // 10 menit dalam milidetik
    // var playTime = 30000; // 10 menit dalam milidetik
    var start = Date.now();
    audioMaghrib.addEventListener("ended", function () {
        var elapsed = Date.now() - start;
        if (elapsed < playTime) {
            audioMaghrib.play();
        } else {
            audioIsPlaying = false;
        }
    });
    setTimeout(function () {
        audioMaghrib.pause();
        audioIsPlaying = false;
    }, playTime);
}

function playMurotalIsya() {
    audioIsya.play();
    var playTime = timeisya * 60 * 1000; // 10 menit dalam milidetik
    var start = Date.now();
    audioIsya.addEventListener("ended", function () {
        var elapsed = Date.now() - start;
        if (elapsed < playTime) {
            audioIsya.play();
        } else {
            audioIsPlaying = false;
        }
    });
    setTimeout(function () {
        audioIsya.pause();
        audioIsPlaying = false;
    }, playTime);
}

function playTahrim() {
    audioTahrim.play();
    var playTime = timetahrim * 60 * 1000; // 10 menit dalam milidetik
    var start = Date.now();
    audioTahrim.addEventListener("ended", function () {
        var elapsed = Date.now() - start;
        if (elapsed < playTime) {
            audioTahrim.play();
        } else {
            audioIsPlaying = false;
        }
    });
    setTimeout(function () {
        audioTahrim.pause();
        audioIsPlaying = false;
    }, playTime);
}
