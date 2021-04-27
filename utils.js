/* ---------- Utils ---------- */
function angleFromSlopes(m1, m2){
	return Math.atan(Math.abs((m2 - m1)/(1 + m1*m2)));
}


function radiantsToDegrees(alpha){
	return alpha*180/Math.PI;
}


function findAngle(p0, p1, s0, s1){
	var slope1, slope2;
	var A1 = p1.y - p0.y,
		B1 = p1.x - p0.x;
	var A2 = s1.y - s0.y,
		B2 = s1.x - s0.x;
	if(B1 != 0)
		slope1 = A1/B1;
	else
		slope1 = 0;
	if(B2 != 0)
		slope2 = A2/B2;
	else
		slope2 = 0;
	return radiantsToDegrees(angleFromSlopes(slope1, slope2));
}


function relativeAngle(p0, p1){
	return Math.atan2(p1.y-p0.y, p1.x-p1.x);
}


function getDistance(p0, p1){
	var dx = p0.x - p1.x,
			dy = p0.y - p1.y;
	return Math.sqrt(dx * dx + dy * dy);
}


function findEquation(p0, p1){
	var dy = p1.y - p0.y,
			dx = p1.x - p0.x;
	if(dx != 0){
		m = dy/dx;
		// y = mx+q -> q = y-mx
		q = p0.y - m*p0.x;
	}else{ // deal with the vertical line
		return null;
	}
	return {
		m: m,
		q: q
	};
}


function getLineValue(p0, p1, x){
	var eq = findEquation(p0, p1);
	if(!eq)
		return null
	else // y = mx+q
		return eq.m * x + eq.q; 
}


// TODO: what about other line types? Left/Right for instance
function aboveSegment(s0, s1, p){
	// return 1 if the point P is above the line, 0 if on it, -1 otherwise
	var line = findEquation(s0, s1);
	var liney = line.m*p.x + line.q;
	if (p.y > liney) // above
		return 1;
	else if(p.y == liney) // on
		return 0;
	else // below
		return -1;
}

/* ---------- // ---------- */




/* ---------- Intersections ---------- */
function segmentIntersect(p0, p1, p2, p3) {
	var A1 = p1.y - p0.y,
		B1 = p0.x - p1.x,
		C1 = A1 * p0.x + B1 * p0.y,
		A2 = p3.y - p2.y,
		B2 = p2.x - p3.x,
		C2 = A2 * p2.x + B2 * p2.y,
		denominator = A1 * B2 - A2 * B1;

	if(denominator == 0) {
		return null;
		// y intercept is different -> parallel
		// y intercept is different -> collinear
	}

	var intersectX = (B2 * C1 - B1 * C2) / denominator;
	var intersectY =  (A1 * C2 - A2 * C1) / denominator;
	// check if inside the segment horizontally
	var rx0 = (intersectX - p0.x) / (p1.x - p0.x);
	var rx1 = (intersectX - p2.x) / (p3.x - p2.x);
	// check if inside the segment vertically
	var ry0 = (intersectY - p0.y) / (p1.y - p0.y);
	var ry1 = (intersectY - p2.y) / (p3.y - p2.y);
	/*
	if(
		( (rx0 <= 1e-10 && Math.abs(rx0 - 1) <= 1e-10) || (ry0 <= 1e-10 && Math.abs(ry0 - 1) <= 1e-10) ) 
		&& 
		( (rx1 <= 1e-10 && Math.abs(rx1 - 1) <= 1e-10) || (ry1 <= 1e-10 && Math.abs(ry1 - 1) <= 1e-10) )
	) {*/
	if(((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1)) && 
		((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))) {
		// used for the intersections inside the segment
		return {
			x: intersectX,
			y: intersectY,
			type: 'inner'
		};
	}else if(((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))){
		// used for the projections outside the segment
		return {
			x: intersectX,
			y: intersectY,
			type: 'outer'
		};
	}
}


function segmentPolyIntersect(s0, s1, poly) {
	intersected = false;
	intersections = [];
	counter = poly.points.length;

	for(var i = 0; i < poly.points.length; i++) {
		var p0 = poly.points[i];
		var p1 = poly.points[(i + 1) % poly.points.length];
		var intersect = segmentIntersect(s0, s1, p0, p1);
		if(intersect){
			intersected = true;
			//console.log(intersect.type);
			intersections.push({
				x: intersect.x,
				y: intersect.y,
				id: counter,
				type: intersect.type,
				from: i,
				to: (i + 1) % poly.points.length
			});
			counter++;
		}
	}
	if(intersected)
		return intersections;
	else
		return null;
}
/* ---------- // ---------- */



