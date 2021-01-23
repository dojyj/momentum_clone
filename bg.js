const body = document.querySelector("body");
const IMG_NUMBER = 4;

// random한 image 하나를 선택해 bg image로 띄움.
function paintImage(imgNumber){
    const image = new Image();
    image.src = `./images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
}

// 랜덤 정수 리턴 -> image num
function genRandom(){
    const randomNumber = Math.floor(Math.random() * IMG_NUMBER);
    return randomNumber;
}

// paint image init
function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init()