Installation
------------

    mkdir node_modules
    git clone https://github.com/1602/railway-mailer.git node_modules/mailer
    echo "require('mailer');" >> npmfile.js
    touch config/mailer.yml

Configure
---------

In `config/mailer.yml`:

    development:
      url: "http://localhost:3000"
      mailer: sendmail
      from: "noreply@localhost"
    test:
      url: "http://localhost"
      mailer: test
      from: "noreply@example.com"
    production:
      mailer: smtp
      url: "http://yoursitename.tld"
      from: "noreply@yoursitename.tld"
      host: localhost
      port: 25
      use_authentication: 0
      user: ""
      pass: ""

Usage
-----

Put you email views into the `app/views/emails` directory with following naming style:

    templatename.format (html or text)
    templatename.locale.format

When you want to send email, just call

    app.extensions.mailet.sendEmail(
        'templatename',
         data,
         {subject: 'Email subject', email: 'recipient@example.com', from: 'me@home'}
    );

I know, this API is ugly :) better solution is coming soon.


License
-------

MIT

Contribution
------------

Contributors are welcome
