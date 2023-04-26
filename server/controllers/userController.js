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

exports.adminloginpage = (req, res) => {
    res.render('adminlogin',{ layout: 'employeelayout' });
}

exports.cardspage = (req, res) => {
    res.render('cards',{ layout: 'cardslayout' });
}
// exports.dashboardpage = (req, res) => {
//     // res.render('dashboard',{ layout: 'dashboardlayout' });
//     if (req.session.user) {
//         const username = req.query.username;

//         // render the dashboard page with the user's details
//         // res.render('dashboard', { layout: 'dashboardlayout' });
//         res.render('dashboard', { layout: 'dashboardlayout', user: req.session.user });
//       } else {
//         // redirect to login page if not logged in
//         res.redirect('/');
//      }
// }

exports.dashboardpage = (req, res) => {
    pool.getConnection((err, Connection) => {
        if (err) throw err; // not connected
        console.log('Connected as ID ' + Connection.threadId);

        if (req.session.user) {
            const username = req.query.username;

            // fetch user details from the database based on username
            Connection.query('SELECT * FROM account, account_holder WHERE account.username = account_holder.username and account.username = ?', [username], (error, results) => {
                if (error) throw error;

                const user = results[0];
                
                // calculate net worth by adding balance, credit utilized and investments
                const balance = user.Balance;
                const creditUtilized = Math.floor(balance * (10) + 10000); // generate a random number between 10000 and 100000
                const investments = Math.floor(Math.random() * (5000000 - 1000000 + 1) + 1000000); // generate a random number between 1000000 and 5000000
                const netWorth = balance + investments;
                user.netWorth = netWorth;
                user.investments = investments;
                user.creditUtilized = creditUtilized;

                // render the dashboard page with the user's details
                res.render('dashboard', { layout: 'dashboardlayout', user });
            });

        } else {
            // redirect to login page if not logged in
            res.redirect('/');
        }

        Connection.release(); // release connection back to pool
    });
};


  

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
                res.redirect('/dashboard?username=' + username);
                // res.render('login', {layout: 'loginlayout'})
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

        exports.cardspage = (req, res) => {
            const username = req.query.username;
          
            pool.getConnection((err, Connection) => {
              if (err) throw err; // not connected
              console.log('Connected as ID ' + Connection.threadId);
          
              // fetch user details from the database based on username
              Connection.query(
                'SELECT * FROM account, account_holder WHERE account.username = account_holder.username and account.username = ?',
                [username],
                (error, results) => {
                  if (error) throw error;
          
                  const user = results[0];
          
                  // calculate net worth by adding balance, credit utilized and investments
                //   const balance = user.Balance;
                //   const creditUtilized = Math.floor(Math.random() * (100000 - 10000 + 1) + 10000); // generate a random number between 10000 and 100000
                //   const investments = Math.floor(Math.random() * (5000000 - 1000000 + 1) + 1000000); // generate a random number between 1000000 and 5000000
                //   const netWorth = balance + investments + creditUtilized;
                //   user.netWorth = netWorth;
                //   user.investments = investments;
                //   user.creditUtilized = creditUtilized;
          
                  // render the cards page with the user's details
                  res.render('cards', { layout: 'cardslayout', user });
                }
              );
          
              Connection.release(); // release connection back to pool
            });
          };

          exports.loanspage = (req, res) => {
            const username = req.query.username;
          
            pool.getConnection((err, Connection) => {
              if (err) throw err; // not connected
              console.log('Connected as ID ' + Connection.threadId);
          
              // fetch user details from the database based on username
              Connection.query(
                'SELECT * FROM account join loan WHERE account.username = ? and account.loanID1 = loan.loan_id',
                [username],
                (error, results) => {
                  if (error) throw error;
          
                  const user = results[0];
          
                  // calculate net worth by adding balance, credit utilized and investments
                //   const balance = user.Balance;
                //   const creditUtilized = Math.floor(Math.random() * (100000 - 10000 + 1) + 10000); // generate a random number between 10000 and 100000
                //   const investments = Math.floor(Math.random() * (5000000 - 1000000 + 1) + 1000000); // generate a random number between 1000000 and 5000000
                //   const netWorth = balance + investments + creditUtilized;
                //   user.netWorth = netWorth;
                //   user.investments = investments;
                //   user.creditUtilized = creditUtilized;
          
                  // render the cards page with the user's details
                  res.render('loans', { layout: 'loanslayout', user });
                }
              );
          
              Connection.release(); // release connection back to pool
            });
          };

          exports.subscriptionspage = (req, res) => {
            const username = req.query.username;
          
            pool.getConnection((err, Connection) => {
              if (err) throw err; // not connected
              console.log('Connected as ID ' + Connection.threadId);
          
              // fetch user details from the database based on username
              Connection.query(
                'SELECT * FROM account, account_holder WHERE account.username = account_holder.username and account.username = ?',
                [username],
                (error, results) => {
                  if (error) throw error;
          
                  const user = results[0];
          
                  // calculate net worth by adding balance, credit utilized and investments
                //   const balance = user.Balance;
                //   const creditUtilized = Math.floor(Math.random() * (100000 - 10000 + 1) + 10000); // generate a random number between 10000 and 100000
                //   const investments = Math.floor(Math.random() * (5000000 - 1000000 + 1) + 1000000); // generate a random number between 1000000 and 5000000
                //   const netWorth = balance + investments + creditUtilized;
                //   user.netWorth = netWorth;
                //   user.investments = investments;
                //   user.creditUtilized = creditUtilized;
          
                  // render the cards page with the user's details
                  res.render('subscriptions', { layout: 'subscriptionslayout', user });
                }
              );
          
              Connection.release(); // release connection back to pool
            });
          };

          exports.supportpage = (req, res) => {
            const username = req.query.username;
          
            pool.getConnection((err, Connection) => {
              if (err) throw err; // not connected
              console.log('Connected as ID ' + Connection.threadId);
          
              // fetch user details from the database based on username
              Connection.query(
                'SELECT * FROM account, account_holder WHERE account.username = account_holder.username and account.username = ?',
                [username],
                (error, results) => {
                  if (error) throw error;
          
                  const user = results[0];
          
                  // calculate net worth by adding balance, credit utilized and investments
                //   const balance = user.Balance;
                //   const creditUtilized = Math.floor(Math.random() * (100000 - 10000 + 1) + 10000); // generate a random number between 10000 and 100000
                //   const investments = Math.floor(Math.random() * (5000000 - 1000000 + 1) + 1000000); // generate a random number between 1000000 and 5000000
                //   const netWorth = balance + investments + creditUtilized;
                //   user.netWorth = netWorth;
                //   user.investments = investments;
                //   user.creditUtilized = creditUtilized;
          
                  // render the cards page with the user's details
                  res.render('support', { layout: 'supportlayout', user });
                }
              );
          
              Connection.release(); // release connection back to pool
            });
          };

          exports.transactionspage = (req, res) => {
            const username = req.query.username;
          
            pool.getConnection((err, Connection) => {
              if (err) throw err; // not connected
              console.log('Connected as ID ' + Connection.threadId);
          
              // fetch user details from the database based on username
              Connection.query(
                'SELECT * FROM account, account_holder WHERE account.username = account_holder.username and account.username = ?',
                [username],
                (error, results) => {
                  if (error) throw error;
          
                  const user = results[0];
          
                  // calculate net worth by adding balance, credit utilized and investments
                //   const balance = user.Balance;
                //   const creditUtilized = Math.floor(Math.random() * (100000 - 10000 + 1) + 10000); // generate a random number between 10000 and 100000
                //   const investments = Math.floor(Math.random() * (5000000 - 1000000 + 1) + 1000000); // generate a random number between 1000000 and 5000000
                //   const netWorth = balance + investments + creditUtilized;
                //   user.netWorth = netWorth;
                //   user.investments = investments;
                //   user.creditUtilized = creditUtilized;
          
                  // render the cards page with the user's details
                  res.render('transactions', { layout: 'transactionslayout', user });
                }
              );
          
              Connection.release(); // release connection back to pool
            });
          };

          exports.profilepage = (req, res) => {
            const username = req.query.username;
            console.log("HH")
          
            pool.getConnection((err, Connection) => {
              if (err) throw err; // not connected
              console.log('Connected as ID ' + Connection.threadId);
          
              // fetch user details from the database based on username
              Connection.query(
                'SELECT * FROM account, account_holder WHERE account.username = account_holder.username and account.username = ?',
                [username],
                (error, results) => {
                  if (error) throw error;
          
                  const user = results[0];
          
                  // calculate net worth by adding balance, credit utilized and investments
                //   const balance = user.Balance;
                //   const creditUtilized = Math.floor(Math.random() * (100000 - 10000 + 1) + 10000); // generate a random number between 10000 and 100000
                //   const investments = Math.floor(Math.random() * (5000000 - 1000000 + 1) + 1000000); // generate a random number between 1000000 and 5000000
                //   const netWorth = balance + investments + creditUtilized;
                //   user.netWorth = netWorth;
                //   user.investments = investments;
                //   user.creditUtilized = creditUtilized;
          
                  // render the cards page with the user's details
                  res.render('profile', { layout: 'profilelayout', user });
                }
              );
          
              Connection.release(); // release connection back to pool
            });
          };



        exports.viewallusers = (req, res) => {
            // const username = req.query.username;
            // console.log("h")
        
            pool.getConnection((err, Connection) => {
              if (err) throw err; // not connected
              console.log('Connected as ID- ' + Connection.threadId);
              Connection.query('SELECT account_holder.name, account.Account_No, account.Balance, holder_address.city, holder_address.state, holderid.GovernmentID FROM account JOIN account_holder ON account.username = account_holder.username JOIN holder_address ON account_holder.pincode = holder_address.pincode JOIN holderid ON account.username = holderid.username;',
                (error, results) => {
                  if (error) throw error;
                console.log(results);
                  res.render('admin', { layout: 'adminlayout', results }); // changed rows to results
                }
              );
              Connection.release(); // release connection back to pool
            });
          };
          

        //   exports.transactionspage = (req, res) => {
        //     const username = req.query.username;
          
        //     pool.getConnection((err, Connection) => {
        //       if (err) throw err; // not connected
        //       console.log('Connected as ID ' + Connection.threadId);
          
        //       // fetch user details from the database based on username
        //       Connection.query(
        //         'SELECT * FROM account, account_holder WHERE account.username = account_holder.username and account.username = ?',
        //         [username],
        //         (error, results) => {
        //           if (error) throw error;
          
        //           const user = results[0];
          
        //           // calculate net worth by adding balance, credit utilized and investments
        //         //   const balance = user.Balance;
        //         //   const creditUtilized = Math.floor(Math.random() * (100000 - 10000 + 1) + 10000); // generate a random number between 10000 and 100000
        //         //   const investments = Math.floor(Math.random() * (5000000 - 1000000 + 1) + 1000000); // generate a random number between 1000000 and 5000000
        //         //   const netWorth = balance + investments + creditUtilized;
        //         //   user.netWorth = netWorth;
        //         //   user.investments = investments;
        //         //   user.creditUtilized = creditUtilized;
          
        //           // render the cards page with the user's details
        //           res.render('transactions', { layout: 'transactionslayout', user });
        //         }
        //       );
          
        //       Connection.release(); // release connection back to pool
        //     });
        //   };