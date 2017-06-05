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
    borderColor: color,
    data: data
  };

}
function radarChart(datasetArray){
  var radarChart = document.getElementById("radarChart");

  var radarData = {

    backgroundColor: "#fff",


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
  //console.log(languageData);
  return languageData;
}
function documentReady(){
  return new Promise((resolve, reject)=>{
      var promiseArray = newData.members.map(function(member){
        return github.getRepoLanguages(member.username).then((response)=>{
          let filteredData = dataFilter(response);
          let filteredValues = Object.values(filteredData);
          //console.log("values: "+ filteredValues);
          return createDataset(member, filteredValues, "rgba(238,110,115, 0.4)");
        });
      });
      Promise.all(promiseArray).then(allData => resolve(allData));
  });
}
$(document).ready(() => {
  documentReady().then((response)=>{
    radarChart(response);
  });
    //radarChart();

});
