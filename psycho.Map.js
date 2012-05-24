if (!psycho) var psycho = {};

psycho.Map = function() {
        this.author = "Piotr Zurek";
        // this.created = new Date();
        // this.centralTopic = new psycho.Topic();
        // this.settings = new psycho.Settings();
        this.centralTopic.type = "central";
        this.centralTopic.text = "psycho.js";
        this.centralTopic.map = this;
        this.centralTopic.positiveSideTopicList = new psycho.TopicList();
        this.centralTopic.negativeSideTopicList = new psycho.TopicList();
};

psycho.Map.prototype.centralTopic = new psycho.Topic();
psycho.Map.prototype.settings = new psycho.Settings();
psycho.Map.prototype.created = new Date();
