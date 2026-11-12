// Übungsdatenbank für SQL-Aufgaben (wird im Browser mit sql.js/SQLite ausgeführt)
window.FABI_DATA = window.FABI_DATA || { topics: [], questions: [] };
FABI_DATA.sqlDb = `
CREATE TABLE abteilung (
  abt_id   INTEGER PRIMARY KEY,
  name     TEXT NOT NULL,
  standort TEXT NOT NULL
);
CREATE TABLE mitarbeiter (
  ma_id    INTEGER PRIMARY KEY,
  vorname  TEXT NOT NULL,
  nachname TEXT NOT NULL,
  abt_id   INTEGER REFERENCES abteilung(abt_id),
  gehalt   INTEGER NOT NULL,
  eintritt TEXT NOT NULL
);
CREATE TABLE geraet (
  geraet_id  INTEGER PRIMARY KEY,
  typ        TEXT NOT NULL,
  hersteller TEXT NOT NULL,
  preis      REAL NOT NULL,
  kaufdatum  TEXT NOT NULL,
  ma_id      INTEGER REFERENCES mitarbeiter(ma_id)
);
CREATE TABLE ticket (
  ticket_id  INTEGER PRIMARY KEY,
  geraet_id  INTEGER NOT NULL REFERENCES geraet(geraet_id),
  erstellt   TEXT NOT NULL,
  prioritaet TEXT NOT NULL,
  status     TEXT NOT NULL
);

INSERT INTO abteilung VALUES
 (1,'IT','Köln'),(2,'Vertrieb','Köln'),(3,'Einkauf','Bonn'),(4,'Personal','Bonn'),(5,'Marketing','Düsseldorf');

INSERT INTO mitarbeiter VALUES
 (1,'Lena','Schmidt',1,4200,'2019-04-01'),
 (2,'Jonas','Becker',1,3900,'2021-08-15'),
 (3,'Mia','Wagner',2,3600,'2018-01-10'),
 (4,'Paul','Hoffmann',2,3100,'2022-03-01'),
 (5,'Emma','Koch',3,3400,'2020-06-01'),
 (6,'Noah','Richter',4,3800,'2017-09-01'),
 (7,'Sofia','Klein',1,5100,'2015-02-01'),
 (8,'Elias','Wolf',2,2900,'2023-07-01'),
 (9,'Hanna','Neumann',3,3550,'2021-11-15'),
 (10,'Ben','Schulz',NULL,2600,'2024-01-08');

INSERT INTO geraet VALUES
 (1,'Notebook','Lenovo',1150.00,'2022-05-10',1),
 (2,'Notebook','Dell',1290.00,'2023-02-20',2),
 (3,'Monitor','Dell',230.00,'2022-05-10',1),
 (4,'Notebook','HP',980.00,'2021-09-01',3),
 (5,'Smartphone','Samsung',640.00,'2023-06-12',3),
 (6,'Notebook','Lenovo',1150.00,'2022-08-30',4),
 (7,'Drucker','HP',420.00,'2020-03-15',NULL),
 (8,'Monitor','LG',260.00,'2023-02-20',2),
 (9,'Smartphone','Apple',999.00,'2024-01-15',7),
 (10,'Notebook','Apple',2199.00,'2024-01-15',7),
 (11,'Monitor','Dell',230.00,'2021-09-01',5),
 (12,'Notebook','Dell',1290.00,'2023-10-05',6),
 (13,'Server','Fujitsu',4800.00,'2021-01-20',NULL),
 (14,'Smartphone','Samsung',640.00,'2023-06-12',8);

INSERT INTO ticket VALUES
 (1,1,'2024-02-01','hoch','geschlossen'),
 (2,4,'2024-02-03','mittel','offen'),
 (3,4,'2024-03-11','hoch','offen'),
 (4,7,'2024-03-15','niedrig','geschlossen'),
 (5,13,'2024-04-02','hoch','in Bearbeitung'),
 (6,2,'2024-04-20','mittel','geschlossen'),
 (7,13,'2024-05-05','hoch','offen'),
 (8,9,'2024-05-18','niedrig','offen'),
 (9,6,'2024-06-01','mittel','in Bearbeitung'),
 (10,4,'2024-06-07','niedrig','geschlossen'),
 (11,12,'2024-06-21','hoch','offen'),
 (12,7,'2024-07-02','mittel','offen');
`;
