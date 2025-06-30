const db = LswVolatileDatabase.create();

await db.loadDatabase();

assert.as("~.select() seems to work (1)").that(db.select("tipo1").length === 0);
assert.as("~.select() seems to work (2)").that(db.select("tipo2").length === 0);
assert.as("~.select() seems to work (3)").that(db.select("tipo3").length === 0);

db.insert("tipo1", { a:10, b:8, c:3 });
db.insert("tipo2", { a:10, b:8, c:3 });
db.insert("tipo3", { a:10, b:8, c:3 });

assert.as("~.insert() seems to work (1)").that(db.select("tipo1").length === 1);
assert.as("~.insert() seems to work (2)").that(db.select("tipo2").length === 1);
assert.as("~.insert() seems to work (3)").that(db.select("tipo3").length === 1);

const ids1 = db.bulk("tipo1", [{ a:10, b:8, c:3 }, { a:10, b:8, c:3 }, { a:10, b:8, c:3 }, { a:10, b:8, c:3 }]);
const ids2 = db.bulk("tipo2", [{ a:10, b:8, c:3 }, { a:10, b:8, c:3 }, { a:10, b:8, c:3 }, { a:10, b:8, c:3 }]);
const ids3 = db.bulk("tipo3", [{ a:10, b:8, c:3 }, { a:10, b:8, c:3 }, { a:10, b:8, c:3 }, { a:10, b:8, c:3 }]);

assert.as("~.bulk() seems to work (1)").that(db.select("tipo1").length === 5);
assert.as("~.bulk() seems to work (2)").that(db.select("tipo2").length === 5);
assert.as("~.bulk() seems to work (3)").that(db.select("tipo3").length === 5);

db.update("tipo1", row => row.id === ids1[0], {d: 20, b: 16 });
db.update("tipo2", row => row.id === ids2[1], {d: 20, b: 16 });
db.update("tipo3", row => row.id === ids3[2], {d: 20, b: 16 });

const rows1 = db.select("tipo1", row => row.id === ids1[0]);
const rows2 = db.select("tipo2", row => row.id === ids2[1]);
const rows3 = db.select("tipo3", row => row.id === ids3[2]);

assert.as("~.update() seems to work (1.1)").that(rows1[0].b === 16);
assert.as("~.update() seems to work (1.2)").that(rows1[0].d === 20);
assert.as("~.update() seems to work (2.1)").that(rows2[0].b === 16);
assert.as("~.update() seems to work (2.2)").that(rows2[0].d === 20);
assert.as("~.update() seems to work (3.1)").that(rows3[0].b === 16);
assert.as("~.update() seems to work (3.2)").that(rows3[0].d === 20);

db.delete("tipo1", ids1[0]);
db.delete("tipo2", ids2[1]);
db.delete("tipo3", ids3[2]);

const rows4 = db.select("tipo1", row => row.id === ids1[0]);
const rows5 = db.select("tipo2", row => row.id === ids2[1]);
const rows6 = db.select("tipo3", row => row.id === ids3[2]);

assert.as("~.delete() seems to work (1.1)").that(rows4.length === 0);
assert.as("~.delete() seems to work (2.1)").that(rows5.length === 0);
assert.as("~.delete() seems to work (3.1)").that(rows6.length === 0);

window.vdb = db;