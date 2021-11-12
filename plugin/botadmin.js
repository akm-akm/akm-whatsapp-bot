const fs = require("fs");
const path = require("path");

const {
    MessageType
} = require("@adiwajshing/baileys");
const {
    text
} = MessageType;
const sql = require(path.join(__dirname, "../utils/ps"));
const owner = (Infor, client) => new Promise(async (resolve, reject) => {
    const from = Infor.from;
    const arg = Infor.arg;
    if (Infor.number !== process.env.OWNER_NUMBER) {
        client.sendMessage(from, Infor.mess.only.ownerB, text, {
            quoted: Infor.reply,
        });
        resolve()
        return;
    }
    switch (arg[0]) {


        case "xxxx":
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
                quoted: Infor.reply,
                detectlink: false
            });
            setTimeout(() => {

                process.exit(1)

            }, 1000);
            console.log("Stopped");

            break;




        case 'sql':
            if (arg.length == 1) {
                Infor.arg = ["help", arg[0]]
                help(Infor, client, Infor.reply, 1);
                resolve()
                return
            }
            const cmd = arg.slice(1).join(" ");
            console.log(`Command: ${cmd}`);
            sql.query(cmd).then(result => {
                client.sendMessage(from, JSON.stringify(result.rows, null, "\t"), text, {
                    quoted: Infor.reply,
                }).catch(err => {
                    client.sendMessage(from, Infor.mess.error.error, text, {
                        quoted: Infor.reply,
                        detectLinks: false
                    });
                });
                resolve();
            })
            break;





        case "rst":
            sql.query('UPDATE groupdata SET totalmsgtoday=0;')
            sql.query('UPDATE botdata SET totalmsgtoday=0;')
            sql.query('UPDATE messagecount SET totalmsgtoday=0,dailylimitover=false;')
            client.sendMessage(from, Infor.mess.success, text, {
                quoted: Infor.reply,
            });
            resolve();
            break;





        case "dul":
            if (arg.length == 1) {
                Infor.arg = ["help", arg[0]]
                help(Infor, client, Infor.reply, 1);
                resolve()
                return
            }

            if (typeof arg[1] === 'number' && arg[1] < 0 || arg[1] > 1000) {
                client.sendMessage(from, '🤖 ```Enter a valid integer to be set as daily user limit.```', text, {
                    quoted: Infor.reply,
                });
                resolve();
                return;
            }
            sql.query(`update botdata set dailylimit = '${arg[1]}'`).then(result => {
                client.sendMessage(from, Infor.mess.success, text, {
                    quoted: Infor.reply,
                }).catch(err => {
                    client.sendMessage(from, Infor.mess.error.error, text, {
                        quoted: Infor.reply,
                    });
                })
                resolve();
            })

            break;






        case "mgs":
            if (arg.length == 1) {
                Infor.arg = ["help", arg[0]]
                help(Infor, client, Infor.reply, 1);
                resolve()
                return
            }
            if (typeof arg[1] === 'number' && arg[1] < 0 || arg[1] > 256) {
                client.sendMessage(from, '🤖 ```Enter a valid integer to be set as daily limit.```', text, {
                    quoted: Infor.reply,
                });
                resolve();
                return;
            }
            sql.query(`update botdata set mingroupsize = '${arg[1]}'`).then(result => {
                client.sendMessage(from, Infor.mess.success, text, {
                    quoted: Infor.reply,
                }).catch(err => {
                    client.sendMessage(from, Infor.mess.error.error, text, {
                        quoted: Infor.reply,
                    });
                })
                resolve();
            })
            break;







        case "dgl":
            if (arg.length == 1) {
                Infor.arg = ["help", arg[0]]
                help(Infor, client, Infor.reply, 1);
                resolve()
                return
            }
            if (typeof arg[1] !== 'number' && arg[1] < 0 || arg[1] > 1000) {
                client.sendMessage(from, '🤖 ```Enter a valid integer to be set as daily group limit.```', text, {
                    quoted: Infor.reply,
                });
                resolve();
                return;
            }
            sql.query(`update botdata set dailygrouplimit = '${arg[1]}'`).then(result => {
                client.sendMessage(from, Infor.mess.success, text, {
                    quoted: Infor.reply,
                }).catch(err => {
                    client.sendMessage(from, Infor.mess.error.error, text, {
                        quoted: Infor.reply,
                    });
                });
                resolve();
            })

            break;




        case "mdr":
            if (arg.length == 1) {
                Infor.arg = ["help", arg[0]]
                help(Infor, client, Infor.reply, 1);
                resolve()
                return
            }
            const z = arg[1].replace('@', '').replace('+', '');
            sql.query(
                `UPDATE botdata SET moderators = array_append(moderators, '${z}');`);
            sql.query(
                `UPDATE groupdata SET banned_users = array_remove(banned_users, '${z}');`
            ).then(result => {
                client.sendMessage(from, Infor.mess.success, text, {
                    quoted: Infor.reply,
                }).catch(err => {
                    client.sendMessage(from, Infor.mess.error.error, text, {
                        quoted: Infor.reply,
                    });
                });
            })
            break;

        case "rmdr":
            if (arg.length == 1) {
                Infor.arg = ["help", arg[0]]
                help(Infor, client, Infor.reply, 1);
                resolve()
                return
            }
            const za = arg[1].replace('@', '').replace('+', '');
            sql.query(
                `UPDATE botdata SET moderators = array_remove(moderators, '${za}');`
            ).then(result => {
                client.sendMessage(from, Infor.mess.success, text, {
                    quoted: Infor.reply,
                }).catch(err => {
                    client.sendMessage(from, Infor.mess.error.error, text, {
                        quoted: Infor.reply,
                    });
                });
            })
            break;











        case "rtrt":
            await client.sendMessage(from, '🤖 ```Restarting```', text, {
                quoted: Infor.reply,
            });
            process.exit(1);
            break;


        default:
            break;
    }

})

module.exports.owner = owner;