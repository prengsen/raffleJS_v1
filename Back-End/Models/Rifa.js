import Sequelize from 'sequelize';
import db from '../config/db.js';

const Rifa = db.define('rifas', {
    nombre:{
        type: Sequelize.STRING
    },
    fechaHoraInicio: {
        type: Sequelize.DATE
    },
    fechaHoraFin: {
        type: Sequelize.DATE
    }
});

export default Rifa;