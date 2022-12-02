import express from 'express';
const router = express.Router();
import { Properties } from '@server/libs/Properties';

const properties = new Properties();

router.post('/create', async (req, res) => {
    try {
        const {titulo, precio, descripcion, tipo, area, habitaciones,
            banios, garage, terraza, direccion, nombreCompleto,email,idPropietario} = req.body;
        const result = await properties.createPropertie(titulo, precio, descripcion, tipo,
            area, habitaciones, banios, garage, terraza, direccion,nombreCompleto,email,idPropietario);
        console.log("CREATE:", result);
        res.status(200).json({"msg": "Propiedad creada correctamente"});
    } catch (ex) {
        console.log("Error:", ex);
        res.status(500).json({error:"Error al crear propiedad"});
    }
    });

    router.put('/update', async (req, res) => {
        try {
            const {id,titulo, precio, descripcion, tipo, area, habitaciones,
                banios, garage, terraza, direccion,estado} = req.body;
            const result = await properties.updatePropertie(id,titulo, precio, descripcion, tipo,
                area, habitaciones, banios, garage, terraza, direccion,estado);
            console.log("UPDATE:", result);
            res.status(200).json({"msg": "Propiedad actualizada correctamente"});
        } catch (ex) {
            console.log("Error:", ex);
            res.status(500).json({error:"Error al actualizar propiedad"});
        }
        });

export default router;