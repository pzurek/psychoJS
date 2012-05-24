if (!psycho) var psycho = {};

psycho.Topic = function() {
        this.subtopics = new psycho.TopicList();
        this.subtopics.parent = this;
        this.style = new psycho.Style();
        this.text = "New topic";
        this.isExpanded = true;
        // this.index;
        // this.width;
        // this.height;
        // this.left;
        // this.top;
};

psycho.Topic.prototype.previous = function () {
    if (this.type !== "central" && this.parent.subtopics.indexOf(this) > 0)
        return this.parent.subtopics[this.parent.subtopics.indexOf(this) - 1];
    else
        return false;
};

psycho.Topic.prototype.next = function () {
    if (this.type !== "central" && this.parent.subtopics.indexOf(this) < this.parent.subtopics.length - 1)
        return this.parent.subtopics[this.parent.subtopics.indexOf(this) + 1];
    else
        return false;
};

psycho.Topic.prototype.totalHeight = function () {
    if (this.isExpanded && this.subtopics.length > 0) {
        if (this.style.layout === "map")
            return this.subtopics.height;
        else if (this.style.layout === "tree")
            return this.height + this.subtopics.height() + settings.treeVerticalGap;
        else if (this.style.layout === "orgChart")
            return this.height + this.subtopics.height() + settings.orgChartVerticalGap;
    } else {
        return this.height;
    }
};

psycho.Topic.prototype.totalWidth = function () {
    if (this.isExpanded && this.subtopics.length > 0) {
        if (this.style.layout === "map")
            return this.width + this.subtopics.width() + settings.horizontalGap;
        else if (this.style.layout === "tree")
            return this.width/2 + this.subtopics.width() + settings.treeVerticalGap;
        else if (this.style.layout === "orgChart")
            if (this.subtopics.width() > this.width)
                return this.subtopics.width();
    } else {
        return this.width;
    }
};

psycho.Topic.prototype.forAll = function (func, bottomUp) {
    if (!bottomUp === undefined)
        bottomUp = true;

    if (bottomUp) {
        for (var i = 0; i < this.subtopics.length; i++)
            this.subtopics[i].forAll(func);
        func(this);
    } else {
        func(this);
        for (var i = 0; i < this.subtopics.length; i++)
            this.subtopics[i].forAll(func);
    }
};
