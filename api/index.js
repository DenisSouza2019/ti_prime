const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');
var cors = require('cors') //  < --------------- IMPORTANTE (rode: npm install --save cors)
const request = require('request');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors()) //  < --------------- IMPORTANTE

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);


const hostname = 'https://alertalicitacao.com.br/api/v1/licitacoesAbertas/';
const token = 'token=abcdefabcdefabcdefabcdefabcdef12'
// request(hostname + '&' + token, (err, res, results) => {
//     res.json();
// })




router.get('/atualiza', (req, res) => {
    let dados

   
     request.get(hostname + '&' + token, function(error, response, body){
        if (error){
            console.error("Erro! " + error);
            return false;
        }
        
        // Transforma os dados em objeto
         dadosAPI = JSON.parse(body);
         dados = dadosAPI;
        console.log(dadosAPI)
        const obitosPorEstado = dadosAPI.valores;
        // Vetor resposavel por salvar cada dado da API MORTALIDADE
        let vals = [];
    
    }); 

    res.send(true);

    

    


    // sql = `SELECT  livros.description,livros.edition,livros.ISBN,livros.pages,livros.price,
    //   livros.pubdate,livros.publisher,livros.title,autores.nameF,autores.nameL,autores.AuthorID
    //   FROM bookdescriptions as livros
    //   INNER JOIN bookauthorsbooks AS bookAutor ON livros.ISBN = bookAutor.ISBN
    //   INNER JOIN bookauthors AS autores ON autores.AuthorID = bookAutor.AuthorID
    //   ORDER BY rand() LIMIT 0,03;`

    // execSQLQuery(sql, res);
})



//*******************FIM****************************** */

//inicia o servidor
app.listen(port);

function execSQLQuery(sqlQry, res) {

    const connection = mysql.createConnection({

        host: 'https://www.db4free.net/phpMyAdmin/',
        user: 'adminprime',
        password: '@Admin123',
        database: 'tiprime',

        //host: 'localhost', user: 'root', password: '',

        //database: 'sandvigbookstore',
        //database: 'livraria',
        port: 3306
    });

    connection.connect(function (err) {
        if (err) {
            console.log("Banco não conectado, alterar string de conexão !");
        } else console.log('API funcionando!');
    });

    connection.query(sqlQry, function (error, results, fields) {
        if (error)
            res.json(error);
        else {
            res.json(results);
        }

        console.log()

        connection.end();
        console.log('executou!');
    });

}