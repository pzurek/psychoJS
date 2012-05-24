
if (!psycho) var psycho = {
    canvas: {},
    ctx: {},
    settings: {},
    map: {},
    centralTopic: {},
    currentTopic: {}
};

psycho.addTopic = function (parent) {
    var newTopic = new psycho.Topic(parent);
    if (parent.type === "central") {
        newTopic.type = "main";
    } else {
        newTopic.type = "subtopic";
    }
    parent.subtopics.push(newTopic);
    newTopic.index = parent.subtopics.indexOf(newTopic);
    newTopic.text = "New Topic " + parent.subtopics.length.toString();
    newTopic.map = parent.map;
    newTopic.parent = parent;
    return newTopic;
};

psycho.newTopic = function (parent, text) {
    var newTopic = psycho.addTopic(parent);
    newTopic.text = text;
    return newTopic;
};

psycho.createTestData = function(map) {
    psycho.addTopic(map.centralTopic);
    psycho.newTopic(map.centralTopic, "Some interesting topic");
    psycho.addTopic(map.centralTopic);
    psycho.newTopic(map.centralTopic, "Another rather long and pointless topic");
    psycho.addTopic(map.centralTopic);
};

psycho.init = function() {
    var canvas = document.getElementById("canvas");
    
    canvas.width = window.innerWidth - 8; // - 2 * canvas.offsetLeft;
    canvas.height = window.innerHeight - 8; // - 2 * canvas.offsetTop;
    var ctx = canvas.getContext("2d");
    psycho.ctx = ctx;
    
    document.bgColor = '#282828';

    if (canvas.getContext) {
        this.map = new psycho.Map();
        this.centralTopic = psycho.map.centralTopic;
        this.settings = new psycho.Settings();   
        
        // var ctx = canvas.getContext("2d");
        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        psycho.updateSize(psycho.centralTopic);
        psycho.updatePosition(psycho.centralTopic);

        psycho.createTestData(psycho.map);
        psycho.draw(canvas, ctx, psycho.centralTopic);
        ctx.restore();
    }
};
