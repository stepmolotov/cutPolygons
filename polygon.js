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
		points: new Map(),
		edges: new Map()
	};

	function addPoint(p, id){
		newPolygon.points.set(id, {x: p.x, y: p.y});
	}

	function addEdge(from, to){
		//console.log('Adding edge: ' + from + ' -> ' + to);
		var adj = newPolygon.edges.get(from);
		if(!adj)
			newPolygon.edges.set(from, [to])
		else{
			if(!adj.includes(to) && to != from)
				adj.push(to);
		}
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

	function removeCoincident(array){
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


	var inters = [];
	var length = polygon.points.length;
	var counter = length; //naming intersections accordingly
	var minimum = 10000;
	var minimumPoint;
	for(var i=0; i < length; i++) {
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
	var nIntersections = counter - length; // intersections.length
	// adding inner edges between intersection points couplewise	
	ordered = inters.sort(compareIntersections);
	
	/*
	// if all the intersections are coincident, the segment is collinear 
	if(allCoincident(ordered)){
		//console.log('all coincident!');
		return {
			intersections: null, 
			polygon: newPolygon
		};
	}
	*/

	if(ordered.length > 3){
		for(var i=0; i<ordered.length; i+=2){
			if(i == ordered.length-1)
				break;
			//console.log('linking: ' + ordered[i].id + '->' + ordered[i+1].id + ', ' + ordered[i+1].id + '->' + ordered[i].id);
			addEdge(ordered[i].id, ordered[i+1].id);
			addEdge(ordered[i+1].id, ordered[i].id);
			// add also previous link
			if(ordered[i].type == 'coincident' && i>0){
				//console.log('linking: ' + ordered[i].id + '->' + ordered[i-1].id + ', ' + ordered[i-1].id + '->' + ordered[i].id);
				addEdge(ordered[i].id, ordered[i-1].id);
				addEdge(ordered[i-1].id, ordered[i].id);
			}
		}
	// only 2 intersections
	}else{ 
		//console.log('one couple');
		ordered = removeCoincident(ordered);
		addEdge(ordered[0].id, ordered[1].id);
		addEdge(ordered[1].id, ordered[0].id);
	}

	// remove duplicates now
	ordered = removeCoincident(ordered);
	//console.log('Ordered: ');
	//console.log(ordered); 
	
	// if all the intersections are coincident, the segment is collinear 
	if(allCoincident(ordered))
		//console.log('all coincident!');
		return {
			intersections: null, 
			polygon: newPolygon
		};
	else
		return {
			intersections: ordered, 
			polygon: newPolygon
		};
}


function visitPolygon(polygon, intersections){
	var polygons = [];
	var edges = new Map(polygon.edges);

	function removeEdge(from, to){
		if(edges.has(from)){
			var destinations = edges.get(from);
			// if single element, remove the from key, 
			if(destinations.length === 1)
				edges.delete(from);
			// else remove the to from the array
			else{
				var index = destinations.indexOf(to);
				if(index != -1)
					destinations.splice(index, 1);
			}
		}
	}

	function notInPath(vertex){
		// true if not in path, false otherwise
		return path.indexOf(vertex) == -1;
	}

	function notPredecessor(vertex){
		return path[path.length-1] != vertex;
	}

	function isIntersection(vertex){ 
		//return vertex >= polygon.size;
		for(var i=0; i<intersections.length; i++){
			if(intersections[i].id == vertex)
				return true;
		}
		return false;
	}

	function chooseDestination(destinations){
		// by deafult, return the firt value
		var dest = destinations[0]; 
		var nDest = destinations.length;
		// unique destination
		if(nDest == 1){
			// there's a cycle -> new polygon
			if(dest == start){
				polygons.push(path);
				path = [];
				console.log("--- OMG!! That's nice! Polygon found! ---");
				nextVertex = edges.keys().next().value;
				start = nextVertex;
				removeEdge(temp, dest);
			}else{
				// go to the next vertex and erase this one
				nextVertex = dest;
				removeEdge(temp, dest);
			}
		// multiple destinations
		}else{
			if(notPredecessor(destinations[0]))
				dest = destinations[0];
			else if(notPredecessor(destinations[1]))
				dest = destinations[1];

		}
		return dest;
	}

	var path = [];
	var start = 0;
	var nextVertex = 0;
	var nextDestination = 0;
	//console.log(polygon.edges);
	while(edges.size > 0){
		path.push(nextVertex);
		var destinations = edges.get(nextVertex);
		//console.log("path: " + path);
		//console.log("nextVertex: " + nextVertex + " => " + destinations);
		var temp = nextVertex;
		// only one destination available: take it
		if(destinations.length == 1){
			// if the destination is the starting point -> new polygon
			if(destinations[0] == start){
				polygons.push(path);
				console.log("--- OMG!! That's nice! Polygon found! ---");
				console.log(path);
				path = [];
				removeEdge(temp, destinations[0]);
				nextVertex = edges.keys().next().value;
				start = nextVertex;
				//console.log(new Map(edges));
			}else{
				// go to the next vertex and erase this one
				nextVertex = destinations[0];
				removeEdge(temp, destinations[0]);
			}
		// more than one destinations available
		}else{
			// go to the intersection point
			if(isIntersection(destinations[0]) && notInPath(destinations[0])){
				nextVertex = destinations[0];
				removeEdge(temp, destinations[0]);
			}else if(isIntersection(destinations[1]) && notInPath(destinations[1])){
				nextVertex = destinations[1];
				removeEdge(temp, destinations[1]);
			}else{
				if(destinations[0] == start){
					polygons.push(path);
					console.log("--- OMG!! That's nice! Polygon found! ---");
					console.log(path);
					path = [];
					removeEdge(temp, destinations[0]);
					nextVertex = edges.keys().next().value;
					start = nextVertex;
					//console.log(new Map(edges));
				}else if(destinations[1] == start){
					polygons.push(path);
					console.log("--- OMG!! That's nice! Polygon found! ---");
					console.log(path);
					path = [];
					removeEdge(temp, destinations[1]);
					nextVertex = edges.keys().next().value;
					start = nextVertex;
					//console.log(new Map(edges));
				}else{
					nextVertex = destinations[0];
					removeEdge(temp, destinations[0]);
				}
			}
		}
		//console.log("Chosen: " + nextVertex);
	}
	//console.log('Polygons: ');
	//console.log(polygons);
	return polygons;
}


function partitionLine(s0, s1, polygon){
	
	function aboveLine(s0, s1, p){
		// find normal equation 
		var A = s1.y - s0.y;
		var	B = s0.x - s1.x;
		var	C = A * s0.x + B * s0.y;
		var numerator = A*p.x + B*p.y + C;
		// vertical line
		if(B == 0){
			// right wrt the line
			if(p.x > s0.x)
				return 1;
			// left wrt the line
			else if(p.x < s0.x)
				return -1;
			// on the line
			else
				return 0;
		}else{
			// above the line
			if((numerator>0 && B>0) || (numerator<0 && B<0))
				return 1;
			// below the line
			else if((numerator<0 && B>0) ||(numerator>0 && B<0))
				return -1;
			// on the line
			else if(numerator == 0)
				return 0;
		}
	}

	var partA = [];
	var partB = [];
	for(var i=0; i<polygon.points.size; i++){
		var point = polygon.points.get(i);
		var nEdges = polygon.edges.get(i).length;
		// if vertex is linked to 2 or more, it belongs to both partitions (unless start vertex)
		if(i>0 && nEdges>=2){
			partA.push(i);
			partB.push(i);
		}
		else if(aboveLine(s0, s1, point) >= 0)
			partA.push(i);
		else if(aboveLine(s0, s1, point) <= 0)
			partB.push(i);
	}
	//console.log('Partitions: ');
	//console.log([partA, partB]);
	if(partA.length > 2 && partB.length > 2)
		return [partA, partB];
	else if(partA.length > 2)
		return [partA];
	else if(partB.length > 2)
		return [partB];


}
/* ---------- // ---------- */
