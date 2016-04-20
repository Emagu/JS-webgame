function GameAreaView(){
    this.self = document.createElement("div");
    /*global Option 宣告於index*/
    //this.self.style.width = Option.windowSize.W+"px";
    //this.self.style.height = Option.windowSize.H+"px";
    this.self.style.width = 1280+"px";
    this.self.style.height = 720+"px";
    
    this.iframe = document.createElement('iframe');
    this.iframe.style.width=1280/2;
    this.iframe.style.height=72*7;
    this.iframe.style.left=1280/4;
    this.iframe.style.top=72*1.5;
    this.iframe.style.position='absolute';
    
    this.self.appendChild(this.iframe);
    
    /*global TopControlView 實作於Control*/
    var TopControl = new TopControlView();
    this.self.appendChild(TopControl.self);
    
    /*global LeftControlView 實作於Control*/
    this.LeftControl = new LeftControlView();
    this.self.appendChild(this.LeftControl.self);
    
    /*global RightControlView 實作於Control*/
    this.RightControl = new RightControlView();
    this.self.appendChild(this.RightControl.self);
    
}