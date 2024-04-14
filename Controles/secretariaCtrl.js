import Secretarias from "../Modelos/secretaria.js";
import conectar from "../Persistencia/conexao.js";
export default class SecretariaCtrl {

    gravar(requisicao, resposta){
        resposta.type('application/json');
        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body; 
            const setor = dados.setor;
            const nome_secretaria = dados.nome_secretaria;
            const titular = dados.titular;
            const cpf = dados.cpf;

            if (setor && nome_secretaria && titular && cpf){
                const secretaria = new Secretarias(0, setor, nome_secretaria, titular, cpf);
                console.log("Gravando a secretaria " + secretaria.nome_secretaria + " no banco de dados");
                secretaria.gravar().then(()=>{
                    resposta.status(201);
                    resposta.json({
                        "status":true,
                        "mensagem": "secretaria gravada com sucesso!",
                        "id_secretaria": secretaria.id
                    });
                }).catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possível armazenar a secretaria! " + erro.message
                    })
                });
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe todos os dados da secretaria, conforme documentação da API"
                });
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método POST e dados no formato JSON para gravar um secretaria!"
            })
        }
    }

    atualizar(requisicao, resposta){
        resposta.type('application/json');
        if ((requisicao.method === "PATCH" || requisicao.method === "PUT") && requisicao.is('application/json')){
            const dados = requisicao.body; 
            const id = requisicao.params.id;
            const setor = dados.setor;
            const nome_secretaria = dados.nome_secretaria;
            const titular = dados.titular;
            const cpf = dados.cpf;
            if (id && id > 0 && setor && nome_secretaria && titular && cpf)
            {
                const secretaria = new Secretarias(id, setor,  nome_secretaria,  titular,  cpf);
                secretaria.atualizar()
                .then(()=>{
                    resposta.status(200);
                    resposta.json({
                        "status":true,
                        "mensagem": "secretaria atualizada com sucesso!",
                    })
                })
                .catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possível atualizar a secretaria! " + erro.message
                    })
                });
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe todos os dados da secretaria, conforme documentação da API"
                })
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método PATCH, PUT e dados no formato JSON para atualizar um secretaria!"
            })
        }
    }

    excluir(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === "DELETE"){
            const id = requisicao.params.id;
            if (id && id > 0){
                const secretaria = new Secretarias(id);
                secretaria.excluir()
                .then(()=>{
                    resposta.status(200);
                    resposta.json({
                        "status":true,
                        "mensagem": "secretaria excluída com sucesso!",
                    })
                })
                .catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possível excluir a secretaria! " + erro.message
                    })
                })
            }
            else {
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe o código do secretaria que deseja excluir, conforme documentação da API"
                })
            }
        }
        else {
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método DELETE para excluir uma secretaria!"
            })
        }
    }

    async consultar(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === "GET"){
            const termoDePesquisa = requisicao.params.termo;
            const secretaria = new Secretarias(0, "", "", "", "");
            await secretaria.consultar(termoDePesquisa)
            .then((secretaria)=>{
                resposta.status(200);
                resposta.json(secretaria);
            })
            .catch((erro) =>{
                resposta.status(500);
                resposta.json({
                    "status":false,
                    "mensagem": "Não foi possível consultar os secretarias! " + erro.message
                })
            })
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método GET para consultar os secretarias!"
            })
        }
    }
    

}