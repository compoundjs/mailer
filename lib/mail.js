
var juice = require('juice');
module.exports = Mail;

function Mail(name, mailer, cb) {
    var views = mailer.compound.structure.views;
    var pviews = mailer.compound.parent && mailer.compound.parent.structure.views;
    var n = name.split(/[\/\.\:]/);
    this.class = n[0];
    this.type = n[1] || 'default';
    this.view = this.name = [this.class, this.type].join('/');
    this.mailer = mailer;
    this.locals = mailer.getViewContext();

    if (views['layouts/mail/' + this.class + '.html']) {
        this.layout = this.class;
    } else
    if (views['layouts/mail/default.html']) {
        this.layout = 'default';
    } else
    if (pviews && pviews['layouts/mail/' + this.class + '.html']) {
        this.layout = this.class;
    } else
    if (pviews && pviews['layouts/mail/default.html']) {
        this.layout = 'default';
    }

    if (cb) {
        this.on('end', cb);
    }
};

require('util').inherits(Mail, require('events').EventEmitter);

Mail.prototype.send = function send(opts, cb) {
    var mail = this;
    opts = opts || {};
    if (!mail.mailer.connected) {
        mail.mailer.connect();
    }
    this.compose(opts, function (mailOptions) {
        mail.mailer.transport.sendMail(mailOptions, function (err, resp) {
            mail.emit('end', err, resp, mailOptions);
            if (cb) {
                cb(err, resp, mailOptions);
            }
        });
    });
};

Mail.prototype.compose = function compose(opts, cb) {
    var mail = this;
    mail.render('.html', function(err, html) {
        if (err) return mail.emit('end', err);
        if (opts.css) {
            html = juice.inlineContent(html, opts.css);
        }
        opts.html = html;
        if (opts.generateTextFromHTML) {
            return cb(opts);
        }
        makeText();
    });

    function makeText() {
        mail.render('.text', function(err, text) {
            if (err) return mail.emit('end', err);
            opts.text = text;
            cb(opts);
        });
    }
};

Mail.prototype.render = function render(format, cb) {
    var mail = this;
    var compound = this.mailer.compound;
    var views = compound.structure.views;
    var app = compound.app;
    var viewPath = 'mail/' + this.view + format;
    var view = views[viewPath];
    if (!view) {
        return cb(new Error('View ./app/views/' + viewPath + ' not found'));
    }
    if (!this.layout) {
        return app.render(view, this.locals, cb);
    }
    var pviews = compound.parent && compound.parent.structure.views;
    var path = 'layouts/mail/' + this.layout + format;
    var layout = views[path] || pviews[path];
    if (!layout) {
        return cb(new Error('Layout ./app/views/' + path + ' not found'));
    }
    app.render(view, this.locals, function(err, result) {
        if (err) {
            return cb(err);
        }
        mail.locals.body = result;
        app.render(layout, mail.locals, cb);
    });
};
