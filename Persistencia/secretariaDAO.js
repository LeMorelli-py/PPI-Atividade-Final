import conectar from "./conexao.js";
import Secretarias from "../Modelos/secretaria.js";//DAO - Data Access Object

export default class secretariaDAO{
    async gravar(secretaria){
        if (secretaria instanceof Secretarias){
            const conexao = await conectar();
            const sql = `INSERT INTO secretaria (setor, nome_secretaria, titular, cpf) 
                         values (?, ?, ?, ?)`;
            const parametros = [
                secretaria.setor,
                secretaria.nome_secretaria,
                secretaria.titular,
                secretaria.cpf
            ];
            const [resultados, campos] = await conexao.execute(sql,parametros);
            //funcionalidade interessante oferecida pela biblioteca mysql2
            secretaria.id = resultados.insertId; //recupera o id gerado pelo banco de dados
            return secretaria;
        }
    }

    async atualizar(secretaria){
        if (secretaria instanceof Secretarias){
            const conexao = await conectar();
            const sql = `UPDATE secretaria SET setor = ?, nome_secretaria = ?,
                         titular = ?, cpf = ? WHERE id = ?`;
            const parametros = [
                secretaria.setor,
                secretaria.nome_secretaria,
                secretaria.titular,
                secretaria.cpf
            ];  

           await conexao.execute(sql,parametros);
           
        }
    }

    async excluir(secretaria){
        if (secretaria instanceof Secretarias){
            const conexao = await conectar();
            const sql = `DELETE FROM secretaria WHERE titular = ?`;
            const parametros = [
                secretaria.cpf
            ]
            await conexao.execute(sql,parametros);
        }
    }

    //termo de pesquisa pode ser o código da secretaria ou ainda o nome
    
    async consultar(termoDePesquisa){
        if (termoDePesquisa === undefined){
            termoDePesquisa = "";
        }
        let sql="";
        if (isNaN(termoDePesquisa)){ //termo de pesquina não é um número
            sql = `SELECT * FROM secretaria WHERE titular LIKE ?`;
            termoDePesquisa= '%' + termoDePesquisa + '%';
        }
        else{
            sql = `SELECT * FROM secretaria WHERE id = ?`;
        }

        const conexao = await conectar();
        const [registros] = await conexao.execute(sql,[termoDePesquisa]);
        //Utilizar os registros encontrados para criar novos objetos do tipo secretaria
        let listaSecretarias = [];
        for (const registro of registros){
            const secretaria = new Secretarias(
                registro.id,
                registro.setor,
                registro.nome_secretaria,
                registro.titular,
                registro.cpf
            );
            listaSecretarias.push(secretaria);
        }
        return listaSecretarias;
    }
}