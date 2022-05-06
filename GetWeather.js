// 天気予報データの処理

// 都市のデータ
/*
データ構造
    cityName: htmlで使用するid
    displayName: 表示する文字列
    lat: 緯度(Google Mapの左の数値)
    lon: 経度(Google Mapの右の数値)
*/

let localDatas = [
    {
        cityName: "Sapporo",
        displayName: "札幌",
        lat: 43.07579931130803,
        lon: 141.35486686261726,
    },
    {
        cityName: "Sendai",
        displayName: "仙台",
        lat: 38.28154933433309,
        lon: 140.86705410133413,
    },
    {
        cityName: "Tokyo",
        displayName: "東京",
        lat: 35.688126732985125,
        lon: 139.76939345848703,
    },
    {
        cityName: "Kanazawa",
        displayName: "金沢",
        lat: 36.580664669560086,
        lon: 136.65969926711716,
    },
    {
        cityName: "Nagoya",
        displayName: "名古屋",
        lat: 35.257094766996595,
        lon: 136.91392774706733,
    },
    {
        cityName: "Osaka",
        displayName: "大阪",
        lat: 34.724827141227856,
        lon: 135.51354211321944,
    },
    {
        cityName: "Okayama",
        displayName: "岡山",
        lat: 34.68943160430332,
        lon: 133.92754628644,
    },
    {
        cityName: "Fukuoka",
        displayName: "福岡",
        lat: 33.56735024709979,
        lon: 130.36474036426256,
    },
];

// スライドアニメーションのイージングの計算
let slideAnime = `@keyframes slideAnime
                 { 0% { top : -100%;}
                 ${(100 / localDatas.length) * 0.1}% { top: 0;}
                 ${(100 / localDatas.length) * 0.9}% { top: 0;}
                 ${100 / localDatas.length}% { top: 100%;}
                 100% { top: 100%;}`;

let css = document
    .getElementById("css")
    .insertAdjacentHTML("afterbegin", slideAnime);

let weatherList = document.getElementById("weather-list");
localDatas.forEach((city, idx) => {
    fetch(
        // 天気APIリクエスト
        "https://api.open-meteo.com/v1/forecast?latitude=" +
            city.lat +
            "&longitude=" +
            city.lon +
            "&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo"
    )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // console.log(data);
            responsedWeather = data.daily;
            weatherList.innerHTML += `<div class="weather" id=${city.cityName}>
                                        <div class="text-data">
                                            <div class="local-label">${
                                                city.displayName
                                            }</div>
                                                <div class="weather-values">
                                                    <div class="min-temp">${
                                                        Math.round(
                                                            responsedWeather
                                                                .temperature_2m_min[1]
                                                        ) + "℃"
                                                    }</div>
                                                    <div class="max-temp">${
                                                        Math.round(
                                                            responsedWeather
                                                                .temperature_2m_max[1]
                                                        ) + "℃"
                                                    }</div>
                                                </div>
                                        </div>
                                        <img
                                            class="weather-icon"
                                            id=${"img-" + city.cityName}
                                            src=${
                                                "./icons/0" +
                                                (responsedWeather
                                                    .weathercode[1] %
                                                    10) +
                                                ".png"
                                            }
                                            alt="Weather icon"
                                        />
                                    </div>`;
            // 数に応じたCSSの調整
            weatherBlock = document.getElementById(city.cityName);
            weatherBlock.style.animation = `slideAnime ${
                localDatas.length * 4
            }s ease infinite`;
            weatherBlock.style.animationDelay = 4 * idx + "s";
        });
});
