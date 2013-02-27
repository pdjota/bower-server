var pg = require('pg')
  , connectionString = process.env.HEROKU_POSTGRESQL_GREEN_URL || 'postgres://localhost:5432/bower'
  , client;

client = new pg.Client(connectionString);
client.connect();

function createTable()
{
  client.query("CREATE TABLE IF NOT EXISTS bower_repo(name varchar(50) UNIQUE, url varchar(255) UNIQUE, created_at timestamp)",
  function(err, result) {
    if(err !== null)
      console.log('Could Not Create the Database');
    else
      console.log('Bower Repo Table Has Been Created');
  });
}

process.on('SIGTERM', function () {
  console.log('Got sigterm');
    createTable();
});

process.on('SIGINT', function () {
  console.log('Got siginit');
    createTable();
});

setTimeout(function () {
  console.log('Exit on timeout');
  process.exit(0);
}, 250);

process.kill(process.pid);