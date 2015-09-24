SNI.Analytics = SNI.Analytics || {};
(function () {
    trackedIds = [],
    trackedDivs = [],
    advSearch = false,
    headerTrk = false,
    deriveTrackIngValues = function(context) {
      var $cntxtObj =  $(context),
      tgt = $cntxtObj.attr('href') || "",
      title = "n/a", found = [];
      console.log($cntxtObj);
      if ($cntxtObj.attr('title')) {
           title = $cntxtObj.attr('title');
      } else {
           found = $cntxtObj.find('.title');
           if (found.length > 0 && found.html()) {
               title = found.html().replace(/<\/?[^>]+>/g, "");
           } else {
               found = $cntxtObj.find('img[alt]');
               if ( found.length > 0 && found.attr("alt") ) {
                   	title = found.attr("alt"); 
               } else {                   
                   	title = $cntxtObj.html();
                 		title = title ? title.replace(/<\/?[^>]+>/g, "") : "n/a";
               }
           }
       }
       if (tgt && tgt.indexOf("http:") === -1 && tgt.indexOf("mailto:") === -1) {
           tgt = document.location.protocol + '//' + document.location.host + '/' + tgt;
       } else if (!tgt && $(this).attr('title')) {
       	   tgt =  $cntxtObj.attr('title') + ( $cntxtObj.data('recipe-id') ? "-" +  $cntxtObj.data('recipe-id') : "");
       }
       return { ModuleName: $cntxtObj.parents('.analytic-box').data('module'),
                LinkTitle: title,
                LocUrl: document.location.href,
                LinkPosition:  $cntxtObj.parents('.analytic-box').index(context),
                TargetUrl: tgt }
    },      
    addArticleTracking = function ($lastarticle) {
        // connect click events   
      _satellite.notify("Called addArticleTracking",1);
        $lastarticle.find('.analytic-box a').click(function (data) {
            SNI.Analytics.moduleTrackLS(this, deriveTrackIngValues(this));
        });
    },
    addHeaderTracking = function () {
        // connect click events   
      _satellite.notify("Called addHeaderTracking",1);
        $('.analytic-box #fdc-navbar a').click(function (data) {
            _satellite.notify("HeaderTracking click detected",1);
            SNI.Analytics.moduleTrackLS(this, deriveTrackIngValues(this));
        });
    },
    addTileTracking = function ($lastdiv) {
        $lastdiv.find('.tools a').click(function () {
            var $obj = $(this);
            SNI.Analytics.moduleTrackLS(this, {
                ModuleName: "Recipe Tile Tools",
                LinkTitle: $obj.attr('title'),
                LinkPosition: "Tile",
                TargetUrl: $obj.attr('title') + "-" + $obj.attr('data-recipe-id')
            });
        });
        $lastdiv.nextAll().find('.tools a').click(function () {
            var $obj = $(this);
            SNI.Analytics.moduleTrackLS(this, {
                ModuleName: "Recipe Tile Tools",
                LinkTitle: $obj.attr('title'),
                LinkPosition: "Tile",
                TargetUrl: $obj.attr('title') + "-" + $obj.attr('data-recipe-id')
            });
        });
    },
    addAdvSearchTracking = function () {
        $('button#show-filters').click(function () {
            var $obj = $(this);
            SNI.Analytics.moduleTrackLS(this, {
                ModuleName: "Utility Tools",
                LinkTitle: $obj.attr('title'),
                LinkPosition: "Recipes/Search"
            });
        });
    },
    trackModules = function () {
        var $lastarticle = $('article[itemtype="http://schema.org/Recipe"]:last'),
            $lastdiv = $('div[data-page-num]:last');
        if (trackedIds.indexOf($lastarticle.attr('id')) === -1) {
            trackedIds.push($lastarticle.attr('id'));
            _satellite.notify("MODULE TRACKING ARTICLE: " + $lastarticle.attr('id'), 1);
            addArticleTracking($lastarticle);
        }
        if (trackedDivs.indexOf($lastdiv.attr('data-page-num')) === -1) {
            trackedDivs.push($lastdiv.attr('data-page-num'));
            addTileTracking($lastdiv);
        }
        if (!advSearch) {
            addAdvSearchTracking();
            advSearch = true;
        }
      	if (!headerTrk) {
      		addHeaderTracking();
          headerTrk = true;
        }
    };
    SNI.Analytics.trackModules = trackModules;
})();
