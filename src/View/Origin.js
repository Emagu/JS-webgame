

function OriginView(windowSize,Option){
    //宣告變數
    this.self = document.createElement("div");
    this.self.style.position = "absolute";
    //變數宣告完畢
    
    //宣告函式
    this.windowReSize = function(windowSize,Option){//當視窗調整 調整版面
        this.self.style.width = Option.W+"px";
        this.self.style.height = Option.H+"px";
        if(windowSize.W > Option.W) this.self.style.left = (windowSize.W - Option.W)/2+"px";
        else this.self.style.left = "0px";
        if(windowSize.H > Option.H) this.self.style.top = (windowSize.H - Option.H)/2+"px";
        else this.self.style.top = "0px";
    };//視窗大小調整
    //函式宣告完畢
    
    //初始化函式執行
    this.windowReSize(windowSize,Option);
    //執行初始化函式完畢
    
}