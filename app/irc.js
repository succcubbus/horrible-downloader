const { ipcMain: ipc } = require('electron');

const fs = require('fs');
const irc = require('irc');
const DCC = require('irc-dcc');

module.exports = () => {
  return;

  console.log('testIRC called');

  const client = new irc.Client('irc.rizon.net', 'testNick', {
    autoConnect: false,
    secure: true,
    port: 6697,
  });
  const dcc = new DCC(client);

  client.addListener('error', function(message) {
    console.log('error: ', message);
  });
  client.addListener('registered', function(message) {
    console.log('registered: ', message);
  });

  client.on('dcc-send', (from, args, message) => {
    console.log('received dcc request for file: ' + args.filename);
    const ws = fs.createWriteStream(__dirname + '/' + args.filename);
    dcc.acceptFile(
      from,
      args.host,
      args.port,
      args.filename,
      args.length,
      (err, filename, con) => {
        console.log('accepting file');
        if (err) {
          console.log(err);
          //client.notice(from, err);
          return;
        }
        con.on('data', () => console.log(con.bytesRead + '/' + args.length));
        con.pipe(ws);
      },
    );
  });

  client.connect(() => {
    console.log('connected');

    client.join('#myprivatechannel', () => {
      console.log('joined channel');

      client.say('#myprivatechannel', 'hello');
      client.say('Garuno', 'privateMessage');
    });

    client.join('#horriblesubs', () => {
      console.log('joined horriblesubs');
      client.say('CR-HOLLAND|NEW', 'xdcc send #20585');
    });

    setTimeout(
      () => client.disconnect('', () => console.log('disconnected')),
      50000,
    );
  });

  console.log('trying to connect');
};
