## Installation

1. npm install co-mailer --save
2. update config/autoload.js
3. create `config/mailer.js` configuration, see [config/mailer.example.js][1]

## Usage

Call `compound.mailer.send('user/notification', user, event);` to send email.
Controller have `sendEmail` method with the same signature.

Put your mailer to `app/mailers/mailerName.js`. See [mailer example][2].
Mailer file should export set of emails, for example `app/mailers/user.js`:

    exports.notification = function(user, event) {
        this.layout = 'base';
        this.locals.user = user;
        this.locals.event = event;
        this.send({
            to: user.email,
            subject: event.title
            cc: ...,
            bcc: ...,
            ...
            // full list of options available here:
            // https://github.com/andris9/Nodemailer#e-mail-message-fields
            // you can populate all except 'html' and 'text'
            // which handled by mailer
        });
    };

Views for emails should be located in `app/views/mail` directory, and layouts
in `app/views/layouts/mail` directory. Naming convention as follows: `mailerName/emailType.format.js`. For example for user mailer's notification email it will be:

    ./app/views/mail/user/notification.html.ejs
    ./app/views/mail/user/notification.text.ejs

Layout name by default is `default.{html,text}.ejs`, if mailer find
`app/views/layouts/mail/user.html.ejs` it will be used for user mailer. But
default could be overwritten in mail handler.

Any compoundjs helper available in view. Path helper should be used with
{baseURL: 'http://my.domain.tld'} option, or specify it `baseURL` in config.
Otherwise you get useless paths in email.

[1]: https://github.com/compoundjs/mailer/blob/master/assets/config/mailer.example.js)
[2]: https://github.com/compoundjs/mailer/blob/master/test/app/app/mailers/user.js)

## License (MIT)

```text
Copyright (C) 2011 by Anatoliy Chakkaev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
```

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

```text
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

