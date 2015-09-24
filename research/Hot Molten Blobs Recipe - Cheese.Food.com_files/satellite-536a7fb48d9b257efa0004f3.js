var omniTrackBYGender = function(obj, gender, birthyear, mvpd) {
	s.linkTrackVars="evar36";
	s.linkTrackEvents = "";
	s.events = "";
	s.eVar36=gender + "|" + birthyear;
	if ( mvpd ) {
		s.eVar36 += "|" + mvpd;
	}
	s.tl(obj,"o","sweeps entry")
	s.linkTrackVars = "";
  s.eVar36 = "";
}
