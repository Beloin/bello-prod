module.exports = application => {
    application.get('/eventos', function (req, res, next) {
        application.api.controllers.eventos.getEventos(application, req, res, next);
    });

    application.post('/eventos', function (req, res, next) {
        application.api.controllers.eventos.postEvento(application, req, res, next);
    });

    application.get('/eventos/:id', function (req, res, next) {
        application.api.controllers.eventos.getEventoById(application, req, res, next);
    });

    application.delete('/eventos/:id', function (req, res, next) {
        application.api.controllers.eventos.deleteEventoById(application, req, res, next);
    });

    application.patch('/eventos/:id', function (req, res, next) {
        application.api.controllers.eventos.patchEventoById(application, req, res, next);
    });
};
