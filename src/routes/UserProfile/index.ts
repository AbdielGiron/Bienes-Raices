import express from 'express';
const router = express.Router();
import {Users} from  '@libs/Users';
import {WithUserRequest} from '@routes/index';


const users = new Users();

router.put('/update', async (req: WithUserRequest, res) => {
  try {
      const {_id:userId} = req.user;
      const {name, password } = req.body;
      const result = await users.updateUser(userId,name, password);
      console.log("UPDATE:", result);
      res.status(200).json({ "msg": "Usuario actualizado correctamente" });
  } catch (ex) {
      console.log("Error:", ex);
      res.status(500).json({ error: "Error al actualzar usuario" });
  }
});


router.put('/delete', async (req: WithUserRequest, res) => {
  try {

      const {_id:userId} = req.user;
      const result = await users.deleteUser(userId);
      console.log("UPDATE:", result);
      res.status(200).json({ "msg": "Usuario eliminado correctamente" });
  } catch (ex) {
      console.log("Error:", ex);
      res.status(500).json({ error: "Error al eliminar usuario" });
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
