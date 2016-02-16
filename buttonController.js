// set up for using canvas
var c = document.getElementById("myCanvas");
c.addEventListener( "click", getClickPosition);
window.addEventListener( "keydown", debugShortcut, true);
var ctx = c.getContext("2d");

// store current and previous screen arrays
var currentScreen;
var prevScreen;

var Button = function(x, y, w, h, id) // define a custome button class for canvas
{
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
	this.id = id;
}

// define all the buttons in the game, by screen
// splash screen ss screen
var ssScreenBtn = new Button(0,0,c.width,c.height,"Splash Screen");
ssScreenBtn.click = function()
{
    currentScreen = mainMenu;
}
// main menu mm screen
var mmPlayBtn = new Button(200,20,400,50,"Play");
mmPlayBtn.click = function()
{
    currentScreen = inPlay;
}
var mmSettingsBtn = new Button(200,90,400,50,"Settings");
mmSettingsBtn.click = function()
{
    currentScreen = settingsMenu;
    prevScreen = mainMenu;
}
var mmCreditsBtn = new Button(200,160,190,50,"Credits");
mmCreditsBtn.click = function()
{
    currentScreen = creditScreen;
}
var mmQuitBtn = new Button(410,160,190,50,"Quit");
mmQuitBtn.click = endGame;
// in play ip screen
var ipPauseBtn = new Button(5,5,100,50,"Pause");
ipPauseBtn.click = function()
{
    currentScreen = pauseMenu;
    prevScreen = inPlay;
}
// settings menu sm screen
var smReturnBtn = new Button(5,5,100,50,"Return");
smReturnBtn.click = function()
{
    currentScreen = prevScreen;
}
var smControlBtn = new Button(200,160,190,50,"Controls");
smControlBtn.click = function()
{

}
// pause menu pm screen
var pmReturnBtn = new Button(200,40,400,100,"Return");
pmReturnBtn.click = function()
{
    currentScreen = inPlay;
}
var pmSettingsBtn = new Button(200,160,190,50,"Settings");
pmSettingsBtn.click = function()
{
    currentScreen = settingsMenu;
    prevScreen = pauseMenu;
}
var pmQuitBtn = new Button(410,160,190,50,"Quit");
pmQuitBtn.click = function()
{
    currentScreen = mainMenu;
}
// game over go screen
var goCreditsBtn = new Button(200,20,400,50,"Credits");
goCreditsBtn.click = function()
{
    currentScreen = creditScreen;
}
var goPlayBtn = new Button(200,280,190,50,"Play");
goPlayBtn.click = function()
{
    currentScreen = inPlay;
}
var goQuitBtn = new Button(410,280,190,50,"Quit");
goQuitBtn.click = function()
{
    currentScreen = mainMenu;
}
// credit screen cs screen
var csScreenBtn = new Button(0,0,c.width,c.height,"Credits");
csScreenBtn.click = function()
{
    currentScreen = mainMenu;
}

// store each screen in an array
var mainMenu = [mmPlayBtn, // play
		mmSettingsBtn, // settings
		mmCreditsBtn, // credits
		mmQuitBtn]; // quit

var inPlay = [ipPauseBtn]; // pause button

var settingsMenu = [smReturnBtn, // return
		    smControlBtn]; // control toggle

var pauseMenu = [pmReturnBtn, // return to game
		pmSettingsBtn, // settings
		pmQuitBtn]; // quit

var gameOverMenu = [goCreditsBtn, // credits
		    goPlayBtn, // play again
		    goQuitBtn]; //quit

var splashScreen = [ssScreenBtn]; // clickable splash screen

var creditScreen = [csScreenBtn]; // clickable credit screen

function drawMenu(thisMenu)
{
    ctx.clearRect(0,0,c.width,c.height);

    for (var i = 0; i < thisMenu.length; i++)
    {
	ctx.fillStyle = "blue";
	ctx.fillRect(thisMenu[i].x,thisMenu[i].y,thisMenu[i].w,thisMenu[i].h);
    }
	for (var j = 0; j < thisMenu.length; j++)
	{
		ctx.font = "14px Arial";
		ctx.fillStyle = "black";
		ctx.fillText(thisMenu[j].id, thisMenu[j].x+thisMenu[j].w/2.2, thisMenu[j].y+thisMenu[j].h/2);
	}
	
}

function getClickPosition(e) 
{
    var parentPosition = getPosition(e.currentTarget);
    var xPosition = e.clientX - parentPosition.x;
    var yPosition = e.clientY - parentPosition.y;
    var clicked = checkCollision(xPosition, yPosition);
    if (clicked != -1)
    {
	currentScreen[clicked].click();
	drawMenu(currentScreen);
    }
}
 
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
	
	//console.log(left+','+top+','+right+','+bottom);

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

function endGame()
{
    ctx.clearRect(0,0,c.width,c.height);
}

function debugShortcut(e)
{
    console.log(e.keyCode);
    
    if (e.keyCode == 82)
    {
	currentScreen = inPlay;
	drawMenu(currentScreen);
    }
    if (e.keyCode == 88)
    {
	currentScreen = gameOverMenu;
	drawMenu(currentScreen);
    }
    if (e.keyCode == 32)
    {
	currentScreen = splashScreen;
	drawMenu(currentScreen);
    }
    if (e.keyCode == 77)
    {
	currentScreen = mainMenu;
	drawMenu(currentScreen);
    }
}

currentScreen = splashScreen;
drawMenu(currentScreen);
