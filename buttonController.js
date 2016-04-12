// set up for using canvas
var c = document.getElementById("myCanvas");
c.addEventListener( "click", getClickPosition);
window.addEventListener( "keydown", debugShortcut, true);
var ctx = c.getContext("2d");

// store current and previous screen arrays
var currentScreen;
var prevScreen;

// load button click sound clip
var clip = document.getElementById("click");

// load main menu clip
var mainMenuClip = document.getElementById("mainTheme");

// load inPlay audio clip
var inPlayClip = document.getElementById("inPlayClip");

// load pause audio clip
var pauseClip = document.getElementById("pauseClip");

// load game over audio clip
var gameOverClip = document.getElementById("gameOverClip");

// load credits audio clip
var creditScreenClip = document.getElementById("creditsClip");

// load splash screen audio clip
var splashScreenClip = document.getElementById("splashScreenClip");

// transition frame x value
var transitioning = false;
var transX = 0.0;
var transI = 0;
const DIF = 200;
const TRANS_SPEED = 2;
const NUM_FRAMES = 30;

var Button = function(x, y, w, h, text) // define a custom button class for canvas
{
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = text;
}

// define all the buttons in the game, by screen
// splash screen ss screen
var ssScreenBtn = new Button(0,0,c.width,c.height,
			     "Splash Screen");
ssScreenBtn.click = function()
{
    transitioning = true;
    currentScreen = mainMenu;
}
// main menu mm screen
var mmPlayBtn = new Button(200,20,400,50,
			  "Play");
mmPlayBtn.click = function()
{
    transitioning = true;
    currentScreen = inPlay;
}
var mmSettingsBtn = new Button(200,90,400,50,
			      "Settings");
mmSettingsBtn.click = function()
{
    transitioning = true;
    currentScreen = settingsMenu;
    prevScreen = mainMenu;
}
var mmCreditsBtn = new Button(200,160,190,50,
			     "Credits");
mmCreditsBtn.click = function()
{
    transitioning = true;
    currentScreen = creditScreen;
}
var mmQuitBtn = new Button(410,160,190,50,
			   "Quit");
mmQuitBtn.click = endGame;
// in play ip screen
var ipPauseBtn = new Button(5,5,100,50,
			   "Pause");
ipPauseBtn.click = function()
{
    currentScreen = pauseMenu;
    prevScreen = inPlay;
}
// settings menu sm screen
var smReturnBtn = new Button(5,5,100,50,
			    "Return");
smReturnBtn.click = function()
{
    transitioning = true;
    currentScreen = prevScreen;
}
var smControlBtn = new Button(200,160,190,50,
			     "Controls");
smControlBtn.click = function()
{
    smControlText.text = (smControlText.text == "Touch") ? "Tilt" : "Touch";
}
// type of controls
var smControlText = new Button(410, 160, 190, 50,
			       "Touch");
smControlText.color = "white";

// pause menu pm screen
var pmReturnBtn = new Button(200,40,400,100,
			    "Return");
pmReturnBtn.click = function()
{
    currentScreen = inPlay;
}
var pmSettingsBtn = new Button(200,160,190,50,
			      "Settings");
pmSettingsBtn.click = function()
{
    transitioning = true;
    currentScreen = settingsMenu;
    prevScreen = pauseMenu;
}
var pmQuitBtn = new Button(410,160,190,50,
			  "Quit");
pmQuitBtn.click = function()
{
    transitioning = true;
    currentScreen = mainMenu;
}
// game over go screen
var goCreditsBtn = new Button(200,20,400,50,
			     "Credits");
goCreditsBtn.click = function()
{
    transitioning = true;
    currentScreen = creditScreen;
}
var goPlayBtn = new Button(200,280,190,50,
			  "Play");
goPlayBtn.click = function()
{
    transitioning = true;
    currentScreen = inPlay;
}
var goQuitBtn = new Button(410,280,190,50,
			  "Quit");
goQuitBtn.click = function()
{
    transitioning = true;
    currentScreen = mainMenu;
}
// credit screen cs screen
var csScreenBtn = new Button(0,0,c.width,c.height,
			    "Credits");
csScreenBtn.click = function()
{
    transitioning = true;
    currentScreen = mainMenu;
}

// store each screen in an array
var mainMenu = [mmPlayBtn, // play
		mmSettingsBtn, // settings
		mmCreditsBtn, // credits
		mmQuitBtn]; // quit
mainMenu.audio = menuTheme;

var inPlay = [ipPauseBtn]; // pause button
inPlay.audio = inPlayClip;

var settingsMenu = [smReturnBtn, // return
		    smControlBtn, // control toggle
		    smControlText]; // control results
settingsMenu.audio = menuTheme;

var pauseMenu = [pmReturnBtn, // return to game
		pmSettingsBtn, // settings
		pmQuitBtn]; // quit
pauseMenu.audio = menuTheme;

var gameOverMenu = [goCreditsBtn, // credits
		    goPlayBtn, // play again
		    goQuitBtn]; //quit
gameOverMenu.audio = gameOverClip;

var splashScreen = [ssScreenBtn]; // clickable splash screen
splashScreen.audio = splashScreenClip;

var creditScreen = [csScreenBtn]; // clickable credit screen
creditScreen.audio = creditScreenClip;

//this function creates a brief screen transition before showing the next screen
function transition()
{
    //console.log("transX = " + transX);
    //console.log("transI = " + transI);
    if (transX == 0)
    {
	//console.log("transition init");
	ctx.beginPath();
	transX = transX + ((c.width * TRANS_SPEED)/NUM_FRAMES);
	++transI;
    }
    else if (transI < (NUM_FRAMES / TRANS_SPEED))
    {
	//console.log("writing frame");
	ctx.fillStyle = "white";
	ctx.moveTo(0, 0);
	ctx.lineTo(transX, 0);
	ctx.lineTo(transX - DIF, c.height);
	ctx.lineTo(0, c.height);
	ctx.closePath();
	ctx.fill();
	transX = transX + ((c.width * TRANS_SPEED)/NUM_FRAMES);
	++transI;
    }
    else
    {
	//console.log("resetting transition vars");
	transX = 0.0;
	transI = 0;
	transitioning = false;
    }
    //console.log("returning to drawMenu()");
}

// this function draws buttons on each scene in the canvas
function drawMenu(thisMenu)
{
    //console.log("Clearing screen.");
    ctx.clearRect(0,0,c.width,c.height);

    for (var i = 0; i < thisMenu.length; i++)
    {
	// directions for button appearance
	ctx.beginPath();
	ctx.rect(thisMenu[i].x,thisMenu[i].y,thisMenu[i].w,thisMenu[i].h);
	ctx.fillStyle = (thisMenu[i].color != null) ? thisMenu[i].color : "blue";
	ctx.fill();
	ctx.strokeStyle = "black";
	ctx.stroke();
	// directions for button text
	ctx.fillStyle = "black";
	ctx.font = "20px Arial";
	ctx.fillText(thisMenu[i].text, 
		     thisMenu[i].x + 10, 
		     thisMenu[i].y + (thisMenu[i].h/2) + 10);
    }
}

// this function gets corrected click positions within the canvas
// and acts on the resulting collision with button elements
function getClickPosition(e) 
{
    
	
	var parentPosition = getPosition(e.currentTarget);
    var xPosition = e.clientX - parentPosition.x;
    var yPosition = e.clientY - parentPosition.y;
    var clicked = checkCollision(xPosition, yPosition);
    if (clicked != -1)
    {
	currentScreen.audio.pause();
	currentScreen[clicked].click();
	clip.play();
    }
}
 
// find the corrected click position
function getPosition(element) 
{
    var xPosition = 0;
    var yPosition = 0;
      
    while (element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}

// check for button element collision based on corrected click position
function checkCollision(xPos, yPos)
{
    var flag;
    var left;
    var right;
    var top;
    var bottom;

    for (var i = 0; i < currentScreen.length; i++)
    {
	left = currentScreen[i].x;
	right = left + currentScreen[i].w;
	top = currentScreen[i].y;
	bottom = top + currentScreen[i].h;
	
	if ((xPos >= left) &&
	    (xPos <= right) &&
	    (yPos >= top) &&
	    (yPos <= bottom))
	{
	    return i;
	}
    }
    return -1;
}

// clear the screen at the end of the game
function endGame()
{
    ctx.clearRect(0,0,c.width,c.height);
    clearInterval(running);
}

// provide debug shortcuts for dev to quickly change screens
function debugShortcut(e)
{
    console.log(e.keyCode);
    currentScreen.audio.pause();

    if (e.keyCode == 82)
    {
	currentScreen = inPlay;
    }
    if (e.keyCode == 88)
    {
	currentScreen = gameOverMenu;
    }
    if (e.keyCode == 32)
    {
	currentScreen = splashScreen;
    }
    if (e.keyCode == 77)
    {
	currentScreen = mainMenu;
    }
}

function render()
{
    if (transitioning)
    {
	transition();
    }
    else
    {
	currentScreen.audio.pause();
	drawMenu(currentScreen);
    }
	currentScreen.audio.play();
}

currentScreen = splashScreen;
var running = setInterval(render, 1000/NUM_FRAMES);
