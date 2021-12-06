import Sequelize from 'sequelize';
import db from '../config/db.js';

const Registro = db.define('registros', {
    nombre:{
        type: Sequelize.STRING
    },
    correo: {
        type: Sequelize.STRING
    },
    registroTimestamp: {
        type: Sequelize.DATE
    },
    id_rifa: {
        type: Sequelize.INTEGER
    }
});

export default Registro;