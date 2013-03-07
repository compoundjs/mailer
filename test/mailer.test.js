describe('CompoundMailer', function() {
    var app = getApp();
    var compound = app.compound;

    it('should load mailers and config on boot', function(done) {
        compound.on('mailers', function () {
            compound.structure.mailers.should.have.ownProperty('user');
            compound.should.have.ownProperty('mailer');
            compound.mailer.config.driver.should.eql('Stub');
            done();
        });
    });

    it('should send email', function(done) {
        var user = {name: 'Ben Afflek'};
        compound.mailer.send('user/registration', user, function(err, res) {
            if (err) throw err;
            res.message.should.include('Subject: Welcome!');
            res.message.should.include('Hello <strong>Ben Afflek</strong>!');
            res.message.should.include('Hello, Ben Afflek.');
            res.message.should.include('HEADER');
            // console.log(res.message.split('\n\r?\n')[0]);
            // console.log(res.message.split('\n\r?\n')[1]);
            done();
        });
    });

    it('should setup default layout', function(done) {
        compound.mailer.send('e-commerce/order', function(err, res) {
            if (err) throw err;
            res.message.should.include('Header');
            res.message.should.include('Footer');
            res.message.should.include('<a href=3D=22/order=22>Your order</a>');
            done();
        });
    });

    it('should throw when mail composer not found', function() {
        (function() {
            compound.mailer.send('not/exist');
        }).should.throw(/Mail composer ".*?" not found/);
    });

    it('should not throw when view not found', function() {
        (function() {
            compound.mailer.send('user/passwordChanged', function(err) {
                err.should.be.an.instanceOf(Error);
            });
        }).should.not.throw();
    });

    it('should reconnect when connect called again', function() {
        var transport = compound.mailer.transport;
        compound.mailer.connect();
        compound.mailer.transport.should.not.eql(transport);
    });

});
