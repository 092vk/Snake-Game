let inputDir={x:0 , y:0};
const foodSound = new Audio('music/food.mp3');
const gameOver = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3')
const musicSound = new Audio('music/music.mp3')

let lastPaintTime=0;
let speed = 60;

//making an array and declaring an object with predefined coordinates where 
//our head will emerge , top left is origin of box 
let snakeArr=[
    {x:13,y:15}
];
let food={x:6,y:15};

let score=0;

//function for running the animation and updating the game animation
function anime(ctime){
    //here a loop forms where we call main , then it calls reaniframe which calls main on each rendering which in turn calls reqaniframe again 
    // the other part of function is performed till the browser renders 
    window.requestAnimationFrame(anime);
    // window is used to just for the sake of being the method a global thing
    /*requestAnimationFrame is used when we want to do a animation , we give parameter of 
    of a callback function , whats the use of requestanimafrae then , the use is that it calls 
    the function in syncronisation with rendering , so instead of definning how 
    many times we want to update our animation using setTimeInterval we are updating our animation
    with each rendering. */
    // but be careful you must call the requestanimation frame again in the argument function
    console.log(ctime)

    if((ctime-lastPaintTime)/1000< 1/speed){
        return;
    }

    /*here we are first calculating the diff between each frame using ctime-lastpainttime then 
    we are converting this in seconds , then we are using inequality , here 1/speed means fraction of second so if speed=60 that menas if
    the time interval between frames in seconds is less than 1/60 i.e 60 frames per sec 
    so if we want to update our animation or logic only 5 times in a second or move our snake
    only 5 blocks in a second we will set the speed = 5 */

    lastPaintTime=ctime;

    gameEngine();
    
}


function gameEngine(){
    //displaying the snake and food 

    //1.displaying the snake 
    hero=document.getElementById('hero');
    hero.innerHTML="";
    //cleaning the board and then when is recalled again displaying the 
    //content with updated values 

    snakeArr.forEach((current,index)=>{
        /*here we are using forEach loop on snakeArr array which performs operations 
        on each element on the array , here the function is an arrow one and has arguments 
        current element of array being iterated and index of it  */
        var snakeElement =document.createElement('div');
        //creating a element div called snakeElement, document = HTML page
        snakeElement.style.gridRowStart=current.y;
        /*1.here we are using grid and setting the row value 
        2. remember in hero the x axis gives the position of column and y axis the position of row
        here y is element of object in snakeArr  */
        snakeElement.style.gridColumnStart=current.x;

        if(index === 0){
            snakeElement.classList.add('head');
            //here we are adding css class head to the first element of snakeArr
        }
        else{
            snakeElement.classList.add('snake');
        }

        //appending the formed div to the hero board 
        hero.appendChild(snakeElement);
    });

    //2.display the food 
    var foodElement=document.createElement('div');
    //setting the position 
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    //adding the food css class 
    hero.appendChild(foodElement);
}

//the main logic starts here 
musicSound.play();

//add here high score 

window.requestAnimationFrame(anime);
//if any key is pressed the arrow function runs and move sound plays 
window.addEventListener('keydown',eventObject=>{
    inputDir={x:0,y:1}//start the game 
    moveSound.play();
    //eventObject.key gives us the name of key pressed of the event
    switch (eventObject.key){
        case "ArrowUp":

            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            //becuz origin is in top left corner
            break;
        
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;    
         
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;

        default:
            break;
    }

})