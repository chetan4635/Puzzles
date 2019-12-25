import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule} from '@angular/router/testing';
import { AppComponent } from './app.component';
import { DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import { applySourceSpanToExpressionIfNeeded } from '@angular/compiler/src/output/output_ast';

describe('AppComponent', () => {
  let de:DebugElement;
  let el:HTMLElement;
  let spyObject;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  it('Direction and Matrix size on getMatrix()', ()=> {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.userInput=7;
    app.getMatrix('Right');
    expect(app.mtrx).toEqual(3);
    expect(app.direction).toEqual('Right');

    app.getMatrix('Left');
    expect(app.direction).toEqual('Left');
    
  });
  
  it('title should say puzzleApp',() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('puzzleApp');
  })

  it('Should contain',()=>{
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let compiled=fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Spiral')
  })
  
  
  it('Size calculator function working', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.userInput=11;
    app.sizeCalc();
    expect(app.j).toEqual(1);
});

it('If turn required', () => {
  const fixture = TestBed.createComponent(AppComponent);
  const app = fixture.debugElement.componentInstance;
  app.step=1;
  app.stepLimit=1;
  app.ifTurnRequired();
  expect(app.step).toEqual(0);


  
});

it('tests Switch cases for moves and turns', () => {
  const fixture = TestBed.createComponent(AppComponent);
  const app = fixture.debugElement.componentInstance;
  

  expect( app.leftSpiralTurn('Right')).toEqual('Up');
  expect( app.leftSpiralTurn('Up')).toEqual('Left');
  expect( app.leftSpiralTurn('Left')).toEqual('Down');
  expect( app.leftSpiralTurn('Down')).toEqual('Right');
  expect( app.rightSpiralTurns('Right')).toEqual('Down');
  expect( app.rightSpiralTurns('Up')).toEqual('Right');
  expect( app.rightSpiralTurns('Left')).toEqual('Up');
  expect( app.rightSpiralTurns('Down')).toEqual('Left');

  app.moveOneStep('Right')
  expect(app.n).toBeDefined();
  app.moveOneStep('Left');
  expect(app.n).toBeDefined();
  app.moveOneStep('Up');
  expect(app.m).toBeDefined();
  app.moveOneStep('Down');
  expect(app.m).toBeDefined();
});

 });
