
function w55cTagClass(){
        this.links=[
        { 'href' : 'http://tags.w55c.net/rs?id=db44eb055e234032a827dbac431ef7e9&t=checkout', 'type' : 'IMG' },
        { 'href' : 'http://ad.yieldmanager.com/pixel?adv=461396&code=0AxRDLeHox&t=2', 'type' : 'IMG' }
        ];
        this.imgs=new Array();
        this.args=new Array();
        this.process();
}

w55cTagClass.prototype.addImg=function(href){
    var img=document.createElement('img');
    img.src=href;
    this.imgs.push(img);
};

w55cTagClass.prototype.addJsSrc=function(href){
    var script=document.createElement('script'),
        head=document.getElementsByTagName('head')[0],
        body=document.getElementsByTagName('body')[0];
    script.type='text/javascript';
    script.src=href;
    if (head==null){
        head=document.createElement('head');
        body.parentNode.insertBefore(head,body);
    }
    head.appendChild(script);
};

w55cTagClass.prototype.mergeParams=function(curLink){
    var paramIter,
        argsIter,
        argCount=0,
        curParam,
        curArg,
        params;
    if (curLink.indexOf('?')>=0){
        params=curLink.split('?');
        curLink=params[0]+'?';
        params=params[1].split('&');                
        for (paramIter=0;paramIter<params.length;paramIter++){
            curParam=params[paramIter];
            if (curParam.indexOf('$')>=0){
                for (argsIter=0;argsIter<this.args.length;argsIter++){
                    curArg=this.args[argsIter];
                    if (curArg.regex.test(curParam)){
                        curParam=curParam.replace(curArg.regex,curArg.val);
                        argCount++;
                    }                    
                }
                if (!argCount){
                    curParam=curParam.replace(/[=].+/,'=');
                }
            }
            curLink+=curParam+'&';
        }
        curLink=curLink.replace(/[&]$/,'');
    }
    return curLink
};

w55cTagClass.prototype.processLinks=function(){
    var linkIter,
        paramIter,
        curLink,
        curParam,
        params,
        target;
    for (linkIter=0;linkIter<this.links.length;linkIter++){
        curLink=this.links[linkIter].href;
        curLink=this.mergeParams(curLink)
        switch(this.links[linkIter].type){
            case 'JS_SRC' : this.addJsSrc(curLink);
                            break;
            case 'IMG'    : this.addImg(curLink);
                            break;
            default       : break;
        }
    }
};

w55cTagClass.prototype.process=function(){
    var iter,
        argsArray=new Array(),
        argsTmp,
        target=new RegExp("^http://cti.w55c.net/ct/ct-db44eb055e234032a827dbac431ef7e9.js([?]|$)","i"),
        scripts=document.getElementsByTagName('script');
    for (iter=0;iter<scripts.length;iter++){
        if (target.test(scripts[iter].src)){
            argsArray=scripts[iter].src.replace(/^[^?]+[?]/,'').split('&');
            break;
        }
    }
    for (iter=0;iter<argsArray.length;iter++){
        argsTmp=argsArray[iter].split('=');
        this.args.push({ 'regex': new RegExp('[=][$]'+decodeURI(argsTmp[0])+'$'), 'val': '='+argsTmp[1]});
    }     
    this.processLinks();
};
                   
var w55cTag=new w55cTagClass();
