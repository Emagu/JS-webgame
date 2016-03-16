//物件類型
function Item(x,y,no,type,MT,MA){
    this.Div = document.createElement("div");
    this.Div.style.position = 'absolute';
    
    this.Postion = new Object();
    this.Postion.X = x;
    this.Postion.Y = y;
    this.No = no;
    this.Type = type;
    
    this.property = new Object();
    this.property.MoveType = MT;
    this.property.MoveAbility = MA;
    
    this.clone = function(){
      return new Item(this.Postion.X,this.Postion.Y,this.No,this.Type,this.property.MoveType,this.property.MoveAbility);
    };
}