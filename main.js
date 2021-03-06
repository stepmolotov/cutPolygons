//var figure = 'S';
var figure = 'Z';
//var figure = '0';
//var figure = 'P';
//var figure = 'C';
//var figure = 'E';
//var figure = 'R';
//var figure = '9';
/* ---------- Variables ---------- */
var points;
var polygonVertices;
var segment;

var polygon;
var intersectedPolygon;
var intersections;
var newPoly;
var polygonz;

if(figure == 'S'){
	points = [
		{x: 100, y: 100, id: 0},
		{x: 500, y: 100, id: 1},
		{x: 500, y: 400, id: 2},
		{x: 200, y: 400, id: 3},
		{x: 200, y: 500, id: 4},
		{x: 500, y: 500, id: 5},
		{x: 500, y: 600, id: 6},
		{x: 100, y: 600, id: 7},
		{x: 100, y: 300, id: 8},
		{x: 400, y: 300, id: 9},
		{x: 400, y: 200, id: 10},
		{x: 100, y: 200, id: 11}
	];
	polygonVertices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
	segment = [
		{x: 300, y: 150},							// default [solved]
		{x: 300, y: 550}							// default [solved]
		//{x: 500, y: 600},						// right border [solved]
		//{x: 500, y: 150}						// right border [solved]
	];
}else if(figure == 'Z'){
	points = [
		{x: 600-100+10, y: 200-100, id: 0},
		{x: 400-100+10, y: 300-100, id: 1},
		{x: 700-100+10, y: 500-100, id: 2},
		{x: 400-100+10, y: 600-100, id: 3},
		{x: 700-100+10, y: 600-100, id: 4},
		{x: 700-100+10, y: 700-100, id: 5},
		{x: 300-100+10, y: 700-100, id: 6},
		{x: 100-100+10, y: 500-100, id: 7},
		{x: 400-100+10, y: 400-100, id: 8},
		{x: 100-100+10, y: 200-100, id: 9}
	];
	polygonVertices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	segment = [
		//{x: 150+10, y: 150},				// default [solved]
		//{x: 400+10, y: 400}					// default [solved]
		{x: 400-100+10, y: 500},			// middle line [solved]
		{x: 400-100+10, y: 220} 			// middle line [solved]
		//{x: 700-100+10, y: 100},		// right border [solved]
		//{x: 700-100+10, y: 700-100}	// right border [solved]
	];
}else if(figure == 'P'){
	points = [
		{x: 250, y: 100, id: 0},
		{x: 400, y: 210, id: 1},
		{x: 340, y: 420, id: 2},
		{x: 160, y: 420, id: 3},
		{x: 100, y: 210, id: 4},
	];
	polygonVertices = [0, 1, 2, 3, 4];
	segment = [
		{x: 140, y: 275},							// default [solved]
		{x: 360, y: 220}							// default [solved]
		//{x: 400, y: 210},						// one vertex tan [solved]
		//{x: 300, y: 100},						// one vertex tan [solved]
	];
}else if(figure == 'C'){
	points = [
		{x: 300, y: 100, id: 0},
		{x: 500, y: 100, id: 1},
		{x: 500, y: 300, id: 2},
		{x: 700, y: 300, id: 3},
		{x: 700, y: 500, id: 4},
		{x: 500, y: 500, id: 5},
		{x: 500, y: 700, id: 6},
		{x: 300, y: 700, id: 7},
		{x: 300, y: 500, id: 8},
		{x: 100, y: 500, id: 9},
		{x: 100, y: 300, id: 10},
		{x: 300, y: 300, id: 11}
	];
	polygonVertices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
	segment = [ 
		{x: 300, y: 200}, 						// vertical line [solved]
		{x: 300, y: 600}							// vertical line [solved]
		//{x: 200, y: 100},						// horizontal line [solved]
		//{x: 600, y: 100}						// horizontal line [solved]
	];
}else if(figure == 'E'){
	points = [
		{x: 200, y: 100, id: 0},
		{x: 700, y: 100, id: 1},
		{x: 700, y: 200, id: 2},
		{x: 400, y: 200, id: 3},
		{x: 400, y: 300, id: 4},
		{x: 600, y: 300, id: 5},
		{x: 600, y: 400, id: 6},
		{x: 400, y: 400, id: 7},
		{x: 400, y: 500, id: 8},
		{x: 700, y: 500, id: 9},
		{x: 700, y: 600, id: 10},
		{x: 200, y: 600, id: 11}
	];
	polygonVertices = [0, 1, 2, 3 , 4, 5 , 6, 7, 8, 9, 10, 11];
	segment = [
		{x: 600, y: 400},							// default tan edge [solved]
		{x: 600, y: 500}							// default tan edge [solved]
	];
}else if(figure == 'R'){
	points = [
		{x: 100, y: 100, id: 0},
		{x: 500, y: 100, id: 1},
		{x: 500, y: 310, id: 2},
		{x: 100, y: 310, id: 3},
	];
	polygonVertices = [0, 1, 2, 3];
	segment = [
		{x: 200, y: 120},							// default [solved]
		{x: 400, y: 300}							// default [solved]
	];
}else if(figure == '9'){
	points = [
		{x: 100, y: 100, id: 0},
		{x: 300, y: 100, id: 1},
		{x: 400, y: 300, id: 2},
		{x: 400, y: 450, id: 3},
		{x: 350, y: 600, id: 4},
		{x: 250, y: 700, id: 5},
		{x: 100, y: 700, id: 6},
		{x:  10, y: 500, id: 7},
		{x:  10, y: 300, id: 8},
	];
	polygonVertices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	segment = [
		{x: 400, y: 300},							// default [solved]
		{x: 250, y: 700}							// default [solved]
	];
}else{ // default polygon
	points = [
		{x: 150, y: 100, id: 0},
		{x: 560, y: 150, id: 1},
		{x: 550, y: 480, id: 2},
		{x: 400, y: 620, id: 3},
		{x: 320, y: 420, id: 4},
		{x: 100, y: 400, id: 5}
	];
	polygonVertices = [0, 1, 2, 3, 4, 5];
	segment = [
		{x: 200, y: 370},							// default [solved]
		{x: 410, y: 590}							// default [solved]
		//{x: 320, y: 420},						// coincident [solved]
		//{x: 120, y: 285}						// coincident [solved]
	];

}



window.onload = function() {

	// adding mouse support
	document.body.addEventListener("mousedown", onMouseDown);

	/* ---------- Mouse Handlers ---------- */
	function onMouseDown(event) {
		clickPoint = getClickPoint(event.clientX, height - event.clientY);
		//clickPoint = getClickPoint(event.clientX, event.clientY);
		if(clickPoint) {
			document.body.addEventListener("mousemove", onMouseMove);
			document.body.addEventListener("mouseup", onMouseUp);
		}
	}

	function onMouseMove(event) {
		clickPoint.x = event.clientX;
		clickPoint.y = height - event.clientY;
		//clickPoint.y = event.clientY;

		intersectedPolygon = intersectPolygon(s1, s2, polygon);
		intersections = intersectedPolygon.intersections;
		/*newPoly = intersectedPolygon.polygon;

		// normal case
		if(intersectedPolygon.visit)
			polygonz = visitPolygon(newPoly, intersections);
		// collinear or no intersection case
		else
			polygonz = partitionLine(s1, s2, newPoly, intersections);*/

		render(partitions=false);
	}

	function onMouseUp(event) {
		document.body.removeEventListener("mousemove", onMouseMove);
		document.body.removeEventListener("mouseup", onMouseUp);
		
		console.log('\n---------- Recomputing ----------');
		intersectedPolygon = intersectPolygon(s1, s2, polygon);
		intersections = intersectedPolygon.intersections;
		newPoly = intersectedPolygon.polygon;

		// normal case
		if(intersectedPolygon.visit)
			polygonz = visitPolygon(newPoly, intersections);
		// collinear or no intersection case
		else
			polygonz = partitionLine(s1, s2, newPoly, intersections);
			
		console.log('\nPolygons: ');
		console.log(polygonz);
		console.log('\n');

		render(partitions=true);
	}

	// check if mouse clicked over handles
	function getClickPoint(x, y) {
		for(var i = 0; i < handle_points.length; i++) {
			var p = handle_points[i],
				dx = p.x - x,
				dy = p.y - y,
				dist = Math.sqrt(dx * dx + dy * dy);
			if(dist < 10) {
				return p;
			}

		}
	}
	/* ---------- // ---------- */

	/* ---------- Drawing Functions ---------- */
	function render(partitions=true) {
		context.clearRect(0, 0, width, height);

		if(partitions){
			drawPartitions(newPoly.points, polygonz);
		}
		// draw polygon
		drawPoly(polygon);


		//console.log(intersections);
		if(intersections){
			for(var i=0; i<intersections.length; i++){
				drawIntersection(intersections[i], name=intersections[i].id);
				drawExtended(s1, s2, intersections[i]);
			}
		}else
			console.log("No Intersection!");

		drawPoint(s1);
		drawPoint(s2);
		drawSegment(s1, s2);
		drawBounds(newPoly);

	}

	function drawPoint(p, size=10, text=null) { // for the handles
		context.beginPath();
		context.arc(p.x, p.y, size, 0, Math.PI * 2, false);
		context.fill();
		if(text)
			context.fillText(i, p.x, p.y);
	}

	function drawIntersection(intersect, name=null) {
		context.beginPath();
		if(intersect.type == "outer"){
			context.setLineDash([5, 5]);
			context.strokeStyle = '#ff0000';
			context.arc(intersect.x, intersect.y, 20, 0, Math.PI * 2, false);
			context.stroke();
			context.closePath();
			context.strokeStyle = 'black';
			context.beginPath();
			context.fillStyle = '#ff0000';
			context.arc(intersect.x, intersect.y, 2, 0, Math.PI * 2, false);
			context.fill();
			context.setLineDash([]);
			context.closePath();
			context.fillStyle = 'black';
			if(name)
				context.fillText(name, intersect.x, intersect.y);
		}else{
			context.setLineDash([]);
			context.strokeStyle = 'black';
			context.arc(intersect.x, intersect.y, 20, 0, Math.PI * 2, false);
			context.stroke();
			context.closePath();
			context.beginPath();
			context.fillStyle = '#ff0000';
			context.arc(intersect.x, intersect.y, 2, 0, Math.PI * 2, false);
			context.fill();
			context.closePath();
			context.fillStyle = 'black';
			if(name)
				context.fillText(name, intersect.x, intersect.y);
		}
	}

	function drawSegment(p0, p1, proj=false, bound=false) { 
		context.beginPath();
		if(proj){
			context.setLineDash([10, 10]);
			context.strokeStyle = '#ff0000'; //red
			context.moveTo(p0.x, p0.y);
			context.lineTo(p1.x, p1.y);
			//context.lineWidth = 1;
			context.stroke();
			context.setLineDash([]);
			context.strokeStyle = 'black';
		}else if(bound){
			context.setLineDash([5, 10]);
			context.strokeStyle = 'green'; //green
			context.moveTo(p0.x, p0.y);
			context.lineTo(p1.x, p1.y);
			//context.lineWidth = 1;
			context.stroke();
			context.setLineDash([]);
			context.strokeStyle = 'black';
		}else{
			context.setLineDash([]);
			context.strokeStyle = 'black';
			context.moveTo(p0.x, p0.y);
			context.lineTo(p1.x, p1.y);
			//context.lineWidth = 1.5;
			context.stroke();
		}
	}

	function drawExtended(p0, p1, intersection){
		if(intersection.type == "outer" || intersection.type == "coincident"){
			var dist0 = getDistance(p0, intersection),
					dist1 = getDistance(p1, intersection);

			if(dist0 < dist1)
				drawSegment(intersection, p0, proj=true);
			else
				drawSegment(intersection, p1, proj=true);
		}
		drawPoint(p0);
		drawPoint(p1);
	}

	function drawPoly(poly){
		context.beginPath();
		context.moveTo(poly.points[0].x, poly.points[0].y);
		//context.fillText(0, poly.points[0].x, poly.points[0].y);
		for(var i = 1; i < poly.points.length; i++) {
			context.lineTo(poly.points[i].x, poly.points[i].y);
			//context.fillText(i, poly.points[i].x, poly.points[i].y);
		}
		context.closePath();
		context.stroke();
		// drawing vertices
		for(var i = 0; i < poly.points.length; i++)
				drawPoint(poly.points[i], size=2);
		
		// drawing names
		for(var i = 0; i < poly.points.length; i++)		
			context.fillText(i, poly.points[i].x, poly.points[i].y);
	}

	function drawPartitions(polyPoints, subpolys){
		
		function getRandomColor() {
			var letters = '0123456789ABCDEF';
			var color = '#';
			for (var i = 0; i < 6; i++) {
				color += letters[Math.floor(Math.random() * 16)];
			}
			return color;
		}

		function randomHsl(){
			// hue, saturation, lightness, alpha
			return 'hsla(' + (Math.random() * 360) + ', 74%, 60%, 0.47)';
		}

		function drawPart(subIds, color='white'){
			context.save();
			context.beginPath();
			context.fillStyle = color;
			var point = polyPoints.get(subIds[0]);
			context.moveTo(point.x, point.y);
			for(var i=1; i<subIds.length; i++){
				point = polyPoints.get(subIds[i]);
				context.lineTo(point.x, point.y);
			}
			context.fill();
			context.closePath();
			context.restore();
		}

		// fill each found polygon with a random color
		for(var i=0; i<subpolys.length; i++)
			drawPart(subpolys[i], color=randomHsl());
		
	}

	function drawBounds(poly){
		var A = poly.bounds.minX;
		var B = poly.bounds.maxX;
		var C = poly.bounds.minY;
		var D = poly.bounds.maxY;
		// drawing segments
		drawSegment(A, B, proj=false, bound=true);
		drawSegment(B, C, proj=false, bound=true);
		drawSegment(C, D, proj=false, bound=true);
		drawSegment(D, A, proj=false, bound=true);
		// drawing points
		drawPoint(A, size=4);
		drawPoint(B, size=4);
		drawPoint(C, size=4);
		drawPoint(D, size=4);
	}

	
/* ---------- MAIN ---------- */
	var canvas = document.getElementById("canvas"),
			context = canvas.getContext("2d"),
			width = canvas.width = window.innerWidth,
			height = canvas.height = window.innerHeight;
	var clickPoint;

	// Create a custom fillText funciton that flips the canvas, draws the text, and then flips it back
	context.font = '18px Georgia';
	context.fillText = function(text, x, y) {
		this.save();       // Save the current canvas state
		this.scale(1, -1); // Flip to draw the text
		this.fillText.dummyCtx.fillText.call(this, text, 3+x, 15+(-y)); // Draw the text, invert y to get coordinate right
		this.restore();    // Restore the initial canvas state
	}
	// Create a dummy canvas context to use as a source for the original fillText function
	context.fillText.dummyCtx = document.createElement('canvas').getContext('2d');
	// changing coordinates to the bottom left
	context.transform(1, 0, 0, -1, 0, canvas.height);

	// adding vertices to polygon
	console.log('\n---------- Computing ----------');
	polygon = fillPolygon(points, polygonVertices);
	console.log('Polygon: ');
	console.log(polygon);

	// segment
	var s1 = segment[0];
	var s2 = segment[1];
	var handle_points = [s1, s2];

	intersectedPolygon = intersectPolygon(s1, s2, polygon);
	intersections = intersectedPolygon.intersections;
	newPoly = intersectedPolygon.polygon;
	console.log('Intersected Polygon: ');
	console.log(newPoly);
	console.log('\n');
	//visitPolygonGraph(newPoly);

	// normal case
	if(intersectedPolygon.visit)
		//console.log(intersections);
		polygonz = visitPolygon(newPoly, intersections);
	// collinear or no intersection case
	else
		polygonz = partitionLine(s1, s2, newPoly, intersections);

	
		
	console.log('\nPolygons: ');
	for(var i=0; i<polygonz.length; i++)
		console.log(polygonz[i]);
	console.log('\n');

	// rendering scene
	//translatePoly(newPoly);
	render();

	/* ---------- // ---------- */

};
