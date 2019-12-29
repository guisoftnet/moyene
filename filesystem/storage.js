var hyperdrive = require('hyperdrive');

var root_system = hyperdrive('C:\\Users\\jmr-guirruta\\moyene');

root_system.mkdir('/root');
root_system.mkdir('/root/bin');
root_system.mkdir('/root/home');
root_system.mkdir('/root/usr');
root_system.mkdir('/root/tmp');
root_system.mkdir('/root/mnt');
root_system.mkdir('/root/etc');

root_system.readdir('/', ( err, list ) => {
    if ( err ) throw err;
    console.log(list);
});


root_system.readdir('/root', ( err, list ) => {
    if ( err ) throw err;
    console.log(list);
})

