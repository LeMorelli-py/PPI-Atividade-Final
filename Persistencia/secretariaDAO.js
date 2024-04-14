import conectar from "./conexao.js";
import Secretarias from "../Modelos/secretaria.js"; 

export default class secretariaDAO {
  async gravar(secretaria) {
    if (secretaria instanceof Secretarias) {
      const conexao = await conectar();
      const sql = `INSERT INTO secretaria (setor, nome_secretaria, titular, cpf) 
                   VALUES (?, ?, ?, ?)`;
      const parametros = [
        secretaria.setor,
        secretaria.nome_secretaria,
        secretaria.titular,
        secretaria.cpf,
      ];
      const resultados = await conexao.execute(sql, parametros);
      secretaria.id = resultados.insertId;     }
  }

     async atualizar(secretaria) {
  if (secretaria instanceof Secretarias) {
    try {
      const conexao = await conectar();
      const sql = `UPDATE secretaria SET setor = ?, nome_secretaria = ?,
                   titular = ?, cpf = ? WHERE id = ?`;
      const parametros = [
        secretaria.setor,
        secretaria.nome_secretaria,
        secretaria.titular,
        secretaria.cpf,
        secretaria.id 
      ];

      await conexao.execute(sql, parametros);
    } catch (error) {
      console.error('Error updating secretaria:', error);
          }
  }
}

async excluir(secretaria) {
  if (secretaria instanceof Secretarias) {
    try {
      const conexao = await conectar();
      const sql = `DELETE FROM secretaria WHERE titular = ?`;
      const parametros = [secretaria.titular];
      await conexao.execute(sql, parametros);
      console.log("Secretaria deleted successfully");
    } catch (error) {
      console.error("Error deleting secretaria:", error);
    }
  }
}


    
    async consultar(termoDePesquisa){
        let sql = "SELECT * FROM secretaria";
        const conexao = await conectar();
        let parametros = [];
        if (termoDePesquisa === undefined){
            termoDePesquisa = "";
        }
        if (termoDePesquisa !== ''){
            sql = `SELECT * FROM secretaria WHERE titular LIKE ?`;
            parametros = [`%${termoDePesquisa}%`];
        }
        else{ 
            sql = `SELECT * FROM secretaria WHERE id = ?`;
            parametros = [termoDePesquisa];
        }


        let [registros] = await conexao.execute(sql,parametros);
        let listasecretaria = [];
        for (const registro of registros){
            const secretaria = new Secretarias(
                registro.id,
                registro.setor,
                registro.nome_secretaria,
                registro.titular,
                registro.cpf
            );
            listasecretaria.push(secretaria);
        }
        return listasecretaria;
    }
};