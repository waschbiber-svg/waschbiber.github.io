window.FABI_DATA = window.FABI_DATA || { topics: [], questions: [] };
FABI_DATA.topics.push(
  {
    id: "ga1-raid",
    area: "GA1",
    extra: false,
    title: "Speichersysteme & RAID",
    overview: [
      "RAID kombiniert mehrere Festplatten zu einem logischen Laufwerk – für <b>Performance</b> und/oder <b>Ausfallsicherheit</b>.",
      "Nutzkapazität: RAID 0 = n·C, RAID 1 = C, RAID 5 = (n−1)·C, RAID 6 = (n−2)·C, RAID 10 = n/2·C.",
      "Fehlertoleranz: RAID 0 keine, RAID 5 eine Platte, RAID 6 zwei beliebige Platten, RAID 10 eine Platte pro Spiegelpaar.",
      "Write Penalty: RAID 1/10 = 2, RAID 5 = 4, RAID 6 = 6 Back-End-I/Os pro Schreibvorgang.",
      "Kapazitätsplanung mit Wachstum: <code>K<sub>n</sub> = K<sub>0</sub> · (1 + p)<sup>n</sup></code>.",
      "RAID ersetzt <b>kein</b> Backup!"
    ],
    content: `
<h3>Was ist RAID?</h3>
<p><b>RAID</b> (Redundant Array of Independent Disks) fasst mehrere physische Datenträger zu einem logischen Volume zusammen. Je nach Level wird die Leistung erhöht (Striping), die Ausfallsicherheit verbessert (Mirroring, Parität) oder beides kombiniert. Umgesetzt wird RAID per Hardware-Controller, im Betriebssystem (Software-RAID) oder im NAS/SAN.</p>
<h3>Die wichtigsten RAID-Level</h3>
<table>
<tr><th>Level</th><th>Prinzip</th><th>Min. Platten</th><th>Nutzkapazität</th><th>Fehlertoleranz</th><th>Write Penalty</th></tr>
<tr><td>RAID 0</td><td>Striping</td><td>2</td><td>n · C</td><td>keine</td><td>1</td></tr>
<tr><td>RAID 1</td><td>Spiegelung</td><td>2</td><td>C (50 %)</td><td>1 Platte</td><td>2</td></tr>
<tr><td>RAID 5</td><td>Striping + verteilte Parität</td><td>3</td><td>(n − 1) · C</td><td>1 Platte</td><td>4</td></tr>
<tr><td>RAID 6</td><td>Striping + doppelte Parität</td><td>4</td><td>(n − 2) · C</td><td>2 beliebige Platten</td><td>6</td></tr>
<tr><td>RAID 10</td><td>Stripe über Spiegel</td><td>4</td><td>n/2 · C</td><td>1 je Spiegelpaar</td><td>2</td></tr>
</table>
<p>Bei unterschiedlich großen Platten zählt immer die <b>kleinste</b> Platte (C).</p>
<h3>Write Penalty und IOPS</h3>
<p>Ein Schreibzugriff des Hosts erzeugt im RAID mehrere physische I/Os. Bei RAID 5 sind es vier (alte Daten lesen, alte Parität lesen, neue Daten schreiben, neue Parität schreiben), bei RAID 6 sechs, bei RAID 1/10 zwei. Benötigte Back-End-IOPS:</p>
<pre>IOPS_backend = Lese-IOPS + Schreib-IOPS · Write Penalty</pre>
<p>Für schreibintensive Datenbanken ist deshalb RAID 10 meist besser geeignet als RAID 5/6.</p>
<h3>Kapazitätsplanung und Datenwachstum</h3>
<p>Speicher wird für mehrere Jahre geplant. Wächst der Datenbestand jährlich um p Prozent, gilt die Zinseszinsformel <code>K_n = K_0 · (1 + p)^n</code>. Zusätzlich sollte eine Reserve (z. B. 20 % freier Platz) eingeplant werden.</p>
<div class="example"><b>Beispiel:</b> Ein Fileserver speichert heute 10 TB, Wachstum 20 % pro Jahr. Nach 3 Jahren: 10 · 1,2³ = 17,28 TB. Mit RAID 6 aus 4-TB-Platten braucht man (n − 2) · 4 ≥ 17,28 → n − 2 ≥ 4,32 → mindestens 7 Platten (20 TB nutzbar).</div>
<h3>Hot Spare und Rebuild</h3>
<p>Eine <b>Hot-Spare</b>-Platte springt bei Ausfall automatisch ein und startet den Rebuild. Während des Rebuilds ist ein RAID 5 ungeschützt; bei großen Platten dauert er viele Stunden – ein Grund für RAID 6.</p>
<div class="tip"><b>Prüfungstipp:</b> RAID schützt vor Hardwareausfall einer Platte, nicht vor Löschen, Ransomware, Brand oder Diebstahl. Deshalb immer zusätzlich ein Backup!</div>
`,
    terms: [
      ["RAID", "Redundant Array of Independent Disks: Zusammenfassung mehrerer Datenträger zu einem logischen Laufwerk für Leistung und/oder Redundanz."],
      ["Striping", "Verteilung der Daten blockweise auf mehrere Platten (RAID 0); erhöht die Performance, bietet aber keine Redundanz."],
      ["Mirroring", "Spiegelung: identische Kopie der Daten auf einer zweiten Platte (RAID 1); Nutzkapazität 50 %."],
      ["Parität", "Aus den Datenblöcken berechnete Prüfinformation (XOR), mit der ausgefallene Daten rekonstruiert werden können (RAID 5/6)."],
      ["Write Penalty", "Anzahl physischer I/Os pro logischem Schreibvorgang: RAID 1/10 = 2, RAID 5 = 4, RAID 6 = 6."],
      ["Hot Spare", "Reserveplatte im System, die bei einem Plattenausfall automatisch in das RAID eingebunden wird und den Rebuild startet."],
      ["Rebuild", "Wiederherstellung der Daten einer ausgefallenen Platte auf eine Ersatzplatte anhand von Spiegel- oder Paritätsdaten."],
      ["IOPS", "Input/Output Operations per Second – Maß für die Anzahl von Lese-/Schreibzugriffen pro Sekunde."]
    ],
    cards: [
      ["Wie viel Nutzkapazität hat ein RAID 6 aus 8 × 4 TB?", "(8 − 2) · 4 TB = 24 TB."],
      ["Warum ist RAID 10 für Datenbanken oft besser als RAID 5?", "Geringere Write Penalty (2 statt 4) und schnellerer Rebuild – bessere Schreibperformance."],
      ["Wie viele Platten dürfen bei RAID 6 ausfallen?", "Zwei beliebige Platten gleichzeitig."],
      ["Wie berechnet man Datenwachstum über mehrere Jahre?", "Mit der Zinseszinsformel K_n = K_0 · (1 + p)^n."]
    ]
  },
  {
    id: "ga1-san-nas",
    area: "GA1",
    extra: false,
    title: "SAN und NAS",
    overview: [
      "<b>NAS</b> = Network Attached Storage: dateibasierter Zugriff über das LAN (SMB, NFS).",
      "<b>SAN</b> = Storage Area Network: blockbasierter Zugriff über ein eigenes Speichernetz (Fibre Channel, iSCSI).",
      "Beim SAN sieht der Server eine LUN wie eine lokale Platte und formatiert sie selbst.",
      "iSCSI transportiert SCSI-Befehle über TCP/IP (Port 3260), Fibre Channel nutzt ein eigenes Protokoll mit HBAs und FC-Switches.",
      "SMB ist typisch für Windows-Clients, NFS für Linux/Unix und VMware."
    ],
    content: `
<h3>NAS – Network Attached Storage</h3>
<p>Ein <b>NAS</b> ist ein Speichergerät mit eigenem Betriebssystem und Dateisystem, das direkt am LAN hängt. Clients greifen <b>dateibasiert</b> über Netzwerkprotokolle zu. Das NAS verwaltet das Dateisystem selbst, die Clients sehen Freigaben bzw. Exporte.</p>
<ul>
<li><b>SMB/CIFS</b> (TCP 445): Standard in Windows-Umgebungen, unterstützt AD-Berechtigungen.</li>
<li><b>NFS</b> (TCP/UDP 2049): Standard bei Linux/Unix, häufig auch als Datastore für VMware.</li>
</ul>
<h3>SAN – Storage Area Network</h3>
<p>Ein <b>SAN</b> ist ein eigenes, vom LAN getrenntes Hochleistungsnetz für Speicher. Der Zugriff erfolgt <b>blockbasiert</b>: Das Speichersystem stellt <b>LUNs</b> (Logical Unit Numbers) bereit, die der Server wie eine lokale Festplatte sieht und selbst mit einem Dateisystem (z. B. NTFS, VMFS, ext4) formatiert.</p>
<ul>
<li><b>Fibre Channel (FC)</b>: eigenes Protokoll, Host Bus Adapter (HBA), FC-Switches, Adressierung über WWN, Zoning; sehr geringe Latenz, 16/32/64 Gbit/s.</li>
<li><b>iSCSI</b>: SCSI-Befehle gekapselt in TCP/IP (Port 3260), nutzt normale Ethernet-Infrastruktur; Initiator (Server) und Target (Speicher), Adressierung über IQN.</li>
<li><b>FCoE</b>: Fibre Channel über Ethernet (Data Center Bridging).</li>
</ul>
<h3>Vergleich</h3>
<table>
<tr><th>Merkmal</th><th>NAS</th><th>SAN</th></tr>
<tr><td>Zugriff</td><td>dateibasiert</td><td>blockbasiert</td></tr>
<tr><td>Protokolle</td><td>SMB, NFS</td><td>FC, iSCSI, FCoE</td></tr>
<tr><td>Dateisystem</td><td>auf dem NAS</td><td>auf dem Server</td></tr>
<tr><td>Netz</td><td>vorhandenes LAN</td><td>eigenes Speichernetz</td></tr>
<tr><td>Kosten/Komplexität</td><td>gering</td><td>hoch</td></tr>
<tr><td>Typischer Einsatz</td><td>Fileserver, Backup-Ziel</td><td>Datenbanken, Virtualisierungscluster</td></tr>
</table>
<p>Ein Vorteil des SAN: Mehrere Hypervisor-Hosts können auf dieselbe LUN zugreifen (Cluster-Dateisystem), was Live-Migration und Hochverfügbarkeit ermöglicht. <b>DAS</b> (Direct Attached Storage) bezeichnet dagegen direkt angeschlossene Platten ohne Netzwerk.</p>
<div class="example"><b>Beispiel:</b> Ein Unternehmen betreibt drei Hyper-V-Hosts im Failover-Cluster. Die VMs liegen auf einer iSCSI-LUN eines Storage-Systems, angebunden über ein separates 25-GbE-VLAN. Die Abteilungsfreigaben stellt dagegen ein NAS per SMB bereit.</div>
<div class="tip"><b>Prüfungstipp:</b> Merksatz – <b>N</b>AS = Dateien („<b>N</b>etzwerk-Freigabe“), <b>S</b>AN = Blöcke („<b>S</b>erver sieht Platte“).</div>
`,
    terms: [
      ["NAS", "Network Attached Storage: Speichergerät im LAN mit eigenem Dateisystem, Zugriff dateibasiert über SMB oder NFS."],
      ["SAN", "Storage Area Network: separates Speichernetz mit blockbasiertem Zugriff über Fibre Channel oder iSCSI."],
      ["LUN", "Logical Unit Number: logisches Laufwerk, das ein SAN einem Server als Blockgerät bereitstellt."],
      ["iSCSI", "Protokoll, das SCSI-Blockbefehle über TCP/IP überträgt (Port 3260); besteht aus Initiator und Target."],
      ["Fibre Channel", "Hochleistungs-Speichernetzprotokoll mit eigenen HBAs und Switches, adressiert über WWNs."],
      ["SMB", "Server Message Block: dateibasiertes Freigabeprotokoll, vor allem in Windows-Netzen (TCP 445)."],
      ["NFS", "Network File System: dateibasiertes Freigabeprotokoll aus der Unix-/Linux-Welt (Port 2049)."],
      ["HBA", "Host Bus Adapter: Schnittstellenkarte im Server zur Anbindung an ein Fibre-Channel-SAN."]
    ],
    cards: [
      ["Wer formatiert beim SAN das Dateisystem?", "Der Server selbst – das SAN liefert nur Blöcke (LUN)."],
      ["Welche Rollen gibt es bei iSCSI?", "Initiator (Client/Server) und Target (Speichersystem)."],
      ["Wofür dient Zoning im FC-SAN?", "Es legt fest, welche Server (HBAs) welche Speicherports sehen dürfen – Zugriffsschutz und Segmentierung."]
    ]
  },
  {
    id: "ga1-backup",
    area: "GA1",
    extra: false,
    title: "Datensicherung",
    overview: [
      "RAID schützt vor Plattenausfall, <b>Backup</b> vor Datenverlust (Löschen, Ransomware, Brand, Diebstahl).",
      "Vollsicherung = alles; inkrementell = Änderungen seit <b>letzter Sicherung</b>; differenziell = Änderungen seit <b>letzter Vollsicherung</b>.",
      "<b>3-2-1-Regel</b>: 3 Kopien, 2 verschiedene Medien, 1 Kopie außer Haus.",
      "Ransomware-Schutz durch <b>offline</b> (Air Gap) oder <b>immutable</b> (unveränderliche) Backups.",
      "GFS (Großvater-Vater-Sohn) regelt die Aufbewahrung; regelmäßige Wiederherstellungstests sind Pflicht."
    ],
    content: `
<h3>RAID ist kein Backup</h3>
<p>RAID erhöht die <b>Verfügbarkeit</b> bei Hardwaredefekten. Wird eine Datei gelöscht oder von Ransomware verschlüsselt, wird diese Änderung sofort auf alle Platten übertragen. Ein <b>Backup</b> ist eine zeitlich versetzte, getrennte Kopie, aus der ein früherer Zustand wiederhergestellt werden kann.</p>
<h3>Sicherungsarten</h3>
<table>
<tr><th>Art</th><th>Sichert</th><th>Archivbit</th><th>Speicherbedarf</th><th>Wiederherstellung</th></tr>
<tr><td>Vollsicherung</td><td>alle Daten</td><td>wird zurückgesetzt</td><td>hoch</td><td>nur 1 Satz nötig</td></tr>
<tr><td>Inkrementell</td><td>Änderungen seit der letzten Sicherung (egal welcher Art)</td><td>wird zurückgesetzt</td><td>gering</td><td>Voll + <b>alle</b> Inkremente</td></tr>
<tr><td>Differenziell</td><td>Änderungen seit der letzten Vollsicherung</td><td>bleibt gesetzt</td><td>wächst täglich</td><td>Voll + <b>letzte</b> Differenzielle</td></tr>
</table>
<h3>3-2-1-Regel und Ransomware</h3>
<p>Die <b>3-2-1-Regel</b> fordert mindestens <b>3</b> Kopien der Daten (Original + 2 Backups) auf <b>2</b> unterschiedlichen Medientypen, davon <b>1</b> Kopie an einem anderen Standort (Offsite). Erweitert als <b>3-2-1-1-0</b>: zusätzlich eine Kopie offline/immutable und 0 Fehler bei der Prüfung.</p>
<ul>
<li><b>Offline/Air Gap</b>: z. B. ausgelagerte LTO-Bänder – für Angreifer im Netz nicht erreichbar.</li>
<li><b>Immutable Storage</b>: WORM bzw. Object Lock (S3) – Sicherungen können für eine definierte Frist weder geändert noch gelöscht werden.</li>
<li>Backup-Server nicht in der Produktivdomäne, eigene Zugangsdaten, MFA.</li>
</ul>
<h3>Aufbewahrung nach GFS</h3>
<p>Beim <b>Großvater-Vater-Sohn-Prinzip</b> gibt es tägliche (Sohn), wöchentliche (Vater) und monatliche (Großvater) Sicherungen mit gestaffelten Aufbewahrungszeiten. Gesetzliche Fristen (z. B. 10 Jahre für Buchungsbelege nach HGB/AO) sind zu beachten.</p>
<h3>RPO, RTO und Tests</h3>
<p><b>RPO</b> (Recovery Point Objective) = maximal tolerierter Datenverlust (bestimmt die Sicherungsfrequenz), <b>RTO</b> (Recovery Time Objective) = maximal tolerierte Ausfallzeit. Ein Backup ist nur so gut wie die erfolgreiche <b>Wiederherstellung</b> – deshalb regelmäßig Restore-Tests durchführen und dokumentieren.</p>
<div class="example"><b>Beispiel:</b> Sonntags Vollsicherung (2 TB), Mo–Sa inkrementell. Fällt der Server am Donnerstagabend nach der Sicherung aus, werden Voll + Mo + Di + Mi + Do zurückgespielt. Bei differenzieller Sicherung genügen Voll + Do.</div>
<div class="tip"><b>Prüfungstipp:</b> Backup-Fenster berechnen: Datenmenge ÷ Durchsatz. Auf Einheiten (MB vs. Mbit, 1 TB = 1.000.000 MB) achten!</div>
`,
    terms: [
      ["Vollsicherung", "Sicherung aller ausgewählten Daten unabhängig vom Änderungsstand; Grundlage für inkrementelle und differenzielle Sicherungen."],
      ["Inkrementelle Sicherung", "Sichert nur Daten, die sich seit der letzten Sicherung (Voll oder inkrementell) geändert haben."],
      ["Differenzielle Sicherung", "Sichert alle Daten, die sich seit der letzten Vollsicherung geändert haben; wächst bis zur nächsten Vollsicherung an."],
      ["3-2-1-Regel", "3 Datenkopien auf 2 verschiedenen Medientypen, davon 1 Kopie außer Haus."],
      ["Immutable Backup", "Unveränderliche Sicherung (WORM/Object Lock), die für eine festgelegte Zeit nicht geändert oder gelöscht werden kann."],
      ["Air Gap", "Physische oder logische Trennung des Backups vom Netzwerk (z. B. ausgelagerte Bänder)."],
      ["GFS-Prinzip", "Großvater-Vater-Sohn: Rotationsschema mit täglichen, wöchentlichen und monatlichen Sicherungen."],
      ["RPO", "Recovery Point Objective: maximal akzeptabler Datenverlust, gemessen als Zeitraum seit der letzten Sicherung."],
      ["RTO", "Recovery Time Objective: maximal akzeptable Zeit bis zur Wiederherstellung des Betriebs."]
    ],
    cards: [
      ["Was braucht man zur Wiederherstellung bei inkrementeller Sicherung?", "Die letzte Vollsicherung und alle inkrementellen Sicherungen seitdem."],
      ["Warum schützt RAID 1 nicht vor Ransomware?", "Die Verschlüsselung wird sofort auf beide Spiegelplatten geschrieben."],
      ["Was bestimmt der RPO?", "Die notwendige Sicherungsfrequenz (z. B. RPO 4 h → mindestens alle 4 h sichern)."],
      ["Warum sind Restore-Tests wichtig?", "Nur ein erfolgreich getesteter Restore beweist, dass das Backup vollständig und nutzbar ist."]
    ]
  },
  {
    id: "ga1-ad",
    area: "GA1",
    extra: false,
    title: "Active Directory",
    overview: [
      "Active Directory (AD DS) ist der Verzeichnisdienst von Windows: zentrale Verwaltung von Benutzern, Computern und Gruppen.",
      "Struktur: Gesamtstruktur (Forest) → Domänen (Tree) → Organisationseinheiten (OUs).",
      "Gruppenbereiche: <b>global</b> (Benutzer der eigenen Domäne), <b>domänenlokal</b> (Berechtigungen auf Ressourcen), <b>universell</b> (gesamtstrukturweit).",
      "<b>AGDLP</b>: Accounts → Global Groups → Domain Local Groups → Permissions.",
      "OUs dienen der Strukturierung, Delegation und GPO-Verknüpfung – nicht der Berechtigungsvergabe auf Dateien."
    ],
    content: `
<h3>Aufbau</h3>
<p><b>Active Directory Domain Services (AD DS)</b> speichert Objekte wie Benutzer, Computer, Gruppen und Drucker in einer hierarchischen Datenbank, die auf <b>Domänencontrollern (DCs)</b> repliziert wird. Basis ist DNS; abgefragt wird per LDAP (Port 389/636), authentifiziert per Kerberos.</p>
<ul>
<li><b>Gesamtstruktur (Forest)</b>: oberste Sicherheitsgrenze, gemeinsames Schema und globaler Katalog.</li>
<li><b>Domäne</b>: Verwaltungs- und Replikationseinheit, z. B. <code>firma.local</code>.</li>
<li><b>Organisationseinheit (OU)</b>: Container zur Strukturierung (z. B. nach Standort/Abteilung), für Delegation von Verwaltungsrechten und Verknüpfung von GPOs.</li>
</ul>
<h3>Gruppentypen und -bereiche</h3>
<p><b>Sicherheitsgruppen</b> können Berechtigungen erhalten, <b>Verteilergruppen</b> dienen nur E-Mail-Verteilern.</p>
<table>
<tr><th>Bereich</th><th>Mitglieder</th><th>Verwendung</th></tr>
<tr><td>Global</td><td>Konten und globale Gruppen der <b>eigenen</b> Domäne</td><td>Zusammenfassen von Benutzern nach Rolle/Abteilung</td></tr>
<tr><td>Domänenlokal</td><td>Konten, globale und universelle Gruppen aus allen Domänen der Gesamtstruktur (und vertrauter Domänen) sowie domänenlokale der eigenen Domäne</td><td>Vergabe von Berechtigungen auf Ressourcen der eigenen Domäne</td></tr>
<tr><td>Universell</td><td>Konten, globale und universelle Gruppen aus der gesamten Gesamtstruktur</td><td>Domänenübergreifende Zusammenfassung, im globalen Katalog gespeichert</td></tr>
</table>
<h3>AGDLP / AGUDLP</h3>
<ol>
<li><b>A</b>ccounts (Benutzerkonten) werden Mitglied in</li>
<li><b>G</b>lobalen Gruppen (nach Rolle, z. B. <code>GG_Vertrieb</code>), diese werden Mitglied in</li>
<li><b>D</b>omänen<b>L</b>okalen Gruppen (nach Ressource und Recht, z. B. <code>DL_Vertrieb_Ändern</code>), denen</li>
<li><b>P</b>ermissions (Berechtigungen) auf die Ressource zugewiesen werden.</li>
</ol>
<p>In Multi-Domänen-Umgebungen ergänzt man universelle Gruppen (<b>AGUDLP</b>). Vorteil: Rollen und Ressourcen sind entkoppelt, Änderungen erfolgen nur an der Gruppenmitgliedschaft – Berechtigungen auf Dateisystemen bleiben stabil und nachvollziehbar.</p>
<div class="example"><b>Beispiel:</b> Neue Vertriebsmitarbeiterin Frau Kaya wird in <code>GG_Vertrieb</code> aufgenommen. Da <code>GG_Vertrieb</code> Mitglied von <code>DL_Angebote_Ändern</code> ist und diese Gruppe NTFS-„Ändern“ auf <code>\\\\fs01\\Angebote</code> besitzt, hat sie sofort Zugriff – ohne die ACL anzufassen.</div>
<div class="tip"><b>Prüfungstipp:</b> Berechtigungen nie direkt an Benutzer vergeben! Rechte immer an domänenlokale Gruppen, Benutzer immer in globale Gruppen.</div>
`,
    terms: [
      ["Active Directory", "Verzeichnisdienst von Microsoft zur zentralen Verwaltung von Benutzern, Computern, Gruppen und Richtlinien in einer Domäne."],
      ["Domänencontroller", "Server, der die AD-Datenbank hält, repliziert und Anmeldungen (Kerberos) durchführt."],
      ["Organisationseinheit (OU)", "Container im AD zur Strukturierung von Objekten, zur Delegation von Verwaltungsrechten und zur Verknüpfung von GPOs."],
      ["Globale Gruppe", "Gruppe, die Konten der eigenen Domäne enthält; dient der Zusammenfassung von Benutzern nach Rolle."],
      ["Domänenlokale Gruppe", "Gruppe, der Berechtigungen auf Ressourcen der eigenen Domäne zugewiesen werden; kann Mitglieder aus der ganzen Gesamtstruktur enthalten."],
      ["Universelle Gruppe", "Gesamtstrukturweite Gruppe, im globalen Katalog gespeichert, für domänenübergreifende Zusammenfassungen."],
      ["AGDLP", "Best Practice: Accounts → Global Groups → Domain Local Groups → Permissions."],
      ["Gesamtstruktur (Forest)", "Oberste logische Einheit und Sicherheitsgrenze im AD mit gemeinsamem Schema und globalem Katalog."]
    ],
    cards: [
      ["Wofür steht AGDLP?", "Accounts → Global Groups → Domain Local Groups → Permissions."],
      ["Kann man einer OU NTFS-Berechtigungen geben?", "Nein, OUs sind keine Sicherheitsprinzipale – Berechtigungen bekommen Benutzer oder Gruppen."],
      ["Was ist der Unterschied zwischen Sicherheits- und Verteilergruppe?", "Nur Sicherheitsgruppen können Berechtigungen erhalten; Verteilergruppen dienen nur E-Mail."]
    ]
  },
  {
    id: "ga1-ntfs",
    area: "GA1",
    extra: false,
    title: "NTFS- und Freigabeberechtigungen",
    overview: [
      "<b>Freigabeberechtigungen</b> gelten nur beim Zugriff über das Netzwerk (SMB), <b>NTFS</b> immer (lokal und Netzwerk).",
      "Innerhalb einer Ebene addieren sich Berechtigungen aus Gruppenmitgliedschaften (kumulativ).",
      "Effektive Berechtigung über das Netz = die <b>restriktivere</b> der beiden Ebenen.",
      "Explizites <b>Verweigern</b> schlägt Zulassen (Ausnahme: explizites Zulassen schlägt geerbtes Verweigern).",
      "Berechtigungen werden standardmäßig an Unterordner <b>vererbt</b>; Vererbung kann unterbrochen werden."
    ],
    content: `
<h3>Zwei Ebenen</h3>
<p>Beim Zugriff auf eine Windows-Dateifreigabe werden zwei Berechtigungsebenen geprüft:</p>
<table>
<tr><th>Merkmal</th><th>Freigabeberechtigungen</th><th>NTFS-Berechtigungen</th></tr>
<tr><td>Gültig bei</td><td>nur Netzwerkzugriff</td><td>lokalem und Netzwerkzugriff</td></tr>
<tr><td>Stufen</td><td>Lesen, Ändern, Vollzugriff</td><td>Lesen, Ausführen, Ordnerinhalt anzeigen, Schreiben, Ändern, Vollzugriff (+ spezielle)</td></tr>
<tr><td>Granularität</td><td>ganze Freigabe</td><td>jede Datei/jeder Ordner</td></tr>
</table>
<p>Best Practice: Freigabe großzügig (z. B. „Authentifizierte Benutzer: Ändern“ oder „Vollzugriff“), feine Steuerung über NTFS.</p>
<h3>Effektive Berechtigungen ermitteln</h3>
<ol>
<li><b>Je Ebene kumulieren</b>: Alle Berechtigungen des Benutzers und seiner Gruppen werden addiert (das Höchste gewinnt).</li>
<li><b>Verweigern berücksichtigen</b>: Ein explizites „Verweigern“ entfernt das entsprechende Recht.</li>
<li><b>Ebenen kombinieren</b>: Bei Netzwerkzugriff gilt die <b>restriktivere</b> (geringere) der beiden Ergebnisse.</li>
</ol>
<div class="example"><b>Beispiel:</b> Herr Braun ist in <code>Vertrieb</code> (Freigabe: Lesen; NTFS: Ändern) und in <code>Projekt</code> (Freigabe: Ändern; NTFS: Lesen). Freigabe kumuliert = Ändern, NTFS kumuliert = Ändern → über das Netz effektiv <b>Ändern</b>. Sitzt er lokal am Server, gilt nur NTFS = Ändern.</div>
<h3>Vererbung</h3>
<p>NTFS-Berechtigungen werden vom übergeordneten Ordner an Unterordner und Dateien <b>vererbt</b> (grau dargestellt). Die Vererbung kann deaktiviert werden; dabei werden die geerbten Einträge entweder in explizite umgewandelt oder entfernt. Beim <b>Kopieren</b> erhält eine Datei die Rechte des Zielordners, beim <b>Verschieben innerhalb desselben Volumes</b> behält sie – sofern explizit gesetzt – ihre Rechte bei.</p>
<h3>Rangfolge bei Konflikten</h3>
<ol>
<li>Explizit verweigern</li>
<li>Explizit zulassen</li>
<li>Geerbt verweigern</li>
<li>Geerbt zulassen</li>
</ol>
<p>„Verweigern“ sollte sparsam eingesetzt werden, da es auch über Gruppen wirkt und schwer nachvollziehbar ist.</p>
<div class="tip"><b>Prüfungstipp:</b> Erst innerhalb jeder Ebene addieren, dann zwischen den Ebenen das Minimum nehmen. Verweigern prüfen!</div>
`,
    terms: [
      ["Freigabeberechtigung", "Berechtigung auf einer SMB-Freigabe (Lesen, Ändern, Vollzugriff), die nur beim Zugriff über das Netzwerk wirkt."],
      ["NTFS-Berechtigung", "Dateisystemberechtigung auf Dateien und Ordnern, die bei lokalem und Netzwerkzugriff gilt."],
      ["Effektive Berechtigung", "Tatsächlich wirksames Recht eines Benutzers nach Kumulierung aller Gruppen und Kombination von Freigabe und NTFS (restriktivere gilt)."],
      ["Vererbung", "Automatische Weitergabe von NTFS-Berechtigungen vom übergeordneten Ordner an Unterordner und Dateien."],
      ["Explizites Verweigern", "Direkt gesetzter Deny-Eintrag, der zulassende Berechtigungen für das betreffende Recht aufhebt."],
      ["ACL", "Access Control List: Liste der Zugriffssteuerungseinträge (ACEs) eines Objekts."],
      ["Besitzer", "Benutzer, der ein Objekt erstellt oder übernommen hat und dessen Berechtigungen immer ändern kann."]
    ],
    cards: [
      ["Welche Berechtigung gilt bei lokaler Anmeldung am Fileserver?", "Nur die NTFS-Berechtigung – Freigabeberechtigungen greifen lokal nicht."],
      ["Freigabe: Vollzugriff, NTFS: Lesen – was gilt über das Netz?", "Lesen (die restriktivere Ebene)."],
      ["Schlägt explizites Zulassen ein geerbtes Verweigern?", "Ja, explizite Einträge haben Vorrang vor geerbten."]
    ]
  },
  {
    id: "ga1-kerberos",
    area: "GA1",
    extra: false,
    title: "Authentifizierung mit Kerberos",
    overview: [
      "Kerberos ist das Standard-Authentifizierungsprotokoll im Active Directory (UDP/TCP 88).",
      "Der <b>KDC</b> auf dem Domänencontroller besteht aus <b>Authentication Service (AS)</b> und <b>Ticket Granting Service (TGS)</b>.",
      "Nach der Anmeldung erhält der Client ein <b>TGT</b>; damit fordert er beim TGS <b>Service-Tickets</b> für Netzwerkdienste an.",
      "Das Passwort wird nie im Klartext übertragen; Single Sign-on durch wiederverwendbare Tickets.",
      "Zeitsynchronisation ist Pflicht: Standardtoleranz <b>5 Minuten</b>."
    ],
    content: `
<h3>Grundprinzip</h3>
<p><b>Kerberos</b> ist ein ticketbasiertes Authentifizierungsprotokoll mit einer vertrauenswürdigen dritten Instanz, dem <b>Key Distribution Center (KDC)</b>. Im AD läuft der KDC auf jedem Domänencontroller. Er besteht aus:</p>
<ul>
<li><b>Authentication Service (AS)</b>: prüft die Identität und stellt das <b>Ticket Granting Ticket (TGT)</b> aus.</li>
<li><b>Ticket Granting Service (TGS)</b>: stellt gegen Vorlage des TGT <b>Service-Tickets</b> für bestimmte Dienste aus.</li>
</ul>
<h3>Ablauf einer Anmeldung</h3>
<ol>
<li><b>AS-REQ</b>: Der Client sendet seine Benutzerkennung und einen mit dem aus dem Passwort abgeleiteten Schlüssel verschlüsselten Zeitstempel (Pre-Authentication) an den AS.</li>
<li><b>AS-REP</b>: Der AS prüft den Zeitstempel und liefert das TGT (verschlüsselt mit dem Schlüssel des Kontos <code>krbtgt</code>) sowie einen Sitzungsschlüssel.</li>
<li><b>TGS-REQ</b>: Will der Benutzer auf einen Dienst (z. B. Fileserver) zugreifen, sendet er TGT + Authenticator + Dienstnamen (SPN) an den TGS.</li>
<li><b>TGS-REP</b>: Der TGS liefert ein <b>Service-Ticket</b>, verschlüsselt mit dem Schlüssel des Dienstkontos.</li>
<li><b>AP-REQ</b>: Der Client legt das Service-Ticket beim Zielserver vor. Dieser entschlüsselt es selbst – ohne erneute DC-Anfrage – und gewährt Zugriff.</li>
</ol>
<div class="example"><b>Beispiel:</b> Frau Weber meldet sich morgens am PC an (TGT, gültig standardmäßig 10 h). Beim Öffnen von <code>\\\\fs01\\Projekte</code> fordert Windows automatisch ein Service-Ticket für <code>cifs/fs01</code> an. Mit <code>klist</code> kann sie ihre Tickets anzeigen.</div>
<h3>Zeitsynchronisation</h3>
<p>Tickets und Authenticatoren enthalten Zeitstempel, um <b>Replay-Angriffe</b> zu verhindern. Weicht die Uhrzeit von Client und DC um mehr als <b>5 Minuten</b> (Standard) ab, schlägt die Anmeldung fehl. In der Domäne synchronisieren Clients die Zeit per <b>NTP</b> (W32Time) mit den DCs, der PDC-Emulator mit einer externen Zeitquelle.</p>
<h3>Vorteile</h3>
<ul>
<li>Single Sign-on – Passwort nur einmal eingeben.</li>
<li>Gegenseitige Authentifizierung (Client und Server).</li>
<li>Kein Passwort im Netz; Tickets zeitlich begrenzt.</li>
</ul>
<p>Fallback ist das ältere <b>NTLM</b> (Challenge-Response), z. B. bei Zugriff per IP-Adresse statt DNS-Namen.</p>
<div class="tip"><b>Prüfungstipp:</b> Reihenfolge merken: AS → TGT → TGS → Service-Ticket → Dienst. Ursache „Anmeldung schlägt fehl, Uhrzeit falsch“ = Kerberos-Zeittoleranz.</div>
`,
    terms: [
      ["Kerberos", "Ticketbasiertes Netzwerk-Authentifizierungsprotokoll mit vertrauenswürdiger dritter Instanz (KDC), Port 88."],
      ["KDC", "Key Distribution Center: Kerberos-Instanz auf dem Domänencontroller, bestehend aus AS und TGS."],
      ["Authentication Service (AS)", "Teil des KDC, der den Benutzer authentifiziert und das TGT ausstellt."],
      ["Ticket Granting Service (TGS)", "Teil des KDC, der gegen Vorlage eines TGT Service-Tickets für Dienste ausstellt."],
      ["TGT", "Ticket Granting Ticket: Nachweis der erfolgreichen Anmeldung, mit dem weitere Service-Tickets angefordert werden."],
      ["Service-Ticket", "Ticket für einen bestimmten Dienst (SPN), verschlüsselt mit dessen Schlüssel und beim Zielserver vorgelegt."],
      ["SPN", "Service Principal Name: eindeutiger Name eines Dienstes, z. B. cifs/fs01.firma.local."],
      ["Zeittoleranz", "Maximal zulässige Uhrzeitabweichung zwischen Client und KDC, standardmäßig 5 Minuten."]
    ],
    cards: [
      ["Warum ist Zeitsynchronisation für Kerberos nötig?", "Zeitstempel in Tickets/Authenticatoren schützen vor Replay-Angriffen; zu große Abweichung führt zur Ablehnung."],
      ["Muss der Fileserver beim Zugriff den DC kontaktieren?", "Nein, er entschlüsselt das Service-Ticket mit seinem eigenen Schlüssel."],
      ["Mit welchem Befehl zeigt man Kerberos-Tickets unter Windows an?", "klist"]
    ]
  },
  {
    id: "ga1-gpo",
    area: "GA1",
    extra: false,
    title: "Gruppenrichtlinien (GPO)",
    overview: [
      "Gruppenrichtlinienobjekte (GPOs) konfigurieren Computer und Benutzer zentral im AD.",
      "Verarbeitungsreihenfolge <b>LSDOU</b>: Lokal → Standort → Domäne → OU (übergeordnet → untergeordnet).",
      "Die <b>zuletzt</b> angewendete GPO gewinnt bei Konflikten – also meist die OU-nächste.",
      "„Erzwungen“ (Enforced) und „Vererbung deaktivieren“ beeinflussen die Rangfolge.",
      "<code>gpupdate /force</code> aktualisiert, <code>gpresult /r</code> zeigt angewendete Richtlinien."
    ],
    content: `
<h3>Aufbau einer GPO</h3>
<p>Ein <b>Gruppenrichtlinienobjekt (GPO)</b> enthält Einstellungen in zwei Bereichen: <b>Computerkonfiguration</b> (wirkt beim Systemstart, auf Computerobjekte) und <b>Benutzerkonfiguration</b> (wirkt bei der Anmeldung, auf Benutzerobjekte). Jeweils unterteilt in <b>Richtlinien</b> (erzwungen, Benutzer kann nicht ändern) und <b>Einstellungen/Preferences</b> (Vorgaben, z. B. Laufwerkszuordnungen). GPOs werden mit der Gruppenrichtlinienverwaltung (GPMC) erstellt und mit Standort, Domäne oder OU <b>verknüpft</b>; gespeichert werden sie im SYSVOL der DCs.</p>
<h3>Verarbeitungsreihenfolge LSDOU</h3>
<ol>
<li><b>L</b>okale Richtlinie des Computers</li>
<li><b>S</b>tandort (Site)</li>
<li><b>D</b>omäne</li>
<li><b>OU</b> – von der übergeordneten zur untergeordneten OU</li>
</ol>
<p>Spätere Einstellungen überschreiben frühere. Ausnahmen:</p>
<ul>
<li><b>Erzwungen (Enforced)</b>: Die GPO kann von untergeordneten GPOs nicht überschrieben werden und gilt trotz Vererbungssperre.</li>
<li><b>Vererbung deaktivieren</b> (an einer OU): übergeordnete GPOs werden nicht angewendet – außer erzwungene.</li>
<li><b>Sicherheitsfilterung</b> und <b>WMI-Filter</b> schränken ein, für wen eine GPO gilt.</li>
</ul>
<h3>Client-Härtung und Sicherheitsrichtlinien</h3>
<table>
<tr><th>Bereich</th><th>Beispiele</th></tr>
<tr><td>Kontorichtlinien (Domänenebene)</td><td>Kennwortlänge, -komplexität, Kontosperrung</td></tr>
<tr><td>Lokale Richtlinien</td><td>Überwachung (Audit), Benutzerrechte, Sicherheitsoptionen</td></tr>
<tr><td>Härtung</td><td>Windows-Firewall, BitLocker, USB-Sperre, AppLocker, Deaktivieren von SMBv1</td></tr>
<tr><td>Software/Updates</td><td>WSUS-Server, Softwareverteilung, Defender-Einstellungen</td></tr>
</table>
<p>Vorteil: <b>zentrale Verwaltung</b> – eine Änderung wirkt auf Hunderte Clients, einheitlich und dokumentiert.</p>
<h3>Werkzeuge</h3>
<ul>
<li><code>gpupdate /force</code> – Richtlinien sofort neu anwenden (sonst alle 90 Min. ± 30 Min.).</li>
<li><code>gpresult /r</code> bzw. <code>gpresult /h bericht.html</code> – angewendete GPOs (RSoP) anzeigen.</li>
<li><code>rsop.msc</code> – Richtlinienergebnissatz grafisch.</li>
</ul>
<div class="example"><b>Beispiel:</b> In der Domänen-GPO ist das Hintergrundbild „Firmenlogo“ gesetzt, in der GPO der OU „Vertrieb“ „Vertriebslogo“. Ein Benutzer in der OU Vertrieb erhält das Vertriebslogo – außer die Domänen-GPO ist erzwungen.</div>
<div class="tip"><b>Prüfungstipp:</b> Kennwortrichtlinien für Domänenkonten wirken nur über eine GPO auf Domänenebene (Default Domain Policy) – oder über Fine-Grained Password Policies.</div>
`,
    terms: [
      ["GPO", "Group Policy Object: Sammlung von Richtlinieneinstellungen, die mit Standort, Domäne oder OU verknüpft wird."],
      ["LSDOU", "Verarbeitungsreihenfolge der Gruppenrichtlinien: Lokal, Standort, Domäne, OU – Letzte gewinnt."],
      ["Erzwungen (Enforced)", "Option einer GPO-Verknüpfung, die verhindert, dass untergeordnete GPOs ihre Einstellungen überschreiben oder sie blockieren."],
      ["Vererbung deaktivieren", "Einstellung an einer OU, die die Anwendung übergeordneter (nicht erzwungener) GPOs verhindert."],
      ["Sicherheitsfilterung", "Einschränkung der Gültigkeit einer GPO auf bestimmte Benutzer, Gruppen oder Computer."],
      ["gpupdate", "Befehl zur sofortigen Aktualisierung der Gruppenrichtlinien auf einem Client (/force wendet alle neu an)."],
      ["gpresult", "Befehl zur Anzeige der auf Benutzer/Computer angewendeten Gruppenrichtlinien (Richtlinienergebnissatz)."],
      ["SYSVOL", "Freigegebener Ordner auf den Domänencontrollern, in dem GPO-Dateien und Anmeldeskripte gespeichert und repliziert werden."]
    ],
    cards: [
      ["Was bedeutet LSDOU?", "Lokal → Standort → Domäne → OU; die zuletzt angewendete Einstellung gewinnt."],
      ["Wie prüft man, welche GPOs auf einem Client wirken?", "Mit gpresult /r (oder gpresult /h für HTML-Bericht)."],
      ["Wann wird die Computerkonfiguration angewendet?", "Beim Systemstart und danach periodisch im Hintergrund."]
    ]
  }
);

FABI_DATA.questions.push(
  // RAID
  { id: "ga1-raid-1", topic: "ga1-raid", level: 2, type: "number",
    q: "Ein Server erhält ein RAID 6 aus 8 Festplatten mit je 6 TB. Wie groß ist die nutzbare Kapazität? Geben Sie das Ergebnis in TB an.",
    answer: 36, tolerance: 0.01, unit: "TB",
    explain: "RAID 6 benötigt zwei Platten für Parität: (8 − 2) · 6 TB = 36 TB." },
  { id: "ga1-raid-2", topic: "ga1-raid", level: 3, type: "number",
    q: "Ein Fileserver speichert aktuell 12 TB Daten. Das Datenvolumen wächst jährlich um 25 % (bezogen auf den Vorjahresbestand). Welches Datenvolumen ist nach 3 Jahren zu erwarten? Geben Sie das Ergebnis in TB auf zwei Nachkommastellen gerundet an.",
    answer: 23.44, tolerance: 0.01, unit: "TB",
    explain: "Zinseszins-Wachstum: 12 TB · 1,25³ = 12 · 1,953125 = 23,4375 TB ≈ 23,44 TB." },
  { id: "ga1-raid-3", topic: "ga1-raid", level: 3, type: "number",
    q: "Eine Anwendung erzeugt 1.000 IOPS mit 60 % Lese- und 40 % Schreibzugriffen. Die Daten liegen auf einem RAID 5 (Write Penalty 4). Wie viele IOPS müssen die Festplatten (Back-End) insgesamt leisten? Geben Sie das Ergebnis in IOPS an.",
    answer: 2200, tolerance: 0, unit: "IOPS",
    explain: "Lese-IOPS: 600 · 1 = 600; Schreib-IOPS: 400 · 4 = 1.600; Summe = 2.200 Back-End-IOPS." },
  { id: "ga1-raid-4", topic: "ga1-raid", level: 2, type: "match",
    q: "Ordnen Sie jedem RAID-Level die zutreffende Eigenschaft zu.",
    pairs: [
      ["RAID 0", "Keine Redundanz, volle Kapazität aller Platten"],
      ["RAID 1", "Spiegelung, 50 % Nutzkapazität bei zwei Platten"],
      ["RAID 5", "Verteilte einfache Parität, Write Penalty 4"],
      ["RAID 6", "Doppelte Parität, zwei beliebige Platten dürfen ausfallen"],
      ["RAID 10", "Striping über gespiegelte Paare, mindestens vier Platten"]
    ],
    explain: "RAID 0 = Striping ohne Redundanz, RAID 1 = Spiegel, RAID 5 = einfache Parität (n−1), RAID 6 = doppelte Parität (n−2), RAID 10 = Kombination aus Spiegelung und Striping." },

  // SAN/NAS
  { id: "ga1-san-nas-1", topic: "ga1-san-nas", level: 1, type: "single",
    q: "Welche Aussage beschreibt ein NAS korrekt?",
    options: [
      "Es stellt Server-LUNs blockbasiert über Fibre Channel bereit.",
      "Es stellt Dateien über Netzwerkprotokolle wie SMB oder NFS dateibasiert bereit.",
      "Es ist eine direkt per SAS an genau einen Server angeschlossene Festplatte.",
      "Es ist ein reines Bandlaufwerk zur Offline-Sicherung."
    ],
    answer: 1,
    explain: "Ein NAS verwaltet sein eigenes Dateisystem und stellt Freigaben dateibasiert per SMB/NFS im LAN bereit. Blockzugriff über FC ist typisch für ein SAN, direkt angeschlossene Platten sind DAS." },
  { id: "ga1-san-nas-2", topic: "ga1-san-nas", level: 2, type: "match",
    q: "Ordnen Sie die Protokolle der passenden Beschreibung zu.",
    pairs: [
      ["iSCSI", "Blockzugriff, SCSI-Befehle über TCP/IP (Port 3260)"],
      ["Fibre Channel", "Blockzugriff über eigenes Speichernetz mit HBAs und WWNs"],
      ["SMB", "Dateizugriff, Standard in Windows-Netzen (TCP 445)"],
      ["NFS", "Dateizugriff, Standard in Linux-/Unix-Umgebungen"]
    ],
    explain: "iSCSI und Fibre Channel sind blockbasierte SAN-Protokolle, SMB und NFS dateibasierte NAS-Protokolle." },
  { id: "ga1-san-nas-3", topic: "ga1-san-nas", level: 3, type: "multi",
    q: "Ein Unternehmen plant für einen Hyper-V-Failover-Cluster eine iSCSI-Anbindung an ein Speichersystem. Welche Aussagen sind zutreffend? (Mehrere Antworten sind richtig.)",
    options: [
      "Die Hyper-V-Hosts formatieren die bereitgestellte LUN selbst mit einem Dateisystem.",
      "Für iSCSI sind zwingend Fibre-Channel-Switches erforderlich.",
      "Der iSCSI-Datenverkehr sollte in einem eigenen VLAN bzw. Netz vom Client-LAN getrennt werden.",
      "Die Hosts agieren als iSCSI-Initiatoren, das Speichersystem als Target.",
      "Bei iSCSI werden die Daten dateibasiert per SMB übertragen."
    ],
    answer: [0, 2, 3],
    explain: "iSCSI liefert Blockgeräte (LUNs), die der Host selbst formatiert; Hosts sind Initiatoren, der Speicher ist Target. Getrennte Netze verbessern Performance und Sicherheit. iSCSI läuft über normales Ethernet (keine FC-Switches) und ist blockbasiert, nicht SMB." },

  // Backup
  { id: "ga1-backup-1", topic: "ga1-backup", level: 2, type: "number",
    q: "Sonntags wird eine Vollsicherung von 2 TB erstellt. Von Montag bis Samstag ändern sich täglich jeweils 100 GB <b>andere</b> Daten. Es wird täglich <b>differenziell</b> gesichert. Wie groß ist das gesamte Sicherungsvolumen einer Woche (Vollsicherung + 6 differenzielle Sicherungen)? Geben Sie das Ergebnis in GB an (1 TB = 1.000 GB).",
    answer: 4100, tolerance: 0, unit: "GB",
    explain: "Differenzielle Sicherungen wachsen: 100 + 200 + 300 + 400 + 500 + 600 = 2.100 GB. Zuzüglich Vollsicherung 2.000 GB ergibt 4.100 GB." },
  { id: "ga1-backup-2", topic: "ga1-backup", level: 2, type: "number",
    q: "Eine Vollsicherung von 4 TB soll über eine Verbindung mit einem effektiven Durchsatz von 400 MB/s auf ein Backup-Ziel geschrieben werden. Wie lange dauert die Sicherung? Geben Sie das Ergebnis in Stunden auf zwei Nachkommastellen gerundet an (1 TB = 1.000.000 MB).",
    answer: 2.78, tolerance: 0.01, unit: "h",
    explain: "4.000.000 MB ÷ 400 MB/s = 10.000 s; 10.000 s ÷ 3.600 s/h = 2,777… h ≈ 2,78 h." },
  { id: "ga1-backup-3", topic: "ga1-backup", level: 2, type: "single",
    q: "Sonntags erfolgt eine Vollsicherung, Montag bis Samstag jeweils eine <b>inkrementelle</b> Sicherung. Am Donnerstagabend (nach der Donnerstagssicherung) fällt der Server aus. Welche Sicherungen werden für die vollständige Wiederherstellung benötigt?",
    options: [
      "Nur die Vollsicherung vom Sonntag",
      "Vollsicherung vom Sonntag und die Sicherung vom Donnerstag",
      "Vollsicherung vom Sonntag sowie die Sicherungen von Montag, Dienstag, Mittwoch und Donnerstag",
      "Nur die Sicherungen von Montag bis Donnerstag"
    ],
    answer: 2,
    explain: "Inkrementelle Sicherungen enthalten nur die Änderungen seit der jeweils letzten Sicherung. Daher werden die Vollsicherung und alle Inkremente in der richtigen Reihenfolge benötigt. Voll + letzte Sicherung würde bei differenzieller Sicherung genügen." },
  { id: "ga1-backup-4", topic: "ga1-backup", level: 3, type: "multi",
    q: "Ein mittelständisches Unternehmen möchte seine Datensicherung gegen Ransomware absichern. Welche Maßnahmen sind dafür geeignet? (Mehrere Antworten sind richtig.)",
    options: [
      "Einsatz eines unveränderlichen (immutable) Backup-Speichers mit Object Lock",
      "Umstellung des Fileservers von RAID 5 auf RAID 6",
      "Regelmäßige Auslagerung von Bändern an einen externen Standort (offline)",
      "Ablage der Sicherungen auf einer permanent verbundenen Netzwerkfreigabe, auf die alle Domänen-Admins Schreibzugriff haben",
      "Regelmäßige, dokumentierte Wiederherstellungstests"
    ],
    answer: [0, 2, 4],
    explain: "Immutable und offline gelagerte Backups können von Ransomware nicht verschlüsselt werden; Restore-Tests stellen sicher, dass die Wiederherstellung funktioniert. Ein anderes RAID-Level schützt nicht vor Verschlüsselung, und eine dauerhaft beschreibbare Freigabe wird mitverschlüsselt." },

  // AD
  { id: "ga1-ad-1", topic: "ga1-ad", level: 1, type: "single",
    q: "Wofür steht das Prinzip AGDLP in Active Directory?",
    options: [
      "Accounts → Domain Local Groups → Global Groups → Permissions",
      "Administrators → Group Policies → Domains → Logons → Permissions",
      "Accounts → Global Groups → Domain Local Groups → Permissions",
      "Accounts → Groups → Directory → LDAP → Permissions"
    ],
    answer: 2,
    explain: "Benutzerkonten kommen in globale Gruppen, diese in domänenlokale Gruppen, und den domänenlokalen Gruppen werden die Berechtigungen zugewiesen." },
  { id: "ga1-ad-2", topic: "ga1-ad", level: 2, type: "match",
    q: "Ordnen Sie die AD-Objekte bzw. Gruppenbereiche ihrem typischen Einsatzzweck zu.",
    pairs: [
      ["Globale Gruppe", "Zusammenfassen von Benutzern der eigenen Domäne nach Rolle"],
      ["Domänenlokale Gruppe", "Zuweisen von Berechtigungen auf eine Ressource"],
      ["Universelle Gruppe", "Domänenübergreifende Zusammenfassung, im globalen Katalog gespeichert"],
      ["Organisationseinheit", "Strukturierung, Delegation und Verknüpfung von GPOs"]
    ],
    explain: "Globale Gruppen bündeln Rollen, domänenlokale Gruppen erhalten Rechte, universelle Gruppen wirken gesamtstrukturweit, OUs dienen der Struktur/Delegation/GPO-Verknüpfung." },
  { id: "ga1-ad-3", topic: "ga1-ad", level: 3, type: "single",
    q: "Ein Administrator soll nach AGDLP umsetzen, dass alle Mitarbeiter des Einkaufs Änderungsrechte auf den Ordner <code>D:\\Lieferanten</code> erhalten. Welche Umsetzung ist korrekt?",
    options: [
      "Die Benutzer in die domänenlokale Gruppe DL_Lieferanten_Ändern aufnehmen und dieser Gruppe die globale Gruppe GG_Einkauf als Berechtigung auf den Ordner geben.",
      "Die Benutzer in GG_Einkauf aufnehmen, GG_Einkauf zum Mitglied von DL_Lieferanten_Ändern machen und DL_Lieferanten_Ändern NTFS-„Ändern“ auf den Ordner geben.",
      "Die OU „Einkauf“ direkt mit NTFS-„Ändern“ auf den Ordner berechtigen.",
      "Jedem Einkaufsmitarbeiter einzeln NTFS-„Ändern“ auf den Ordner zuweisen."
    ],
    answer: 1,
    explain: "AGDLP: Accounts in die globale Gruppe (Rolle), globale Gruppe in die domänenlokale Gruppe (Ressource + Recht), domänenlokale Gruppe erhält die Berechtigung. OUs sind keine Sicherheitsprinzipale; Einzelberechtigungen widersprechen dem Konzept." },
  { id: "ga1-ad-4", topic: "ga1-ad", level: 2, type: "multi",
    q: "Welche Aussagen zu Organisationseinheiten (OUs) in Active Directory sind richtig? (Mehrere Antworten sind richtig.)",
    options: [
      "OUs können mit Gruppenrichtlinienobjekten verknüpft werden.",
      "OUs können als Sicherheitsprinzipal NTFS-Berechtigungen erhalten.",
      "Über OUs können Verwaltungsrechte delegiert werden, z. B. Kennwort-Zurücksetzen für die Helpdesk-Gruppe.",
      "OUs können verschachtelt werden, z. B. nach Standort und Abteilung.",
      "Eine OU bildet die oberste Sicherheitsgrenze im AD."
    ],
    answer: [0, 2, 3],
    explain: "OUs dienen der Strukturierung (verschachtelbar), der Delegation und der GPO-Verknüpfung. Sie sind keine Sicherheitsprinzipale; die oberste Sicherheitsgrenze ist die Gesamtstruktur (Forest)." },

  // NTFS
  { id: "ga1-ntfs-1", topic: "ga1-ntfs", level: 2, type: "single",
    q: "Ein Ordner ist freigegeben mit der Freigabeberechtigung „Jeder: Lesen“. Die NTFS-Berechtigung für die Gruppe Vertrieb lautet „Ändern“. Welche effektive Berechtigung hat ein Vertriebsmitarbeiter beim Zugriff <b>über das Netzwerk</b>?",
    options: ["Vollzugriff", "Ändern", "Lesen", "Kein Zugriff"],
    answer: 2,
    explain: "Bei Netzwerkzugriff gilt die restriktivere Berechtigung beider Ebenen: Freigabe Lesen vs. NTFS Ändern → Lesen." },
  { id: "ga1-ntfs-2", topic: "ga1-ntfs", level: 3, type: "single",
    q: "Frau Schulz ist Mitglied der Gruppen <code>Buchhaltung</code> und <code>Azubis</code>. Freigabe: Buchhaltung = Ändern, Azubis = Lesen. NTFS: Buchhaltung = Ändern, Azubis = <b>Schreiben verweigern</b> (explizit). Welche effektive Berechtigung hat Frau Schulz über das Netzwerk?",
    options: [
      "Ändern",
      "Lesen (inkl. Ausführen), aber kein Schreiben",
      "Vollzugriff",
      "Kein Zugriff"
    ],
    answer: 1,
    explain: "Freigabe kumuliert = Ändern. NTFS kumuliert = Ändern, aber das explizite Verweigern von Schreiben entfernt die Schreibrechte → effektiv Lesen/Ausführen. Die restriktivere Ebene ist damit NTFS: Lesen ohne Schreiben." },
  { id: "ga1-ntfs-3", topic: "ga1-ntfs", level: 1, type: "single",
    q: "Ein Administrator meldet sich lokal am Fileserver an und öffnet den Ordner <code>D:\\Daten</code>. Welche Berechtigungen werden dabei geprüft?",
    options: [
      "Nur die Freigabeberechtigungen",
      "Nur die NTFS-Berechtigungen",
      "Freigabe- und NTFS-Berechtigungen, die restriktivere gilt",
      "Keine, da lokale Zugriffe nicht geprüft werden"
    ],
    answer: 1,
    explain: "Freigabeberechtigungen wirken nur beim Netzwerkzugriff über SMB. Lokal werden ausschließlich die NTFS-Berechtigungen ausgewertet." },
  { id: "ga1-ntfs-4", topic: "ga1-ntfs", level: 3, type: "multi",
    q: "Welche Aussagen zur NTFS-Vererbung und Rangfolge von Berechtigungen sind korrekt? (Mehrere Antworten sind richtig.)",
    options: [
      "Ein explizites Zulassen hat Vorrang vor einem geerbten Verweigern.",
      "Ein geerbtes Zulassen hat Vorrang vor einem expliziten Verweigern.",
      "Beim Deaktivieren der Vererbung können die geerbten Einträge in explizite Einträge umgewandelt werden.",
      "Berechtigungen aus mehreren Gruppen eines Benutzers addieren sich innerhalb der NTFS-Ebene.",
      "Unterordner erben standardmäßig keine Berechtigungen vom übergeordneten Ordner."
    ],
    answer: [0, 2, 3],
    explain: "Rangfolge: explizit verweigern > explizit zulassen > geerbt verweigern > geerbt zulassen. Beim Unterbrechen der Vererbung kann man geerbte Einträge kopieren (explizit machen) oder entfernen. Gruppenrechte kumulieren. Vererbung ist standardmäßig aktiv." },

  // Kerberos
  { id: "ga1-kerberos-1", topic: "ga1-kerberos", level: 1, type: "single",
    q: "Welche Komponente des Kerberos-KDC stellt das Ticket Granting Ticket (TGT) aus?",
    options: ["Ticket Granting Service (TGS)", "Authentication Service (AS)", "Der Zielserver (z. B. Fileserver)", "Der DNS-Server"],
    answer: 1,
    explain: "Der Authentication Service prüft die Identität bei der Anmeldung und stellt das TGT aus. Der TGS stellt anschließend Service-Tickets gegen Vorlage des TGT aus." },
  { id: "ga1-kerberos-2", topic: "ga1-kerberos", level: 2, type: "match",
    q: "Ordnen Sie die Schritte des Kerberos-Ablaufs der richtigen Beschreibung zu.",
    pairs: [
      ["AS-REQ", "Client sendet Benutzerkennung und verschlüsselten Zeitstempel an den KDC"],
      ["AS-REP", "KDC liefert TGT und Sitzungsschlüssel"],
      ["TGS-REQ", "Client legt TGT vor und fordert Ticket für einen Dienst an"],
      ["TGS-REP", "KDC liefert das Service-Ticket"],
      ["AP-REQ", "Client legt das Service-Ticket beim Zielserver vor"]
    ],
    explain: "Ablauf: Anmeldung beim AS (AS-REQ/REP) → TGT; Anforderung beim TGS (TGS-REQ/REP) → Service-Ticket; Vorlage beim Dienst (AP-REQ)." },
  { id: "ga1-kerberos-3", topic: "ga1-kerberos", level: 3, type: "single",
    q: "Nach einem BIOS-Batteriewechsel geht die Uhr eines Domänen-Clients 12 Minuten nach. Benutzer können sich nicht mehr an der Domäne anmelden, Netzwerkverbindung und DNS funktionieren. Was ist die wahrscheinlichste Ursache?",
    options: [
      "Das Computerkonto wurde im AD deaktiviert.",
      "Die Zeitabweichung überschreitet die Kerberos-Toleranz von standardmäßig 5 Minuten, Tickets werden abgelehnt.",
      "Die Gruppenrichtlinien wurden noch nicht per gpupdate aktualisiert.",
      "Der Client verwendet NTFS statt FAT32."
    ],
    answer: 1,
    explain: "Kerberos nutzt Zeitstempel gegen Replay-Angriffe. Weicht die Zeit um mehr als 5 Minuten (Standard) vom DC ab, schlägt die Authentifizierung fehl. Lösung: Zeit per NTP/W32Time mit dem DC synchronisieren." },

  // GPO
  { id: "ga1-gpo-1", topic: "ga1-gpo", level: 1, type: "single",
    q: "In welcher Reihenfolge werden Gruppenrichtlinien standardmäßig verarbeitet?",
    options: [
      "OU → Domäne → Standort → Lokal",
      "Domäne → Lokal → OU → Standort",
      "Lokal → Standort → Domäne → OU",
      "Standort → Lokal → OU → Domäne"
    ],
    answer: 2,
    explain: "LSDOU: Lokal, Standort (Site), Domäne, OU. Die zuletzt verarbeitete Einstellung gewinnt bei Konflikten." },
  { id: "ga1-gpo-2", topic: "ga1-gpo", level: 3, type: "single",
    q: "Die mit der Domäne verknüpfte GPO „Basis“ sperrt USB-Speicher und ist als <b>Erzwungen</b> markiert. An der OU „Entwicklung“ ist „Vererbung deaktivieren“ gesetzt, und eine dort verknüpfte GPO erlaubt USB-Speicher. Was gilt für einen Computer in der OU „Entwicklung“?",
    options: [
      "USB-Speicher ist erlaubt, da die OU-GPO zuletzt angewendet wird.",
      "USB-Speicher ist erlaubt, da die Vererbung an der OU deaktiviert ist.",
      "USB-Speicher ist gesperrt, da erzwungene GPOs Vererbungssperren überwinden und nicht überschrieben werden können.",
      "Keine der beiden GPOs wird angewendet, da ein Konflikt vorliegt."
    ],
    answer: 2,
    explain: "Eine erzwungene GPO wird trotz „Vererbung deaktivieren“ angewendet und ihre Einstellungen können von untergeordneten GPOs nicht überschrieben werden. USB bleibt gesperrt." },
  { id: "ga1-gpo-3", topic: "ga1-gpo", level: 2, type: "match",
    q: "Ordnen Sie die Befehle bzw. Werkzeuge ihrer Funktion zu.",
    pairs: [
      ["gpupdate /force", "Wendet alle Gruppenrichtlinien sofort erneut an"],
      ["gpresult /r", "Zeigt die angewendeten GPOs für Benutzer und Computer an"],
      ["gpmc.msc", "Konsole zum Erstellen und Verknüpfen von GPOs"],
      ["klist", "Zeigt die zwischengespeicherten Kerberos-Tickets an"]
    ],
    explain: "gpupdate aktualisiert Richtlinien, gpresult zeigt den Richtlinienergebnissatz, die GPMC verwaltet GPOs zentral, klist listet Kerberos-Tickets." },
  { id: "ga1-gpo-4", topic: "ga1-gpo", level: 2, type: "multi",
    q: "Welche Maßnahmen zur Client-Härtung lassen sich zentral per Gruppenrichtlinie umsetzen? (Mehrere Antworten sind richtig.)",
    options: [
      "Mindestkennwortlänge und Kontosperrung für Domänenkonten",
      "Austausch defekter Netzteile in den Clients",
      "Sperren von USB-Wechseldatenträgern",
      "Aktivieren und Konfigurieren der Windows-Firewall",
      "Physisches Abschließen des Serverraums"
    ],
    answer: [0, 2, 3],
    explain: "Kennwort-/Sperrrichtlinien, Geräteinstallationsbeschränkungen (USB) und Firewall-Regeln sind GPO-Einstellungen. Hardwaretausch und physische Zutrittskontrolle sind keine Softwarekonfiguration." }
);
