import { verbose } from "sqlite3";

const db = new (verbose()).Database("minha-database.db");

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS usuarios (id INT, nome TEXT)");

    const stmt = db.prepare("INSERT INTO usuarios VALUES (?, ?)");
    stmt.run(1, "Kippy");
    stmt.run(2, "Woo");

    stmt.finalize();

});

db.close();