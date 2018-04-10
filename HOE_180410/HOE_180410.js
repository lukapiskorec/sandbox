////////////////////////////////////////////////////////////////
/////////////////HAUSE OHNE EIGENSCHAFTEN///////////////////////
//P5JS WEB VERSION BASED ON THE JAVA DESKTOP VERSION FROM 2015//
/////////////WRITTEN BY LUKA PISKOREC IN 2018///////////////////
////////////////////////////////////////////////////////////////

//defining the interface backgrounds (svg loaded as an image)
var interface_00;
var interface_01;
var interface_02;
var interface_03;
var interface_04;
var interface_05;
var interface_06;
var interface_07;
var interface_08;
var interface_09;
var interface_10;

var screen_nr = 0;
var max_screens = 12;

//defining all default button states
var button1_over = false;
var button2_over = false;
var button3_over = false;
var button4_over = false;
var button1_rect_over = false;
var button2_rect_over = false;

//defining all button positions and dimensions
var button_xstep = 184;
var button_diameter = 60;

var button1_x;
var button2_x;
var button3_x;
var button4_x;

var button1_y;
var button2_y;
var button3_y;
var button4_y;

var button1_rect_x;
var button1_rect_y;
var button1_rect_width = 60;
var button1_rect_height = 60;

var button2_rect_x;
var button2_rect_y;
var button2_rect_width = 300;
var button2_rect_height = 100;

//defining input variables
var lastInput = "";
var currentInput = "";

var c = 0;
var code_choices = [];
var code_extended = "";
var code_compact = "";
var choice1;
var choice2;
var choice3;
var choice4;
var choice5;
var choice6;
var choice7;

var choice1_text = ["","sehr grosszügig","eher grosszügig","eher bescheiden","sehr bescheiden"];
var choice2_text = ["","ausserordentlich aufwendiges","relativ aufwendiges","relativ nachhaltiges","ausserordentlich nachhaltiges"];
var choice3_text = ["","maximal offene","mehrheitlich offene","mehrheitlich introvertierte","maximal introvertierte"];
var choice4_text = ["","hochflexiblen","flexiblen","konventionellen","hochkonventionellen"];
var choice5_text = ["","Klassische","Klassische","Moderne","Moderne"];
var choice6_text = ["","Viele identitätsstiftende","Identitätsstiftende","Zurückhaltende","Wenige zurückhaltende"];
var text_description = "";


function preload() {
    interface_00 = loadImage("assets/Interface_0_DEF.svg");
    
    interface_01 = loadImage("assets/Interface_1_DEF.svg");
    interface_02 = loadImage("assets/Interface_2_DEF.svg");
    interface_03 = loadImage("assets/Interface_3_DEF.svg");
    interface_04 = loadImage("assets/Interface_4_DEF.svg");
    interface_05 = loadImage("assets/Interface_5_DEF.svg");
    interface_06 = loadImage("assets/Interface_6_DEF.svg");
    interface_07 = loadImage("assets/Interface_7_DEF.svg");
    
    interface_08 = loadImage("assets/Interface_8_NAME_DEF.svg");
    interface_09 = loadImage("assets/Interface_9_PRINT_DEF.svg");
    interface_10 = loadImage("assets/Interface_10_THANKS_DEF.svg");
    
    result = loadImage("assets/AAAAAA.svg");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  button1_rect_x = windowWidth/2 + 305;
  button1_rect_y = windowHeight/2 + 197;
  
  button1_x = windowWidth/2 - 276;
  button2_x = button1_x + button_xstep;
  button3_x = button1_x + button_xstep * 2;
  button4_x = button1_x + button_xstep * 3;
  
  button1_y = windowHeight/2 + 140;
  button2_y = button1_y;
  button3_y = button1_y;
  button4_y = button1_y;
  
  button2_rect_x = windowWidth/2 - 150;
  button2_rect_y = windowHeight/2 - 175;
}


function draw() {
  background(255);
  
  if (screen_nr == 0) {image(interface_00, windowWidth/2 - interface_00.width/2, windowHeight/2 - interface_00.height/2);}
  if (screen_nr == 1) {image(interface_01, windowWidth/2 - interface_01.width/2, windowHeight/2 - interface_01.height/2);}
  if (screen_nr == 2) {image(interface_02, windowWidth/2 - interface_02.width/2, windowHeight/2 - interface_02.height/2);}
  if (screen_nr == 3) {image(interface_03, windowWidth/2 - interface_03.width/2, windowHeight/2 - interface_03.height/2);}
  if (screen_nr == 4) {image(interface_04, windowWidth/2 - interface_04.width/2, windowHeight/2 - interface_04.height/2);}
  if (screen_nr == 5) {image(interface_05, windowWidth/2 - interface_05.width/2, windowHeight/2 - interface_05.height/2);}
  if (screen_nr == 6) {image(interface_06, windowWidth/2 - interface_06.width/2, windowHeight/2 - interface_06.height/2);}
  if (screen_nr == 7) {image(interface_07, windowWidth/2 - interface_07.width/2, windowHeight/2 - interface_07.height/2);}
  if (screen_nr == 8) {image(interface_08, windowWidth/2 - interface_08.width/2, windowHeight/2 - interface_08.height/2);}
  if (screen_nr == 9) {image(interface_09, windowWidth/2 - interface_09.width/2, windowHeight/2 - interface_09.height/2);}
  
  //if (screen_nr == 10) {image(result, windowWidth/2 - result.width/2, windowHeight/2 - result.height/2);}
  
  if (screen_nr == 11) {image(interface_10, windowWidth/2 - interface_10.width/2, windowHeight/2 - interface_10.height/2);}

  //home screen
  if (screen_nr == 0) {update_rect_button_home();}
  //screens for house trait choices
  if ((screen_nr == 1)||(screen_nr == 2)||(screen_nr == 3)||(screen_nr == 4)||(screen_nr == 5)||(screen_nr == 6)||(screen_nr == 7)) {update_buttons();}
  //name input screen
  if (screen_nr == 8) {update_text_input();}
  //print screen
  if (screen_nr == 9) {update_rect_button_print();} 
  //result
  if (screen_nr == 10) {create_result();} 
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  button1_rect_x = windowWidth/2 + 305;
  button1_rect_y = windowHeight/2 + 197;
  
  button1_x = windowWidth/2 - 276;
  button2_x = button1_x + button_xstep;
  button3_x = button1_x + button_xstep * 2;
  button4_x = button1_x + button_xstep * 3;
  
  button1_y = windowHeight/2 + 140;
  button2_y = button1_y;
  button3_y = button1_y;
  button4_y = button1_y;
  
  button2_rect_x = windowWidth/2 - 150;
  button2_rect_y = windowHeight/2 - 175;
}


function mousePressed() {
  if ((button1_over == true)||(button2_over == true)||(button3_over == true)||(button4_over == true)||(button1_rect_over == true)||(button2_rect_over == true)) {
    screen_nr += 1;
    append(code_choices, c);
    if (screen_nr > (max_screens - 1)) {screen_nr = 0; reset_input();}
  }
}


function keyPressed() {
  if(keyCode == ENTER) {lastInput = currentInput;  currentInput = currentInput + key; currentInput = ""; if (screen_nr == 8) {screen_nr += 1;}}
  else if(keyCode == BACKSPACE && currentInput.length > 0) {currentInput = currentInput.substring(0, currentInput.length - 1);} 
  else {currentInput = currentInput + key;}
  //this prevents exit through pressing esc key
  if(keyCode == 27) {keyCode = 0;}
  print(lastInput);
}


function update_text_input() {
  button1_over = false; 
  button2_over = false;
  button3_over = false;
  button4_over = false;
  button1_rect_over = false;
  button2_rect_over = false;
  
  fill(0);
  textFont('Arial');
  textStyle(BOLD);
  textSize(120);
  textAlign(CENTER, BOTTOM)
  text(trim(currentInput), windowWidth/2, (windowHeight/2 - 100));
}


function update_buttons() {
  button1_rect_over = false;
  button2_rect_over = false;
  
  if (overButtonCirc(button1_x, button1_y, button_diameter) ) {button1_over = true;} else {button1_over = false;}
  if (overButtonCirc(button2_x, button2_y, button_diameter) ) {button2_over = true;} else {button2_over = false;}
  if (overButtonCirc(button3_x, button3_y, button_diameter) ) {button3_over = true;} else {button3_over = false;}
  if (overButtonCirc(button4_x, button4_y, button_diameter) ) {button4_over = true;} else {button4_over = false;}
  
  strokeWeight(10); noFill();
  c = 0;
  
  if (button1_over) {ellipse(button1_x, button1_y, button_diameter, button_diameter); c = 1;}
  if (button2_over) {ellipse(button2_x, button2_y, button_diameter, button_diameter); c = 2;}
  if (button3_over) {ellipse(button3_x, button3_y, button_diameter, button_diameter); c = 3;}
  if (button4_over) {ellipse(button4_x, button4_y, button_diameter, button_diameter); c = 4;}
  
  //use this to test the position of the button
  //ellipse(button1_x, button1_y, button_diameter, button_diameter)
  //ellipse(button2_x, button2_y, button_diameter, button_diameter)
  //ellipse(button3_x, button3_y, button_diameter, button_diameter)
  //ellipse(button4_x, button4_y, button_diameter, button_diameter)
  
  
}


function update_rect_button_home() {
  button1_over = false; 
  button2_over = false;
  button3_over = false;
  button4_over = false;
  button2_rect_over = false;
  
  if (overButtonRect(button1_rect_x, button1_rect_y, button1_rect_width, button1_rect_height) ) {button1_rect_over = true;} else {button1_rect_over = false;}
  strokeWeight(10); noFill();
  c = 0;
  if (button1_rect_over) {rect(button1_rect_x, button1_rect_y, button1_rect_width, button1_rect_height); c = 1;}
  
  //use this to test the position of the button
  //rect(button1_rect_x, button1_rect_y, button1_rect_width, button1_rect_height);
}


function update_rect_button_print() {
  button1_over = false; 
  button2_over = false;
  button3_over = false;
  button4_over = false;
  button1_rect_over = false;
  
  if (overButtonRect(button2_rect_x, button2_rect_y, button2_rect_width, button2_rect_height) ) {button2_rect_over = true;} else {button2_rect_over = false;}
  
  strokeWeight(10); noFill();
  c = 0;
  if (button2_rect_over) {rect(button2_rect_x, button2_rect_y, button2_rect_width, button2_rect_height); c = 1;}
  
  //use this to test the position of the button
  //rect(button2_rect_x, button2_rect_y, button2_rect_width, button2_rect_height);
  
  construct_code();
  
}


function construct_code() {
  if ((code_choices[1] == 1)||(code_choices[1] == 2)) {choice1 = "A";}
  if ((code_choices[1] == 3)||(code_choices[1] == 4)) {choice1 = "B";}
  if ((code_choices[2] == 1)||(code_choices[2] == 2)) {choice2 = "A";}
  if ((code_choices[2] == 3)||(code_choices[2] == 4)) {choice2 = "B";}
  if ((code_choices[3] == 1)||(code_choices[3] == 2)) {choice3 = "A";}
  if ((code_choices[3] == 3)||(code_choices[3] == 4)) {choice3 = "B";}
  if ((code_choices[4] == 1)||(code_choices[4] == 2)) {choice4 = "A";}
  if ((code_choices[4] == 3)||(code_choices[4] == 4)) {choice4 = "B";}
  if ((code_choices[5] == 1)||(code_choices[5] == 2)) {choice5 = "A";}
  if ((code_choices[5] == 3)||(code_choices[5] == 4)) {choice5 = "B";}
  if ((code_choices[6] == 1)||(code_choices[6] == 2)) {choice6 = "A";}
  if ((code_choices[6] == 3)||(code_choices[6] == 4)) {choice6 = "B";}
  if ((code_choices[7] == 1)||(code_choices[7] == 2)) {choice7 = "A";}
  if ((code_choices[7] == 3)||(code_choices[7] == 4)) {choice7 = "B";}
  
  code_extended = str(code_choices[1]) + str(code_choices[2]) + str(code_choices[3]) + str(code_choices[4]) + str(code_choices[5]) + str(code_choices[6]) + str(code_choices[7]);
  code_compact = choice1 + choice2 + choice3 + choice4 + choice5 + choice6;
}



function reset_input() {
  lastInput = "";
  currentInput = "";
  code_extended = "";
  code_compact = "";
  code_choices = [];
}


function create_result() {
  var user_name = lastInput.toUpperCase();
  var text_code = "";
  var drawing_name = "";

  text_description   =  "Das 'HAUS " + trim(user_name) + "' ist " + choice1_text[code_choices[1]]
                        + " angelegt und besticht durch sein " + choice2_text[code_choices[2]]
                        + " Konzept. Die " + choice3_text[code_choices[3]]
                        + " Fassadengestaltung entwickelt exemplarische Synergien mit der " + choice4_text[code_choices[4]]
                        + " Struktur des Innenraums. " + choice6_text[code_choices[6]]
                        + " Elemente unterstreichen die kontextuell prägnante Setzung des Volumens in seiner Umgebung. " + choice5_text[code_choices[5]]
                        + " Akzente verleihen dem 'HAUS " + trim(user_name)
                        + "' das gewisse Etwas und machen den Neubau so zu etwas ganz Besonderem.";
                      

  drawing_name = "assets/" + code_compact + ".svg";
  text_code = "n°" + code_extended;
  
  //image(result, windowWidth/2 - result.width/2, windowHeight/2 - result.height/2);
  image(result, windowWidth/2 - result.width/2, windowHeight/2 - result.height/2.5);
  
  fill(0);
  textFont('Arial');
  textStyle(ITALIC);
  textSize(14);
  textAlign(LEFT, CENTER)
  
  text(text_description, windowWidth/2 - windowWidth/4, windowHeight/2 - windowHeight/4, windowWidth/2, windowHeight/2); 
  
}


function overButtonCirc(x, y, diameter) {
  disX = x - mouseX;
  disY = y - mouseY;
  if (sqrt(sq(disX) + sq(disY)) < diameter/2 ) {return true;} else {return false;}
}


function overButtonRect(x, y, rec_width, rec_height)  {
  if (mouseX >= x && mouseX <= x + rec_width && 
      mouseY >= y && mouseY <= y + rec_height) {return true;} else {return false;}
}
