exports.registration = function(user) {
    this.locals.user = user;
    this.send({
        to: user.email,
        subject: 'Welcome!'
    });
};

exports.resetPassword = function(user) {
    this.layout = false;
    this.locals.user = user;
    this.send({
        to: user.email,
        subject: 'Reset password request',
        from: 'compoundjs@example.com'
    });
};

exports.passwordChanged = function() {
    this.send();
};
