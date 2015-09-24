_satellite.pushAsyncScript(function(event, target, $variables){
  window.SNI = window.SNI || {};
SNI.Analytics = SNI.Analytics || {};
SNI.Analytics.readiness = {};
SNI.Analytics.sValues = {};
SNI.Analytics.maxWaitTime = 5000; //milliseconds
SNI.Analytics.readyToTrack = function() {
	var r = this.readiness, rkey = Object.keys(r), i = rkey.length;
    if ( i > 0 ) {
        while(i--){
           if ( !r[rkey[i]] ) {
                return false;
            }
        } 
    }
    return true;
};
SNI.Analytics.setReadyKey = function(key,value) {
	var r = this.readiness;
	r[key] = value;
	// start the countdown
	setTimeout(function() {
		SNI.Analytics.readiness = {};
	}, this.maxWaitTime);
};

SNI.Analytics.setReadyKey("gigya",false);
SNI.Analytics.setReadyKey("dfp",false);
( function ($) {
	// FoodNetwork Gigya set flag
	$(document).on('communityInit', function() {
		SNI.Analytics.setReadyKey("gigya",true);
	});
	// Food.com Gigya set flag
	var subscribeSession = function() {
		if ( typeof FD === "object" ) {
			if ( FD.Session.complete ) {
				SNI.Analytics.setReadyKey("gigya",true);
			} else {
				FD.subscribe('FD.Session.complete', function() {
				SNI.Analytics.setReadyKey("gigya",true);
				});	
			}
		} else {
			setTimeout(subscribeSession, 100);
		}
	},
	// DFP set flag
	subscribeSlots = function() {
		var dfpSlots, primed, activeSlot;
		if ( typeof SniAds === "object" ) {
			SniAds.Event.subscribe("slotRenderComplete", function(object) {
      var slot, slotId, slotData;
      //slotId = "#"+object.slot.getSlotId().d;
      //slot = $(slotId);
      //slot.mouseenter(function(s){ primed = true; activeSlot = slotData; console.log("PRIMED " + slotId + " " + slotData); });
      //slot.mouseleave(function(s){ primed = false; console.log("NOT PRIMED " + slotId + " " + activeSlot ); });
      //window.onblur = function() {
      //  if ( primed ) { 
     	//		s.linkTrackVars = 'contextData.adInfo';
      //   s.contextData.adInfo = activeSlot;	
      //    s.tl(slot, 'e', 'adClick') 
      //  }
      // };
			if ( object.lineItemId || object.creativeId ) {
				dfpSlots = SNI.Analytics.sValues.list1;
				dfpSlots = dfpSlots ? dfpSlots + "," + object.lineItemId+"|"+object.creativeId : object.lineItemId+"|"+object.creativeId;
				slotData = object.lineItemId+"|"+object.creativeId;
        setTimeout(function() { SNI.Analytics.setReadyKey("dfp",true); },500);
				SNI.Analytics.sValues.list1 = dfpSlots;
			}
			});
		} else {
			setTimeout(subscribeSlots, 100);
		}
	};
	subscribeSlots();
	subscribeSession();
  //listen for sales widget
  $( document ).on( 'saleswidget' , function( event , data ) {
    var last_art = $('article[itemtype="http://schema.org/Recipe"]:last'),
        show_more_fired = false;
		SNI.Analytics.sValues.event101 = "1";
    switch ( data.state ) {
        case 'sales':
        			SNI.Analytics.sValues.eVar77 = "Deals";
            break;

        case 'default':
        			SNI.Analytics.sValues.eVar77 = "CTA";
				break;

        case 'none':
        			SNI.Analytics.sValues.eVar77 = "No Deals";
            break;

        default:
        break;
    }
    SNI.Analytics.trackedWidgets = SNI.Analytics.trackedWidgets || [];
    if ( SNI.Analytics.trackedWidgets.indexOf(last_art.attr("id")) === -1 ) {
    last_art.find('.sales-widget .edit-location a').click(function(){
  		SNI.Analytics.trackViaLS({ eVar77: "Edit",events: "event101" });
  	});
   last_art.find('.sales-widget .sales-widget-feedback a').click(function(){
  		SNI.Analytics.trackViaLS({ eVar77: "Feedback",events: "event101" });
  	});
   last_art.find('.sales-widget .more-sales a').click( function(){
     if ( !show_more_fired ) {
	    	show_more_fired = true;
       	s.eVar77 = "Show More";
  	    SNI.Analytics.fireEvent("event101",{trackvars:"eVar77",linktitle:"more sales tracking"});
     } 
     });
      SNI.Analytics.trackedWidgets.push(last_art.attr("id"));
    } 
});
})(jQuery); 

});
