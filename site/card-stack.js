var stack, images = new Array(), index = 0;

const path = require('path');
const fs = require('fs');
//joining path of directory
const directoryPath = path.join(__dirname, 'in');
//passsing directoryPath and callback function



document.addEventListener('DOMContentLoaded', function () {
  fs.readdir(directoryPath, function (err, files) {
      //handling error
      if (err) {
          return console.log('Unable to scan directory: ' + err);
      }

      images = files;

        stack = window.swing.Stack();

      for (var i = 0; i < 5; i++) {
        AddCard();
      }

      stack.on('throwout', function (e) {
          console.log(e.target.innerText || e.target.textContent, 'has been thrown out of the stack to the', e.throwDirection, 'direction.');

          if (e.throwDirection == swing.Direction.RIGHT) {
            fs.rename(path.join(directoryPath, path.basename(e.target.children[0].src)), path.join( path.join(__dirname, 'right'), path.basename(e.target.children[0].src)), console.log);
          }

          if (e.throwDirection == swing.Direction.LEFT) {
            fs.rename(path.join(directoryPath, path.basename(e.target.children[0].src)), path.join( path.join(__dirname, 'left'), path.basename(e.target.children[0].src)), console.log);
          }

          AddCard()
          e.target.parentNode.removeChild(e.target)
      });
  });


});




document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
    }
    else if (e.keyCode == '40') {
        // down arrow
    }
    else if (e.keyCode == '37') {
       stack.getCard(document.querySelector(".stack").childNodes[document.querySelector(".stack").childNodes.length-2]).throwOut(-1, 0);
    }
    else if (e.keyCode == '39') {
       stack.getCard(document.querySelector(".stack").childNodes[document.querySelector(".stack").childNodes.length-2]).throwOut(1, 0);
    }

}

function AddCard() {
  if (!images[index]) return;

  var card = document.createElement("li");
  console.log(images[index]);
  card.innerHTML = `<img src='${path.join(directoryPath, images[index])}'></img>`;
  index++;
  document.querySelector(".stack").prepend(card);
  stack.createCard(card);


  document.querySelector(".stack").childNodes[0].before(card);
}
