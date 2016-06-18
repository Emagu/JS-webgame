var FocalVar=1;
//物件類型

//父物件，基本上所有物件都繼承這個
//使用方式就是地圖物件為最底層，用串列列起來Top指上方的東西，Under
//在用insert插入靜態物件，一層一層貼上去
//基本上只要用findTop()找出最上面那一個物件來做操作
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
    this.Move_AP;
    this.Invincible=true;
    var info_on=false;
    var info=null;
    
    this.Div = document.createElement("div");
    this.Div.style.position = 'absolute';
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
        case '草原':
            this.MoveAble=true;
            this.Move_AP=1;
            break;
        case '森林'://森林
            this.MoveAble=true;
            this.Move_AP=2;
            break;
        case '山':
            this.MoveAble=false;
            this.Move_AP=2;
            break;
        case '海':
            this.MoveAble=false;
            this.Move_AP=2;
            break;
        }
    }
    this.show=function(){
        if(this.VisiAble)
        switch(this.Type){
        case '草原'://草原
            this.Div.style.backgroundColor = "transparent";
            this.Div.style.backgroundImage = "url(./pic/草地.png)";
            break;
        case '森林'://森林
            this.Div.style.backgroundColor = "transparent";
            this.Div.style.backgroundImage = "url(./pic/樹木.png)";
            break;
        case '山':
            this.Div.style.backgroundColor = "transparent";
            this.Div.style.backgroundImage = "url(./pic/山.png)";
            break;
        case '海':
            this.Div.style.backgroundColor = "transparent"; 
            this.Div.style.backgroundImage = "url(./pic/河.png)";
            break;
        }
    }
    this.setType();
    this.Div.addEventListener("mouseover",function(){//滑鼠移入，觸發事件
         /*
        if(info_on){
            //console.log(info);
            //用來改右邊的控制列
           
            while(parent.VARIABLE.View.GameArea.RightControl.button.firstChild) parent.VARIABLE.View.GameArea.RightControl.button.removeChild(parent.VARIABLE.View.GameArea.RightControl.button.firstChild);
            
            parent.VARIABLE.View.GameArea.RightControl.button.appendChild(document.createTextNode("座標:"+info.X+","+info.Y));
            parent.VARIABLE.View.GameArea.RightControl.button.appendChild(document.createElement("br"));
            
            if(info.Class=='ActionItem')
            {
               info=info.Under;
            }
            if(info.Hidden)//隱形就不能用喔 之後再加
                info=info.Under;
            switch (info.Class) {
                case 'MapItem':
                    parent.VARIABLE.View.GameArea.RightControl.button.appendChild(document.createTextNode("地形為:"+info.Type));
                    break;
                case 'PlayerItem':
                    parent.VARIABLE.View.GameArea.RightControl.button.appendChild(document.createTextNode(info.Side+"方玩家"));
                    break;
                case 'BulidingItem':
                    parent.VARIABLE.View.GameArea.RightControl.button.appendChild(document.createTextNode(info.Side+"方"+info.Type));
   
                    break;
                case 'AiItem':
                    parent.VARIABLE.View.GameArea.RightControl.button.appendChild(document.createTextNode(info.Side+"方AI"));
                    break;
            }
        }
        */
    });
    this.getinfo=function(tmp){//用來取得地圖上東西，動態物件不讀
        if(tmp.VisiAble)
        {
            info_on=true;
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
            input1.Under.Top=input;
            input.Under=input1.Under;
            input.Top=input1;
            input1.Under=input;
        }
        
    }
    this.earse=function(input){//有input就刪除串列裡的ipnut，沒有就把最上方的刪掉
        var father=this;
        var son;
        if(typeof(input)=='undefined'){
            son=father.findTop();
            if(son.Class!='MapItem'){
                son.Under.Top=null;
                son.Under=null;
            }
        }
        else
        {
            
            while(father.Top!=input)
            {
                
                father=father.Top;
            }
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
                input.Under=null;
            }
            
        }
    }
}

function PlayerItem(x,y,no,T,S) {
  //x,y,號碼,兵種,陣營
  //要新增狀態類,置盲、中毒等每個都要獨立有回合變數、函式
  var Arms_init0=[100,15,5,false,5,15];
  //通訊兵,HP,AP,VR,MA,MR,RR,
  var Arms_init1=[100,15,5,false,5,15];
  //工程師,HP,AP,VR,MA,MR,RR,
  var Arms_init2=[100,15,5,false,5,15];
  //狙擊手,HP,AP,VR,MA,MR,RR,
  var Arms_init3=[100,15,5,false,5,15];
  //醫護兵,HP,AP,VR,MA,MR,RR,
  var Arms_init4=[100,15,5,false,5,15];
  //野戰兵,HP,AP,VR,MA,MR,RR,
  var Arms_init5=[100,15,5,false,5,15];
  //水鬼,HP,AP,VR,MA,MR,RR,
  var Arms_init6=[100,15,5,false,5,15];
  //裝甲兵,HP,AP,VR,MA,MR,RR,
  var AI=[100,15,5,false,5,15];
  //AI,HP,AP,VR,MA,MR,RR,
  MapItem.call(this,x,y);
  this.HomeX=x;
  this.HomeY=y;
  this.Invincible=false;
  this.VisiAble=true;
  this.No = no;
  this.MoveRange;
  this.ViewRange;
  this.RadioRange;
  this.Type=T;
  this.Side=S;//放入陣營
  this.Class='PlayerItem';
  this.AP;
  this.HP;
  this.Move_AP=0;
  this.APRecover=10;
  this.Hidden=false;
  this.Dir=4;//1左2上3右4下
  this.Snipe_dir=0;//1左2上3右4下
  var Data=new Object();
  this.getData=function() {
        var tmp=this;
        Data.X=tmp.X;
        Data.Y=tmp.Y;
        Data.Type=tmp.Type;
        Data.No=tmp.No;
        Data.Side=tmp.Side;
        Data.HP=tmp.HP;
        Data.AP=tmp.AP;
      
        return Data;
  };
  this.setData=function(Data,position) {
      this.X=position.X;
      this.Y=position.Y;
      this.AP=Data.AP;
      this.HP=Data.HP;
  };
  this.setType=function(){//兵種初始特性,只用一次,放圖的在下面
  //之後放在靜態陣列
    switch(this.Type){
        case '通訊兵' :
            this.HP=Arms_init0[0];
            this.AP=Arms_init0[1];
            this.ViewRange=Arms_init0[2];
            this.MoveAble=Arms_init0[3];
            this.MoveRange=Arms_init0[4];
            this.RadioRange=Arms_init0[5];
            break;
        case '工程師' :
            this.HP=Arms_init1[0];
            this.AP=Arms_init1[1];
            this.ViewRange=Arms_init1[2];
            this.MoveAble=Arms_init1[3];
            this.MoveRange=Arms_init1[4];
            this.RadioRange=Arms_init1[5];
            break;
        case '狙擊手' :
            this.HP=Arms_init2[0];
            this.AP=Arms_init2[1];
            this.ViewRange=Arms_init2[2];
            this.MoveAble=Arms_init2[3];
            this.MoveRange=Arms_init2[4];
            this.RadioRange=Arms_init2[5];
            break;
        case '醫護兵' :
            this.HP=Arms_init3[0];
            this.AP=Arms_init3[1];
            this.ViewRange=Arms_init3[2];
            this.MoveAble=Arms_init3[3];
            this.MoveRange=Arms_init3[4];
            this.RadioRange=Arms_init3[5];
            break;
        case '野戰兵' :
            this.HP=Arms_init4[0];
            this.AP=Arms_init4[1];
            this.ViewRange=Arms_init4[2];
            this.MoveAble=Arms_init4[3];
            this.MoveRange=Arms_init4[4];
            this.RadioRange=Arms_init4[5];
            break;
        case '水鬼' :
            this.HP=Arms_init5[0];
            this.AP=Arms_init5[1];
            this.ViewRange=Arms_init5[2];
            this.MoveAble=Arms_init5[3];
            this.MoveRange=Arms_init5[4];
            this.RadioRange=Arms_init5[5];
            break;
        case '裝甲兵' :
            this.HP=Arms_init6[0];
            this.AP=Arms_init6[1];
            this.ViewRange=Arms_init6[2];
            this.MoveAble=Arms_init6[3];
            this.MoveRange=Arms_init6[4];
            this.RadioRange=Arms_init6[5];
            break;
        case 'AI' :
            this.HP=AI[0];
            this.AP=AI[1];
            this.ViewRange=AI[2];
            this.MoveAble=AI[3];
            this.MoveRange=AI[4];
            this.RadioRange=AI[5];
            break;
        }
  }
  this.show=function(){
      switch(this.Type){
        case '通訊兵' :
            this.Div.style.backgroundColor = "transparent"; 
            if(this.Side=='A')
                switch (this.Dir) {
                    case 1:
                        this.Div.style.backgroundImage = "url(./pic/Arms/blue_signaller_left.png)";
                        break;
                    case 2:
                        this.Div.style.backgroundImage = "url(./pic/Arms/blue_signaller_up.png)";
                        break;
                    case 3:
                        this.Div.style.backgroundImage = "url(./pic/Arms/blue_signaller_right.png)";
                        break;
                    case 4:
                        this.Div.style.backgroundImage = "url(./pic/Arms/blue_signaller_down.png)";
                        break;
                }
            
            if(this.Side=='B')
                switch (this.Dir) {
                    case 1:
                        this.Div.style.backgroundImage = "url(./pic/Arms/red_signaller_left.png)";
                        break;
                    case 2:
                        this.Div.style.backgroundImage = "url(./pic/Arms/red_signaller_up.png)";
                        break;
                    case 3:
                        this.Div.style.backgroundImage = "url(./pic/Arms/red_signaller_right.png)";
                        break;
                    case 4:
                        this.Div.style.backgroundImage = "url(./pic/Arms/red_signaller_down.png)";
                        break;
                }
            if(this.Side=='C')
                switch (this.Dir) {
                    case 1:
                        this.Div.style.backgroundImage = "url(./pic/Arms/yellow_signaller_left.png)";
                        break;
                    case 2:
                        this.Div.style.backgroundImage = "url(./pic/Arms/yellow_signaller_up.png)";
                        break;
                    case 3:
                        this.Div.style.backgroundImage = "url(./pic/Arms/yellow_signaller_right.png)";
                        break;
                    case 4:
                        this.Div.style.backgroundImage = "url(./pic/Arms/yellow_signaller_down.png)";
                        break;
                }
            if(this.Side=='D')
               switch (this.Dir) {
                    case 1:
                        this.Div.style.backgroundImage = "url(./pic/Arms/green_signaller_left.png)";
                        break;
                    case 2:
                        this.Div.style.backgroundImage = "url(./pic/Arms/green_signaller_up.png)";
                        break;
                    case 3:
                        this.Div.style.backgroundImage = "url(./pic/Arms/green_signaller_right.png)";
                        break;
                    case 4:
                        this.Div.style.backgroundImage = "url(./pic/Arms/green_signaller_down.png)";
                        break;
                }
            this.Under.show();
            break;
        case '工程師' :
            this.Div.style.backgroundColor = "transparent";
                        if(this.Side=='A')
                switch (this.Dir) {
                    case 1:
                        this.Div.style.backgroundImage = "url(./pic/Arms/blue_engineer_left.png)";
                        break;
                    case 2:
                        this.Div.style.backgroundImage = "url(./pic/Arms/blue_engineer_up.png)";
                        break;
                    case 3:
                        this.Div.style.backgroundImage = "url(./pic/Arms/blue_engineer_right.png)";
                        break;
                    case 4:
                        this.Div.style.backgroundImage = "url(./pic/Arms/blue_engineer_down.png)";
                        break;
                }
            
            if(this.Side=='B')
                switch (this.Dir) {
                    case 1:
                        this.Div.style.backgroundImage = "url(./pic/Arms/red_engineer_left.png)";
                        break;
                    case 2:
                        this.Div.style.backgroundImage = "url(./pic/Arms/red_engineer_up.png)";
                        break;
                    case 3:
                        this.Div.style.backgroundImage = "url(./pic/Arms/red_engineer_right.png)";
                        break;
                    case 4:
                        this.Div.style.backgroundImage = "url(./pic/Arms/red_engineer_down.png)";
                        break;
                }
            if(this.Side=='C')
                switch (this.Dir) {
                    case 1:
                        this.Div.style.backgroundImage = "url(./pic/Arms/yellow_engineer_left.png)";
                        break;
                    case 2:
                        this.Div.style.backgroundImage = "url(./pic/Arms/yellow_engineer_up.png)";
                        break;
                    case 3:
                        this.Div.style.backgroundImage = "url(./pic/Arms/yellow_engineer_right.png)";
                        break;
                    case 4:
                        this.Div.style.backgroundImage = "url(./pic/Arms/yellow_engineer_down.png)";
                        break;
                }
            if(this.Side=='D')
               switch (this.Dir) {
                    case 1:
                        this.Div.style.backgroundImage = "url(./pic/Arms/green_engineer_left.png)";
                        break;
                    case 2:
                        this.Div.style.backgroundImage = "url(./pic/Arms/green_engineer_up.png)";
                        break;
                    case 3:
                        this.Div.style.backgroundImage = "url(./pic/Arms/green_engineer_right.png)";
                        break;
                    case 4:
                        this.Div.style.backgroundImage = "url(./pic/Arms/green_engineer_down.png)";
                        break;
                }
            this.Under.show();
            break;
        case '狙擊手' :
            this.Div.style.backgroundColor = "transparent";
                        if(this.Side=='A')
                switch (this.Dir) {
                    case 1:
                        this.Div.style.backgroundImage = "url(./pic/Arms/blue_sniper_left.png)";
                        break;
                    case 2:
                        this.Div.style.backgroundImage = "url(./pic/Arms/blue_sniper_up.png)";
                        break;
                    case 3:
                        this.Div.style.backgroundImage = "url(./pic/Arms/blue_sniper_right.png)";
                        break;
                    case 4:
                        this.Div.style.backgroundImage = "url(./pic/Arms/blue_sniper_down.png)";
                        break;
                }
            
            if(this.Side=='B')
                switch (this.Dir) {
                    case 1:
                        this.Div.style.backgroundImage = "url(./pic/Arms/red_sniper_left.png)";
                        break;
                    case 2:
                        this.Div.style.backgroundImage = "url(./pic/Arms/red_sniper_up.png)";
                        break;
                    case 3:
                        this.Div.style.backgroundImage = "url(./pic/Arms/red_sniper_right.png)";
                        break;
                    case 4:
                        this.Div.style.backgroundImage = "url(./pic/Arms/red_sniper_down.png)";
                        break;
                }
            if(this.Side=='C')
                switch (this.Dir) {
                    case 1:
                        this.Div.style.backgroundImage = "url(./pic/Arms/yellow_sniper_left.png)";
                        break;
                    case 2:
                        this.Div.style.backgroundImage = "url(./pic/Arms/yellow_sniper_up.png)";
                        break;
                    case 3:
                        this.Div.style.backgroundImage = "url(./pic/Arms/yellow_sniper_right.png)";
                        break;
                    case 4:
                        this.Div.style.backgroundImage = "url(./pic/Arms/yellow_sniper_down.png)";
                        break;
                }
            if(this.Side=='D')
               switch (this.Dir) {
                    case 1:
                        this.Div.style.backgroundImage = "url(./pic/Arms/green_sniper_left.png)";
                        break;
                    case 2:
                        this.Div.style.backgroundImage = "url(./pic/Arms/green_sniper_up.png)";
                        break;
                    case 3:
                        this.Div.style.backgroundImage = "url(./pic/Arms/green_sniper_right.png)";
                        break;
                    case 4:
                        this.Div.style.backgroundImage = "url(./pic/Arms/green_sniper_down.png)";
                        break;
                }
            this.Under.show();
            break;
        case '醫護兵' :
            this.Div.style.backgroundColor = "transparent";
                        if(this.Side=='A')
                switch (this.Dir) {
                    case 1:
                        this.Div.style.backgroundImage = "url(./pic/Arms/blue_doctor_left.png)";
                        break;
                    case 2:
                        this.Div.style.backgroundImage = "url(./pic/Arms/blue_doctor_up.png)";
                        break;
                    case 3:
                        this.Div.style.backgroundImage = "url(./pic/Arms/blue_doctor_right.png)";
                        break;
                    case 4:
                        this.Div.style.backgroundImage = "url(./pic/Arms/blue_doctor_down.png)";
                        break;
                }
            
            if(this.Side=='B')
                switch (this.Dir) {
                    case 1:
                        this.Div.style.backgroundImage = "url(./pic/Arms/red_doctor_left.png)";
                        break;
                    case 2:
                        this.Div.style.backgroundImage = "url(./pic/Arms/red_doctor_up.png)";
                        break;
                    case 3:
                        this.Div.style.backgroundImage = "url(./pic/Arms/red_doctor_right.png)";
                        break;
                    case 4:
                        this.Div.style.backgroundImage = "url(./pic/Arms/red_doctor_down.png)";
                        break;
                }
            if(this.Side=='C')
                switch (this.Dir) {
                    case 1:
                        this.Div.style.backgroundImage = "url(./pic/Arms/yellow_doctor_left.png)";
                        break;
                    case 2:
                        this.Div.style.backgroundImage = "url(./pic/Arms/yellow_doctor_up.png)";
                        break;
                    case 3:
                        this.Div.style.backgroundImage = "url(./pic/Arms/yellow_doctor_right.png)";
                        break;
                    case 4:
                        this.Div.style.backgroundImage = "url(./pic/Arms/yellow_doctor_down.png)";
                        break;
                }
            if(this.Side=='D')
               switch (this.Dir) {
                    case 1:
                        this.Div.style.backgroundImage = "url(./pic/Arms/green_doctor_left.png)";
                        break;
                    case 2:
                        this.Div.style.backgroundImage = "url(./pic/Arms/green_doctor_up.png)";
                        break;
                    case 3:
                        this.Div.style.backgroundImage = "url(./pic/Arms/green_doctor_right.png)";
                        break;
                    case 4:
                        this.Div.style.backgroundImage = "url(./pic/Arms/green_doctor_down.png)";
                        break;
                }
            this.Under.show();
            break;
        case '野戰兵' :
            this.Div.style.backgroundColor = "transparent";
                        if(this.Side=='A')
                switch (this.Dir) {
                    case 1:
                        this.Div.style.backgroundImage = "url(./pic/Arms/blue_assault_left.png)";
                        break;
                    case 2:
                        this.Div.style.backgroundImage = "url(./pic/Arms/blue_assault_up.png)";
                        break;
                    case 3:
                        this.Div.style.backgroundImage = "url(./pic/Arms/blue_assault_right.png)";
                        break;
                    case 4:
                        this.Div.style.backgroundImage = "url(./pic/Arms/blue_assault_down.png)";
                        break;
                }
            
            if(this.Side=='B')
                switch (this.Dir) {
                    case 1:
                        this.Div.style.backgroundImage = "url(./pic/Arms/red_assault_left.png)";
                        break;
                    case 2:
                        this.Div.style.backgroundImage = "url(./pic/Arms/red_assault_up.png)";
                        break;
                    case 3:
                        this.Div.style.backgroundImage = "url(./pic/Arms/red_assault_right.png)";
                        break;
                    case 4:
                        this.Div.style.backgroundImage = "url(./pic/Arms/red_assault_down.png)";
                        break;
                }
            if(this.Side=='C')
                switch (this.Dir) {
                    case 1:
                        this.Div.style.backgroundImage = "url(./pic/Arms/yellow_assault_left.png)";
                        break;
                    case 2:
                        this.Div.style.backgroundImage = "url(./pic/Arms/yellow_assault_up.png)";
                        break;
                    case 3:
                        this.Div.style.backgroundImage = "url(./pic/Arms/yellow_assault_right.png)";
                        break;
                    case 4:
                        this.Div.style.backgroundImage = "url(./pic/Arms/yellow_assault_down.png)";
                        break;
                }
            if(this.Side=='D')
               switch (this.Dir) {
                    case 1:
                        this.Div.style.backgroundImage = "url(./pic/Arms/green_assault_left.png)";
                        break;
                    case 2:
                        this.Div.style.backgroundImage = "url(./pic/Arms/green_assault_up.png)";
                        break;
                    case 3:
                        this.Div.style.backgroundImage = "url(./pic/Arms/green_assault_right.png)";
                        break;
                    case 4:
                        this.Div.style.backgroundImage = "url(./pic/Arms/green_assault_down.png)";
                        break;
                }
            this.Under.show();
            break;
        case '水鬼' :
            this.Div.style.backgroundColor = "transparent";
            if(this.Side=='A')
                switch (this.Dir) {
                    case 1:
                        this.Div.style.backgroundImage = "url(./pic/Arms/blue_frogman_left.png)";
                        break;
                    case 2:
                        this.Div.style.backgroundImage = "url(./pic/Arms/blue_frogman_up.png)";
                        break;
                    case 3:
                        this.Div.style.backgroundImage = "url(./pic/Arms/blue_frogman_right.png)";
                        break;
                    case 4:
                        this.Div.style.backgroundImage = "url(./pic/Arms/blue_frogman_down.png)";
                        break;
                }
            
            if(this.Side=='B')
                switch (this.Dir) {
                    case 1:
                        this.Div.style.backgroundImage = "url(./pic/Arms/red_frogman_left.png)";
                        break;
                    case 2:
                        this.Div.style.backgroundImage = "url(./pic/Arms/red_frogman_up.png)";
                        break;
                    case 3:
                        this.Div.style.backgroundImage = "url(./pic/Arms/red_frogman_right.png)";
                        break;
                    case 4:
                        this.Div.style.backgroundImage = "url(./pic/Arms/red_frogman_down.png)";
                        break;
                }
            if(this.Side=='C')
                switch (this.Dir) {
                    case 1:
                        this.Div.style.backgroundImage = "url(./pic/Arms/yellow_frogman_left.png)";
                        break;
                    case 2:
                        this.Div.style.backgroundImage = "url(./pic/Arms/yellow_frogman_up.png)";
                        break;
                    case 3:
                        this.Div.style.backgroundImage = "url(./pic/Arms/yellow_frogman_right.png)";
                        break;
                    case 4:
                        this.Div.style.backgroundImage = "url(./pic/Arms/yellow_frogman_down.png)";
                        break;
                }
            if(this.Side=='D')
               switch (this.Dir) {
                    case 1:
                        this.Div.style.backgroundImage = "url(./pic/Arms/green_frogman_left.png)";
                        break;
                    case 2:
                        this.Div.style.backgroundImage = "url(./pic/Arms/green_frogman_up.png)";
                        break;
                    case 3:
                        this.Div.style.backgroundImage = "url(./pic/Arms/green_frogman_right.png)";
                        break;
                    case 4:
                        this.Div.style.backgroundImage = "url(./pic/Arms/green_frogman_down.png)";
                        break;
                }
            this.Under.show();
            break;
        case '裝甲兵' :
            this.Div.style.backgroundColor = "transparent";
                        if(this.Side=='A')
                switch (this.Dir) {
                    case 1:
                        this.Div.style.backgroundImage = "url(./pic/Arms/blue_ironman_left.png)";
                        break;
                    case 2:
                        this.Div.style.backgroundImage = "url(./pic/Arms/blue_ironman_up.png)";
                        break;
                    case 3:
                        this.Div.style.backgroundImage = "url(./pic/Arms/blue_ironman_right.png)";
                        break;
                    case 4:
                        this.Div.style.backgroundImage = "url(./pic/Arms/blue_ironman_down.png)";
                        break;
                }
            
            if(this.Side=='B')
                switch (this.Dir) {
                    case 1:
                        this.Div.style.backgroundImage = "url(./pic/Arms/red_ironman_left.png)";
                        break;
                    case 2:
                        this.Div.style.backgroundImage = "url(./pic/Arms/red_ironman_up.png)";
                        break;
                    case 3:
                        this.Div.style.backgroundImage = "url(./pic/Arms/red_ironman_right.png)";
                        break;
                    case 4:
                        this.Div.style.backgroundImage = "url(./pic/Arms/red_ironman_down.png)";
                        break;
                }
            if(this.Side=='C')
                switch (this.Dir) {
                    case 1:
                        this.Div.style.backgroundImage = "url(./pic/Arms/yellow_ironman_left.png)";
                        break;
                    case 2:
                        this.Div.style.backgroundImage = "url(./pic/Arms/yellow_ironman_up.png)";
                        break;
                    case 3:
                        this.Div.style.backgroundImage = "url(./pic/Arms/yellow_ironman_right.png)";
                        break;
                    case 4:
                        this.Div.style.backgroundImage = "url(./pic/Arms/yellow_ironman_down.png)";
                        break;
                }
            if(this.Side=='D')
               switch (this.Dir) {
                    case 1:
                        this.Div.style.backgroundImage = "url(./pic/Arms/green_ironman_left.png)";
                        break;
                    case 2:
                        this.Div.style.backgroundImage = "url(./pic/Arms/green_ironman_up.png)";
                        break;
                    case 3:
                        this.Div.style.backgroundImage = "url(./pic/Arms/green_ironman_right.png)";
                        break;
                    case 4:
                        this.Div.style.backgroundImage = "url(./pic/Arms/green_ironman_down.png)";
                        break;
                }
            this.Under.show();
            break;
        case 'AI':
            
            this.Div.style.backgroundColor = "transparent"; 
            this.Div.style.backgroundImage = "url(./pic/zombe.png)";
            this.Under.show();
            break;
            
      }
      if(this.Hidden){
          
          if(this.Under.Class=='MapItem'){
                this.Div.style.backgroundColor = "transparent"; 
                this.Div.style.backgroundImage = "";
                this.Under.show();
            }
            else{
                this.Under.show();
                this.Div.style.backgroundColor="transparent";
            }
      }
  }
  

  this.Move=function(x,y)//移動...
   {
     this.X=x;
     this.Y=y;
     this.Div.style.left = (this.X * (Option.CubeSize + Option.CubeLine * 2) * FocalVar ) + "px";
     this.Div.style.top = (this.Y * (Option.CubeSize + Option.CubeLine * 2) * FocalVar ) + "px";
   }
   this.Hide=function(){
       //躲起來?
       if(this.Hidden){
            this.Hidden=false;
            this.MoveAble=false;
            this.MoveRange=0;
       }
       else
       {
           
            this.Hidden=true;
            this.MoveAble=true; 
            this.Move_AP=this.Under.Move_AP;
            this.MoveRange=5;
       }
       
   }
    
}
PlayerItem.prototype.constructor=PlayerItem;

function BulidingItem(x,y,T,S,Turn) {
  //x,y,type,Moveable,VisiAble,ViewRange,RadioRange
  //要有結束回合
  MapItem.call(this,x,y);
  this.VisiAble=true;
  this.Type=T;
  this.Side=S;
  this.EndTurn=-1;
  this.AP;
  this.Move_AP;//移動到這個建築物下
  this.Cost;
  this.HP;
  this.Invincible=false;
  this.EndTurn=-1;
  this.RadioRange=0;
  this.ViewRange=0;
  this.Class='BulidingItem';
  var Data=new Object();
  this.getData=function() {
     var tmp=this;
      Data.X=tmp.X;
      Data.Y=tmp.Y;
      Data.Side=tmp.Side;
      Data.Type=tmp.Type;
      Data.EndTurn=tmp.EndTurn;
      return Data;
  };
  this.setData=function(Data) {
      this.X=Data.X;
      this.Y=Data.Y;
      this.Type=Data.Type;
      this.Side=Data.Side;
      this.EndTurn=Data.EndTurn;
  };
  this.setType=function(){
    switch(this.Type){//設屬性,
    case '房子' :
        this.ViewRange=0;
        this.RadioRange=0;
        this.MoveAble=true;
        this.Move_AP=5;
        this.HP=100;
        this.Cost=10;
        this.AP=10;
        break;
    case '拒馬':
        this.ViewRange=0;
        this.RadioRange=0;
        this.MoveAble=false;
        this.Move_AP=0;
        this.HP=100;
        this.Cost=10;
        this.AP=10;
        break;
    case '拒馬':
        this.ViewRange=0;
        this.RadioRange=0;
        this.MoveAble=false;
        this.Move_AP=0;
        this.HP=100;
        this.Cost=10;
        this.AP=10;
        break;
    case '通訊點':
        this.ViewRange=0;
        this.RadioRange=10;
        this.MoveAble=true;
        this.Move_AP=5;
        this.HP=100;
        this.Cost=10;
        this.AP=10;
        break;
    case '監視點':
        this.ViewRange=5;
        this.RadioRange=0;
        this.MoveAble=true;
        this.Move_AP=5;
        this.HP=100;
        this.Cost=10;
        this.AP=10;
        break;
    case '補包':
        this.ViewRange=0;
        this.RadioRange=0;
        this.MoveAble=true;
        this.Move_AP=0;
        this.HP=1;
        this.Cost=10;
        this.AP=10;
        break;
    case '資源點':
        this.ViewRange=0;
        this.RadioRange=0;
        this.MoveAble=true;
        this.Move_AP=0;
        this.HP=1;
        this.Cost=10;
        this.AP=10;
        break;
    case '地雷':
        this.ViewRange=0;
        this.RadioRange=0;
        this.MoveAble=true;
        this.Move_AP=0;
        this.HP=1;
        this.Cost=10;
        this.AP=10;
        break;
    case '定時炸彈':
        this.ViewRange=0;
        this.RadioRange=0;
        this.MoveAble=true;
        this.Move_AP=0;
        this.HP=1;
        this.Cost=10;
        this.EndTurn=Turn+3;
        this.Invincible=true;
        this.AP=10;
        break;
    }
  }
  this.show=function(){//放圖
    if(this.VisiAble)
      switch(this.Type){
        case '房子' :
                this.Div.style.backgroundColor = "transparent"; 
                this.Div.style.backgroundImage = "url(./pic/Item/1/1.png)";
                break;
        case '拒馬' :
                this.Div.style.backgroundColor = "transparent"; 
                this.Div.style.backgroundImage = "url(./pic/Item/1/0.png)";
                break;
        case '通訊點':
                this.Div.style.backgroundColor = "transparent"; 
                this.Div.style.backgroundImage = "url(./pic/Item/1/2.png)";
                break;
        case '監視點':
                this.Div.style.backgroundColor = "transparent"; 
                this.Div.style.backgroundImage = "url(./pic/Item/1/3.png)";
                break;
        case '資源點':
                this.Div.style.backgroundColor = "transparent"; 
                this.Div.style.backgroundImage = "url(./pic/Item/1/4.png)";
                break;
        case '補包':
                this.Div.style.backgroundColor = "transparent"; 
                this.Div.style.backgroundImage = "url(./pic/Item/1/5.png)";
            break;
        case '地雷':
                this.Div.style.backgroundColor = "transparent"; 
               break;
        case '定時炸彈':
                this.Div.style.backgroundColor="#000000";
            break;      
          
      }
  }
  
  this.setType();
}
BulidingItem.prototype.constructor=BulidingItem;


function TurnItem(x,y,T,S,turn){
    //來放不用靜態物件又要記回合的，像是空襲
    this.X=x;
    this.Y=y;
    this.Type=T;
    this.Side=S;
    this.Turn=turn;
    switch (this.Type) {
        case '空中偵察':
            this.EndTurn=this.Turn+3;
            this.ViewRange=5;
            break;
        
        default:
            // code
    }
} 

//動態物件
function ActionItem(x,y) {
  //x,y,type,Moveable,VisiAble,ViewRange
    MapItem.call(this,x,y);
    this.VisiAble=true;
    this.MoveAble=true;
    this.Invincible=true;
    this.Class='ActionItem';
    this.earse=function(){
        this.Under.Top=null;
    }
    this.show=function(){//放圖
    
        if(this.Under.Class=='MapItem')
            this.Div.style.backgroundColor="#FFFF00";
        else{
            if(this.Under.VisiAble){
                this.Under.show();
                this.Under.Div.style.backgroundColor="#FFFF00";
            }
            else
            {
               this.Div.style.backgroundColor="#FFFF00"; 
            }
        }
    }
}
ActionItem.prototype.constructor=ActionItem;
