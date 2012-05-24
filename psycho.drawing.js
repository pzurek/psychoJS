if (!psycho) var psycho = {};

psycho.drawFrame = function (topic) {
    var ctx = psycho.ctx;
    ctx.save();
    ctx.lineWidth = topic.style.lineWidth;
    ctx.strokeStyle = topic.style.lineColor;
    ctx.fillStyle = topic.style.fillColor;

    if (topic.style.shape === "rounded rectangle")
        psycho.sketchRoundedRectangle(topic.left, topic.top, topic.width, topic.height);
    else if (topic.style.shape === "octagon")
        psycho.sketchOctagon(topic.left, topic.top, topic.width, topic.height);
    else if (topic.style.shape === "hexagon")
        psycho.sketchHexagon(topic.left, topic.top, topic.width, topic.height);
    else if (topic.style.shape === "ellipse")
        psycho.sketchEllipse(topic.left, topic.top, topic.width, topic.height);
    else if (topic.style.shape === "circle")
        psycho.sketchCircle(topic.left, topic.top, topic.width);
    else
        psycho.sketchRectangle(topic.left, topic.top, topic.width, topic.height);

    psycho.paint(ctx);
    ctx.restore();
}

psycho.drawText = function (topic) {
    var ctx = psycho.ctx;
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = topic.style.fontSize + 'px ' + topic.style.fontFace;
    ctx.fillStyle = topic.style.textColor;
    var width = ctx.measureText(topic.text).width;
    var height = topic.style.fontSize;

    ctx.translate(Math.ceil(topic.width/ 2), Math.ceil(topic.height/ 2));
    ctx.fillText(topic.text, topic.left, topic.top);
    ctx.restore();

    if (psycho.settings.drawOutline) {
        psycho.drawOutlineRect(topic.left + topic.style.padding + topic.style.lineWidth,
                    topic.top + topic.style.padding + topic.style.lineWidth,
                    width, height);
    }
}

psycho.drawDiagonals = function (canvas) {
    var ctx = psycho.ctx;
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "white";
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.moveTo(canvas.width, 0);
    ctx.lineTo(0, canvas.height);
    ctx.stroke();
    ctx.restore();
}

psycho.drawOutlineRect = function (originX, originY, width, height) {
    var ctx = psycho.ctx;
    if (psycho.settings.drawOutline) {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255,0,0,255)";
        ctx.lineWidth = 1;
        ctx.strokeRect(originX + 0.5, originY + 0.5, width - 1, height - 1);
        ctx.restore();
    }
}

psycho.sketchRectangle = function (originX, originY, width, height) {
    var ctx = psycho.ctx;
    ctx.save();
    thicknessOffset = ctx.lineWidth / 2;
    ctx.beginPath();
    ctx.rect(originX + thicknessOffset, originY + thicknessOffset,
         width - 2 * thicknessOffset, height - 2 * thicknessOffset);
    psycho.paint(ctx);
    ctx.restore();
    psycho.drawOutlineRect(originX, originY, width, height);
}

psycho.sketchRoundedRectangle = function (originX, originY, width, height) {
    var ctx = psycho.ctx;
    ctx.save();
    thicknessOffset = ctx.lineWidth / 2;
    radius = height / 4;
    ctx.beginPath();
    ctx.moveTo(originX + radius + thicknessOffset, originY + thicknessOffset);
    ctx.arc(originX + width - radius - thicknessOffset, originY + radius + thicknessOffset,
           radius, 270 * (Math.PI / 180), 0 * (Math.PI / 180), false);
    ctx.arc(originX + width - radius - thicknessOffset, originY + height - radius - thicknessOffset,
           radius, 0 * (Math.PI / 180), 90 * (Math.PI / 180), false);
    ctx.arc(originX + radius + thicknessOffset, originY + height - radius - thicknessOffset,
           radius, 90 * (Math.PI / 180), 180 * (Math.PI / 180), false);
    ctx.arc(originX + radius + thicknessOffset, originY + radius + thicknessOffset,
           radius, 180 * (Math.PI / 180), 270 * (Math.PI / 180), false);
    ctx.closePath();
    psycho.paint(ctx);
    ctx.restore();
    psycho.drawOutlineRect(originX, originY, width, height);
}

psycho.sketchHexagon = function (originX, originY, width, height) {
    var ctx = psycho.ctx;
    ctx.save();
    thicknessOffset = ctx.lineWidth / 2;
    ctx.beginPath();
    ctx.moveTo(originX + height / 2 + thicknessOffset, originY + thicknessOffset);
    ctx.lineTo(originX + width - height / 2 - thicknessOffset, originY + thicknessOffset);
    ctx.lineTo(originX + width - thicknessOffset, originY + height / 2);
    ctx.lineTo(originX + width - height / 2 - thicknessOffset, originY + height - thicknessOffset);
    ctx.lineTo(originX + height / 2 + thicknessOffset, originY + height - thicknessOffset);
    ctx.lineTo(originX + thicknessOffset, originY + height / 2);
    ctx.closePath();
    psycho.paint(ctx);
    ctx.restore();
    psycho.drawOutlineRect(originX, originY, width, height);
}

psycho.sketchOctagon = function (originX, originY, width, height) {
    var ctx = psycho.ctx;
    ctx.save();
    thicknessOffset = ctx.lineWidth / 2;
    chamfer = height / 4;
    ctx.beginPath();
    ctx.moveTo(originX + chamfer + thicknessOffset, originY + thicknessOffset);
    ctx.lineTo(originX + width - chamfer - thicknessOffset, originY + thicknessOffset);
    ctx.lineTo(originX + width - thicknessOffset, originY + chamfer + thicknessOffset);
    ctx.lineTo(originX + width - thicknessOffset, originY + height - chamfer - thicknessOffset);
    ctx.lineTo(originX + width - chamfer - thicknessOffset, originY + height - thicknessOffset);
    ctx.lineTo(originX + chamfer + thicknessOffset, originY + height - thicknessOffset);
    ctx.lineTo(originX + thicknessOffset, originY + height - chamfer - thicknessOffset);
    ctx.lineTo(originX + thicknessOffset, originY + chamfer + thicknessOffset);
    ctx.closePath();
    psycho.paint(ctx);
    ctx.restore();
    psycho.drawOutlineRect(originX, originY, width, height);
}

psycho.sketchEllipse = function (ctx, originX, originY, width, height) {
    var ctx = psycho.ctx;
    ctx.save();
    thicknessOffset = ctx.lineWidth / 2;
    ctx.beginPath();
    ctx.moveTo(originX + width / 2, originY + thicknessOffset);
    ctx.quadraticCurveTo(originX + width - thicknessOffset, originY + thicknessOffset,
                     originX + width - thicknessOffset, originY + height / 2);
    ctx.quadraticCurveTo(originX + width - thicknessOffset, originY + height - thicknessOffset,
                     originX + width / 2, originY + height - thicknessOffset);
    ctx.quadraticCurveTo(originX + thicknessOffset, originY + height - thicknessOffset,
                     originX + thicknessOffset, originY + height / 2);
    ctx.quadraticCurveTo(originX + thicknessOffset, originY + thicknessOffset,
                     originX + width / 2, originY + thicknessOffset);
    ctx.closePath();
    psycho.paint(ctx);
    ctx.restore();
    psycho.drawOutlineRect(originX, originY, width, height);
}

psycho.sketchCircle = function (originX, originY, diameter) {
    var ctx = psycho.ctx;
    ctx.save();
    var thicknessOffset = ctx.lineWidth / 2;
    var radius = diameter / 2;
    ctx.beginPath();
    ctx.arc(originX + radius, originY + radius, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    psycho.paint(ctx);
    ctx.restore();
    psycho.drawOutlineRect(originX, originY, width, height);
}

psycho.addShadow = function (ctx) {
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 4;
    ctx.shadowColor = 'black';
}

psycho.removeShadow = function (ctx) {
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.shadowColor = '';
}

psycho.paint = function (ctx) {
    if (psycho.settings.withShadow) {
        psycho.addShadow(ctx);
        ctx.stroke();
        psycho.removeShadow(ctx);
    }
    ctx.fill();
    ctx.stroke();
}

psycho.draw = function (canvas, ctx, topic) {
    canvas.width = canvas.width; //this clears the whole canvas, how handy
    psycho.drawDiagonals(canvas, ctx);
    ctx.translate(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2));
    topic.forAll(psycho.updateSize);
    topic.forAll(psycho.updatePosition);
    topic.forAll(psycho.drawFrame);
    topic.forAll(psycho.drawText);
}
