Installation
------------

    railway install https://github.com/1602/railway-mailer.git

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
