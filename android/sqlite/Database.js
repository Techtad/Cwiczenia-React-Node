import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("kantor_tadeusz_4ib.db");

class Database {
  static dropTable() {
    db.transaction(tx => {
      tx.executeSql(
        "DROP TABLE `alarms`",
        [],
        (tx, results) => {
          console.log(results);
        },
        (tx, error) => {
          console.log(error);
        }
      );
    });
  }

  static createTable() {
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS `alarms` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `time` TEXT, `weekdays` TEXT, `enabled` BIT(1));",
        [],
        (tx, results) => {
          console.log(results);
        },
        (tx, error) => {
          console.log(error);
        }
      );
    });
  }

  static addAlarm(time, weekdays, enabled) {
    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO `alarms` (`time`, `weekdays`, `enabled`) VALUES (?, ?, ?)",
        [time, JSON.stringify(weekdays), enabled ? 1 : 0],
        (tx, results) => {
          console.log(results);
        },
        (tx, error) => {
          console.log(error);
        }
      );
    });
  }

  static deleteAlarm(id) {
    db.transaction(tx => {
      tx.executeSql(
        "DELETE FROM `alarms` WHERE `id` = ?",
        [id],
        (tx, results) => {
          console.log(results);
        },
        (tx, error) => {
          console.log(error);
        }
      );
    });
  }

  static modifyAlarm(id, time, weekdays, enabled) {
    db.transaction(tx => {
      tx.executeSql(
        "UPDATE `alarms` SET `time` = ?, `weekdays` = ?, `enabled` = ? WHERE `id` = ?",
        [time, JSON.stringify(weekdays), enabled ? 1 : 0, id],
        (tx, results) => {
          console.log(results);
        },
        (tx, error) => {
          console.log(error);
        }
      );
    });
  }

  static getAlarms() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "SELECT * FROM `alarms`",
          [],
          (tx, results) => {
            resolve(results);
          },
          (tx, error) => {
            reject(error);
          }
        );
      });
    });
  }
}

export default Database;
