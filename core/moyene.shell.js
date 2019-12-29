/*
* moyene.js backend
*/
/*jslint node : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false, 
white : true
*/
/*global   moyene */


// ------------ BEGIN MODULE SCOPE VARIABLES --------------
var init,
 filesystem = require('./moyene.filesystem');
// ------------ END MODULE SCOPE VARIABLES --------------

// --------------- BEGIN UTILITY METHODS ------------------

// --------------- END UTILITY METHODS ------------------

 // ---------------- BEGIN PUBLIC METHODS ------------------

init = function () {
    filesystem.init();
}
 // ---------------- END   PUBLIC METHODS ------------------
