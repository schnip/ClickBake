if ( SNI.Analytics ) {
  SNI.Analytics.trackModules();
  _satellite.notify('Called SNI.Analytics.trackModules',1);  
} else {
  _satellite.notify('Did not call SNI.Analytics.trackModules',1);  
}
