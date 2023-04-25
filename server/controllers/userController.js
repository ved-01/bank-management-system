const mysql = require('mysql');
const { use } = require('../routes/user');


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
exports.loginpage = (req, res) => {
    res.render('login',{ layout: 'loginlayout' });
}

exports.cardspage = (req, res) => {
    res.render('cards',{ layout: 'cardslayout' });
}
exports.dashboardpage = (req, res) => {
    // res.render('dashboard',{ layout: 'dashboardlayout' });
    if (req.session.user) {
        // render the dashboard page with the user's details
        // res.render('dashboard', { layout: 'dashboardlayout' });
        res.render('dashboard', { layout: 'dashboardlayout', user: req.session.user });
      } else {
        // redirect to login page if not logged in
        res.redirect('/');
     }
}

exports.loanspage = (req, res) => {
    res.render('loans',{ layout: 'loanslayout' });
}
exports.profilepage = (req, res) => {
    res.render('profile',{ layout: 'profilelayout' });
}
exports.subscriptionspage = (req, res) => {
    res.render('subscriptions',{ layout: 'subscriptionslayout' });
}
exports.supportpage = (req, res) => {
    res.render('support',{ layout: 'supportlayout' });
}
exports.transactionspage = (req, res) => {
    res.render('transactions',{ layout: 'transactionslayout' });
}
exports.adminpage = (req, res) => {
    res.render('admin',{ layout: 'adminlayout' });
}

exports.create = (req,res) => {
    const { name, username, contact_no, password} = req.body;
    
        pool.getConnection((err, Connection) =>{
            if(err) throw err; //not connected
            console.log('Connected as ID' + Connection.threadId);
    
            let searchTerm = req.body.search; //search is the actual input from user
            
            Connection.query('INSERT INTO account_holder SET name = ?, username = ?, contact_no = ?, password = ?',[ name, username, contact_no, password] ,(err, rows) =>{
                Connection.release();
    
                if(!err){
                    res.render('home', {
                    });
                } else{
                    console.log(err);
                }
    
                // console.log('The data from user table: \n', rows);
            });
        });
    }

    exports.login = (req, res) => {
        const { username, password } = req.body;
      
        // get a connection from the pool
        pool.getConnection((err, connection) => { 
          if (err) throw err; // not connected
      
          connection.query('SELECT * FROM account_holder WHERE username = ? AND password = ?', [username, password], (err, rows) => {
            connection.release();
      
            if (!err) {
              if (rows.length > 0) {
                // user found, set session and redirect to dashboard
                req.session.user = rows[0];
                res.redirect('/dashboard');
              } else {
                // user not found or password didn't match
                res.render('login', { layout: 'loginlayout', error: 'Invalid username or password', alert: 'Invalid username or password' });
              }
            } else {
              console.log(err);
              res.render('login', { layout: 'loginlayout', error: 'Something went wrong. Please try again later.' });
            }
          });
        });
      };
      
    
    // exports.login = (req, res) => {
    //     const { username, password } = req.body;
      
    //     pool.getConnection((err, connection) => {
    //       if (err) throw err; //not connected
    //       console.log('Connected as ID ' + connection.threadId);
      
    //       connection.query('SELECT * FROM account_holder WHERE LOWER(username) = LOWER(?)', [username], (err, rows) => {
    //         connection.release();
      
    //         if (rows.length > 0 && rows[0].password === password) {
    //           // user found, set session and redirect to dashboard
    //           req.session.user = rows[0];
    //           res.redirect('/dashboard', {layout: 'dashboardlayout'});
    //         } else {
    //           // user not found or password didn't match
    //           res.send('Invalid username or password');
    //         }
      
    //         if (err) {
    //           console.log(err);
    //         }
      
    //       });
    //     });
    //   };
      
    exports.register = (req,res) => {
        const { name, username, contact_no, password} = req.body;
        
            pool.getConnection((err, Connection) =>{
                if(err) throw err; //not connected
                console.log('Connected as ID' + Connection.threadId);
        
                let searchTerm = req.body.search; //search is the actual input from user
                
                Connection.query('INSERT INTO account_holder SET name = ?, username = ?, contact_no = ?, password = ?',[ name, username, contact_no, password] ,(err, rows) =>{
                    Connection.release();
        
                    if(!err){
                        res.render('login', { layout: 'loginlayout'
                        });
                    } else{
                        console.log(err);
                    }
        
                    // console.log('The data from user table: \n', rows);
                });
            });
        }