class Demo {
    show(){
        console.log('this.Age',this.Age)
    }
    get Age(){
        return this._age
    }
    set Age(val){
        this._age = val + 1
    }
}

let d = new Demo();
d.Age = 17;
d.show()