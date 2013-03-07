var nodemailer = require('nodemailer'),
    fs   = require('fs'),
    path = require('path');

module.exports = Mailer;

function Mailer(compound) {
    this.compound = compound;
    this.app = compound.app;
};

Mailer.prototype.sendEmail = function(mail, cb) {
    var html = this.render(mail.type, 'html', mail.data);
    var text = this.render(mail.type, 'text', mail.data);

    this.transport.sendMail(mail.options, cb);
};
