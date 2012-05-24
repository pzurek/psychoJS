if (!psycho) var psycho = {};

psycho.App = function () {
    this.canvas;
    this.settings = new psycho.Settings();
};

psycho.App.prototype.init = function (canvas) {
    this.ctx = canvas.getContext('2d');
};