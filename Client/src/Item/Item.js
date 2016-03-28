var FocalVar=1;
//物件類型
/*優先度排序:
    地形0;補包1;移動、攻擊範圍2;建築物、玩家
    
*/
function MapItem(x,y,T,MA,VA){
    //x,y,type,Moveable,VisiAble
    this.Postion = new Object();
    this.Postion.X = x;
    this.Postion.Y = y;
    this.Type=T;
    this.MoveAble = MA;
    this.VisiAble=VA
    //放上面有甚麼，用鏈結串列
    this.Class='MapItem';
    this.Top =null;
    this.Div = document.createElement("div");
    this.Div.style.position = 'absolute';
    this.Div.style.backgroundColor = "#FFFFFF";
    this.Div.style.width = Option.CubeSize*FocalVar + "px";
    this.Div.style.height = Option.CubeSize*FocalVar + "px";
    this.Div.style.left = (this.Postion.X * (Option.CubeSize + Option.CubeLine*2 ) * FocalVar ) + "px";
    this.Div.style.top = (this.Postion.Y * (Option.CubeSize + Option.CubeLine*2) * FocalVar ) + "px";
    this.findTop=function(){
        var father=this;
        while(father.Top!=null)
        {
            father=father.Top;
        }
        return father;
    }

    this.getinfo=function(){
        var tmp=this.findTop();
        tmp.Div.addEventListener("mouseover",function (){
        if(tmp.VisiAble==true)
            console.log(tmp);    
        });    
    }
    this.insert=function(input){
        var father=this;
        while(1)
        {
            if(father.Top!=null)
            {
                father=father.Top;
            }
            else
            {
                father.Top=input;
                break;
            }
        }
    }
    this.earse=function(input){
        var father=this;
        var son;
        if(typeof(input)=='undefined'){
            while(1)
            {
                if(father.Top!=null)
                {
                    son=father;
                    father=father.Top;
                }
                else
                {
                    if(father==this)
                    father.Top=null;
                    else
                    son.Top=null;
                    break;
                }
            }
        }
        else
        {
            while(father.Top!=input)
                father=father.Top;
            
            if(input.Top!=null)
            {
                father.Top=input.Top;
            }
            else
            {
                father.Top=null;
            }
            
        }
    }
    
}

function PlayerItem(x,y,no,T,MA,MR,VA,VR,RR) {
  //x,y,no,type,Moveable,MoveRange,VisiAble,ViewRange,RadioRange
  MapItem.call(this,x,y,T,MA,VA);
  this.No = no;
  this.MoveRange = MR;
  this.ViewRange=VR;
  this.RadioRange=RR;
  this.Class='PlayerItem';
  this.Div.style.backgroundColor = "#FF0000";
  this.Div.style.cursor='default';
   this.Move=function(x,y)
   {
     this.Postion.X=x;
     this.Postion.Y=y;
     this.Div.style.left = (this.Postion.X * (Option.CubeSize + Option.CubeLine * 2) * FocalVar ) + "px";
     this.Div.style.top = (this.Postion.Y * (Option.CubeSize + Option.CubeLine * 2) * FocalVar ) + "px";
   }
}
PlayerItem.prototype=new MapItem();
PlayerItem.prototype.constructor=PlayerItem;

function BulidItem(x,y,T,MA,VA,VR,RR) {
  //x,y,type,Moveable,VisiAble,ViewRange
  MapItem.call(this,x,y,T,MA,VA);
  this.Class='BulidItem';
  this.ViewRange=VR;
  this.RadioRange=RR;
  this.Div.style.backgroundColor='#FF00FF';
}
BulidItem.prototype=new MapItem();
BulidItem.prototype.constructor=BulidItem;

function DropItem(x,y,T,MA,VA) {
  //x,y,type,Moveable,VisiAble,ViewRange
  MapItem.call(this,x,y,T,MA,VA);
  this.Div.style.backgroundColor='#F0000F';
}
DropItem.prototype=new MapItem();
DropItem.prototype.constructor=DropItem

function MoveItem(x,y,T,MA,VA) {
  //x,y,type,Moveable,VisiAble,ViewRange
  MapItem.call(this,x,y,T,MA,VA);
  
}
MoveItem.prototype=new MoveItem();
MoveItem.prototype.constructor=MoveItem;
function AttackItem(x,y,T,MA,VA) {
  //x,y,type,Moveable,VisiAble,ViewRange
  MapItem.call(this,x,y,T,MA,VA);
  this.Div.style.backgroundColor='#0000FF';
  this.Under=null;
}
AttackItem.prototype=new AttackItem();
AttackItem.prototype.constructor=AttackItem;

