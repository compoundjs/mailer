var nodemailer = require('nodemailer'),
    fs   = require('fs'),
    path = require('path'),
    Mail = require('./mail'),
    ext = /\.(coffee|js)$/;

module.exports = CompoundMailer;

function CompoundMailer(compound) {
    this.compound = compound;
    this.app = compound.app;
    this.mailersDir = compound.root + '/app/mailers';
    compound.mailer = this;
    try {
        this.config = require(compound.root + '/config/mailer')[this.app.get('env')];
    } catch (e) {
        this.config = {};
    }
    this.transport = null;
    this.send = this.send.bind(this);
};

CompoundMailer.prototype.send = function(name) {
    var args = Array.prototype.slice.call(arguments, 1);
    var cb;
    if ('function' === typeof args[args.length - 1]) {
        cb = args.pop();
    }
    var mail = new Mail(name, this, cb);
    var fn = this.compound.structure.mailers[mail.class][mail.type];
    if (!fn) {
        throw new Error('Mail composer "' + mail.name + '" not found');
    }
    fn.apply(mail, args);
};

CompoundMailer.prototype.load = function(cb) {
    var mailer = this;
    var compound = this.compound;
    var structure = this.compound.structure;
    var mailers = structure.mailers = structure.mailers || {};
    fs.exists(this.mailersDir, function(exists) {
        if (!exists) {
            fs.mkdirSync(mailer.mailersDir);
        }
        fs.readdir(mailer.mailersDir, function(err, files) {
            files && files.forEach(function(f) {
                var file = mailer.mailersDir + '/' + f;
                mailers[f.replace(ext, '')] = require(file);
            });
            cb(err, mailers);
            if (!err) {
                compound.emit('mailers', compound, mailers);
            }
        });

    });
};

CompoundMailer.prototype.connect = function() {
    if (this.connected) {
        this.disconnect();
    }
    var opts = this.config.transport;
    this.transport = nodemailer.createTransport(this.config.driver, opts);
};

CompoundMailer.prototype.disconnect = function() {
    if (this.transport) {
        this.transport.close();
        this.transport = null;
    }
}

CompoundMailer.prototype.__defineGetter__('connected', function () {
    return !!this.transport;
});

CompoundMailer.prototype.getViewContext = function() {
    var c = this.compound.helpers.personalize();
    // TODO make path to working with full url
    c.pathTo = this.compound.map.pathTo;
    return c;
};
