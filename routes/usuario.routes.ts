import { Router } from "express";
import { singin, postUsuarios } from "../controllers/usuarios";

const router = Router();

router.post('/singin', singin);
router.post('/singup', postUsuarios);



export default router;