import express from 'express';
const router = express.Router();
import {Users} from  '@libs/Users';
import {WithUserRequest} from '@routes/index';


const users = new Users();

router.put('/delete', async (req: WithUserRequest, res) => {
  try {
      const { id } = req.body;
      const result = await users.deleteUser(id);
      console.log("UPDATE:", result);
      res.status(200).json({ "msg": "Usuario eliminado correctamente" });
  } catch (ex) {
      console.log("Error:", ex);
      res.status(500).json({ error: "Error al eliminar propiedad" });
  }
});

router.get('/profile',async (req:WithUserRequest,res) => {
  try {
    const {_id:userId} = req.user;
    const result = await users.getUserbyIndex(userId);
    console.log("user: ",result);
    res.status(200).json(result);
  } catch (ex) {
    console.log("Error:", ex);
    res.status(403).json({error:"Error al obtener usuario"});
  }
});



export default router;
