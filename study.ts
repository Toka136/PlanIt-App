interface Shape{
    draw():void;
}
class Rectangle implements Shape{
    draw(): void {
        console.log("Rectangle");
    }
}
class Circle implements Shape{
    draw(): void {
        console.log("Circle");
    }
}
class shapeDecorater implements Shape{
    shape:Shape;
    constructor(shape:Shape){
        this.shape=shape;
    }
    draw(): void {
        this.shape.draw();
    }
}
class RedShape extends shapeDecorater{
    constructor(shape:Shape){
        super(shape);
    }
    draw(): void {
        this.shape.draw();
        console.log("RedShape");
    }
}
let normalShape=new Rectangle();
normalShape =new RedShape(normalShape);
normalShape.draw();