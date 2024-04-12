import express from 'express';
import process from 'process';
import path from 'path';
import session from 'express-session';
import rotaSecretaria from './Rotas/rotaSecretaria.js';
import autenticar from './segurança/autenticar.js';

const host='0.0.0.0'; 
const porta = 3000;  
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true})); 

app.use(session({
    secret: '$&n#@',
     resave: false,
    saveUninitialized: true,
    cookie: {  
         maxAge: 60 * 1000 * 15
    }
 }))
 
 
app.use(express.static(path.join(process.cwd(), 'publico')));
 
app.post('/login', (requisicao, resposta)=>{
    const { usuario, senha } = requisicao.body;
    if (usuario && senha && usuario === 'Leandro' && senha === '0526'){
        requisicao.session.usuarioLogado = true;
        resposta.redirect("/main.html");
    } 
    else{
        resposta.redirect('/login.html');
   }
 })
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.json());
app.use('/secretarias', rotaSecretaria);


app.use(autenticar, express.static(path.join(process.cwd(), 'privado')));

app.use('/controle', rotaSecretaria);
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.listen(porta, host, ()=>{
    console.log(`Servidor escutando em http://${host}:${porta}`);
});
