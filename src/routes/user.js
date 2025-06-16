const passport = require('passport');
require('../middelwares/passport');


module.exports = (router, controller) => {

    router.use(passport.initialize());
    // router.use(passport.session());

    // Google Auth
    router.get('/helloWorld', controller.helloWorld);
    router.post('/addUser', controller.addUser);
}   

