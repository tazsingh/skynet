// Testacular configuration
// Generated on Sun Mar 03 2013 21:31:18 GMT-0500 (EST)


// base path, that will be used to resolve files and exclude
basePath = "../";


// list of files / patterns to load in the browser
files = [
  MOCHA
, "spec/libs/chai.js"
, "spec/libs/sinon-1.4.2.js"
, "spec/libs/sinon-chai.js"
, MOCHA_ADAPTER
, "js/libs/angular.js"
, "js/libs/ui-bootstrap-0.2.0.js"
, "js/libs/angular-*.js"
, "spec/libs/angular-mocks.js"
, "js/skynet.js"
, "js/services/*.js"
, "js/controllers/*.js"
, "spec/helper.js"
, "spec/injections/*.js"
, "spec/**/*_spec.js"
];


// list of files to exclude
exclude = [];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['progress'];


// web server port
port = 9000;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ["PhantomJS"];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 5000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = true;
