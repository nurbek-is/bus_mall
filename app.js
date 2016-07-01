var allProducts = [];
var productList = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep','scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can','wine-glass'];

//constructor function
function Product (name, path)  {
  this.name = name;
  this.path = path;
  this.count = 0;
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
  tracker.imgMid.src = allProducts [midObj].path;
  tracker.imgMid.id = allProducts[midObj].name;
  tracker.imgRight.src = allProducts [rightObj].path;
  tracker.imgRight.id = allProducts [rightObj].name;
}

////COUNTING CLICKS FOR EACH ITEM OF ARRAY FUNCTION ***///

function countClicks (elementId) {
  for (idx in allProducts) {
    if (elementId === allProducts[idx].name) {
      allProducts [idx].count+=1;
      tracker.totalClicks+=1;
      console.log(allProducts[idx].name + ' has ' + allProducts[idx].count + ' clicks');
      console.log('Total clicks so far is ' + tracker.totalClicks);
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
      var ulEl = document.createElement ('ul')

      for (obj in allProducts)  {
        var liElOne = document.createElement ('li');
            liElOne.textContent = allProducts[obj].name.charAt(0).toUpperCase () + allProducts [obj].name.slice(1) + ' received ' + allProducts [obj].count + ' votes.';
        ulEl.appendChild(liElOne);
      }
      var liElTwo = document.createElement ('li');
        liElTwo.textContent = 'Total Votes: ' + tracker.totalClicks;
            ulEl.appendChild (liElTwo);
        document.getElementById('results').appendChild (ulEl);
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
displayImages();

tracker.images.addEventListener('click', onClick);
