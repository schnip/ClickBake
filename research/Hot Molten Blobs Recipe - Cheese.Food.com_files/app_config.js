// [2014.01.03, Yonas Hassen]
// Environment-specific URL configuration file.

// Extending the existing SU object from the Simple Upload JS file. Create it if it doesn't exist already.
if ( !window.SU ) { window.SU = {}; }

$.extend( true , SU , {
	// Object containing various environments.
	environments: {
		// For all backend Social Upload apps/services.
		apps: "http://upload.scrippscontroller.com",

		// Backend apps that log activity.
		logs: "http://upload.scrippscontroller.com",

		// For user-submitted uploads.
		uploads: "http://statics.scrippsnetworks.com"
	}
});