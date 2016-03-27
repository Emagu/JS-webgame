function GameAreaView(){
    this.self = document.createElement("div");
    this.self.style.width = "100%";
    this.self.style.height = "100%";
    
    this.iframe = document.createElement('iframe');
    this.iframe.style.width="70%";
    this.iframe.style.height="70%";
    this.iframe.style.left="15%";
    this.iframe.style.top="20%";
    this.iframe.style.position='absolute';
    
    this.self.appendChild(this.iframe);
    
    /*global TopControlView 實作於Control*/
    var TopControl = new TopControlView();
    this.self.appendChild(TopControl.self);
    
    /*global LeftControlView 實作於Control*/
    this.LeftControl = new LeftControlView();
    this.self.appendChild(this.LeftControl.self);
    
    /*global RightControlView 實作於Control*/
    var RightControl = new RightControlView();
    this.self.appendChild(RightControl.self);
    
}