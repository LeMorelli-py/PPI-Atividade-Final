import { Router } from 'express';
import secretariaCtrl from '../Controles/secretariaCtrl.js';

const rotaSecretaria = new Router();
const secCtrl = new secretariaCtrl();

rotaSecretaria
.get('/', secCtrl.consultar)
.get('/:termo', secCtrl.consultar)  
.post('/', secCtrl.gravar)
.put('/:id', secCtrl.atualizar)
.patch('/:id', secCtrl.atualizar)
.delete('/:id', secCtrl.excluir);


export default rotaSecretaria;