/*
* moyene.filesystem.js 
*/
/*jslint node : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false, 
white : true
*/
/*global   moyene */


// ------------ BEGIN MODULE SCOPE VARIABLES --------------
'use strict';
var mkdir, mkdirSync, readdir, rename, renameSync, access, accessSync, exists, 
  existsSync, init, archive, stat, lstat, open, write, symlink, mount, unmount,
  getAllMounts, close, replicate, version, key, discoveryKey, writable, peers, on,
  fs                = require( 'fs' ),
  hyperdrive        = require('hyperdrive'),
  archive_events    = ['ready', 'error', 'update', 'extension', 'peer-add', 'peer-remove', 'close']
  basepath          = '', 
  homepath          = '',   
  root_fs_structure = ['bin', 'home', 'mnt', 'app', 'tmp', 'etc']
  home_fs_structure = ['Desktop',  'Documentos', 'Imagem', 'Video', 'Audio', 'Template', 'Transferencia', 'Publico']
  rootdir           = '' ;

// ------------ END MODULE SCOPE VARIABLES --------------

// --------------- BEGIN UTILITY METHODS ------------------

// --------------- END UTILITY METHODS ------------------

 // ---------------- BEGIN PUBLIC METHODS ------------------

 init = function ( path, [ key ], [ options ] ) {
  archive = hyperdrive( path, [ key ], [ options ] ); 
 };

 mkdir = function (name) {
  archive.mkdir(name);

 };

 readdir = function ( name, [ options ], [ callback ] ) {
  archive.readdir( name, options, callback);
 };


 stat = function ( name , [ options ], [ callback ] ) {
   return;
 };


lstat = function ( name , [ options ], [ callback ] ) {
   return;
};


open = function (name, flags, callback ) {
  return archive.open (name, flags, callback );
};

write = function (fd, buf, offset, len, pos, cb) {
  archive.write(fd, buf, offset, len, pos, cb);
};


symlink = function ( target, linkname, cb ) {
  archive.symlink ( target, linkname, cb );
};

mount = function ( name, key, opts, cb ) {
  archive.mount ( name, key, opts, cb );
};


unmount = function ( name, cb ) {
  archive.unmount ( name, cb );
};

getAllMounts = function ( opts, cb ) {

  return archive.getAllMounts(opts, cb);
};

close  = function ( fd, [ callback ] ) {
  archive.close( fd, [ callback ]);
};


close  = function ([ callback ] ) {
  archive.close([ callback ]);
};

access = function ( name, [ options ], callback ) {
  archive.access ( name, [ options ], callback );
};


module.exports = {
  init: init}

// ---------------- END   PUBLIC METHODS ------------------
