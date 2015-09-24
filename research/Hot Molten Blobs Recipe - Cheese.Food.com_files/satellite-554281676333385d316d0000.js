_satellite.pushAsyncScript(function(event, target, $variables){
  if ( typeof Array.prototype.reduce === "function" ) {
  // 100 ÷ throttle represents the percentage that 
  // will get served the survery code
  var throttle = 3, 
  mcvId = typeof s.visitor === "object" && s.visitor.getMarketingCloudVisitorID() || "1",
	mcvSum = mcvId.split("").reduce(function(a, b, i, ary) {
 		return parseInt(a,10) + parseInt(b,10); 
  }); 	
  _satellite.notify('MCID:'+ mcvId+';SUM:'+mcvSum,1);
  if (mcvSum % throttle === 0) {
		(function(){var g=function(e,h,f,g){
			this.get=function(a){for(var a=a+"=",c=document.cookie.split(";"),b=0,e=c.length;b<e;b++){for(var d=c[b];" "==d.charAt(0);)d=d.substring(1,d.length);if(0==d.indexOf(a))return d.substring(a.length,d.length)}return null};
			this.set=function(a,c){var b="",b=new Date;b.setTime(b.getTime()+6048E5);b="; expires="+b.toGMTString();document.cookie=a+"="+c+b+"; path=/; "};
			this.check=function(){var a=this.get(f);if(a)a=a.split(":");else if(100!=e)"v"==h&&(e=Math.random()>=e/100?0:100),a=[h,e,0],this.set(f,a.join(":"));else return!0;var c=a[1];if(100==c)return!0;switch(a[0]){case "v":return!1;case "r":return c=a[2]%Math.floor(100/c),a[2]++,this.set(f,a.join(":")),!c}return!0};
			this.go=function(){if(this.check()){var a=document.createElement("script");a.type="text/javascript";a.src=g+ "&t=" + (new Date()).getTime();document.body&&document.body.appendChild(a)}};
			this.start=function(){var a=this;window.addEventListener?window.addEventListener("load",function(){a.go()},!1):window.attachEvent&&window.attachEvent("onload",function(){a.go()})}};
			try{(new g(100,"r","QSI_S_ZN_5z45bL4KvG9ly17","//zn_5z45bl4kvg9ly17-sni.siteintercept.qualtrics.com/WRSiteInterceptEngine/?Q_ZID=ZN_5z45bL4KvG9ly17&Q_LOC="+encodeURIComponent(window.location.href))).start()}catch(i){}})();
  }
}
});
