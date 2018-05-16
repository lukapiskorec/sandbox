////////////////////////////////////////////////////////////////
/////////////////HOUSE WITHOUT PROPERTIES///////////////////////
//P5JS WEB VERSION BASED ON THE JAVA DESKTOP VERSION FROM 2015//
/////////////WRITTEN BY LUKA PISKOREC IN 2018///////////////////
////////////////////////////////////////////////////////////////

// defining slider and GUI variables
var rSlider, gSlider, bSlider;
var choice1Slider, choice2Slider, choice3Slider, choice4Slider, choice5Slider, choice6Slider, choice7Slider;
var slider_y_pos = 100;
var slider_y_dist = 50;
var slider_x_pos = 40;
var starting_values = [1,2,3,4];
var ran_values = [];

// defining choice and code variables
var choice1, choice2, choice3, choice4, choice5, choice6, choice7;
var choice1_code, choice2_code, choice3_code, choice4_code, choice5_code, choice6_code, choice7_code;
var choice1_pow, choice2_pow, choice3_pow, choice4_pow, choice5_pow, choice6_pow, choice7_pow;
var code_choices = [];
var code_extended = "";
var code_compact = "";
var code_order;
var drawings = [];
var drawing_scale = 1;
var drag_x = 0;
var drag_y = 0;

// defining the text elements which are used in the generated text
var choice1_text = ["","very generously","rather generously","rather modestly","very modestly"];
var choice2_text = ["","an extraordinarily extravagant","a relatively extravagant","a relatively sustainable","an extraordinarily sustainable"];
var choice3_text = ["","maximally open","mostly open","mostly introverted","maximally introverted"];
var choice4_text = ["","highly flexible","flexible","conventional","highly conventional"];
var choice5_text = ["","Particularly classical","Somewhat classical","Somewhat modern","Particularly modern"];
var choice6_text = ["","Distinctly individualizing","Individualizing","Cautious","Distinctly cautious"];
var choice7_text = ["","succinct","concise","unique","catching"];
var text_description = "";

// defining text input variables
var lastInput = "";
var currentInput = " ";

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
  // create canvas
  createCanvas(windowWidth, windowHeight);
  textSize(15)
  noStroke();

  // create random starting values
  ran_values.push(random(starting_values));
  ran_values.push(random(starting_values));
  ran_values.push(random(starting_values));
  ran_values.push(random(starting_values));
  ran_values.push(random(starting_values));
  ran_values.push(random(starting_values));
  ran_values.push(random(starting_values));
  
  // create architecture sliders with random starting values
  choice1Slider = createSlider(1, 4, ran_values[0]);
  choice1Slider.position(slider_x_pos, slider_y_pos + slider_y_dist);
  choice2Slider = createSlider(1, 4, ran_values[1]);
  choice2Slider.position(slider_x_pos, slider_y_pos + 2*slider_y_dist);
  choice3Slider = createSlider(1, 4, ran_values[2]);
  choice3Slider.position(slider_x_pos, slider_y_pos + 3*slider_y_dist);
  choice4Slider = createSlider(1, 4, ran_values[3]);
  choice4Slider.position(slider_x_pos, slider_y_pos + 4*slider_y_dist);
  choice5Slider = createSlider(1, 4, ran_values[4]);
  choice5Slider.position(slider_x_pos, slider_y_pos + 5*slider_y_dist);
  choice6Slider = createSlider(1, 4, ran_values[5]);
  choice6Slider.position(slider_x_pos, slider_y_pos + 6*slider_y_dist);
  choice7Slider = createSlider(1, 4, ran_values[6]);
  choice7Slider.position(slider_x_pos, slider_y_pos + 7*slider_y_dist);
  
  manifestoSlider = createSlider(1, 2, 1);
  manifestoSlider.position(slider_x_pos, slider_y_pos + 9*slider_y_dist);
}

function draw() {
  background(255, 255, 255);
  
  // operating 7 sliders (6 have influence on choosing the drawing)
  var choice1 = choice1Slider.value();
  var choice2 = choice2Slider.value();
  var choice3 = choice3Slider.value();
  var choice4 = choice4Slider.value();
  var choice5 = choice5Slider.value();
  var choice6 = choice6Slider.value();
  var choice7 = choice7Slider.value();
  var manifesto_toggle = manifestoSlider.value();

  // house code is constructed from the choice made on sliders
  construct_code(choice1, choice2, choice3, choice4, choice5, choice6, choice7);
  
  fill(0);
  textFont('Arial');
  textStyle(ITALIC);
  
  // choosing the house drawing from the preloaded drawings list
  if (manifesto_toggle == 1) {
    imageMode(CENTER);
    ratio = windowHeight/drawing.height
    image(drawings[code_order], windowWidth/2 + drag_x, windowHeight/2 + drag_y, drawing.width*ratio*drawing_scale, windowHeight*drawing_scale);
  }
  // or displaying manifesto text if the toggle is turned on
  else {
    textSize(14);
    textAlign(LEFT, TOP);
    text("The newly built environment in Switzerland reflects the vocabulary through which it is communicated. That is a vocabulary which makes itself independent in today's architectural discourse and which, unquestioned, represents our ideals and standards. It contains words which have only positive connotations and are used as complements, although they contradict each other in their true meaning. Without raised questions, they are stretchy, versatile and seem to rather be a reflection of morality and values ​​of its user than its confrontation with architecture. Through their use, these words are completely stripped of their importance and became degenerated platitudes and projections for diffuse hopes. This autonomous, adaptive vocabulary simultaneously sets the directives in the development process of architecture. In this way, it becomes the reasoning basis for dialogue in the Swiss culture of consensus. In the tension between architects, planners, private investors and the public sector this consensus manifests itself as agreement and approval, where dissent and diversity are perceived as disruptive, which is consistent with a lack of resistance. The built consequence of this consensus is an architecture of compromise - because while none of the parties revolts on the way to this agreement, the cutbacks fall back solely on the architecture. The enfeebled idea loses all ability to make its statement, critical question or a political attitude clear and understandable. The final product and its compatibility stand over its content and the fear of the unknown triumphs over curiosity. Extra effort would have to be demanded from architects for courage, ingenuity and criticism, in order to oppose the absurdity and arbitrariness in the process of making architecture, dried up under the pressure of the economy, the dependency on the inter-disciplinary circus, the social norm and its own self-centered pursuit of success. If architecture becomes pure fulfilment of requirements, rooted in an unreflected, undifferentiated vocabulary, without possessing a coherent whole, then the compromise becomes the enemy of every idea. We must obtain a precise vocabulary to discuss architecture in a critical way.", windowWidth/2 - windowWidth/4, slider_y_pos + slider_y_dist - 15, windowWidth/2, windowHeight);  
  }
  
  // displaying GUI and generated text
  textAlign(LEFT, CENTER);
  textSize(15);
  text("House Without Properties", slider_x_pos - 20, 40);
  
  textSize(14);
  text("n° " + code_compact, slider_x_pos - 20, 60);
  
  textAlign(LEFT, CENTER);
  textSize(14);
  text("Generous", slider_x_pos - 20, slider_y_pos + slider_y_dist - 10);
  text("Extravagant", slider_x_pos - 20, slider_y_pos + 2*slider_y_dist - 10);
  text("Open", slider_x_pos - 20, slider_y_pos + 3*slider_y_dist - 10);
  text("Flexible", slider_x_pos - 20, slider_y_pos + 4*slider_y_dist - 10);
  text("Classical", slider_x_pos - 20, slider_y_pos + 5*slider_y_dist - 10);
  text("Individualizing", slider_x_pos - 20, slider_y_pos + 6*slider_y_dist - 10);
  text("Contextual", slider_x_pos - 20, slider_y_pos + 7*slider_y_dist - 10);
  text("House", slider_x_pos - 20, slider_y_pos + 9*slider_y_dist - 10);
  
  textAlign(RIGHT, CENTER);
  text("Modest", slider_x_pos + 150, slider_y_pos + slider_y_dist - 10);
  text("Sustainable", slider_x_pos + 150, slider_y_pos + 2*slider_y_dist - 10);
  text("Introverted", slider_x_pos + 150, slider_y_pos + 3*slider_y_dist - 10);
  text("Conventional", slider_x_pos + 150, slider_y_pos + 4*slider_y_dist - 10);
  text("Modern", slider_x_pos + 150, slider_y_pos + 5*slider_y_dist - 10);
  text("Cautious", slider_x_pos + 150, slider_y_pos + 6*slider_y_dist - 10);
  text("Catching", slider_x_pos + 150, slider_y_pos + 7*slider_y_dist - 10);
  text("Manifesto", slider_x_pos + 150, slider_y_pos + 9*slider_y_dist - 10);
  
  textAlign(LEFT, CENTER);
  text_description   =  "The 'House " + trim(currentInput) + "' is " + choice1_text[choice1]
                        + " built and captivates by having " + choice2_text[choice2]
                        + " concept. The " + choice3_text[choice3]
                        + " facade design develops exemplary synergies with the " + choice4_text[choice4]
                        + " structure of the interior. " + choice6_text[choice6]
                        + " elements underline the contextually " + choice7_text[choice7]
                        + " placement of the volume in its environment. " + choice5_text[choice5]
                        + " accents give the 'House " + trim(currentInput)
                        + "' that certain 'something' and make the new building so distinctive.";
  
  //text(code_compact, 500, 200);
  //text(str(code_order), 500, 300);
  //text(trim(currentInput), 500, 300);
  
  text(text_description, windowWidth/2 - windowWidth/4, windowHeight/2 + windowHeight/8, windowWidth/2, windowHeight/2); 
}


function windowResized() {
  // canvas adapts when browser window is resized
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  // drawing scales twice when the mouse is pressed
  if (mouseX < 200) {drawing_scale = 1; drag_x = 0; drag_y = 0;}
  if (mouseX >= 200) {drawing_scale = 2; drag_x = (windowWidth/2) - mouseX; drag_y = (windowHeight/2) - mouseY;} 
}

function mouseDragged() {
  // drawing is panned when the mouse is dragged
  if (mouseX < 200) {drag_x = 0; drag_y = 0;}
  if (mouseX >= 200) {drag_x = (windowWidth/2) - mouseX; drag_y = (windowHeight/2) - mouseY;}
}

function mouseReleased() {
  // drawings scale and translation is reset when the mouse is released
  drawing_scale = 1;
  drag_x = 0;
  drag_y = 0;
} 

function keyPressed() {
  // house name input comes from the keyboard
  if(keyCode == ENTER) {user_name = currentInput;  currentInput = currentInput + key; currentInput = "";}
  else if(keyCode == BACKSPACE && currentInput.length > 0) {currentInput = currentInput.substring(0, currentInput.length - 1);} 
  else {currentInput = currentInput + key;}
}

function construct_code(choice1, choice2, choice3, choice4, choice5, choice6, choice7) {
  // code is constructed from 7 choices on the sliders (6 for the drawing, 7 for the text)
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
