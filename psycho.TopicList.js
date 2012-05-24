if (!psycho) var psycho = {};

psycho.TopicList = function() {};
psycho.TopicList.prototype = [];
psycho.TopicList.prototype.parent = null;

psycho.TopicList.prototype.orientation = function () {
    if (this.parent) {
        if (this.parent.style.layout === "orgChart")
            return "horizontal";
        else
            return "vertical";
    }
};

psycho.TopicList.prototype.height = function () {
    var height = 0;
    if (this.length > 0) {
        if (this.orientation() === "vertical") {
            for (var i = 0; i < this.length; i++) {
                height += this[i].totalHeight();
            }
        } else {
            for (var i = 0; i < this.length; i++) {
                if (this[i].totalHeight > this.height)
                    height = this[i].totalHeight();
            }
        }
    }
    return height;
};

psycho.TopicList.prototype.width = function () {
    var width = 0;
    if (this.length > 0) {
        if (this.orientation() === "horizontal") {
            for (var i = 0; i < this.length; i++) {
                width += this[i].totalWidth();
            }
        } else {
            for (var i = 0; i < this.length; i++) {
                if (this[i].totalWidth > this.width)
                    width = this[i].totalWidth();
            }
        }
    }
    return width;
};
