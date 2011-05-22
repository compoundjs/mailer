var config = [
    'development:',
    '  url: "http://localhost:3000"',
    '  mailer: sendmail',
    '  from: "noreply@localhost"',
    'test:',
    '  url: "http://localhost"',
    '  mailer: test',
    '  from: "noreply@example.com"',
    'production:',
    '  mailer: smtp',
    '  url: "http://yoursitename.tld"',
    '  from: "noreply@yoursitename.tld"',
    '  host: localhost',
    '  port: 25',
    '  use_authentication: 0',
    '  user: ""',
    '  pass: ""'
].join('\n');

var fs = require('fs');
var path = require('path');

if (path.existsSync(app.root + '/config') && !path.existsSync(app.root + '/config/mailer.yml')) {
    fs.writeFileSync(app.root + '/config/mailer.yml', config);
}

process.exit(0);
