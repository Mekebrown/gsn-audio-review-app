// /**
//  * Various queries to tables
//  * 
//  * @param {*} conn 
//  * @param {*} task 
//  * @param {*} taskItem 
//  * 
//  * @returns array
//  */
// functio(conn, task, taskItem) {
//     let results = [];

//     switch (task) {
//         case 'create': 
//             createData(conn, taskItem);
//             break;
//         case 'insert': 
//             insertData(conn, taskItem);
//             break;
//         case 'read' :
//             let = readData(conn, taskItem);
//             break;
//         case 'update' :
//             updateData(conn, taskItem);
//             break;
//         case 'delete' :
//             deleteData(conn, taskItem);
//             break;
//         case 'drop': 
//             conn.query(`DROP TABLE IF EXISTS ${taskItem};`, (err, results, fields) => { 
//                 if (err) throw err; 
//                 console.log('Dropped media table if existed.');
//             });
//             break;
//         default:
//             conn.end(function (err) { 
//                 if (err) throw err;
//                 else console.log('Done.');
//             });
//     }

//     return results;
// };

// /**
//  * Create 
//  * 
//  * @param {*} conn 
//  * @param {*} taskItem 
//  * 
//  * @returns void
//  */
// function createData(conn, taskItem) {
//     conn.query('CREATE TABLE ?', [taskItem], (err, results, fields) => {
//         if (err) throw err;
//         console.log('Created media table.');
//     });

//     conn.end(
//         function (err) { 
//             if (err) throw err;
//             else console.log('Closing connection.'); 
//     });
// };

// /**
//  * Insert 
//  * 
//  * @param {*} conn 
//  * @param {*} taskItem 
//  * 
//  * @returns void
//  */
// function insertData(conn, taskItem) {
//     conn.query('INSERT INTO media (name, location) VALUES (?, ?);', [taskItem[0], taskItem[1]], 
//         (err, results, fields) => {
//             if (err) throw err;
//             else console.log('Inserted ' + results.affectedRows + ' row(s).');
//     });

//     conn.end(
//         function (err) { 
//             if (err) throw err;
//             else console.log('Closing connection.'); 
//     });
// };

// /**
//  * Read info from table
//  * 
//  * @param {*} conn 
//  * @param {*} taskItem 
//  * 
//  * @returns array
//  */
// function readData(conn, taskItem) {
//     let tempHolder = [];

//     conn.query('SELECT * FROM media WHERE name = ?', [taskItem], (err, results, fields) => {
//         if (err) throw err;
//         else console.log('Selected ' + results.length + ' row(s).');

//         for (i = 0; i < results.length; i++) {
//             console.log('Row: ' + JSON.stringify(results[i]));
//         }

//         console.log('Done.');

//         tempHolder = results;
//     });

//     conn.end(
//         function (err) { 
//             if (err) throw err;
//             else console.log('Closing connection.'); 
//     });

//     return tempHolder;
// };

// /**
//  * Updating table info
//  * 
//  * @param {*} conn 
//  * @param {*} taskItem 
//  * 
//  * @returns void
//  */
// function updateData(conn, taskItem) {
//     conn.query(`UPDATE media SET quantity = ? WHERE name = ?`, [taskItem[0], taskItem[1]], 
//         function (err, results, fields) {
//             if (err) throw err;
//             else console.log('Updated ' + results.affectedRows + ' row(s).');
//     });

//     conn.end(
//         function (err) { 
//             if (err) throw err;
//             else console.log('Done.');
//     });
// };

// /**
//  * Delete a row with a media name of mediaName
//  * 
//  * @param {*} conn 
//  * @param {*} mediaName 
//  * 
//  * @return void
//  */
// function deleteData(conn, mediaName) {
//     conn.query('DELETE FROM media WHERE name = ?', [mediaName], 
//         function (err, results, fields) {
//             if (err) throw err;
//             else console.log('Deleted ' + results.affectedRows + ' row(s).');
//     });

//     conn.end((err) => {
//         if (err) throw err;
//         else console.log('Done.');
//     });
// };

module.exports = {details};