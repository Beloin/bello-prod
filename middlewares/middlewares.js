const bodyParser = require('body-parser');

module.exports = application => {
    /** Middlewares */
    application.use(bodyParser.json());
    application.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );
};
