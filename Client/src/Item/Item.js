var FocalVar=1;
//物件類型
function MapItem(x,y,T,MA,VA){
    //x,y,type,Moveable,VisiAble
    this.Postion = new Object();
    this.Postion.X = x;
    this.Postion.Y = y;
    this.Type=T;
    this.MoveAble = MA;
    this.VisiAble=VA
    this.Div = document.createElement("div");
    this.Div.style.position = 'absolute';
    this.Div.style.backgroundColor = "#FFFFFF";
    this.Div.style.width = Option.CubeSize*FocalVar + "px";
    this.Div.style.height = Option.CubeSize*FocalVar + "px";
    this.Div.style.left = (this.Postion.X * (Option.CubeSize + Option.CubeLine * 2) * FocalVar ) + "px";
    this.Div.style.top = (this.Postion.Y * (Option.CubeSize + Option.CubeLine * 2) * FocalVar ) + "px";
    this.Div.style.cursor = "pointer";

}

function PlayerItem(x,y,no,T,MA,MR,VA,VR) {
  //x,y,no,type,Moveable,MoveRange,VisiAble,ViewRange
  
  this.Postion = new Object();
  this.Postion.X = x;
  this.Postion.Y = y;
  this.Type=T;
  this.MoveAble = MA;
  this.VisiAble=VA
  this.No = no;
  this.MoveRange = MR;
  this.ViewRange=VR;
  this.Div = document.createElement("div");
  this.Div.style.position = 'absolute';
	this.Div.style.backgroundColor = "#00FFFF";
  this.Div.style.width = Option.CubeSize*FocalVar + "px";
  this.Div.style.height = Option.CubeSize*FocalVar + "px";
  this.Div.style.left = (this.Postion.X * (Option.CubeSize + Option.CubeLine * 2) * FocalVar ) + "px";
  this.Div.style.top = (this.Postion.Y * (Option.CubeSize + Option.CubeLine * 2) * FocalVar ) + "px";
 // this.Div.style.cursor = "pointer";
      
   this.Move=function(x,y)
   {
     this.Postion.X=x;
     this.Postion.Y=y;
     this.Div.style.left = (this.Postion.X * (Option.CubeSize + Option.CubeLine * 2) * FocalVar ) + "px";
  this.Div.style.top = (this.Postion.Y * (Option.CubeSize + Option.CubeLine * 2) * FocalVar ) + "px";
   }
}


function BulidItem(x,y,T,MA,VA,VR) {
  //x,y,type,Moveable,VisiAble,ViewRange
  
  this.ViewRange=VR;
}
