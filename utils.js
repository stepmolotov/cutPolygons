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

/* ---------- // ---------- */




/* ---------- Intersections ---------- */
function segmentIntersect(p0, p1, p2, p3){
	// A1x + B1y = C1	| A2x + B2y = C2
	// if B==0 -> vertical line
	// if A==0 -> horizontal line
	var A1 = p1.y - p0.y,
		B1 = p0.x - p1.x,
		C1 = A1 * p0.x + B1 * p0.y,
		A2 = p3.y - p2.y,
		B2 = p2.x - p3.x,
		C2 = A2 * p2.x + B2 * p2.y,
		denominator = A1 * B2 - A2 * B1;

	if(denominator == 0){
		// not vertical lines
		if(B1 != 0 && B2 != 0){
			// y intercept (q) is the same -> collinear
			if((-C1/B1) == (-C2/B2)){
				//console.log('collinear');
			// y intercept (q) is different -> parallel
			}else{
				//console.log('parallel');
			}
		// not horizontal lines
		}else if(A1 != 0 && A2 != 0){
			return null;
		}
		return null;
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


/* ---------- // ---------- */



