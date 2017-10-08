var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var shortid = require('shortid');
var User = require('../models/agent.js');
var models = require('../models/plans');
var indieplan = models.indieplan;
var capplan = models.capplan;


// Agent Homepage
router.get('/', eAuth, function(req, res){
    capplan.find({by_who: req.user.id}, function(err, docs){
        if(err) return console.log(err);
        else return indieplan.find({by_who: req.user.id}, function(err, data){
            if(err) return console.log(err);
            else return res.render('a.home.ejs', {'user': req.user, 'docs': docs, 'data': data});
        });
    });
});

router.get('/createplan', eAuth, function(req, res){
    if(req.user.agent_type == 'nothing yet'){
        res.redirect('/agent/welcome');
    } else {
        User.findById(req.user.id, function(err, docs){
            if(err) return console.log(err);
            else return res.render('a.createplan.ejs', {'user': req.user, 'docs': docs});
        });
    }
});

router.post('/createplan', eAuth, function(req, res){
    if(req.user.agent_type == 'captive'){
        var newcapplan = new capplan({
            _id: shortid.generate(),
            title: 'Nothing Here Yet',
            clicks: 0,
            by_who: req.user.id,
            adv_1: 'Nothing yet',
            adv_2: 'Nothing yet',
            adv_3: 'Nothing yet',
            adv_4: 'Nothing yet',
            adv_5: 'Nothing yet',
            date_created: Date.now(),
            price: 0,
            for_who: req.body.affiliates,
            zip_codes: 'nothing yet',
            insurance_type: 'nothing yet'
        });

        newcapplan.save(function(err, docs){
            if(err) return console.log(err);
            else return res.redirect('/agent/createplan/edit');
        });
    } else {
        var newindeplan = new indieplan({
            _id: shortid.generate(),
            title: 'Nothing yet',
            clicks: 0,
            by_who: req.user.id,
            date_created: Date.now(),
            price: 0,
            adv_1: 'Nothing Yet',
            adv_2: 'Nothing Yet',
            adv_3: 'Nothing Yet',
            adv_4: 'Nothing Yet',
            adv_5: 'Nothing Yet',
            for_who_1: req.body.affiliates,
        });

        newindeplan.save(function(err, docs){
            if(err) return console.log(err);
            else return res.redirect('/agent/createplan/edit');
        });
    }
});

router.get('/createplan/edit', eAuth, function(req, res){
    if(req.user.agent_type == 'captive'){
        capplan.findById(req.user.id, function(err, docs){
            if(err) return console.log(err);
            else return res.render('a.cp.planeditor.ejs', {'user': req.user, 'docs': docs});
        });
    } else {
        indieplan.findById(req.user.id, function(err, docs){
            if(err) return console.log(err);
            else return res.render('a.cp.planeditor.ejs', {'user': req.user, 'docs': docs});
        });
    }
});

router.post('/createplan/edit', eAuth, function(req, res){
    if(req.user.agent_type == 'captive'){
        capplan.findOneAndUpdate({by_who: req.user.id}, {
            adv_1: req.body.adv1,
            adv_2: req.body.adv2,
            adv_3: req.body.adv3,
            adv_4: req.body.adv4,
            adv_5: req.body.adv5,
            date_created: Date.now(),
            price: req.body.pricepm,
            zip_codes: req.body.zipcs,
            insurance_type: req.body.insurancetype
        }, function(err, docs){
            if(err) return console.log(err);
            else return res.redirect('/agent/createplan/preview');
        });
    } else {
        indieplan.findOneAndUpdate({by_who: req.user.id}, {}, function(err, data){
            if(err) return console.log(err);
            else return res.redirect('/agent/createplan/preview');
        });
    }
});

router.get('/createplan/preview', eAuth, function(req, res){
    if(req.user.agent_type == 'captive'){
        capplan.findById(req.user.id, function(err, docs){
            if(err) return console.log(err);
            else return res.render('a.cp.preview.ejs', {'user': req.user, 'docs': docs});
        });
    } else {
        indieplan.findById(req.user.id, function(err, data){
            if(err) return console.log(err);
            else return res.render('a.cp.preview.ejs', {'user': req.user, 'docs': data});
        });
    }
});


// Welcome
router.get('/welcome', eAuth, function(req, res){
    res.render('a.welcome.ejs', {'user': req.user});
});

router.post('/welcome', eAuth, function(req, res){
    User.findByIdAndUpdate(req.user.id, {
        agent_type: req.body.agenttype,
        phone_number: req.body.phonenumber,
        address: req.body.address,
        agency_name: req.body.agencyname,
        state: req.body.state,
        city: req.body.city,
        years_in_business: req.body.yearsinbusiness,
        agent_liscense_number: req.body.liscensenumber
    }, function(err, docs){
        if(err) return console.log(err);
        else return res.redirect('/agent/createplan');
    });
});

router.get('/forgotpassword', function(req, res){
    res.render('a.forgotpassword.ejs', {'user': req.user});
});

// My Account
router.get('/myaccount', eAuth, function(req, res){
    res.render('a.myaccount.ejs')
});

// Sign Up
router.get('/signup', function(req, res){
    res.render('a.signup.ejs');
});

router.get('/signin', function(req, res){
    res.render('a.signin.ejs');
});

router.post('/signup', function(req, res){
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    // Validation 
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Correct email needed').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Unmatching Passwords').equals(req.body.password);

    var errors = req.validationErrors();

    if(errors){
        res.render('a.signup.ejs', {
            errors: errors
        });
    } else {
        var newUser = new User({
            _id: shortid.generate(),
            name: name,
            email: email,
            username: username,
            password: password,
            plans_created: 0,
            lead_number: 0,
            agent_type: 'nothing yet',
            phone_number: 'nothing yet',
            address: 'nothing yet',
            state: 'nothing yet',
            city: 'nothing yet',
            years_in_business: 'nothing yet',
            agent_liscense_number: 'nothing yet'
        });

        User.createUser(newUser, function(err, user){
            if(err) throw err;
            console.log('Noew user createed');
        });

        req.flash('success_msg', 'You are registered and can now sign in');

        res.redirect('/agent/signin');
    }
});


passport.use(new LocalStrategy(
    function(username, password, done){
        User.getUserByUsername(username, function(err, user){
            if(err) throw err;
            if(!user){
                return done(null, false, {message: 'Unknown User'});
            }

            User.comparePassword(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid Password'});
                }
            });
        });
    }
));

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.getUserById(id, function(err, user){
        done(null, user);
    });
});

router.post('/signin', passport.authenticate('local', {successRedirect:'/agent', failureRedirect: '/agent/signin', failureFlash: true}), function(req, res){
    res.redirect('/');
});

router.get('/signout', function(req, res){
    req.logout();

    req.flash('success_msg', 'Come back for more quality leads');

    res.redirect('/agent/signin');
});


function eAuth(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/agent/signin');
    }
}

module.exports = router;