var canvas;
var ctx;

var map = Map();
var centralTopic = map.centralTopic;
var settings = map.settings;

function Map(){
    if (this instanceof Map) {
    this.author = "Piotr Zurek";
    this.created = "08/02/2011";
    this.centralTopic = Topic();
    this.settings = Settings();
    this.centralTopic.type = "central";
    this.centralTopic.text = "psycho.js - free mind mapping for the web";
    this.centralTopic.map = this;
    } else
        return new Map();
}

function Topic(){
    if (this instanceof Topic) {
    this.text = "New topic";
    this.children = [];
    this.parent = null;
    this.isExpanded = true;
    this.index = 0;
    this.width;
    this.height;
    this.left;
    this.top;
    this.style = Style();
    } else
        return new Topic();
}

function Settings(){
    if (this instanceof Settings) {
    this.horizontalGap = 50;
    this.verticalGap = 20;
    } else
        return new Settings();
}

function Style(){
    if (this instanceof Style) {
    this.layout = "map";
    this.shape = "rounded rectangle";
    this.lineWidth = 2;
    this.lineColor = "rgb(255,255,255)";
    this.fillColor = "rgba(255,0,0,120)";
    this.textColor = "rgb(255,255,255)";
//    this.font = "16px Sans";
    // this.fontSize = "7em";
    } else
        return new Style();
}

Topic.prototype.forAll = function(func) {
    for (var i = 0; i < this.children.length; i++)
        this.children[i].forAll(func);
    func(this);
}

function addTopic(parent) {
    var newTopic = Topic(parent);
    if (parent.type === "central") {
        newTopic.type = "main";
    } else {
        newTopic.type = "subtopic";
    }
    parent.children.push(newTopic);
    newTopic.index = parent.children.length - 1;
    newTopic.text = "New Topic " + parent.children.length.toString();
    newTopic.map = parent.map;
    newTopic.parent = parent;
    newTopic.width = map.context.measureText(newTopic.text).width;
    newTopic.height = 28;
    newTopic.top = 50 + newTopic.index * (newTopic.height + settings.verticalGap);
    newTopic.left = parent.left + parent.width + settings.horizontalGap;
        
    return newTopic;
}

function newTopic(parent, text) {
    var newTopic = addTopic(parent);
    newTopic.text = text;
    newTopic.width = map.context.measureText(newTopic.text).width;
    return newTopic;
}

function drawText(topic) {
    ctx.save();
    ctx.font = topic.style.font;
    ctx.lineWidth = topic.style.lineWidth;
    // ctx.strokeStyle = topic.style.lineColor;
    ctx.fillStyle = topic.style.textColor;
    ctx.fillText(topic.text, topic.left, topic.top);
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

function drawRectangle(ctx, originX, originY, width, height, drawOutline, withShadow) {
    if (drawOutline) {
        drawOutlineRect(ctx, originX, originY, width, height);
    }
    ctx.save();
    thicknessOffset = ctx.lineWidth/2;
    ctx.beginPath();
    ctx.rect(originX + thicknessOffset, originY + thicknessOffset,
             width - 2 * thicknessOffset, height - 2 * thicknessOffset);
    paint(ctx);
    ctx.restore();
}

function drawRoundedRectangle(ctx, originX, originY, width, height, drawOutline, withShadow) {
    if (drawOutline) {
        drawOutlineRect(ctx, originX, originY, width, height);
    }
    ctx.save();
    thicknessOffset = ctx.lineWidth/2;
    radius = height/4;
    ctx.beginPath();
    ctx.moveTo(originX + radius + thicknessOffset         ,originY + thicknessOffset);
    ctx.arc   (originX + width - radius - thicknessOffset ,originY + radius + thicknessOffset,
               radius, 270 *(Math.PI/180),   0 *(Math.PI/180), false);
    ctx.arc   (originX + width - radius - thicknessOffset ,originY + height - radius - thicknessOffset,
               radius,   0 *(Math.PI/180),  90 *(Math.PI/180), false);
    ctx.arc   (originX + radius + thicknessOffset         ,originY + height - radius - thicknessOffset,
               radius,  90 *(Math.PI/180), 180 *(Math.PI/180), false);
    ctx.arc   (originX + radius + thicknessOffset         ,originY + radius + thicknessOffset,
               radius, 180 *(Math.PI/180), 270 *(Math.PI/180), false);
    ctx.closePath();
    paint(ctx);
    ctx.restore();
}

function drawHexagon(ctx, originX, originY, width, height, drawOutline, withShadow) {
    if (drawOutline) {
        drawOutlineRect(ctx, originX, originY, width, height);
    }
    ctx.save();
    thicknessOffset = ctx.lineWidth/2;
    ctx.beginPath();
    ctx.moveTo(originX + height/2 + thicknessOffset         ,originY + thicknessOffset);
    ctx.lineTo(originX + width - height/2 - thicknessOffset ,originY + thicknessOffset);
    ctx.lineTo(originX + width - thicknessOffset            ,originY + height/2);
    ctx.lineTo(originX + width - height/2 - thicknessOffset ,originY + height - thicknessOffset);
    ctx.lineTo(originX + height/2 + thicknessOffset         ,originY + height - thicknessOffset);
    ctx.lineTo(originX + thicknessOffset                    ,originY + height/2);
    ctx.closePath();
    paint(ctx);
    ctx.restore();
}

function drawOctagon(ctx, originX, originY, width, height, drawOutline, withShadow) {
    if (drawOutline) {
        drawOutlineRect(ctx, originX, originY, width, height);
    }
    ctx.save();
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
    paint(ctx);
    ctx.restore();
}

function drawEllipse(ctx, originX, originY, width, height, drawOutline, withShadow) {
    if (drawOutline) {
        drawOutlineRect(ctx, originX, originY, width, height);
    }
    ctx.save();
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
    paint(ctx);
    ctx.restore();
}

function addShadow (ctx) {
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur =    2;
    ctx.shadowColor = 'black';
}

function removeShadow(ctx) {
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur =    0;
    ctx.shadowColor = '';
}

function paint(ctx) {
    if (withShadow) {
        addShadow(ctx);
        ctx.stroke();
        removeShadow(ctx);    
    }
    ctx.fill();
    ctx.stroke();
}

function draw() {
    canvas = document.getElementById("canvas");
    canvas.width = document.width - 2 * canvas.offsetLeft;
    canvas.height = document.height - 2 * canvas.offsetTop;
    //canvas.offsetLeft = 0;
    //canvas.offsetTop = 0;
    document.bgColor = "rgb(31,30,29)";
    if (canvas.getContext) {
        ctx = canvas.getContext("2d");

//        ctx.font = "28px Sans";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        map.context = ctx;

        //ctx.fillStyle = "rgb(200,0,0)";
        //ctx.fillRect (10, 10, 55, 50);

        //ctx.fillStyle = "rgba(47, 77, 135, 0.94)";
        //ctx.fillRect (0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "rgba(255, 0, 0, 0.49)";
        ctx.strokeStyle = "rgb(255,255,255)";
        ctx.lineWidth = 2;

        shapeHeight = 40;
        shapeGap    = 0.25 * shapeHeight;
        shapeWidth  = 2.5 * shapeHeight;

        drawOutline = true;
        withShadow  = true;

        drawRectangle       (ctx, 20, 20 + 0*(shapeHeight + shapeGap), shapeWidth, shapeHeight, drawOutline, withShadow);
        drawHexagon         (ctx, 20, 20 + 1*(shapeHeight + shapeGap), shapeWidth, shapeHeight, drawOutline, withShadow);
        drawOctagon         (ctx, 20, 20 + 2*(shapeHeight + shapeGap), shapeWidth, shapeHeight, drawOutline, withShadow);
        drawRoundedRectangle(ctx, 20, 20 + 3*(shapeHeight + shapeGap), shapeWidth, shapeHeight, drawOutline, withShadow);
        drawEllipse         (ctx, 20, 20 + 4*(shapeHeight + shapeGap), shapeWidth, shapeHeight, drawOutline, withShadow);

        centralTopic.width = map.context.measureText(centralTopic.text).width;
        centralTopic.left = - centralTopic.width / 2;
        centralTopic.top = 0;
        centralTopic.height = 28;
        addTopic(map.centralTopic);
        newTopic(map.centralTopic, "Some interesting topic");
        addTopic(map.centralTopic);
        newTopic(map.centralTopic, "Another rather long and pointless topic");
        addTopic(map.centralTopic);
        //map.centralTopic.forAll(get_text);
        
        centralTopic.forAll(drawText);
        // centralTopic.forAll(drawFrames);
    }
}
