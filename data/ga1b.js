window.FABI_DATA = window.FABI_DATA || { topics: [], questions: [] };
FABI_DATA.topics.push(
  {
    id: "ga1-virtualisierung",
    area: "GA1",
    extra: false,
    title: "Virtualisierung",
    overview: [
      "<b>Typ-1-Hypervisor</b> (Bare Metal) läuft direkt auf der Hardware, <b>Typ-2</b> (Hosted) auf einem Host-Betriebssystem.",
      "VMs erhalten virtuelle Ressourcen: <b>vCPUs</b>, RAM, virtuelle Datenträger und Netzwerkkarten.",
      "<b>Overcommitment</b> bedeutet, mehr virtuelle Ressourcen zu vergeben, als physisch vorhanden sind – bei CPU üblich, bei RAM riskant.",
      "Ein <b>Snapshot</b> ist kein Backup: Er hängt vom Original-Datenträger ab und liegt auf demselben Speicher.",
      "<b>Live-Migration</b> verschiebt laufende VMs ohne Unterbrechung auf einen anderen Host (gemeinsamer Speicher bzw. Storage-Migration nötig)."
    ],
    content: `
<h3>Grundprinzip</h3>
<p>Bei der Virtualisierung abstrahiert ein <b>Hypervisor</b> (Virtual Machine Monitor) die physische Hardware und stellt mehreren <b>virtuellen Maschinen (VMs)</b> isolierte Ressourcen bereit. Jede VM besitzt ein eigenes Gastbetriebssystem. Vorteile: bessere Auslastung der Hardware (Konsolidierung), geringerer Strom- und Platzbedarf, schnelle Bereitstellung, einfache Sicherung und Hochverfügbarkeit.</p>
<h3>Hypervisor-Typen</h3>
<table>
<tr><th>Merkmal</th><th>Typ 1 (Bare Metal)</th><th>Typ 2 (Hosted)</th></tr>
<tr><td>Basis</td><td>direkt auf der Hardware</td><td>auf einem Host-Betriebssystem</td></tr>
<tr><td>Performance</td><td>hoch, geringer Overhead</td><td>geringer, zusätzliche Schicht</td></tr>
<tr><td>Einsatz</td><td>Rechenzentrum, Server</td><td>Test, Entwicklung, Arbeitsplatz</td></tr>
<tr><td>Beispiele</td><td>VMware ESXi, Microsoft Hyper-V, Proxmox VE (KVM), Xen</td><td>VirtualBox, VMware Workstation</td></tr>
</table>
<h3>Ressourcen und Overcommitment</h3>
<ul>
<li><b>vCPU:</b> virtueller Prozessorkern, wird vom Scheduler auf physische Kerne bzw. Threads abgebildet. CPU-Overcommitment (z. B. 4:1) ist üblich, da VMs selten gleichzeitig Volllast haben. Zu viele vCPUs pro VM erhöhen aber die Wartezeit (CPU Ready).</li>
<li><b>RAM:</b> wird fest oder dynamisch zugewiesen. RAM-Overcommitment ist möglich (Ballooning, Memory Sharing, Swapping), führt aber bei Engpässen zu starken Leistungseinbußen. In der Prüfung gilt: RAM für Hypervisor reservieren und nicht überbuchen.</li>
<li><b>Speicher:</b> <i>Thin Provisioning</i> belegt Platz erst bei Nutzung, <i>Thick Provisioning</i> reserviert sofort.</li>
</ul>
<h3>Snapshot vs. Backup</h3>
<p>Ein <b>Snapshot</b> friert den Zustand einer VM zu einem Zeitpunkt ein; Änderungen werden danach in eine Delta-Datei geschrieben. Er ist ideal vor Updates (schnelles Zurückrollen), ersetzt aber <b>kein Backup</b>: Fällt der Datenträger aus, sind Original und Snapshot verloren. Zudem wachsen Delta-Dateien und bremsen die VM. Ein <b>Backup</b> ist eine unabhängige Kopie auf einem anderen Medium (3-2-1-Regel).</p>
<h3>Live-Migration und Cluster</h3>
<p>Bei der <b>Live-Migration</b> (vMotion, Hyper-V Live Migration) wird der Arbeitsspeicher einer laufenden VM schrittweise auf einen anderen Host kopiert, anschließend wird umgeschaltet – ohne spürbare Unterbrechung. Voraussetzung sind meist ein gemeinsamer Speicher (SAN/NAS), kompatible CPUs und ein schnelles Migrationsnetz. So lassen sich Hosts ohne Ausfallzeit warten.</p>
<div class="example"><b>Beispiel:</b> Ein Host hat 256 GB RAM, 16 GB werden für den Hypervisor reserviert. Für VMs stehen 240 GB zur Verfügung. Bei 16 GB pro VM passen ohne RAM-Overcommitment 15 VMs auf den Host. Für Wartung (N+1) muss ein zweiter Host alle VMs zusätzlich aufnehmen können.</div>
<div class="tip"><b>Prüfungstipp:</b> Bei Ressourcenplanung immer Reserve für den Hypervisor und Wachstum einplanen und prüfen, ob bei Ausfall eines Hosts die übrigen die Last tragen können.</div>
`,
    terms: [
      ["Hypervisor", "Software-Schicht, die Hardware-Ressourcen virtualisiert und mehreren virtuellen Maschinen isoliert zur Verfügung stellt."],
      ["Typ-1-Hypervisor", "Bare-Metal-Hypervisor, der direkt auf der Hardware läuft (z. B. VMware ESXi, Hyper-V)."],
      ["Typ-2-Hypervisor", "Hosted-Hypervisor, der als Anwendung auf einem Host-Betriebssystem läuft (z. B. VirtualBox)."],
      ["vCPU", "Virtueller Prozessor einer VM, der vom Hypervisor auf physische Kerne/Threads abgebildet wird."],
      ["Overcommitment", "Vergabe von mehr virtuellen Ressourcen (CPU, RAM, Speicher) als physisch vorhanden sind."],
      ["Snapshot", "Zeitpunktbezogener Zustand einer VM; Änderungen landen in Delta-Dateien. Kein Ersatz für ein Backup."],
      ["Live-Migration", "Verschieben einer laufenden VM auf einen anderen Host ohne Dienstunterbrechung."],
      ["Thin Provisioning", "Virtuelle Festplatte belegt physischen Speicher erst, wenn Daten geschrieben werden."]
    ],
    cards: [
      ["Warum ersetzt ein Snapshot kein Backup?", "Er liegt auf demselben Speicher und hängt von der Basis-Disk ab – fällt diese aus, ist auch der Snapshot verloren."],
      ["Warum ist RAM-Overcommitment riskanter als CPU-Overcommitment?", "Bei RAM-Mangel muss der Hypervisor auslagern (Swapping), was die Leistung massiv einbricht; CPU-Zeit wird dagegen nur zeitlich geteilt."],
      ["Welche Voraussetzungen hat eine Live-Migration typischerweise?", "Gemeinsamer Speicher (oder Storage-Migration), kompatible CPUs, Netzwerkverbindung zwischen den Hosts, gleiche virtuelle Netzwerke."],
      ["Nenne zwei Vorteile der Servervirtualisierung.", "Bessere Hardwareauslastung/Konsolidierung und schnelle Bereitstellung bzw. einfache Hochverfügbarkeit."]
    ]
  },
  {
    id: "ga1-ha",
    area: "GA1",
    extra: false,
    title: "Hochverfügbarkeit & Ausfallkonzepte",
    overview: [
      "<b>RTO</b> = maximal tolerierbare Ausfallzeit, <b>RPO</b> = maximal tolerierbarer Datenverlust (Zeitraum).",
      "Verfügbarkeit = MTBF / (MTBF + MTTR); Ausfallzeit pro Jahr = (1 − Verfügbarkeit) × 8760 h.",
      "Parallele redundante Systeme: A<sub>ges</sub> = 1 − (1 − A)<sup>n</sup>; serielle Systeme: A<sub>ges</sub> = A<sub>1</sub> × A<sub>2</sub> × …",
      "Cluster: <b>aktiv/passiv</b> (Standby übernimmt bei Ausfall) oder <b>aktiv/aktiv</b> (Lastverteilung).",
      "Ein Wiederanlaufplan legt Reihenfolge, Zuständigkeiten und Abhängigkeiten der Wiederherstellung fest."
    ],
    content: `
<h3>Kennzahlen</h3>
<ul>
<li><b>RTO (Recovery Time Objective):</b> Zeit, innerhalb derer ein Dienst nach einem Ausfall wieder laufen muss.</li>
<li><b>RPO (Recovery Point Objective):</b> maximal zulässiger Datenverlust, gemessen als Zeitraum seit der letzten Sicherung. Bei täglichem Backup um 22 Uhr beträgt der RPO bis zu 24 Stunden.</li>
<li><b>MTBF (Mean Time Between Failures):</b> mittlere Betriebszeit zwischen zwei Ausfällen.</li>
<li><b>MTTR (Mean Time To Repair):</b> mittlere Reparatur- bzw. Wiederherstellungszeit.</li>
</ul>
<p><b>Verfügbarkeit A = MTBF / (MTBF + MTTR)</b>. Ein Jahr hat 365 × 24 = <b>8760 Stunden</b>.</p>
<table>
<tr><th>Verfügbarkeit</th><th>Ausfallzeit pro Jahr</th></tr>
<tr><td>99 %</td><td>87,6 h (ca. 3,65 Tage)</td></tr>
<tr><td>99,9 %</td><td>8,76 h</td></tr>
<tr><td>99,99 %</td><td>ca. 52,6 min</td></tr>
<tr><td>99,999 %</td><td>ca. 5,26 min</td></tr>
</table>
<h3>Redundanz berechnen</h3>
<p>Komponenten in <b>Reihe</b> (alle müssen funktionieren): Verfügbarkeiten multiplizieren, das Gesamtsystem wird schlechter. Komponenten <b>parallel</b> (eine genügt): A<sub>ges</sub> = 1 − (1 − A<sub>1</sub>) × (1 − A<sub>2</sub>), das Gesamtsystem wird besser.</p>
<h3>Cluster und Ausfallkonzepte</h3>
<table>
<tr><th>Konzept</th><th>Funktion</th></tr>
<tr><td>Aktiv/Passiv (Failover)</td><td>Ein Knoten arbeitet, der zweite übernimmt bei Ausfall (Heartbeat). Kurze Umschaltzeit.</td></tr>
<tr><td>Aktiv/Aktiv</td><td>Alle Knoten arbeiten und teilen sich die Last; fällt einer aus, tragen die anderen die gesamte Last.</td></tr>
<tr><td>Cold Standby</td><td>Ersatzsystem ausgeschaltet bzw. nicht konfiguriert, lange Wiederanlaufzeit.</td></tr>
<tr><td>Hot Standby</td><td>Ersatzsystem läuft synchron mit, nahezu sofortige Übernahme.</td></tr>
</table>
<p>Ein <b>Single Point of Failure (SPOF)</b> ist eine Komponente, deren Ausfall das Gesamtsystem lahmlegt (z. B. ein einzelner Switch). HA-Konzepte beseitigen SPOFs durch Redundanz bei Strom, Netz, Speicher und Servern.</p>
<h3>Wiederanlaufplanung</h3>
<p>Der Wiederanlaufplan (Teil des Notfallmanagements nach BSI-Standard 200-4) beschreibt, in welcher Reihenfolge Systeme wieder gestartet werden (z. B. erst Netzwerk, DNS/AD, Datenbank, dann Anwendungsserver), wer zuständig ist und wie die Datenkonsistenz geprüft wird. Er muss regelmäßig getestet werden.</p>
<div class="example"><b>Beispiel:</b> Ein Webshop fordert RTO = 4 h und RPO = 15 min. Ein nächtliches Backup reicht nicht (RPO bis 24 h). Nötig ist z. B. Datenbank-Replikation oder Log-Shipping alle 15 Minuten und ein Failover-Cluster.</div>
<div class="tip"><b>Prüfungstipp:</b> Bei Ausfallzeit-Rechnungen immer 8760 h ansetzen und das Ergebnis ggf. in Minuten umrechnen (× 60).</div>
`,
    terms: [
      ["RTO", "Recovery Time Objective: maximal tolerierbare Zeit bis zur Wiederherstellung eines Dienstes."],
      ["RPO", "Recovery Point Objective: maximal tolerierbarer Datenverlust, angegeben als Zeitraum seit der letzten Sicherung."],
      ["MTBF", "Mean Time Between Failures: mittlere Betriebsdauer zwischen zwei Ausfällen."],
      ["MTTR", "Mean Time To Repair: mittlere Dauer bis zur Behebung eines Ausfalls."],
      ["Verfügbarkeit", "Anteil der Zeit, in der ein System funktionsfähig ist: MTBF / (MTBF + MTTR)."],
      ["Failover-Cluster", "Verbund von Servern, bei dem ein Knoten die Dienste eines ausgefallenen Knotens automatisch übernimmt."],
      ["Single Point of Failure", "Einzelne Komponente, deren Ausfall den Ausfall des Gesamtsystems verursacht."],
      ["Wiederanlaufplan", "Dokument, das Reihenfolge, Verantwortliche und Schritte zur Wiederherstellung nach einem Ausfall festlegt."]
    ],
    cards: [
      ["Wie viele Stunden Ausfall pro Jahr erlaubt eine Verfügbarkeit von 99,9 %?", "0,1 % × 8760 h = 8,76 h."],
      ["Wie berechnet man die Verfügbarkeit zweier parallel redundanter Systeme?", "A = 1 − (1 − A1) × (1 − A2)."],
      ["Unterschied aktiv/passiv vs. aktiv/aktiv?", "Aktiv/passiv: Standby-Knoten übernimmt nur im Fehlerfall. Aktiv/aktiv: alle Knoten bearbeiten gleichzeitig Last."],
      ["Welche Kennzahl wird durch häufigere Backups verbessert – RTO oder RPO?", "Der RPO (geringerer möglicher Datenverlust)."]
    ]
  },
  {
    id: "ga1-algorithmik",
    area: "GA1",
    extra: false,
    title: "Algorithmik & Pseudocode",
    overview: [
      "Pseudocode beschreibt Algorithmen sprachunabhängig mit Sequenz, Verzweigung (WENN) und Schleifen (FÜR, SOLANGE).",
      "Arrays sind in der Prüfung meist <b>0-basiert</b>: Ein Array mit n Elementen hat die Indizes 0 bis n−1.",
      "Logische Operatoren: <code>UND</code>, <code>ODER</code>, <code>NICHT</code>; Vorrang: NICHT vor UND vor ODER.",
      "Typische Fehler: <b>Off-by-one</b>, Endlosschleifen, fehlende Initialisierung.",
      "Die <b>O-Notation</b> beschreibt das Wachstum der Laufzeit, z. B. O(1), O(log n), O(n), O(n²)."
    ],
    content: `
<h3>Kontrollstrukturen</h3>
<ul>
<li><b>Sequenz:</b> Anweisungen werden nacheinander ausgeführt.</li>
<li><b>Verzweigung:</b> <code>WENN Bedingung DANN ... SONST ... ENDE WENN</code></li>
<li><b>Zählschleife:</b> <code>FÜR i = 0 BIS n − 1</code> – Anzahl der Durchläufe steht fest.</li>
<li><b>Kopfgesteuerte Schleife:</b> <code>SOLANGE Bedingung</code> – Bedingung wird vor jedem Durchlauf geprüft (evtl. 0 Durchläufe).</li>
<li><b>Fußgesteuerte Schleife:</b> <code>WIEDERHOLE ... BIS Bedingung</code> – mindestens ein Durchlauf.</li>
</ul>
<h3>Arrays und Indexierung</h3>
<p>Ein Array speichert gleichartige Werte unter fortlaufenden Indizes. Bei 0-basierter Indexierung hat <code>a = [5, 8, 2]</code> die Elemente <code>a[0] = 5</code>, <code>a[1] = 8</code>, <code>a[2] = 2</code>. Ein Zugriff auf <code>a[3]</code> führt zu einem Fehler (Index außerhalb des gültigen Bereichs).</p>
<h3>Operatoren</h3>
<table>
<tr><th>Operator</th><th>Bedeutung</th><th>Beispiel</th></tr>
<tr><td>MOD</td><td>Rest der Ganzzahldivision</td><td>17 MOD 5 = 2</td></tr>
<tr><td>DIV</td><td>Ganzzahldivision</td><td>17 DIV 5 = 3</td></tr>
<tr><td>UND</td><td>wahr, wenn beide wahr</td><td>wahr UND falsch = falsch</td></tr>
<tr><td>ODER</td><td>wahr, wenn mindestens einer wahr</td><td>wahr ODER falsch = wahr</td></tr>
<tr><td>NICHT</td><td>Negation</td><td>NICHT wahr = falsch</td></tr>
</table>
<h3>Fehleranalyse</h3>
<p>Beim <b>Off-by-one-Fehler</b> läuft eine Schleife einmal zu oft oder zu wenig, etwa <code>FÜR i = 0 BIS laenge(a)</code> statt <code>BIS laenge(a) − 1</code>. Ein <b>Schreibtischtest</b> (Trace-Tabelle) hilft: Für jeden Durchlauf werden alle Variablenwerte notiert.</p>
<h3>Laufzeitkomplexität (O-Notation)</h3>
<table>
<tr><th>Klasse</th><th>Beispiel</th></tr>
<tr><td>O(1)</td><td>Zugriff auf ein Array-Element per Index</td></tr>
<tr><td>O(log n)</td><td>Binäre Suche in sortiertem Array</td></tr>
<tr><td>O(n)</td><td>Lineare Suche</td></tr>
<tr><td>O(n log n)</td><td>Mergesort, Quicksort (Durchschnitt)</td></tr>
<tr><td>O(n²)</td><td>Bubblesort, zwei verschachtelte Schleifen über n</td></tr>
</table>
<div class="example"><b>Beispiel:</b> Maximum suchen
<pre>max = a[0]
FÜR i = 1 BIS laenge(a) − 1
  WENN a[i] &gt; max DANN
    max = a[i]
  ENDE WENN
ENDE FÜR</pre>
Die Schleife läuft genau n − 1 Mal, die Laufzeit ist O(n).</div>
<div class="tip"><b>Prüfungstipp:</b> Bei „Welchen Wert hat x?“ immer eine Trace-Tabelle mit allen Variablen anlegen und Schleifengrenzen (inklusive/exklusive) genau prüfen.</div>
`,
    terms: [
      ["Pseudocode", "Sprachunabhängige, strukturierte Beschreibung eines Algorithmus in natürlich-sprachlicher Notation."],
      ["Kopfgesteuerte Schleife", "Schleife, deren Bedingung vor jedem Durchlauf geprüft wird (SOLANGE); kann 0-mal durchlaufen werden."],
      ["Fußgesteuerte Schleife", "Schleife, deren Bedingung nach jedem Durchlauf geprüft wird; läuft mindestens einmal."],
      ["Array", "Datenstruktur mit fester Anzahl gleichartiger Elemente, die über einen Index angesprochen werden."],
      ["Off-by-one-Fehler", "Fehler, bei dem eine Schleife oder ein Index um genau eins zu groß oder zu klein ist."],
      ["MOD", "Modulo-Operator, liefert den Rest einer ganzzahligen Division."],
      ["O-Notation", "Beschreibt, wie die Laufzeit oder der Speicherbedarf eines Algorithmus mit der Eingabegröße n wächst."],
      ["Schreibtischtest", "Manuelles Durchspielen eines Algorithmus mit Notieren aller Variablenwerte (Trace-Tabelle)."]
    ],
    cards: [
      ["Welche Indizes hat ein 0-basiertes Array mit 8 Elementen?", "0 bis 7."],
      ["Welche Laufzeit hat die binäre Suche und welche Voraussetzung gilt?", "O(log n); das Array muss sortiert sein."],
      ["Was ergibt 23 MOD 4?", "3 (23 = 5 × 4 + 3)."],
      ["Welche Rangfolge haben NICHT, UND, ODER?", "NICHT bindet am stärksten, dann UND, dann ODER."]
    ]
  },
  {
    id: "ga1-sql",
    area: "GA1",
    extra: false,
    title: "SQL & relationale Datenbanken",
    overview: [
      "<code>SELECT spalten FROM tabelle WHERE bedingung ORDER BY spalte</code> ist die Grundform jeder Abfrage.",
      "<b>Primärschlüssel</b> identifiziert eine Zeile eindeutig, <b>Fremdschlüssel</b> verweist auf den Primärschlüssel einer anderen Tabelle.",
      "<b>INNER JOIN</b> liefert nur passende Paare, <b>LEFT JOIN</b> zusätzlich alle Zeilen der linken Tabelle (fehlende Werte = NULL).",
      "<b>GROUP BY</b> fasst Zeilen zusammen; Aggregatfunktionen: COUNT, SUM, AVG, MIN, MAX.",
      "<b>WHERE</b> filtert Zeilen vor der Gruppierung, <b>HAVING</b> filtert Gruppen danach."
    ],
    content: `
<h3>Übungsdatenbank</h3>
<p>Alle SQL-Aufgaben laufen gegen folgende SQLite-Datenbank einer Firma:</p>
<table>
<tr><th>Tabelle</th><th>Spalten</th><th>Hinweise</th></tr>
<tr><td><code>abteilung</code></td><td>abt_id (PK), name, standort</td><td>5 Abteilungen (IT, Vertrieb, Einkauf, Personal, Marketing)</td></tr>
<tr><td><code>mitarbeiter</code></td><td>ma_id (PK), vorname, nachname, abt_id (FK → abteilung), gehalt, eintritt</td><td>abt_id kann NULL sein</td></tr>
<tr><td><code>geraet</code></td><td>geraet_id (PK), typ, hersteller, preis, kaufdatum, ma_id (FK → mitarbeiter)</td><td>ma_id kann NULL sein (nicht zugeordnet)</td></tr>
<tr><td><code>ticket</code></td><td>ticket_id (PK), geraet_id (FK → geraet), erstellt, prioritaet, status</td><td>prioritaet: hoch/mittel/niedrig; status: offen/in Bearbeitung/geschlossen</td></tr>
</table>
<h3>Schlüssel</h3>
<p>Der <b>Primärschlüssel (PK)</b> ist eindeutig und nicht NULL. Ein <b>Fremdschlüssel (FK)</b> stellt die Beziehung zwischen Tabellen her und sichert die referentielle Integrität: Es dürfen nur Werte eingetragen werden, die als PK in der referenzierten Tabelle existieren (oder NULL).</p>
<h3>Aufbau einer Abfrage</h3>
<pre>SELECT   spalten / Aggregate
FROM     tabelle
JOIN     andere_tabelle ON bedingung
WHERE    zeilenfilter
GROUP BY gruppierungsspalten
HAVING   gruppenfilter
ORDER BY sortierung [ASC|DESC];</pre>
<p>Logische Ausführungsreihenfolge: FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.</p>
<h3>JOIN-Arten</h3>
<table>
<tr><th>JOIN</th><th>Ergebnis</th></tr>
<tr><td>INNER JOIN</td><td>nur Zeilen mit passendem Partner in beiden Tabellen</td></tr>
<tr><td>LEFT JOIN</td><td>alle Zeilen der linken Tabelle, ohne Partner mit NULL-Werten</td></tr>
<tr><td>RIGHT JOIN</td><td>alle Zeilen der rechten Tabelle</td></tr>
</table>
<p>Mit <code>LEFT JOIN ... WHERE rechts.id IS NULL</code> findet man Datensätze <b>ohne</b> Partner. Vergleiche mit NULL immer mit <code>IS NULL</code>, nie mit <code>= NULL</code>.</p>
<h3>Aggregation</h3>
<ul>
<li><code>COUNT(*)</code> zählt Zeilen, <code>COUNT(spalte)</code> nur Nicht-NULL-Werte.</li>
<li><code>SUM</code>, <code>AVG</code>, <code>MIN</code>, <code>MAX</code> berechnen Werte je Gruppe.</li>
<li>Alle Spalten im SELECT, die nicht aggregiert werden, gehören in <code>GROUP BY</code>.</li>
</ul>
<div class="example"><b>Beispiel:</b> Anzahl Mitarbeiter je Abteilung, nur Abteilungen mit mehr als zwei Mitarbeitern:
<pre>SELECT a.name, COUNT(*) AS anzahl
FROM mitarbeiter m
JOIN abteilung a ON m.abt_id = a.abt_id
GROUP BY a.name
HAVING COUNT(*) &gt; 2;</pre></div>
<div class="tip"><b>Prüfungstipp:</b> Aggregatfunktionen dürfen nicht in WHERE stehen – Bedingungen auf Summen oder Anzahlen gehören in HAVING.</div>
`,
    terms: [
      ["Primärschlüssel", "Attribut(kombination), die jeden Datensatz einer Tabelle eindeutig identifiziert; nicht NULL."],
      ["Fremdschlüssel", "Attribut, das auf den Primärschlüssel einer anderen Tabelle verweist und so eine Beziehung herstellt."],
      ["Referentielle Integrität", "Regel, dass Fremdschlüsselwerte nur auf existierende Primärschlüsselwerte verweisen dürfen."],
      ["INNER JOIN", "Verknüpfung, die nur Datensätze mit passendem Partner in beiden Tabellen liefert."],
      ["LEFT JOIN", "Verknüpfung, die alle Datensätze der linken Tabelle liefert; fehlende Partner werden mit NULL aufgefüllt."],
      ["GROUP BY", "Fasst Zeilen mit gleichen Werten zu Gruppen zusammen, auf die Aggregatfunktionen angewendet werden."],
      ["HAVING", "Filtert Gruppen nach der Gruppierung, typischerweise anhand von Aggregatwerten."],
      ["Aggregatfunktion", "Funktion, die aus mehreren Zeilen einen Wert berechnet, z. B. COUNT, SUM, AVG, MIN, MAX."]
    ],
    cards: [
      ["Unterschied WHERE und HAVING?", "WHERE filtert einzelne Zeilen vor der Gruppierung, HAVING filtert Gruppen danach (auch mit Aggregaten)."],
      ["Wie findet man Mitarbeiter ohne Gerät?", "mitarbeiter LEFT JOIN geraet ... WHERE geraet.geraet_id IS NULL."],
      ["Unterschied COUNT(*) und COUNT(spalte)?", "COUNT(*) zählt alle Zeilen, COUNT(spalte) nur Zeilen, in denen die Spalte nicht NULL ist."],
      ["Wie sortiert man absteigend?", "ORDER BY spalte DESC."]
    ]
  },
  {
    id: "ga1-cloud",
    area: "GA1",
    extra: true,
    title: "Cloud-Computing",
    overview: [
      "Servicemodelle: <b>IaaS</b> (Infrastruktur), <b>PaaS</b> (Plattform), <b>SaaS</b> (Software).",
      "Bereitstellungsmodelle: Public, Private, Hybrid und Community Cloud.",
      "<b>Shared Responsibility:</b> Je höher das Servicemodell, desto mehr Verantwortung trägt der Anbieter – für Daten und Zugriffe bleibt immer der Kunde verantwortlich.",
      "Vorteile: Skalierbarkeit, nutzungsabhängige Kosten (OPEX statt CAPEX); Nachteile: Abhängigkeit (Vendor Lock-in), Internetanbindung, Datenschutz.",
      "DSGVO: Auftragsverarbeitungsvertrag (Art. 28), Drittlandtransfer nur mit geeigneter Grundlage (Art. 44 ff.)."
    ],
    content: `
<h3>Merkmale (nach NIST)</h3>
<p>Cloud-Computing bietet IT-Ressourcen <b>on demand</b> über das Netz: Selbstbedienung, breiter Netzwerkzugriff, Ressourcen-Pooling, schnelle Elastizität und nutzungsabhängige Abrechnung (pay per use).</p>
<h3>Servicemodelle</h3>
<table>
<tr><th>Modell</th><th>Anbieter stellt bereit</th><th>Kunde verwaltet</th><th>Beispiele</th></tr>
<tr><td>IaaS</td><td>Hardware, Netzwerk, Speicher, Virtualisierung</td><td>Betriebssystem, Middleware, Anwendungen, Daten</td><td>Amazon EC2, Azure Virtual Machines</td></tr>
<tr><td>PaaS</td><td>zusätzlich Betriebssystem, Laufzeitumgebung, Datenbank-Dienst</td><td>eigene Anwendungen und Daten</td><td>Azure App Service, Google App Engine</td></tr>
<tr><td>SaaS</td><td>komplette Anwendung</td><td>Daten, Benutzer und Konfiguration</td><td>Microsoft 365, Salesforce</td></tr>
</table>
<h3>Bereitstellungsmodelle</h3>
<ul>
<li><b>Public Cloud:</b> Ressourcen eines Anbieters, von vielen Kunden geteilt (Multi-Tenant).</li>
<li><b>Private Cloud:</b> exklusiv für eine Organisation, intern oder bei einem Dienstleister betrieben.</li>
<li><b>Hybrid Cloud:</b> Kombination aus Private und Public Cloud, z. B. sensible Daten intern, Lastspitzen in der Public Cloud (Cloud Bursting).</li>
<li><b>Community Cloud:</b> gemeinsam genutzt von mehreren Organisationen mit ähnlichen Anforderungen (z. B. Behörden, Krankenhäuser).</li>
</ul>
<h3>Shared Responsibility Model</h3>
<p>Der Anbieter ist für die Sicherheit <i>der</i> Cloud (Rechenzentrum, Hardware, Hypervisor) verantwortlich, der Kunde für die Sicherheit <i>in</i> der Cloud. Bei IaaS muss der Kunde z. B. das Gastbetriebssystem patchen und die Firewall konfigurieren. Bei SaaS bleibt der Kunde für Benutzerkonten, Berechtigungen und seine Daten verantwortlich.</p>
<h3>Vor- und Nachteile</h3>
<table>
<tr><th>Vorteile</th><th>Nachteile</th></tr>
<tr><td>Skalierbarkeit und Elastizität</td><td>Abhängigkeit vom Anbieter (Vendor Lock-in)</td></tr>
<tr><td>keine Investitionskosten, Betriebskosten statt Anschaffung</td><td>Abhängigkeit von der Internetverbindung</td></tr>
<tr><td>hohe Verfügbarkeit, Georedundanz</td><td>Datenschutz- und Compliance-Fragen</td></tr>
<tr><td>schnelle Bereitstellung</td><td>laufende Kosten können bei Dauerlast höher sein</td></tr>
</table>
<h3>DSGVO-Aspekte</h3>
<p>Verarbeitet ein Cloud-Anbieter personenbezogene Daten im Auftrag, ist er <b>Auftragsverarbeiter</b>; es muss ein <b>Auftragsverarbeitungsvertrag (AVV) nach Art. 28 DSGVO</b> geschlossen werden. Der Kunde bleibt Verantwortlicher. Übermittlungen in Drittländer (außerhalb EU/EWR) sind nur mit Angemessenheitsbeschluss (z. B. EU-US Data Privacy Framework für zertifizierte Unternehmen) oder Standardvertragsklauseln zulässig (Art. 44 ff.). Zudem sind technische und organisatorische Maßnahmen (Art. 32) wie Verschlüsselung nachzuweisen.</p>
<div class="example"><b>Beispiel:</b> Ein Unternehmen nutzt Microsoft 365 (SaaS) für E-Mail. Es schließt den AVV des Anbieters ab, wählt Rechenzentren in der EU, aktiviert Multi-Faktor-Authentifizierung und verwaltet die Benutzerrechte selbst.</div>
`,
    terms: [
      ["IaaS", "Infrastructure as a Service: Bereitstellung virtueller Server, Speicher und Netzwerke; Kunde verwaltet ab Betriebssystem."],
      ["PaaS", "Platform as a Service: Bereitstellung einer Laufzeit- und Entwicklungsplattform; Kunde verwaltet Anwendung und Daten."],
      ["SaaS", "Software as a Service: fertige Anwendung über das Internet, meist im Abonnement."],
      ["Hybrid Cloud", "Kombination aus Private und Public Cloud mit gemeinsamer Verwaltung bzw. Datenaustausch."],
      ["Community Cloud", "Cloud, die von mehreren Organisationen mit gemeinsamen Anforderungen gemeinsam genutzt wird."],
      ["Shared Responsibility Model", "Aufteilung der Sicherheitsverantwortung zwischen Cloud-Anbieter und Kunde abhängig vom Servicemodell."],
      ["Vendor Lock-in", "Starke Abhängigkeit von einem Anbieter, die einen Wechsel technisch oder wirtschaftlich erschwert."],
      ["Auftragsverarbeitungsvertrag", "Vertrag nach Art. 28 DSGVO zwischen Verantwortlichem und Dienstleister, der personenbezogene Daten im Auftrag verarbeitet."]
    ],
    cards: [
      ["Wer patcht bei IaaS das Gastbetriebssystem?", "Der Kunde."],
      ["Was ist Cloud Bursting?", "Bei Lastspitzen werden zusätzliche Ressourcen aus der Public Cloud genutzt (Hybrid Cloud)."],
      ["Wer ist bei Cloud-Nutzung datenschutzrechtlich Verantwortlicher?", "Der Kunde (Auftraggeber); der Anbieter ist Auftragsverarbeiter."],
      ["Warum gilt Cloud als OPEX statt CAPEX?", "Statt Investitionen in eigene Hardware fallen laufende, nutzungsabhängige Betriebskosten an."]
    ]
  },
  {
    id: "ga1-usv",
    area: "GA1",
    extra: true,
    title: "USV & Stromversorgung",
    overview: [
      "Eine <b>USV</b> überbrückt Stromausfälle und schützt vor Netzstörungen.",
      "Klassen nach EN IEC 62040-3: <b>VFD</b> (Offline), <b>VI</b> (Line-Interactive), <b>VFI</b> (Online/Doppelwandler).",
      "Wirkleistung P [W] = Scheinleistung S [VA] × Leistungsfaktor cos φ.",
      "Überbrückungszeit ≈ nutzbare Batterieenergie [Wh] / Last [W].",
      "<b>N+1-Redundanz:</b> ein Modul mehr als für die Last nötig."
    ],
    content: `
<h3>USV-Klassen</h3>
<table>
<tr><th>Klasse</th><th>Bauart</th><th>Funktion</th><th>Umschaltzeit</th><th>Einsatz</th></tr>
<tr><td>VFD (Voltage and Frequency Dependent)</td><td>Offline / Standby</td><td>Last hängt direkt am Netz, bei Ausfall Umschaltung auf Wechselrichter</td><td>ca. 4–10 ms</td><td>Arbeitsplatz-PCs</td></tr>
<tr><td>VI (Voltage Independent)</td><td>Line-Interactive</td><td>zusätzlich Spannungsregelung (Spartransformator), Frequenz vom Netz abhängig</td><td>ca. 2–4 ms</td><td>kleine Server, Netzwerktechnik</td></tr>
<tr><td>VFI (Voltage and Frequency Independent)</td><td>Online / Doppelwandler</td><td>Netz → Gleichrichter → Batterie/Zwischenkreis → Wechselrichter → Last; dauerhaft aufbereitete Spannung</td><td>0 ms (unterbrechungsfrei)</td><td>Rechenzentrum, kritische Server</td></tr>
</table>
<p>Nur die VFI-USV schützt gegen alle typischen Netzstörungen (Spannungseinbrüche, Überspannungen, Frequenzschwankungen, Oberschwingungen). Nachteil: geringerer Wirkungsgrad und höhere Kosten. Ein <b>Bypass</b> ermöglicht Wartung ohne Abschalten der Last.</p>
<h3>Leistung: VA und W</h3>
<p>USVs werden mit <b>Scheinleistung S in VA</b> und <b>Wirkleistung P in W</b> angegeben. Es gilt <b>P = S × cos φ</b> (Leistungsfaktor). Eine USV mit 3000 VA und cos φ = 0,9 liefert höchstens 2700 W. Beide Grenzen dürfen nicht überschritten werden. Zur Dimensionierung addiert man die Wirkleistung aller Verbraucher und plant Reserve (z. B. 20–30 %) ein.</p>
<h3>Überbrückungszeit berechnen</h3>
<ol>
<li>Batterieenergie: E = Anzahl × Spannung [V] × Kapazität [Ah] → Wh</li>
<li>nutzbare Energie: E × Wirkungsgrad (Wechselrichter)</li>
<li>Zeit t = nutzbare Energie [Wh] / Last [W] → Stunden, × 60 = Minuten</li>
</ol>
<p>In der Praxis sinkt die Kapazität bei hohen Entladeströmen und mit dem Batteriealter, daher Herstellerkurven beachten. Die USV soll die Zeit bis zum Anlaufen eines Notstromaggregats oder bis zum geordneten Herunterfahren (Shutdown-Software über USB/Netzwerk) überbrücken.</p>
<h3>Redundanz</h3>
<ul>
<li><b>N:</b> genau so viele Module, wie für die Last nötig – keine Redundanz.</li>
<li><b>N+1:</b> ein zusätzliches Modul; der Ausfall eines Moduls wird toleriert.</li>
<li><b>2N:</b> vollständig doppelte Versorgung (zwei unabhängige Stränge A/B), z. B. Server mit zwei Netzteilen an zwei USVs.</li>
</ul>
<div class="example"><b>Beispiel:</b> Last 1600 W, USV-Module à 800 W. N = 2 Module; bei N+1 werden 3 Module installiert. Batterien: 4 × 12 V × 9 Ah = 432 Wh, Wirkungsgrad 90 % → 388,8 Wh nutzbar. Überbrückungszeit bei 1600 W: 388,8 / 1600 = 0,243 h ≈ 14,6 min.</div>
`,
    terms: [
      ["USV", "Unterbrechungsfreie Stromversorgung: überbrückt Netzausfälle mit Batterien und filtert Netzstörungen."],
      ["VFD", "Offline-/Standby-USV: Ausgang abhängig von Netzspannung und -frequenz, Umschaltzeit im Millisekundenbereich."],
      ["VI", "Line-Interactive-USV: regelt die Spannung, Frequenz bleibt netzabhängig."],
      ["VFI", "Online-/Doppelwandler-USV: Ausgang unabhängig von Spannung und Frequenz des Netzes, keine Umschaltzeit."],
      ["Scheinleistung", "Produkt aus Spannung und Strom, Einheit VA."],
      ["Wirkleistung", "Tatsächlich umgesetzte Leistung in W; P = S × cos φ."],
      ["Leistungsfaktor", "Verhältnis von Wirk- zu Scheinleistung (cos φ)."],
      ["N+1-Redundanz", "Es ist eine Komponente mehr vorhanden als zur Lastversorgung nötig."]
    ],
    cards: [
      ["Welche USV-Klasse bietet keine Umschaltzeit?", "VFI (Online-/Doppelwandler-USV)."],
      ["Wie viel Watt liefert eine 2000-VA-USV mit cos φ = 0,8?", "1600 W."],
      ["Wozu dient der Bypass einer USV?", "Last wird direkt aus dem Netz versorgt, z. B. bei Wartung oder Überlast der USV."],
      ["Wie berechnet man die Überbrückungszeit?", "Nutzbare Batterieenergie in Wh geteilt durch die Last in W ergibt Stunden."]
    ]
  },
  {
    id: "ga1-projekt",
    area: "GA1",
    extra: true,
    title: "Projektmanagement",
    overview: [
      "Ein Projekt ist einmalig, zeitlich begrenzt, hat ein definiertes Ziel und begrenzte Ressourcen.",
      "<b>Magisches Dreieck:</b> Leistung/Qualität, Zeit, Kosten beeinflussen sich gegenseitig.",
      "<b>Lastenheft</b> (Auftraggeber: WAS und WOFÜR), <b>Pflichtenheft</b> (Auftragnehmer: WIE und WOMIT).",
      "Netzplan: FAZ/FEZ per Vorwärts-, SAZ/SEZ per Rückwärtsrechnung; Puffer 0 ⇒ <b>kritischer Pfad</b>.",
      "Ziele werden <b>SMART</b> formuliert: spezifisch, messbar, attraktiv/akzeptiert, realistisch, terminiert."
    ],
    content: `
<h3>Magisches Dreieck</h3>
<p>Die drei Zielgrößen <b>Leistung (Qualität/Umfang)</b>, <b>Zeit</b> und <b>Kosten</b> hängen voneinander ab. Wird eine verändert, wirkt sich das auf die anderen aus: Soll ein Projekt früher fertig werden, steigen meist die Kosten oder der Umfang sinkt.</p>
<h3>Lastenheft und Pflichtenheft</h3>
<table>
<tr><th></th><th>Lastenheft</th><th>Pflichtenheft</th></tr>
<tr><td>Ersteller</td><td>Auftraggeber</td><td>Auftragnehmer</td></tr>
<tr><td>Inhalt</td><td>Anforderungen: WAS und WOFÜR</td><td>Umsetzung: WIE und WOMIT</td></tr>
<tr><td>Zeitpunkt</td><td>vor der Ausschreibung/Angebotsanfrage</td><td>nach Auftragsvergabe, auf Basis des Lastenhefts</td></tr>
</table>
<h3>Phasen und Werkzeuge</h3>
<ul>
<li><b>Projektstrukturplan (PSP):</b> zerlegt das Projekt in Teilaufgaben und Arbeitspakete.</li>
<li><b>Meilenstein:</b> Ereignis ohne Dauer, an dem ein wichtiges Zwischenergebnis überprüft wird.</li>
<li><b>Gantt-Diagramm:</b> Balkenplan auf einer Zeitachse; zeigt Dauer, Reihenfolge und Fortschritt anschaulich, Abhängigkeiten aber weniger deutlich.</li>
<li><b>Netzplan:</b> zeigt Abhängigkeiten, Puffer und kritischen Pfad.</li>
</ul>
<h3>Netzplantechnik</h3>
<ul>
<li><b>Vorwärtsrechnung:</b> FAZ (frühester Anfangszeitpunkt) = größter FEZ aller Vorgänger; FEZ = FAZ + Dauer.</li>
<li><b>Rückwärtsrechnung:</b> SEZ (spätester Endzeitpunkt) = kleinster SAZ aller Nachfolger; SAZ = SEZ − Dauer.</li>
<li><b>Gesamtpuffer (GP)</b> = SAZ − FAZ = SEZ − FEZ: so lange kann sich ein Vorgang verzögern, ohne das Projektende zu verschieben.</li>
<li><b>Freier Puffer (FP)</b> = kleinster FAZ der Nachfolger − FEZ: Verzögerung ohne Auswirkung auf den Nachfolger.</li>
<li><b>Kritischer Pfad:</b> Kette aller Vorgänge mit Gesamtpuffer 0; er bestimmt die Projektdauer.</li>
</ul>
<div class="example"><b>Beispiel:</b> A (2 Tage) → B (4 Tage) und A → C (3 Tage); B und C → D (1 Tag). FAZ/FEZ: A 0/2, B 2/6, C 2/5, D 6/7. Projektdauer 7 Tage. Für C gilt SEZ = 6, SAZ = 3, also GP = 1 Tag. Kritischer Pfad: A–B–D.</div>
<h3>SMART-Ziele</h3>
<p><b>S</b>pezifisch, <b>M</b>essbar, <b>A</b>ttraktiv bzw. akzeptiert, <b>R</b>ealistisch, <b>T</b>erminiert. Beispiel: „Bis 30.06. werden alle 120 Arbeitsplätze auf Windows 11 migriert.“</p>
<div class="tip"><b>Prüfungstipp:</b> Bei Netzplänen erst vollständig vorwärts, dann rückwärts rechnen. Bei mehreren Vorgängern den größten FEZ, bei mehreren Nachfolgern den kleinsten SAZ nehmen.</div>
`,
    terms: [
      ["Magisches Dreieck", "Zusammenhang der konkurrierenden Projektziele Leistung/Qualität, Zeit und Kosten."],
      ["Lastenheft", "Vom Auftraggeber erstellte Beschreibung aller Anforderungen an das Projektergebnis (WAS/WOFÜR)."],
      ["Pflichtenheft", "Vom Auftragnehmer erstellte Beschreibung, wie die Anforderungen umgesetzt werden (WIE/WOMIT)."],
      ["Meilenstein", "Wichtiges Ereignis im Projekt ohne Dauer, an dem Ergebnisse überprüft werden."],
      ["Gantt-Diagramm", "Balkendiagramm, das Vorgänge auf einer Zeitachse darstellt."],
      ["Kritischer Pfad", "Folge von Vorgängen ohne Puffer, deren Verzögerung das Projektende verschiebt."],
      ["Gesamtpuffer", "Zeit, um die ein Vorgang verschoben werden kann, ohne das Projektende zu gefährden: SAZ − FAZ."],
      ["SMART", "Kriterien für Zielformulierungen: spezifisch, messbar, attraktiv, realistisch, terminiert."]
    ],
    cards: [
      ["Wer erstellt das Pflichtenheft?", "Der Auftragnehmer."],
      ["Wie berechnet man den FAZ eines Vorgangs mit mehreren Vorgängern?", "Er ist das Maximum der FEZ aller Vorgänger."],
      ["Welchen Gesamtpuffer haben Vorgänge auf dem kritischen Pfad?", "0."],
      ["Welche Dauer hat ein Meilenstein?", "Keine (Dauer 0)."]
    ]
  }
);

FABI_DATA.questions.push(
  // ---------- Virtualisierung ----------
  { id: "ga1-virtualisierung-1", topic: "ga1-virtualisierung", level: 1, type: "single",
    q: "Welche Aussage beschreibt einen Typ-1-Hypervisor korrekt?",
    options: ["Er läuft als Anwendung auf einem installierten Windows- oder Linux-System.", "Er läuft direkt auf der Hardware des Servers ohne darunterliegendes Host-Betriebssystem.", "Er virtualisiert ausschließlich Anwendungen, nicht ganze Betriebssysteme.", "Er wird nur auf Arbeitsplatzrechnern für Testzwecke eingesetzt."],
    answer: 1,
    explain: "Typ-1-Hypervisoren (Bare Metal) wie VMware ESXi oder Hyper-V laufen direkt auf der Hardware. Typ-2-Hypervisoren (z. B. VirtualBox) laufen auf einem Host-Betriebssystem." },
  { id: "ga1-virtualisierung-2", topic: "ga1-virtualisierung", level: 2, type: "number",
    q: "Ein Virtualisierungshost besitzt 384 GB RAM. 24 GB werden für den Hypervisor reserviert. Jede neue VM benötigt fest zugewiesene 16 GB RAM. Wie viele VMs können ohne RAM-Overcommitment maximal betrieben werden?",
    answer: 22, tolerance: 0, unit: "VMs",
    explain: "Verfügbar: 384 GB − 24 GB = 360 GB. 360 / 16 = 22,5 → abgerundet 22 VMs (eine halbe VM ist nicht möglich)." },
  { id: "ga1-virtualisierung-3", topic: "ga1-virtualisierung", level: 3, type: "number",
    q: "Ein Cluster besteht aus 3 Hosts mit je 2 CPUs à 16 physischen Kernen (ohne Hyper-Threading). Es gilt ein vCPU-Overcommitment von höchstens 3:1 pro physischem Kern. Der Cluster soll auch beim Ausfall eines Hosts alle VMs betreiben können (N+1). Wie viele vCPUs dürfen insgesamt maximal an VMs vergeben werden?",
    answer: 192, tolerance: 0, unit: "vCPUs",
    explain: "Bei Ausfall eines Hosts bleiben 2 Hosts × 2 CPUs × 16 Kerne = 64 Kerne. 64 × 3 = 192 vCPUs." },
  { id: "ga1-virtualisierung-4", topic: "ga1-virtualisierung", level: 2, type: "multi",
    q: "Welche Aussagen zu Snapshots virtueller Maschinen sind richtig? (Mehrere Antworten sind richtig.)",
    options: ["Ein Snapshot ersetzt eine regelmäßige Datensicherung auf ein separates Medium.", "Ein Snapshot eignet sich, um vor einem Update schnell zum vorherigen Zustand zurückzukehren.", "Lange aufbewahrte Snapshots können die Leistung der VM verschlechtern und viel Speicher belegen.", "Fällt der Datenträger mit der Basis-Disk aus, ist auch der Snapshot unbrauchbar.", "Ein Snapshot wird grundsätzlich automatisch an einen anderen Standort übertragen."],
    answer: [1, 2, 3],
    explain: "Snapshots sind für kurzfristiges Zurückrollen gedacht. Sie liegen auf demselben Speicher, hängen von der Basis-Disk ab und wachsen (Delta-Dateien). Daher sind sie kein Backup und werden nicht automatisch ausgelagert." },
  { id: "ga1-virtualisierung-5", topic: "ga1-virtualisierung", level: 2, type: "match",
    q: "Ordnen Sie die Begriffe den Beschreibungen zu.",
    pairs: [["Live-Migration", "Laufende VM wird ohne Unterbrechung auf einen anderen Host verschoben"], ["Overcommitment", "Mehr virtuelle Ressourcen vergeben als physisch vorhanden"], ["Thin Provisioning", "Speicherplatz wird erst bei tatsächlicher Nutzung belegt"], ["Typ-2-Hypervisor", "Virtualisierungssoftware, die auf einem Host-Betriebssystem läuft"]],
    explain: "Live-Migration = Verschieben im laufenden Betrieb; Overcommitment = Überbuchung; Thin Provisioning = bedarfsgerechte Speicherbelegung; Typ 2 = Hosted-Hypervisor." },

  // ---------- Hochverfügbarkeit ----------
  { id: "ga1-ha-1", topic: "ga1-ha", level: 1, type: "single",
    q: "Ein Unternehmen sichert seine Datenbank täglich um 22:00 Uhr. Welche Kennzahl beschreibt den maximal möglichen Datenverlust von bis zu 24 Stunden?",
    options: ["RTO", "MTTR", "RPO", "MTBF"],
    answer: 2,
    explain: "Der RPO (Recovery Point Objective) gibt den maximal tolerierbaren Datenverlust als Zeitraum seit der letzten Sicherung an. Der RTO betrifft die Wiederherstellungsdauer." },
  { id: "ga1-ha-2", topic: "ga1-ha", level: 2, type: "number",
    q: "Ein Dienstleister garantiert eine Verfügbarkeit von 99,95 % pro Jahr (365 Tage). Wie viele Stunden Ausfallzeit pro Jahr sind maximal zulässig? Runden Sie auf zwei Nachkommastellen.",
    answer: 4.38, tolerance: 0.01, unit: "h",
    explain: "Ausfallanteil = 100 % − 99,95 % = 0,05 % = 0,0005. 8760 h × 0,0005 = 4,38 h." },
  { id: "ga1-ha-3", topic: "ga1-ha", level: 3, type: "number",
    q: "Ein Server hat eine MTBF von 2.000 Stunden und eine MTTR von 5 Stunden. Berechnen Sie die Verfügbarkeit in Prozent. Runden Sie auf zwei Nachkommastellen.",
    answer: 99.75, tolerance: 0.01, unit: "%",
    explain: "A = MTBF / (MTBF + MTTR) = 2000 / 2005 = 0,997506 → 99,75 %." },
  { id: "ga1-ha-4", topic: "ga1-ha", level: 3, type: "number",
    q: "Zwei identische Server mit einer Verfügbarkeit von je 98 % arbeiten als Cluster parallel; der Dienst ist verfügbar, solange mindestens ein Server läuft. Welche Gesamtverfügbarkeit in Prozent ergibt sich? Runden Sie auf zwei Nachkommastellen.",
    answer: 99.96, tolerance: 0.01, unit: "%",
    explain: "Ausfallwahrscheinlichkeit je Server 0,02. Beide fallen gleichzeitig aus: 0,02 × 0,02 = 0,0004. A = 1 − 0,0004 = 0,9996 = 99,96 %." },
  { id: "ga1-ha-5", topic: "ga1-ha", level: 2, type: "single",
    q: "In einem Failover-Cluster bearbeitet nur Knoten A Anfragen, Knoten B überwacht A per Heartbeat und übernimmt dessen Dienste erst, wenn A ausfällt. Um welches Konzept handelt es sich?",
    options: ["Aktiv/Aktiv-Cluster mit Lastverteilung", "Cold Standby", "Aktiv/Passiv-Cluster", "Load-Balancing nach Round Robin"],
    answer: 2,
    explain: "Beim Aktiv/Passiv-Cluster arbeitet nur ein Knoten, der zweite (passive) übernimmt automatisch im Fehlerfall. Cold Standby wäre ein ausgeschaltetes Ersatzsystem ohne automatische Übernahme." },

  // ---------- Algorithmik ----------
  { id: "ga1-algorithmik-1", topic: "ga1-algorithmik", level: 2, type: "number",
    q: "Welchen Wert hat <code>x</code> nach Ausführung des folgenden Pseudocodes?<pre>x = 0\nFÜR i = 1 BIS 5\n  WENN i MOD 2 = 0 DANN\n    x = x + i\n  SONST\n    x = x - 1\n  ENDE WENN\nENDE FÜR</pre>",
    answer: 3, tolerance: 0, unit: "",
    explain: "i=1: x=−1; i=2: x=1; i=3: x=0; i=4: x=4; i=5: x=3. Ergebnis: 3." },
  { id: "ga1-algorithmik-2", topic: "ga1-algorithmik", level: 2, type: "number",
    q: "Gegeben ist das 0-basierte Array <code>a = [4, 7, 1, 9, 3]</code>. Welchen Wert hat <code>y</code>?<pre>y = a[a[4]] + a[2]</pre>",
    answer: 10, tolerance: 0, unit: "",
    explain: "a[4] = 3, also a[a[4]] = a[3] = 9. a[2] = 1. y = 9 + 1 = 10." },
  { id: "ga1-algorithmik-3", topic: "ga1-algorithmik", level: 3, type: "number",
    q: "Welchen Wert hat <code>z</code> nach Ausführung des folgenden Pseudocodes?<pre>n = 20\nz = 0\nSOLANGE n &gt; 1\n  WENN n MOD 2 = 0 DANN\n    n = n / 2\n  SONST\n    n = 3 * n + 1\n  ENDE WENN\n  z = z + 1\nENDE SOLANGE</pre>",
    answer: 7, tolerance: 0, unit: "",
    explain: "Folge von n: 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1. Das sind 7 Durchläufe, also z = 7." },
  { id: "ga1-algorithmik-4", topic: "ga1-algorithmik", level: 3, type: "single",
    q: "Der folgende Pseudocode soll die Summe aller Elemente des 0-basierten Arrays <code>a</code> mit <code>n</code> Elementen berechnen:<pre>summe = 0\nFÜR i = 0 BIS n\n  summe = summe + a[i]\nENDE FÜR</pre>Welcher Fehler liegt vor?",
    options: ["Die Variable summe wird nicht initialisiert.", "Off-by-one-Fehler: Die Schleife greift im letzten Durchlauf auf a[n] zu, das nicht existiert.", "Das erste Element a[0] wird übersprungen.", "Es entsteht eine Endlosschleife, da i nie erhöht wird."],
    answer: 1,
    explain: "Bei n Elementen sind die Indizes 0 bis n−1 gültig. Die Schleife läuft bis n (inklusive) und greift damit auf a[n] außerhalb des Arrays zu. Korrekt wäre FÜR i = 0 BIS n − 1." },
  { id: "ga1-algorithmik-5", topic: "ga1-algorithmik", level: 2, type: "single",
    q: "Es gilt <code>a = 5</code> und <code>b = 3</code>. Welchen Wahrheitswert hat der Ausdruck<pre>NICHT (a &gt; b) ODER (a - b = 2 UND b &lt; 3)</pre>",
    options: ["wahr", "falsch", "Der Ausdruck ist nicht auswertbar.", "wahr, aber nur bei Auswertung von links nach rechts ohne Klammern"],
    answer: 1,
    explain: "NICHT(5 > 3) = NICHT wahr = falsch. (5 − 3 = 2) = wahr, (3 < 3) = falsch → wahr UND falsch = falsch. falsch ODER falsch = falsch." },
  { id: "ga1-algorithmik-6", topic: "ga1-algorithmik", level: 1, type: "match",
    q: "Ordnen Sie den Algorithmen bzw. Operationen ihre typische Laufzeitkomplexität (Worst Case) zu.",
    pairs: [["Zugriff auf a[i] per Index", "O(1)"], ["Binäre Suche in sortiertem Array", "O(log n)"], ["Lineare Suche", "O(n)"], ["Bubblesort", "O(n²)"]],
    explain: "Indexzugriff ist konstant, die binäre Suche halbiert den Suchbereich (log n), die lineare Suche prüft jedes Element (n), Bubblesort nutzt zwei verschachtelte Schleifen (n²)." },

  // ---------- SQL ----------
  { id: "ga1-sql-1", topic: "ga1-sql", level: 1, type: "sql",
    q: "Geben Sie Vorname und Nachname aller Mitarbeiter aus, deren Gehalt größer als 4000 ist, sortiert nach Gehalt absteigend.",
    solution: "SELECT vorname, nachname FROM mitarbeiter WHERE gehalt > 4000 ORDER BY gehalt DESC;",
    ordered: true,
    explain: "Einfaches WHERE mit Vergleich und ORDER BY ... DESC. Ergebnis: Sofia Klein (5100), Lena Schmidt (4200)." },
  { id: "ga1-sql-2", topic: "ga1-sql", level: 1, type: "sql",
    q: "Geben Sie geraet_id, typ und preis aller Geräte des Herstellers Dell aus, sortiert nach geraet_id aufsteigend.",
    solution: "SELECT geraet_id, typ, preis FROM geraet WHERE hersteller = 'Dell' ORDER BY geraet_id;",
    ordered: true,
    explain: "Textvergleich in WHERE mit Hochkommas. Es gibt vier Dell-Geräte (IDs 2, 3, 11, 12)." },
  { id: "ga1-sql-3", topic: "ga1-sql", level: 2, type: "sql",
    q: "Geben Sie für jeden Gerätetyp den Typ und die Anzahl der vorhandenen Geräte aus, sortiert nach Typ aufsteigend.",
    solution: "SELECT typ, COUNT(*) AS anzahl FROM geraet GROUP BY typ ORDER BY typ;",
    ordered: true,
    explain: "GROUP BY typ bildet je Typ eine Gruppe, COUNT(*) zählt die Zeilen je Gruppe." },
  { id: "ga1-sql-4", topic: "ga1-sql", level: 2, type: "sql",
    q: "Geben Sie Vorname, Nachname und den Namen der Abteilung aller Mitarbeiter aus, deren Abteilung am Standort Bonn liegt, sortiert nach Nachname aufsteigend.",
    solution: "SELECT m.vorname, m.nachname, a.name FROM mitarbeiter m INNER JOIN abteilung a ON m.abt_id = a.abt_id WHERE a.standort = 'Bonn' ORDER BY m.nachname;",
    ordered: true,
    explain: "INNER JOIN über den Fremdschlüssel abt_id, Filter auf standort. Ergebnis: Koch (Einkauf), Neumann (Einkauf), Richter (Personal)." },
  { id: "ga1-sql-5", topic: "ga1-sql", level: 2, type: "sql",
    q: "Geben Sie Ticket-Nr. (ticket_id) und Gerätetyp aller Tickets aus, die den Status 'offen' und die Priorität 'hoch' haben, sortiert nach ticket_id aufsteigend.",
    solution: "SELECT t.ticket_id, g.typ FROM ticket t JOIN geraet g ON t.geraet_id = g.geraet_id WHERE t.status = 'offen' AND t.prioritaet = 'hoch' ORDER BY t.ticket_id;",
    ordered: true,
    explain: "JOIN ticket–geraet und zwei mit AND verknüpfte Bedingungen. Ergebnis: Ticket 3 (Notebook), 7 (Server), 11 (Notebook)." },
  { id: "ga1-sql-6", topic: "ga1-sql", level: 3, type: "sql",
    q: "Geben Sie für jede Abteilung den Abteilungsnamen und die Summe der Gehälter ihrer Mitarbeiter aus. Berücksichtigen Sie nur Abteilungen, deren Gehaltssumme größer als 9000 ist, und sortieren Sie nach der Gehaltssumme absteigend.",
    solution: "SELECT a.name, SUM(m.gehalt) AS summe FROM abteilung a JOIN mitarbeiter m ON m.abt_id = a.abt_id GROUP BY a.abt_id, a.name HAVING SUM(m.gehalt) > 9000 ORDER BY summe DESC;",
    ordered: true,
    explain: "Bedingungen auf Aggregate gehören in HAVING. IT: 4200 + 3900 + 5100 = 13200; Vertrieb: 3600 + 3100 + 2900 = 9600; Einkauf (6950) und Personal (3800) fallen heraus." },
  { id: "ga1-sql-7", topic: "ga1-sql", level: 3, type: "sql",
    q: "Geben Sie den Namen aller Abteilungen aus, denen kein Mitarbeiter zugeordnet ist.",
    solution: "SELECT a.name FROM abteilung a LEFT JOIN mitarbeiter m ON m.abt_id = a.abt_id WHERE m.ma_id IS NULL;",
    ordered: false,
    explain: "LEFT JOIN liefert alle Abteilungen; wo kein Mitarbeiter passt, ist m.ma_id NULL. Ergebnis: Marketing." },
  { id: "ga1-sql-8", topic: "ga1-sql", level: 3, type: "sql",
    q: "Geben Sie Vorname und Nachname aller Mitarbeiter aus, denen kein Gerät zugeordnet ist.",
    solution: "SELECT m.vorname, m.nachname FROM mitarbeiter m LEFT JOIN geraet g ON g.ma_id = m.ma_id WHERE g.geraet_id IS NULL;",
    ordered: false,
    explain: "LEFT JOIN von mitarbeiter auf geraet und Filter auf IS NULL. Ergebnis: Hanna Neumann und Ben Schulz." },
  { id: "ga1-sql-9", topic: "ga1-sql", level: 3, type: "sql",
    q: "Geben Sie Vorname und Nachname aller Mitarbeiter aus, deren Gehalt über dem Durchschnittsgehalt aller Mitarbeiter liegt, sortiert nach Nachname aufsteigend.",
    solution: "SELECT vorname, nachname FROM mitarbeiter WHERE gehalt > (SELECT AVG(gehalt) FROM mitarbeiter) ORDER BY nachname;",
    ordered: true,
    explain: "Eine Unterabfrage berechnet den Durchschnitt (36150 / 10 = 3615). Darüber liegen Becker, Klein, Richter und Schmidt. AVG darf nicht direkt in WHERE stehen, daher die Unterabfrage." },
  { id: "ga1-sql-10", topic: "ga1-sql", level: 3, type: "sql",
    q: "Ermitteln Sie je Abteilung die Anzahl der Tickets, die zu Geräten ihrer Mitarbeiter erfasst wurden. Geben Sie Abteilungsname und Anzahl der Tickets aus, nur für Abteilungen mit mindestens 2 Tickets, sortiert nach der Anzahl absteigend.",
    solution: "SELECT a.name, COUNT(t.ticket_id) AS anzahl FROM abteilung a JOIN mitarbeiter m ON m.abt_id = a.abt_id JOIN geraet g ON g.ma_id = m.ma_id JOIN ticket t ON t.geraet_id = g.geraet_id GROUP BY a.abt_id, a.name HAVING COUNT(t.ticket_id) >= 2 ORDER BY anzahl DESC;",
    ordered: true,
    explain: "JOIN über vier Tabellen (abteilung → mitarbeiter → geraet → ticket), Gruppierung je Abteilung, HAVING für die Mindestanzahl. Ergebnis: Vertrieb 4, IT 3." },
  { id: "ga1-sql-11", topic: "ga1-sql", level: 2, type: "single",
    q: "Die Abfrage <code>SELECT m.nachname, g.typ FROM mitarbeiter m LEFT JOIN geraet g ON g.ma_id = m.ma_id;</code> wird ausgeführt. Was gilt für Mitarbeiter ohne zugeordnetes Gerät?",
    options: ["Sie erscheinen nicht im Ergebnis.", "Sie erscheinen mit dem Wert NULL in der Spalte typ.", "Die Abfrage bricht mit einem Fehler ab.", "Sie erscheinen einmal je vorhandenem Gerät der Firma."],
    answer: 1,
    explain: "Ein LEFT JOIN liefert alle Zeilen der linken Tabelle (mitarbeiter). Fehlt ein Partner in geraet, werden dessen Spalten mit NULL gefüllt. Ein INNER JOIN würde diese Mitarbeiter weglassen." },
  { id: "ga1-sql-12", topic: "ga1-sql", level: 2, type: "multi",
    q: "Welche Aussagen zu Schlüsseln und Klauseln sind richtig? (Mehrere Antworten sind richtig.)",
    options: ["Ein Primärschlüssel muss eindeutig sein und darf nicht NULL sein.", "Ein Fremdschlüssel verweist auf den Primärschlüssel einer anderen (oder derselben) Tabelle.", "Bedingungen mit Aggregatfunktionen wie SUM() werden in der WHERE-Klausel formuliert.", "HAVING filtert Gruppen nach der Gruppierung durch GROUP BY.", "Eine Tabelle darf beliebig viele Primärschlüssel besitzen."],
    answer: [0, 1, 3],
    explain: "PK: eindeutig und nicht NULL, genau einer je Tabelle (ggf. zusammengesetzt). FK verweist auf einen PK. Aggregatbedingungen stehen in HAVING, nicht in WHERE." },

  // ---------- Cloud ----------
  { id: "ga1-cloud-1", topic: "ga1-cloud", level: 1, type: "match",
    q: "Ordnen Sie die Angebote dem passenden Cloud-Servicemodell zu.",
    pairs: [["Gemietete virtuelle Server, Betriebssystem verwaltet der Kunde", "IaaS"], ["Laufzeitumgebung zum Bereitstellen eigener Webanwendungen", "PaaS"], ["Office-Anwendungen und E-Mail im Browser per Abonnement", "SaaS"]],
    explain: "IaaS liefert Infrastruktur, PaaS eine Plattform für eigene Anwendungen, SaaS eine fertige Software." },
  { id: "ga1-cloud-2", topic: "ga1-cloud", level: 2, type: "single",
    q: "Ein Unternehmen betreibt seine Webserver als virtuelle Maschinen bei einem IaaS-Anbieter. Wer ist nach dem Shared Responsibility Model für das Einspielen von Sicherheitsupdates des Gastbetriebssystems verantwortlich?",
    options: ["Der Cloud-Anbieter, da er die Hardware betreibt", "Der Kunde", "Der Hersteller des Hypervisors", "Die Datenschutzaufsichtsbehörde"],
    answer: 1,
    explain: "Bei IaaS verantwortet der Anbieter Hardware, Netzwerk und Virtualisierung. Ab dem Betriebssystem (inkl. Patches, Firewall-Konfiguration, Anwendungen, Daten) ist der Kunde verantwortlich." },
  { id: "ga1-cloud-3", topic: "ga1-cloud", level: 3, type: "multi",
    q: "Eine GmbH möchte Kundendaten (personenbezogene Daten) in einer Public Cloud speichern. Welche Maßnahmen bzw. Aussagen sind nach DSGVO zutreffend? (Mehrere Antworten sind richtig.)",
    options: ["Mit dem Cloud-Anbieter ist ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO abzuschließen.", "Die GmbH bleibt datenschutzrechtlich Verantwortliche.", "Durch die Auslagerung geht die gesamte Verantwortung auf den Anbieter über.", "Eine Übermittlung in ein Drittland außerhalb der EU/des EWR benötigt eine Rechtsgrundlage wie einen Angemessenheitsbeschluss oder Standardvertragsklauseln.", "Personenbezogene Daten dürfen grundsätzlich nicht in einer Cloud gespeichert werden."],
    answer: [0, 1, 3],
    explain: "Der Anbieter ist Auftragsverarbeiter (Art. 28, AVV nötig), die GmbH bleibt Verantwortliche. Drittlandtransfers erfordern eine Grundlage nach Art. 44 ff. Ein generelles Cloud-Verbot gibt es nicht." },
  { id: "ga1-cloud-4", topic: "ga1-cloud", level: 2, type: "single",
    q: "Mehrere Krankenhäuser einer Region betreiben gemeinsam eine Cloud-Infrastruktur, die nur ihnen zur Verfügung steht und ihre gemeinsamen Compliance-Anforderungen erfüllt. Welches Bereitstellungsmodell liegt vor?",
    options: ["Public Cloud", "Hybrid Cloud", "Private Cloud eines einzelnen Krankenhauses", "Community Cloud"],
    answer: 3,
    explain: "Eine Community Cloud wird von mehreren Organisationen mit ähnlichen Anforderungen gemeinsam und exklusiv genutzt." },

  // ---------- USV ----------
  { id: "ga1-usv-1", topic: "ga1-usv", level: 2, type: "match",
    q: "Ordnen Sie die USV-Klassen nach EN IEC 62040-3 der passenden Beschreibung zu.",
    pairs: [["VFD", "Offline-USV: Last direkt am Netz, Umschaltung bei Ausfall"], ["VI", "Line-Interactive: Spannungsregelung, Frequenz netzabhängig"], ["VFI", "Online-Doppelwandler: unterbrechungsfrei, unabhängig von Spannung und Frequenz"]],
    explain: "VFD = Voltage and Frequency Dependent, VI = Voltage Independent, VFI = Voltage and Frequency Independent." },
  { id: "ga1-usv-2", topic: "ga1-usv", level: 2, type: "number",
    q: "Eine USV hat eine Nennleistung von 1500 VA und einen Leistungsfaktor von 0,8. Welche Wirkleistung in Watt kann sie maximal abgeben?",
    answer: 1200, tolerance: 0, unit: "W",
    explain: "P = S × cos φ = 1500 VA × 0,8 = 1200 W." },
  { id: "ga1-usv-3", topic: "ga1-usv", level: 3, type: "number",
    q: "Eine USV enthält 4 Batterien mit je 12 V und 9 Ah. Der Wechselrichter hat einen Wirkungsgrad von 90 %. Die angeschlossene Last beträgt 540 W. Berechnen Sie die Überbrückungszeit in Minuten (vereinfacht, ohne Alterungs- und Entladeeffekte). Runden Sie auf eine Nachkommastelle.",
    answer: 43.2, tolerance: 0.05, unit: "min",
    explain: "E = 4 × 12 V × 9 Ah = 432 Wh. Nutzbar: 432 × 0,9 = 388,8 Wh. t = 388,8 Wh / 540 W = 0,72 h = 0,72 × 60 = 43,2 min." },
  { id: "ga1-usv-4", topic: "ga1-usv", level: 3, type: "number",
    q: "Ein Serverraum hat eine Last von 9 kW (Wirkleistung). Es sollen modulare USV-Module mit je 4 kVA und einem Leistungsfaktor von 0,9 eingesetzt werden. Wie viele Module sind bei einer N+1-Redundanz zu installieren?",
    answer: 4, tolerance: 0, unit: "Module",
    explain: "Wirkleistung je Modul: 4 kVA × 0,9 = 3,6 kW. N = 9 / 3,6 = 2,5 → 3 Module. N+1 = 4 Module." },

  // ---------- Projektmanagement ----------
  { id: "ga1-projekt-1", topic: "ga1-projekt", level: 1, type: "single",
    q: "Welches Dokument wird vom Auftraggeber erstellt und beschreibt, WAS und WOFÜR geliefert werden soll?",
    options: ["Pflichtenheft", "Lastenheft", "Projektstrukturplan", "Gantt-Diagramm"],
    answer: 1,
    explain: "Das Lastenheft enthält die Anforderungen des Auftraggebers. Das Pflichtenheft erstellt der Auftragnehmer und beschreibt die Umsetzung (WIE/WOMIT)." },
  { id: "ga1-projekt-2", topic: "ga1-projekt", level: 3, type: "number",
    q: "Ein Projekt besteht aus folgenden Vorgängen (Dauer in Tagen):<pre>A: 3 Tage, kein Vorgänger\nB: 5 Tage, Vorgänger A\nC: 2 Tage, Vorgänger A\nD: 4 Tage, Vorgänger C\nE: 2 Tage, Vorgänger B und D</pre>Wie viele Tage dauert das Projekt mindestens?",
    answer: 11, tolerance: 0, unit: "Tage",
    explain: "Vorwärtsrechnung: A 0–3, B 3–8, C 3–5, D 5–9, E beginnt beim größten FEZ der Vorgänger (max(8, 9) = 9) und endet bei 11. Kritischer Pfad: A–C–D–E." },
  { id: "ga1-projekt-3", topic: "ga1-projekt", level: 3, type: "number",
    q: "Gegeben ist derselbe Netzplan:<pre>A: 3 Tage, kein Vorgänger\nB: 5 Tage, Vorgänger A\nC: 2 Tage, Vorgänger A\nD: 4 Tage, Vorgänger C\nE: 2 Tage, Vorgänger B und D</pre>Wie groß ist der Gesamtpuffer von Vorgang B in Tagen?",
    answer: 1, tolerance: 0, unit: "Tage",
    explain: "FAZ(B) = 3, FEZ(B) = 8. Rückwärts: SEZ(E) = 11, SAZ(E) = 9 → SEZ(B) = 9, SAZ(B) = 4. GP = SAZ − FAZ = 4 − 3 = 1 Tag." },
  { id: "ga1-projekt-4", topic: "ga1-projekt", level: 2, type: "single",
    q: "Welche Zielformulierung erfüllt die SMART-Kriterien am besten?",
    options: ["„Die IT-Sicherheit soll deutlich verbessert werden.“", "„Wir migrieren möglichst bald alle Rechner.“", "„Bis zum 30.06. werden alle 120 Arbeitsplatzrechner der Verwaltung auf Windows 11 migriert.“", "„Das Netzwerk soll schneller und moderner werden.“"],
    answer: 2,
    explain: "Nur diese Formulierung ist spezifisch (Verwaltung, Windows 11), messbar (120 Rechner) und terminiert (30.06.). Die anderen sind vage und ohne Termin." },
  { id: "ga1-projekt-5", topic: "ga1-projekt", level: 2, type: "multi",
    q: "Welche Aussagen zum Projektmanagement sind richtig? (Mehrere Antworten sind richtig.)",
    options: ["Vorgänge auf dem kritischen Pfad haben einen Gesamtpuffer von 0.", "Ein Meilenstein hat die Dauer 0.", "Wird im magischen Dreieck die Projektzeit verkürzt, bleiben Kosten und Leistung zwingend unverändert.", "Ein Gantt-Diagramm stellt Vorgänge als Balken auf einer Zeitachse dar.", "Das Pflichtenheft wird vor dem Lastenheft erstellt."],
    answer: [0, 1, 3],
    explain: "Kritische Vorgänge haben keinen Puffer, Meilensteine sind Ereignisse ohne Dauer, Gantt = Balkenplan. Zeit, Kosten und Leistung beeinflussen sich gegenseitig; das Pflichtenheft baut auf dem Lastenheft auf." }
);
