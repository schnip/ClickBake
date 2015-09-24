// DTM Config "General": 
// [ ] Adobe Analytics page code is already present Help
// [ ] Enable EU compliance for Adobe Analytics
// Load Adobe Analytics page code at Page Top
// Object Name: s
// s_code follows

//Scripps Update 9/2/2015, EG - FOOD Category
var sni_aa = {
	host:	location.host.toLowerCase(),
	path:	location.pathname.toLowerCase(),
	prot:	location.protocol,
	href:	location.href.toLowerCase(),
	site:	location.host.match(/[\.\-]food.com/i) ? "FOODCOM" : "",
	event:		"",
	hubhier:	"",
	c_userId:	"",
	userId:		"",
	codeVersion:	"DTM-SNI-Food-20150902",
	s_account:		location.host.toLowerCase().indexOf(".food.com") > -1 ? "scrippsfoodcom" : "scrippsdev",
	getCookie: function(c_name) {
		var i,x,y,ARRcookies=document.cookie.split(";");
		for ( i=0; i<ARRcookies.length; i++ ) {
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if (x===c_name) {
				return unescape(y);
			}
		}
	}
},
s_account = sni_aa.s_account;

s=s_gi(sni_aa.s_account);

/************************** CONFIG SECTION **************************/
s.trackDownloadLinks=true;
s.trackExternalLinks=true;
s.trackInlineStats=true;
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";
s.useForcedLinkTracking = false;
s.linkInternalFilters="food.com,recipezaar.com,javascript:";
s.linkLeaveQueryString=false;
s.linkTrackVars="None";
s.linkTrackEvents="None";
if ( window.navigator.userAgent.indexOf("FBAN/FBIOS") > -1 && !s.referrer ) {
  s.referrer = "http://m.facebook.com/?app";
}

//************End Profile IDs

// Capture "layout" cookie to identify beta users
s.eVar67=sni_aa.getCookie("layout");

/*Plugin Config*/
s.usePlugins=true;

//Extending s.isReadyToTrack to check for Community API readiness
// _waitingForSNI is set false after 5 seconds
s._waitingForSNI = true;
setTimeout(function(){ s._waitingForSNI = false; }, 5000);
s.origIsReadyToTrack = s.isReadyToTrack;
s.isReadyToTrack = function extendIsReadyToTrack() {
	if ( s._waitingForSNI && ( typeof SNI === "object" && typeof SNI.Analytics === "object" && !SNI.Analytics.readyToTrack() ) ) {
		return false;
	} else {
		// We're okay for Gigya && DFP, pass it up to the orginal isReadyToTrack
		return typeof s.origIsReadyToTrack === "function" ? s.origIsReadyToTrack() : true; 
	}	
};

s.doPlugins = function s_doPlugins(s) {
  _satellite.notify("ENTER s_doPlugins", 1);
  _satellite.notify("CALLER: " + s_doPlugins.caller, 1);
  _satellite.notify("CALLER CALLER: " + s_doPlugins.caller.caller, 1);
	var origPN, endDir, sniRole, sniSweeps, trackLS, contextVars, i, e_by, e_gdr, e_mvpd, omniHour, omniDay, lenOH, aHour, aDay;
	s.events=s.apl(s.events,"event1",",",2);
	/* check for existence of mdManager */
   _satellite.notify( "mdm uid:" + mdManager.getUniqueId(), 1);
	if ( typeof FD === "object" && typeof FD.Session === "object"  ) {
	if ( FD.Session.isSignedIn() ) {
		s.eVar10 = FD.Session.user.uid;
		s.prop75 =  "Logged In";
	} else {
		s.prop75 =  "Logged Out";
		s.eVar10 = "";
	}
  } 
  if (typeof mdManager != "undefined") {
		//drop querystring
		s.pageName = origPN = mdManager.getParameterString("Url").toLowerCase().replace(/\/?\?.*/,'');
		//drop protocol
		s.pageName = s.pageName.replace(/https?:\/\//,'');
		if (s.pageName.length > 100) {
			s.pageName=s.pageName.substring(0,100);
		}
		s.channel = mdManager.getParameterString("CategoryDspName").toLowerCase();
		s.prop5 = mdManager.getParameterString("SctnDspName").toLowerCase();
		s.prop6 = mdManager.getParameterString("Title") && mdManager.getParameterString("Title").substr(0,94) + sni_aa.pageSuffix;
		s.prop7 = mdManager.getParameterString("Sponsorship");
		s.prop8 = mdManager.getParameterString("Classification");
		s.prop9 = mdManager.getParameterString("UniqueId").toUpperCase() + sni_aa.pageSuffix;
		s.prop10 = mdManager.getParameterString("Type").toLowerCase();
		s.prop21 = mdManager.getParameterString("searchTerms").toLowerCase();
		if (s.prop21) {
			s.eVar4=s.prop21;s.events=s.apl(s.events,"event14",",",2);
		}
		s.prop22 = mdManager.getParameterString("keyterm").toLowerCase();
		s.prop23 = mdManager.getParameterString("dimensions");
		s.eVar5 = s.prop23;
		s.prop24 = mdManager.getParameterString("dimensionValues");
		s.eVar6 = s.prop24;
		s.prop25 = mdManager.getParameterString("filter");
		s.prop27 = mdManager.getParameterString("noSearchResults");
		s.eVar7 = s.prop27;
		s.prop30=mdManager.getParameterString("dymterm").toLowerCase();  //change to capture dym terms to prop27 (no results) with dym appended as on home sites
		s.prop38=s.pageName;
		s.prop39 = mdManager.getParameterString("DelvFrmt").toLowerCase();
		s.prop40 = mdManager.getParameterString("AdKey1");
		s.prop41 = mdManager.getParameterString("ContentTag1");
		s.prop42 = mdManager.getParameterString("ContentTag2");
		s.prop43 = mdManager.getParameterString("AdKey2");
		s.prop44 = mdManager.getParameterString("Show_Abbr");
		s.prop46 = mdManager.getParameterString("Source");
		s.prop49 = mdManager.getParameterString("Subdomain");
		s.prop60 = mdManager.getParameterString("DeliveryChannel");
		s.prop62 = sni_aa.codeVersion;
		s.prop65 = mdManager.getParameterString("internalSearchType").toLowerCase();
		s.prop74 = mdManager.getParameterString("sortBy");
		s.eVar9 = s.prop74;
		s.eVar41 = mdManager.getParameterString("Spotlight_Center_1_name");
		s.eVar45 = mdManager.getParameterString("Spotlight_Center_2_name");
		if (s.eVar41) {
			s.events=s.apl(s.events,"event28",",",2);
		}
		if (s.eVar45) {
			s.events=s.apl(s.events,"event29",",",2);
		}
		s.eVar62=mdManager.getParameterString("Contributor");
		s.list2=mdManager.getParameterString("experiment");
		//FOODCOM Custom
		s.prop1=s.Util.getQueryParam('synd');
		s.prop31=mdManager.getParameterString("OwningUserID");
		s.prop48 = mdManager.getParameterString("keywordids");
		if (s.prop10.indexOf("topic") > -1) {
			s.events=s.apl(s.events,"event26",",",2);
		}
		if (s.prop10.indexOf("recipe_photo") > -1) {
			s.events=s.apl(s.events,"event19",",",2);
			// recipe pages have embeds galleries remove event10 if this is a photo view
			s.events=s.events.replace(/,?event10(,|$)/,'$1');	
		}
		if (s.prop10 == "upload_recipe_complete") {
			s.events=s.apl(s.events,"event40",",",2);
		}
		if (s.prop10 == "submit_photo_complete") {
			s.events=s.apl(s.events,"event41",",",2);
		}
		
		sniRole = mdManager.getParameterString("Role").toLowerCase();
		sniSweeps = mdManager.getParameterString("Sweepstakes").toLowerCase();
		if (s.prop46 && s.prop7 ) {
			s.prop47 = s.prop46 + "-" + s.prop7;
		}
		if (s.prop10 === "recipe") {
			s.events=s.apl(s.events,"event10",",",2);
			// note mdmanager always returns a string
			if ( mdManager.getParameter("TopRecipe") === "true" ) {
				s.events=s.apl(s.events,"event102",",",2);
			} else {
				s.events=s.events.replace(/,?event102/,'');	 
			}
			// recipe pages have embeds galleries remove event19 if this isn't a photo view
			s.events=s.events.replace(/,?event19(,|$)/,'$1');	 
			s.eVar1=origPN;
		} 
		if (s.prop39 === "article_photo_gallery" || s.prop39 === "photogallery" || s.prop39 === "article_builder_photogallery" || s.prop39 === "photo_gallery") {
			s.events=s.apl(s.events,"event19",",",2);
		} 
		//may not apply on food sites?
		if (origPN.indexOf("#gallery") > -1) {
			s.events=s.apl(s.events,"event19",",",2);
			s.prop39="inline gallery";
		} else if (origPN.indexOf("#video") > -1) {
			s.prop39="inline video";
		}
		if (sniRole === "package") {
			s.events=s.apl(s.events,"event18",",",2);
		}
		if (sniSweeps === "sweepsthankyou") {
			s.events=s.apl(s.events,"event34",",",2);
		}
		if (s.prop10 === "recipe-print" || s.prop10 === "recipe_print") {
			s.events=s.apl(s.events,"event11",",",2);
		}
		sni_aa.hubhier = mdManager.getParameterString("HubHierarchy").toLowerCase();
	}

	//FOOD Category
	s.prop52 = sni_aa.event;  //not yet available on food sites; perhaps key off sponsorship, url, or other to determine event.
	s.prop53 = sni_aa.site;
	s.prop54 = sni_aa.site + ":" + s.channel;
	s.prop55 = sni_aa.site + ":" + s.channel + ":" + s.prop5;
	if ( s.prop7 ) {
		s.prop56 = sni_aa.site + ":" + s.prop7;
	} else {
		s.prop56 = "";
	}
	s.prop57 = sni_aa.site + ":" + s.prop6;
	//Campaign
	s.eVar3 = s.Util.getQueryParam('xp');
	s.eVar11 = s.Util.getQueryParam('c1');
	s.eVar12 = s.Util.getQueryParam('c2');
	s.eVar13 = s.Util.getQueryParam('c3');
	s.eVar14 = s.Util.getQueryParam('c4');

	s.eVar2=s.Util.getQueryParam('nl');
	if (s.eVar2 === "") {
		s.eVar2=s.Util.getQueryParam('sni_mid');
	}
	s.eVar37=s.Util.getQueryParam('oc');
	s.eVar38=s.Util.getQueryParam('vty');
	s.eVar69=s.Util.getQueryParam('ic1');

	if (location.search.indexOf("ic1=") > -1 ) {
		s.campaign="internal: " + s.Util.getQueryParam('ic1');
	} else if (location.search.indexOf("c1=") > -1 ) {
		s.campaign=s.Util.getQueryParam('c1');
	} else if (location.search.indexOf("soc=") > -1 ) {
		s.campaign=s.Util.getQueryParam('soc');
	} else if (location.search.indexOf("syc=") > -1 ) {
		s.campaign="syc: " + s.Util.getQueryParam('syc');
	} else if (location.search.indexOf("vpid=") > -1 ) {
		s.campaign="vpid: " + s.Util.getQueryParam('vpid');
	} else if (location.search.indexOf("nl=") > -1 ) {
		s.campaign="nl: " + s.Util.getQueryParam('nl');
	} else if (location.search.indexOf("sni_mid=") > -1 ) {
		s.campaign="nl: " + s.Util.getQueryParam('sni_mid');
	} else if (location.search.indexOf("oc=") > -1 ) {
		s.campaign="oc: " + s.Util.getQueryParam('oc');
	} else if (location.search.indexOf("vty=") > -1 ) {
		s.campaign="vty: " + s.Util.getQueryParam('vty');
	}
	
	/* Get New and Repeat Visitor Information */
	s.prop13=s.getNewRepeat();
	
	s.server="D=User-Agent";
	s.prop28="D=g";

	/* TimeParting Code into One Variable (need to classify) */
	omniHour=s.getTimeParting('h','-5');
	omniDay=s.getTimeParting('d','-5');
	lenOH=omniHour.length;
	switch(lenOH) {
		case 6:
			if (omniHour.indexOf(":30") == -1) {
				aHour=omniHour.substring(0,1) + omniHour.substring(4,5);
			}  else {
				aHour=omniHour.substring(0,1) + ".5" + omniHour.substring(4,5);
			}
		break;
		case 7:
			if (omniHour.indexOf(":30") == -1) {
				aHour=omniHour.substring(0,2) + omniHour.substring(5,6);
			} else {
				aHour=omniHour.substring(0,2) + ".5" + omniHour.substring(5,6);
			}
		break;
		default:
			aHour=omniHour;
		break;
	}
	aDay=omniDay.substring(0,3);
	s.prop33=aDay + "-" + aHour;

	/*Previous Page*/
	s.prop35=s.getPreviousValue(s.prop10 + "|" + s.pageName,'gpv_pn');
	if (s.prop35.length > 100){
		s.prop35=s.prop35.substring(0,100);
	}
	//Removed getPercentPageViewed since it's non-sensical combined with infinite scroll
	
		//Capture email user id (v63) and email list id (v64)
	if (location.search.indexOf("c32=") !== -1 && location.search.indexOf("bid=") !== -1) {
		s.eVar63 = s.Util.getQueryParam('c32');
		s.eVar64 = s.Util.getQueryParam('bid');
		if ( location.search.indexOf("ssid=") !== -1 ) {
			s.eVar2 = s.eVar2 ?  s.eVar2 + "|" +  s.Util.getQueryParam('ssid') : "na|" +  s.Util.getQueryParam('ssid');
		}
		s.eVar36 = "u";
		if ( location.search.indexOf("sni_by=") !== -1 ){
			s.eVar36 = s.Util.getQueryParam("sni_by");
		}
		if ( typeof s.Util.getQueryParam("sni_gn") === "string" && s.Util.getQueryParam("sni_gn").match(/^m/i) ){
			s.eVar36 += "|m|na";
		} else if ( typeof s.Util.getQueryParam("sni_gn") === "string" && s.Util.getQueryParam("sni_gn").match(/^f/i) ){
			s.eVar36 += "|f|na";
		} else if ( s.eVar36 !== "u" ) {
			s.eVar36 += "|u|na";
		}
		if ( s.eVar36 === "u" ) {
			s.eVar36 = "";		
		}
	}

	s.prop67 = s.cleanOrigPubDate();
	s.eVar76 = s.get_perf_stats();
	
	// Set ingredients into products
	s.products = mdManager.getParameterString('ingredients');
	// Track from localstorage
	s.trackModLocalStorage();
	//Capture Ad Impressions/IDs 
  s.list1 = "";
  if ( typeof SNI.Analytics === "object" && typeof SNI.Analytics.sValues === "object" ) {
	s.list1 = SNI.Analytics.sValues.list1;
	if ( SNI.Analytics.sValues.event101 ) {
		s.events=s.apl(s.events,"event101",",",2);	
		s.eVar77 = SNI.Analytics.sValues.eVar77;
		SNI.Analytics.sValues.event101 = "";
		SNI.Analytics.sValues.eVar77 = "";
	} 
    SNI.Analytics.sValues.list1 = "";
  }
  s.list2 = sni_aa.getCookie("aam_fw") || "";
  if ( s.list2.indexOf('aam=') !== -1) {
		s.list2 = s.list2.split(";",12).join(",").replace(/aam=/gi,"");
  } else {
		s.list2 = "";
  }
  s.track_ls_analytics();
  _satellite.notify("EXIT s_doPlugins",1);
};

/************************** PLUGINS SECTION *************************/
s.get_perf_stats = function s_get_perf_stats() {
	var timing, t_array;
	if (  typeof window.performance === "object" && typeof window.performance.timing === "object" && ( sni_aa.pageSuffix === "" ||  sni_aa.pageSuffix.indexOf("|D") > -1 ) ) {
		timing = window.performance.timing;
		t_array = [
			Math.round((timing.domainLookupEnd - timing.domainLookupStart)/100)*100, //dns
			Math.round((timing.connectEnd - timing.connectStart)/100)*100, //connection
			Math.round((timing.responseStart - timing.connectEnd)/100)*100, //ttfb
			Math.round((timing.responseEnd - timing.responseStart)/100)*100, //base page loaded
			timing.domContentLoadedEventStart ? Math.round((timing.domContentLoadedEventStart - timing.responseEnd)/100)*100 : -1, // dom content loading
			timing.domContentLoadedEventEnd ? Math.round((timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart)/100)*100 : -1, // dom content loaded event
			timing.loadEventStart ? Math.round((timing.loadEventStart - timing.domContentLoadedEventEnd)/100)*100 : -1, // dom complete
			timing.loadEventEnd ? Math.round((timing.loadEventEnd - timing.loadEventStart)/100)*100 : -1, // load event
		];
		return t_array.join("|");
	} else {
		return "";
	}
}

s.cleanOrigPubDate = function s_cleanOrigPubDate() {
	var opd = mdManager.getParameterString("OrigPubDate"),
	opd_array = [];
	if ( opd && typeof opd === "string") {
		opd_array = opd.match(/\d\d\d\d-\d\d-\d\d/g);
	} 
	return opd_array ? opd_array.join("|") : "";	
}

// Plug in to handle multiple optimizely tests
s.sc_integrate_optly_tests = function s_sc_integrate_optly_tests(e) {
    if ("undefined" != typeof window.optimizely) {
        var allTests = window.optimizely.allExperiments,
            charCount = 0, // Used to make sure we stay in the 255 character limit
            s = s_gi(s_account),
            variationMap = window.optimizely.variationMap,
            variationMapActive = []; // Leave behind only tests that are still active
         
        for (var testId in variationMap) {
            if (variationMap.hasOwnProperty(testId)) {
                var mapImage = [],
                    mapImageString = "",
                    mapPair = "",
                    testDefined = false,
                    testEnabled = false;
                 
                testDefined = allTests.hasOwnProperty(testId);
                testEnabled = testDefined && allTests[testId].hasOwnProperty("enabled");
             
                if (testEnabled) {
                    if ("object" == typeof variationMap[testId]) {
                        mapImage = variationMap[testId];
                    } else {
                        mapImage.push(variationMap[testId]);
                    }
                 
                    mapImageString = mapImage.join("_");
                    mapPair = testId + ":" + mapImageString;
                 
                    if ((charCount + mapPair.length) <= 255) {
                        charCount += mapPair.length;
                        variationMapActive.push(mapPair);
                    }
                }
            }          
        }
        s["eVar" + e] = variationMapActive.join();
    }
};

// Update the PageTitle and UniqueID based on the pn param or the slideshow image number
s.incrementPage = function() {
	if ( mdManager.getParameterString("Type").toLowerCase() === "slideshow" ) {
			if ( sni_aa.pageSuffix || ( mdManager.getParameterString("recipeSifter") && mdManager.getParameterString("recipeSifter").indexOf("slide_key") !== -1 )) {
				sni_aa.pageSuffix = sni_aa.pageSuffix ? "|I" : "|DI";
				sni_aa.pageSuffix += document.location.href.match(/\d+$/);
			} else {
				sni_aa.pageSuffix = "|DI1";	
			}
 	 	} else {
			if ( !sni_aa.startPage ) {
				sni_aa.startPage = s.Util.getQueryParam('pn') || 1;
				sni_aa.currentPage = s.Util.getQueryParam('pn') || 1;
			} else {
				sni_aa.currentPage++;
			}
			sni_aa.pageSuffix = ( sni_aa.currentPage === sni_aa.startPage ? "|D" : "|S" ) + sni_aa.currentPage; 
  	}
};

s.incrementPage();

s.track_ls_analytics = function s_track_ls_analytics() {
	var varKeys, lsAnalytics, i;
	try {
		_satellite.notify("TRACKLSANALYTICS:" + localStorage.getItem("TRACKLSANALYTICS"));
		if ( lsAnalytics = JSON.parse(localStorage.getItem("TRACKLSANALYTICS")) ) {
			varKeys = typeof lsAnalytics === "object" && Object.keys(lsAnalytics).sort();
			i = varKeys.length || 0;
			while (i--) {
				if ( varKeys[i] === "events" ) {
					s[varKeys[i]] = s[varKeys[i]] ? s[varKeys[i]] + "," + lsAnalytics[varKeys[i]] : lsAnalytics[varKeys[i]];
				} else {
					s[varKeys[i]] = lsAnalytics[varKeys[i]];
				}
			}
			varKeys = typeof lsAnalytics.contextData === "object" && Object.keys(lsAnalytics.contextData).sort(),
			i = varKeys.length || 0;
			while (i--) {
				s.contextData[varKeys[i]] = lsAnalytics.contextData[varKeys[i]];
			}
		}
		// code to clear TRACKLSANALYTICS should be in the Integrate code to fire after pageview
	}
	catch(e){
		// couldn't read localstorage
	}
}
s.trackModLocalStorage = function() {
	var trackLS;
	// Track from localstorage
	try {
		trackLS = localStorage.getItem("TRACKMOD");
	}
	catch(e){
		//console.log("couldn't read localStorage");
	}
	_satellite.notify("TRACKMOD:" + localStorage.getItem("TRACKMOD"));
	if(trackLS) {
		trackLS = JSON.parse(trackLS);  
		contextVars = Object.keys(trackLS).sort(), i = contextVars.length || 0;
		while (i--) {
			s.contextData[contextVars[i]] = trackLS[contextVars[i]].toString().replace("|","");
		}
		s.events=s.apl(s.events,"event24",",",2);
		return true;
	}
	return false;
};	

/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * Plugin Utility: Replace v1.0
 */
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/*
 * Plugin Utility: apl v1.1
 */
s.apl=new Function("L","v","d","u",""
+"var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)L=L?L+d+v:v;return L");


/*
 * Plugin: getTimeParting 2.0 
 */
s.getTimeParting=new Function("t","z","y","l",""
+"var s=this,d,A,U,X,Z,W,B,C,D,Y;d=new Date();A=d.getFullYear();Y=U=S"
+"tring(A);if(s.dstStart&&s.dstEnd){B=s.dstStart;C=s.dstEnd}else{;U=U"
+".substring(2,4);X='090801|101407|111306|121104|131003|140902|150801"
+"|161306|171205|181104|191003';X=s.split(X,'|');for(W=0;W<=10;W++){Z"
+"=X[W].substring(0,2);if(U==Z){B=X[W].substring(2,4);C=X[W].substrin"
+"g(4,6)}}if(!B||!C){B='08';C='01'}B='03/'+B+'/'+A;C='11/'+C+'/'+A;}D"
+"=new Date('1/1/2000');if(D.getDay()!=6||D.getMonth()!=0){return'Dat"
+"a Not Available'}else{z=z?z:'0';z=parseFloat(z);B=new Date(B);C=new"
+" Date(C);W=new Date();if(W>B&&W<C&&l!='0'){z=z+1}W=W.getTime()+(W.g"
+"etTimezoneOffset()*60000);W=new Date(W+(3600000*z));X=['Sunday','Mo"
+"nday','Tuesday','Wednesday','Thursday','Friday','Saturday'];B=W.get"
+"Hours();C=W.getMinutes();D=W.getDay();Z=X[D];U='AM';A='Weekday';X='"
+"00';if(C>30){X='30'}if(B>=12){U='PM';B=B-12};if(B==0){B=12};if(D==6"
+"||D==0){A='Weekend'}W=B+':'+X+U;if(y&&y!=Y){return'Data Not Availab"
+"le'}else{if(t){if(t=='h'){return W}if(t=='d'){return Z}if(t=='w'){r"
+"eturn A}}else{return Z+', '+W}}}");

/*
 * Plugin: getNewRepeat 1.0 - Return whether user is new or repeat
 */
s.getNewRepeat=new Function(""
+"var s=this,e=new Date(),cval,ct=e.getTime(),y=e.getYear();e.setTime"
+"(ct+30*24*60*60*1000);cval=s.c_r('s_nr');if(cval.length==0){s.c_w("
+"'s_nr',ct,e);return 'New';}if(cval.length!=0&&ct-cval<30*60*1000){s"
+".c_w('s_nr',ct,e);return 'New';}if(cval<1123916400001){e.setTime(cv"
+"al+30*24*60*60*1000);s.c_w('s_nr',ct,e);return 'Repeat';}else retur"
+"n 'Repeat';");

/*
 * Plugin: getAndPersistValue 0.3 - get a value on every page
 */
s.getAndPersistValue=new Function("v","c","e",""
	+"var s=this,a=new Date;"
	+"e=e?e:0;"
	+"a.setTime(a.getTime()+e*86400000);"
	+"if(v)s.c_w(c,v,e?a:0);"
	+"return s.c_r(c);"
);

/*
 * Plugin: getValOnce 0.2 - get a value once per session or number of days
 */
s.getValOnce=new Function("v","c","e",""
+"var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime("
+")+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v");


/*
 * Plugin: getPreviousValue_v1.0 - return previous value of designated
 *   variable (requires split utility)
 */
s.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");

s.loadModule("Integrate");

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/

s.visitorNamespace="ewscripps";
if (sni_aa.site == "FOODCOM") {
	s.trackingServer="sa.food.com";
	s.trackingServerSecure="ssa.food.com";
} else {
	s.trackingServer = "ewscripps.112.2o7.net";
}

//******************************
//******************************
// MEDIA MODULE SUPPORT 
//******************************

s.loadModule("Media")
s.Media.initializedNLVID = {};
s.Media.autoTrack=false;
s.Media.trackWhilePlaying=true;
s.Media.segmentByMilestones=true;
s.Media.trackUsingContextData=true;
s.Media.completeByCloseOffset=true;
s.Media.completeCloseOffsetThreshold=1;
s.Media.adSegmentByMilestones=true;
s.Media.trackMilestones="50,90";
s.Media.trackVars="events,channel,pagename,server,prop1,prop2,prop3,prop4,prop5,prop6,prop7,prop8,prop9,prop10,prop11,prop12,prop13,prop19,prop20,prop21,prop22,prop23,prop24,prop25,prop26,prop27,prop28,prop29,prop30,prop31,prop32,prop33,prop34,prop35,prop36,prop37,prop38,prop39,prop40,prop41,prop42,prop43,prop44,prop45,prop46,prop47,prop48,prop49,prop50,prop51,prop52,prop53,prop54,prop55,prop56,prop57,prop58,prop59,prop60,prop61,prop62,prop63,prop64,prop65,prop66,prop67,prop68,prop69,prop70,prop71,prop72,prop73,prop74,prop75,eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,eVar7,eVar8,eVar9,eVar10,eVar11,eVar12,eVar13,eVar14,eVar15,eVar20,eVar21,eVar22,eVar23,eVar24,eVar25,eVar26,eVar27,eVar28,eVar29,eVar30,eVar31,eVar32,eVar33,eVar34,eVar35,eVar36,eVar37,eVar38,eVar39,eVar40,eVar41,eVar42,eVar43,eVar44,eVar45,eVar46,eVar47,eVar48,eVar49,eVar50,eVar51,eVar52,eVar53,eVar54,eVar55,eVar56,eVar57,eVar58,eVar59,eVar60,eVar61,eVar62,eVar63,eVar64,eVar65,eVar66,eVar67,eVar68,eVar69,eVar70,eVar71,eVar72,eVar73,eVar74,eVar75,list1,contextData.VideoEvent";


s.Media.contextDataMapping={
	"a.media.name":"eVar22,prop37",
	"a.contentType":"eVar73",
	"a.media.timePlayed":"event87",
	"a.media.segment":"eVar74",
	"a.media.view":"event5",
	"a.media.complete":"event9",
	"a.media.segmentView":"event50",
	"a.media.ad.name":"eVar15,prop73",
	"a.media.ad.timePlayed":"event88",
	"a.media.ad.view":"event3",
	"a.media.ad.complete":"event4",
	"a.media.milestones":{
		50:"event7",
		90:"event8"
	}
};

s.Media.monitor=function (s,media) {
	if ((media.event == "OPEN") && (media.eventFirstTime)) {
		s.Media.trackEvents="event2,event3,event4,event5,event6,event7,event8,event9,event50,event53,event68,event69,event80,event87,event88,event89";
		s.eVar21=mdManager.getParameterString("videoPlayerType");
		s.eVar23=mdManager.getParameterString("showTitle");
		s.eVar24=mdManager.getParameterString("videoPlayerName");
		s.eVar25=mdManager.getParameterString("videoChannelName");
		s.eVar27=mdManager.getParameterString("videoPublisherID");
		s.eVar28=mdManager.getParameterString("videoPlayType");
		s.eVar29=mdManager.getParameterString("videoNLVID");
		s.eVar30=mdManager.getParameterString("videoSCRID");
		s.eVar31=mdManager.getParameterString("videoCMSID");
		s.eVar33=mdManager.getParameterString("videoRunTime");
		s.eVar34=mdManager.getParameterString("videoScreenType");
		s.eVar35=mdManager.getParameterString("videoSponsor");
		
		videoEvents=mdManager.getParameterString("videoEvents");
		if (videoEvents.length > 0) {s.contextData["VideoEvent"] = videoEvents;}
		
		var videoPlaylistCount="";
		if(s.eVar73 != "videoAd") {
			videoPlaylistCount=mdManager.getParameterString("videoPlaylistCount");
			if(videoPlaylistCount != undefined && videoPlaylistCount !="" && videoPlaylistCount != "0") {
				s.events=s.events + ",event89=" + videoPlaylistCount;
				mdManager.setParameter("videoPlaylistCount", "");
			}
		}
		sendRequest();
		//clear videoEvent array and context variable
		if (videoEvents.length > 0) {
			mdManager.setParameter("videoEvents", "");
			s.contextData['VideoEvent'] = "";
		}
		
		//Nielsen Video Capture - on video content start
		var davImg = new Image();
		var ScImgSrc;
		var ScRandom = Math.ceil(Math.random()*1000000000);
        ScImgSrc = "http://secure-us.imrworldwide.com/cgi-bin/m?ci=us-200639";
		var enShowTitle = mdManager.getParameterString("showTitle");
		var enVideoTitle = mdManager.getParameterString("videoTitle");
		if (enShowTitle != "") {ScImgSrc += "&cg=" + enShowTitle;}
		else {ScImgSrc += "&cg=" + escape("No Show Title");}
		ScImgSrc += "&tl=dav0-" + enVideoTitle;
        //ScImgSrc += '&c3=st,a' + escape('StreamType');  //Use only if the video stream is an advertisement
        ScImgSrc += "&c6=vc,c16";  //VideoCensus ID - specified by Nielsen - varies per entity
        ScImgSrc += "&cc=1";  //Cookie Check (Always on)
        ScImgSrc += "&rnd=" + ScRandom;
        davImg = "";
        davImg = new Image();
        davImg.src = ScImgSrc;
		
		//comScore Video Capture - on video content start
		var csImg = new Image();
		var csImgSrc;
		csImgSrc = "http://b.scorecardresearch.com/p?c1=1&c2=6035648";
		csImgSrc += "&c3=" + s_account;
		if (enShowTitle != "") {csImgSrc += "&c4=" + enShowTitle;}
		else {csImgSrc += "&c4=" + escape("No Show Title");}
		//determine ad or content
		if(mdManager.getParameterString("videoAdTitle") != "") { //ad
			csImgSrc += "&c5=01&c10=01-01";
		}
		else {
			var runTime=mdManager.getParameterString("videoRunTime");
			runTime = Math.floor(parseFloat(runTime));
			var videoType = (runTime > 480) ? "03" : "02";  //3 longform; 2 shortform
			csImgSrc += "&c5=" + videoType + "&c10=01-01";
		}
        csImg = "";
		csImg = new Image();
		csImg.src = csImgSrc;
	}

	if (media.event == "MILESTONE") {
	s.Media.trackEvents="event2,event3,event4,event5,event6,event7,event8,event9,event50,event53,event68,event69,event80,event87,event88";
		s.eVar21=mdManager.getParameterString("videoPlayerType");
		s.eVar23=mdManager.getParameterString("showTitle");
		s.eVar24=mdManager.getParameterString("videoPlayerName");
		s.eVar25=mdManager.getParameterString("videoChannelName");
		s.eVar27=mdManager.getParameterString("videoPublisherID");
		s.eVar28=mdManager.getParameterString("videoPlayType");
		s.eVar29=mdManager.getParameterString("videoNLVID");
		s.eVar30=mdManager.getParameterString("videoSCRID");
		s.eVar31=mdManager.getParameterString("videoCMSID");
		s.eVar33=mdManager.getParameterString("videoRunTime");
		s.eVar34=mdManager.getParameterString("videoScreenType");
		s.eVar35=mdManager.getParameterString("videoSponsor");
		
		videoEvents=mdManager.getParameterString("videoEvents");
		if (videoEvents.length > 0) {s.contextData["VideoEvent"] = videoEvents;}
		sendRequest();
		//clear videoEvent array and context variable
		if (videoEvents.length > 0) {
			mdManager.setParameter("videoEvents", "");
			s.contextData['VideoEvent'] = "";
		}
	}

	if ((media.event=="CLOSE") && (media.eventFirstTime)) {
		s.eVar21=mdManager.getParameterString("videoPlayerType");
		s.eVar23=mdManager.getParameterString("showTitle");
		s.eVar24=mdManager.getParameterString("videoPlayerName");
		s.eVar25=mdManager.getParameterString("videoChannelName");
		s.eVar27=mdManager.getParameterString("videoPublisherID");
		s.eVar28=mdManager.getParameterString("videoPlayType");
		s.eVar29=mdManager.getParameterString("videoNLVID");
		s.eVar30=mdManager.getParameterString("videoSCRID");
		s.eVar31=mdManager.getParameterString("videoCMSID");
		s.eVar33=mdManager.getParameterString("videoRunTime");
		s.eVar34=mdManager.getParameterString("videoScreenType");
		s.eVar35=mdManager.getParameterString("videoSponsor");
	
		videoEvents=mdManager.getParameterString("videoEvents");
		if (videoEvents.length > 0) {s.contextData["VideoEvent"] = videoEvents;}
		sendRequest();
		//clear videoEvent array and context variable
		if (videoEvents.length > 0) {
			mdManager.setParameter("videoEvents", "");
			s.contextData['VideoEvent'] = "";
		}
		mdManager.setParameter("videoAdTitle", "");
		
		//Nielsen Video Capture - on video content complete
		var davImg = new Image();
		var ScImgSrc;
		var ScRandom = Math.ceil(Math.random()*1000000000);
        ScImgSrc = "http://secure-us.imrworldwide.com/cgi-bin/m?ci=us-200639";
		//var enShowTitle = escape(vpw._videoMeta.showTitle);
		//var enVideoTitle = escape(vpw._videoMeta.title);
		var enShowTitle = mdManager.getParameterString("showTitle");
		var enVideoTitle = mdManager.getParameterString("videoTitle");
		if (enShowTitle != "") {ScImgSrc += "&cg=" + enShowTitle;}
		else {ScImgSrc += "&cg=" + escape("No Show Title");}
		ScImgSrc += "&tl=dav2-" + enVideoTitle;
        //ScImgSrc += '&c3=st,a' + escape('StreamType');  //Use only if the video stream is an advertisement
        ScImgSrc += "&c6=vc,c16";   //VideoCensus ID - specified by Nielsen - varies per entity           
        ScImgSrc += "&cc=1";  //Cookie Check (Always on)
        ScImgSrc += "&rnd=" + ScRandom;
        davImg = "";
        davImg = new Image();
        davImg.src = ScImgSrc;
		//*****
	}
	
	if ((media.event == "OPENAD") && (media.eventFirstTime)) {
		s.Media.trackEvents="event2,event3,event4,event5,event6,event7,event8,event9,event50,event53,event68,event69,event80,event87,event88";
		s.eVar21=mdManager.getParameterString("videoPlayerType");
		s.eVar23=mdManager.getParameterString("showTitle");
		s.eVar24=mdManager.getParameterString("videoPlayerName");
		s.eVar25=mdManager.getParameterString("videoChannelName");
		s.eVar27=mdManager.getParameterString("videoPublisherID");
		s.eVar28=mdManager.getParameterString("videoPlayType");
		s.eVar29=mdManager.getParameterString("videoNLVID");
		s.eVar30=mdManager.getParameterString("videoSCRID");
		s.eVar31=mdManager.getParameterString("videoCMSID");
		s.eVar33=mdManager.getParameterString("videoRunTime");
		s.eVar34=mdManager.getParameterString("videoScreenType");
		s.eVar35=mdManager.getParameterString("videoSponsor");
		sendRequest();
		
		videoEvents=mdManager.getParameterString("videoEvents");
		if (videoEvents.length > 0) {s.contextData["VideoEvent"] = videoEvents;}
		//clear videoEvent array and context variable
		if (videoEvents.length > 0) {
			mdManager.setParameter("videoEvents", "");
			s.contextData['VideoEvent'] = "";
		}
	
	}
	
	function sendRequest(){
		if ( typeof s.Media.initializedNLVID === "object" && !s.Media.initializedNLVID[mdManager.getParameterString("videoNLVID")]) {
			s.Media.initializedNLVID[mdManager.getParameterString("videoNLVID")] = true;
			s.events=s.apl(s.events,"event80",",",2);
		}
		s.trackModLocalStorage();		
		s.Media.track(media.name);
		if ( typeof s.contextData.ModuleName === "string" ) {
			delete s.contextData.ModuleName;
			delete s.contextData.LinkTitle;
			delete s.contextData.LocUrl;
			delete s.contextData.LinkPosition;
			delete s.contextData.TargetUrl;
		}
		s.events="";
	}

}

/*
 ============== AppMeasurement_Module_Media DO NOT ALTER  ===============
 */
function AppMeasurement_Module_Media(q){var b=this;b.s=q;q=window;q.s_c_in||(q.s_c_il=[],q.s_c_in=0);b._il=q.s_c_il;b._in=q.s_c_in;b._il[b._in]=b;q.s_c_in++;b._c="s_m";b.list=[];b.open=function(d,c,e,k){var f={},a=new Date,l="",g;c||(c=-1);if(d&&e){b.list||(b.list={});b.list[d]&&b.close(d);k&&k.id&&(l=k.id);if(l)for(g in b.list)!Object.prototype[g]&&b.list[g]&&b.list[g].R==l&&b.close(b.list[g].name);f.name=d;f.length=c;f.offset=0;f.e=0;f.playerName=b.playerName?b.playerName:e;f.R=l;f.C=0;f.a=0;f.timestamp=
Math.floor(a.getTime()/1E3);f.k=0;f.u=f.timestamp;f.c=-1;f.n="";f.g=-1;f.D=0;f.I={};f.G=0;f.m=0;f.f="";f.B=0;f.L=0;f.A=0;f.F=0;f.l=!1;f.v="";f.J="";f.K=0;f.r=!1;f.H="";f.complete=0;f.Q=0;f.p=0;f.q=0;b.list[d]=f}};b.openAd=function(d,c,e,k,f,a,l,g){var h={};b.open(d,c,e,g);if(h=b.list[d])h.l=!0,h.v=k,h.J=f,h.K=a,h.H=l};b.M=function(d){var c=b.list[d];b.list[d]=0;c&&c.monitor&&clearTimeout(c.monitor.interval)};b.close=function(d){b.i(d,0,-1)};b.play=function(d,c,e,k){var f=b.i(d,1,c,e,k);f&&!f.monitor&&
(f.monitor={},f.monitor.update=function(){1==f.k&&b.i(f.name,3,-1);f.monitor.interval=setTimeout(f.monitor.update,1E3)},f.monitor.update())};b.click=function(d,c){b.i(d,7,c)};b.complete=function(d,c){b.i(d,5,c)};b.stop=function(d,c){b.i(d,2,c)};b.track=function(d){b.i(d,4,-1)};b.P=function(d,c){var e="a.media.",k=d.linkTrackVars,f=d.linkTrackEvents,a="m_i",l,g=d.contextData,h;c.l&&(e+="ad.",c.v&&(g["a.media.name"]=c.v,g[e+"pod"]=c.J,g[e+"podPosition"]=c.K),c.G||(g[e+"CPM"]=c.H));c.r&&(g[e+"clicked"]=
!0,c.r=!1);g["a.contentType"]="video"+(c.l?"Ad":"");g["a.media.channel"]=b.channel;g[e+"name"]=c.name;g[e+"playerName"]=c.playerName;0<c.length&&(g[e+"length"]=c.length);g[e+"timePlayed"]=Math.floor(c.a);0<Math.floor(c.a)&&(g[e+"timePlayed"]=Math.floor(c.a));c.G||(g[e+"view"]=!0,a="m_s",b.Heartbeat&&b.Heartbeat.enabled&&(a=c.l?b.__primetime?"mspa_s":"msa_s":b.__primetime?"msp_s":"ms_s"),c.G=1);c.f&&(g[e+"segmentNum"]=c.m,g[e+"segment"]=c.f,0<c.B&&(g[e+"segmentLength"]=c.B),c.A&&0<c.a&&(g[e+"segmentView"]=
!0));!c.Q&&c.complete&&(g[e+"complete"]=!0,c.S=1);0<c.p&&(g[e+"milestone"]=c.p);0<c.q&&(g[e+"offsetMilestone"]=c.q);if(k)for(h in g)Object.prototype[h]||(k+=",contextData."+h);l=g["a.contentType"];d.pe=a;d.pev3=l;var q,s;if(b.contextDataMapping)for(h in d.events2||(d.events2=""),k&&(k+=",events"),b.contextDataMapping)if(!Object.prototype[h]){a=h.length>e.length&&h.substring(0,e.length)==e?h.substring(e.length):"";l=b.contextDataMapping[h];if("string"==typeof l)for(q=l.split(","),s=0;s<q.length;s++)l=
q[s],"a.contentType"==h?(k&&(k+=","+l),d[l]=g[h]):"view"==a||"segmentView"==a||"clicked"==a||"complete"==a||"timePlayed"==a||"CPM"==a?(f&&(f+=","+l),"timePlayed"==a||"CPM"==a?g[h]&&(d.events2+=(d.events2?",":"")+l+"="+g[h]):g[h]&&(d.events2+=(d.events2?",":"")+l)):"segment"==a&&g[h+"Num"]?(k&&(k+=","+l),d[l]=g[h+"Num"]+":"+g[h]):(k&&(k+=","+l),d[l]=g[h]);else if("milestones"==a||"offsetMilestones"==a)h=h.substring(0,h.length-1),g[h]&&b.contextDataMapping[h+"s"][g[h]]&&(f&&(f+=","+b.contextDataMapping[h+
"s"][g[h]]),d.events2+=(d.events2?",":"")+b.contextDataMapping[h+"s"][g[h]]);g[h]&&(g[h]=0);"segment"==a&&g[h+"Num"]&&(g[h+"Num"]=0)}d.linkTrackVars=k;d.linkTrackEvents=f};b.i=function(d,c,e,k,f){var a={},l=(new Date).getTime()/1E3,g,h,q=b.trackVars,s=b.trackEvents,t=b.trackSeconds,u=b.trackMilestones,v=b.trackOffsetMilestones,w=b.segmentByMilestones,x=b.segmentByOffsetMilestones,p,n,r=1,m={},y;b.channel||(b.channel=b.s.w.location.hostname);if(a=d&&b.list&&b.list[d]?b.list[d]:0)if(a.l&&(t=b.adTrackSeconds,
u=b.adTrackMilestones,v=b.adTrackOffsetMilestones,w=b.adSegmentByMilestones,x=b.adSegmentByOffsetMilestones),0>e&&(e=1==a.k&&0<a.u?l-a.u+a.c:a.c),0<a.length&&(e=e<a.length?e:a.length),0>e&&(e=0),a.offset=e,0<a.length&&(a.e=a.offset/a.length*100,a.e=100<a.e?100:a.e),0>a.c&&(a.c=e),y=a.D,m.name=d,m.ad=a.l,m.length=a.length,m.openTime=new Date,m.openTime.setTime(1E3*a.timestamp),m.offset=a.offset,m.percent=a.e,m.playerName=a.playerName,m.mediaEvent=0>a.g?"OPEN":1==c?"PLAY":2==c?"STOP":3==c?"MONITOR":
4==c?"TRACK":5==c?"COMPLETE":7==c?"CLICK":"CLOSE",2<c||c!=a.k&&(2!=c||1==a.k)){f||(k=a.m,f=a.f);if(c){1==c&&(a.c=e);if((3>=c||5<=c)&&0<=a.g&&(r=!1,q=s="None",a.g!=e)){h=a.g;h>e&&(h=a.c,h>e&&(h=e));p=u?u.split(","):0;if(0<a.length&&p&&e>=h)for(n=0;n<p.length;n++)(g=p[n]?parseFloat(""+p[n]):0)&&h/a.length*100<g&&a.e>=g&&(r=!0,n=p.length,m.mediaEvent="MILESTONE",a.p=m.milestone=g);if((p=v?v.split(","):0)&&e>=h)for(n=0;n<p.length;n++)(g=p[n]?parseFloat(""+p[n]):0)&&h<g&&e>=g&&(r=!0,n=p.length,m.mediaEvent=
"OFFSET_MILESTONE",a.q=m.offsetMilestone=g)}if(a.L||!f){if(w&&u&&0<a.length){if(p=u.split(","))for(p.push("100"),n=h=0;n<p.length;n++)if(g=p[n]?parseFloat(""+p[n]):0)a.e<g&&(k=n+1,f="M:"+h+"-"+g,n=p.length),h=g}else if(x&&v&&(p=v.split(",")))for(p.push(""+(0<a.length?a.length:"E")),n=h=0;n<p.length;n++)if((g=p[n]?parseFloat(""+p[n]):0)||"E"==p[n]){if(e<g||"E"==p[n])k=n+1,f="O:"+h+"-"+g,n=p.length;h=g}f&&(a.L=!0)}(f||a.f)&&f!=a.f&&(a.F=!0,a.f||(a.m=k,a.f=f),0<=a.g&&(r=!0));(2<=c||100<=a.e)&&a.c<e&&
(a.C+=e-a.c,a.a+=e-a.c);if(2>=c||3==c&&!a.k)a.n+=(1==c||3==c?"S":"E")+Math.floor(e),a.k=3==c?1:c;!r&&0<=a.g&&3>=c&&(t=t?t:0)&&a.a>=t&&(r=!0,m.mediaEvent="SECONDS");a.u=l;a.c=e}if(!c||3>=c&&100<=a.e)2!=a.k&&(a.n+="E"+Math.floor(e)),c=0,q=s="None",m.mediaEvent="CLOSE";7==c&&(r=m.clicked=a.r=!0);if(5==c||b.completeByCloseOffset&&(!c||100<=a.e)&&0<a.length&&e>=a.length-b.completeCloseOffsetThreshold)r=m.complete=a.complete=!0;l=m.mediaEvent;"MILESTONE"==l?l+="_"+m.milestone:"OFFSET_MILESTONE"==l&&(l+=
"_"+m.offsetMilestone);a.I[l]?m.eventFirstTime=!1:(m.eventFirstTime=!0,a.I[l]=1);m.event=m.mediaEvent;m.timePlayed=a.C;m.segmentNum=a.m;m.segment=a.f;m.segmentLength=a.B;b.monitor&&4!=c&&b.monitor(b.s,m);b.Heartbeat&&b.Heartbeat.enabled&&0<=a.g&&(r=!1);0==c&&b.M(d);r&&a.D==y&&(d={contextData:{}},d.linkTrackVars=q,d.linkTrackEvents=s,d.linkTrackVars||(d.linkTrackVars=""),d.linkTrackEvents||(d.linkTrackEvents=""),b.P(d,a),d.linkTrackVars||(d["!linkTrackVars"]=1),d.linkTrackEvents||(d["!linkTrackEvents"]=
1),b.s.track(d),a.F?(a.m=k,a.f=f,a.A=!0,a.F=!1):0<a.a&&(a.A=!1),a.n="",a.p=a.q=0,a.a-=Math.floor(a.a),a.g=e,a.D++)}return a};b.O=function(d,c,e,k,f){var a=0;if(d&&(!b.autoTrackMediaLengthRequired||c&&0<c)){if(b.list&&b.list[d])a=1;else if(1==e||3==e)b.open(d,c,"HTML5 Video",f),a=1;a&&b.i(d,e,k,-1,0)}};b.attach=function(d){var c,e,k;d&&d.tagName&&"VIDEO"==d.tagName.toUpperCase()&&(b.o||(b.o=function(c,a,d){var e,h;b.autoTrack&&(e=c.currentSrc,(h=c.duration)||(h=-1),0>d&&(d=c.currentTime),b.O(e,h,a,
d,c))}),c=function(){b.o(d,1,-1)},e=function(){b.o(d,1,-1)},b.j(d,"play",c),b.j(d,"pause",e),b.j(d,"seeking",e),b.j(d,"seeked",c),b.j(d,"ended",function(){b.o(d,0,-1)}),b.j(d,"timeupdate",c),k=function(){d.paused||d.ended||d.seeking||b.o(d,3,-1);setTimeout(k,1E3)},k())};b.j=function(b,c,e){b.attachEvent?b.attachEvent("on"+c,e):b.addEventListener&&b.addEventListener(c,e,!1)};void 0==b.completeByCloseOffset&&(b.completeByCloseOffset=1);void 0==b.completeCloseOffsetThreshold&&(b.completeCloseOffsetThreshold=
1);b.Heartbeat={};b.N=function(){var d,c;if(b.autoTrack&&(d=b.s.d.getElementsByTagName("VIDEO")))for(c=0;c<d.length;c++)b.attach(d[c])};b.j(q,"load",b.N)}

/*
 ============== AppMeasurement_Module_Integrate DO NOT ALTER  ===============
 */
function AppMeasurement_Module_Integrate(l){var c=this;c.s=l;var e=window;e.s_c_in||(e.s_c_il=[],e.s_c_in=0);c._il=e.s_c_il;c._in=e.s_c_in;c._il[c._in]=c;e.s_c_in++;c._c="s_m";c.list=[];c.add=function(d,b){var a;b||(b="s_Integrate_"+d);e[b]||(e[b]={});a=c[d]=e[b];a.a=d;a.e=c;a._c=0;a._d=0;void 0==a.disable&&(a.disable=0);a.get=function(b,d){var f=document,h=f.getElementsByTagName("HEAD"),k;if(!a.disable&&(d||(v="s_"+c._in+"_Integrate_"+a.a+"_get_"+a._c),a._c++,a.VAR=v,a.CALLBACK="s_c_il["+c._in+"]."+
a.a+".callback",a.delay(),h=h&&0<h.length?h[0]:f.body))try{k=f.createElement("SCRIPT"),k.type="text/javascript",k.setAttribute("async","async"),k.src=c.c(a,b),0>b.indexOf("[CALLBACK]")&&(k.onload=k.onreadystatechange=function(){a.callback(e[v])}),h.firstChild?h.insertBefore(k,h.firstChild):h.appendChild(k)}catch(l){}};a.callback=function(b){var c;if(b)for(c in b)Object.prototype[c]||(a[c]=b[c]);a.ready()};a.beacon=function(b){var d="s_i_"+c._in+"_Integrate_"+a.a+"_"+a._c;a.disable||(a._c++,d=e[d]=
new Image,d.src=c.c(a,b))};a.script=function(b){a.get(b,1)};a.delay=function(){a._d++};a.ready=function(){a._d--;a.disable||l.delayReady()};c.list.push(d)};c._g=function(d){var b,a=(d?"use":"set")+"Vars";for(d=0;d<c.list.length;d++)if((b=c[c.list[d]])&&!b.disable&&b[a])try{b[a](l,b)}catch(e){}};c._t=function(){c._g(1)};c._d=function(){var d,b;for(d=0;d<c.list.length;d++)if((b=c[c.list[d]])&&!b.disable&&0<b._d)return 1;return 0};c.c=function(c,b){var a,e,g,f;"http"!=b.toLowerCase().substring(0,4)&&
(b="http://"+b);l.ssl&&(b=l.replace(b,"http:","https:"));c.RAND=Math.floor(1E13*Math.random());for(a=0;0<=a;)a=b.indexOf("[",a),0<=a&&(e=b.indexOf("]",a),e>a&&(g=b.substring(a+1,e),2<g.length&&"s."==g.substring(0,2)?(f=l[g.substring(2)])||(f=""):(f=""+c[g],f!=c[g]&&parseFloat(f)!=c[g]&&(g=0)),g&&(b=b.substring(0,a)+encodeURIComponent(f)+b.substring(e+1)),a=e));return b}}

/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

AppMeasurement for JavaScript version: 1.4.4
Copyright 1996-2015 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com
*/
function AppMeasurement(){var a=this;a.version="1.4.4";var k=window;k.s_c_in||(k.s_c_il=[],k.s_c_in=0);a._il=k.s_c_il;a._in=k.s_c_in;a._il[a._in]=a;k.s_c_in++;a._c="s_c";var q=k.yb;q||(q=null);var r=k,n,t;try{for(n=r.parent,t=r.location;n&&n.location&&t&&""+n.location!=""+t&&r.location&&""+n.location!=""+r.location&&n.location.host==t.host;)r=n,n=r.parent}catch(u){}a.nb=function(a){try{console.log(a)}catch(b){}};a.za=function(a){return""+parseInt(a)==""+a};a.replace=function(a,b,d){return!a||0>a.indexOf(b)?
a:a.split(b).join(d)};a.escape=function(c){var b,d;if(!c)return c;c=encodeURIComponent(c);for(b=0;7>b;b++)d="+~!*()'".substring(b,b+1),0<=c.indexOf(d)&&(c=a.replace(c,d,"%"+d.charCodeAt(0).toString(16).toUpperCase()));return c};a.unescape=function(c){if(!c)return c;c=0<=c.indexOf("+")?a.replace(c,"+"," "):c;try{return decodeURIComponent(c)}catch(b){}return unescape(c)};a.eb=function(){var c=k.location.hostname,b=a.fpCookieDomainPeriods,d;b||(b=a.cookieDomainPeriods);if(c&&!a.cookieDomain&&!/^[0-9.]+$/.test(c)&&
(b=b?parseInt(b):2,b=2<b?b:2,d=c.lastIndexOf("."),0<=d)){for(;0<=d&&1<b;)d=c.lastIndexOf(".",d-1),b--;a.cookieDomain=0<d?c.substring(d):c}return a.cookieDomain};a.c_r=a.cookieRead=function(c){c=a.escape(c);var b=" "+a.d.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);c=0>d?"":a.unescape(b.substring(d+2+c.length,0>f?b.length:f));return"[[B]]"!=c?c:""};a.c_w=a.cookieWrite=function(c,b,d){var f=a.eb(),e=a.cookieLifetime,g;b=""+b;e=e?(""+e).toUpperCase():"";d&&"SESSION"!=e&&"NONE"!=e&&((g=""!=
b?parseInt(e?e:0):-60)?(d=new Date,d.setTime(d.getTime()+1E3*g)):1==d&&(d=new Date,g=d.getYear(),d.setYear(g+5+(1900>g?1900:0))));return c&&"NONE"!=e?(a.d.cookie=c+"="+a.escape(""!=b?b:"[[B]]")+"; path=/;"+(d&&"SESSION"!=e?" expires="+d.toGMTString()+";":"")+(f?" domain="+f+";":""),a.cookieRead(c)==b):0};a.F=[];a.ba=function(c,b,d){if(a.ta)return 0;a.maxDelay||(a.maxDelay=250);var f=0,e=(new Date).getTime()+a.maxDelay,g=a.d.visibilityState,m=["webkitvisibilitychange","visibilitychange"];g||(g=a.d.webkitVisibilityState);
if(g&&"prerender"==g){if(!a.ca)for(a.ca=1,d=0;d<m.length;d++)a.d.addEventListener(m[d],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&(a.ca=0,a.delayReady())});f=1;e=0}else d||a.l("_d")&&(f=1);f&&(a.F.push({m:c,a:b,t:e}),a.ca||setTimeout(a.delayReady,a.maxDelay));return f};a.delayReady=function(){var c=(new Date).getTime(),b=0,d;for(a.l("_d")?b=1:a.na();0<a.F.length;){d=a.F.shift();if(b&&!d.t&&d.t>c){a.F.unshift(d);setTimeout(a.delayReady,parseInt(a.maxDelay/2));
break}a.ta=1;a[d.m].apply(a,d.a);a.ta=0}};a.setAccount=a.sa=function(c){var b,d;if(!a.ba("setAccount",arguments))if(a.account=c,a.allAccounts)for(b=a.allAccounts.concat(c.split(",")),a.allAccounts=[],b.sort(),d=0;d<b.length;d++)0!=d&&b[d-1]==b[d]||a.allAccounts.push(b[d]);else a.allAccounts=c.split(",")};a.foreachVar=function(c,b){var d,f,e,g,m="";e=f="";if(a.lightProfileID)d=a.J,(m=a.lightTrackVars)&&(m=","+m+","+a.ga.join(",")+",");else{d=a.c;if(a.pe||a.linkType)m=a.linkTrackVars,f=a.linkTrackEvents,
a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(m=a[e].xb,f=a[e].wb));m&&(m=","+m+","+a.A.join(",")+",");f&&m&&(m+=",events,")}b&&(b=","+b+",");for(f=0;f<d.length;f++)e=d[f],(g=a[e])&&(!m||0<=m.indexOf(","+e+","))&&(!b||0<=b.indexOf(","+e+","))&&c(e,g)};a.L=function(c,b,d,f,e){var g="",m,p,k,w,n=0;"contextData"==c&&(c="c");if(b){for(m in b)if(!(Object.prototype[m]||e&&m.substring(0,e.length)!=e)&&b[m]&&(!d||0<=d.indexOf(","+(f?f+".":"")+m+","))){k=!1;if(n)for(p=0;p<n.length;p++)m.substring(0,
n[p].length)==n[p]&&(k=!0);if(!k&&(""==g&&(g+="&"+c+"."),p=b[m],e&&(m=m.substring(e.length)),0<m.length))if(k=m.indexOf("."),0<k)p=m.substring(0,k),k=(e?e:"")+p+".",n||(n=[]),n.push(k),g+=a.L(p,b,d,f,k);else if("boolean"==typeof p&&(p=p?"true":"false"),p){if("retrieveLightData"==f&&0>e.indexOf(".contextData."))switch(k=m.substring(0,4),w=m.substring(4),m){case "transactionID":m="xact";break;case "channel":m="ch";break;case "campaign":m="v0";break;default:a.za(w)&&("prop"==k?m="c"+w:"eVar"==k?m="v"+
w:"list"==k?m="l"+w:"hier"==k&&(m="h"+w,p=p.substring(0,255)))}g+="&"+a.escape(m)+"="+a.escape(p)}}""!=g&&(g+="&."+c)}return g};a.gb=function(){var c="",b,d,f,e,g,m,p,k,n="",q="",r=d="";if(a.lightProfileID)b=a.J,(n=a.lightTrackVars)&&(n=","+n+","+a.ga.join(",")+",");else{b=a.c;if(a.pe||a.linkType)n=a.linkTrackVars,q=a.linkTrackEvents,a.pe&&(d=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[d]&&(n=a[d].xb,q=a[d].wb));n&&(n=","+n+","+a.A.join(",")+",");q&&(q=","+q+",",n&&(n+=",events,"));a.events2&&
(r+=(""!=r?",":"")+a.events2)}a.AudienceManagement&&a.AudienceManagement.isReady()&&(c+=a.L("d",a.AudienceManagement.getEventCallConfigParams()));for(d=0;d<b.length;d++){e=b[d];g=a[e];f=e.substring(0,4);m=e.substring(4);!g&&"events"==e&&r&&(g=r,r="");if(g&&(!n||0<=n.indexOf(","+e+","))){switch(e){case "supplementalDataID":e="sdid";break;case "timestamp":e="ts";break;case "dynamicVariablePrefix":e="D";break;case "visitorID":e="vid";break;case "marketingCloudVisitorID":e="mid";break;case "analyticsVisitorID":e=
"aid";break;case "audienceManagerLocationHint":e="aamlh";break;case "audienceManagerBlob":e="aamb";break;case "authState":e="as";break;case "pageURL":e="g";255<g.length&&(a.pageURLRest=g.substring(255),g=g.substring(0,255));break;case "pageURLRest":e="-g";break;case "referrer":e="r";break;case "vmk":case "visitorMigrationKey":e="vmt";break;case "visitorMigrationServer":e="vmf";a.ssl&&a.visitorMigrationServerSecure&&(g="");break;case "visitorMigrationServerSecure":e="vmf";!a.ssl&&a.visitorMigrationServer&&
(g="");break;case "charSet":e="ce";break;case "visitorNamespace":e="ns";break;case "cookieDomainPeriods":e="cdp";break;case "cookieLifetime":e="cl";break;case "variableProvider":e="vvp";break;case "currencyCode":e="cc";break;case "channel":e="ch";break;case "transactionID":e="xact";break;case "campaign":e="v0";break;case "latitude":e="lat";break;case "longitude":e="lon";break;case "resolution":e="s";break;case "colorDepth":e="c";break;case "javascriptVersion":e="j";break;case "javaEnabled":e="v";
break;case "cookiesEnabled":e="k";break;case "browserWidth":e="bw";break;case "browserHeight":e="bh";break;case "connectionType":e="ct";break;case "homepage":e="hp";break;case "events":r&&(g+=(""!=g?",":"")+r);if(q)for(m=g.split(","),g="",f=0;f<m.length;f++)p=m[f],k=p.indexOf("="),0<=k&&(p=p.substring(0,k)),k=p.indexOf(":"),0<=k&&(p=p.substring(0,k)),0<=q.indexOf(","+p+",")&&(g+=(g?",":"")+m[f]);break;case "events2":g="";break;case "contextData":c+=a.L("c",a[e],n,e);g="";break;case "lightProfileID":e=
"mtp";break;case "lightStoreForSeconds":e="mtss";a.lightProfileID||(g="");break;case "lightIncrementBy":e="mti";a.lightProfileID||(g="");break;case "retrieveLightProfiles":e="mtsr";break;case "deleteLightProfiles":e="mtsd";break;case "retrieveLightData":a.retrieveLightProfiles&&(c+=a.L("mts",a[e],n,e));g="";break;default:a.za(m)&&("prop"==f?e="c"+m:"eVar"==f?e="v"+m:"list"==f?e="l"+m:"hier"==f&&(e="h"+m,g=g.substring(0,255)))}g&&(c+="&"+e+"="+("pev"!=e.substring(0,3)?a.escape(g):g))}"pev3"==e&&a.e&&
(c+=a.e)}return c};a.u=function(a){var b=a.tagName;if("undefined"!=""+a.Bb||"undefined"!=""+a.rb&&"HTML"!=(""+a.rb).toUpperCase())return"";b=b&&b.toUpperCase?b.toUpperCase():"";"SHAPE"==b&&(b="");b&&(("INPUT"==b||"BUTTON"==b)&&a.type&&a.type.toUpperCase?b=a.type.toUpperCase():!b&&a.href&&(b="A"));return b};a.va=function(a){var b=a.href?a.href:"",d,f,e;d=b.indexOf(":");f=b.indexOf("?");e=b.indexOf("/");b&&(0>d||0<=f&&d>f||0<=e&&d>e)&&(f=a.protocol&&1<a.protocol.length?a.protocol:l.protocol?l.protocol:
"",d=l.pathname.lastIndexOf("/"),b=(f?f+"//":"")+(a.host?a.host:l.host?l.host:"")+("/"!=h.substring(0,1)?l.pathname.substring(0,0>d?0:d)+"/":"")+b);return b};a.G=function(c){var b=a.u(c),d,f,e="",g=0;return b&&(d=c.protocol,f=c.onclick,!c.href||"A"!=b&&"AREA"!=b||f&&d&&!(0>d.toLowerCase().indexOf("javascript"))?f?(e=a.replace(a.replace(a.replace(a.replace(""+f,"\r",""),"\n",""),"\t","")," ",""),g=2):"INPUT"==b||"SUBMIT"==b?(c.value?e=c.value:c.innerText?e=c.innerText:c.textContent&&(e=c.textContent),
g=3):c.src&&"IMAGE"==b&&(e=c.src):e=a.va(c),e)?{id:e.substring(0,100),type:g}:0};a.zb=function(c){for(var b=a.u(c),d=a.G(c);c&&!d&&"BODY"!=b;)if(c=c.parentElement?c.parentElement:c.parentNode)b=a.u(c),d=a.G(c);d&&"BODY"!=b||(c=0);c&&(b=c.onclick?""+c.onclick:"",0<=b.indexOf(".tl(")||0<=b.indexOf(".trackLink("))&&(c=0);return c};a.qb=function(){var c,b,d=a.linkObject,f=a.linkType,e=a.linkURL,g,m;a.ha=1;d||(a.ha=0,d=a.clickObject);if(d){c=a.u(d);for(b=a.G(d);d&&!b&&"BODY"!=c;)if(d=d.parentElement?d.parentElement:
d.parentNode)c=a.u(d),b=a.G(d);b&&"BODY"!=c||(d=0);if(d){var p=d.onclick?""+d.onclick:"";if(0<=p.indexOf(".tl(")||0<=p.indexOf(".trackLink("))d=0}}else a.ha=1;!e&&d&&(e=a.va(d));e&&!a.linkLeaveQueryString&&(g=e.indexOf("?"),0<=g&&(e=e.substring(0,g)));if(!f&&e){var n=0,q=0,r;if(a.trackDownloadLinks&&a.linkDownloadFileTypes)for(p=e.toLowerCase(),g=p.indexOf("?"),m=p.indexOf("#"),0<=g?0<=m&&m<g&&(g=m):g=m,0<=g&&(p=p.substring(0,g)),g=a.linkDownloadFileTypes.toLowerCase().split(","),m=0;m<g.length;m++)(r=
g[m])&&p.substring(p.length-(r.length+1))=="."+r&&(f="d");if(a.trackExternalLinks&&!f&&(p=e.toLowerCase(),a.ya(p)&&(a.linkInternalFilters||(a.linkInternalFilters=k.location.hostname),g=0,a.linkExternalFilters?(g=a.linkExternalFilters.toLowerCase().split(","),n=1):a.linkInternalFilters&&(g=a.linkInternalFilters.toLowerCase().split(",")),g))){for(m=0;m<g.length;m++)r=g[m],0<=p.indexOf(r)&&(q=1);q?n&&(f="e"):n||(f="e")}}a.linkObject=d;a.linkURL=e;a.linkType=f;if(a.trackClickMap||a.trackInlineStats)a.e=
"",d&&(f=a.pageName,e=1,d=d.sourceIndex,f||(f=a.pageURL,e=0),k.s_objectID&&(b.id=k.s_objectID,d=b.type=1),f&&b&&b.id&&c&&(a.e="&pid="+a.escape(f.substring(0,255))+(e?"&pidt="+e:"")+"&oid="+a.escape(b.id.substring(0,100))+(b.type?"&oidt="+b.type:"")+"&ot="+c+(d?"&oi="+d:"")))};a.hb=function(){var c=a.ha,b=a.linkType,d=a.linkURL,f=a.linkName;b&&(d||f)&&(b=b.toLowerCase(),"d"!=b&&"e"!=b&&(b="o"),a.pe="lnk_"+b,a.pev1=d?a.escape(d):"",a.pev2=f?a.escape(f):"",c=1);a.abort&&(c=0);if(a.trackClickMap||a.trackInlineStats){var b=
{},d=0,e=a.cookieRead("s_sq"),g=e?e.split("&"):0,m,p,k,e=0;if(g)for(m=0;m<g.length;m++)p=g[m].split("="),f=a.unescape(p[0]).split(","),p=a.unescape(p[1]),b[p]=f;f=a.account.split(",");if(c||a.e){c&&!a.e&&(e=1);for(p in b)if(!Object.prototype[p])for(m=0;m<f.length;m++)for(e&&(k=b[p].join(","),k==a.account&&(a.e+=("&"!=p.charAt(0)?"&":"")+p,b[p]=[],d=1)),g=0;g<b[p].length;g++)k=b[p][g],k==f[m]&&(e&&(a.e+="&u="+a.escape(k)+("&"!=p.charAt(0)?"&":"")+p+"&u=0"),b[p].splice(g,1),d=1);c||(d=1);if(d){e="";
m=2;!c&&a.e&&(e=a.escape(f.join(","))+"="+a.escape(a.e),m=1);for(p in b)!Object.prototype[p]&&0<m&&0<b[p].length&&(e+=(e?"&":"")+a.escape(b[p].join(","))+"="+a.escape(p),m--);a.cookieWrite("s_sq",e)}}}return c};a.ib=function(){if(!a.vb){var c=new Date,b=r.location,d,f,e=f=d="",g="",m="",k="1.2",n=a.cookieWrite("s_cc","true",0)?"Y":"N",q="",s="";if(c.setUTCDate&&(k="1.3",(0).toPrecision&&(k="1.5",c=[],c.forEach))){k="1.6";f=0;d={};try{f=new Iterator(d),f.next&&(k="1.7",c.reduce&&(k="1.8",k.trim&&(k=
"1.8.1",Date.parse&&(k="1.8.2",Object.create&&(k="1.8.5")))))}catch(t){}}d=screen.width+"x"+screen.height;e=navigator.javaEnabled()?"Y":"N";f=screen.pixelDepth?screen.pixelDepth:screen.colorDepth;g=a.w.innerWidth?a.w.innerWidth:a.d.documentElement.offsetWidth;m=a.w.innerHeight?a.w.innerHeight:a.d.documentElement.offsetHeight;try{a.b.addBehavior("#default#homePage"),q=a.b.Ab(b)?"Y":"N"}catch(u){}try{a.b.addBehavior("#default#clientCaps"),s=a.b.connectionType}catch(x){}a.resolution=d;a.colorDepth=f;
a.javascriptVersion=k;a.javaEnabled=e;a.cookiesEnabled=n;a.browserWidth=g;a.browserHeight=m;a.connectionType=s;a.homepage=q;a.vb=1}};a.K={};a.loadModule=function(c,b){var d=a.K[c];if(!d){d=k["AppMeasurement_Module_"+c]?new k["AppMeasurement_Module_"+c](a):{};a.K[c]=a[c]=d;d.Na=function(){return d.Ra};d.Sa=function(b){if(d.Ra=b)a[c+"_onLoad"]=b,a.ba(c+"_onLoad",[a,d],1)||b(a,d)};try{Object.defineProperty?Object.defineProperty(d,"onLoad",{get:d.Na,set:d.Sa}):d._olc=1}catch(f){d._olc=1}}b&&(a[c+"_onLoad"]=
b,a.ba(c+"_onLoad",[a,d],1)||b(a,d))};a.l=function(c){var b,d;for(b in a.K)if(!Object.prototype[b]&&(d=a.K[b])&&(d._olc&&d.onLoad&&(d._olc=0,d.onLoad(a,d)),d[c]&&d[c]()))return 1;return 0};a.lb=function(){var c=Math.floor(1E13*Math.random()),b=a.visitorSampling,d=a.visitorSamplingGroup,d="s_vsn_"+(a.visitorNamespace?a.visitorNamespace:a.account)+(d?"_"+d:""),f=a.cookieRead(d);if(b){f&&(f=parseInt(f));if(!f){if(!a.cookieWrite(d,c))return 0;f=c}if(f%1E4>v)return 0}return 1};a.M=function(c,b){var d,
f,e,g,m,k;for(d=0;2>d;d++)for(f=0<d?a.oa:a.c,e=0;e<f.length;e++)if(g=f[e],(m=c[g])||c["!"+g]){if(!b&&("contextData"==g||"retrieveLightData"==g)&&a[g])for(k in a[g])m[k]||(m[k]=a[g][k]);a[g]=m}};a.Ga=function(c,b){var d,f,e,g;for(d=0;2>d;d++)for(f=0<d?a.oa:a.c,e=0;e<f.length;e++)g=f[e],c[g]=a[g],b||c[g]||(c["!"+g]=1)};a.cb=function(a){var b,d,f,e,g,m=0,k,n="",q="";if(a&&255<a.length&&(b=""+a,d=b.indexOf("?"),0<d&&(k=b.substring(d+1),b=b.substring(0,d),e=b.toLowerCase(),f=0,"http://"==e.substring(0,
7)?f+=7:"https://"==e.substring(0,8)&&(f+=8),d=e.indexOf("/",f),0<d&&(e=e.substring(f,d),g=b.substring(d),b=b.substring(0,d),0<=e.indexOf("google")?m=",q,ie,start,search_key,word,kw,cd,":0<=e.indexOf("yahoo.co")&&(m=",p,ei,"),m&&k)))){if((a=k.split("&"))&&1<a.length){for(f=0;f<a.length;f++)e=a[f],d=e.indexOf("="),0<d&&0<=m.indexOf(","+e.substring(0,d)+",")?n+=(n?"&":"")+e:q+=(q?"&":"")+e;n&&q?k=n+"&"+q:q=""}d=253-(k.length-q.length)-b.length;a=b+(0<d?g.substring(0,d):"")+"?"+k}return a};a.Ma=function(c){var b=
a.d.visibilityState,d=["webkitvisibilitychange","visibilitychange"];b||(b=a.d.webkitVisibilityState);if(b&&"prerender"==b){if(c)for(b=0;b<d.length;b++)a.d.addEventListener(d[b],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&c()});return!1}return!0};a.Y=!1;a.C=!1;a.Ta=function(){a.C=!0;a.i()};a.W=!1;a.Q=!1;a.Qa=function(c){a.marketingCloudVisitorID=c;a.Q=!0;a.i()};a.T=!1;a.N=!1;a.Ia=function(c){a.analyticsVisitorID=c;a.N=!0;a.i()};a.V=!1;a.P=!1;a.Ka=function(c){a.audienceManagerLocationHint=
c;a.P=!0;a.i()};a.U=!1;a.O=!1;a.Ja=function(c){a.audienceManagerBlob=c;a.O=!0;a.i()};a.La=function(c){a.maxDelay||(a.maxDelay=250);return a.l("_d")?(c&&setTimeout(function(){c()},a.maxDelay),!1):!0};a.X=!1;a.B=!1;a.na=function(){a.B=!0;a.i()};a.isReadyToTrack=function(){var c=!0,b=a.visitor;a.Y||a.C||(a.Ma(a.Ta)?a.C=!0:a.Y=!0);if(a.Y&&!a.C)return!1;b&&b.isAllowed()&&(a.W||a.marketingCloudVisitorID||!b.getMarketingCloudVisitorID||(a.W=!0,a.marketingCloudVisitorID=b.getMarketingCloudVisitorID([a,a.Qa]),
a.marketingCloudVisitorID&&(a.Q=!0)),a.T||a.analyticsVisitorID||!b.getAnalyticsVisitorID||(a.T=!0,a.analyticsVisitorID=b.getAnalyticsVisitorID([a,a.Ia]),a.analyticsVisitorID&&(a.N=!0)),a.V||a.audienceManagerLocationHint||!b.getAudienceManagerLocationHint||(a.V=!0,a.audienceManagerLocationHint=b.getAudienceManagerLocationHint([a,a.Ka]),a.audienceManagerLocationHint&&(a.P=!0)),a.U||a.audienceManagerBlob||!b.getAudienceManagerBlob||(a.U=!0,a.audienceManagerBlob=b.getAudienceManagerBlob([a,a.Ja]),a.audienceManagerBlob&&
(a.O=!0)),a.W&&!a.Q&&!a.marketingCloudVisitorID||a.T&&!a.N&&!a.analyticsVisitorID||a.V&&!a.P&&!a.audienceManagerLocationHint||a.U&&!a.O&&!a.audienceManagerBlob)&&(c=!1);a.X||a.B||(a.La(a.na)?a.B=!0:a.X=!0);a.X&&!a.B&&(c=!1);return c};a.k=q;a.o=0;a.callbackWhenReadyToTrack=function(c,b,d){var f;f={};f.Xa=c;f.Wa=b;f.Ua=d;a.k==q&&(a.k=[]);a.k.push(f);0==a.o&&(a.o=setInterval(a.i,100))};a.i=function(){var c;if(a.isReadyToTrack()&&(a.o&&(clearInterval(a.o),a.o=0),a.k!=q))for(;0<a.k.length;)c=a.k.shift(),
c.Wa.apply(c.Xa,c.Ua)};a.Oa=function(c){var b,d,f=q,e=q;if(!a.isReadyToTrack()){b=[];if(c!=q)for(d in f={},c)f[d]=c[d];e={};a.Ga(e,!0);b.push(f);b.push(e);a.callbackWhenReadyToTrack(a,a.track,b);return!0}return!1};a.fb=function(){var c=a.cookieRead("s_fid"),b="",d="",f;f=8;var e=4;if(!c||0>c.indexOf("-")){for(c=0;16>c;c++)f=Math.floor(Math.random()*f),b+="0123456789ABCDEF".substring(f,f+1),f=Math.floor(Math.random()*e),d+="0123456789ABCDEF".substring(f,f+1),f=e=16;c=b+"-"+d}a.cookieWrite("s_fid",
c,1)||(c=0);return c};a.t=a.track=function(c,b){var d,f=new Date,e="s"+Math.floor(f.getTime()/108E5)%10+Math.floor(1E13*Math.random()),g=f.getYear(),g="t="+a.escape(f.getDate()+"/"+f.getMonth()+"/"+(1900>g?g+1900:g)+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+" "+f.getDay()+" "+f.getTimezoneOffset());a.visitor&&(a.visitor.getAuthState&&(a.authState=a.visitor.getAuthState()),!a.supplementalDataID&&a.visitor.getSupplementalDataID&&(a.supplementalDataID=a.visitor.getSupplementalDataID("AppMeasurement:"+
a._in,a.expectSupplementalData?!1:!0)));a.l("_s");a.Oa(c)||(b&&a.M(b),c&&(d={},a.Ga(d,0),a.M(c)),a.lb()&&(a.analyticsVisitorID||a.marketingCloudVisitorID||(a.fid=a.fb()),a.qb(),a.usePlugins&&a.doPlugins&&a.doPlugins(a),a.account&&(a.abort||(a.trackOffline&&!a.timestamp&&(a.timestamp=Math.floor(f.getTime()/1E3)),f=k.location,a.pageURL||(a.pageURL=f.href?f.href:f),a.referrer||a.Ha||(a.referrer=r.document.referrer),a.Ha=1,a.referrer=a.cb(a.referrer),a.l("_g")),a.hb()&&!a.abort&&(a.ib(),g+=a.gb(),a.pb(e,
g),a.l("_t"),a.referrer=""))),c&&a.M(d,1));a.abort=a.supplementalDataID=a.timestamp=a.pageURLRest=a.linkObject=a.clickObject=a.linkURL=a.linkName=a.linkType=k.s_objectID=a.pe=a.pev1=a.pev2=a.pev3=a.e=a.lightProfileID=0};a.tl=a.trackLink=function(c,b,d,f,e){a.linkObject=c;a.linkType=b;a.linkName=d;e&&(a.j=c,a.q=e);return a.track(f)};a.trackLight=function(c,b,d,f){a.lightProfileID=c;a.lightStoreForSeconds=b;a.lightIncrementBy=d;return a.track(f)};a.clearVars=function(){var c,b;for(c=0;c<a.c.length;c++)if(b=
a.c[c],"prop"==b.substring(0,4)||"eVar"==b.substring(0,4)||"hier"==b.substring(0,4)||"list"==b.substring(0,4)||"channel"==b||"events"==b||"eventList"==b||"products"==b||"productList"==b||"purchaseID"==b||"transactionID"==b||"state"==b||"zip"==b||"campaign"==b)a[b]=void 0};a.tagContainerMarker="";a.pb=function(c,b){var d,f=a.trackingServer;d="";var e=a.dc,g="sc.",k=a.visitorNamespace;f?a.trackingServerSecure&&a.ssl&&(f=a.trackingServerSecure):(k||(k=a.account,f=k.indexOf(","),0<=f&&(k=k.substring(0,
f)),k=k.replace(/[^A-Za-z0-9]/g,"")),d||(d="2o7.net"),e=e?(""+e).toLowerCase():"d1","2o7.net"==d&&("d1"==e?e="112":"d2"==e&&(e="122"),g=""),f=k+"."+e+"."+g+d);d=a.ssl?"https://":"http://";e=a.AudienceManagement&&a.AudienceManagement.isReady();d+=f+"/b/ss/"+a.account+"/"+(a.mobile?"5.":"")+(e?"10":"1")+"/JS-"+a.version+(a.ub?"T":"")+(a.tagContainerMarker?"-"+a.tagContainerMarker:"")+"/"+c+"?AQB=1&ndh=1&pf=1&"+(e?"callback=s_c_il["+a._in+"].AudienceManagement.passData&":"")+b+"&AQE=1";a.ab(d);a.da()};
a.ab=function(c){a.g||a.jb();a.g.push(c);a.fa=a.r();a.Fa()};a.jb=function(){a.g=a.mb();a.g||(a.g=[])};a.mb=function(){var c,b;if(a.ka()){try{(b=k.localStorage.getItem(a.ia()))&&(c=k.JSON.parse(b))}catch(d){}return c}};a.ka=function(){var c=!0;a.trackOffline&&a.offlineFilename&&k.localStorage&&k.JSON||(c=!1);return c};a.wa=function(){var c=0;a.g&&(c=a.g.length);a.v&&c++;return c};a.da=function(){if(!a.v)if(a.xa=q,a.ja)a.fa>a.I&&a.Da(a.g),a.ma(500);else{var c=a.Va();if(0<c)a.ma(c);else if(c=a.ua())a.v=
1,a.ob(c),a.sb(c)}};a.ma=function(c){a.xa||(c||(c=0),a.xa=setTimeout(a.da,c))};a.Va=function(){var c;if(!a.trackOffline||0>=a.offlineThrottleDelay)return 0;c=a.r()-a.Ca;return a.offlineThrottleDelay<c?0:a.offlineThrottleDelay-c};a.ua=function(){if(0<a.g.length)return a.g.shift()};a.ob=function(c){if(a.debugTracking){var b="AppMeasurement Debug: "+c;c=c.split("&");var d;for(d=0;d<c.length;d++)b+="\n\t"+a.unescape(c[d]);a.nb(b)}};a.Pa=function(){return a.marketingCloudVisitorID||a.analyticsVisitorID};
a.S=!1;var s;try{s=JSON.parse('{"x":"y"}')}catch(x){s=null}s&&"y"==s.x?(a.S=!0,a.R=function(a){return JSON.parse(a)}):k.$&&k.$.parseJSON?(a.R=function(a){return k.$.parseJSON(a)},a.S=!0):a.R=function(){return null};a.sb=function(c){var b,d,f;a.Pa()&&2047<c.length&&("undefined"!=typeof XMLHttpRequest&&(b=new XMLHttpRequest,"withCredentials"in b?d=1:b=0),b||"undefined"==typeof XDomainRequest||(b=new XDomainRequest,d=2),b&&a.AudienceManagement&&a.AudienceManagement.isReady()&&(a.S?b.pa=!0:b=0));!b&&
a.kb&&(c=c.substring(0,2047));!b&&a.d.createElement&&a.AudienceManagement&&a.AudienceManagement.isReady()&&(b=a.d.createElement("SCRIPT"))&&"async"in b&&((f=(f=a.d.getElementsByTagName("HEAD"))&&f[0]?f[0]:a.d.body)?(b.type="text/javascript",b.setAttribute("async","async"),d=3):b=0);b||(b=new Image,b.alt="");b.ra=function(){try{a.la&&(clearTimeout(a.la),a.la=0),b.timeout&&(clearTimeout(b.timeout),b.timeout=0)}catch(c){}};b.onload=b.tb=function(){b.ra();a.$a();a.Z();a.v=0;a.da();if(b.pa){b.pa=!1;try{var c=
a.R(b.responseText);AudienceManagement.passData(c)}catch(d){}}};b.onabort=b.onerror=b.bb=function(){b.ra();(a.trackOffline||a.ja)&&a.v&&a.g.unshift(a.Za);a.v=0;a.fa>a.I&&a.Da(a.g);a.Z();a.ma(500)};b.onreadystatechange=function(){4==b.readyState&&(200==b.status?b.tb():b.bb())};a.Ca=a.r();if(1==d||2==d){var e=c.indexOf("?");f=c.substring(0,e);e=c.substring(e+1);e=e.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,"");1==d?(b.open("POST",f,!0),b.send(e)):2==d&&(b.open("POST",f),b.send(e))}else if(b.src=c,3==d){if(a.Aa)try{f.removeChild(a.Aa)}catch(g){}f.firstChild?
f.insertBefore(b,f.firstChild):f.appendChild(b);a.Aa=a.Ya}b.abort&&(a.la=setTimeout(b.abort,5E3));a.Za=c;a.Ya=k["s_i_"+a.replace(a.account,",","_")]=b;if(a.useForcedLinkTracking&&a.D||a.q)a.forcedLinkTrackingTimeout||(a.forcedLinkTrackingTimeout=250),a.aa=setTimeout(a.Z,a.forcedLinkTrackingTimeout)};a.$a=function(){if(a.ka()&&!(a.Ba>a.I))try{k.localStorage.removeItem(a.ia()),a.Ba=a.r()}catch(c){}};a.Da=function(c){if(a.ka()){a.Fa();try{k.localStorage.setItem(a.ia(),k.JSON.stringify(c)),a.I=a.r()}catch(b){}}};
a.Fa=function(){if(a.trackOffline){if(!a.offlineLimit||0>=a.offlineLimit)a.offlineLimit=10;for(;a.g.length>a.offlineLimit;)a.ua()}};a.forceOffline=function(){a.ja=!0};a.forceOnline=function(){a.ja=!1};a.ia=function(){return a.offlineFilename+"-"+a.visitorNamespace+a.account};a.r=function(){return(new Date).getTime()};a.ya=function(a){a=a.toLowerCase();return 0!=a.indexOf("#")&&0!=a.indexOf("about:")&&0!=a.indexOf("opera:")&&0!=a.indexOf("javascript:")?!0:!1};a.setTagContainer=function(c){var b,d,
f;a.ub=c;for(b=0;b<a._il.length;b++)if((d=a._il[b])&&"s_l"==d._c&&d.tagContainerName==c){a.M(d);if(d.lmq)for(b=0;b<d.lmq.length;b++)f=d.lmq[b],a.loadModule(f.n);if(d.ml)for(f in d.ml)if(a[f])for(b in c=a[f],f=d.ml[f],f)!Object.prototype[b]&&("function"!=typeof f[b]||0>(""+f[b]).indexOf("s_c_il"))&&(c[b]=f[b]);if(d.mmq)for(b=0;b<d.mmq.length;b++)f=d.mmq[b],a[f.m]&&(c=a[f.m],c[f.f]&&"function"==typeof c[f.f]&&(f.a?c[f.f].apply(c,f.a):c[f.f].apply(c)));if(d.tq)for(b=0;b<d.tq.length;b++)a.track(d.tq[b]);
d.s=a;break}};a.Util={urlEncode:a.escape,urlDecode:a.unescape,cookieRead:a.cookieRead,cookieWrite:a.cookieWrite,getQueryParam:function(c,b,d){var f;b||(b=a.pageURL?a.pageURL:k.location);d||(d="&");return c&&b&&(b=""+b,f=b.indexOf("?"),0<=f&&(b=d+b.substring(f+1)+d,f=b.indexOf(d+c+"="),0<=f&&(b=b.substring(f+d.length+c.length+1),f=b.indexOf(d),0<=f&&(b=b.substring(0,f)),0<b.length)))?a.unescape(b):""}};a.A="supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData pe pev1 pev2 pev3 pageURLRest".split(" ");
a.c=a.A.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));a.ga="timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");a.J=a.ga.slice(0);a.oa="account allAccounts debugTracking visitor trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData AudienceManagement".split(" ");
for(n=0;250>=n;n++)76>n&&(a.c.push("prop"+n),a.J.push("prop"+n)),a.c.push("eVar"+n),a.J.push("eVar"+n),6>n&&a.c.push("hier"+n),4>n&&a.c.push("list"+n);n="latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage".split(" ");a.c=a.c.concat(n);a.A=a.A.concat(n);a.ssl=0<=k.location.protocol.toLowerCase().indexOf("https");a.charSet="UTF-8";a.contextData={};a.offlineThrottleDelay=0;a.offlineFilename="AppMeasurement.offline";
a.Ca=0;a.fa=0;a.I=0;a.Ba=0;a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";a.w=k;a.d=k.document;try{a.kb="Microsoft Internet Explorer"==navigator.appName}catch(y){}a.Z=function(){a.aa&&(k.clearTimeout(a.aa),a.aa=q);a.j&&a.D&&a.j.dispatchEvent(a.D);a.q&&("function"==typeof a.q?a.q():a.j&&a.j.href&&(a.d.location=a.j.href));a.j=a.D=a.q=0};a.Ea=function(){a.b=a.d.body;a.b?(a.p=function(c){var b,d,f,e,g;if(!(a.d&&a.d.getElementById("cppXYctnr")||c&&c["s_fe_"+a._in])){if(a.qa)if(a.useForcedLinkTracking)a.b.removeEventListener("click",
a.p,!1);else{a.b.removeEventListener("click",a.p,!0);a.qa=a.useForcedLinkTracking=0;return}else a.useForcedLinkTracking=0;a.clickObject=c.srcElement?c.srcElement:c.target;try{if(!a.clickObject||a.H&&a.H==a.clickObject||!(a.clickObject.tagName||a.clickObject.parentElement||a.clickObject.parentNode))a.clickObject=0;else{var m=a.H=a.clickObject;a.ea&&(clearTimeout(a.ea),a.ea=0);a.ea=setTimeout(function(){a.H==m&&(a.H=0)},1E4);f=a.wa();a.track();if(f<a.wa()&&a.useForcedLinkTracking&&c.target){for(e=c.target;e&&
e!=a.b&&"A"!=e.tagName.toUpperCase()&&"AREA"!=e.tagName.toUpperCase();)e=e.parentNode;if(e&&(g=e.href,a.ya(g)||(g=0),d=e.target,c.target.dispatchEvent&&g&&(!d||"_self"==d||"_top"==d||"_parent"==d||k.name&&d==k.name))){try{b=a.d.createEvent("MouseEvents")}catch(n){b=new k.MouseEvent}if(b){try{b.initMouseEvent("click",c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}catch(q){b=0}b&&(b["s_fe_"+a._in]=b.s_fe=
1,c.stopPropagation(),c.stopImmediatePropagation&&c.stopImmediatePropagation(),c.preventDefault(),a.j=c.target,a.D=b)}}}}}catch(r){a.clickObject=0}}},a.b&&a.b.attachEvent?a.b.attachEvent("onclick",a.p):a.b&&a.b.addEventListener&&(navigator&&(0<=navigator.userAgent.indexOf("WebKit")&&a.d.createEvent||0<=navigator.userAgent.indexOf("Firefox/2")&&k.MouseEvent)&&(a.qa=1,a.useForcedLinkTracking=1,a.b.addEventListener("click",a.p,!0)),a.b.addEventListener("click",a.p,!1))):setTimeout(a.Ea,30)};a.Ea()}
function s_gi(a){var k,q=window.s_c_il,r,n,t=a.split(","),u,s,x=0;if(q)for(r=0;!x&&r<q.length;){k=q[r];if("s_c"==k._c&&(k.account||k.oun))if(k.account&&k.account==a)x=1;else for(n=k.account?k.account:k.oun,n=k.allAccounts?k.allAccounts:n.split(","),u=0;u<t.length;u++)for(s=0;s<n.length;s++)t[u]==n[s]&&(x=1);r++}x||(k=new AppMeasurement);k.setAccount?k.setAccount(a):k.sa&&k.sa(a);return k}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var a=window,k=a.s_giq,q,r,n;if(k)for(q=0;q<k.length;q++)r=k[q],n=s_gi(r.oun),n.setAccount(r.un),n.setTagContainer(r.tagContainerName);a.s_giq=0}s_pgicq();
