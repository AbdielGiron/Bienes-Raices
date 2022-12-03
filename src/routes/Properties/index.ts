import express from 'express';
const router = express.Router();
import { Properties } from '@server/libs/Properties';

const properties = new Properties();

router.post('/create', async (req, res) => {
    try {
        const { titulo, precio, descripcion, tipo, area, habitaciones,
            banios, garage, terraza, direccion, nombreCompleto, email, idPropietario } = req.body;
        const result = await properties.createPropertie(titulo, precio, descripcion, tipo,
            area, habitaciones, banios, garage, terraza, direccion, nombreCompleto, email, idPropietario);
        console.log("CREATE:", result);
        res.status(200).json({ "msg": "Propiedad creada correctamente" });
    } catch (ex) {
        console.log("Error:", ex);
        res.status(500).json({ error: "Error al crear propiedad" });
    }
});

router.put('/update', async (req, res) => {
    try {
        const { id, titulo, precio, descripcion, tipo, area, habitaciones,
            banios, garage, terraza, direccion, estado } = req.body;
        const result = await properties.updatePropertie(id, titulo, precio, descripcion, tipo,
            area, habitaciones, banios, garage, terraza, direccion, estado);
        console.log("UPDATE:", result);
        res.status(200).json({ "msg": "Propiedad actualizada correctamente" });
    } catch (ex) {
        console.log("Error:", ex);
        res.status(500).json({ error: "Error al actualizar propiedad" });
    }
});
router.put('/delete', async (req, res) => {
    try {
        const { id } = req.body;
        const result = await properties.deletePropertie(id);
        console.log("UPDATE:", result);
        res.status(200).json({ "msg": "Propiedad eliminada correctamente" });
    } catch (ex) {
        console.log("Error:", ex);
        res.status(500).json({ error: "Error al eliminar propiedad" });
    }
});

router.get('/AllProperties', async (req, res) => {
    try {
        res.json(await properties.getAllProperties());
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ error: 'Error al obtener Registro' });
    }
});

router.get('/byindex/:index', async (req, res) => {
    try {
        const { index: id } = req.params;
        res.json(await properties.getPropertieByIndex(id));
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ error: 'Error al obtener Registro' });
    }
});

router.get('/byuser/:userid', async (req, res) => {
    try {
        const { userid: id } = req.params;
        res.json(await properties.getAllPropertiesFromUser(id));
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ error: 'Error al obtener Registros' });
    }
});


export default router;