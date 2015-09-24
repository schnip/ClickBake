if (typeof SNI_COMMUNITY_ECHO_APP === 'undefined' || !SNI_COMMUNITY_ECHO_APP) {
	var SNI_COMMUNITY_ECHO_APP = {};
}
if (typeof SNI_COMMUNITY_ECHO_ASSET === 'undefined' || !SNI_COMMUNITY_ECHO_ASSET) {
	var SNI_COMMUNITY_ECHO_ASSET = {};
}
if (typeof SNI_COMMUNITY_FILE_UPLOAD === 'undefined' || !SNI_COMMUNITY_FILE_UPLOAD) {
	var SNI_COMMUNITY_FILE_UPLOAD = {};
}
if (typeof CP_SERVICE_FILE_UPLOAD === 'undefined' || !CP_SERVICE_FILE_UPLOAD) {
	var CP_SERVICE_FILE_UPLOAD = {};
}
if (typeof SNI_COMMUNITY_COMMENT_APP === 'undefined' || !SNI_COMMUNITY_COMMENT_APP) {
	var SNI_COMMUNITY_COMMENT_APP = {};
}

SNI_COMMUNITY_ECHO_APP.APP_KEY_CONFIG = "Ac80dtyFNT2WlqkuFNjvMz";

SNI_COMMUNITY_FILE_UPLOAD.DEBUG_MODE_CONFIG = false;

SNI_COMMUNITY_FILE_UPLOAD.PICK_OPTIONS = {
	multiple: 'true',
	debug: SNI_COMMUNITY_FILE_UPLOAD.DEBUG_MODE_CONFIG,
	services: ['FACEBOOK', 'COMPUTER', 'GOOGLE_DRIVE', 'FLICKR', 'INSTAGRAM', 'PICASA']
};

SNI_COMMUNITY_FILE_UPLOAD.STORE_OPTIONS = {
	'location': 's3',
	'access': 'public'
};

/*
	[2013.10.07, Yonas Hassen]
	Customize the path to 'iframeproxy.html' file. This string must begin and end with '/'!
	Also, if your proxy filename isn't 'iframeproxy.html', then change it below. Otherwise,
	remove that line of code.
*/
window.SNI = window.SNI || {};
window.SNI.SocialUploader = window.SNI.SocialUploader || {};
SNI.SocialUploader.iframeProxyPath = "/static_files/communitytools/";
SNI.SocialUploader.iframeProxyFilename = "empty.html";

// To Override CSS - for future use
// SNI_COMMUNITY_COMMENT_APP.CSS_DEFAULT = "www.example.com/custom_fp.css";