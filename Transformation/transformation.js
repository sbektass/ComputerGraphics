var canvas;
var gl;
var colorLocation;
var theta;
var red,green,blue;
var theta=0;
var radyan=(theta*Math.PI/180);
var Sx = 1.0, Sy = 1.0, Sz = 1.0;
var S=1.0;
var dx = 0.0, dy = 0.0, dz = 0.0;
var r1=Math.cos(radyan), r2=-Math.sin(radyan), r3=Math.sin(radyan), r4=Math.cos(radyan); 
var TranslateLocation, RotateLocation, ScaleLocation;
var Ax=0.0,Ay=0.0;

//Dondurmek icin kullanılan matrix tanımlaması
var RotateMatrix= new Float32Array([
	r1,  r2,  0.0, 0.0,
	r3,  r4,  0.0, 0.0,
	0.0, 0.0, 1.0, 0.0,
	0.0, 0.0, 0.0, 1.0]);
//Olceklendirme icin kullanılan matrix tanımlaması
var ScaleMatrix = new Float32Array([
	Sx,   0.0,  0.0,  0.0,
	0.0,  Sy,   0.0,  0.0,
	0.0,  0.0,  Sz,   0.0,
	0.0,  0.0,  0.0,  1.0  ]);	

window.onload = function init() {

   var canvas = document.getElementById( "gl-canvas");
  // Initialize the GL context
   gl = WebGLUtils.setupWebGL( canvas );
  // Only continue if WebGL is available and working
  if (!gl)
  {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
  	
		
	var translatex= document.getElementById("xkonumslider"); 
	translatex.addEventListener("click", function() {
	var TranslateLocation=gl.getUniformLocation(program, 's_translate');
	dx=document.getElementById("xkonumslider").value;
	gl.uniform3f(TranslateLocation,dx, dy,0.0);});
	
	var translatey= document.getElementById("ykonumslider"); 
	translatey.addEventListener("click", function() {
	var TranslateLocation=gl.getUniformLocation(program, 's_translate');
	dy=document.getElementById("ykonumslider").value;
	gl.uniform3f(TranslateLocation,dx, dy,0.0);}); 
	
	document.getElementById("Dondurme").onclick = function( event){
        switch(event.target.index) {
         case 0:
            theta = theta+15;
            break;

         case 1:
           theta = theta-15;
            break;
       }
		radyan= (theta*Math.PI/180);
		r1=Math.cos(radyan), r2=-Math.sin(radyan), r3=Math.sin(radyan), r4=Math.cos(radyan);
		var RotateMatrix= new Float32Array([
		r1,  r2,  0.0, 0.0,
		r3,  r4,  0.0, 0.0,
		0.0, 0.0, 1.0, 0.0,
		0.0, 0.0, 0.0, 1.0]);	
			
	RotateLocation = gl.getUniformLocation(program, 's_rotation');
    gl.uniformMatrix4fv(RotateLocation, false, RotateMatrix);};


	var scale_slider= document.getElementById("olceklendirme"); 
	scale_slider.addEventListener("click", function() {
	ScaleLocation = gl.getUniformLocation(program, 'sscale_matrix');
	var Sx = document.getElementById("olceklendirme").value, Sy = document.getElementById("olceklendirme").value, Sz = 1.0;
    var ScaleMatrix = new Float32Array([
		Sx,   0.0,  0.0,  0.0,
		0.0,  Sy,   0.0,  0.0,
		0.0,  0.0,  Sz,   0.0,
		0.0,  0.0,  0.0,  1.0 ]);
	gl.uniformMatrix4fv(ScaleLocation, false, ScaleMatrix);});	
	

	window.addEventListener("keydown", function (event) {
        switch (event.key) {
          case "ArrowLeft":
				theta -= 15;
				radyan= (theta*Math.PI/180);
				r1=Math.cos(radyan), r2=-Math.sin(radyan), r3=Math.sin(radyan), r4=Math.cos(radyan);
				var RotateMatrix= new Float32Array([
						r1,  r2,  0.0, 0.0,
						r3,  r4,  0.0, 0.0,
						0.0, 0.0, 1.0, 0.0,
						0.0, 0.0, 0.0, 1.0]);
				RotateLocation = gl.getUniformLocation(program, 's_rotation');
				gl.uniformMatrix4fv(RotateLocation, false, RotateMatrix);
            break;
          case "ArrowRight":
				theta += 15;
				radyan= (theta*Math.PI/180);
				r1=Math.cos(radyan), r2=-Math.sin(radyan), r3=Math.sin(radyan), r4=Math.cos(radyan);
				var RotateMatrix= new Float32Array([
					r1,  r2,  0.0, 0.0,
					r3,  r4,  0.0, 0.0,
					0.0, 0.0, 1.0, 0.0,
					0.0, 0.0, 0.0, 1.0]);
				RotateLocation = gl.getUniformLocation(program, 's_rotation');
				gl.uniformMatrix4fv(RotateLocation, false, RotateMatrix);
            break;
			
				case "a":
		
				Ax=Ax-0.1;
				TranslateLocation=gl.getUniformLocation(program, 's_translate');
				gl.uniform3f(TranslateLocation,Ax,Ay,0.0);
            break;
						
				case "d":
		
				Ax=Ax+0.1;
				TranslateLocation=gl.getUniformLocation(program, 's_translate');
				gl.uniform3f(TranslateLocation,Ax,Ay,0.0);
            break;
			
			case "w":
		
				Ay=Ay+0.1;
				TranslateLocation=gl.getUniformLocation(program, 's_translate');
				gl.uniform3f(TranslateLocation,Ax,Ay,0.0);
            break;

          case "s":
		
				Ay=Ay-0.1;
				TranslateLocation=gl.getUniformLocation(program, 's_translate');
				gl.uniform3f(TranslateLocation,Ax,Ay,0.0);
            break;

			case "k":
		
				colorLocation = gl.getUniformLocation(program, "f_color");
				gl.uniform4f(colorLocation,1,0,0,1);
            break;
			
			
			case "y":
		
				colorLocation = gl.getUniformLocation(program, "f_color");
				gl.uniform4f(colorLocation,0,1,0,1);
            break;
			
			case "m":
		
				colorLocation = gl.getUniformLocation(program, "f_color");
				gl.uniform4f(colorLocation,0,0,1,1);
            break;
          
			default:
		return;
        };
    })
	
	
	
	var vertices = [vec2(-0.4, 0.5), vec2(-0.4, 0.4), vec2(-0.1, 0.4), vec2(-0.4, 0.5), vec2(-0.1, 0.4), vec2(-0.1,0.5),
					vec2(-0.4, 0.4), vec2(-0.3,0.4), vec2(-0.3, 0.2), vec2(-0.4, 0.4), vec2(-0.3, 0.2), vec2(-0.4,0.2),
					vec2(-0.3, 0.3), vec2(-0.3,0.2), vec2(-0.1,0.2), vec2(-0.3, 0.3), vec2(-0.1,0.2),vec2(-0.1,0.3),
					vec2(-0.1,0.3),  vec2(-0.1,0.1), vec2(-0.2,0.3), vec2(-0.2,0.3), vec2(-0.1,0.1), vec2(-0.2,0.1),
					vec2(-0.1,0.1),  vec2(-0.1,0.0), vec2(-0.4,0.1), vec2(-0.1,0.0), vec2(-0.4,0.1), vec2(-0.4,0.0),
					
					
					vec2(0.0, 0.5), vec2(0.0, 0.4), vec2(0.3, 0.4), vec2(0.0, 0.5), vec2(0.3, 0.4), vec2(0.3,0.5),
					vec2(0.0, 0.4), vec2(0.1,0.4), vec2(0.1, 0.2), vec2(0.0, 0.4), vec2(0.1, 0.2),vec2(0.0,0.2),
					vec2(0.1, 0.3), vec2(0.1,0.2), vec2(0.3,0.2), vec2(0.1, 0.3), vec2(0.3,0.2), vec2(0.3,0.3),
					vec2(0.3,0.3),  vec2(0.3,0.1), vec2(0.2,0.3), vec2(0.2,0.3), vec2(0.3,0.1), vec2(0.2,0.1),	
					vec2(0.3,0.1),  vec2(0.3,0.0), vec2(0.0,0.1), vec2(0.3,0.0), vec2(0.0,0.1),vec2(0.0,0.0),
					vec2(0.1,-0.2), vec2(0.1,-0.1), vec2(0.2,-0.2), vec2(0.1,-0.1),vec2(0.2,-0.2),vec2(0.2,-0.1)
					];

	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices ), gl.STATIC_DRAW );
	
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	var TranslateLocation=gl.getUniformLocation(program, 's_translate');
	gl.uniform3f(TranslateLocation,dx, dy,0.0);
	
	RotateLocation = gl.getUniformLocation(program, 's_rotation');
	gl.uniformMatrix4fv(RotateLocation, false, RotateMatrix);
	
	var ScaleLocation = gl.getUniformLocation(program, 'sscale_matrix');
    gl.uniformMatrix4fv(ScaleLocation, false, ScaleMatrix);
	
	colorLocation = gl.getUniformLocation(program, "f_color");
	gl.uniform4f(colorLocation,0.57,0.43,0.83,1);
	

	document.getElementById("canvasmenu").onclick = function( event) {
		
        switch(event.target.index) {
			case 0:
				document.getElementById("Button3").onclick = function( event){
				gl.clearColor(0.0, 0.0, 0.0, 1.0);};
			break;

			case 1:
				document.getElementById("Button3").onclick = function( event){
				gl.clearColor(1.0, 0.0, 0.0, 1.0);};
			break;

			case 2:
				document.getElementById("Button3").onclick = function( event){
				gl.clearColor(1.0, 1.0, 0.0, 1.0);};
            break;


			case 3:
				document.getElementById("Button3").onclick = function( event){
				gl.clearColor(0.0, 1.0, 0.0, 1.0);};
			break;

			case 4:
				document.getElementById("Button3").onclick = function( event){
				gl.clearColor(0.0, 0.0, 1.0, 1.0);};
			break;
			
		
			case 5:
				document.getElementById("Button3").onclick = function( event){
				gl.clearColor(1.0, 0.0, 1.0, 1.0);};
            break;
			
			
			case 6:
				document.getElementById("Button3").onclick = function( event){
				gl.clearColor(0.0, 1.0, 1.0, 1.0);};
            break;	
			
			case 7:
				document.getElementById("Button3").onclick = function( event){
				gl.clearColor(1.0, 1.0, 1.0, 1.0);};
            break;
       }
    };
    
	var color_button= document.getElementById("renk"); 
	color_button.addEventListener("click", function() {
		colorLocation = gl.getUniformLocation(program, "f_color");
		red = document.getElementById("Red").value;
		green = document.getElementById("Green").value;
		blue = document.getElementById("Blue").value;
		gl.uniform4f(colorLocation,red,green,blue,1);});		
    gl.clearColor(1.0,1.0, 1.0, 1.0);
	requestAnimFrame(render);
};
  
 function render() {
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, 66);
	requestAnimFrame(render);
}



	