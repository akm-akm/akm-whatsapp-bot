const { proto } = require("@adiwajshing/baileys/WAProto");
const path = require("path");
const {
  Curve,
  signedKeyPair
} = require("@adiwajshing/baileys/lib/Utils/crypto");
const {
  generateRegistrationId
} = require("@adiwajshing/baileys/lib/Utils/generics");
const { randomBytes } = require("crypto");
const sql = require(path.join(__dirname, "./ps"));
const fs = require("fs");

const initAuthCreds = () => {
  const identityKey = Curve.generateKeyPair();
  return {
    noiseKey: Curve.generateKeyPair(),
    signedIdentityKey: identityKey,
    signedPreKey: signedKeyPair(identityKey, 1),
    registrationId: generateRegistrationId(),
    advSecretKey: randomBytes(32).toString("base64"),
    processedHistoryMessages: [],
    nextPreKeyId: 1,
    firstUnuploadedPreKeyId: 1,
    accountSettings: {
      unarchiveChats: false
    }
  };
};

const BufferJSON = {
  replacer: (k, value) => {
    if (
      Buffer.isBuffer(value) ||
      value instanceof Uint8Array ||
      value?.type === "Buffer"
    ) {
      return {
        type: "Buffer",
        data: Buffer.from(value?.data || value).toString("base64")
      };
    }

    return value;
  },

  reviver: (_, value) => {
    if (
      typeof value === "object" &&
      !!value &&
      (value.buffer === true || value.type === "Buffer")
    ) {
      const val = value.data || value.value;
      return typeof val === "string"
        ? Buffer.from(val, "base64")
        : Buffer.from(val || []);
    }

    return value;
  }
};

module.exports.useSQLAuthState = async () => {
  const writeData = async (data) => {
    const auth_result = await sql.query("select * from state;");
    const auth_row_count = await auth_result.rowCount;
    if (auth_row_count == 0) {
      const re = await sql.query(
        `INsert INTO state VALUES ('${JSON.stringify(
          data,
          BufferJSON.replacer
        )}')`
      );
      return re;
    } else {
      const re = await sql.query(
        `UPDATE state SET data = '${JSON.stringify(data, BufferJSON.replacer)}'`
      );
      return data;
    }
  };

  const readData = async () => {
    try {
      const re = await sql.query(`SELECT * FROM state`);
      // console.log("re////////////////////////////////////\n", re.rows[0]);
      const d = await re.rows[0].data;
      const data = JSON.stringify(d);

      const r = JSON.parse(data, BufferJSON.reviver);
      fs.writeFileSync(
        path.join(__dirname, "../auth_info_baileys/state.json"),
        r
      );
      console.log("r******************\n", r);
      return r;
    } catch (error) {
      return null;
    }
  };

  const removeData = async () => {
    try {
      await sql.query(`DELETE FROM state`);
    } catch (_a) {}
  };

  const creds = (await readData()) || (0, initAuthCreds)();
  return {
    state: {
      creds,
      keys: {
        get: async (type, ids) => {
          const data = {};
          await Promise.all(
            ids.map(async (id) => {
              let value = await readData(`${type}-${id}`);
              if (type === "app-state-sync-key") {
                value = proto.AppStateSyncKeyData.fromObject(data);
              }
              data[id] = value;
            })
          );
          return data;
        },
        set: async (data) => {
          const tasks = [];
          for (const category of Object.keys(data)) {
            for (const id of Object.keys(data[category])) {
              const value = data[category][id];
              const key = `${category}-${id}`;
              tasks.push(value ? writeData(value, key) : removeData(key));
            }
          }
          await Promise.all(tasks);
        }
      }
    },
    saveCreds: () => {
      return writeData(creds);
    }
  };
};
