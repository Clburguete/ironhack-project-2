/*jshint esversion: 6*/
const github = new GitHubApi("https://api.github.com/users/");
//const Chart = require('chart.js');
function appendInfo(user) {
    github.getUserInfo(user).then((response) => {
        infoSelector(response);

    });

}
function doughnutChart(label, data) {
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
                    "#6E612F",
                    '#D6CFC9',
                    '#C2C290',
                    '#4A572C',
                    '#803018',
                    '#E34819'
                ],
                hoverBackgroundColor: [
                    "#FF6344",
                    "#36A2EB",
                    "#FF6384",
                    "#FFCE56",
                    "#E3C598",
                    "#8A6E64",
                    "#6E612F",
                    '#D6CFC9',
                    "#F59A44",
                    "#6E612F",
                    '#D6CFC9'
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
            case "login":
                $('.col-xs-10 col-xs-offset-1').append(`<h5>Username</h5> <h5 class='user-info'>@${info[l]}</h5>`);

                break;
            case "html_url":
                $('.col-xs-10 col-xs-offset-1').append(`<h5>${l}</h5> <p class='user-info'>${info[l]}</p>`);

                break;
            case 'public_repos':
                $('.col-xs-10 col-xs-offset-1').append(`<h5>${l}</h5> <p class='user-info'>${info[l]}</p>`);

                break;
        }
    });
}
$(document).ready(() => {


        const user = $('#username').html();
        console.log(user);
        $('#myChart').remove();
        appendInfo(user);

        $('#userinfo').append(' <canvas id="myChart" width="300" height="300"></canvas>');
        let promiseArray =
            github.getRepoLanguages(user).then((response) => {
              console.log(response);
                let languageLabel = Object.keys(response);
                let languageData = Object.values(response);
                doughnutChart(languageLabel, languageData);


            });

});
