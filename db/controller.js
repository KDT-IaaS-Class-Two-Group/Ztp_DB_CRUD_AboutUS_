const Database = require('better-sqlite3');

const db = new Database("./teamZoo.db", { verbose: console.log });

const mainTable = () => {

  const dbCheck = db.prepare(`SELECT COUNT(*) FROM sqlite_master WHERE name = 'member'`);

  const isTrue = dbCheck.get();

  console.log(isTrue)
  if(isTrue > 0){
    return ;
  }else{
    const createDatabaseQuery = db.prepare('CREATE TABLE member (name TEXT PRIMARY KEY, age INTEGER NOT NULL, address TEXT, idealType TEXT, mbti TEXT NOT NULL)');
    createDatabaseQuery.run();
  }

};

const habitTable = () => {
  const createHabitTable = db.prepare('CREATE TABLE habits (name TEXT NOT NULL, Habit TEXT NOT NULL,FOREIGN KEY(name) REFERENCES member(name))')
  createHabitTable.run();
  // const dbCheck = db.prepare(`SELECT COUNT(*) FROM sqlite_master WHERE name = 'habit'`);

  // const isTrue = dbCheck.get();

  // console.log(isTrue)
  // if(isTrue > 0){
  //   return ;
  // }else{
  //   const createDatabaseQuery = db.prepare('CREATE TABLE habit (name TEXT PRIMARY KEY, age INTEGER NOT NULL, address TEXT, idealType TEXT, mbti TEXT NOT NULL)');
  //   createDatabaseQuery.run();
  // }
}
// habitTable();
const characteristic = () =>{
  const characteristicTable = db.prepare('CREATE TABLE characteristic (name TEXT NOT NULL, characteristic TEXT NOT NULL,FOREIGN KEY(name) REFERENCES member(name))')
  characteristicTable.run();
}
characteristic();
const InsertTable = (obj) => {
  
  const {name, age, address, idealType, mbti} = obj;

  const InsertQuery = db.prepare('INSERT INTO member (name, age, mbti) VALUES (?, ?, ?)');

  InsertQuery.run(name, age, mbti);

}

const updateTable = (column, value, key) => {
  let string =  `UPDATE member SET ${column} = ? WHERE name = ?`;
  console.log(string)
  const updateQuery = db.prepare(string);
  updateQuery.run(value, key);
}

const deleteTable = (name) => {
  const deleteQuery = db.prepare(`DELETE FROM member WHERE name = ?`);
  deleteQuery.run(name);
}

const selectTable = (name) => {
  const selectQuery = db.prepare('SELECT * FROM member WHERE name = ?');
  console.log(selectQuery.get(name));

}

let obj = {
  name : "이재영",
  age : "27", 
  address : "동구",
  idealType : "착한사람",
  mbti : "istp"
};

// createTable();/
// InsertTable(obj);
// updateTable('address', '동구', '이재영');
// deleteTable('이재영')

// selectTable('이재영')