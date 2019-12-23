import { Component } from '@angular/core';
import { CheckboxControlValueAccessor, FormGroup, FormBuilder } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
//import { timingSafeEqual } from 'crypto';
// import { runInThisContext } from 'vm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'puzzleApp';
  userInput:number;
 
  


initialRange=0;
j=0;
fx=1;
mtrx;
ansMtrx;
m; //row
n; //column 

direction; //moving direction
step=0; //steps for move 
stepLimit=1; //allowed steps for current rotation
turn=0; //count of turns made
spiralDirection; //Spiral Direction

//calculate matrix size according to input
sizeCalc(){ 
  for(var i=0;i<this.userInput;i++){
    if(this.userInput>this.initialRange && this.userInput<=this.initialRange+(8*(this.j+1))){
      this.mtrx=this.fx+2;
      return this.mtrx;
    }

    else{
      this.initialRange=this.initialRange+(8*(this.j+1));
      this.fx=this.fx+2;
      this.j=this.j+1;
    }
  }
}

getMatrix(spiralDirection){
  this.initialRange=0;
  this.step=0;
  this.stepLimit=1;
  this.turn=0;
  this.j=0;
  this.fx=1;
  this.mtrx=3;
  this.ansMtrx;
  this.m=0;
  this.n=0;
  this.mtrx=this.sizeCalc();
  this.ansMtrx = new Array(this.mtrx);  

  for (var i = 0; i < this.ansMtrx.length; i++) { 
    this.ansMtrx[i] = new Array(this.mtrx); 
  } 
  this.m=(this.ansMtrx.length-1)/2
  this.n=(this.ansMtrx.length-1)/2
  this.mtrxCreater(spiralDirection)
}


mtrxCreater(spiralDirection){ 
  this.spiralDirection=spiralDirection;
  this.direction=this.spiralDirection;
  for(var i=0;i<=this.userInput;i++){
    //console.log(this.m,this.n,i);
    this.ansMtrx[this.m][this.n]=i;
    this.moveOneStep(this.direction)
    this.step+=1;
    if(this.step==this.stepLimit){ //it will turn
      if(this.spiralDirection=='Left'){
        this.direction=this.leftSpiralTurn(this.direction)
     }
      if(this.spiralDirection=='Right'){
        this.direction=this.rightSpiralTurns(this.direction)
      }
      this.step=0;
      this.turn+=1;
      if(this.turn==2){
      this.stepLimit+=1;
      this.turn=0;}
    }
  }
}

moveOneStep(direction){
  switch (direction) {
    case 'Right':
        this.n+=1;
        break;
    case "Left":
        this.n-=1;
        break;
    case "Up":
        this.m-=1
        break;
    case "Down":
        this.m+=1;
        break;
  }

}

leftSpiralTurn(direction){
  switch (direction) {
    case 'Right':
        return 'Up';
    case "Left":
      return 'Down';
    case "Up":
      return 'Left';
    case "Down":
      return 'Right';
  }
}
rightSpiralTurns(direction){
  switch (direction) {
    case 'Right':
      return 'Down';
    case "Left":
      return 'Up';
    case "Up":
      return 'Right';
    case "Down":
      return 'Left';
  }

}
}