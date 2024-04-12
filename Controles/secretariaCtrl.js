import Secretarias from "../Modelos/secretaria.js";
export default class SecretariaCtrl{


    //Esta Classe terá a responsabilidade de traduzir pedidos HTTP em 
    //comandos internos da aplicação
    //A nossa aplicação sabe gravar, atualizar, excluir e consultar clientes 
    //no banco de dados

    //Será necessário manipular requisições HTTP
    //Requisições HTTP (GET, POST, PUT ou PATCH, DELETE)

    //Camada de controle será síncrona, então iremos resolver os métodos assíncronos (promises)

    gravar(requisicao, resposta){

        //prepar o método gravar para produzir respostas no formato JSON
        resposta.type('application/json');

        //HTTP gravar um cliente é enviar uma requisição do tipo POST
        //trazendo dados no formato JSON
        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body; //extrair dados do corpo da requisição
            const setor = dados.setor;
            const nome_secretaria = dados.nome_secretaria;
            const titular = dados.titular;
            const cpf = dados.cpf;

            //pseudo validação nos dados
            if (setor && nome_secretaria && titular && cpf){
                const secretaria = new Secretarias(0, setor, nome_secretaria, titular, cpf);
                console.log("Gravando a secretaria " + secretaria.nome_secretaria);
                secretaria.gravar().then(()=>{
                    resposta.status(201);
                    resposta.json({
                        "status":true,
                        "mensagem": "secretaria gravada com sucesso!",
                        "codigo_secretaria": secretaria.id
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
            const dados = requisicao.body; //extrair dados do corpo da requisição
            //o código será extraído da url, exemplo: http://localhost:3000/secretaria/1  1 é o código
            const codigo = requisicao.params.codigo;
            const setor = dados.setor;
            const nome_secretaria = dados.nome_secretaria;
            const titular = dados.titular;
            const cpf = dados.cpf;
            if (codigo && codigo > 0 && setor && nome_secretaria && titular && cpf)
            {
                const secretaria = new Secretarias(codigo, setor,  nome_secretaria,  titular,  cpf);
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
            //o código do secretaria que será excluído será extraído da url
            const codigo = requisicao.params.codigo;
            if (codigo && codigo > 0){
                const secretaria = new Secretarias(codigo);
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
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe o código do secretaria que deseja excluir, conforme documentação da API"
                })
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método DELETE para excluir uma secretaria!"
            })
        }
    }

    consultar(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === "GET"){
            const termoDePesquisa = requisicao.params.termo;
            const secretaria = new Secretarias(0);
            secretaria.consultar(termoDePesquisa)
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