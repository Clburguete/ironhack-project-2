/*jshint esversion: 6*/
const github = new GitHubApi("https://api.github.com/users/");
//const Chart = require('chart.js');
function appendInfo(user) {
    github.getUserInfo(user).then((response) => {
        infoSelector(response);

    });
}

function drawChart(label, data) {
    let chart = document.getElementById("myChart");
    //chart.width(200);
    var myDoughnutChart = new Chart(chart, {
        type: 'doughnut',
        data: {
            labels: label,
            datasets: [{
                data: data,
                backgroundColor: [
                    '#6E352C',
                    "#CF5230",
                    "#F59A44",
                    "#E3C598",
                    "#8A6E64",
                    "#6E612F"
                ],
                hoverBackgroundColor: [
                    "#FF6344",
                    "#36A2EB",
                    "#FF6384",
                    "#FFCE56"
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: false,

            scale: {
                display: false,
            }
        }
    });
}

function infoSelector(info) {
    let keys = Object.keys(info);

    keys.forEach(function(l) {
        console.log(l + " " + info[l]);
        switch (l) {
            case "name":
                $('#repositories').append(`<h5>${l}</h5> <p class='user-info'>${info[l]}</p>`);

                break;
            case "html_url":
                $('#repositories').append(`<h5>${l}</h5> <p class='user-info'>${info[l]}</p>`);

                break;
            case 'public_repos':
                $('#repositories').append(`<h5>${l}</h5> <p class='user-info'>${info[l]}</p>`);

                break;
        }
    });
}
$(document).ready(() => {
    $('.userinfo').on('click', (e) => {
        const user = $(e.currentTarget).prev().html();

        $('#myChart').remove();
        appendInfo(user);

        $('#repositories').append(' <canvas id="myChart" width="300" height="300"></canvas>');
        let promiseArray =
            github.getRepoLanguages(user).then((response) => {
                let languageLabel = Object.keys(response);
                let languageData = Object.values(response);
                drawChart(languageLabel, languageData);
            });
    });
});
