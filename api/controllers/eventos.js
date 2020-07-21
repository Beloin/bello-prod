const mongoose = require('mongoose');

const Evento = mongoose.model('Evento');

module.exports.getEventos = async (app, req, res, next) => {
    if (Object.keys(req.query).length != 0) {
        this.searchBy(app, req, res, next);
        return;
    }
    const eventos = await Evento.find({}).catch(err => {
        res.status(500).send(err);
    });
    res.json(eventos);
};

module.exports.postEvento = async (app, req, res, next) => {
    const newEvento = new Evento(req.body);
    await newEvento.save((err, evento) => {
        if (err) res.status(500).send(err);
        res.json(evento);
    });
};

module.exports.getEventoById = async (app, req, res, next) => {
    const id = req.params.id;
    const eventos = await Evento.findById(id).catch(err => {
        res.status(400).send('Não foi encontrado o Evento requisitado.');
    }); // Or find({_id: param});
    if (eventos) res.json(eventos)[0];
    res.status(410).send('O item requisitado não existe mais');
};

module.exports.deleteEventoById = async (app, req, res) => {
    const id = req.params.id;
    const evento = await Evento.findByIdAndDelete(id).catch(err =>
        res.status(400).send('Não foi encontrado o evento a ser deletado.')
    );
    res.sendStatus(204);
};

module.exports.patchEventoById = async (app, req, res, next) => {
    const id = req.params.id;
    const eventos = await Evento.findById(id).catch(err => {
        res.status(400).send('Não foi encontrado o Evento requisitado.');
    });
    const updateEvent = req.body;
    const updated = false;
    for (const key in updateEvent) {
        if (updateEvent.hasOwnProperty(key)) {
            if (eventos[key] != undefined) {
                eventos[key] = updateEvent[key];
                updated = true;
            }
        }
    }

    if (!updated) {
        res.status(204);
    }

    const saved = await eventos.save().catch((err, evento) => {
        if (err) if (err) res.status(500).send(err);
    });

    res.json(saved);
};

module.exports.searchBy = async (app, req, res, next) => {
    const searchQuery = req.query;
    if (searchQuery.tipo) {
        const typeRegex = new RegExp(`^${searchQuery.tipo}`);
        searchQuery.tipo = typeRegex;
    }
    console.log(searchQuery);
    const event = await Evento.find(searchQuery)
        .exec()
        .catch(err => {
            res.status(500).send(err);
        });
    res.json(event);
};
