function OptionSet(){//存放設定檔
    this.windowSize = new Object();
    var windowSizeSet = 0;
    var windowSizeArray = [{W:1280, H:720},{W:1280, H:960},{W:1360, H:768},{W:1440, H:900}];
    var ActorTypeArray = ["通訊兵","工程師","狙擊手","醫護兵","野戰兵","水鬼","裝甲兵"];
    var GameTypeArray = ["爆破","護送","佔領"];
    this.getWindowSet = function(){
        return windowSizeSet;
    };
    this.setWindowSize = function(_set){
        windowSizeSet = _set;
    };
    this.getWindowSize = function(){
        return windowSizeArray[windowSizeSet];
    };
    this.WindowSizeAdd = function(_set){
        if(windowSizeSet<(windowSizeArray.length-1)) windowSizeSet += _set;
    };
    this.WindowSizeSub = function(_set){
        if(windowSizeSet>0) windowSizeSet -= _set;
    };
    this.getActorTypeArray = function(){
        return ActorTypeArray;
    }
    this.getGameModeArray = function(){
        return GameTypeArray;
    }
    this.GameAreaWidth = 900;//遊戲區域寬度
    this.GameAreaHeight = 500;//遊戲區域高度
    this.CubeX = 60;//X軸總共有多少方格
    this.CubeY = 30;//Y軸總共有多少方格
    this.CubeLine = 1;//棋盤方格間的間距
    this.CubeSize = 30;//棋盤方格
}