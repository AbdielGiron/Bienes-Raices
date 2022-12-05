import express from 'express';
const router = express.Router();
import { IPropertie, Properties } from '@server/libs/Properties';


const properties = new Properties();

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


export default router;