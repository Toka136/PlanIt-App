interface Mobile{
    serialNuber():void;
    price():void;
}
class Iphone implements Mobile{
    serialNuber():void{
        console.log("1234568");
    }
    price():void{
        console.log("1200");
    }
}
class Samsung implements Mobile{
    serialNuber():void{
        console.log("123469");
    }
    price():void{
        console.log("2000");
    }
}
class Blackberry implements Mobile{
    serialNuber():void{
        console.log("1234567");
    }
    price():void{
        console.log("800");
    }
}
class MobileFacade{
    blackberry:Blackberry;
    iphone:Iphone;
    samsung:Samsung;
    constructor(){
        this.blackberry=new Blackberry();
        this.iphone=new Iphone();
        this.samsung=new Samsung();
    }
    IphoneInfo():void{
        this.iphone.serialNuber();
        this.iphone.price();
    }
    SamsungInfo():void{
        this.samsung.serialNuber();
        this.samsung.price();
    }
    BlackberryInfo():void{
        this.blackberry.serialNuber();
        this.blackberry.price();
    }

}
const facade=new MobileFacade();
facade.IphoneInfo();
facade.SamsungInfo();
facade.BlackberryInfo();