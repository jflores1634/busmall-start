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

function Mall(filepath, name) {
  this.filepath = filepath;
  this.name = name;
  Mall.allMallImg.push(this);
}



new Mall('img/bag.jpg', '');
new Mall('img/banana.jpg', '');
new Mall('img/bathroom.jpg', '');
new Mall('img/boots.jpg', '');
new Mall('img/bubblegum.jpg', '');
new Mall('img/chair.jpg', '');
new Mall('img/cthulhupg', '');
new Mall('img/dog-duck.jpg', '');
new Mall('img/dragon.jpg', '');
new Mall('img/pen.jpg', '');
new Mall('img/pet-sweep.jpg', '');
new Mall('img/scissors.jpg', '');
new Mall('img/shark.jpg', '');
new Mall('img/sweep.png', '');
new Mall('img/tauntaun.jpg', '');
new Mall('img/unicorn.jpg', '');
new Mall('img/usb.gif', '');
new Mall('img/water-can.jpg', '');
new Mall('img/wine-glass.jpg', '');

var imgEl = document.getElementById('random-img');

imgEl.addEventListener('click', randomImg);
imgEl.addEventListener('click', randomImg);
imgEl.addEventListener('click', randomImg);


function randomImg() {
  //random number generator to return a number between 0 and the length of the array (Mall.allMallImg)
  var randomIndex = Math.floor(Math.random() * Mall.allMallImg.length);
  // USE THE RANDOM NUMBER TO DISPLAY A IMG AT THAT RANDOM INDEX
  imgEl.src = Mall.allMallImg[randomIndex].filepath;
}

// invoke the callback on the page load to show a random baby goat.
randomImg();
