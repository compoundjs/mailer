var config = [
    'development:',
    '  url: "http://localhost:3000"',
    '  mailer: "sendmail"',
    '  from: "noreply@localhost"',
    'test:',
    '  url: "http://localhost"',
    '  mailer: "test"',
    '  from: "noreply@example.com"',
    'production:',
    '  mailer: smtp',
    '  url: "http://yoursitename.tld"',
    '  from: "noreply@yoursitename.tld"',
    '  host: "localhost"',
    '  port: 25',
    '  use_authentication: 0',
    '  user: ""',
    '  pass: ""\n'
].join('\n');

var fs = require('fs');
var path = require('path');

if (fs.existsSync(app.root + '/config') && !fs.existsSync(app.root + '/config/mailer.yml')) {
    fs.writeFileSync(app.root + '/config/mailer.yml', config, 'utf8');
}

process.exit(0);
