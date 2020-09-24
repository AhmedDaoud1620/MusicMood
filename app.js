const collapseBtn = document.querySelector(".collapsebtn");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links li");
const colBtn1 = document.querySelector('.collapse-line1');
const colBtn2 = document.querySelector('.collapse-line2');
const colBtn3 = document.querySelector('.collapse-line3');
const timerDiv = document.getElementById("timeDivContainer");
const moodBtn = document.querySelector('.moodBtn');
const aboutBtn = document.querySelector('.aboutBtn');
const homeBtn = document.getElementById("home");
var slideShowCloseBtn = document.getElementById('slideShowCloseBackground');
var slideShowDiv = document.getElementById('moodSlideShow');






// sideMenu stuff

function decollapseSideDiv() {
    if (!timerDiv.classList.contains('showTimerPanel')) {
        timerDiv.classList.toggle('showTimerPanel')
    }
    if (navLinks.classList.contains('decollapse')) {
        navLinks.classList.toggle('decollapse')
        navItems.forEach(item => {
            item.classList.toggle('fade');
        });
        colBtn1.classList.toggle('collapseLineIactive');
        colBtn2.classList.toggle('collapseLineIIactive');
        colBtn3.classList.toggle('collapseLineIIIactive');
    }
}



// shows and hides the side menu on click
collapseBtn.addEventListener('click',() =>{
    navLinks.classList.toggle('decollapse');
    navItems.forEach(item =>{
        item.classList.toggle('fade');
    });
    colBtn1.classList.toggle('collapseLineIactive');
    colBtn2.classList.toggle('collapseLineIIactive');
    colBtn3.classList.toggle('collapseLineIIIactive');
    timerDiv.classList.add("showTimerPanel");

});



// make the navlinks hide the sidebar on click

moodBtn.addEventListener('click',() => {
    decollapseSideDiv();
});
aboutBtn.addEventListener('click',() => {
    decollapseSideDiv();
});
homeBtn.addEventListener('click',() => {
    decollapseSideDiv();
});



// slideshow stuff

slideShowCloseBtn.addEventListener('click', function(){
    slideShowDiv.classList.toggle('viewSlide');

});

function showSlider(){
    slideShowDiv.classList.toggle('viewSlide');
    slideShowDiv.style.background = `url('img/slideshow/${containerID}.jpg') no-repeat center center / cover`;
}


//timer stuff

var timerCheck = false;
var timerSeconds;
var timerMinutes;
var timerInterval;

function hideShowTimer() {
    document.getElementById("timeDivContainer").classList.toggle("showTimerPanel");

}

// starts the timer event (by setting the timer) and collapses the sidediv too
function setTimer() {
    document.getElementById("timeDivContainer").classList.toggle("showTimerPanel");
    document.getElementById("shownTimer").classList.remove("show-time");
    decollapseSideDiv();

    if (!timerCheck) {
        timerInterval = setInterval(addTime, 1000);
        timerCheck = true;
        timerSeconds = 60;
        timerMinutes = Number(document.getElementById("setTimer").value) - 1;
    }
    else {
        clearInterval(timerInterval);
        timerInterval = setInterval(addTime, 1000);
        timerCheck = true;
        timerSeconds = 60;
        timerMinutes = Number(document.getElementById("setTimer").value) - 1;

    }


}

// calculates timer and shows it on the body
function addTime() {
    if ((timerMinutes == 0 && timerSeconds == 1) || timerMinutes < 0) {
        clearInterval(timerInterval);
        document.getElementById("shownTimer").innerHTML = ""
        document.getElementById("shownTimer").classList.add("show-time");
        pauseAudio();
        document.getElementById(playingId).classList.remove('fa-pause-circle');
        document.getElementById(playingId).classList.add('fa-play-circle');

    }
    else {
        timerSeconds--;
        if (timerSeconds === 0) {
            timerSeconds = 60;
            timerMinutes--;
        }
        document.getElementById("shownTimer").innerHTML = (timerMinutes ? (timerMinutes > 9 ? timerMinutes : "0" + timerMinutes) : "00") + ":" + (timerSeconds > 9 ? timerSeconds : "0" + timerSeconds);
    }


}


// getting the value of the slider input and showing it's value on the timerDiv

let slider = document.getElementById("setTimer");
let output = document.getElementById("time");
if (slider.value == 0) {
    output.innerHTML = "OFF";
}
else {
    output.innerHTML = slider.value + " Min";
}


slider.oninput = function () {
    if (slider.value == 0) {
        output.innerHTML = "OFF";
    }
    else {
        output.innerHTML = this.value + " Min";
    }

}

var playingCheck = false;
var playingId;
var isPlaying = false;
var musicPlayer = document.getElementById("player");
var whatsPlaying = musicPlayer.getAttribute("src");
var containerID;

function setPlayingSrc(src){
    musicPlayer.setAttribute("src", src);
    whatsPlaying = src;
}


$( "#moodsMainContent i" ).on( "click", function() {
    containerID = this.parentElement.id;
    if (!playingCheck){
        if (whatsPlaying != `https://docs.google.com/uc?export=download&id=${this.id}`){
            setPlayingSrc(`https://docs.google.com/uc?export=download&id=${this.id}`);
            playAudio();
            playingCheck = true;
            playingId = this.id;
            this.classList.remove('fa-play-circle');
            this.classList.add('fa-pause-circle');
        }
        else{
            playAudio();
            playingCheck = true;
            this.classList.remove('fa-play-circle');
            this.classList.add('fa-pause-circle');
        }
        
    }
    else{
        if(playingId == this.id){
            pauseAudio();
            playingCheck = false;
            this.classList.remove('fa-pause-circle');
            this.classList.add('fa-play-circle');
        }
        else{
            document.getElementById(playingId).classList.remove('fa-pause-circle');
            document.getElementById(playingId).classList.add('fa-play-circle');
            setPlayingSrc(`https://docs.google.com/uc?export=download&id=${this.id}`);
            loadAudio();
            playingCheck = true;
            playingId = this.id;
            this.classList.remove('fa-play-circle');
            this.classList.add('fa-pause-circle');

        }
    }
});

// music stuff

function playAudio() {
    musicPlayer.play();
    showSlider();
    isPlaying = true;
    musicPlayer.onended = function () {
        document.getElementById(playingId).classList.remove('fa-pause-circle');
        document.getElementById(playingId).classList.add('fa-play-circle');
        slideShowDiv.classList.add('viewSlide');
        playingCheck = false;
    }
}

function pauseAudio() {
    musicPlayer.pause();
    isPlaying = false;
}
function loadAudio(){
    musicPlayer.load();
    playAudio();
}


//routing stuff

function setupHistoryClicks() {
    addClicker(document.getElementById("home"));
    addClicker(document.getElementById("moods"));
    addClicker(document.getElementById("about"));
}

function addClicker(link) {
    link.addEventListener("click", function (e) {
        RoutePages(link.href.split("/").pop());
        history.pushState(null, null, link.href);
        e.preventDefault();
    }, false);
}

function RoutePages(href) {
    $( '#maincont' ).load(`loading/${href}`);
}

window.addEventListener("popstate", function (e) {
    RoutePages(location.pathname.split("/").pop());
});


window.onload = setupHistoryClicks;

var moodContainers = document.querySelectorAll(".moodContainer");
moodContainers.forEach(function(container){
    let itemId = container.getAttribute("id");
    container.style.background = `url('img/containerimg/${itemId}.jpg') no-repeat center center / cover`;
});
