import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

let db: Database | null = null;

export async function getDb() {
    if (db) return db;

    const dbPath = path.join(process.cwd(), 'database.db');

    db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    });

    await db.exec(`
    CREATE TABLE IF NOT EXISTS photos (
      id TEXT PRIMARY KEY,
      filename TEXT NOT NULL,
      originalName TEXT NOT NULL,
      title TEXT,
      description TEXT,
      date TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      qrCodeData TEXT
    )
  `);

    return db;
}
