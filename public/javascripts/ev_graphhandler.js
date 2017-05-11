/*jshint esversion: 6*/
const github = new GitHubApi("https://api.github.com/users/");
//const Chart = require('chart.js');
function appendInfo(user) {
    github.getUserInfo(user).then((response) => {
        infoSelector(response);

    });
}
const datasets = [];
function createDataset(user,data,color){

  return   {
    label: user.username,
    backgroundColor: color,
    //borderColor: color,
    data: data
  };

}
function radarChart(datasetArray){
  var radarChart = document.getElementById("radarChart");

  var radarData = {
    labels: ["HTML", "JavaScript", "CSS", "Typescript", "Python"],
    datasets: datasetArray,
    options: {
        responsive: false,

      }

};
var myRadarChart = new Chart(radarChart, {
  type: 'radar',
  data: radarData,
});
}
function dataFilter(response){
  const languages = ["HTML",  "JavaScript", "CSS", "Typescript","Python"];
  let languageData = {};
  let userLanguages = Object.keys(response);
  let languageValues = Object.values(response);
  for (var i = 0; i < languages.length; i++) {
    if (userLanguages.indexOf(languages[i])  === -1) {
      languageData[languages[i]]= 0;
    }else{
      languageData[languages[i]]= response[languages[i]];
    }
  }
  console.log(languageData);
  return languageData;
}
$(document).ready(() => {
  let allData = [];
    newData.members.forEach(function(member){
      github.getRepoLanguages(member.username).then((response)=>{
        let filteredData = dataFilter(response);
        let filteredValues = Object.values(filteredData);
        console.log("values: "+ filteredValues);
        var DataSet = createDataset(member, filteredValues, "rgba(238,110,115, 0.4)");
        allData.push(DataSet);
        //console.log(allData);
        radarChart(allData);
      });
    });
    //radarChart();

});
