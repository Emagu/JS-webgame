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
function MapItem(x,y,T){
    
    //x,y,type,Moveable,VisiAble
    this.X = x;
    this.Y = y;
    this.Type=T;//地圖的Type拿來放地形
    this.MoveAble ;//可以移動
    this.VisiAble=true;//有沒有視野
    this.Class='MapItem';//類別名
    this.Top =null;//上方物件
    this.Under=null;//下方物件
    this.AP;
    var info_on=false;
    var info=null;
    this.Div = document.createElement("div");
    this.Div.style.position = 'absolute';
    this.Div.style.backgroundColor="#FFFFFF"; 
    this.Div.style.width = Option.CubeSize*FocalVar + "px";
    this.Div.style.height = Option.CubeSize*FocalVar + "px";
    this.Div.style.left = (this.X * (Option.CubeSize + Option.CubeLine*2 ) * FocalVar ) + "px";
    this.Div.style.top = (this.Y * (Option.CubeSize + Option.CubeLine*2) * FocalVar ) + "px";
    var Data=new Object();
    this.getData=function() {
        var tmp=this;
        Data.X=tmp.X;
        Data.Y=tmp.Y;
        Data.Type=tmp.Type;
        return Data;
    };
    this.setData=function(Data) {
        this.X=Data.X;
        this.Y=Data.Y;
        this.Type=Data.Type;
    };
    this.setType=function(){
    switch(this.Type){//給予消耗AP,特性
    case 'Grass'://草原
        this.MoveAble=true;
        this.AP=1;
        this.Div.style.backgroundColor = "#77FF00";
        break;
    case 'Forest'://森林
        this.MoveAble=true;
        this.Div.style.backgroundColor = "#008800";
        this.AP=2;
        break;
    case 'Mountain':
        this.MoveAble=false;
        this.Div.style.backgroundColor="#AA7700"; 
        break;
    case 'Sea':
       this.Div.style.backgroundColor ="#0000AA"; 
        this.MoveAble=false;
        break;
    break;
    }
    }
    this.setType();
    this.Div.addEventListener("mouseover",function(){//滑鼠移入，觸發事件
        if(info_on){
            //用來改右邊的控制列
            while(parent.VARIABLE.View.GameArea.RightControl.button.firstChild) parent.VARIABLE.View.GameArea.RightControl.button.removeChild(parent.VARIABLE.View.GameArea.RightControl.button.firstChild);
            parent.VARIABLE.View.GameArea.RightControl.button.appendChild(document.createTextNode("座標:"+info.X+","+info.Y));
            parent.VARIABLE.View.GameArea.RightControl.button.appendChild(document.createElement("br"));
            switch (info.Class) {
                case 'PlayerItem':
                    parent.VARIABLE.View.GameArea.RightControl.button.appendChild(document.createTextNode(info.Side+"方玩家"));
                    break;
                case 'BulidingItem':
                    parent.VARIABLE.View.GameArea.RightControl.button.appendChild(document.createTextNode(info.Side+"方建築物"));
                    // code
                    break;
                
                default:
                    // code
            }
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
    this.insert=function(input,input1){//把物件插入到最上方,inpu可以插在input1下方
        var father=this;
        if(typeof(input1)=='undefined')
        {
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
        else
        {
            console.log(input1);
            input1.Under.Top=input;
            input.Top=input1;
            input1.Under=input;
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

function PlayerItem(x,y,no,T,S) {
  //x,y,號碼,兵種,陣營
  MapItem.call(this,x,y);
  this.VisiAble=true;
  this.No = no;
  this.MoveRange ;
  this.ViewRange;
  this.RadioRange;
  this.Type=T;
  this.Side=S;//放入陣營
  this.Class='PlayerItem';
  this.AP;
  this.HP;
  switch(this.Type){//兵種初始特性
    case 'MAN' :
        this.MoveRange=5;
        this.ViewRange=5;
        this.RadioRange=10;
        this.MoveAble=false;
        this.AP=15;
        this.HP=100;
        break;
    }
  var Data=new Object();
  this.getData=function() {
     var tmp=this;
      Data.X=tmp.X;
      Data.Y=tmp.Y;
      Data.Type=tmp.Type;
      Data.No=tmp.No;
      Data.Side=tmp.Side;

      return Data;
  };
  this.setData=function(Data) {
      this.X=Data.X;
      this.Y=Data.Y;
      this.Type=Data.Type;
      this.No=Data.No;
      this.Side=Data.Side;
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

function BulidingItem(x,y,T,S) {
  //x,y,type,Moveable,VisiAble,ViewRange,RadioRange
  MapItem.call(this,x,y);
  this.VisiAble=true;
  this.Type=T;
  this.Side=S;
  this.AP;
  this.HP;
  this.Class='BulidingItem';
  this.Div.style.backgroundColor='#FF00FF';
  switch(this.Type){//設屬性
    case 'HOUSE' :
        this.ViewRange=5;
        this.RadioRange=10;
        this.MoveAble=true;
        this.AP=5;
        this.HP=100;
        break;
    }
  var Data=new Object();
  this.getData=function() {
     var tmp=this;
      Data.X=tmp.X;
      Data.Y=tmp.Y;
      Data.Type=tmp.Type;
      return Data;
  };
  this.setData=function(Data) {
      this.X=Data.X;
      this.Y=Data.Y;
      this.Type=Data.Type;
  };
}
BulidingItem.prototype=new MapItem();
BulidingItem.prototype.constructor=BulidingItem;

function DropItem(x,y) {
  //x,y,type,VisiAble,
  MapItem.call(this,x,y);
  this.VisiAble=false;
  switch(this.Type){//兵種初始特性
    case '' :
        this.MoveAble=true;
        break;
    }
  this.Class='DropItem';
  this.Div.style.backgroundColor='#F0000F';
}
DropItem.prototype=new MapItem();
DropItem.prototype.constructor=DropItem

//動態物件
function MoveItem(x,y) {
  //x,y,type,Moveable,VisiAble,ViewRange
  MapItem.call(this,x,y);
    this.VisiAble=true;
  this.MoveAble=true;
   this.Class='MoveItem';
    this.earse=function(){
      this.Under.Top=null;
  }
}
MoveItem.prototype=new MoveItem();
MoveItem.prototype.constructor=MoveItem;

function AttackItem(x,y) {
  //x,y,type,Moveable,VisiAble,ViewRange

  MapItem.call(this,x,y);
    this.VisiAble=true;
  this.MoveAble=true;
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

function BulidItem(x,y) {
  //x,y,type,Moveable,VisiAble,ViewRange
 
  MapItem.call(this,x,y);
    this.VisiAble=true;
  this.MoveAble=true;
    this.Class='BulidItem';
    this.earse=function(){
    this.Under.Top=null;
  }
}
BulidItem.prototype=new BulidItem();
BulidItem.prototype.constructor=BulidItem;
