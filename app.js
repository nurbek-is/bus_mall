var allProducts = [];
var productList = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep','scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can','wine-glass'];
var jsonVotes;
// var percentages = [];


//constructor function
function Product (name, path)  {
  this.name = name;
  this.path = path;
  this.timesShown = 0;
  this.count = 0;
  this.perc = 0;
  allProducts.push (this);
};
// instantiating new item
for (var i = 0; i < productList.length; i++) {
  var pathStr = 'images/' + productList[i] + '.jpg'
  console.log (productList [i])
  var product = new Product (productList[i], pathStr);
}



///Object Literal

var tracker = {
  totalClicks: 0,
  images: document.getElementById('productDisplay'),
  imgLeft: document.getElementById('img1'),
  imgMid: document.getElementById('img2'),
  imgRight: document.getElementById('img3'),
  buttonResults: document.getElementById('buttonResults'),
  buttonReset : document.getElementById('buttonReset'),
  //timesShown : 0,
  data: {
    labels: productList, /// this is X-AXIS
    datasets: [ {
      label: 'Votes',   ///  this is Y-AXIS
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: []
    }
    ]
  },
  // random number method
  getRandomNumber: function () {
    return Math.floor (Math.random ()* allProducts.length)
  },
}

////****Picture Uniqueness and Assigning ID and Source FUNCTION ***///

function displayImages() {
var leftObj = tracker.getRandomNumber ();

var midObj = tracker.getRandomNumber ();
var rightObj = tracker.getRandomNumber ();

while (leftObj === midObj || leftObj === rightObj || midObj === rightObj) {
    midObj = tracker.getRandomNumber ();
    rightObj = tracker.getRandomNumber ();
  
}
  tracker.imgLeft.src = allProducts [leftObj].path;
  tracker.imgLeft.id = allProducts[leftObj].name;
  allProducts[leftObj].timesShown +=1;
  tracker.imgMid.src = allProducts [midObj].path;
  tracker.imgMid.id = allProducts[midObj].name;
  allProducts[midObj].timesShown +=1;
  tracker.imgRight.src = allProducts [rightObj].path;
  tracker.imgRight.id = allProducts [rightObj].name;
  allProducts[rightObj].timesShown +=1;

 console.log (allProducts[leftObj].name + ' was shown ' + allProducts[leftObj].timesShown + ' times');
 console.log (allProducts[midObj].name + ' was shown ' + allProducts[midObj].timesShown + ' times');
 console.log (allProducts[rightObj].name + ' was shown ' + allProducts[rightObj].timesShown + ' times');
}



function percClicked () {
    for (var index in allProducts) {
      allProducts[index].perc = Math.round(allProducts[index].count / allProducts[index].timesShown * 100);
      console.log (allProducts[index].count);
      return (allProducts[index].perc);
      console.log (allProducts[index].perc);
    }
  }
percClicked ();


////COUNTING CLICKS FOR EACH ITEM OF ARRAY FUNCTION ***///

function countClicks (elementId) {
  for (idx in allProducts) {
    if (elementId === allProducts[idx].name) {
      allProducts [idx].count+=1;
      tracker.totalClicks+=1;
      tracker.data.datasets[0].data[idx] = allProducts[idx].count;
      jsonVotes = JSON.stringify (tracker.data.datasets[0].data);
      localStorage.setItem ('storedVotes', jsonVotes)
      console.log (jsonVotes)
      console.log(allProducts[idx].name + ' has ' + allProducts[idx].count + ' clicks');
      console.log('Total clicks so far is ' + tracker.totalClicks);
      // localStorage.clear ();
    }
  }
}

////****SWITCHING THE HIDDEN BUTTON TO ON AND OFF FUNCTION  *** ///

function showButton () {
  tracker.buttonResults.hidden = false;
  tracker.buttonResults.addEventListener ('click', function (){
  tracker.buttonResults.hidden = true;
  tracker.buttonReset.hidden = false;
  displayResults ();
});
tracker.buttonReset.addEventListener ('click', function () {
  tracker.buttonReset.hidden = true;
  location.reload ();
});
}
////****PRINTING VOTE RESULTS TO THE PAGE *** ///

function displayResults () {
    var chrtId = document.getElementById('mycanvas').getContext('2d');
      var myChart = new Chart (chrtId, {
        type:'bar',
        data:tracker.data,
      });
    }


////****  CHECKING IF CLICKS ARE ON THE IMAGES & CLICKED 15 TIMES AND INVOKING countClicks, showButton FUNCTION  *** ///

function onClick() {

  var target = event.target.id;
  if (target === tracker.imgLeft.id || target === tracker.imgMid.id || target === tracker.imgRight.id) {
    if ((tracker.totalClicks + 1) % 15 === 0) {
      countClicks(target);
      tracker.images.removeEventListener('click', onClick);
      showButton();
    } else {
      countClicks(target);
      displayImages();
    }
  } else {
    alert ('That\'s is not an image, Click on the image'); // to test click near the image but not on the image
  }
}

if (localStorage.storedVotes) {
  tracker.data.datasets[0].data = JSON.parse(localStorage.getItem ('storedVotes'));
  for (index in allProducts) {
    allProducts [index].count = tracker.data.datasets[0].data[index];
  }
};

displayImages();

tracker.images.addEventListener('click', onClick);
