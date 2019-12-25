import { Component } from '@angular/core';
import { CheckboxControlValueAccessor, FormGroup, FormBuilder } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'puzzleApp';
  userInput:number;
  j=0;                   //variable for incresing the range of the matrix
  matrixSize;
  resultMatrix;         //Result Matrix;
  m;                    //row
  n;                    //column 
  step=0;               //steps for move 
  stepLimit=1;          //allowed steps for current rotation
  turn=0;               //count of turns made
  spiralDirection;      //Spiral Direction
  direction;            //moving direction

  //calculate matrix size according to input
  sizeCalc(){ 
    let initialRange=0;
    let initialSize=1;
    for(var i=0;i<this.userInput;i++){
      initialSize+=2; // Incresing size everytime when input is not in range
      if(this.userInput>initialRange && this.userInput<=initialRange+(8*(this.j+1))){
        return initialSize;
      }
      else{
        initialRange=initialRange+(8*(this.j+1)); //Range increased
        this.j=this.j+1;}
    }
  }

  getMatrix(spiralDirection){
    this.step=0;
    this.stepLimit=1;
    this.turn=0;
    this.j=0;
    this.m=0;
    this.n=0;
    this.matrixSize=this.sizeCalc();
    this.resultMatrix = new Array(this.matrixSize);  

    //creating an empty array of required size with the help of sizeCalc()
    for (var i = 0; i < this.resultMatrix.length; i++) { 
      this.resultMatrix[i] = new Array(this.matrixSize); 
    } 
    this.m=(this.resultMatrix.length-1)/2
    this.n=(this.resultMatrix.length-1)/2
    this.matrixCreater(spiralDirection);
  }

  matrixCreater(spiralDirection){ 
    this.spiralDirection=spiralDirection;
    this.direction=this.spiralDirection;
    for(var i=0;i<=this.userInput;i++){
      //console.log(this.m,this.n,i); //Uncomment to Check if matrix is getting correct data
      this.resultMatrix[this.m][this.n]=i;
      this.moveOneStep(this.direction)
      this.ifTurnRequired();
    }
  }

  ifTurnRequired(){
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
    this.step+=1;
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