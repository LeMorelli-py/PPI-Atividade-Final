//Rota é uma micro aplicação express que se encarrega de processar
//requisições em um determinado endpoint
//Por exemplo: http://localhost:4000/secretarias  <-- cliente é um endpoint
//            domínio da aplicação   endpoint 

import { Router } from 'express';
import secretariaCtrl from '../Controles/secretariaCtrl.js';

const rotaSecretaria = new Router();
const secCtrl = new secretariaCtrl();

rotaSecretaria
.get('/', secCtrl.consultar)
.get('/:termo', secCtrl.consultar)  //atribuindo a função consultar como parâmetro do que executar quando receber um método get na rota
.post('/', secCtrl.gravar)
.put('/:codigo', secCtrl.atualizar)
.patch('/:codigo', secCtrl.atualizar)
.delete('/:codigo', secCtrl.excluir);


export default rotaSecretaria;