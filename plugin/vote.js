module.exports = {
    name: "vote",
    usage: "vote <arguments>",
    desc: "Used to vote",
    eg: ["vote startvote", "vote vote", "vote checkvote"],
    group: true,
    owner: false,
    async handle(Bot) {
      const arg = Bot.arg;
      switch (arg[1]) {
        case "startvote":
          if (!isGroup) {
            reply("❌ Group command only!");
            return;
          }
          if (args.length === 0) {
            reply(
              `❌ Give some values seperated with # to vote on like ${prefix}startvote #title #name1 #name2 #name3`
            );
            return;
          }
          votingResult = await getVotingData(from);
          if (votingResult.is_started) {
            reply(
              `❌ Voting already going on, Stop by ${prefix}stopvote command`
            );
            return;
          }
          // let voteChoices = body.trim().replace(/ +/, ",").split(/,/).slice(1);
          let voteList = body
            .trim()
            .replace(/ +/, ",")
            .split(",")[1]
            .split("#");
          let voteTitle = voteList[1].trim();
          let voteChoices = voteList.slice(2);

          if (voteChoices.length < 2) {
            reply("❌ Give more than 1 voting choices!");
            return;
          }

          let voteListCount = new Array(voteChoices.length).fill(0); //[0,0,0]
          let voteListMember = [];
          for (let i = 0; i < voteChoices.length; ++i) voteListMember.push([]);

          await setVotingData(
            from,
            true,
            sender,
            voteTitle,
            voteChoices,
            voteListCount,
            voteListMember,
            []
          );
          votingResult = await getVotingData(from);

          let voteMsg = `*Voting started!*\nsend "${prefix}vote number" to vote\n\n*🗣️ ${voteTitle}*`;

          votingResult.choices.forEach((name, index) => {
            voteMsg += `\n${index + 1} for [${name.trim()}]`;
          });

          voteMsg += `\n\n_send ${prefix}checkvote or ${prefix}cv to see current status and ${prefix}stopvote to stop voting and see the result._`;
          reply(voteMsg);

          break;

        case "vote":
          if (!isGroup) {
            reply("❌ Group command only!");
            return;
          }
          votingResult = await getVotingData(from);
          if (!votingResult.is_started) {
            reply(
              `❌ Voting is not started here, Start by \n${prefix}startvote #title #name1 #name2 #name3`
            );
            return;
          }
          if (votingResult.voted_members.includes(sender)) {
            reply("❌ You already voted.");
            return;
          }
          if (args.length === 0) {
            reply("❌ Give value to vote on!");
            return;
          }

          let voteNumber = Math.floor(Number(args[0]));
          if (isNaN(voteNumber)) {
            reply("❌ Give a number!");
            return;
          }

          if (voteNumber > votingResult.count.length || voteNumber < 1) {
            reply("❌ Number out of range!");
            return;
          }

          votingResult.count[voteNumber - 1] += 1; //increase vote

          let user = conn.contacts[sender];
          let username =
            user.notify || user.vname || user.name || sender.split("@")[0];
          votingResult.members_voted_for[voteNumber - 1].push(username); // save who voted

          votingResult.voted_members.push(sender); //member voted

          await setVotingData(
            from,
            true,
            votingResult.started_by,
            votingResult.title,
            votingResult.choices,
            votingResult.count,
            votingResult.members_voted_for,
            votingResult.voted_members
          );

          reply(
            `_✔ Voted for [${votingResult.choices[voteNumber - 1].trim()}]_`
          );
          break;

        case "stopvote":
        case "checkvote":
        case "cv":
          if (!isGroup) {
            reply("❌ Group command only!");
            return;
          }

          votingResult = await getVotingData(from);
          if (!votingResult.is_started) {
            reply(
              `❌ Voting is not started here, Start by \n${prefix}startvote #title #name1 #name2 #name3`
            );
            return;
          }

          let resultVoteMsg = "";
          if (command === "stopvote") {
            if (votingResult.started_by === sender || isGroupAdmins) {
              await stopVotingData(from);
              resultVoteMsg += `*Voting Result:*\n🗣️ ${votingResult.title}`;
            } else {
              reply(
                "❌ Only admin or that member who started the voting, can stop current voting!"
              );
              return;
            }
          } else {
            resultVoteMsg += `send "${prefix}vote number" to vote\n\n*🗣️ ${votingResult.title}*`;
            votingResult.choices.forEach((name, index) => {
              resultVoteMsg += `\n${index + 1} for [${name.trim()}]`;
            });
            resultVoteMsg += `\n\n*Voting Current Status:*`;
          }

          let totalVoted = votingResult.voted_members.length;

          votingResult.choices.forEach((name, index) => {
            resultVoteMsg += `\n======= ${(
              (votingResult.count[index] / totalVoted) *
              100
            ).toFixed()}% =======\n📛 *[${name.trim()}] : ${
              votingResult.count[index]
            }*\n`;

            //add voted members username
            votingResult.members_voted_for[index].forEach((mem) => {
              resultVoteMsg += `_${mem},_ `;
            });
          });
          sendText(resultVoteMsg);
          break;

      }
  
      // your code here
    },
  };
  
