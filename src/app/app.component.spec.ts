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
  it('Should hide message', ()=> {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.getMatrix()).toBeFalsy();
  });
  it('Should hide message', ()=> {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.sizeCalc()).toBeFalsy();
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
  
  it('should should',()=>{
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.sizeCalc()).toBe(undefined);
  })
  it('loaderIs should be falsy', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.userInput = 1
    app.sizeCalc();
    expect(app.mtrx).toBeTruthy();
    app.userInput=11
    app.sizeCalc();
    expect(app.j).toBeTruthy();
});
it('loaderIs should be falsy', () => {
  const fixture = TestBed.createComponent(AppComponent);
  const app = fixture.debugElement.componentInstance;
  //app.userInput=23;
  app.direction = 'Left';
  app.mtrxCreater();
  expect(app.n).toBeFalsy();
});
it('tests sbr', () => {
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
  expect(app.n).toBeFalsy();
  app.moveOneStep('Left')
  expect(app.n).toBeFalsy();
  app.moveOneStep('Up')
  expect(app.n).toBeFalsy();
  app.moveOneStep('Down')
  expect(app.n).toBeFalsy();


  // app.step=0;
  // app.stepLimit=1;
  // app.userInput=11;
  // app.m=0;
  // app.n=0;
  // app.mtrxCreater('Right');
});

 });
