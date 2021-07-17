const path = require("path");
const sql = require(path.join(__dirname, "../snippets/ps"));


module.exports= async function fetchauth() {
  try{
  auth_result = await sql.query('select * from auth;');
  console.log('Fetching login data')
  auth_row_count = await auth_result.rowCount;
  if (auth_row_count == 0) {
      console.log('No login data found!')
      return [auth_row_count,"0"]
  } else {
      console.log('Login data found!')
      auth_obj = {
          clientID: auth_result.rows[0].clientid,
          serverToken: auth_result.rows[0].servertoken,
          clientToken: auth_result.rows[0].clienttoken,
          encKey: auth_result.rows[0].enckey,
          macKey: auth_result.rows[0].mackey
      }
      return [auth_row_count,auth_obj]
  }
  } catch {
      console.log('Creating table for credentials')
      await sql.query('CREATE TABLE auth(clientID text, serverToken text, clientToken text, encKey text, macKey text);');
      await fetchauth();
  }

}
