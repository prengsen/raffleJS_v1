import Sequelize from 'sequelize';
import db from '../config/db.js';

const Ganador = db.define('ganadores', {
    correo:{
        type: Sequelize.STRING
    },
    id_rifa:{
        type: Sequelize.INTEGER
    }
});

export default Ganador;