var canvas=document.getElementById("myCanvas");
var ctx=canvas.getContext('2d');


var box_unit=20;
var score=0;
var level=1;
var snake=[];
snake[0]={x:9*box_unit,y:10*box_unit};
var d;
//var backgroundNotSet=true;
var pause=0;
var jump=0;
var menuVisible=true;
var X,Y;
var game;
var gameEnd=false;
var speedflag=1;
canvas.onclick=function(e)
    {
        if(menuVisible)
       { //alert('hey');
        X=(e.pageX-this.offsetLeft);
        Y=(e.pageY-this.offsetTop);
      if(X>=160&&X<=385&&Y>=165&&Y<=200)
          { //alert('New Game');
             gameEnd=false;
         newGame(); 
              menuVisible=false;
          }
       if(X>=160&&X<=410&&Y>=265&&Y<=300)
          {// alert('Saved Game');
            displayLoading();
            d=null;
            loadGame();
            menuVisible=false;
          }
       if(X>=160&&X<=256&&Y>=365&&Y<=400)
          { //alert('Exit');
          close();
            menuVisible=false;
          }       
       }
    }



canvas.onmousemove=function(e)
    {
        if(menuVisible)
       { //alert('hey');
        X=(e.pageX-this.offsetLeft);
        Y=(e.pageY-this.offsetTop);
     //  console.log(X,Y);
       
       
       if(X>=160&&X<=385&&Y>=165&&Y<=200)
          {// alert('New Game');
            ctx.fillStyle="red";
            ctx.fillRect(6*box_unit,9*box_unit,box_unit,box_unit-10);
            ctx.fill();
           
          }
      else if(X>=160&&X<=410&&Y>=265&&Y<=300)
          { //alert('Saved Game');
            ctx.fillStyle="red";
            ctx.fillRect(6*box_unit,14*box_unit,box_unit,box_unit-10);
            ctx.fill();
          }
      else if(X>=160&&X<=256&&Y>=365&&Y<=400)
          { //alert('Exit');
            ctx.fillStyle="red";
            ctx.fillRect(6*box_unit,19*box_unit,box_unit,box_unit-10);
            ctx.fill();
          } 
           else{
               _init_();
           }
       }
    }




 //======================EVENT LISTENER======================================

_init_();




function _init_()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle="black";
    ctx.lineWidth=5;
    ctx.strokeRect(0,0,canvas.width,canvas.height);
   ctx.fillStyle="#fff";
   ctx.font="90px Changa one";
   ctx.fillText(" 'Snake Game' ",3*box_unit,5*box_unit);   
   ctx.fillStyle="red";
    ctx.fillRect(0,6*box_unit,32*box_unit,box_unit-15);
    ctx.fill(); 
   ctx.fillStyle="#ff0";
   ctx.font="45px Changa one";
   ctx.fillText("New Game..",8*box_unit,10*box_unit); 
   ctx.fillStyle="#0f0";
   ctx.font="45px Changa one";
   ctx.fillText("Saved Game.. ",8*box_unit,15*box_unit); 
   ctx.fillStyle="#f95";
   ctx.font="45px Changa one";
   ctx.fillText("Exit..",10*box_unit,20*box_unit); 
    speedflag=1;

   
}
document.addEventListener("keydown",direction);
function direction(evt)
{
    
   if(evt.keyCode==37&&d!="RIGHT")
       d="LEFT";
   if(evt.keyCode==38&&d!="DOWN")
       d="UP"; 
   if(evt.keyCode==39&&d!="LEFT")
       d="RIGHT"
   if(evt.keyCode==40&&d!="UP")
       d="DOWN"
    
    //==================pause========================================
    if(evt.keyCode==32&&pause==0)
        {
            if(!gameEnd&&!menuVisible)
         { clearInterval(game);pause=1;
          displayPause();}
         }
   else if(evt.keyCode==32&&pause==1)
        {
            if(!gameEnd&&!menuVisible)
            {
//                backgroundNotSet=true;
                if(speedflag==0)
                game=setInterval(draw,65);
                else
                game=setInterval(draw,90);    
                    pause=0;
            }
        }
    //=====================QUIT=======================================
    if(evt.keyCode==81)
        {
            clearInterval(game);
            displayGameOver();
        }
    //========================NEW GAME ===============================
    if(evt.keyCode==78)
        {
            gameEnd=false;
         newGame();
              menuVisible=false;
        }
    //========================Saving Game=============================
    if(evt.keyCode==83)
        {
             if(!gameEnd&&!menuVisible)
           { clearInterval(game);
            saveGame();
            displaySaved();}
        }
    //=========================Load Saved Game========================
    if(evt.keyCode==49)
        {
            clearInterval(game);
            game=null;
            displayLoading();
            d=null;
            loadGame();
           gameEnd=false;
            
        }
    
    
}
//==============================Food===========================================
var food={
    x:Math.floor(Math.random()*29+1),
    y:Math.floor(Math.random()*29+1)
}
//===============================Draw Food======================================
function drawFood()
{
    ctx.fillStyle="red";
    ctx.fillRect(food.x*box_unit,food.y*box_unit,box_unit,box_unit);
    ctx.fill();
}
//=================================collison with itself==========================
function isCollision(head,array)
{
    if(array.length<=2||(head.x==array[0].x&&head.y==array[0].y))
        return false;
    for(var i=0;i<array.length;i++)
        {
            if(head.x==array[i].x&&head.y==array[i].y)
                return true;
        }
    return false;  
}
//======================================Drawing snake=============================
function drawSnake()
{
     for(var i=0;i<snake.length;i++)
        {
                ctx.fillStyle=(i==0)?"yellow":"#0f0";
                ctx.fillRect(snake[i].x,snake[i].y,box_unit,box_unit);
                ctx.strokeStyle="white";
                ctx.lineWidth=3;
                ctx.strokeRect(snake[i].x,snake[i].y,box_unit,box_unit);
        }
}
//===================================SAVE GAME==================================
function saveGame()
{
    gameEnd=true;
    localStorage.setItem('snake',JSON.stringify(snake));
    localStorage.setItem('food',JSON.stringify(food));
    localStorage.setItem('score',JSON.stringify(score)); localStorage.setItem('level',JSON.stringify(level));
}

//======================================canvas border==========================
function drawBorder()
{
    ctx.strokeStyle="black";
    ctx.lineWidth=5;
    ctx.strokeRect(0,0,canvas.width,canvas.height);
}
//==============================DISPLAY PAUSE=========================
function displayPause()
{
   ctx.fillStyle="#6f0";
   ctx.font="45px Changa one";
   ctx.fillText(" GAME PAUSED ",8*box_unit,19*box_unit);
}
//================================DISPLAY SAVED===================================
function displaySaved()
{
   ctx.clearRect(0,0,canvas.width,canvas.height);
   ctx.fillStyle="BLUE";
   ctx.font="35px Changa one";
   ctx.fillText(" GAME SAVED ... ",8*box_unit,19*box_unit);
    var x= setTimeout(function(){
         menuVisible=true;
         _init_();
     },2000); 
    
    
}
//==================================DISPLAY LOAD===================================
function displayLoading()
{
   ctx.clearRect(0,0,canvas.width,canvas.height);
   ctx.fillStyle="BLUE";
   ctx.font="35px Changa one";
   ctx.fillText(" LOADING ... ",8*box_unit,19*box_unit);
}
//====================================LOAD GAME=================================
function loadGame()
{
    var count=0;
    var size=localStorage.length;
    for(var i=0;i<size;i++)
    {
        if(localStorage.key(i)==='snake'||localStorage.key(i)==='score'||localStorage.key(i)==='food'||localStorage.key(i)==='level')
            {
                count++;
            }
    }
    if(count==4)
    {snake=[];
    food=[];
    score=0;
    level=1;
    gameEnd=false;
    snake=JSON.parse(localStorage.getItem('snake'));
    food=JSON.parse(localStorage.getItem('food')); 
    score=JSON.parse(localStorage.getItem('score')); 
    level=JSON.parse(localStorage.getItem('level')); 
//     backgroundNotSet=true;
    game=setInterval(draw,90);
    }
    else{
       
        
        gameEnd=true;
           ctx.clearRect(0,0,canvas.width,canvas.height);
           ctx.strokeStyle="black";
           ctx.lineWidth=5;
           ctx.strokeRect(0,0,canvas.width,canvas.height);
           ctx.fillStyle="#a00";
           ctx.font="50px Changa one";
           ctx.fillText(" No Saved Game ",8*box_unit,15*box_unit); 
           var x= setTimeout(function(){
                 menuVisible=true;
                 _init_();
             },2000);
        
    }
}

//==========================================setting interval==========================
//>>>>>>>>>EX# 
//==============================================Game  Over====================================
function displayGameOver()
{
   gameEnd=true;
   ctx.clearRect(0,0,canvas.width,canvas.height);
   ctx.strokeStyle="black";
   ctx.lineWidth=5;
   ctx.strokeRect(0,0,canvas.width,canvas.height);
   ctx.fillStyle="RED";
   ctx.font="45px Changa one";
   ctx.fillText("GAME OVER !! ",8*box_unit,15*box_unit); 
   ctx.fillStyle="White";
   ctx.font="35px Changa one";
   ctx.fillText("SCORE -> "+score,8*box_unit,19*box_unit);
   var x= setTimeout(function(){
         menuVisible=true;
         _init_();
     },2000);
}
//==========================================NEW GAME ================================
function newGame()
{
    clearInterval(game);
    score=0;
    level=1;
    snake=[];
    snake[0]={x:9*box_unit,y:10*box_unit};
    d=null;
    pause=0;
//    backgroundNotSet=true;
    game=setInterval(draw,90);
    food={
        x:Math.floor(Math.random()*29+1),
        y:Math.floor(Math.random()*29+1)
    }
}
//======================function calls=====================================

function draw()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
  
//   var img=new Image();
//    img.src='images/pic3.jpg';
//    ctx.drawImage(img,0,0);
    var grd=ctx.createLinearGradient(0,0,650,650);
    grd.addColorStop(0,'black');
    grd.addColorStop(0.3,'blue');   
    grd.addColorStop(0.7,'#006');
    grd.addColorStop(1,'black');
    ctx.fillStyle=grd;
    ctx.fillRect(0,0,canvas.width,canvas.height); 
    
   
    drawBorder();
    drawSnake();
    
    //====================old head===============
    var snakeX=snake[0].x;
    var snakeY=snake[0].y;
    //==================== moving next move=======
    if(d=="LEFT")
        snakeX-=box_unit;
    if(d=="RIGHT")
       snakeX+=box_unit;
    if(d=="UP")
        snakeY-=box_unit;
    if(d=="DOWN")
         snakeY+=box_unit;
    //===================JUMPER====
    if(jump>=50&&level==3)
        {
            jump=0;
             food={
            x:Math.floor(Math.random()*29+1),
            y:Math.floor(Math.random()*29+1)
             }
        }
    jump++;
    
    if(level==2&&speedflag==1)
        {
           clearInterval(game);
//            backgroundNotSet=true;
            game=setInterval(draw,65);
            speedflag=0
        }
//    console.log(jump);
    //======================checking if nextmove eats somewhere============
      if(snakeX==food.x*box_unit && snakeY ==food.y*box_unit)
        {
            score++;
            food={
            x:Math.floor(Math.random()*29+1),
            y:Math.floor(Math.random()*29+1)
             }
            if(score>=30)
                level=2;
            if(score>=80)
                level=3;
            
            jump=0;
        }
     //===================we pop last so that its tail is removed and we can new head after wards no need to pop if he eats cause it will grow==================
        else {
            if(d!=null)
                snake.pop();
            }
    //=========================new head to be inserted===============================
       var newHead={
        x:snakeX,
        y:snakeY
    }
       
    //===========================drawing food and score on canvas========================     
    drawFood();
    ctx.fillStyle="white";
    ctx.font="25px Changa one";
    ctx.fillText("SCORE : "+score,1*box_unit,3*box_unit);
    ctx.fillStyle="#0ff";
    ctx.fillText("LEVEL : "+level,24*box_unit,3*box_unit);
      
       if(snakeX<0||snakeX>30*box_unit||snakeY<0||snakeY>30*box_unit||isCollision(newHead,snake))
           {
               
               clearInterval(game); 
               displayGameOver();
           }
    if(d!=null)
        snake.unshift(newHead);
}
