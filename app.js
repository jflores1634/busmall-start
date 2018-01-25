'use strict';
// array to store all the goat instances
// make a constructor for goat objects
// create instances of goats
// access the image from the DOM, with document.getElementById
// will need to creat new instances and will probably need a prototype method for lab.
// need an to  addEventListener on the image
// callback function for addEventListener to randomly display a goat image.
// invoke the callback on the page load to show a random img.
// add a counter to track how many times an img has been viewed.

Mall.allMallImg = [];

Mall.totalClicks = 0;

Mall.lastDisplayed = [];

var sectionEl = document.getElementById('img-section');

var ulEl = document.getElementById('results');

// array to store the names for our chart labels
var names = [];


var imgVotes = [];

// constructor function
function Mall(filepath, name) {
  this.filepath = filepath;
  this.name = name;
  this.votes = 0;
  this.timesDisplayed = 0;
  Mall.allMallImg.push(this);
  names.push(this.name);
}

new Mall('img/bag.jpg', 'bag');
new Mall('img/banana.jpg', 'banana');
new Mall('img/bathroom.jpg', 'bathroom');
new Mall('img/boots.jpg', 'boots');
new Mall('img/bubblegum.jpg', 'gum');
new Mall('img/chair.jpg', 'chair');
new Mall('img/cthulhu.jpg', 'cthulhu');
new Mall('img/dog-duck.jpg', 'duck');
new Mall('img/dragon.jpg', 'dragon');
new Mall('img/pen.jpg', 'pen');
new Mall('img/pet-sweep.jpg', 'pet-sweep');
new Mall('img/scissors.jpg', 'scissors');
new Mall('img/shark.jpg', 'shark');
new Mall('img/sweep.png', 'sweep');
new Mall('img/tauntaun.jpg', 'tauntaun');
new Mall('img/unicorn.jpg', 'unicorn');
new Mall('img/usb.gif', 'usb');
new Mall('img/water-can.jpg', 'water-can');
new Mall('img/wine-glass.jpg', 'wine-glass');

var rightEl = document.getElementById('right');
var centerEl = document.getElementById('center');
var leftEl = document.getElementById('left');

// var imgEl = document.getElementById('random-img');
rightEl.addEventListener('click', randomImg);
centerEl.addEventListener('click', randomImg);
leftEl.addEventListener('click', randomImg);


function randomImg() {
  //random number generator to return a number between 0 and the length of the array (Mall.allMallImg)
  // var randomIndex = Math.floor(Math.random() * Mall.allMallImg.length);
  // USE THE RANDOM NUMBER TO DISPLAY A IMG AT THAT RANDOM INDEX

  var randomRight = Math.floor(Math.random() * Mall.allMallImg.length);
  var randomCenter = Math.floor(Math.random() * Mall.allMallImg.length);
  var randomLeft = Math.floor(Math.random() * Mall.allMallImg.length);

  // check to make sure each random number is unigue and not one of the previously displayed images.
  // with a while loop
  // if they are same, generate new random NUMBER
  // Condition 1: left and right are the same.
  // condition 2: left is in the lastDisplayed array
  // condition 3: right is in the lastDisplayed array
  // add another for the center.***

  while(randomLeft === randomRight || Mall.allMallImg.includes(randomLeft) || Mall.allMallImg.includes(randomRight)) {
    // console.log('duplicate was caught');
    randomLeft = Math.floor(Math.random() * Mall.allMallImg.length);
    randomRight = Math.floor(Math.random() * Mall.allMallImg.length);
  }

  rightEl.src = Mall.allMallImg[randomRight].filepath;
  rightEl.alt = Mall.allMallImg[randomRight].name;


  centerEl.src = Mall.allMallImg[randomCenter].filepath;
  centerEl.alt = Mall.allMallImg[randomCenter].name;


  leftEl.src = Mall.allMallImg[randomLeft].filepath;
  leftEl.alt = Mall.allMallImg[randomLeft].name;



  //increment the number of times each image was shown
  Mall.allMallImg[randomRight].timesDisplayed += 1;
  Mall.allMallImg[randomCenter].timesDisplayed += 1;
  Mall.allMallImg[randomLeft].timesDisplayed += 1;

  // keep track of these two as the previously displayed images
  // approach 1
  Mall.lastDisplayed = [];
  Mall.lastDisplayed.push(randomRight);
  Mall.lastDisplayed.push(randomCenter);
  Mall.lastDisplayed.push(randomLeft);
  // approach 2
  // Mall.lastDisplayed[0] = randomLeft;
  // Mall.lastDisplayed[1] = randomRight;
}

// define our handleClick functoin

function handleClick(e) {
  // track the total number of Clicks
  Mall.totalClicks += 1;

  // console.log(event.target.alt);
  // count the clicks on a specific img
  for(var i in Mall.allMallImg) {
    if(e.target.alt === Mall.allMallImg[i].name) {
      Mall.allMallImg[i].votes += 1;
    }
  }
  if(Mall.totalClicks > 24) {
    sectionEl.removeEventListener('click', handleClick);
    showResults();
    updateVotes();
    renderChart();
  } else {
    randomImg();
  }
}

function showResults() {
  for(var i in Mall.allMallImg) {
    var liEl = document.createElement('li');
    liEl.textContent = Mall.allMallImg[i].name + ' has ' + Mall.allMallImg[i].votes + ' votes and was displayed ' + Mall.allMallImg[i].timesDisplayed + ' times. ';
    ulEl.appendChild(liEl);
  }
}

// function to update the number of votes per image.
function updateVotes() {
  for(var i in Mall.allMallImg) {
   imgVotes[i] = Mall.allMallImg[i].votes;
  }
}

// function to render the chart to the screen,
function renderChart() {
  var context = document.getElementById('chart-img').getContext('2d');

  var chartColors = [ 'green', 'blue'];

  var imgChart = new Chart(context, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: 'Votes Per Image',
        data: imgVotes,
        backgroundColor: chartColors,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  })
}

sectionEl.addEventListener('click', handleClick);

// invoke the callback on the page load to show a random baby goat.
randomImg();
// will need 3 random img functions, 3 click trackets, 3 sectionEl addEventListener clicks
// need to get it to stop after 25 clicks, add colors to chart.
// add alert or by createElement text to inform the user that they have completed the survey and thank you.
