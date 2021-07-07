const path = require('path');
const sql = require(path.join(__dirname, "./snippets/ps"));
from ='918222015789-1606030315@g.us'
ban='7867868768769'
sql.query(`SELECT banned_users FROM groupdata WHERE groupid = '${from}';`).then((result) =>{
 console.log(result.rows[0].banned_users)
 sql.query(`UPDATE groupdata SET banned_users = array_append(banned_users, '${ban}') where groupid = '${from}';`);
});
//console.log(result.rows[0].banned_users.includes('10000'));
//sql.query(`UPDATE groupdata SET banned_users = array_append(ARRAY${} `
sql.query(`UPDATE groupdata SET banned_users = array_remove(banned_users, '${ban}') where groupid = '${from}';`);
