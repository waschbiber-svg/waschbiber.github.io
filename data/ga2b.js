window.FABI_DATA = window.FABI_DATA || { topics: [], questions: [] };
FABI_DATA.topics.push(
  {
    id: "ga2-wlan-planung",
    area: "GA2",
    extra: false,
    title: "WLAN-Planung & Dimensionierung",
    overview: [
      "Die <b>Bruttodatenrate</b> ist die theoretische Funkrate, die <b>Nettodatenrate</b> (real nutzbar) liegt meist nur bei ca. 50–60 % davon.",
      "Ein Access Point ist ein <b>Shared Medium</b>: Die Nettodatenrate wird auf alle aktiven Clients aufgeteilt.",
      "AP-Anzahl = Maximum aus Bandbreitenbedarf und Client-Grenze – <b>immer aufrunden</b>.",
      "2,4 GHz: nur <b>Kanäle 1, 6, 11</b> überlappungsfrei (20 MHz); 5 GHz bietet viele überlappungsfreie Kanäle.",
      "Wi-Fi 6 = 802.11ax, Wi-Fi 6E = 802.11ax im 6-GHz-Band, Wi-Fi 7 = 802.11be."
    ],
    content: `<h3>Brutto- vs. Nettodatenrate</h3>
<p>Hersteller geben die <b>Bruttodatenrate</b> an (z. B. „bis 1200 Mbit/s“). Sie beschreibt die maximale Rate auf der Funkschnittstelle unter Idealbedingungen. Durch Protokoll-Overhead (Header, ACKs, Wartezeiten durch CSMA/CA), Störungen und Entfernung ist die real nutzbare <b>Nettodatenrate</b> deutlich geringer – als Faustregel ca. <b>50 %</b> (in Aufgaben ist der Prozentsatz meist vorgegeben).</p>
<p>WLAN ist ein <b>geteiltes Medium</b> (Halbduplex): Alle Clients einer Funkzelle teilen sich die Nettodatenrate des Access Points.</p>
<h3>Dimensionierung von Access Points</h3>
<ol>
<li>Gesamtbedarf berechnen: <code>Clients × Bandbreite pro Client</code></li>
<li>Nettodatenrate pro AP bestimmen: <code>Brutto × Nettoanteil</code></li>
<li>APs nach Bandbreite: <code>Gesamtbedarf ÷ Netto pro AP</code> → aufrunden</li>
<li>APs nach Client-Grenze: <code>Clients ÷ max. Clients pro AP</code> → aufrunden</li>
<li>Der <b>größere</b> Wert ist die Mindestanzahl.</li>
</ol>
<div class="example"><b>Beispiel:</b> 60 Clients benötigen je 10 Mbit/s = 600 Mbit/s. Ein AP hat brutto 866 Mbit/s, netto 50 % = 433 Mbit/s. 600 ÷ 433 = 1,39 → 2 APs. Bei max. 25 Clients pro AP: 60 ÷ 25 = 2,4 → 3 APs. Ergebnis: <b>3 APs</b>.</div>
<h3>Kanalplanung</h3>
<table>
<tr><th>Band</th><th>Eigenschaften</th><th>Planung</th></tr>
<tr><td>2,4 GHz</td><td>Kanalabstand 5 MHz, Kanalbreite ca. 20–22 MHz, große Reichweite, viele Störquellen</td><td>Nur <b>1, 6, 11</b> überlappungsfrei nutzen</td></tr>
<tr><td>5 GHz</td><td>Viele überlappungsfreie 20-MHz-Kanäle (36, 40, 44, 48 …), Kanalbündelung 40/80/160 MHz, DFS-Kanäle</td><td>Benachbarte APs auf unterschiedliche Kanäle; breite Kanäle reduzieren die Anzahl freier Kanäle</td></tr>
<tr><td>6 GHz</td><td>Nur Wi-Fi 6E/7, sehr viele Kanäle, geringe Reichweite</td><td>Ideal für hohe Dichte</td></tr>
</table>
<p><b>Kanalüberlappung</b>: Nutzen benachbarte APs überlappende Kanäle (z. B. 1 und 3), stören sie sich gegenseitig (Adjacent Channel Interference). Gleicher Kanal (Co-Channel) führt zu geteilter Sendezeit. Benachbarte Zellen werden daher wabenförmig mit 1/6/11 belegt.</p>
<h3>WLAN-Standards</h3>
<table>
<tr><th>Bezeichnung</th><th>IEEE</th><th>Bänder</th><th>Neuerungen</th></tr>
<tr><td>Wi-Fi 4</td><td>802.11n</td><td>2,4/5 GHz</td><td>MIMO</td></tr>
<tr><td>Wi-Fi 5</td><td>802.11ac</td><td>5 GHz</td><td>MU-MIMO (Downlink), 160 MHz</td></tr>
<tr><td>Wi-Fi 6/6E</td><td>802.11ax</td><td>2,4/5 (6E: +6 GHz)</td><td>OFDMA, Target Wake Time, BSS Coloring, WPA3 Pflicht</td></tr>
<tr><td>Wi-Fi 7</td><td>802.11be</td><td>2,4/5/6 GHz</td><td>320 MHz, 4096-QAM, Multi-Link Operation (MLO)</td></tr>
</table>
<div class="tip"><b>Prüfungstipp:</b> Bei AP-Berechnungen immer beide Grenzen (Bandbreite und Clients) prüfen und stets aufrunden – 2,1 APs bedeuten 3 Geräte.</div>`,
    terms: [
      ["Bruttodatenrate", "Theoretische maximale Übertragungsrate der Funkschnittstelle inklusive Protokoll-Overhead."],
      ["Nettodatenrate", "Tatsächlich nutzbare Datenrate nach Abzug von Overhead; im WLAN oft nur ca. 50 % der Bruttorate."],
      ["Shared Medium", "Übertragungsmedium, das sich alle Teilnehmer einer Funkzelle teilen; die Datenrate wird aufgeteilt."],
      ["Überlappungsfreie Kanäle", "Kanäle, deren Frequenzbereiche sich nicht überschneiden; im 2,4-GHz-Band 1, 6 und 11."],
      ["Co-Channel Interference", "Störungen bzw. geteilte Sendezeit, wenn benachbarte APs denselben Kanal nutzen."],
      ["OFDMA", "Verfahren ab Wi-Fi 6, das einen Kanal in Ressourceneinheiten aufteilt, um mehrere Clients gleichzeitig zu bedienen."],
      ["Wi-Fi 6E", "802.11ax mit zusätzlicher Nutzung des 6-GHz-Bandes."],
      ["Multi-Link Operation (MLO)", "Wi-Fi-7-Funktion, bei der ein Client gleichzeitig mehrere Bänder/Kanäle nutzt."]
    ],
    cards: [
      ["Warum muss bei der AP-Dimensionierung aufgerundet werden?", "Weil nur ganze Geräte installiert werden können und der Bedarf sonst nicht gedeckt wäre."],
      ["Warum sind im 2,4-GHz-Band die Kanäle 1, 6 und 11 überlappungsfrei?", "Der Kanalabstand beträgt 5 MHz, ein Kanal ist ca. 20–22 MHz breit – erst 5 Kanäle Abstand (25 MHz) verhindern Überlappung."],
      ["Welcher Nachteil entsteht bei 80-MHz-Kanälen im 5-GHz-Band?", "Es stehen weniger überlappungsfreie Kanäle zur Verfügung, was die Kanalplanung bei vielen APs erschwert."],
      ["Welche IEEE-Norm steht hinter Wi-Fi 7?", "IEEE 802.11be."]
    ]
  },
  {
    id: "ga2-wlan-sicherheit",
    area: "GA2",
    extra: false,
    title: "WLAN-Sicherheit & 802.1X",
    overview: [
      "<b>WPA2/WPA3-Personal</b>: gemeinsames Passwort (PSK bzw. bei WPA3 <b>SAE</b>) für alle Nutzer.",
      "<b>WPA2/WPA3-Enterprise</b>: individuelle Anmeldung über <b>802.1X</b> und einen <b>RADIUS</b>-Server.",
      "802.1X-Rollen: <b>Supplicant</b> (Client), <b>Authenticator</b> (AP/Switch), <b>Authentication Server</b> (RADIUS).",
      "<b>EAP-TLS</b>: Zertifikate auf Client und Server; <b>PEAP</b>: Serverzertifikat + Benutzername/Passwort im TLS-Tunnel.",
      "Gast-WLAN: eigene SSID, eigenes VLAN, Client-Isolation, nur Internetzugang."
    ],
    content: `<h3>Personal vs. Enterprise</h3>
<table>
<tr><th>Merkmal</th><th>Personal</th><th>Enterprise</th></tr>
<tr><td>Authentifizierung</td><td>Gemeinsamer Schlüssel (WPA2: PSK, WPA3: SAE)</td><td>Individuell per 802.1X/EAP über RADIUS</td></tr>
<tr><td>Benutzerverwaltung</td><td>Keine; Passwortwechsel betrifft alle</td><td>Zentral (z. B. Active Directory), Konten einzeln sperrbar</td></tr>
<tr><td>Einsatz</td><td>Privat, Kleinstbüro</td><td>Unternehmen, Hochschulen</td></tr>
</table>
<p><b>WPA3-Personal</b> ersetzt den PSK-basierten Schlüsselaustausch durch <b>SAE</b> (Simultaneous Authentication of Equals, „Dragonfly“). SAE schützt vor <b>Offline-Wörterbuchangriffen</b> auf mitgeschnittene Handshakes und bietet <b>Forward Secrecy</b>. WPA3 schreibt außerdem Protected Management Frames (PMF) vor.</p>
<h3>IEEE 802.1X</h3>
<p>802.1X ist ein Standard für <b>portbasierte Netzzugangskontrolle</b> (LAN und WLAN). Bis zur erfolgreichen Anmeldung lässt der Authenticator nur EAP-Verkehr durch.</p>
<ul>
<li><b>Supplicant</b>: Endgerät bzw. Software, die sich anmelden will</li>
<li><b>Authenticator</b>: Access Point oder Switch; leitet EAP-Nachrichten weiter (EAPoL zum Client, RADIUS zum Server)</li>
<li><b>Authentication Server</b>: meist <b>RADIUS</b>-Server, prüft die Anmeldedaten (oft gegen Verzeichnisdienst)</li>
</ul>
<p><b>RADIUS</b> (Remote Authentication Dial-In User Service) nutzt UDP-Port <b>1812</b> (Authentifizierung) und <b>1813</b> (Accounting) und bietet AAA: Authentication, Authorization, Accounting. Vorteil: <b>zentrale Authentifizierung</b> – ausscheidende Mitarbeitende werden an einer Stelle gesperrt, Zugriffe sind protokollierbar, per RADIUS-Attribut kann ein VLAN dynamisch zugewiesen werden.</p>
<h3>EAP-Methoden</h3>
<table>
<tr><th>Methode</th><th>Server-Zertifikat</th><th>Client-Zertifikat</th><th>Bemerkung</th></tr>
<tr><td>EAP-TLS</td><td>ja</td><td>ja</td><td>Gegenseitige Zertifikatsauthentifizierung, sehr sicher, PKI nötig</td></tr>
<tr><td>PEAP (MSCHAPv2)</td><td>ja</td><td>nein</td><td>TLS-Tunnel, darin Benutzername/Passwort</td></tr>
<tr><td>EAP-TTLS</td><td>ja</td><td>nein</td><td>Ähnlich PEAP, flexiblere innere Methoden</td></tr>
</table>
<div class="example"><b>Beispiel:</b> Eine Firma mit 200 Mitarbeitenden nutzt WPA3-Enterprise mit PEAP. Der AP leitet die Anmeldung an den RADIUS-Server (NPS) weiter, der die AD-Zugangsdaten prüft und je nach Gruppenzugehörigkeit VLAN 10 (Verwaltung) oder VLAN 20 (Produktion) zuweist.</div>
<h3>Gast-WLAN</h3>
<ul>
<li>Eigene SSID in einem <b>separaten VLAN</b>, per Firewall vom internen Netz getrennt</li>
<li><b>Client-Isolation</b>: Gäste können sich nicht gegenseitig erreichen</li>
<li>Nur Internetzugang, ggf. Bandbreitenbegrenzung, Captive Portal mit Nutzungsbedingungen, zeitlich begrenzte Voucher</li>
</ul>
<div class="tip"><b>Prüfungstipp:</b> „Zentrale Verwaltung, individuelle Konten, sperrbar“ → immer WPA2/3-Enterprise mit 802.1X und RADIUS.</div>`,
    terms: [
      ["WPA3-Personal", "WLAN-Sicherheitsstandard mit gemeinsamem Passwort, das per SAE gegen Offline-Wörterbuchangriffe geschützt wird."],
      ["SAE", "Simultaneous Authentication of Equals; Schlüsselaustausch von WPA3-Personal mit Forward Secrecy."],
      ["IEEE 802.1X", "Standard zur portbasierten Netzzugangskontrolle mit den Rollen Supplicant, Authenticator und Authentication Server."],
      ["Supplicant", "Client bzw. Software, die Zugang zum Netz anfordert."],
      ["Authenticator", "Netzgerät (AP/Switch), das den Port kontrolliert und EAP-Nachrichten an den Authentifizierungsserver weiterleitet."],
      ["RADIUS", "AAA-Protokoll für zentrale Authentifizierung, Autorisierung und Accounting (UDP 1812/1813)."],
      ["EAP-TLS", "EAP-Methode mit gegenseitiger Authentifizierung über Server- und Client-Zertifikate."],
      ["PEAP", "EAP-Methode, die einen TLS-Tunnel mit Serverzertifikat aufbaut, in dem sich der Nutzer z. B. per Passwort anmeldet."],
      ["Client-Isolation", "AP-Funktion, die direkte Kommunikation zwischen WLAN-Clients unterbindet."]
    ],
    cards: [
      ["Welcher Nachteil hat WPA2-Personal in Unternehmen?", "Alle nutzen denselben Schlüssel; verlässt jemand das Unternehmen, muss das Passwort auf allen Geräten geändert werden, Zugriffe sind nicht personenbezogen."],
      ["Welche Aufgabe hat der Access Point bei 802.1X?", "Er ist Authenticator: Er blockiert den Zugang bis zur erfolgreichen Anmeldung und leitet EAP-Nachrichten zwischen Client und RADIUS-Server weiter."],
      ["Was bedeutet AAA bei RADIUS?", "Authentication (Wer bist du?), Authorization (Was darfst du?), Accounting (Was hast du getan/Protokollierung)."],
      ["Wie wird ein Gast-WLAN vom internen Netz getrennt?", "Über ein eigenes VLAN mit Firewallregeln, die nur Internetzugriff erlauben, plus Client-Isolation."]
    ]
  },
  {
    id: "ga2-routing",
    area: "GA2",
    extra: false,
    title: "Routing & Routingtabellen",
    overview: [
      "Router entscheiden anhand der <b>Routingtabelle</b>, an welchen <b>Next Hop</b> bzw. welches Interface ein Paket geht.",
      "<b>Longest Prefix Match</b>: Die Route mit dem längsten passenden Präfix (spezifischste Route) gewinnt.",
      "Bei gleichem Präfix entscheidet die <b>administrative Distanz</b> (kleiner = vertrauenswürdiger).",
      "<b>Default Route</b> 0.0.0.0/0 passt auf jedes Ziel und wird nur genutzt, wenn keine spezifischere Route existiert.",
      "Cisco: <code>ip route &lt;Netz&gt; &lt;Maske&gt; &lt;Next Hop&gt;</code>, Anzeige mit <code>show ip route</code>."
    ],
    content: `<h3>Aufbau einer Routingtabelle</h3>
<p>Jeder Eintrag enthält mindestens <b>Zielnetz mit Präfix</b>, <b>Next Hop</b> (IP-Adresse des nächsten Routers) und/oder <b>Ausgangsinterface</b>, dazu Metrik und Herkunft. Direkt angeschlossene Netze trägt der Router automatisch ein, sobald ein Interface mit IP-Adresse aktiv ist.</p>
<h3>Longest Prefix Match</h3>
<p>Passen mehrere Einträge auf eine Zieladresse, wird die Route mit der <b>längsten Subnetzmaske</b> gewählt. Erst wenn keine Route passt, greift die Default Route; fehlt auch diese, wird das Paket verworfen (ICMP „Destination Unreachable“).</p>
<h3>Administrative Distanz (Cisco)</h3>
<table>
<tr><th>Quelle</th><th>AD</th></tr>
<tr><td>Direkt verbunden (C)</td><td>0</td></tr>
<tr><td>Statische Route (S)</td><td>1</td></tr>
<tr><td>eBGP</td><td>20</td></tr>
<tr><td>OSPF (O)</td><td>110</td></tr>
<tr><td>RIP (R)</td><td>120</td></tr>
</table>
<p>Die AD vergleicht Routen <b>gleichen Präfixes</b> aus verschiedenen Quellen. Die Metrik vergleicht Routen innerhalb desselben Protokolls. Wichtig: Longest Prefix Match hat Vorrang vor der AD.</p>
<h3>Cisco IOS</h3>
<pre>Router(config)# ip route 10.20.0.0 255.255.0.0 192.168.1.3
Router(config)# ip route 0.0.0.0 0.0.0.0 203.0.113.1
Router# show ip route
Codes: C - connected, L - local, S - static, O - OSPF, * - candidate default
Gateway of last resort is 203.0.113.1 to network 0.0.0.0
S*    0.0.0.0/0 [1/0] via 203.0.113.1
S     10.0.0.0/8 [1/0] via 192.168.1.2
S     10.20.0.0/16 [1/0] via 192.168.1.3
O     172.16.0.0/16 [110/20] via 192.168.1.5, GigabitEthernet0/0
C     192.168.1.0/24 is directly connected, GigabitEthernet0/0
L     192.168.1.1/32 is directly connected, GigabitEthernet0/0</pre>
<p>In <code>[1/0]</code> steht die erste Zahl für die administrative Distanz, die zweite für die Metrik.</p>
<div class="example"><b>Beispiel:</b> Ein Paket an 10.20.5.9 passt auf 0.0.0.0/0, 10.0.0.0/8 und 10.20.0.0/16. Gewählt wird 10.20.0.0/16 (längstes Präfix) → Next Hop 192.168.1.3. Ein Paket an 10.30.1.1 passt nur auf /8 und /0 → Next Hop 192.168.1.2. Ein Paket an 8.8.8.8 geht über die Default Route an 203.0.113.1.</div>
<h3>Vorgehen bei Prüfungsaufgaben</h3>
<ol>
<li>Zieladresse binär bzw. blockweise mit jedem Netz vergleichen (liegt sie im Adressbereich?).</li>
<li>Von allen passenden Einträgen den mit dem größten Präfix wählen.</li>
<li>Bei gleichem Präfix die kleinste AD, dann die kleinste Metrik.</li>
</ol>
<div class="tip"><b>Prüfungstipp:</b> Für Präfixe wie /22 den Adressbereich ermitteln: Blockgröße im 3. Oktett = 2^(24−22) = 4 → 172.16.4.0/22 umfasst 172.16.4.0 bis 172.16.7.255.</div>`,
    terms: [
      ["Routingtabelle", "Tabelle eines Routers mit Zielnetzen, Next Hops/Interfaces und Metriken zur Weiterleitungsentscheidung."],
      ["Next Hop", "IP-Adresse des nächsten Routers auf dem Weg zum Zielnetz."],
      ["Longest Prefix Match", "Auswahlregel, nach der die passende Route mit der längsten Subnetzmaske verwendet wird."],
      ["Default Route", "Route 0.0.0.0/0, die für alle Ziele ohne spezifischere Route verwendet wird (Gateway of last resort)."],
      ["Statische Route", "Manuell konfigurierte Route; bei Cisco AD 1, Code S."],
      ["Administrative Distanz", "Vertrauenswert einer Routenquelle; bei gleichem Präfix gewinnt die kleinere AD."],
      ["Metrik", "Kostenwert innerhalb eines Routingprotokolls (z. B. Hopanzahl bei RIP, Kosten bei OSPF)."],
      ["Dynamisches Routing", "Router tauschen Routen automatisch über Protokolle wie OSPF oder BGP aus."]
    ],
    cards: [
      ["Was bedeutet der Code S* in show ip route?", "Eine statische Route, die als Kandidat für die Default Route (Gateway of last resort) dient."],
      ["Was hat Vorrang: Longest Prefix Match oder administrative Distanz?", "Longest Prefix Match; die AD entscheidet nur zwischen Routen mit identischem Präfix."],
      ["Wie lautet der Cisco-Befehl für eine Default Route über 203.0.113.1?", "ip route 0.0.0.0 0.0.0.0 203.0.113.1"],
      ["Was passiert mit einem Paket, für das keine Route und keine Default Route existiert?", "Es wird verworfen; der Router sendet ICMP Destination Unreachable an den Absender."]
    ]
  },
  {
    id: "ga2-diagnose",
    area: "GA2",
    extra: false,
    title: "Netzwerkdiagnose & Fehlersuche",
    overview: [
      "<code>ping</code> prüft Erreichbarkeit per ICMP Echo Request/Reply.",
      "<code>tracert</code>/<code>traceroute</code> zeigt die Router (Hops) auf dem Weg zum Ziel.",
      "<code>nslookup</code> testet die DNS-Namensauflösung, <code>ipconfig /all</code> bzw. <code>ip a</code> zeigt die IP-Konfiguration.",
      "<code>arp -a</code> zeigt die Zuordnung IP-Adresse ↔ MAC-Adresse im lokalen Netz.",
      "Fehlersuche systematisch <b>bottom-up</b> nach Schichten: Kabel/Link → IP-Konfiguration → Gateway → Internet per IP → DNS → Anwendung."
    ],
    content: `<h3>Wichtige Werkzeuge</h3>
<table>
<tr><th>Windows</th><th>Linux</th><th>Zweck</th></tr>
<tr><td><code>ipconfig /all</code></td><td><code>ip addr</code>, <code>ip route</code></td><td>IP-Adresse, Maske, Gateway, DNS-Server, DHCP-Status</td></tr>
<tr><td><code>ping</code></td><td><code>ping</code></td><td>Erreichbarkeit und Laufzeit (ICMP Echo)</td></tr>
<tr><td><code>tracert</code></td><td><code>traceroute</code></td><td>Pfad über die Router (Hops) ermitteln</td></tr>
<tr><td><code>nslookup</code></td><td><code>nslookup</code>, <code>dig</code></td><td>DNS-Abfragen testen</td></tr>
<tr><td><code>arp -a</code></td><td><code>ip neigh</code></td><td>ARP-Cache: IP ↔ MAC</td></tr>
<tr><td><code>netstat -an</code></td><td><code>ss -tulpen</code></td><td>Offene Ports und Verbindungen</td></tr>
<tr><td><code>ipconfig /flushdns</code></td><td>–</td><td>DNS-Cache leeren</td></tr>
</table>
<h3>Systematische Fehlerlokalisierung</h3>
<ol>
<li><b>Schicht 1/2</b>: Link-LED, Kabel, WLAN verbunden, richtiges VLAN?</li>
<li><b>IP-Konfiguration</b>: <code>ipconfig</code> – Adresse aus dem richtigen Netz? Eine <b>169.254.x.x</b>-Adresse (APIPA) bedeutet: kein DHCP-Server erreichbar.</li>
<li><b>Loopback</b>: <code>ping 127.0.0.1</code> prüft den lokalen TCP/IP-Stack.</li>
<li><b>Gateway</b>: <code>ping</code> auf das Standardgateway – liegt es im eigenen Subnetz?</li>
<li><b>Externe IP</b>: <code>ping 8.8.8.8</code> – Routing/NAT zum Internet funktioniert?</li>
<li><b>DNS</b>: <code>ping www.beispiel.de</code> bzw. <code>nslookup</code>.</li>
<li><b>Anwendung</b>: Port, Proxy, Firewall, Dienst.</li>
</ol>
<h3>Typische Fehlerbilder</h3>
<table>
<tr><th>Symptom</th><th>Wahrscheinliche Ursache</th></tr>
<tr><td>Ping auf IP klappt, auf Namen nicht</td><td>DNS-Problem (falscher/nicht erreichbarer DNS-Server)</td></tr>
<tr><td>Lokales Netz erreichbar, fremde Netze nicht</td><td>Falsches/fehlendes Standardgateway oder fehlende Route</td></tr>
<tr><td>Adresse 169.254.x.x</td><td>DHCP-Server nicht erreichbar</td></tr>
<tr><td>tracert endet bei einem Hop mit <code>* * *</code></td><td>Paketverlust, Routing-Problem oder ICMP-Filter ab diesem Punkt</td></tr>
<tr><td>tracert zeigt dieselben zwei Router abwechselnd</td><td>Routing-Schleife</td></tr>
<tr><td>„Ziel-Host nicht erreichbar“ vom eigenen Rechner</td><td>Keine ARP-Antwort im lokalen Netz</td></tr>
</table>
<div class="example"><b>Beispiel:</b> Ein Mitarbeiter meldet „Internet geht nicht“. <code>ipconfig</code> zeigt 192.168.20.15/24 und Gateway 192.168.20.1. <code>ping 192.168.20.1</code> und <code>ping 8.8.8.8</code> funktionieren, <code>ping www.ihk.de</code> meldet „Host nicht gefunden“. <code>nslookup</code> zeigt einen Timeout zum DNS-Server 192.168.20.53 → Ursache ist der DNS-Server, nicht das Routing.</div>
<div class="tip"><b>Prüfungstipp:</b> Ein Standardgateway muss immer im <b>eigenen</b> Subnetz liegen – sonst kann der Host es per ARP nicht auflösen.</div>`,
    terms: [
      ["ping", "Diagnosewerkzeug, das per ICMP Echo Request/Reply die Erreichbarkeit und Laufzeit zu einem Ziel prüft."],
      ["traceroute/tracert", "Werkzeug, das durch schrittweise erhöhte TTL-Werte die Router auf dem Weg zum Ziel anzeigt."],
      ["nslookup", "Werkzeug zur Abfrage von DNS-Servern, z. B. zum Test der Namensauflösung."],
      ["ipconfig", "Windows-Befehl zur Anzeige und Steuerung der IP-Konfiguration (z. B. /all, /release, /renew, /flushdns)."],
      ["ARP", "Address Resolution Protocol; ermittelt zu einer IPv4-Adresse im lokalen Netz die MAC-Adresse."],
      ["APIPA", "Automatic Private IP Addressing; Selbstzuweisung von 169.254.0.0/16, wenn kein DHCP-Server antwortet."],
      ["Bottom-up-Fehlersuche", "Systematische Fehlerlokalisierung von der physikalischen Schicht aufwärts bis zur Anwendung."],
      ["Loopback-Test", "ping 127.0.0.1 zur Prüfung des lokalen TCP/IP-Stacks."]
    ],
    cards: [
      ["Ping auf 8.8.8.8 funktioniert, ping auf www.example.com nicht – wo liegt der Fehler?", "Bei der DNS-Namensauflösung (DNS-Server falsch konfiguriert oder nicht erreichbar)."],
      ["Was bedeutet eine IP-Adresse 169.254.12.7 am Client?", "APIPA – der Client hat keine Antwort von einem DHCP-Server erhalten."],
      ["Woran erkennt man eine Routing-Schleife im tracert?", "Dieselben Router-Adressen wiederholen sich abwechselnd, bis die maximale Hopanzahl erreicht ist."],
      ["Warum kann ping fehlschlagen, obwohl der Host erreichbar ist?", "Weil eine Firewall ICMP Echo Requests blockiert."]
    ]
  },
  {
    id: "ga2-tcpip",
    area: "GA2",
    extra: false,
    title: "TCP, UDP, Ports & ICMP",
    overview: [
      "TCP ist <b>verbindungsorientiert</b> und zuverlässig: Aufbau per <b>Three-Way-Handshake</b> SYN → SYN-ACK → ACK.",
      "UDP ist <b>verbindungslos</b>, ohne Bestätigungen – schnell, wenig Overhead (DNS, DHCP, VoIP, Streaming).",
      "Ports adressieren Anwendungen: Well-known 0–1023, Registered 1024–49151, Dynamic 49152–65535.",
      "Die <b>TTL</b> im IP-Header wird von jedem Router um 1 verringert; bei 0 wird das Paket verworfen und <b>ICMP Time Exceeded</b> gesendet.",
      "traceroute nutzt genau diesen Mechanismus, um die Router auf dem Pfad zu ermitteln."
    ],
    content: `<h3>TCP vs. UDP</h3>
<table>
<tr><th>Merkmal</th><th>TCP</th><th>UDP</th></tr>
<tr><td>Verbindung</td><td>verbindungsorientiert (Handshake)</td><td>verbindungslos</td></tr>
<tr><td>Zuverlässigkeit</td><td>Bestätigungen (ACK), Neuübertragung, Reihenfolge über Sequenznummern</td><td>keine Garantie</td></tr>
<tr><td>Flusskontrolle</td><td>ja (Window)</td><td>nein</td></tr>
<tr><td>Header</td><td>mind. 20 Byte</td><td>8 Byte</td></tr>
<tr><td>Beispiele</td><td>HTTP(S), SSH, SMTP, FTP, IMAP, RDP</td><td>DNS-Abfragen, DHCP, TFTP, SNMP, NTP, VoIP (RTP)</td></tr>
</table>
<h3>Three-Way-Handshake</h3>
<ol>
<li>Client → Server: <b>SYN</b>, Sequenznummer x</li>
<li>Server → Client: <b>SYN-ACK</b>, Sequenznummer y, Acknowledgement x+1</li>
<li>Client → Server: <b>ACK</b>, Sequenznummer x+1, Acknowledgement y+1</li>
</ol>
<p>Das SYN-Flag „verbraucht“ eine Sequenznummer, daher wird jeweils +1 bestätigt. Der <b>Verbindungsabbau</b> erfolgt in der Regel mit vier Segmenten: FIN → ACK, FIN → ACK (jede Seite schließt ihre Richtung separat). Ein <b>RST</b> bricht eine Verbindung sofort ab (z. B. Port geschlossen).</p>
<div class="example"><b>Beispiel:</b> Client sendet SYN mit seq=1000. Server antwortet SYN-ACK mit seq=5000, ack=1001. Client bestätigt mit seq=1001, ack=5001. Danach können Daten fließen.</div>
<h3>Wichtige Ports</h3>
<table>
<tr><th>Dienst</th><th>Port</th><th>Dienst</th><th>Port</th></tr>
<tr><td>FTP</td><td>20/21 TCP</td><td>DNS</td><td>53 UDP/TCP</td></tr>
<tr><td>SSH</td><td>22 TCP</td><td>DHCP</td><td>67/68 UDP</td></tr>
<tr><td>Telnet</td><td>23 TCP</td><td>TFTP</td><td>69 UDP</td></tr>
<tr><td>SMTP</td><td>25 TCP (Submission 587)</td><td>HTTP/HTTPS</td><td>80/443 TCP</td></tr>
<tr><td>IMAPS</td><td>993 TCP</td><td>SNMP</td><td>161/162 UDP</td></tr>
<tr><td>RDP</td><td>3389 TCP</td><td>LDAP/LDAPS</td><td>389/636 TCP</td></tr>
</table>
<h3>TTL und ICMP</h3>
<p>Die <b>TTL</b> (Time to Live, IPv6: Hop Limit) verhindert endlos kreisende Pakete. Jeder Router verringert sie um 1. Erreicht sie 0, verwirft der Router das Paket und sendet <b>ICMP Typ 11 „Time Exceeded“</b> an den Absender.</p>
<p><b>traceroute</b> sendet Pakete mit TTL 1, 2, 3 … Jeder Router, bei dem die TTL abläuft, antwortet mit Time Exceeded und verrät so seine Adresse. Das Ziel antwortet mit Echo Reply (Windows) bzw. Port Unreachable (Linux, UDP).</p>
<table>
<tr><th>ICMP-Typ</th><th>Bedeutung</th></tr>
<tr><td>0</td><td>Echo Reply</td></tr>
<tr><td>3</td><td>Destination Unreachable</td></tr>
<tr><td>5</td><td>Redirect</td></tr>
<tr><td>8</td><td>Echo Request</td></tr>
<tr><td>11</td><td>Time Exceeded</td></tr>
</table>
<div class="tip"><b>Prüfungstipp:</b> TTL beim Empfänger = Start-TTL − Anzahl der Router dazwischen. Switches verändern die TTL nicht.</div>`,
    terms: [
      ["Three-Way-Handshake", "TCP-Verbindungsaufbau in drei Schritten: SYN, SYN-ACK, ACK."],
      ["Sequenznummer", "TCP-Feld zur Nummerierung der Bytes, damit der Empfänger Reihenfolge und Vollständigkeit prüfen kann."],
      ["UDP", "Verbindungsloses Transportprotokoll ohne Bestätigungen mit nur 8 Byte Header."],
      ["Port", "16-Bit-Nummer zur Adressierung einer Anwendung bzw. eines Dienstes auf einem Host."],
      ["Socket", "Kombination aus IP-Adresse, Protokoll und Portnummer als Kommunikationsendpunkt."],
      ["TTL", "Time to Live; Zähler im IP-Header, der pro Router um 1 sinkt und bei 0 zum Verwerfen des Pakets führt."],
      ["ICMP Time Exceeded", "ICMP-Typ 11; Meldung eines Routers, dass die TTL eines Pakets abgelaufen ist."],
      ["ICMP Destination Unreachable", "ICMP-Typ 3; Ziel(netz), Host oder Port ist nicht erreichbar."]
    ],
    cards: [
      ["Wie wird eine TCP-Verbindung regulär abgebaut?", "Jede Seite sendet FIN und erhält ein ACK – typischerweise vier Segmente (FIN, ACK, FIN, ACK)."],
      ["Warum nutzt VoIP UDP statt TCP?", "Neuübertragungen verspäteter Pakete wären nutzlos; geringe Latenz ist wichtiger als Vollständigkeit."],
      ["Wie ermittelt traceroute die Router auf dem Pfad?", "Es sendet Pakete mit steigender TTL; jeder Router, bei dem die TTL 0 wird, antwortet mit ICMP Time Exceeded."],
      ["Welche Ports nutzen DHCP-Server und -Client?", "Server UDP 67, Client UDP 68."]
    ]
  },
  {
    id: "ga2-osi",
    area: "GA2",
    extra: true,
    title: "OSI- und TCP/IP-Modell",
    overview: [
      "Das <b>OSI-Modell</b> hat 7 Schichten, das <b>TCP/IP-Modell</b> 4 Schichten.",
      "PDUs: Bit (1), <b>Frame</b> (2), <b>Paket</b> (3), <b>Segment</b>/Datagramm (4), Daten (5–7).",
      "Geräte: Hub/Repeater = 1, Switch/Bridge = 2, Router = 3, Proxy/Application-Gateway = 7.",
      "<b>Kapselung</b>: Jede Schicht fügt beim Senden ihren Header hinzu, der Empfänger entfernt sie in umgekehrter Reihenfolge."
    ],
    content: `<h3>Schichten im Vergleich</h3>
<table>
<tr><th>Nr.</th><th>OSI-Schicht</th><th>TCP/IP-Schicht</th><th>PDU</th><th>Protokolle</th><th>Geräte</th></tr>
<tr><td>7</td><td>Anwendung (Application)</td><td rowspan="3">Anwendung</td><td rowspan="3">Daten</td><td rowspan="3">HTTP, DNS, SMTP, FTP, SSH, DHCP, SNMP</td><td rowspan="3">Proxy, Application-Gateway</td></tr>
<tr><td>6</td><td>Darstellung (Presentation)</td></tr>
<tr><td>5</td><td>Sitzung (Session)</td></tr>
<tr><td>4</td><td>Transport</td><td>Transport</td><td>Segment (TCP) / Datagramm (UDP)</td><td>TCP, UDP</td><td>(Stateful-Firewall)</td></tr>
<tr><td>3</td><td>Vermittlung (Network)</td><td>Internet</td><td>Paket</td><td>IPv4, IPv6, ICMP, IPsec</td><td>Router, Layer-3-Switch</td></tr>
<tr><td>2</td><td>Sicherung (Data Link)</td><td rowspan="2">Netzzugang</td><td>Frame (Rahmen)</td><td>Ethernet, WLAN 802.11, PPP</td><td>Switch, Bridge, Access Point</td></tr>
<tr><td>1</td><td>Bitübertragung (Physical)</td><td>Bit</td><td>Kabel, Funk, Stecker</td><td>Hub, Repeater, Medienkonverter</td></tr>
</table>
<p>Merksatz (von unten): „<b>P</b>lease <b>D</b>o <b>N</b>ot <b>T</b>hrow <b>S</b>ausage <b>P</b>izza <b>A</b>way“ (Physical, Data Link, Network, Transport, Session, Presentation, Application).</p>
<h3>Adressierung je Schicht</h3>
<ul>
<li>Schicht 2: <b>MAC-Adresse</b> (48 Bit) – gilt nur im lokalen Segment</li>
<li>Schicht 3: <b>IP-Adresse</b> – Ende-zu-Ende über Router hinweg</li>
<li>Schicht 4: <b>Port</b> – adressiert die Anwendung</li>
</ul>
<h3>Kapselung (Encapsulation)</h3>
<p>Beim Senden reicht jede Schicht die Daten nach unten weiter und setzt ihren Header davor: Daten → TCP-Header (Segment) → IP-Header (Paket) → Ethernet-Header und FCS-Trailer (Frame) → Bits. Der Empfänger entpackt in umgekehrter Reihenfolge (Decapsulation).</p>
<div class="example"><b>Beispiel:</b> PC A (192.168.1.10) ruft eine Webseite auf Server B (10.0.0.80) in einem anderen Netz auf. Der Frame zum Router trägt als Ziel-MAC die MAC des <b>Gateways</b>, als Ziel-IP aber 10.0.0.80. Der Router entfernt den Ethernet-Rahmen, prüft die Routingtabelle, verringert die TTL um 1 und baut einen <b>neuen Frame</b> mit seiner eigenen MAC als Quelle und der MAC des nächsten Geräts als Ziel. Die IP-Adressen bleiben (ohne NAT) unverändert.</div>
<div class="tip"><b>Prüfungstipp:</b> ARP arbeitet zwischen Schicht 2 und 3; in Zuordnungsaufgaben meist Schicht 2 bzw. „Netzzugang“. Ein WLAN-Access-Point (Bridge) gehört zu Schicht 2.</div>`,
    terms: [
      ["OSI-Modell", "Referenzmodell der ISO mit sieben Schichten zur Beschreibung von Netzwerkkommunikation."],
      ["TCP/IP-Modell", "Praxismodell mit vier Schichten: Netzzugang, Internet, Transport, Anwendung."],
      ["PDU", "Protocol Data Unit; Dateneinheit einer Schicht, z. B. Frame, Paket, Segment."],
      ["Frame", "PDU der Sicherungsschicht (Schicht 2) mit MAC-Adressen und Prüfsumme (FCS)."],
      ["Paket", "PDU der Vermittlungsschicht (Schicht 3) mit IP-Header."],
      ["Segment", "PDU der Transportschicht bei TCP mit Ports und Sequenznummern."],
      ["Kapselung", "Hinzufügen der Header jeder Schicht beim Senden; der Empfänger entfernt sie wieder."],
      ["MAC-Adresse", "48-Bit-Hardwareadresse einer Netzwerkschnittstelle auf Schicht 2."]
    ],
    cards: [
      ["Welche OSI-Schichten fasst die TCP/IP-Anwendungsschicht zusammen?", "Die OSI-Schichten 5 (Sitzung), 6 (Darstellung) und 7 (Anwendung)."],
      ["Auf welcher Schicht arbeitet ein Switch und welche Adresse wertet er aus?", "Schicht 2 (Sicherung); er wertet die Ziel-MAC-Adresse aus."],
      ["Was ändert ein Router beim Weiterleiten (ohne NAT)?", "Er erstellt einen neuen Frame mit neuen MAC-Adressen und verringert die TTL; die IP-Adressen bleiben gleich."]
    ]
  },
  {
    id: "ga2-krypto",
    area: "GA2",
    extra: true,
    title: "Kryptografie & Schutzziele",
    overview: [
      "Schutzziele: <b>Vertraulichkeit</b>, <b>Integrität</b>, <b>Verfügbarkeit</b> (CIA), ergänzt um <b>Authentizität</b> und Verbindlichkeit.",
      "Symmetrisch (z. B. <b>AES</b>): ein gemeinsamer Schlüssel, schnell; Schlüsselanzahl <b>n(n−1)/2</b>.",
      "Asymmetrisch (z. B. <b>RSA</b>): Schlüsselpaar aus öffentlichem und privatem Schlüssel, langsam; Schlüsselanzahl <b>2n</b>.",
      "Hybride Verfahren (TLS, PGP): asymmetrischer Austausch eines symmetrischen Sitzungsschlüssels.",
      "Digitale Signatur: Hashwert wird mit dem <b>privaten Schlüssel des Absenders</b> signiert und mit dessen öffentlichem Schlüssel geprüft."
    ],
    content: `<h3>Schutzziele</h3>
<table>
<tr><th>Schutzziel</th><th>Bedeutung</th><th>Maßnahme</th></tr>
<tr><td>Vertraulichkeit</td><td>Nur Berechtigte können Daten lesen</td><td>Verschlüsselung, Zugriffsrechte</td></tr>
<tr><td>Integrität</td><td>Daten sind unverändert/Änderungen erkennbar</td><td>Hashwerte, Signaturen, MAC</td></tr>
<tr><td>Verfügbarkeit</td><td>Systeme/Daten stehen bei Bedarf bereit</td><td>Redundanz, USV, Backup</td></tr>
<tr><td>Authentizität</td><td>Echtheit des Absenders/der Daten ist nachweisbar</td><td>Digitale Signatur, Zertifikate</td></tr>
</table>
<h3>Symmetrisch vs. asymmetrisch</h3>
<table>
<tr><th>Merkmal</th><th>Symmetrisch</th><th>Asymmetrisch</th></tr>
<tr><td>Schlüssel</td><td>Ein gemeinsamer geheimer Schlüssel</td><td>Schlüsselpaar: öffentlich + privat</td></tr>
<tr><td>Geschwindigkeit</td><td>schnell</td><td>langsam (ca. Faktor 1000)</td></tr>
<tr><td>Problem</td><td>Sicherer Schlüsselaustausch, viele Schlüssel</td><td>Echtheit des öffentlichen Schlüssels (→ PKI/Zertifikate)</td></tr>
<tr><td>Schlüsselanzahl bei n Teilnehmern</td><td>n · (n − 1) / 2</td><td>2 · n</td></tr>
<tr><td>Beispiele</td><td>AES, ChaCha20, 3DES</td><td>RSA, ECC (ECDSA, ECDH), Diffie-Hellman</td></tr>
</table>
<div class="example"><b>Beispiel:</b> 20 Mitarbeitende sollen paarweise vertraulich kommunizieren. Symmetrisch: 20 · 19 / 2 = <b>190</b> Schlüssel. Asymmetrisch: 2 · 20 = <b>40</b> Schlüssel (20 Schlüsselpaare).</div>
<h3>Hybride Verschlüsselung</h3>
<p>Kombiniert die Vorteile: Ein zufälliger <b>symmetrischer Sitzungsschlüssel</b> verschlüsselt die Nutzdaten (schnell). Dieser Sitzungsschlüssel wird mit dem <b>öffentlichen Schlüssel des Empfängers</b> verschlüsselt bzw. per Diffie-Hellman ausgehandelt. Einsatz: TLS/HTTPS, S/MIME, PGP, IPsec, VPN.</p>
<h3>Hashfunktionen</h3>
<p>Eine Hashfunktion (z. B. <b>SHA-256</b>) erzeugt aus beliebigen Daten einen Wert fester Länge (256 Bit). Eigenschaften: Einwegfunktion, kollisionsresistent, kleinste Änderung → völlig anderer Hash. Hashes sichern die <b>Integrität</b>, sind aber <b>keine Verschlüsselung</b>. MD5 und SHA-1 gelten als unsicher.</p>
<h3>Digitale Signatur – wer nutzt welchen Schlüssel?</h3>
<table>
<tr><th>Vorgang</th><th>Schlüssel</th></tr>
<tr><td>Verschlüsseln an Empfänger</td><td>öffentlicher Schlüssel des Empfängers</td></tr>
<tr><td>Entschlüsseln</td><td>privater Schlüssel des Empfängers</td></tr>
<tr><td>Signieren</td><td>privater Schlüssel des Absenders</td></tr>
<tr><td>Signatur prüfen</td><td>öffentlicher Schlüssel des Absenders</td></tr>
</table>
<p>Ablauf: Absender bildet den Hash der Nachricht und signiert ihn mit seinem privaten Schlüssel. Der Empfänger bildet selbst den Hash, prüft die Signatur mit dem öffentlichen Schlüssel des Absenders und vergleicht. Ergebnis: <b>Integrität und Authentizität</b> (nicht Vertraulichkeit).</p>
<div class="tip"><b>Prüfungstipp:</b> „Privat“ wird nur vom Eigentümer benutzt – zum Entschlüsseln und zum Signieren.</div>`,
    terms: [
      ["Vertraulichkeit", "Schutzziel, nach dem nur berechtigte Personen Informationen einsehen können."],
      ["Integrität", "Schutzziel, nach dem Daten vollständig und unverändert sind bzw. Manipulationen erkannt werden."],
      ["Authentizität", "Schutzziel, nach dem die Echtheit eines Kommunikationspartners oder einer Nachricht nachweisbar ist."],
      ["AES", "Symmetrischer Blockverschlüsselungsstandard mit 128-Bit-Blöcken und Schlüssellängen von 128, 192 oder 256 Bit."],
      ["RSA", "Asymmetrisches Verfahren auf Basis der Faktorisierung großer Zahlen, nutzbar für Verschlüsselung und Signaturen."],
      ["SHA-256", "Kryptografische Hashfunktion der SHA-2-Familie mit 256 Bit langem Hashwert."],
      ["Hybride Verschlüsselung", "Kombination aus asymmetrischem Schlüsselaustausch und symmetrischer Datenverschlüsselung."],
      ["Digitale Signatur", "Mit dem privaten Schlüssel des Absenders signierter Hashwert, der Integrität und Authentizität nachweist."],
      ["PKI", "Public-Key-Infrastruktur; bestätigt über Zertifikate einer CA die Zugehörigkeit öffentlicher Schlüssel."]
    ],
    cards: [
      ["Warum nutzt TLS ein hybrides Verfahren?", "Asymmetrische Verfahren lösen den Schlüsselaustausch, sind aber langsam; die Daten werden daher schnell symmetrisch verschlüsselt."],
      ["Welche Schutzziele erfüllt eine digitale Signatur?", "Integrität und Authentizität (sowie Nichtabstreitbarkeit), aber keine Vertraulichkeit."],
      ["Warum ist ein Hash keine Verschlüsselung?", "Er ist eine Einwegfunktion – aus dem Hashwert lassen sich die Originaldaten nicht zurückgewinnen."],
      ["Wie viele Schlüssel benötigen 10 Personen symmetrisch?", "10 · 9 / 2 = 45 Schlüssel."]
    ]
  },
  {
    id: "ga2-vpn-dns",
    area: "GA2",
    extra: true,
    title: "VPN & DNS",
    overview: [
      "<b>Site-to-Site-VPN</b> verbindet Standorte über Gateways, <b>Client-to-Site</b> (Remote Access) einzelne Geräte mit dem Firmennetz.",
      "IPsec: <b>Tunnelmodus</b> kapselt das gesamte IP-Paket mit neuem Header, <b>Transportmodus</b> schützt nur die Nutzdaten.",
      "<b>IKE</b> handelt bei IPsec die Schlüssel und Security Associations aus (UDP 500/4500).",
      "DNS löst Namen in IP-Adressen auf; Client → Resolver <b>rekursiv</b>, Resolver → Root/TLD/autoritativ <b>iterativ</b>.",
      "Records: A, AAAA, CNAME, MX, PTR, NS, TXT; DNS nutzt <b>Port 53 UDP und TCP</b>."
    ],
    content: `<h3>VPN-Typen</h3>
<table>
<tr><th>Typ</th><th>Verbindung</th><th>Beispiel</th></tr>
<tr><td>Site-to-Site</td><td>VPN-Gateway ↔ VPN-Gateway; Clients merken nichts davon</td><td>Filiale mit Zentrale verbinden</td></tr>
<tr><td>Client-to-Site (Remote Access)</td><td>VPN-Client auf dem Endgerät ↔ VPN-Gateway der Firma</td><td>Homeoffice, Außendienst</td></tr>
<tr><td>Client-to-Client (End-to-End)</td><td>Zwei Endgeräte direkt</td><td>Admin ↔ Server</td></tr>
</table>
<h3>VPN-Technologien</h3>
<ul>
<li><b>IPsec</b> (Schicht 3): <b>AH</b> sichert Integrität/Authentizität (keine Verschlüsselung), <b>ESP</b> zusätzlich Vertraulichkeit. Schlüsselaustausch über <b>IKE/IKEv2</b> (UDP 500, mit NAT-Traversal UDP 4500).</li>
<li><b>SSL-/TLS-VPN</b>: über TCP 443, oft clientlos per Browser, firewallfreundlich.</li>
<li><b>WireGuard</b>: schlankes, modernes VPN über UDP mit festen modernen Algorithmen (ChaCha20, Curve25519).</li>
</ul>
<table>
<tr><th>IPsec-Modus</th><th>Was wird geschützt?</th><th>Einsatz</th></tr>
<tr><td>Transportmodus</td><td>Nur die Nutzdaten; der Original-IP-Header bleibt sichtbar</td><td>Host-to-Host</td></tr>
<tr><td>Tunnelmodus</td><td>Gesamtes Original-IP-Paket inkl. Header; neuer äußerer IP-Header mit Gateway-Adressen</td><td>Site-to-Site, Remote Access</td></tr>
</table>
<h3>DNS-Namensauflösung</h3>
<ol>
<li>Der Client prüft Cache und hosts-Datei und sendet dann eine <b>rekursive</b> Anfrage an seinen DNS-Resolver („Liefere mir die endgültige Antwort“).</li>
<li>Der Resolver fragt <b>iterativ</b>: Root-Server → verweist auf .de-TLD-Server → verweist auf den autoritativen Server von beispiel.de → liefert die Antwort.</li>
<li>Der Resolver speichert die Antwort für die Dauer der <b>TTL</b> im Cache.</li>
</ol>
<table>
<tr><th>Record</th><th>Bedeutung</th></tr>
<tr><td>A</td><td>Name → IPv4-Adresse</td></tr>
<tr><td>AAAA</td><td>Name → IPv6-Adresse</td></tr>
<tr><td>CNAME</td><td>Alias auf einen anderen Namen</td></tr>
<tr><td>MX</td><td>Mailserver einer Domain (mit Priorität)</td></tr>
<tr><td>PTR</td><td>Reverse Lookup: IP-Adresse → Name</td></tr>
<tr><td>NS</td><td>Zuständiger (autoritativer) Nameserver einer Zone</td></tr>
<tr><td>TXT</td><td>Freitext, z. B. SPF, DKIM, Domain-Verifizierung</td></tr>
<tr><td>SOA</td><td>Start of Authority: Verwaltungsdaten der Zone</td></tr>
</table>
<p><b>Ports:</b> Normale Anfragen über <b>UDP 53</b>; <b>TCP 53</b> bei Zonentransfers (AXFR/IXFR) und großen Antworten. DNS over TLS nutzt TCP 853, DNS over HTTPS TCP 443.</p>
<div class="example"><b>Beispiel:</b> Nach einem Serverumzug wird der A-Record von www.beispiel.de geändert. Da der alte Eintrag eine TTL von 86400 s hatte, können Resolver bis zu 24 Stunden lang noch die alte Adresse liefern. Vor geplanten Umzügen wird die TTL daher vorab verkürzt.</div>
<div class="tip"><b>Prüfungstipp:</b> Ein CNAME darf nicht am Zonen-Apex (beispiel.de selbst) neben anderen Records stehen; MX-Einträge müssen auf einen Namen mit A/AAAA-Record zeigen, nicht auf eine IP.</div>`,
    terms: [
      ["Site-to-Site-VPN", "VPN zwischen zwei Gateways, das ganze Standortnetze verbindet."],
      ["Client-to-Site-VPN", "Remote-Access-VPN, bei dem sich ein einzelnes Endgerät per VPN-Client mit dem Firmennetz verbindet."],
      ["IPsec-Tunnelmodus", "Das komplette ursprüngliche IP-Paket wird gekapselt und erhält einen neuen äußeren IP-Header."],
      ["IPsec-Transportmodus", "Nur die Nutzdaten werden geschützt; der ursprüngliche IP-Header bleibt erhalten."],
      ["IKE", "Internet Key Exchange; Protokoll zur Aushandlung von Schlüsseln und Security Associations bei IPsec."],
      ["Rekursive DNS-Anfrage", "Der befragte Server muss die vollständige Antwort liefern und fragt dazu selbst weiter."],
      ["Iterative DNS-Anfrage", "Der befragte Server antwortet mit dem bestmöglichen Verweis; der Anfragende fragt selbst weiter."],
      ["PTR-Record", "DNS-Eintrag für die Rückwärtsauflösung einer IP-Adresse in einen Hostnamen."],
      ["DNS-TTL", "Gültigkeitsdauer in Sekunden, wie lange ein DNS-Eintrag zwischengespeichert werden darf."]
    ],
    cards: [
      ["Was unterscheidet AH und ESP bei IPsec?", "AH sichert nur Integrität und Authentizität, ESP verschlüsselt zusätzlich (Vertraulichkeit)."],
      ["Warum sind SSL-VPNs firewallfreundlich?", "Sie nutzen TCP-Port 443, der in fast allen Netzen für HTTPS freigegeben ist."],
      ["Welchen Record-Typ benötigt ein Mailserver, damit E-Mails für eine Domain zugestellt werden?", "Einen MX-Record, der auf den Hostnamen des Mailservers verweist."],
      ["Wann nutzt DNS TCP statt UDP?", "Bei Zonentransfers und bei Antworten, die zu groß für ein UDP-Paket sind."]
    ]
  }
);
FABI_DATA.questions.push(
  { id: "ga2-wlan-planung-1", topic: "ga2-wlan-planung", level: 1, type: "match",
    q: "Ordnen Sie den Wi-Fi-Bezeichnungen den jeweiligen IEEE-Standard zu.",
    pairs: [["Wi-Fi 4", "IEEE 802.11n"], ["Wi-Fi 5", "IEEE 802.11ac"], ["Wi-Fi 6", "IEEE 802.11ax"], ["Wi-Fi 7", "IEEE 802.11be"]],
    explain: "Die Wi-Fi Alliance hat die Generationen nummeriert: 802.11n = Wi-Fi 4, 802.11ac = Wi-Fi 5, 802.11ax = Wi-Fi 6 (im 6-GHz-Band Wi-Fi 6E), 802.11be = Wi-Fi 7." },
  { id: "ga2-wlan-planung-2", topic: "ga2-wlan-planung", level: 2, type: "single",
    q: "In einem Bürogebäude sollen drei benachbarte Access Points im 2,4-GHz-Band (20-MHz-Kanäle) so konfiguriert werden, dass sich ihre Kanäle nicht überlappen. Welche Kanalkombination ist geeignet?",
    options: ["1, 3, 5", "2, 5, 8", "1, 6, 11", "4, 7, 10"],
    answer: 2,
    explain: "Im 2,4-GHz-Band liegen die Kanäle nur 5 MHz auseinander, ein Kanal ist aber ca. 20–22 MHz breit. Erst ein Abstand von 5 Kanälen (25 MHz) verhindert Überlappung – daher 1, 6, 11. Die anderen Kombinationen haben nur 2 bzw. 3 Kanäle Abstand und überlappen." },
  { id: "ga2-wlan-planung-3", topic: "ga2-wlan-planung", level: 2, type: "number",
    q: "Ein Access Point hat eine Bruttodatenrate von 1200 Mbit/s. Real nutzbar sind 60 % davon. Im Besprechungsraum sind 24 Clients gleichzeitig aktiv und teilen sich die Kapazität gleichmäßig. Welche Nettodatenrate steht jedem Client zur Verfügung? Geben Sie das Ergebnis in Mbit/s an.",
    answer: 30, tolerance: 0.01, unit: "Mbit/s",
    explain: "Nettodatenrate = 1200 Mbit/s × 0,6 = 720 Mbit/s. Pro Client: 720 Mbit/s ÷ 24 = 30 Mbit/s." },
  { id: "ga2-wlan-planung-4", topic: "ga2-wlan-planung", level: 3, type: "number",
    q: "Ein Schulungsraum soll mit WLAN ausgestattet werden. 80 Clients benötigen gleichzeitig je 8 Mbit/s. Ein Access Point bietet eine Bruttodatenrate von 600 Mbit/s, wovon 50 % als Nettodatenrate nutzbar sind. Der Hersteller empfiehlt maximal 25 Clients pro Access Point. Wie viele Access Points werden mindestens benötigt?",
    answer: 4, tolerance: 0, unit: "APs",
    explain: "Bandbreite: 80 × 8 Mbit/s = 640 Mbit/s; netto pro AP 600 × 0,5 = 300 Mbit/s; 640 ÷ 300 = 2,13 → 3 APs. Client-Grenze: 80 ÷ 25 = 3,2 → 4 APs. Maßgeblich ist der größere Wert: 4 Access Points." },
  { id: "ga2-wlan-sicherheit-1", topic: "ga2-wlan-sicherheit", level: 1, type: "match",
    q: "Ordnen Sie den 802.1X-Rollen das passende Gerät in einem Firmen-WLAN zu.",
    pairs: [["Supplicant", "Notebook eines Mitarbeiters"], ["Authenticator", "Access Point"], ["Authentication Server", "RADIUS-Server"]],
    explain: "Der Supplicant ist das Endgerät, das Zugang anfordert. Der Authenticator (AP oder Switch) kontrolliert den Zugang und leitet EAP weiter. Der Authentication Server (RADIUS) prüft die Anmeldedaten." },
  { id: "ga2-wlan-sicherheit-2", topic: "ga2-wlan-sicherheit", level: 2, type: "single",
    q: "Welches Verfahren verwendet WPA3-Personal anstelle des PSK-basierten Schlüsselaustauschs von WPA2, um mitgeschnittene Handshakes gegen Offline-Wörterbuchangriffe zu schützen?",
    options: ["TKIP", "SAE (Simultaneous Authentication of Equals)", "WEP mit 128-Bit-Schlüssel", "EAP-TLS"],
    answer: 1,
    explain: "WPA3-Personal nutzt SAE (Dragonfly), das Offline-Wörterbuchangriffe verhindert und Forward Secrecy bietet. TKIP und WEP sind veraltet, EAP-TLS gehört zu Enterprise-Verfahren." },
  { id: "ga2-wlan-sicherheit-3", topic: "ga2-wlan-sicherheit", level: 3, type: "multi",
    q: "Ein Unternehmen führt WPA3-Enterprise ein. Welche Aussagen sind korrekt? (Mehrere Antworten sind richtig.)",
    options: [
      "Bei EAP-TLS authentifizieren sich Client und Server gegenseitig mit Zertifikaten.",
      "Bei PEAP benötigt nur der Server ein Zertifikat; der Benutzer meldet sich im TLS-Tunnel z. B. mit Benutzername und Passwort an.",
      "PEAP setzt zwingend auf jedem Client ein eigenes Client-Zertifikat voraus.",
      "Bei WPA3-Enterprise verwenden alle Benutzer denselben Pre-Shared Key.",
      "Der RADIUS-Server prüft die Anmeldedaten, der Access Point leitet die EAP-Nachrichten nur weiter."
    ],
    answer: [0, 1, 4],
    explain: "EAP-TLS nutzt Server- und Client-Zertifikate, PEAP nur ein Serverzertifikat mit Passwortanmeldung im Tunnel. Enterprise-Verfahren arbeiten mit individuellen Anmeldedaten statt PSK; geprüft wird zentral am RADIUS-Server, der AP ist nur Authenticator." },
  { id: "ga2-wlan-sicherheit-4", topic: "ga2-wlan-sicherheit", level: 2, type: "single",
    q: "Ein Hotel möchte Gästen WLAN anbieten, ohne das interne Verwaltungsnetz zu gefährden. Welche Lösung ist am besten geeignet?",
    options: [
      "Gäste erhalten das WPA2-Passwort des internen WLANs.",
      "Eine eigene Gast-SSID in einem separaten VLAN mit Client-Isolation und Firewallregeln, die nur Internetzugang erlauben.",
      "Das interne WLAN wird unverschlüsselt betrieben und die SSID ausgeblendet.",
      "Gäste werden über MAC-Filter in das interne WLAN aufgenommen."
    ],
    answer: 1,
    explain: "Nur ein separates Gast-VLAN mit eigener SSID, Firewalltrennung und Client-Isolation trennt Gäste wirksam vom internen Netz. Versteckte SSIDs und MAC-Filter sind leicht zu umgehen, ein geteiltes internes Passwort öffnet das Firmennetz." },
  { id: "ga2-routing-1", topic: "ga2-routing", level: 1, type: "match",
    q: "Ordnen Sie den Codes aus der Ausgabe von <code>show ip route</code> (Cisco IOS) die Bedeutung zu.",
    pairs: [["C", "Direkt angeschlossenes Netz"], ["S", "Statische Route"], ["S*", "Statische Default Route (Kandidat)"], ["O", "Per OSPF gelernte Route"]],
    explain: "C = connected, S = static, das Sternchen markiert den Kandidaten für die Default Route (Gateway of last resort), O = OSPF." },
  { id: "ga2-routing-2", topic: "ga2-routing", level: 2, type: "single",
    q: "Ein Cisco-Router lernt das Netz 10.5.0.0/16 per OSPF mit Next Hop 192.168.1.5. Zusätzlich ist <code>ip route 10.5.0.0 255.255.0.0 192.168.1.9</code> konfiguriert. Welche Route wird in die Routingtabelle übernommen?",
    options: [
      "Die OSPF-Route über 192.168.1.5, da dynamische Routen Vorrang haben",
      "Beide Routen mit Lastverteilung",
      "Die statische Route über 192.168.1.9, da ihre administrative Distanz (1) kleiner ist als die von OSPF (110)",
      "Keine, da sich die Routen widersprechen"
    ],
    answer: 2,
    explain: "Bei identischem Präfix entscheidet die administrative Distanz. Statische Routen haben AD 1, OSPF AD 110 – die statische Route über 192.168.1.9 gewinnt." },
  { id: "ga2-routing-3", topic: "ga2-routing", level: 3, type: "single",
    q: "Gegeben ist folgende Routingtabelle:<pre>O     172.16.0.0/16 [110/20] via 10.0.0.1\nS     172.16.4.0/22 [1/0] via 10.0.0.2\nS     172.16.4.0/24 [1/0] via 10.0.0.3\nS*    0.0.0.0/0 [1/0] via 10.0.0.254</pre>Über welchen Next Hop wird ein Paket an <b>172.16.6.10</b> weitergeleitet?",
    options: ["10.0.0.1", "10.0.0.2", "10.0.0.3", "10.0.0.254"],
    answer: 1,
    explain: "172.16.4.0/22 umfasst 172.16.4.0 bis 172.16.7.255 (Blockgröße 4 im 3. Oktett) – 172.16.6.10 passt. 172.16.4.0/24 (nur 172.16.4.x) passt nicht. Von den passenden Routen /16, /22 und /0 ist /22 die längste → Next Hop 10.0.0.2." },
  { id: "ga2-routing-4", topic: "ga2-routing", level: 3, type: "match",
    q: "Ein Router hat folgende Routen:<pre>S*    0.0.0.0/0 via 203.0.113.1\nS     10.0.0.0/8 via 192.168.1.2\nS     10.20.0.0/16 via 192.168.1.3\nS     10.20.30.0/24 via 192.168.1.4</pre>Ordnen Sie jeder Zieladresse den verwendeten Next Hop zu.",
    pairs: [["10.20.30.77", "192.168.1.4"], ["10.20.31.5", "192.168.1.3"], ["10.99.1.1", "192.168.1.2"], ["8.8.8.8", "203.0.113.1"]],
    explain: "Longest Prefix Match: 10.20.30.77 passt auf /24 → .4; 10.20.31.5 liegt nicht in 10.20.30.0/24, aber in 10.20.0.0/16 → .3; 10.99.1.1 passt nur auf 10.0.0.0/8 → .2; 8.8.8.8 passt nur auf die Default Route → 203.0.113.1." },
  { id: "ga2-diagnose-1", topic: "ga2-diagnose", level: 1, type: "match",
    q: "Ordnen Sie den Windows-Befehlen ihren Zweck zu.",
    pairs: [["ping", "Erreichbarkeit eines Hosts per ICMP Echo prüfen"], ["tracert", "Router auf dem Weg zum Ziel anzeigen"], ["nslookup", "DNS-Namensauflösung abfragen"], ["arp -a", "Zuordnung von IP- zu MAC-Adressen anzeigen"], ["ipconfig /all", "Lokale IP-Konfiguration inkl. DNS-Server anzeigen"]],
    explain: "ping nutzt ICMP Echo Request/Reply, tracert die TTL-Mechanik, nslookup befragt DNS-Server, arp -a zeigt den ARP-Cache und ipconfig /all die vollständige IP-Konfiguration." },
  { id: "ga2-diagnose-2", topic: "ga2-diagnose", level: 2, type: "single",
    q: "Ein Client kann <code>ping 8.8.8.8</code> erfolgreich ausführen, <code>ping www.example.com</code> liefert jedoch „Ping-Anforderung konnte Host nicht finden“. Wo liegt die wahrscheinlichste Fehlerursache?",
    options: ["Das Standardgateway ist falsch eingetragen.", "Das Netzwerkkabel ist defekt.", "Die Subnetzmaske ist falsch.", "Die DNS-Namensauflösung funktioniert nicht."],
    answer: 3,
    explain: "Da eine externe IP-Adresse erreichbar ist, funktionieren Kabel, IP-Konfiguration, Gateway und Routing. Nur die Auflösung des Namens scheitert – ein DNS-Problem (falscher oder nicht erreichbarer DNS-Server)." },
  { id: "ga2-diagnose-3", topic: "ga2-diagnose", level: 2, type: "single",
    q: "<code>ipconfig</code> zeigt an einem Windows-Client die Adresse 169.254.33.12 mit Maske 255.255.0.0. Was ist die wahrscheinlichste Ursache?",
    options: ["Der DNS-Server ist ausgefallen.", "Der Client hat keine Antwort von einem DHCP-Server erhalten.", "Der Client hat eine statische IP-Adresse aus dem falschen Netz.", "Das Standardgateway blockiert ICMP."],
    answer: 1,
    explain: "Adressen aus 169.254.0.0/16 (APIPA) vergibt sich ein Client selbst, wenn kein DHCP-Server antwortet. Ursache kann ein ausgefallener DHCP-Server, ein falsches VLAN oder ein Kabelproblem sein." },
  { id: "ga2-diagnose-4", topic: "ga2-diagnose", level: 3, type: "single",
    q: "Ein PC ist statisch konfiguriert: IP 192.168.10.50, Maske 255.255.255.0, Standardgateway 192.168.1.1, DNS 192.168.10.53. Ein Ping auf 192.168.10.20 im selben Raum funktioniert, ein Ping auf 8.8.8.8 schlägt fehl. Was ist die Ursache?",
    options: [
      "Der DNS-Server ist falsch eingetragen.",
      "Die Subnetzmaske müsste 255.255.0.0 lauten, damit 192.168.10.20 erreichbar ist.",
      "Das Standardgateway liegt nicht im eigenen Subnetz 192.168.10.0/24 und kann daher nicht erreicht werden.",
      "Der Ziel-Host 8.8.8.8 ist grundsätzlich nicht per Ping erreichbar."
    ],
    answer: 2,
    explain: "Das Gateway muss im eigenen Netz liegen, damit der PC es per ARP auflösen kann. 192.168.1.1 liegt außerhalb von 192.168.10.0/24, daher scheitert jeder Zugriff auf fremde Netze. DNS spielt beim Ping auf eine IP-Adresse keine Rolle, das lokale Netz funktioniert bereits." },
  { id: "ga2-tcpip-1", topic: "ga2-tcpip", level: 2, type: "number",
    q: "Ein Host sendet ein IP-Paket mit einer TTL von 64. Auf dem Weg zum Ziel-Host durchläuft das Paket 2 Switches und 5 Router. Welchen TTL-Wert hat das Paket beim Eintreffen am Ziel-Host?",
    answer: 59, tolerance: 0, unit: "",
    explain: "Nur Router (Schicht 3) verringern die TTL um jeweils 1, Switches nicht. 64 − 5 = 59." },
  { id: "ga2-tcpip-2", topic: "ga2-tcpip", level: 2, type: "single",
    q: "Welche ICMP-Nachricht senden die Router auf dem Pfad an den Absender zurück, wodurch traceroute die einzelnen Hops ermitteln kann?",
    options: ["Echo Reply (Typ 0)", "Destination Unreachable (Typ 3)", "Redirect (Typ 5)", "Time Exceeded (Typ 11)"],
    answer: 3,
    explain: "traceroute sendet Pakete mit TTL 1, 2, 3 … Der Router, bei dem die TTL auf 0 fällt, verwirft das Paket und meldet ICMP Typ 11 „Time Exceeded“ – dadurch wird seine Adresse sichtbar." },
  { id: "ga2-tcpip-3", topic: "ga2-tcpip", level: 3, type: "number",
    q: "Beim TCP-Verbindungsaufbau sendet der Client ein SYN mit der Sequenznummer 1000. Der Server antwortet mit SYN-ACK, Sequenznummer 5000. Welche Acknowledgement-Nummer enthält das dritte Segment (ACK) des Clients?",
    answer: 5001, tolerance: 0, unit: "",
    explain: "Das SYN-Flag verbraucht eine Sequenznummer. Der Server bestätigt mit ack = 1000 + 1 = 1001, der Client bestätigt im dritten Segment das SYN des Servers mit ack = 5000 + 1 = 5001 (seq = 1001)." },
  { id: "ga2-tcpip-4", topic: "ga2-tcpip", level: 3, type: "multi",
    q: "Für eine Firewall-Regel sollen alle Dienste ermittelt werden, die standardmäßig <b>UDP</b> als Transportprotokoll verwenden. Welche sind das? (Drei Antworten sind richtig.)",
    options: ["DHCP (Port 67/68)", "SSH (Port 22)", "TFTP (Port 69)", "SMTP (Port 25)", "SNMP (Port 161)"],
    answer: [0, 2, 4],
    explain: "DHCP, TFTP und SNMP arbeiten über UDP. SSH und SMTP benötigen eine zuverlässige, verbindungsorientierte Übertragung und nutzen TCP." },
  { id: "ga2-osi-1", topic: "ga2-osi", level: 1, type: "match",
    q: "Ordnen Sie den Netzwerkgeräten die OSI-Schicht zu, auf der sie primär arbeiten.",
    pairs: [["Hub", "Schicht 1 – Bitübertragung"], ["Switch", "Schicht 2 – Sicherung"], ["Router", "Schicht 3 – Vermittlung"], ["Proxy-Server", "Schicht 7 – Anwendung"]],
    explain: "Ein Hub verteilt nur Signale (Schicht 1), ein Switch wertet MAC-Adressen aus (Schicht 2), ein Router IP-Adressen (Schicht 3), ein Proxy arbeitet auf Anwendungsebene, z. B. mit HTTP (Schicht 7)." },
  { id: "ga2-osi-2", topic: "ga2-osi", level: 2, type: "match",
    q: "Ordnen Sie die Dateneinheiten (PDUs) den OSI-Schichten zu.",
    pairs: [["Bit", "Bitübertragungsschicht"], ["Frame", "Sicherungsschicht"], ["Paket", "Vermittlungsschicht"], ["Segment", "Transportschicht"]],
    explain: "Schicht 1 überträgt Bits, Schicht 2 bildet Frames (Rahmen), Schicht 3 Pakete und Schicht 4 bei TCP Segmente." },
  { id: "ga2-osi-3", topic: "ga2-osi", level: 3, type: "single",
    q: "Ein Router leitet ein Paket von PC A (Netz 192.168.1.0/24) an Server B (Netz 10.0.0.0/24) weiter. NAT ist nicht aktiv. Welche Aussage beschreibt korrekt, was der Router am Paket verändert?",
    options: [
      "Er ersetzt Quell- und Ziel-IP-Adresse, die MAC-Adressen bleiben unverändert.",
      "Er erstellt einen neuen Ethernet-Frame mit neuen Quell- und Ziel-MAC-Adressen und verringert die TTL um 1; die IP-Adressen bleiben gleich.",
      "Er verändert nichts am Paket, sondern leitet den Frame unverändert weiter.",
      "Er ändert nur die Ziel-Portnummer im TCP-Header."
    ],
    answer: 1,
    explain: "MAC-Adressen gelten nur im lokalen Segment, daher kapselt der Router das Paket in einen neuen Frame (Quell-MAC = eigenes Ausgangsinterface, Ziel-MAC = nächster Hop/Ziel). Die TTL sinkt um 1, die IP-Adressen ändern sich ohne NAT nicht, Ports bleiben unberührt." },
  { id: "ga2-krypto-1", topic: "ga2-krypto", level: 1, type: "match",
    q: "Ordnen Sie den Verfahren die passende Kategorie zu.",
    pairs: [["AES", "Symmetrische Verschlüsselung"], ["RSA", "Asymmetrische Verschlüsselung"], ["SHA-256", "Kryptografische Hashfunktion"], ["TLS", "Hybrides Verfahren"]],
    explain: "AES nutzt einen gemeinsamen Schlüssel, RSA ein Schlüsselpaar, SHA-256 erzeugt Hashwerte fester Länge, TLS kombiniert asymmetrischen Schlüsselaustausch mit symmetrischer Datenverschlüsselung." },
  { id: "ga2-krypto-2", topic: "ga2-krypto", level: 2, type: "number",
    q: "In einer Abteilung sollen 50 Personen paarweise vertraulich mit einem symmetrischen Verfahren kommunizieren können, wobei jedes Paar einen eigenen Schlüssel erhält. Wie viele Schlüssel werden benötigt?",
    answer: 1225, tolerance: 0, unit: "Schlüssel",
    explain: "Symmetrisch: n · (n − 1) / 2 = 50 · 49 / 2 = 2450 / 2 = 1225 Schlüssel." },
  { id: "ga2-krypto-3", topic: "ga2-krypto", level: 3, type: "number",
    q: "Ein Team wächst von 10 auf 15 Mitarbeitende. Jedes Paar soll einen eigenen symmetrischen Schlüssel besitzen. Wie viele Schlüssel müssen <b>zusätzlich</b> erzeugt werden?",
    answer: 60, tolerance: 0, unit: "Schlüssel",
    explain: "Vorher: 10 · 9 / 2 = 45 Schlüssel. Nachher: 15 · 14 / 2 = 105 Schlüssel. Zusätzlich: 105 − 45 = 60 Schlüssel." },
  { id: "ga2-krypto-4", topic: "ga2-krypto", level: 3, type: "match",
    q: "Anna sendet Ben eine verschlüsselte und digital signierte E-Mail. Ordnen Sie jedem Vorgang den verwendeten Schlüssel zu.",
    pairs: [["Anna signiert die E-Mail", "Privater Schlüssel von Anna"], ["Ben prüft die Signatur", "Öffentlicher Schlüssel von Anna"], ["Anna verschlüsselt die E-Mail", "Öffentlicher Schlüssel von Ben"], ["Ben entschlüsselt die E-Mail", "Privater Schlüssel von Ben"]],
    explain: "Signiert wird mit dem privaten Schlüssel des Absenders, geprüft mit dessen öffentlichem Schlüssel. Verschlüsselt wird mit dem öffentlichen Schlüssel des Empfängers, entschlüsseln kann nur dieser mit seinem privaten Schlüssel." },
  { id: "ga2-vpn-dns-1", topic: "ga2-vpn-dns", level: 2, type: "match",
    q: "Ordnen Sie den DNS-Record-Typen ihre Funktion zu.",
    pairs: [["A", "Hostname → IPv4-Adresse"], ["AAAA", "Hostname → IPv6-Adresse"], ["CNAME", "Alias auf einen anderen Hostnamen"], ["MX", "Mailserver der Domain"], ["PTR", "IP-Adresse → Hostname (Reverse Lookup)"], ["NS", "Autoritativer Nameserver der Zone"]],
    explain: "A und AAAA liefern IPv4- bzw. IPv6-Adressen, CNAME ist ein Alias, MX nennt Mailserver, PTR dient der Rückwärtsauflösung und NS benennt die zuständigen Nameserver." },
  { id: "ga2-vpn-dns-2", topic: "ga2-vpn-dns", level: 2, type: "multi",
    q: "Welche Aussagen zu den von DNS genutzten Ports sind korrekt? (Mehrere Antworten sind richtig.)",
    options: [
      "Normale DNS-Anfragen werden üblicherweise über UDP Port 53 gestellt.",
      "Zonentransfers (AXFR) zwischen Nameservern nutzen TCP Port 53.",
      "DNS verwendet ausschließlich TCP Port 853.",
      "Antworten, die für ein UDP-Paket zu groß sind, werden per TCP Port 53 abgerufen.",
      "DNS-Anfragen werden über UDP Port 67 gestellt."
    ],
    answer: [0, 1, 3],
    explain: "DNS nutzt Port 53 – UDP für normale Anfragen, TCP für Zonentransfers und große Antworten. Port 853 wird nur für DNS over TLS verwendet (nicht ausschließlich), Port 67 gehört zu DHCP." },
  { id: "ga2-vpn-dns-3", topic: "ga2-vpn-dns", level: 3, type: "single",
    q: "Zwei Firmenstandorte werden über ein IPsec-Site-to-Site-VPN zwischen zwei Gateways verbunden. Welche Aussage trifft auf den dabei üblicherweise verwendeten Modus zu?",
    options: [
      "Transportmodus: Das gesamte Original-IP-Paket wird verschlüsselt und erhält einen neuen IP-Header.",
      "Tunnelmodus: Nur die Nutzdaten werden geschützt, der Original-IP-Header mit den internen Adressen bleibt sichtbar.",
      "Tunnelmodus: Das gesamte Original-IP-Paket inklusive Header wird gekapselt (mit ESP verschlüsselt) und erhält einen neuen äußeren IP-Header mit den Gateway-Adressen.",
      "Transportmodus mit AH: Die Nutzdaten werden verschlüsselt, die Header bleiben unverändert."
    ],
    answer: 2,
    explain: "Bei Site-to-Site-VPNs wird der Tunnelmodus genutzt: Das komplette interne Paket wird gekapselt und mit einem neuen äußeren Header zwischen den Gateways versehen, interne Adressen bleiben verborgen. Der Transportmodus schützt nur die Nutzdaten, AH verschlüsselt überhaupt nicht." },
  { id: "ga2-vpn-dns-4", topic: "ga2-vpn-dns", level: 3, type: "single",
    q: "Ein Client fragt seinen lokalen DNS-Resolver nach <code>www.beispiel.de</code>. Der Eintrag befindet sich nicht im Cache. Welche Beschreibung des Ablaufs ist korrekt?",
    options: [
      "Der Client fragt iterativ nacheinander Root-, TLD- und autoritativen Server selbst ab.",
      "Der Client stellt eine rekursive Anfrage an den Resolver; dieser fragt iterativ den Root-Server, dann den .de-TLD-Server und schließlich den autoritativen Nameserver von beispiel.de.",
      "Der Resolver leitet die Anfrage direkt an den autoritativen Server weiter, ohne Root- oder TLD-Server zu kennen.",
      "Der Root-Server liefert direkt die IP-Adresse von www.beispiel.de zurück."
    ],
    answer: 1,
    explain: "Endgeräte stellen rekursive Anfragen und erwarten die endgültige Antwort. Der Resolver arbeitet iterativ: Root verweist auf .de, der TLD-Server auf den autoritativen Server, der die Adresse liefert. Die Antwort wird gemäß TTL gecacht." }
);
