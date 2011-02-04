function addShadow(ctx) {
		ctx.shadowOffsetX = 5;
		ctx.shadowOffsetY = 5;
		ctx.shadowBlur =    5;
		ctx.shadowColor = 'black';
}

function drawRectangle(ctx, originX, originY, width, height, drawOutline, withShadow) {
	if (drawOutline)
		drawOutlineRect(ctx, originX, originY, width, height);
	ctx.save();
	if (withShadow)
		addShadow(ctx);
	thicknessOffset = ctx.lineWidth/2;
	ctx.beginPath();
	ctx.rect(originX + thicknessOffset, originY + thicknessOffset,
			 width - 2 * thicknessOffset, height - 2 * thicknessOffset);
	ctx.stroke();
	ctx.restore();
}

function drawRoundedRectangle(ctx, originX, originY, width, height, drawOutline, withShadow) {
	if (drawOutline)
		drawOutlineRect(ctx, originX, originY, width, height);
	ctx.save();
	if (withShadow)
		addShadow(ctx);
	thicknessOffset = ctx.lineWidth/2;
	radius = height/4;
	PI = 3.141549;
	ctx.beginPath();
	ctx.moveTo(originX + radius + thicknessOffset         ,originY + thicknessOffset);
	ctx.arc   (originX + width - radius - thicknessOffset ,originY + radius + thicknessOffset,
			   radius, 270 *(PI/180),   0 *(PI/180));
	ctx.arc   (originX + width - radius - thicknessOffset ,originY + height - radius - thicknessOffset,
			   radius,   0 *(PI/180),  90 *(PI/180));
	ctx.arc   (originX + radius + thicknessOffset         ,originY + height - radius - thicknessOffset,
			   radius,  90 *(PI/180), 180 *(PI/180));
	ctx.arc   (originX + radius + thicknessOffset         ,originY + radius + thicknessOffset,
			   radius, 180 *(PI/180), 270 *(PI/180));
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();
}

function drawHexagon(ctx, originX, originY, width, height, drawOutline, withShadow) {
	if (drawOutline)
		drawOutlineRect(ctx, originX, originY, width, height);
	ctx.save();
	if (withShadow)
		addShadow(ctx);
	thicknessOffset = ctx.lineWidth/2;
	ctx.beginPath();
	ctx.moveTo(originX + height/2 + thicknessOffset         ,originY + thicknessOffset);
	ctx.lineTo(originX + width - height/2 - thicknessOffset ,originY + thicknessOffset);
	ctx.lineTo(originX + width - thicknessOffset            ,originY + height/2);
	ctx.lineTo(originX + width - height/2 - thicknessOffset ,originY + height - thicknessOffset);
	ctx.lineTo(originX + height/2 + thicknessOffset         ,originY + height - thicknessOffset);
	ctx.lineTo(originX + thicknessOffset                    ,originY + height/2);
	ctx.closePath();
	ctx.stroke();
	ctx.restore();
}

function drawOctagon(ctx, originX, originY, width, height, drawOutline, withShadow) {
	if (drawOutline)
		drawOutlineRect(ctx, originX, originY, width, height);
	ctx.save();
	if (withShadow)
		addShadow(ctx);
	thicknessOffset = ctx.lineWidth/2;
	chamfer = height/4;
	ctx.beginPath();
	ctx.moveTo(originX + chamfer + thicknessOffset          ,originY + thicknessOffset);
	ctx.lineTo(originX + width - chamfer - thicknessOffset  ,originY + thicknessOffset);
	ctx.lineTo(originX + width - thicknessOffset            ,originY + chamfer + thicknessOffset);
	ctx.lineTo(originX + width - thicknessOffset            ,originY + height - chamfer - thicknessOffset);
	ctx.lineTo(originX + width - chamfer - thicknessOffset  ,originY + height - thicknessOffset);
	ctx.lineTo(originX + chamfer + thicknessOffset          ,originY + height - thicknessOffset);
	ctx.lineTo(originX + thicknessOffset                    ,originY + height - chamfer - thicknessOffset);
	ctx.lineTo(originX + thicknessOffset                    ,originY + chamfer + thicknessOffset);
	ctx.closePath();
	ctx.stroke();
	ctx.restore();
}

function drawEllipse(ctx, originX, originY, width, height, drawOutline, withShadow) {
	if (drawOutline)
		drawOutlineRect(ctx, originX, originY, width, height);
	ctx.save();
	if (withShadow)
		addShadow(ctx);
	thicknessOffset = ctx.lineWidth/2;
	ctx.beginPath();
	ctx.moveTo(originX + width/2, originY + thicknessOffset);
	ctx.quadraticCurveTo(originX + width - thicknessOffset, originY + thicknessOffset,
						 originX + width - thicknessOffset, originY + height/2);
	ctx.quadraticCurveTo(originX + width - thicknessOffset, originY + height - thicknessOffset,
						 originX + width/2,                 originY + height - thicknessOffset);
	ctx.quadraticCurveTo(originX + thicknessOffset,         originY + height - thicknessOffset,
						 originX + thicknessOffset, originY + height/2);
	ctx.quadraticCurveTo(originX + thicknessOffset,         originY + thicknessOffset,
						 originX + width/2,                 originY + thicknessOffset);
	ctx.closePath();
	ctx.stroke();
	ctx.restore();
}

function drawOutlineRect(ctx, originX, originY, width, height) {
	ctx.save();
	ctx.beginPath();
	ctx.strokeStyle = "rgb(255,0,0)";
	ctx.lineWidth = 1;
	ctx.strokeRect(originX + 0.5, originY + 0.5, width - 1, height - 1);
	ctx.restore();
}