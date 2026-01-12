var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Rectangle = /** @class */ (function () {
    function Rectangle() {
    }
    Rectangle.prototype.draw = function () {
        console.log("Rectangle");
    };
    return Rectangle;
}());
var Circle = /** @class */ (function () {
    function Circle() {
    }
    Circle.prototype.draw = function () {
        console.log("Circle");
    };
    return Circle;
}());
var shapeDecorater = /** @class */ (function () {
    function shapeDecorater(shape) {
        this.shape = shape;
    }
    shapeDecorater.prototype.draw = function () {
        this.shape.draw();
    };
    return shapeDecorater;
}());
var RedShape = /** @class */ (function (_super) {
    __extends(RedShape, _super);
    function RedShape(shape) {
        return _super.call(this, shape) || this;
    }
    RedShape.prototype.draw = function () {
        this.shape.draw();
        console.log("RedShape");
    };
    return RedShape;
}(shapeDecorater));
var normalShape = new Rectangle();
normalShape = new RedShape(normalShape);
normalShape.draw();
