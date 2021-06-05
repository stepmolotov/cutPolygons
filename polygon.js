/* ---------- Polygons Detection ---------- */
function fillPolygon(pts, vertices){
	var newpolygon = {
		points: [],
		edges: []
	}; 
	for(var i=0; i<vertices.length; i++){
		var vi = vertices[i];
		var vj = vertices[(i+1) % vertices.length];
		newpolygon.points.push(pts[vi]);
		var edge = {
			origin: vi,
			destination: vj
		};
		newpolygon.edges.push(edge);
	}
	return newpolygon;
}

function intersectPolygon(s0, s1, polygon){

	var newPolygon = {
		size: polygon.points.length,
		bounds: {
			minX: {x: 10000, y: 10000, id: -1},
			minY: {x: 10000, y: 10000, id: -1},
			maxX: {x: -1, y: -1, id: -1},
			maxY: {x: -1, y: -1, id: -1}
		},
		points: new Map(),
		edges: new Map()
	};

	function addPoint(p, id){
		newPolygon.points.set(id, {x: p.x, y: p.y});
		var bounds = newPolygon.bounds;
		if(p.x < bounds.minX.x){
			bounds.minX.x = p.x;
			bounds.minX.y = p.y;
			bounds.minX.id = id;
		}
		else if(p.x > bounds.maxX.x){
			bounds.maxX.x = p.x;
			bounds.maxX.y = p.y;
			bounds.maxX.id = id;
		}
		if(p.y < bounds.minY.y){
			bounds.minY.x = p.x;
			bounds.minY.y = p.y;
			bounds.minY.id = id;
		}
		else if(p.y > bounds.maxY.y){
			bounds.maxY.x = p.x;
			bounds.maxY.y = p.y;
			bounds.maxY.id = id;
		}
	}

	function updateBounds(){
		var A, B, C, D;
		var bounds = newPolygon.bounds;
		bounds.minX = {x: bounds.minX.x, y: bounds.minY.y};
		bounds.maxX = {x: bounds.maxX.x, y: bounds.minY.y};
		bounds.minY = {x: bounds.maxX.x, y: bounds.maxY.y};
		bounds.maxY = {x: bounds.minX.x, y: bounds.maxY.y};
		/*
		var obj = {
			A: {x: bounds.minX.x, y: bounds.minY.y}, 
			B: {x: bounds.maxX.x, y: bounds.minY.y}, 
			C: {x: bounds.maxX.x, y: bounds.maxY.y}, 
			D: {x: bounds.minX.x, y: bounds.maxY.y}
		};
		delete bounds.minX;
		delete bounds.minY;
		delete bounds.maxX;
		delete bounds.maxY;
		Object.assign(newPolygon.bounds,obj);
		*/
		console.log(newPolygon.bounds);
	}

	// +++ TODO: put also the angle and choose the +++
	function addEdge(from, to){
		console.log('Adding edge: ' + from + ' -> ' + to);
		var adj = newPolygon.edges.get(from);
		if(!adj)
			newPolygon.edges.set(from, [to])
		else{
			if(!adj.includes(to) && to != from)
				adj.push(to);
		}
	}

	function isLinked(a, b){
		//console.log('Checking ('+a+','+b+')');
		var edgeA = polygon.edges[a];
		if(edgeA && edgeA.destination == b)
			return true;
		var edgeB = polygon.edges[b];
		if(edgeB && edgeB.destination == a)
			return true;
		return false;
	}

	function compareIntersections(a, b){
		var distA = getDistance(minimumPoint, a);
		var distB = getDistance(minimumPoint, b);
		if(distA < distB)
			return -1;
		if(distA > distB)
			return 1;
		return 0;
	}

	function coincident(a, b){
		if((Math.abs(a.x - b.x) < 1e-10) 
			&& (Math.abs(a.y - b.y) < 1e-10))
			return true;
		return false;
	}

	function existsId(id){
		for (var i=0; i<inters.length; i++){
			if(inters[i].id == id)
				return true;
		}
		return false;
	}

	function addIntersection(point, id, type='intersection'){
		//console.log('Adding intersection: ' + id);
		//if(!existsId(id))
			inters.push({
				x: point.x,
				y: point.y,
				id: id,
				type: type
			});
		//else
			//console.log('EXISTING POINT');
	}

	function removeDuplicates(array){
		function isDuplicate(a, b){
			return a.id == b.id;
		}

		return array.filter(function(item, pos, ary) {
				return !pos || !isDuplicate(item, ary[pos-1]);
		});
	}

	function allCoincident(intersections){
		for(var i=0; i<intersections.length; i++)
			if(intersections[i].type != 'coincident')
				return false;
		return true;
	}

	function countCoincident(intersections){
		var counter = 0;
		for(var i=0; i<intersections.length; i++)
			if(intersections[i].type == 'coincident')
				counter++;
		return counter;
	}

	// ray-casting algorithm based on
	// http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
	// TODO: add tollerance
	function isInside(point){
		var inside = false;
		var vertices = newPolygon.points;
		for(var i=0, j=vertices.size-1; i<vertices.size; j=i++){
				var xi = vertices.get(i).x;
				var yi = vertices.get(i).y;
				var xj = vertices.get(j).x;
				var yj = vertices.get(j).y;
				var intersect = ((yi > point.y) != (yj > point.y))
						&& (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
				if (intersect) 
					inside = !inside;
		}
		return inside;
	}

	function getMiddlePoint(p0, p1){
		var dx = Math.abs(p0.x - p1.x);
		var dy = Math.abs(p0.y - p1.y);
		var minX, minY;
		if(p0.x < p1.x)
			minX = p0.x;
		else 
			minX = p1.x;
		if(p0.y < p1.y)
			minY = p0.y;
		else
			minY = p1.y;
		return {
			x: minX + dx/2,
			y: minY + dy/2
		};
	}


	var inters = [];
	var length = polygon.points.length;
	var counter = length; //naming intersections accordingly
	var minimum = 10000;
	var minimumPoint;
	for(var i=0; i < length; i++){
		var a = polygon.points[i];
		var j = (i + 1) % length;
		var b = polygon.points[j];
		var intersect = segmentIntersect(s0, s1, a, b);
		
		if(!intersect){
			if(i === 0)
				addPoint(a, i);
			if(i !== length-1) // final point already added
				addPoint(b, i+1);
			addEdge(i, j);
			
		}else{
			//console.log('intersecting ' + i + '=>' + j);
			// add as point the intersection first A-X-B
			if(i === 0)
				addPoint(a, i);
			if(i !== length-1) // avoid adding the initial point twice
				addPoint(b, j); // point B
			// check whether interection is too close to point a and b
			if(!coincident(a, intersect) && !coincident(b, intersect)){
				addIntersection(intersect, counter, intersect.type)
				addPoint(intersect, counter); // point X
				addEdge(i, counter); // AX
				addEdge(counter, j); // XB
				counter++;
				//console.log(inters)
				if(intersect.y < minimum){
					minimum = intersect.y;
					minimumPoint = intersect;
				}
				inters = inters.sort(compareIntersections);
			// if coincident, link the previous intersection 
			// with the coincident vertex and link this one 
			// with the next intersection: X-A-Y
			}else if(coincident(a,intersect)){
				//console.log("AAAAA");
				addIntersection(a, i, 'coincident');
				addEdge(i, j);
				if(intersect.y < minimum){
					minimum = intersect.y;
					minimumPoint = intersect;
				}
				inters = inters.sort(compareIntersections);
			}else if(coincident(b,intersect)){
				//console.log("BBBBB");
				addIntersection(b, j, 'coincident');
				addEdge(i, j);
				if(intersect.y < minimum){
					minimum = intersect.y;
					minimumPoint = intersect;
				}
				inters = inters.sort(compareIntersections);
			}else{
				console.log("COINCI-D'oh");
			}
		}
	}
	// generating bounding box
	updateBounds();

	// adding inner edges between intersection points couplewise	
	var nIntersections = counter - length; // intersections.length
	ordered = inters.sort(compareIntersections);
	var unique = removeDuplicates(ordered);
	console.log('Ordered: ');
	console.log(ordered); 
	console.log('Unique: ');
	console.log(unique); 
	console.log('\n');

	if(unique.length > 2){
		for(var i=0; i<ordered.length; i+=2){
			//console.log('checking: ' + ordered[i].id + '->' + ordered[i+1].id + ', ' + ordered[i+1].id + '->' + ordered[i].id);
			if((ordered.length % 2 == 1) && (i == ordered.length-1))
				break;
			
			// ignore intersection doubles
			//console.log('1 iter: ' + i + ', node='+ordered[i].id);
			if(ordered[i].id == ordered[i+1].id)
				continue;

			//console.log('2 iter: ' + i + ', node='+ordered[i].id);
			// if link A->B or B->A already exists, it's a side of the polygon
			if(!isLinked(ordered[i].id, ordered[i+1].id)){
				//console.log('linking: ' + ordered[i].id + '->' + ordered[i+1].id + ', ' + ordered[i+1].id + '->' + ordered[i].id);
				addEdge(ordered[i].id, ordered[i+1].id);
				addEdge(ordered[i+1].id, ordered[i].id);
			}
			// add also previous link 
			// add link only is thge middle point is inside the polygon
			if(ordered[i].type == 'coincident' && i>0){
				var middle = getMiddlePoint(ordered[i], ordered[i-1]);
				if(isInside(middle)){
					//console.log('IS INSIDE');
					//console.log('linking [c]: ' + ordered[i].id + '->' + ordered[i-1].id + ', ' + ordered[i-1].id + '->' + ordered[i].id);
					addEdge(ordered[i].id, ordered[i-1].id);
					addEdge(ordered[i-1].id, ordered[i].id);
				}
			}
			
		}
		console.log('\n');

	}else{
		console.log('Line partitioning needed');
		return {
			intersections: unique, 
			polygon: newPolygon,
			visit: false // use line partition 
		};
	}

	return {
		intersections: unique, 
		polygon: newPolygon,
		visit: true // use visit
	};
}


function visitPolygon(polygon, intersections){

	function removeEdge(from, to){
		//console.log(' ===== Removing edge: ' + from + ' -> ' + to + ' =====');
		if(edges.has(from)){
			var destinations = edges.get(from);
			// if single element, remove the from key, 
			if(destinations.length == 1)
				edges.delete(from);
			// else remove the to item from the array
			else{
				var index = destinations.indexOf(to);
				if(index != -1)
					destinations.splice(index, 1);
			}
		}
	}

	function isIntersection(vertex){ 
		for(var i=0; i<intersections.length; i++){
			if(intersections[i].id == vertex){
				return true;
			}
		}
		return false;
	}

	function processVertex(start, debugging=false){
		var path = [];
		var cycle = false;
		var current = start;
		var destinations;

		path.push(start);
		if(debugging) console.log("start: " + start + " -> path: " + path);
		while(!cycle){
 			destinations = edges.get(current);
			if(!destinations)
				return null;

			if(debugging) console.log("current: " + current + " => " + destinations);
			// single destination => take it
/*			if(destinations.length === 1){
				// if the destination is the starting point -> new polygon
				if(destinations[0] === start && path.length > 2){
					//path.push(destinations[0]);
					console.log("--- OMG!! That's nice! Polygon found! ---");
					console.log(path);	
					if(debugging) printEdges();
					cycle = true;
					//return path;
				}else{
					//console.log("Chosen: " + destinations[0]);
					current = destinations[0];
					path.push(current);
				}
			// multiple destinations => intersection point
			}else{
*/				// take the start vertex if present or the next intersection not in the path
				// otherwise take the other regular vertex
				var backupIndex = -1;
				for(var k=0; k<destinations.length; k++){
					if(destinations[k] === start && path.length > 2){
						//path.push(destinations[0]);
						console.log("--- OMG!! That's nice! Polygon found! ---");
						console.log(path);	
						//if(debugging) printEdges();
						cycle = true;
						backupIndex = -1;
						break;
						//return path;
					}else if(isIntersection(destinations[k]) && !path.includes(destinations[k])){
						current = destinations[k];
						path.push(current);
						backupIndex = -1;
						break;
					// save the index of a regular vertex
					}else if(!path.includes(destinations[k])){
						backupIndex = destinations[k];
					}
				}
				// no promising vertices, take the regular one
				if(backupIndex > 0){
					current = backupIndex;
					path.push(current);
				}
			}
		//}
		return path;
	}

	function printEdges(){
		console.log('\nEdges: ' + edges.size);
		for(const [key, value] of edges.entries()) {
			console.log(key + ' => ' + value);
		}
		console.log('\n');
	}

	var polygons = [];
	var edges = new Map(polygon.edges);
	var start = 0;
	var debugging = true;

	if(debugging) printEdges();
  var visited = [];
	for(var current=0; current<polygon.points.size; current++){
		// avoid checking intersections
		if(isIntersection(current) || visited.includes(current))
			continue;

		var cycle = processVertex(current, false);
		if(!cycle){
			console.log("No cycle found for " + current);
			break;
		}
		//console.log("Cycle[" + current + "] " + cycle);
		// if a normal vertx is already visited, avoid processing it
		for(var j=0; j<cycle.length; j++){
			if(!isIntersection(cycle[j]) && !visited.includes(cycle[j]))
				visited.push(cycle[j]);

			// remove edges
			removeEdge(cycle[j], cycle[(j+1)%cycle.length]);
		}
		polygons.push(cycle);
		if(debugging) printEdges();
	}
	return polygons;
}



function partitionLine(s0, s1, polygon, intersections){

	function aboveLine(s0, s1, p){
		// find normal equation 
		var A = s1.y - s0.y;
		var	B = s0.x - s1.x;
		var	C = -1*(A * s0.x + B * s0.y);
		var eq = A*p.x + B*p.y + C;
		
		// vertical line
		if(B == 0){
			// right wrt the line
			if(p.x > s0.x) return 1;
			// left wrt the line
			else if(p.x < s0.x) return -1;
			// on the line
			else return 0;
		}else{
			// on the line
			if(Math.abs(eq) < 1e-10) return 0;
			// above the line
			if(eq < 0) return 1;
			// below the line
			if(eq > 0) return -1;
		}
	}

	var partA = [];
	var partB = [];
	//var intersections = [];
	for(var i of polygon.edges.keys()){
	//for(var i=0; i<polygon.edges.size; i++){
		var point = polygon.points.get(i);
		var nEdges = polygon.edges.get(i).length;
		//console.log('Point[' + i + ']: ' + nEdges + ' edges');

		var part = aboveLine(s0, s1, point);
		if(part > 0){
			partA.push(i);
			//console.log('Point[' + i + ']->A (above)');
		}else if(part < 0){
			partB.push(i);
			//console.log('Point[' + i + ']->B (below)');
		}else if(part == 0){
			partA.push(i);
			partB.push(i);
			//console.log('Point[' + i + ']->A&B (on)');
		}
	}
	//console.log('Partitions: ');
	//console.log([partA, partB]);
	if(partA.length > intersections.length && partB.length > intersections.length)
		return [partA, partB];
	else if(partA.length > intersections.length)
		return [partA];
	else if(partB.length > intersections.length)
		return [partB];
}


function translatePoly(poly, transX, transY){
	// translate points
	for(var i=0; i<poly.points.size; i++){
		var p = poly.points.get(i);
		poly.points.set(i, {x: p.x + transX, y: p.y + transY});
	}
	// translate bounds
	poly.bounds.minX = {
		x: poly.bounds.minX + transX,
		y: poly.bounds.minX + transY
	};
	poly.bounds.maxX = {
		x: poly.bounds.maxX + transX,
		y: poly.bounds.maxX + transY
	};
	poly.bounds.minY = {
		x: poly.bounds.minY + transX,
		y: poly.bounds.minY + transY
	};
	poly.bounds.maxY = {
		x: poly.bounds.maxY + transX,
		y: poly.bounds.maxY + transY
	};
}
/* ---------- // ---------- */
