////////////////////////////////////////////////////////////////
/////////////////HAUSE OHNE EIGENSCHAFTEN///////////////////////
//P5JS WEB VERSION BASED ON THE JAVA DESKTOP VERSION FROM 2015//
/////////////WRITTEN BY LUKA PISKOREC IN 2018///////////////////
////////////////////////////////////////////////////////////////

//defining number of screens
var screen_nr = 0;
var max_screens = 11;

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

var button1_x, button2_x, button3_x, button4_x;
var button1_y, button2_y, button3_y, button4_y;

var button1_rect_x, button1_rect_y;
var button1_rect_width = 60;
var button1_rect_height = 60;
var button1_rect_offset = 20;

var button2_rect_x, button2_rect_y;
var button2_rect_width = 355;
var button2_rect_height = 85;

var button3_rect_x, button3_rect_y;
var button3_rect_width = 100;
var button3_rect_height = 50;

//defining input variables
var lastInput = "";
var currentInput = "";

var c = 0;
var code_choices = [];
var code_extended = "";
var code_compact = "";
var code_order;
var drawings = [];
var drawing_scale = 1;
var drag_x = 0;
var drag_y = 0;

var choice1, choice2, choice3, choice4, choice5, choice6, choice7;
var choice1_code, choice2_code, choice3_code, choice4_code, choice5_code, choice6_code, choice7_code;
var choice1_pow, choice2_pow, choice3_pow, choice4_pow, choice5_pow, choice6_pow, choice7_pow;

// defining the text elements which are used in the generated text
var choice1_text_de = ["","sehr grosszügig","eher grosszügig","eher bescheiden","sehr bescheiden"];
var choice2_text_de = ["","ausserordentlich aufwendiges","relativ aufwendiges","relativ nachhaltiges","ausserordentlich nachhaltiges"];
var choice3_text_de = ["","maximal offene","mehrheitlich offene","mehrheitlich introvertierte","maximal introvertierte"];
var choice4_text_de = ["","hochflexiblen","flexiblen","konventionellen","hochkonventionellen"];
var choice5_text_de = ["","Klassische","Klassische","Moderne","Moderne"];
var choice6_text_de = ["","Viele identitätsstiftende","Identitätsstiftende","Zurückhaltende","Wenige zurückhaltende"];

var choice1_text_en = ["","very generously","rather generously","rather modestly","very modestly"];
var choice2_text_en = ["","an extraordinarily extravagant","a relatively extravagant","a relatively sustainable","an extraordinarily sustainable"];
var choice3_text_en = ["","maximally open","mostly open","mostly introverted","maximally introverted"];
var choice4_text_en = ["","highly flexible","flexible","conventional","highly conventional"];
var choice5_text_en = ["","Particularly classical","Somewhat classical","Somewhat modern","Particularly modern"];
var choice6_text_en = ["","Distinctly individualizing","Individualizing","Cautious","Distinctly cautious"];
var choice7_text_en = ["","succinct","concise","unique","catching"];

var text_description_de = "";
var text_description_en = "";


function preload() {
  // preloading 64 drawings separately and appending it to the drawings list
  drawing = loadImage("assets/AAAAAA.jpg"); drawings.push(drawing);//1
  drawing = loadImage("assets/AAAAAB.jpg"); drawings.push(drawing);//2
  drawing = loadImage("assets/AAAABA.jpg"); drawings.push(drawing);//3
  drawing = loadImage("assets/AAAABB.jpg"); drawings.push(drawing);//4
  drawing = loadImage("assets/AAABAA.jpg"); drawings.push(drawing);//5
  drawing = loadImage("assets/AAABAB.jpg"); drawings.push(drawing);//6
  drawing = loadImage("assets/AAABBA.jpg"); drawings.push(drawing);//7
  drawing = loadImage("assets/AAABBB.jpg"); drawings.push(drawing);//8
  drawing = loadImage("assets/AABAAA.jpg"); drawings.push(drawing);//9
  drawing = loadImage("assets/AABAAB.jpg"); drawings.push(drawing);//10
  drawing = loadImage("assets/AABABA.jpg"); drawings.push(drawing);//11
  drawing = loadImage("assets/AABABB.jpg"); drawings.push(drawing);//12
  drawing = loadImage("assets/AABBAA.jpg"); drawings.push(drawing);//13
  drawing = loadImage("assets/AABBAB.jpg"); drawings.push(drawing);//14
  drawing = loadImage("assets/AABBBA.jpg"); drawings.push(drawing);//15
  drawing = loadImage("assets/AABBBB.jpg"); drawings.push(drawing);//16
  drawing = loadImage("assets/ABAAAA.jpg"); drawings.push(drawing);//17
  drawing = loadImage("assets/ABAAAB.jpg"); drawings.push(drawing);//18
  drawing = loadImage("assets/ABAABA.jpg"); drawings.push(drawing);//19
  drawing = loadImage("assets/ABAABB.jpg"); drawings.push(drawing);//20
  drawing = loadImage("assets/ABABAA.jpg"); drawings.push(drawing);//21
  drawing = loadImage("assets/ABABAB.jpg"); drawings.push(drawing);//22
  drawing = loadImage("assets/ABABBA.jpg"); drawings.push(drawing);//23
  drawing = loadImage("assets/ABABBB.jpg"); drawings.push(drawing);//24
  drawing = loadImage("assets/ABBAAA.jpg"); drawings.push(drawing);//25
  drawing = loadImage("assets/ABBAAB.jpg"); drawings.push(drawing);//26
  drawing = loadImage("assets/ABBABA.jpg"); drawings.push(drawing);//27
  drawing = loadImage("assets/ABBABB.jpg"); drawings.push(drawing);//28
  drawing = loadImage("assets/ABBBAA.jpg"); drawings.push(drawing);//29
  drawing = loadImage("assets/ABBBAB.jpg"); drawings.push(drawing);//30
  drawing = loadImage("assets/ABBBBA.jpg"); drawings.push(drawing);//31
  drawing = loadImage("assets/ABBBBB.jpg"); drawings.push(drawing);//32
  drawing = loadImage("assets/BAAAAA.jpg"); drawings.push(drawing);//33
  drawing = loadImage("assets/BAAAAB.jpg"); drawings.push(drawing);//34
  drawing = loadImage("assets/BAAABA.jpg"); drawings.push(drawing);//35
  drawing = loadImage("assets/BAAABB.jpg"); drawings.push(drawing);//36
  drawing = loadImage("assets/BAABAA.jpg"); drawings.push(drawing);//37
  drawing = loadImage("assets/BAABAB.jpg"); drawings.push(drawing);//38
  drawing = loadImage("assets/BAABBA.jpg"); drawings.push(drawing);//39
  drawing = loadImage("assets/BAABBB.jpg"); drawings.push(drawing);//40
  drawing = loadImage("assets/BABAAA.jpg"); drawings.push(drawing);//41
  drawing = loadImage("assets/BABAAB.jpg"); drawings.push(drawing);//42
  drawing = loadImage("assets/BABABA.jpg"); drawings.push(drawing);//43
  drawing = loadImage("assets/BABABB.jpg"); drawings.push(drawing);//44
  drawing = loadImage("assets/BABBAA.jpg"); drawings.push(drawing);//45
  drawing = loadImage("assets/BABBAB.jpg"); drawings.push(drawing);//46
  drawing = loadImage("assets/BABBBA.jpg"); drawings.push(drawing);//47
  drawing = loadImage("assets/BABBBB.jpg"); drawings.push(drawing);//48
  drawing = loadImage("assets/BBAAAA.jpg"); drawings.push(drawing);//49
  drawing = loadImage("assets/BBAAAB.jpg"); drawings.push(drawing);//50
  drawing = loadImage("assets/BBAABA.jpg"); drawings.push(drawing);//51
  drawing = loadImage("assets/BBAABB.jpg"); drawings.push(drawing);//52
  drawing = loadImage("assets/BBABAA.jpg"); drawings.push(drawing);//53
  drawing = loadImage("assets/BBABAB.jpg"); drawings.push(drawing);//54
  drawing = loadImage("assets/BBABBA.jpg"); drawings.push(drawing);//55
  drawing = loadImage("assets/BBABBB.jpg"); drawings.push(drawing);//56
  drawing = loadImage("assets/BBBAAA.jpg"); drawings.push(drawing);//57
  drawing = loadImage("assets/BBBAAB.jpg"); drawings.push(drawing);//58
  drawing = loadImage("assets/BBBABA.jpg"); drawings.push(drawing);//59
  drawing = loadImage("assets/BBBABB.jpg"); drawings.push(drawing);//60
  drawing = loadImage("assets/BBBBAA.jpg"); drawings.push(drawing);//61
  drawing = loadImage("assets/BBBBAB.jpg"); drawings.push(drawing);//62
  drawing = loadImage("assets/BBBBBA.jpg"); drawings.push(drawing);//63
  drawing = loadImage("assets/BBBBBB.jpg"); drawings.push(drawing);//64 
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  button1_rect_x = windowWidth/2 - button1_rect_width/2;
  button1_rect_y = windowHeight/2 - button1_rect_height/2 + 200;
  
  button1_x = windowWidth/2 - 276;
  button2_x = button1_x + button_xstep;
  button3_x = button1_x + button_xstep * 2;
  button4_x = button1_x + button_xstep * 3;
  
  button1_y = windowHeight/2 + 140;
  button2_y = button1_y;
  button3_y = button1_y;
  button4_y = button1_y;
  
  button2_rect_x = windowWidth/2 - 185;
  button2_rect_y = windowHeight/2 - 125;
  
  button3_rect_x = windowWidth/8 - 25;
  button3_rect_y = windowHeight - 100;
}


function draw() {
  background(255);
  
  if (screen_nr == 0) {show_screen_0();}
  if ((screen_nr == 1)||(screen_nr == 2)||(screen_nr == 3)||(screen_nr == 4)||(screen_nr == 5)||(screen_nr == 6)||(screen_nr == 7)) {show_screen_choices(screen_nr);}
  if (screen_nr == 8) {show_screen_8();}
  if (screen_nr == 9) {show_screen_9();}
  if (screen_nr == 10) {show_screen_final();}
  
  //home screen
  if (screen_nr == 0) {update_rect_button_home();}
  //screens for house trait choices
  if ((screen_nr == 1)||(screen_nr == 2)||(screen_nr == 3)||(screen_nr == 4)||(screen_nr == 5)||(screen_nr == 6)||(screen_nr == 7)) {update_buttons();}
  //name input screen
  if (screen_nr == 8) {update_text_input();}
  //print screen
  if (screen_nr == 9) {update_rect_button_print();} 
  //drawing screen
  if (screen_nr == 10) {update_final_button();} 
}


function show_screen_0() {
  fill(0);
  textFont('Arial');
  textAlign(CENTER, CENTER);
  vert_step = 40;
  
  line_1 = "Willkommen!";
  line_2 = "Wählen Sie die Eigenschaften für Ihr Haus auf der Skala von 1 bis 4 durch anklicken der entsprechenden Zahl.";
  line_3 = "Choose the characteristics of your house on the scale of 1 to 4 by clicking the corresponding number.";
  
  textStyle(BOLD);
  textSize(40);
  text(line_1, windowWidth/2 - windowWidth/4, windowHeight/2 - windowHeight/4 - vert_step*2, windowWidth/2, windowHeight/2); 
  
  textSize(20);
  text(line_2, windowWidth/2 - windowWidth/4, windowHeight/2 - windowHeight/4 + vert_step*0, windowWidth/2, windowHeight/2); 
  
  textStyle(NORMAL);
  text(line_3, windowWidth/2 - windowWidth/4, windowHeight/2 - windowHeight/4 + vert_step*2, windowWidth/2, windowHeight/2); 
  
  arrow_x1 = windowWidth/2 - button1_rect_width/2;
  arrow_y1 = windowHeight/2 - button1_rect_height/2 + 200;
  arrow_x2 = windowWidth/2 - button1_rect_width/2;
  arrow_y2 = windowHeight/2 + button1_rect_height/2 + 200;
  arrow_x3 = windowWidth/2 + button1_rect_width/2;
  arrow_y3 = windowHeight/2 + 200;
  
  triangle(arrow_x1, arrow_y1, arrow_x2, arrow_y2, arrow_x3, arrow_y3);
}


function show_screen_choices(screen_nr) {
  fill(0);
  textFont('Arial');
  
  vert_step = 40;
  mid_gap = 100;
  line_offset = -50;
  
  if (screen_nr == 1){line_1_1 = "Gross";line_1_2 = "zügig";line_2_1 = "Beschei";line_2_2 = "den";line_3 = "Generous";line_4 = "Modest";};
  if (screen_nr == 2){line_1_1 = "Auf";line_1_2 = "wendig";line_2_1 = "Nach";line_2_2 = "haltig";line_3 = "Extravagant";line_4 = "Sustainable";};
  if (screen_nr == 3){line_1_1 = "Of";line_1_2 = "fen";line_2_1 = "Intro";line_2_2 = "vertiert";line_3 = "Open";line_4 = "Introverted";};
  if (screen_nr == 4){line_1_1 = "Flexi";line_1_2 = "bel";line_2_1 = "Konven";line_2_2 = "tionell";line_3 = "Flexible";line_4 = "Conventional";};
  if (screen_nr == 5){line_1_1 = "Klas";line_1_2 = "sisch";line_2_1 = "Mo";line_2_2 = "dern";line_3 = "Classical";line_4 = "Modern";};
  if (screen_nr == 6){line_1_1 = "Identitäts";line_1_2 = "stiftend";line_2_1 = "Zurück";line_2_2 = "haltend";line_3 = "Individualizing";line_4 = "Cautious";};
  if (screen_nr == 7){line_1_1 = "Kontex";line_1_2 = "tuell";line_2_1 = "Präg";line_2_2 = "nant";line_3 = "Contextual";line_4 = "Catching";};
  
  textStyle(BOLD);
  textSize(80);
  textAlign(RIGHT, TOP);
  text(line_1_1, windowWidth/2 - windowWidth/4 - mid_gap, windowHeight/2 - windowHeight/4 - vert_step*2, windowWidth/4, windowHeight/4);
  text(line_1_2, windowWidth/2 - windowWidth/4 - mid_gap, windowHeight/2 - windowHeight/4 - vert_step*0, windowWidth/4, windowHeight/4);
  textAlign(LEFT, TOP)
  text(line_2_1, windowWidth/2 + mid_gap, windowHeight/2 - windowHeight/4 - vert_step*2, windowWidth/4, windowHeight/4); 
  text(line_2_2, windowWidth/2 + mid_gap, windowHeight/2 - windowHeight/4 - vert_step*0, windowWidth/4, windowHeight/4); 
  
  textStyle(NORMAL);
  textSize(30);
  textAlign(RIGHT, TOP);
  text(line_3, windowWidth/2 - windowWidth/4 - mid_gap, windowHeight/2 - windowHeight/4 + vert_step*2.5, windowWidth/4, windowHeight/4); 
  textAlign(LEFT, TOP)
  text(line_4, windowWidth/2 + mid_gap, windowHeight/2 - windowHeight/4 + vert_step*2.5, windowWidth/4, windowHeight/4); 
  
  textSize(30);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("1", button1_x, button1_y);
  text("2", button2_x, button2_y);
  text("3", button3_x, button3_y);
  text("4", button4_x, button4_y);
  
  strokeWeight(1);
  line(button1_x, button1_y + line_offset, button4_x, button4_y + line_offset);
  line(button1_x, button1_y + line_offset, button1_x, button1_y + line_offset/1.5);
  line(button2_x, button2_y + line_offset, button2_x, button2_y + line_offset/1.5);
  line(button3_x, button3_y + line_offset, button3_x, button3_y + line_offset/1.5);
  line(button4_x, button4_y + line_offset, button4_x, button4_y + line_offset/1.5);
}


function show_screen_8() {
  fill(0);
  textFont('Arial');
  textAlign(CENTER, CENTER);
  vert_step = 40;
  
  line_1 = ". . .";
  line_2 = "Schreiben Sie den Namen Ihres Hauses und drucken Sie ENTER.";
  line_3 = "Give your house a name and press ENTER.";
  
  textStyle(BOLD);
  textSize(40);
  text(line_1, windowWidth/2 - windowWidth/4, windowHeight/2 - windowHeight/4 - vert_step*2, windowWidth/2, windowHeight/2); 
  
  textSize(20);
  text(line_2, windowWidth/2 - windowWidth/4, windowHeight/2 - windowHeight/4 + vert_step*0, windowWidth/2, windowHeight/2); 
  
  textStyle(NORMAL);
  text(line_3, windowWidth/2 - windowWidth/4, windowHeight/2 - windowHeight/4 + vert_step*2, windowWidth/2, windowHeight/2); 
}


function show_screen_9() {
  fill(0);
  textFont('Arial');
  textAlign(CENTER, CENTER);
  vert_step = 40;
  
  line_1 = "GENERATE";
  line_2 = "Klicken Sie auf GENERATE um Ihr Haus zu kriegen.";
  line_3 = "Click GENERATE to get your house.";
  
  textStyle(BOLD);
  textSize(60);
  text(line_1, windowWidth/2 - windowWidth/4, windowHeight/2 - windowHeight/4 - vert_step*2, windowWidth/2, windowHeight/2); 
  
  textSize(20);
  text(line_2, windowWidth/2 - windowWidth/4, windowHeight/2 - windowHeight/4 + vert_step*0, windowWidth/2, windowHeight/2); 
  
  textStyle(NORMAL);
  text(line_3, windowWidth/2 - windowWidth/4, windowHeight/2 - windowHeight/4 + vert_step*2, windowWidth/2, windowHeight/2); 
}


function show_screen_final() {
  var user_name = lastInput.toUpperCase();
  var text_code = "";

  // house code is constructed from the choices
  construct_code(code_choices);
  
  //construct house descriptions
  text_description_de   =  "Das 'HAUS " + trim(user_name) + "' ist " + choice1_text_de[code_choices[1]]
                        + " angelegt und besticht durch sein " + choice2_text_de[code_choices[2]]
                        + " Konzept. Die " + choice3_text_de[code_choices[3]]
                        + " Fassadengestaltung entwickelt exemplarische Synergien mit der " + choice4_text_de[code_choices[4]]
                        + " Struktur des Innenraums. " + choice6_text_de[code_choices[6]]
                        + " Elemente unterstreichen die kontextuell prägnante Setzung des Volumens in seiner Umgebung. " + choice5_text_de[code_choices[5]]
                        + " Akzente verleihen dem 'HAUS " + trim(user_name)
                        + "' das gewisse Etwas und machen den Neubau so zu etwas ganz Besonderem.";
                      
  text_description_en   =  "The 'HOUSE " + trim(user_name) + "' is " + choice1_text_en[code_choices[1]]
                        + " built and captivates by having " + choice2_text_en[code_choices[2]]
                        + " concept. The " + choice3_text_en[code_choices[3]]
                        + " facade design develops exemplary synergies with the " + choice4_text_en[code_choices[4]]
                        + " structure of the interior. " + choice6_text_en[code_choices[6]]
                        + " elements underline the contextually " + choice7_text_en[code_choices[7]]
                        + " placement of the volume in its environment. " + choice5_text_en[code_choices[5]]
                        + " accents give the 'HOUSE " + trim(user_name)
                        + "' that certain 'something' and make the new building so distinctive.";
  
  text_code = "n°" + code_compact;
  
  //display the selected drawing
  imageMode(CENTER);
  drawing = drawings[code_order];
  ratio = windowHeight/drawing.height;
  image(drawing, windowWidth/2 + windowWidth/4 + 2*drag_x, windowHeight/2 + windowHeight/8 + 2*drag_y, drawing.width*ratio*drawing_scale, windowHeight*drawing_scale);
  
  // display description text
  fill(0);
  textFont('Arial');
  textSize(14);
  textAlign(LEFT, LEFT);
  
  textStyle(BOLD);
  text("Haus ohne Eigenschaften", windowWidth/8, windowHeight/8 - 60, windowWidth/4 + windowWidth/8, windowHeight/4);
  textStyle(NORMAL);
  text("House Without Properties", windowWidth/8, windowHeight/8 - 40, windowWidth/4 + windowWidth/8, windowHeight/4);
  textStyle(ITALIC);
  text(text_code, windowWidth/8, windowHeight/8, windowWidth/4 + windowWidth/8, windowHeight/4);
  textStyle(BOLD);
  text(text_description_de, windowWidth/8, windowHeight/2 - windowHeight/8, windowWidth/4 + 0*windowWidth/8, windowHeight/4);
  textStyle(NORMAL);
  text(text_description_en, windowWidth/8, windowHeight/2 + windowHeight/8, windowWidth/4 + 0*windowWidth/8, windowHeight/4); 
  
  textAlign(LEFT, LEFT);
  textStyle(BOLD);
  text("RESET", windowWidth/8, windowHeight - 100, windowWidth/4 + windowWidth/8, 50); 
  
  textSize(10);
  textAlign(LEFT, LEFT);
  textStyle(ITALIC);
  var credits = "Created by TEN with Celine Bessire, Matthias Winter and Guillermo Dürig, coded by Luka Piškorec, 2018";
  text(credits, windowWidth/8, windowHeight - 50, windowWidth/2, 50); 
}


function construct_code(code_choices) {
  choice1 = code_choices[1];
  choice2 = code_choices[2];
  choice3 = code_choices[3];
  choice4 = code_choices[4];
  choice5 = code_choices[5];
  choice6 = code_choices[6];
  choice7 = code_choices[7];
  
  // code is constructed from 7 choices (6 for the drawing, 7 for the text)
  if ((choice1 == 1)||(choice1 == 2)) {choice1_code = "A"; choice1_pow = 0;}
  if ((choice1 == 3)||(choice1 == 4)) {choice1_code = "B"; choice1_pow = 1;}
  if ((choice2 == 1)||(choice2 == 2)) {choice2_code = "A"; choice2_pow = 0;}
  if ((choice2 == 3)||(choice2 == 4)) {choice2_code = "B"; choice2_pow = 1;}
  if ((choice3 == 1)||(choice3 == 2)) {choice3_code = "A"; choice3_pow = 0;}
  if ((choice3 == 3)||(choice3 == 4)) {choice3_code = "B"; choice3_pow = 1;}
  if ((choice4 == 1)||(choice4 == 2)) {choice4_code = "A"; choice4_pow = 0;}
  if ((choice4 == 3)||(choice4 == 4)) {choice4_code = "B"; choice4_pow = 1;}
  if ((choice5 == 1)||(choice5 == 2)) {choice5_code = "A"; choice5_pow = 0;}
  if ((choice5 == 3)||(choice5 == 4)) {choice5_code = "B"; choice5_pow = 1;}
  if ((choice6 == 1)||(choice6 == 2)) {choice6_code = "A"; choice6_pow = 0;}
  if ((choice6 == 3)||(choice6 == 4)) {choice6_code = "B"; choice6_pow = 1;}
  if ((choice7 == 1)||(choice7 == 2)) {choice7_code = "A";}
  if ((choice7 == 3)||(choice7 == 4)) {choice7_code = "B";}
  
  // code_compact is the 6 letter name of the drawing
  code_compact = choice1_code + choice2_code + choice3_code + choice4_code + choice5_code + choice6_code;
  // we calculate the index in the drawings list from the binary code
  // this only works because we fill the drawings list in a very specific order
  code_order = pow(2,5)*choice1_pow + pow(2,4)*choice2_pow + pow(2,3)*choice3_pow + pow(2,2)*choice4_pow + pow(2,1)*choice5_pow + pow(2,0)*choice6_pow;
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  button1_rect_x = windowWidth/2 - button1_rect_width/2;
  button1_rect_y = windowHeight/2 - button1_rect_height/2 + 200;
  
  button1_x = windowWidth/2 - 276;
  button2_x = button1_x + button_xstep;
  button3_x = button1_x + button_xstep * 2;
  button4_x = button1_x + button_xstep * 3;
  
  button1_y = windowHeight/2 + 140;
  button2_y = button1_y;
  button3_y = button1_y;
  button4_y = button1_y;
  
  button2_rect_x = windowWidth/2 - 185;
  button2_rect_y = windowHeight/2 - 125;
  
  button3_rect_x = windowWidth/8 - 25;
  button3_rect_y = windowHeight - 100;
}


function mousePressed() {
  if ((button1_over == true)||(button2_over == true)||(button3_over == true)||(button4_over == true)||(button1_rect_over == true)||(button2_rect_over == true)||(button3_rect_over == true)) {
    screen_nr += 1;
    append(code_choices, c);
    if (screen_nr > (max_screens - 1)) {screen_nr = 0; reset_input();}
  }
  // drawing scales twice when the mouse is pressed
  if (mouseX < windowWidth/2) {drawing_scale = 1; drag_x = 0; drag_y = 0;}
  if (mouseX >= windowWidth/2) {drawing_scale = 4; drag_x = (windowWidth/2 + windowWidth/4) - mouseX; drag_y = (windowHeight/2) - mouseY;}
}


function mouseDragged() {
  // drawing is panned when the mouse is dragged
  if (mouseX < windowWidth/2) {drag_x = 0; drag_y = 0;}
  if (mouseX >= windowWidth/2) {drag_x = (windowWidth/2 + windowWidth/4) - mouseX; drag_y = (windowHeight/2) - mouseY;}
}


function mouseReleased() {
  // drawings scale and translation is reset when the mouse is released
  drawing_scale = 1;
  drag_x = 0;
  drag_y = 0;
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
  button3_rect_over = false;
  
  fill(0);
  textFont('Arial');
  textStyle(BOLD);
  textSize(60);
  textAlign(CENTER, BOTTOM)
  text(trim(currentInput), windowWidth/2, (windowHeight/2 - 100));
}


function update_buttons() {
  button1_rect_over = false;
  button2_rect_over = false;
  button3_rect_over = false;
  
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
  button3_rect_over = false;
  
  if (overButtonRect(button1_rect_x, button1_rect_y, button1_rect_width, button1_rect_height) ) {button1_rect_over = true;} else {button1_rect_over = false;}
  strokeWeight(10); noFill();
  c = 0;
  if (button1_rect_over) {rect(button1_rect_x - button1_rect_offset, button1_rect_y - button1_rect_offset, button1_rect_width + 2*button1_rect_offset, button1_rect_height + 2*button1_rect_offset); c = 1;}
  
  //use this to test the position of the button
  //rect(button1_rect_x, button1_rect_y, button1_rect_width, button1_rect_height);
}


function update_rect_button_print() {
  button1_over = false; 
  button2_over = false;
  button3_over = false;
  button4_over = false;
  button1_rect_over = false;
  button3_rect_over = false;
  
  if (overButtonRect(button2_rect_x, button2_rect_y, button2_rect_width, button2_rect_height) ) {button2_rect_over = true;} else {button2_rect_over = false;}
  
  strokeWeight(10); noFill();
  c = 0;
  if (button2_rect_over) {rect(button2_rect_x, button2_rect_y, button2_rect_width, button2_rect_height); c = 1;}
  
  //use this to test the position of the button
  //rect(button2_rect_x, button2_rect_y, button2_rect_width, button2_rect_height);
}


function update_final_button() {
  button1_over = false; 
  button2_over = false;
  button3_over = false;
  button4_over = false;
  button1_rect_over = false;
  button2_rect_over = false;

  if (overButtonRect(button3_rect_x, button3_rect_y, button3_rect_width, button3_rect_height) ) {button3_rect_over = true;} else {button3_rect_over = false;}
  
  strokeWeight(10); noFill();
  c = 0;
  if (button3_rect_over) {rect(button3_rect_x, button3_rect_y, button3_rect_width, button3_rect_height); c = 1;}
  
  //use this to test the position of the button
  //rect(button3_rect_x, button3_rect_y, button3_rect_width, button3_rect_height);
}


function reset_input() {
  lastInput = "";
  currentInput = "";
  code_extended = "";
  code_compact = "";
  code_choices = [];
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
