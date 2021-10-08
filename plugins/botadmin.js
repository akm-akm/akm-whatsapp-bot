const fs = require("fs");
const path = require("path");
const mess = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/warningmessages.json"))
); const { help } = require(path.join(__dirname, "./help"));

const {
    MessageType
} = require("@adiwajshing/baileys");
const {
    text
} = MessageType;
const sql = require(path.join(__dirname, "../utils/ps"));
const owner = (infor4, client, xxx3) => new Promise(async (resolve, reject) => {
    const infor5 = { ...infor4 };
    const xxx = { ...xxx3 };
    const from = infor5.from;
    const arg = infor5.arg;
    if (infor5.number !== process.env.OWNER_NUMBER) {
        client.sendMessage(from, mess.only.ownerB, text, {
            quoted: xxx,
        });
        resolve()
        return;
    }
    switch (arg[0]) {


        case "xxx":
            const buttons = [
                { buttonId: 'stp1', buttonText: { displayText: 'button1' }, type: 1 },
                { buttonId: 'stp1', buttonText: { displayText: 'button2' }, type: 1 },
                { buttonId: 'stp1', buttonText: { displayText: 'button3' }, type: 1 },
            ]
            const buttonMessage = {
                contentText: "```This is a useless button message in development.```",
                footerText: 'testing',
                buttons: buttons,
                headerType: 1
            }
            client.sendMessage(from, buttonMessage, MessageType.buttonsMessage)

            break;





        case "stp":
            let data = await sql.query('update botdata set isconnected = false;');
            await client.sendMessage(`${process.env.OWNER_NUMBER}@s.whatsapp.net`, "‼️‼️ ```Bot stopped ‼️‼️\nTo start the bot log in the website and click on Start bot button.\n```" + "```" + data.rows[0].boturl + "```", text, {
                quoted: xxx,
                detectlink: false
            });
            setTimeout(() => {

                process.exit(1)

            }, 1000);
            console.log("Stopped");

            break;




        case 'sql':
            if (arg.length == 1) {
                infor5.arg = ["help", arg[0]]
                help(infor5, client, xxx, 1);
                resolve()
                return
            }
            const cmd = arg.slice(1).join(" ");
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





        case "rst":
            sql.query('UPDATE groupdata SET totalmsgtoday=0;')
            sql.query('UPDATE botdata SET totalmsgtoday=0;')
            sql.query('UPDATE messagecount SET totalmsgtoday=0,dailylimitover=false;')
            client.sendMessage(from, mess.success, text, {
                quoted: xxx,
            });
            resolve();
            break;





        case "dul":
            if (arg.length == 1) {
                infor5.arg = ["help", arg[0]]
                help(infor5, client, xxx, 1);
                resolve()
                return
            }

            if (typeof arg[1] === 'number' && arg[1] < 0 || arg[1] > 1000) {
                client.sendMessage(from, '🤖 ```Enter a valid integer to be set as daily user limit.```', text, {
                    quoted: xxx,
                });
                resolve();
                return;
            }
            sql.query(`update botdata set dailylimit = '${arg[1]}'`).then(result => {
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
            if (arg.length == 1) {
                infor5.arg = ["help", arg[0]]
                help(infor5, client, xxx, 1);
                resolve()
                return
            }
            if (typeof arg[1] === 'number' && arg[1] < 0 || arg[1] > 256) {
                client.sendMessage(from, '🤖 ```Enter a valid integer to be set as daily limit.```', text, {
                    quoted: xxx,
                });
                resolve();
                return;
            }
            sql.query(`update botdata set mingroupsize = '${arg[1]}'`).then(result => {
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
            if (arg.length == 1) {
                infor5.arg = ["help", arg[0]]
                help(infor5, client, xxx, 1);
                resolve()
                return
            }
            if (typeof arg[1] !== 'number' && arg[1] < 0 || arg[1] > 1000) {
                client.sendMessage(from, '🤖 ```Enter a valid integer to be set as daily group limit.```', text, {
                    quoted: xxx,
                });
                resolve();
                return;
            }
            sql.query(`update botdata set dailygrouplimit = '${arg[1]}'`).then(result => {
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
            if (arg.length == 1) {
                infor5.arg = ["help", arg[0]]
                help(infor5, client, xxx, 1);
                resolve()
                return
            }
            const z = arg[1].replace('@', '').replace('+', '');
            sql.query(
                `UPDATE botdata SET moderators = array_append(moderators, '${z}');`);
            sql.query(
                `UPDATE groupdata SET banned_users = array_remove(banned_users, '${z}');`
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











        case "rtrt":
            await client.sendMessage(from, '🤖 ```Restarting```', text, {
                quoted: xxx,
            });
            process.exit(1);
            break;


        default:
            break;
    }

})

module.exports.owner = owner;