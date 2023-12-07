const express = require('express');
const secciones = express.Router();
const conexion =  require('../database/db')

secciones.get('/',(req,res)=>{
   conexion.query('SELECT i.ID, e.Nombre AS EscuelaNombre, i.FechaInscripcion, i.EstadoPago FROM inscripciones AS i JOIN escuelas AS e ON i.EscuelaID = e.ID',
    (error, results)=>{
    if (error) {
        throw error;
    }else{
        res.render('monitoreo.ejs', {monitor:results})
    }
   })
})

module.exports = secciones;