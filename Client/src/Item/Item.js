var FocalVar=1;
//物件類型
/*優先度排序:
    地形0;補包1;移動、攻擊範圍2;建築物、玩家

*/
//父物件，基本上所有物件都繼承這個
//使用方式就是地圖物件為最底層，用串列列起來Top指上方的東西，Under
//在用insert插入靜態物件，一層一層貼上去
//基本上只要用findTop()找出最上面那一個物件來做操作
//之後重寫靜態物件和動態物件兩種類別，把所有都用成私有變數，用set,get存取
function MapItem(x,y,T,MA,VA){
    //x,y,type,Moveable,VisiAble
    this.X = x;
    this.Y = y;
    this.Type=T;
    this.MoveAble = MA;
    this.VisiAble=VA
    this.Class='MapItem';
    this.Top =null;
    this.Under=null;
    var info_on=false;
    var info=null;
    this.Div = document.createElement("div");
    this.Div.style.position = 'absolute';
    this.Div.style.backgroundColor = "#FFFFFF";
    this.Div.style.width = Option.CubeSize*FocalVar + "px";
    this.Div.style.height = Option.CubeSize*FocalVar + "px";
    this.Div.style.left = (this.X * (Option.CubeSize + Option.CubeLine*2 ) * FocalVar ) + "px";
    this.Div.style.top = (this.Y * (Option.CubeSize + Option.CubeLine*2) * FocalVar ) + "px";
    this.Div.addEventListener("mouseover",function(){//滑鼠移入，觸發事件
        if(info_on){
        console.log(info);
        //用來改右邊的控制列
        //parent.VARIABLE.View.GameArea.LeftControl.AttackButton.childNodes[0].nodeValue=info.Class;
        }
    });
    this.getinfo=function(tmp){//用來取得地圖上東西，動態物件不讀
        if(tmp.VisiAble)
        if(tmp.Class!='MapItem')
        {
            info_on=true;
            if(tmp.Class=='MoveItem' || tmp.Class=='AttackItem' ||tmp.Class=='BulidItem')
                if(tmp.Under.Class!='MapItem')
                    info=tmp.Under;
                else
                {
                     info_on=false;
                    tmp=null;
                }
            else
                info=tmp;
        }
        else
        {
            info_on=false;
            info=null;
        }
            
        }
    this.findTop=function(){//取的最上方的東西，直接用findTop()就是指那個物件
        var father=this;
        while(father.Top!=null)
        {
            father=father.Top;
        }
        return father;
    }
    this.insert=function(input){//把物件插入到最上方
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
                input.Under=father;
                break;
            }
        }
    }
    this.earse=function(input){//有input就刪除串列裡的ipnut，沒有就把最上方的刪掉
        var father=this;
        var son;
        if(typeof(input)=='undefined'){
            son=father.findTop();
            if(son.Class!='MapItem')
            son.Under.Top=null;
        }
        else
        {
            while(father.Top!=input)
                father=father.Top;
            
            if(input.Top!=null)
            {
                input.Top.Under=father;
                father.Top=input.Top;
                input.Top=null;
                input.Under=null;
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
  var Data=new Object();
  this.getData=function() {
     var tmp=this;
      Data.X=tmp.X;
      Data.Y=tmp.Y;
      Data.Type=tmp.Type;
      Data.MoveAble=tmp.MoveAble;
      Data.VisiAble=tmp.VisiAble;
      Data.No=tmp.No;
      Data.MoveRange=tmp.MoveRange;
      Data.ViewRange=tmp.ViewRange;
      Data.RadioRange=tmp.RadioRange;
      return Data;
  };
  this.setData=function(Data) {
      this.X=Data.X;
      this.Y=Data.Y;
      this.Type=Data.Type;
      this.MoveAble=Data.MoveAble;
      this.VisiAble=Data.VisiAble;
      this.No=Data.No;
      this.MoveRange=Data.MoveRange;
      this.ViewRange=Data.ViewRange;
      this.RadioRange=Data.RadioRange;
  };
  
  this.Div.style.backgroundColor = "#FF0000";
  this.Div.style.cursor='default';
  this.Move=function(x,y)//移動...
   {
     this.X=x;
     this.Y=y;
     this.Div.style.left = (this.X * (Option.CubeSize + Option.CubeLine * 2) * FocalVar ) + "px";
     this.Div.style.top = (this.Y * (Option.CubeSize + Option.CubeLine * 2) * FocalVar ) + "px";
   }
}
PlayerItem.prototype=new MapItem();
PlayerItem.prototype.constructor=PlayerItem;

function BulidingItem(x,y,T,MA,VA,VR,RR) {
  //x,y,type,Moveable,VisiAble,ViewRange,RadioRange
  MapItem.call(this,x,y,T,MA,VA);
  this.Class='BulidingItem';
  this.ViewRange=VR;
  this.RadioRange=RR;
  this.Div.style.backgroundColor='#FF00FF';
  var Data=new Object();
  this.getData=function() {
     var tmp=this;
      Data.X=tmp.X;
      Data.Y=tmp.Y;
      Data.Type=tmp.Type;
      Data.MoveAble=tmp.MoveAble;
      Data.VisiAble=tmp.VisiAble;
      Data.ViewRange=tmp.ViewRange;
      Data.RadioRange=tmp.RadioRange;
      return Data;
  };
  this.setData=function(Data) {
      this.X=Data.X;
      this.Y=Data.Y;
      this.Type=Data.Type;
      this.MoveAble=Data.MoveAble;
      this.VisiAble=Data.VisiAble;
      this.MoveRange=tmp.MoveRange;
      this.ViewRange=tmp.ViewRange;
      this.RadioRange=tmp.RadioRange;
  };
}
BulidingItem.prototype=new MapItem();
BulidingItem.prototype.constructor=BulidingItem;

function DropItem(x,y,T,MA,VA) {
  //x,y,type,Moveable,VisiAble,ViewRange
  MapItem.call(this,x,y,T,MA,VA);
  this.Div.style.backgroundColor='#F0000F';
}
DropItem.prototype=new MapItem();
DropItem.prototype.constructor=DropItem

//動態物件
function MoveItem(x,y,T,MA,VA) {
  //x,y,type,Moveable,VisiAble,ViewRange
  MapItem.call(this,x,y,T,MA,VA);
   this.Class='MoveItem';
    this.earse=function(){
      this.Under.Top=null;
  }
}
MoveItem.prototype=new MoveItem();
MoveItem.prototype.constructor=MoveItem;

function AttackItem(x,y,T,MA,VA) {
  //x,y,type,Moveable,VisiAble,ViewRange
  MapItem.call(this,x,y,T,MA,VA);
  var AttackCube;
    this.setCube=function(input){
        AttackCube=input;
    }
    this.Class='AttackItem';
    
    this.earse=function(){
    this.Under.Top=null;
  }
}
AttackItem.prototype=new AttackItem();
AttackItem.prototype.constructor=AttackItem;

function BulidItem(x,y,T,MA,VA) {
  //x,y,type,Moveable,VisiAble,ViewRange
 
  MapItem.call(this,x,y,T,MA,VA);
    this.Class='BulidItem';
    this.earse=function(){
    this.Under.Top=null;
  }
}
BulidItem.prototype=new BulidItem();
BulidItem.prototype.constructor=BulidItem;
