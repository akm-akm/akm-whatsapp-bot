const fs = require("fs");
const path = require("path");
const mess = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/warningmessages.json"))
);
const {
    MessageType
} = require("@adiwajshing/baileys");
const {
    text
} = MessageType;
const sql = require(path.join(__dirname, "../snippets/ps"));
const owner = (infor, client, xxx) => new Promise(async (resolve, reject) => {

    if (infor.number !== process.env.OWNER_NUMBER) {
      reject()
        return;
    }
    switch (infor.arg[0]) {

        case 'sql':
            let cmd = infor.arg.slice(1).join(" ");
            console.log(`Command: ${cmd}`);
            sql.query(cmd).then(result => {
                client.sendMessage(from, JSON.stringify(result.rows, null, "\t"), text, {
                    quoted: xxx,
                }).catch(err => {
                    client.sendMessage(from, mess.error.error, text, {
                        quoted: xxx,
                    });
                });
                resolve();
            })
            break;
        
        case "dl":
            if (infor.arg.length < 2) {
                client.sendMessage(from, '🤖 ```Enter the number to be set as daily limit.```', text, {
                    quoted: xxx,
                });
                resolve();
                return;
            }
            if (typeof infor.arg[1] === 'number' && infor.arg[1] > 0 && infor.arg[1] < 1000) {
                client.sendMessage(from, '🤖 ```Enter a valid integer to be set as daily limit.```', text, {
                    quoted: xxx,
                });
                resolve();
                return;
            }
            sql.query(`update botdata set dailylimit = '${infor.arg[1]}'`).then(result => {
                client.sendMessage(from, mess.success, text, {
                    quoted: xxx,
                }).catch(err => {
                    client.sendMessage(from, mess.error.error, text, {
                        quoted: xxx,
                    });
                })
                resolve();
            })

            break;
        case "mgs":
            if (infor.arg.length < 2) {
                client.sendMessage(from, '🤖 ```Enter the number to be set as minimum group size.```', text, {
                    quoted: xxx,
                });
                resolve();
                return;
            }
            if (typeof infor.arg[1] === 'number' && infor.arg[1] > 0 && infor.arg[1] < 257) {
                client.sendMessage(from, '🤖 ```Enter a valid integer to be set as daily limit.```', text, {
                    quoted: xxx,
                });
                resolve();
                return;
            }
            sql.query(`update botdata set mingroupsize = '${infor.arg[1]}'`).then(result => {
                client.sendMessage(from, mess.success, text, {
                    quoted: xxx,
                }).catch(err => {
                    client.sendMessage(from, mess.error.error, text, {
                        quoted: xxx,
                    });
                })
                resolve();
            })

            break;

        case "dgl":
            if (infor.arg.length < 2) {
                client.sendMessage(from, '🤖 ```Enter the number to be set as daily user limit.```', text, {
                    quoted: xxx,
                });
                resolve();
                return;
            }
            if (typeof infor.arg[1] === 'number' && infor.arg[1] > 0 && infor.arg[1] < 1000) {
                client.sendMessage(from, '🤖 ```Enter a valid integer to be set as daily user limit.```', text, {
                    quoted: xxx,
                });
                resolve();
                return;
            }
            sql.query(`update botdata set dailygrouplimit = '${infor.arg[1]}'`).then(result => {
                client.sendMessage(from, mess.success, text, {
                    quoted: xxx,
                }).catch(err => {
                    client.sendMessage(from, mess.error.error, text, {
                        quoted: xxx,
                    });
                });
                resolve();
            })

            break;
        
        case "mdr":
            if (infor.arg.length < 2) {
                client.sendMessage(from, '🤖 ```Enter the number with cc to be set as moderator.```', text, {
                    quoted: xxx,
                });
                resolve();
                return;
            }
            z = infor.arg[1];
            sql.query(
                `UPDATE botdata SET moderators = array_append(moderators, '${z}');`
            ).then(result => {
                client.sendMessage(from, mess.success, text, {
                    quoted: xxx,
                }).catch(err => {
                    client.sendMessage(from, mess.error.error, text, {
                        quoted: xxx,
                    });
                });
            })
                break;


        case "restart":
           await client.sendMessage(from, '🤖 ```Restarting```', text, {
                quoted: xxx,
            });
            process.exit(0);


        default:
            break;
    }

})

module.exports.owner = owner;