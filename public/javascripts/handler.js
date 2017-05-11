/*jshint esversion: 6*/
const github = new GitHubApi("https://api.github.com/users/");
//const Chart = require('chart.js');
function appendInfo(user) {
    github.getUserInfo(user).then((response) => {
        infoSelector(response);

    });
}
function radarChart(){
  var radarChart = document.getElementById("radarChart");
  var myRadarChart = new Chart(radarChart, {
    type: 'radar',
    data: radarData,
});
  var radarData = {
    labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
    datasets: [
        {
            label: "My First dataset",
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            pointBackgroundColor: "rgba(255,99,132,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,99,132,1)",
            data: [28, 48, 40, 19, 96, 27, 100]
        },

    ],
    options: {
      responsive: false,
      scale: {
          display: false,
      }
    },
};
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
            case "login":
                $('#userinfo').append(`<h5>Username</h5> <p class='user-info'>@${info[l]}</p>`);

                break;
            case "html_url":
                $('#userinfo').append(`<h5>${l}</h5> <p class='user-info'>${info[l]}</p>`);

                break;
            case 'public_repos':
                $('#userinfo').append(`<h5>${l}</h5> <p class='user-info'>${info[l]}</p>`);

                break;
        }
    });
}
$(document).ready(() => {
    //radarChart();
    $('.userinfo').on('click', (e) => {
          $('#userinfo').empty();
        const user = $(e.currentTarget).prev().html();
        console.log("llega");
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
});
