const moment = require ('moment');
const path = require('path');

module.exports = function(app, database){
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, 'views', 'index.html'));
    });

    app.get('/get-todos', function (req, res) {
        database.query(
            `SELECT * FROM todos`,           
            
            function(error, results, fields){

                if (error) throw error;

                console.log('HOME PAGE', results);

                res.send(results);
            });
    });

    app.get('/todo/:id', function (req, res){
        let id = req.params.id;
        database.query(
            `SELECT * FROM todos
            WHERE id=${id}`,
            
            function(error, results, fields){

            if (error) throw error;

            res.send(results);
            
        });
    });

    app.post('/todo-update', function (req, res){
        let id = req.body.id;
        let done = req.body.done;
        database.query(`
        UPDATE todos SET done=${done}
        WHERE id=${id}`,
        function (error, results, fields){
            
            if (error) throw error;

            res.send(results);
        });
    });

    // this is going to be the last one in the last video. CHANGE TO THE ONE YAIR SENT ME. TO BE CHECK
    app.delete('/delete-todo', function (req, res) {
        let id = req.body.id;
        database.query(
            `DELETE FROM todos WHERE id = ${id};`,
            function (error, results, fields) {

                if (error) throw error;

                console.log('results: ', results);

                res.send(results)
            });
    });

    app.put('/create-todo', function (req, res){
        let text = req.body.text;
        let created = moment().format("YYYY-MM-DD HH:mm Z");
        database.query(
            `INSERT INTO todos (text, created)
            VALUES (${text}, '${created}')`,
            
            function(error, results, fields){

            if (error) throw error;

            res.send(results);
            
        });
    });

};



