if (!psycho) var psycho = {};

psycho.MapLayout = function (){};

psycho.MapLayout.prototype.name = "map";
psycho.MapLayout.prototype.hoizontalMainfirst = function(topic){};

psycho.MapLayout.prototype.update = function (topic) {
    topic.children.orientation = "vertical";
    topic.left = 0;
    topic.top = 0;
}

psycho.MapLayout.prototype.baseMainFirst = function (topic) {
    point = new psycho.Point();
    
    //calculating X value of the base point
    if (topic.type = "main") {
        if (topic.index = 0) {
            point.x = topic.parent.width / 2 + psycho.settings.horizontalGap;
        } else {
            point.x = topic.previous.basePoint.x;
        }
    } else {
    
    };
}