// the class form
class Form {
  // the constructor funciton
  constructor() {
 this.input = createInput("").attribute("placeholder", "Name");
    this.playbutton = createButton('Play');
    this.greeting = createElement('h2');

    // 

    this.title = createElement('h2');
    this.reset = createButton('Reset');
    //this.button1 = createButton('Boss Fight');
    this.button2 = createButton('Multiplayer');
  }

  // the hide function
  hide(){
    this.greeting.hide();
    this.playbutton.hide();
    this.input.hide();
    this.title.hide();
    //this.button1.hide();
    this.button2.hide();
  }

  // the display function
  display(){
    this.title.html("Gun Gale Online");
    this.title.position(displayWidth/2 - 150, 0);
    this.title.style('color', 'white');
    this.title.style('font-size', '50px');

    this.input.position(displayWidth/2 - 40 , displayHeight/2 - 80);
    this.playbutton.position(displayWidth/2 + 30, displayHeight/2);
    this.reset.position(displayWidth-100,20);

    this.playbutton.mousePressed(()=>{
      this.input.hide();
      this.playbutton.hide();
      player.name = this.input.value();
      this.greeting.html(" Hello " + player.name);
      this.greeting.style('color', 'whitesmoke');
      this.greeting.position(displayWidth/2 - 10, displayHeight/4);
      //this.button1.position(displayWidth/2 - 150, displayHeight/2);
      this.button2.position(displayWidth/2 + 150, displayHeight/2);
    });

    // the multiplayer button 
    this.button2.mousePressed(() => {
      this.greeting.hide();
      //this.button1.hide();
      this.button2.hide();      
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
    });
    
    this.reset.mousePressed(()=>{
      player.updateCount(0);
      game.update(0);
    
    database.ref("/").update({
      players: null,
      finishedPlayers: 0,
    });});
  }
}
