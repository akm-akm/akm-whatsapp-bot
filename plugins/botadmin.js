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
const owner = (infor4, client, xxx3) => new Promise(async (resolve, reject) => {
    let infor5 = { ...infor4 };
    let xxx = { ...xxx3 };

    if (infor5.number !== process.env.OWNER_NUMBER) {
        reject()
        return;
    }
    switch (infor5.arg[0]) {


        case "xxx":
            const buttons = [
                { buttonId: 'stp1', buttonText: { displayText: 'button1' }, type: 1 },
                { buttonId: 'stp1', buttonText: { displayText: 'button2' }, type: 1 },
                { buttonId: 'stp1', buttonText: { displayText: 'button3' }, type: 1 },
            ]
            const buttonMessage = {
                contentText: "```This is a button message```",
                footerText: 'testing',
                buttons: buttons,
                headerType: 1
            }
            client.sendMessage(from, buttonMessage, MessageType.buttonsMessage)

            break;





        case "xstp":
            let data = await sql.query('select * from botdata');
            client.sendMessage(`${process.env.OWNER_NUMBER}@s.whatsapp.net`, "‼️‼️ ```Bot stopped ‼️‼️\nTo start the bot log in the website and click on Start bot button.\n```" + "```" + data.rows[0].boturl + "```", text, {
                quoted: xxx,
                detectlink: false
            });
            setTimeout(() => {
                client.close()
                process.exit(1)
                // client.destroy();
            }, 4000);
            console.log("Stopped");

            break;




        case 'sql':
            let cmd = infor5.arg.slice(1).join(" ");
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
            if (infor5.arg.length < 2) {
                client.sendMessage(from, '🤖 ```Enter the number to be set as daily user limit.```', text, {
                    quoted: xxx,
                });
                resolve();
                return;
            }
            if (typeof infor5.arg[1] === 'number' && infor5.arg[1] > 0 && infor5.arg[1] < 1000) {
                client.sendMessage(from, '🤖 ```Enter a valid integer to be set as daily user limit.```', text, {
                    quoted: xxx,
                });
                resolve();
                return;
            }
            sql.query(`update botdata set dailylimit = '${infor5.arg[1]}'`).then(result => {
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
            if (infor5.arg.length < 2) {
                client.sendMessage(from, '🤖 ```Enter the number to be set as minimum group size.```', text, {
                    quoted: xxx,
                });
                resolve();
                return;
            }
            if (typeof infor5.arg[1] === 'number' && infor5.arg[1] > 0 && infor5.arg[1] < 257) {
                client.sendMessage(from, '🤖 ```Enter a valid integer to be set as daily limit.```', text, {
                    quoted: xxx,
                });
                resolve();
                return;
            }
            sql.query(`update botdata set mingroupsize = '${infor5.arg[1]}'`).then(result => {
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
            if (infor5.arg.length < 2) {
                client.sendMessage(from, '🤖 ```Enter the number to be set as daily group limit.```', text, {
                    quoted: xxx,
                });
                resolve();
                return;
            }
            if (typeof infor5.arg[1] === 'number' && infor5.arg[1] > 0 && infor5.arg[1] < 1000) {
                client.sendMessage(from, '🤖 ```Enter a valid integer to be set as daily group limit.```', text, {
                    quoted: xxx,
                });
                resolve();
                return;
            }
            sql.query(`update botdata set dailygrouplimit = '${infor5.arg[1]}'`).then(result => {
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
            if (infor5.arg.length < 2) {
                client.sendMessage(from, '🤖 ```Enter the number with cc to be set as moderator or tag the user.```', text, {
                    quoted: xxx,
                });
                resolve();
                return;
            }
            z = infor5.arg[1];
            sql.query(
                `UPDATE botdata SET moderators = array_append(moderators, '${z.replace('@', '')}');`
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