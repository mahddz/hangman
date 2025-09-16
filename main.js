//letters
const letters = "abcdefghijklmnopqrstuvwxyz";
//get array from letters
let lettersArray = Array.from(letters);
//select letters container
let lettersContainer = document.querySelector(".letters");
//generate letters
lettersArray.forEach(letter => {
    //create span
    let span = document.createElement("span");
    //create letter text node
    let theLetter = document.createTextNode(letter);
    //append text node to span
    span.appendChild(theLetter);
    //add class to span
    span.className = 'letter-box';
    //append span to letters container
    lettersContainer.appendChild(span);
});

//object of words + categories
const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["prestige", "inception", "parasite", "interstellar", "whiplash", "memento", "coco", "up"],
    people: ["albert einstein", "cleopatra", "mahatma gandhi", "abraham lincoln", "mother teresa"],
    countries: ["syria", "iraq", "jordan", "lebanon", "egypt", "bahrain", "qatar", "algeria"]
};

//get random property
let allKeys = Object.keys(words);

let randomPropNumber = Math.floor(Math.random() * allKeys.length);

let randomPropName = allKeys[randomPropNumber];

//get random word
let randomPropValue = words[randomPropName];


let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

let randomWord = randomPropValue[randomValueNumber];

document.querySelector(".game-info .category span").innerHTML = randomPropName ;
//select letters guess container
let lettersGuessContainer = document.querySelector(".letters-guess");
//convert random word to array
let lettersAndSpace = Array.from(randomWord);

//create spans depend on word
lettersAndSpace.forEach(letter => {
    //create empty span
    let emptySpan = document.createElement("span");
    //check if letter is space
    if (letter === " ") {
        emptySpan.className = "space";
    }
    //append empty span to letters guess container
    lettersGuessContainer.appendChild(emptySpan);
});

let guessSpans = document.querySelectorAll(".letters-guess span");



// set wrong attempts
let wrongAttempts = 0;
let theDraw = document.querySelector(".hangeman-draw");


//handlingg clincking on letters 
document.addEventListener("click", (e) => {
    let theStatus = false;

    if (e.target.className === 'letter-box') {
        e.target.classList.add("clicked");

        let theClickedLetter = e.target.innerHTML.toLowerCase();
        let theChosenWord = Array.from(randomWord.toLowerCase());



        theChosenWord.forEach((wordLetter, wordIndex) => {

            if (theClickedLetter === wordLetter) {
                theStatus = true;
                guessSpans.forEach((span, spanIndex) => {
                    if (wordIndex === spanIndex) {
                        span.innerHTML = wordLetter;

                    }
                });
            }

        });

        if (theStatus !== true) {
            wrongAttempts++;
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            document.getElementById("fail").play();
            if (wrongAttempts === 8) {
                endGameLose();
                lettersContainer.classList.add("finished");
                document.getElementById("game-over").play();
            }
        } else {
            document.getElementById("success").play();


            // end and win
            // التحقق إذا كل الحروف تم كشفها
            let allGuessed = true;
            guessSpans.forEach((span) => {
                if (span.innerHTML === "" && !span.classList.contains("space")) {
                    allGuessed = false;
                }
            });

            if (allGuessed) {
                lettersContainer.classList.add("finished");
                document.getElementById("win").play();
                endGameWin();
            }


        }
    }
});

//end of game
function endGameLose() {
    let div = document.createElement("div");
    div.className = 'popup';
    let divText = document.createTextNode(`Game Over, The Word Is ${randomWord}`);
    div.appendChild(divText);
    document.body.appendChild(div);
}
function endGameWin() {
    let div = document.createElement("div")
    div.className = 'popup';
    if (wrongAttempts <= 4) {
        divText = document.createTextNode(`congratz you win ,you'r smart, you make ${wrongAttempts} mistake`)
        div.appendChild(divText)
        document.body.appendChild(div)
    }
    else if (wrongAttempts >= 4 && wrongAttempts < 7) {
        divText = document.createTextNode(`congratz you win , you make ${wrongAttempts} mistake`)
        div.appendChild(divText)
        document.body.appendChild(div)
    }
    else if (wrongAttempts >= 7) {
        divText = document.createTextNode(`you'r weak in this game, you make ${wrongAttempts} mistake`)
        div.appendChild(divText)
        document.body.appendChild(div)
    }

}
