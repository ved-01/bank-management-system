const mysql = require('mysql');


//Connection Pool
const pool=mysql.createPool({
    //env file me hai
    connectionLimit:100,
    host: 'localhost',
    user : 'root',
    password : 'Ved@1357',
    database: 'project'

});

exports.view = (req, res) => {
    res.render('home',{ layout: 'main' });
}

exports.create = (req,res) => {
    const { name, username, contact_no} = req.body;
    
        pool.getConnection((err, Connection) =>{
            if(err) throw err; //not connected
            console.log('Connected as ID' + Connection.threadId);
    
            let searchTerm = req.body.search; //search is the actual input from user
            
            Connection.query('INSERT INTO account_holder SET name = ?, username = ?, contact_no = ?',[ name, username, contact_no] ,(err, rows) =>{
                Connection.release();
    
                if(!err){
                    res.render('home', {
                    });
                } else{
                    console.log(err);
                }
    
                console.log('The data from user table: \n', rows);
            });
        });
    }

    exports.login = (req, res) => {
        const { email, password } = req.body;
        const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
        connection.query(sql, [email, password], (error, results) => {
          if (error) throw error;
          if (results.length > 0) {
            const user = results[0];
            // password matched
            req.session.user = user;
            res.redirect('login', { layout: 'login-layout' });
          } else {
            // user not found or password didn't match
            res.send('Invalid email or password');
          }
        });
      }

    exports.loginpage = (req, res) => {
        res.render('login',{ layout: 'loginlayout' });
    }

    exports.cardspage = (req, res) => {
        res.render('cards',{ layout: 'cardslayout' });
    }