import { Router } from "express";
import { singin, postUsuarios } from "../controllers/usuarios";

const router = Router();



router.get('/singin', singin);
router.post('/singup',postUsuarios);



export default router;