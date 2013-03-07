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
        compound.mailer.send('user/registration', user, function (err, res) {
            if (err) throw err;
            res.message.should.include('Subject: Welcome!');
            res.message.should.include('Hello <strong>Ben Afflek</strong>!');
            res.message.should.include('Hello, Ben Afflek.');
            res.message.should.include('HEADER');
            console.log(res.message.split('\n\r?\n')[0]);
            console.log(res.message.split('\n\r?\n')[1]);
            done();
        });
    });


});
