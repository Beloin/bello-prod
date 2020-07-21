const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventoSchema = new Schema({
    tipo: { type: String },
    clientes: { type: [String] },
    local: { type: String },
    dataAdicao: { type: Date, default: Date.now },
    dataEvento: { type: Date },
});

module.exports = mongoose.model('Evento', eventoSchema);
