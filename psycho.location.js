if (!psycho) var psycho = {};

psycho.updateSize = function (topic) {
    psycho.ctx.save();
    psycho.ctx.font = topic.style.fontSize + 'px ' + topic.style.fontFace;
    topic.width = Math.ceil(psycho.ctx.measureText(topic.text).width + 2 * (topic.style.padding + topic.style.lineWidth));
    topic.height = topic.style.fontSize + 2 * (topic.style.padding + topic.style.lineWidth);
    psycho.ctx.restore();
};

psycho.updatePosition = function (topic) {
    if (topic.type === "central") {
        topic.left = Math.ceil(-topic.width / 2);
        topic.top = Math.ceil(-topic.height / 2);
    } else {
        if (topic.parent.style.layout === "map") {
            topic.left = Math.floor(topic.parent.left + topic.parent.width + psycho.settings.horizontalGap);
            if (topic.index === 0)
                topic.top = topic.parent.top + topic.parent.height/2 - topic.parent.subtopics.height()/2;
            else
                topic.top = topic.previous().top + topic.previous().height + psycho.settings.verticalGap;
        };
    }
};
