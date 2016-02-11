var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var mainMenu = [[200,20,400,50], // play
		[200,90,400,50], // settings
		[200,160,190,50], // credits
		[410,160,190,50]]; // quit

var inPlay = [[5,5,100,50]]; // pause button

var settingsMenu = [[5,5,100,50], // return
		    [200,160,190,50]]; // control toggle

var pauseMenu = [[200,40,400,100], // return to game
		[200,160,190,50], // settings
		[410,160,190,50]]; // quit

var gameOverMenu = [[200,20,400,50], // credits
		    [200,280,190,100], // play again
		    [410,280,190,100]]; //quit

function drawMenu(thisMenu)
{
    for (var i = 0; i < thisMenu.length; i++)
    {
	ctx.fillStyle = "blue";
	ctx.fillRect(thisMenu[i][0],thisMenu[i][1],thisMenu[i][2],thisMenu[i][3]);
    }
}

drawMenu();
