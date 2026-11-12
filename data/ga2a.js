window.FABI_DATA = window.FABI_DATA || { topics: [], questions: [] };
FABI_DATA.topics.push(
  {
    id: "ga2-ipv4",
    area: "GA2",
    extra: false,
    title: "IPv4-Adressierung & Subnetting",
    overview: [
      "Eine IPv4-Adresse hat <b>32 Bit</b>, geschrieben als vier Oktette in Dezimalpunktnotation.",
      "Die <b>Subnetzmaske</b> bzw. das <b>CIDR-Präfix</b> (z. B. <code>/24</code>) trennt Netz- und Hostanteil.",
      "Nutzbare Hosts pro Netz: <code>2<sup>Hostbits</sup> − 2</code> (Netzadresse und Broadcast fallen weg).",
      "<b>VLSM</b> erlaubt unterschiedlich große Subnetze – immer vom größten zum kleinsten Bedarf vergeben.",
      "Netzadresse = alle Hostbits 0, Broadcast = alle Hostbits 1."
    ],
    content: `
<h3>Aufbau einer IPv4-Adresse</h3>
<p>Eine IPv4-Adresse besteht aus 32 Bit, die in vier Oktette zu je 8 Bit gegliedert und dezimal mit Punkten getrennt geschrieben werden (z. B. <code>192.168.10.77</code>). Jede Adresse besteht aus einem <b>Netzanteil</b> und einem <b>Hostanteil</b>. Welche Bits zum Netz gehören, legt die <b>Subnetzmaske</b> fest: Alle Bits mit Wert 1 gehören zum Netzanteil. Die Kurzschreibweise <b>CIDR</b> (Classless Inter-Domain Routing) gibt einfach die Anzahl der Netzbits an, z. B. <code>/26</code> = <code>255.255.255.192</code>.</p>
<h3>Wichtige Kenngrößen eines Subnetzes</h3>
<ul>
<li><b>Netzadresse:</b> alle Hostbits 0 – kennzeichnet das Netz, nicht an Hosts vergebbar.</li>
<li><b>Broadcastadresse:</b> alle Hostbits 1 – erreicht alle Hosts im Subnetz.</li>
<li><b>Hostbereich:</b> Netzadresse + 1 bis Broadcast − 1.</li>
<li><b>Anzahl nutzbarer Hosts:</b> 2<sup>(32 − Präfix)</sup> − 2.</li>
<li><b>Blockgröße</b> (Schrittweite) im „interessanten“ Oktett: 256 − Maskenwert, z. B. 256 − 192 = 64.</li>
</ul>
<table>
<tr><th>Präfix</th><th>Maske</th><th>Adressen</th><th>Nutzbare Hosts</th></tr>
<tr><td>/24</td><td>255.255.255.0</td><td>256</td><td>254</td></tr>
<tr><td>/25</td><td>255.255.255.128</td><td>128</td><td>126</td></tr>
<tr><td>/26</td><td>255.255.255.192</td><td>64</td><td>62</td></tr>
<tr><td>/27</td><td>255.255.255.224</td><td>32</td><td>30</td></tr>
<tr><td>/28</td><td>255.255.255.240</td><td>16</td><td>14</td></tr>
<tr><td>/30</td><td>255.255.255.252</td><td>4</td><td>2</td></tr>
</table>
<h3>Subnetting und VLSM</h3>
<p>Beim klassischen Subnetting wird ein Netz in gleich große Teilnetze zerlegt: Mit <i>n</i> geliehenen Bits entstehen 2<sup>n</sup> Subnetze. Beim <b>VLSM</b> (Variable Length Subnet Masking) erhält jedes Teilnetz genau die passende Größe. Vorgehen: Bedarfe absteigend sortieren, für jeden Bedarf das kleinste Präfix wählen, dessen Hostanzahl reicht, und die Subnetze lückenlos hintereinander vergeben – so bleiben alle Netzgrenzen korrekt ausgerichtet.</p>
<div class="example"><b>Beispiel:</b> Adresse <code>192.168.10.77/26</code>. Blockgröße 64 → Subnetze beginnen bei .0, .64, .128, .192. 77 liegt im Block .64–.127. Netzadresse <code>192.168.10.64</code>, Broadcast <code>192.168.10.127</code>, Hostbereich .65 bis .126, also 62 nutzbare Hosts.</div>
<div class="example"><b>Beispiel VLSM:</b> <code>192.168.1.0/24</code> soll für 100, 50 und 25 Hosts aufgeteilt werden: 100 Hosts → /25 (126) = <code>192.168.1.0/25</code>; 50 Hosts → /26 (62) = <code>192.168.1.128/26</code>; 25 Hosts → /27 (30) = <code>192.168.1.192/27</code>. Frei bleibt <code>192.168.1.224/27</code>.</div>
<div class="tip"><b>Prüfungstipp:</b> Prüfen Sie bei Netzen größer /24 (z. B. /22) das dritte Oktett: Ein /22 umfasst vier aufeinanderfolgende /24-Blöcke, beginnend bei einem Vielfachen von 4.</div>
`,
    terms: [
      ["Subnetzmaske", "32-Bit-Wert, dessen 1-Bits den Netzanteil einer IPv4-Adresse kennzeichnen, z. B. 255.255.255.0."],
      ["CIDR", "Classless Inter-Domain Routing; klassenlose Adressierung mit Präfixlänge in Slash-Notation, z. B. /27."],
      ["Netzadresse", "Erste Adresse eines Subnetzes (alle Hostbits 0); identifiziert das Netz und ist nicht an Hosts vergebbar."],
      ["Broadcastadresse", "Letzte Adresse eines Subnetzes (alle Hostbits 1); Pakete an sie erreichen alle Hosts im Subnetz."],
      ["VLSM", "Variable Length Subnet Masking: Aufteilung eines Netzes in Subnetze unterschiedlicher Größe passend zum Bedarf."],
      ["Hostbereich", "Alle vergebbaren Adressen zwischen Netzadresse und Broadcastadresse."],
      ["Blockgröße", "Abstand zwischen zwei Subnetzen im relevanten Oktett, berechnet als 256 minus Maskenwert."],
      ["Präfixlänge", "Anzahl der zusammenhängenden Netzbits einer Adresse, z. B. 24 bei 255.255.255.0."]
    ],
    cards: [
      ["Wie berechnet man die Zahl nutzbarer Hosts eines IPv4-Subnetzes?", "2 hoch Anzahl der Hostbits minus 2 (Netz- und Broadcastadresse)."],
      ["Welche Maske gehört zu /27?", "255.255.255.224 (Blockgröße 32, 30 nutzbare Hosts)."],
      ["In welcher Reihenfolge vergibt man Subnetze bei VLSM?", "Vom größten zum kleinsten Hostbedarf, lückenlos hintereinander."],
      ["Wie viele /26-Subnetze passen in ein /24?", "2^(26−24) = 4 Subnetze."]
    ]
  },
  {
    id: "ga2-vlan",
    area: "GA2",
    extra: false,
    title: "VLANs & Netzsegmentierung",
    overview: [
      "VLANs teilen einen physischen Switch in mehrere logische <b>Broadcast-Domänen</b>.",
      "Gültige VLAN-IDs: <b>1–4094</b> (12-Bit-Feld; 0 und 4095 reserviert).",
      "<b>Access-Ports</b> gehören zu genau einem VLAN, <b>Trunk-Ports</b> transportieren mehrere VLANs mit 802.1Q-Tag.",
      "Der <b>802.1Q-Tag</b> ist 4 Byte groß; Frames des <b>Native VLAN</b> laufen ungetaggt über den Trunk.",
      "Kommunikation zwischen VLANs erfordert ein Layer-3-Gerät (Router-on-a-Stick oder Layer-3-Switch)."
    ],
    content: `
<h3>Warum Netzsegmentierung?</h3>
<p>Ein flaches Netz, in dem alle Geräte in derselben Broadcast-Domäne liegen, skaliert schlecht und ist schwer abzusichern. <b>VLANs</b> (Virtual Local Area Networks) trennen ein physisches Netz logisch in mehrere Segmente. Jedes VLAN ist eine eigene Broadcast-Domäne und in der Regel ein eigenes IP-Subnetz. Vorteile: weniger Broadcast-Last, höhere Sicherheit (z. B. Trennung von Verwaltung, Produktion, Gäste-WLAN, VoIP), flexible Zuordnung unabhängig vom Standort.</p>
<h3>VLAN-ID und 802.1Q</h3>
<p>Der Standard <b>IEEE 802.1Q</b> fügt in den Ethernet-Frame zwischen Quell-MAC-Adresse und EtherType einen <b>4 Byte</b> großen Tag ein. Er enthält die TPID <code>0x8100</code> (2 Byte), 3 Bit Priorität (PCP, für QoS nach 802.1p), 1 Bit DEI und die <b>12 Bit VLAN-ID</b>. Damit sind 4096 Werte möglich, nutzbar sind <b>1–4094</b>; 0 und 4095 sind reserviert. VLAN 1 ist bei vielen Herstellern das Standard-VLAN.</p>
<table>
<tr><th>Porttyp</th><th>Eigenschaft</th><th>Typischer Einsatz</th></tr>
<tr><td>Access-Port (untagged)</td><td>gehört genau einem VLAN, Frames ohne Tag</td><td>Endgeräte wie PCs, Drucker</td></tr>
<tr><td>Trunk-Port (tagged)</td><td>transportiert mehrere VLANs, Frames mit 802.1Q-Tag</td><td>Switch–Switch, Switch–Router, Switch–Hypervisor</td></tr>
</table>
<p>Das <b>Native VLAN</b> eines Trunks wird <b>ungetaggt</b> übertragen. Es muss auf beiden Seiten gleich konfiguriert sein; aus Sicherheitsgründen (VLAN-Hopping) sollte es nicht VLAN 1 und nicht für Nutzdaten verwendet werden.</p>
<h3>Routing zwischen VLANs</h3>
<ul>
<li><b>Router-on-a-Stick:</b> Ein Router ist über einen einzigen Trunk-Link angebunden und besitzt pro VLAN ein logisches Subinterface (z. B. <code>Gi0/0.10</code> mit <code>encapsulation dot1Q 10</code>), das als Default-Gateway des VLANs dient.</li>
<li><b>Layer-3-Switch:</b> Routet intern per <b>SVI</b> (Switch Virtual Interface, z. B. <code>interface vlan 10</code>) in Hardware – schneller und ohne Engpass eines einzelnen Uplinks.</li>
</ul>
<div class="example"><b>Beispiel:</b> Ein Unternehmen nutzt VLAN 10 (Verwaltung, 10.0.10.0/24), VLAN 20 (Produktion, 10.0.20.0/24) und VLAN 99 (Management). Die PCs hängen an Access-Ports, die Etagenswitches sind per Trunk mit dem Core-Layer-3-Switch verbunden, der zwischen den VLANs routet und per ACL den Zugriff von der Produktion auf die Verwaltung einschränkt.</div>
<div class="tip"><b>Prüfungstipp:</b> Zwei Geräte in verschiedenen VLANs können sich auch am selben Switch <b>nicht</b> direkt erreichen – es fehlt immer das Routing.</div>
`,
    terms: [
      ["VLAN", "Virtuelles LAN; logische Unterteilung eines physischen Netzes in getrennte Broadcast-Domänen."],
      ["IEEE 802.1Q", "Standard für VLAN-Tagging; fügt einen 4-Byte-Tag mit 12-Bit-VLAN-ID in den Ethernet-Frame ein."],
      ["Access-Port", "Switchport, der genau einem VLAN zugeordnet ist und Frames ungetaggt an das Endgerät liefert."],
      ["Trunk-Port", "Switchport, der Frames mehrerer VLANs mit 802.1Q-Tag über eine Leitung transportiert."],
      ["Native VLAN", "VLAN, dessen Frames auf einem Trunk ungetaggt übertragen werden."],
      ["Router-on-a-Stick", "Inter-VLAN-Routing über einen Router, der per Trunk angebunden ist und je VLAN ein Subinterface besitzt."],
      ["Layer-3-Switch", "Switch, der zusätzlich IP-Routing beherrscht und zwischen VLANs per SVI routet."],
      ["SVI", "Switch Virtual Interface; logische Layer-3-Schnittstelle eines VLANs auf einem Layer-3-Switch."]
    ],
    cards: [
      ["Welcher VLAN-ID-Bereich ist nutzbar?", "1 bis 4094 (0 und 4095 sind reserviert)."],
      ["Wie groß ist der 802.1Q-Tag?", "4 Byte (TPID 2 Byte, PCP 3 Bit, DEI 1 Bit, VID 12 Bit)."],
      ["Was wird benötigt, damit Hosts in VLAN 10 und VLAN 20 kommunizieren?", "Ein Layer-3-Gerät: Router (z. B. Router-on-a-Stick) oder Layer-3-Switch."],
      ["Warum sollte man das Native VLAN ändern?", "Um VLAN-Hopping-Angriffe (Double Tagging) zu erschweren; es sollte ungenutzt und nicht VLAN 1 sein."]
    ]
  },
  {
    id: "ga2-dhcp",
    area: "GA2",
    extra: false,
    title: "DHCP & IP-Adressvergabe",
    overview: [
      "DHCP vergibt IP-Konfigurationen automatisch nach dem <b>DORA</b>-Prinzip: Discover, Offer, Request, Acknowledge.",
      "DHCP nutzt <b>UDP</b>: Server-Port <b>67</b>, Client-Port <b>68</b>.",
      "Adressen werden für eine begrenzte <b>Lease-Zeit</b> verliehen; Verlängerung ab T1 = 50 % der Lease.",
      "<b>Reservierungen</b> binden eine feste IP an eine MAC-Adresse; statische Adressen werden manuell konfiguriert.",
      "Da Broadcasts nicht geroutet werden, benötigt man in anderen Subnetzen einen <b>DHCP-Relay</b> (<code>ip helper-address</code>)."
    ],
    content: `
<h3>Aufgabe von DHCP</h3>
<p>Das <b>Dynamic Host Configuration Protocol</b> versorgt Clients automatisch mit IP-Adresse, Subnetzmaske, Default-Gateway, DNS-Servern und weiteren Optionen (z. B. NTP-Server, Domänenname, PXE-Bootserver). Das spart Administrationsaufwand und verhindert doppelt vergebene Adressen. Der Server verwaltet dafür je Subnetz einen <b>Bereich (Scope/Pool)</b> mit Ausschlüssen und Optionen.</p>
<h3>Ablauf: DORA</h3>
<ol>
<li><b>DHCPDISCOVER</b> – Der Client (noch ohne IP, Quelle 0.0.0.0) sucht per Broadcast an 255.255.255.255 einen Server.</li>
<li><b>DHCPOFFER</b> – Ein oder mehrere Server bieten eine Adresse samt Optionen an.</li>
<li><b>DHCPREQUEST</b> – Der Client fordert per Broadcast das gewählte Angebot an (damit andere Server ihr Angebot zurückziehen).</li>
<li><b>DHCPACK</b> – Der Server bestätigt die Vergabe; der Client darf die Adresse nutzen.</li>
</ol>
<p>Kommunikation erfolgt über <b>UDP</b>, Server lauscht auf Port <b>67</b>, Client auf Port <b>68</b>. Lehnt der Server ab, sendet er <b>DHCPNAK</b>; stellt der Client einen Adresskonflikt fest, meldet er <b>DHCPDECLINE</b>, bei Abmeldung <b>DHCPRELEASE</b>.</p>
<h3>Lease und Verlängerung</h3>
<p>Die Adresse wird nur für die <b>Lease-Dauer</b> verliehen. Nach <b>T1 = 50 %</b> der Lease versucht der Client per Unicast beim bisherigen Server zu verlängern, nach <b>T2 = 87,5 %</b> per Broadcast bei einem beliebigen Server. Läuft die Lease ab, muss er die Adresse freigeben. Kurze Leases eignen sich für Gäste-WLANs, lange für stationäre Arbeitsplätze.</p>
<h3>Reservierung vs. statische Adressierung</h3>
<table>
<tr><th>Verfahren</th><th>Merkmal</th><th>Einsatz</th></tr>
<tr><td>Dynamisch</td><td>Adresse aus Pool, kann wechseln</td><td>Clients, Notebooks</td></tr>
<tr><td>Reservierung</td><td>feste IP per DHCP, gebunden an MAC/Client-ID</td><td>Drucker, Access Points</td></tr>
<tr><td>Statisch</td><td>manuell am Gerät konfiguriert, außerhalb des Pools</td><td>Server, Router, DHCP-Server selbst</td></tr>
</table>
<h3>DHCP-Relay</h3>
<p>Router leiten Broadcasts nicht weiter. Steht der DHCP-Server in einem anderen Subnetz, nimmt ein <b>DHCP-Relay-Agent</b> auf dem Gateway des Client-Netzes die Broadcasts an und leitet sie per Unicast an den Server weiter. Er trägt dabei seine Interface-Adresse in das Feld <code>giaddr</code> ein, damit der Server den passenden Scope wählt. Bei Cisco: <code>ip helper-address 10.0.10.5</code> auf dem Interface des Client-VLANs.</p>
<div class="example"><b>Beispiel:</b> Der DHCP-Server 10.0.10.5 steht im Server-VLAN 10. Damit Clients im VLAN 20 Adressen erhalten, wird auf der SVI <code>interface vlan 20</code> des Layer-3-Switches <code>ip helper-address 10.0.10.5</code> konfiguriert und auf dem Server ein Scope 10.0.20.0/24 angelegt.</div>
`,
    terms: [
      ["DHCP", "Dynamic Host Configuration Protocol; vergibt IP-Adressen und Netzwerkparameter automatisch über UDP 67/68."],
      ["DORA", "Ablauf der DHCP-Vergabe: Discover, Offer, Request, Acknowledge."],
      ["Lease", "Zeitlich begrenzte Überlassung einer IP-Adresse durch den DHCP-Server."],
      ["T1/T2", "Zeitpunkte zur Lease-Verlängerung: T1 = 50 % (Unicast an Server), T2 = 87,5 % (Broadcast an alle Server)."],
      ["Reservierung", "Feste Zuordnung einer IP-Adresse zu einer MAC-Adresse bzw. Client-ID auf dem DHCP-Server."],
      ["Scope", "Adressbereich mit Optionen, aus dem der DHCP-Server für ein bestimmtes Subnetz Adressen vergibt."],
      ["DHCP-Relay", "Agent (meist auf dem Router), der DHCP-Broadcasts eines Subnetzes per Unicast an einen entfernten DHCP-Server weiterleitet."],
      ["ip helper-address", "Cisco-Befehl auf einem Router-Interface, der die DHCP-Relay-Funktion mit Zieladresse des DHCP-Servers aktiviert."]
    ],
    cards: [
      ["Welche Ports nutzt DHCP?", "UDP 67 (Server) und UDP 68 (Client)."],
      ["Warum sendet der Client den DHCPREQUEST als Broadcast?", "Damit alle Server erfahren, welches Angebot angenommen wurde, und die anderen ihre Angebote zurückziehen."],
      ["Wann versucht ein Client erstmals, seine Lease zu verlängern?", "Bei T1 = 50 % der Lease-Dauer, per Unicast beim bisherigen Server."],
      ["Warum braucht man einen DHCP-Relay?", "Weil Router Broadcasts nicht weiterleiten und der DHCP-Server sonst nur im eigenen Subnetz erreichbar ist."]
    ]
  },
  {
    id: "ga2-firewall",
    area: "GA2",
    extra: false,
    title: "Firewalls & Regelwerke",
    overview: [
      "Firewall-Regeln prüfen Quell-/Zieladresse, Protokoll und Ports und führen eine Aktion aus (allow/deny/drop).",
      "Regeln werden von oben nach unten abgearbeitet: <b>First Match</b> entscheidet.",
      "Am Ende steht ein <b>Deny-All</b> bzw. <b>Implicit Deny</b>: Alles nicht ausdrücklich Erlaubte ist verboten.",
      "<b>Stateful</b> Firewalls kennen den Verbindungszustand und lassen Antwortpakete automatisch zu, <b>stateless</b> prüfen jedes Paket isoliert.",
      "Typische Ports kennen: SSH 22, SMTP 25, DNS 53, HTTP 80, HTTPS 443, RDP 3389."
    ],
    content: `
<h3>Aufbau einer Firewall-Regel</h3>
<p>Eine Paketfilter-Regel besteht aus <b>Kriterien</b> und einer <b>Aktion</b>. Kriterien sind typischerweise Schnittstelle bzw. Richtung, <b>Quelladresse</b>, <b>Zieladresse</b>, <b>Protokoll</b> (TCP, UDP, ICMP …) sowie <b>Quell- und Zielport</b>. Aktionen sind <code>ACCEPT/ALLOW</code>, <code>DROP</code> (verwerfen ohne Rückmeldung) und <code>REJECT</code> (verwerfen mit Rückmeldung, z. B. TCP-RST oder ICMP unreachable). Der Quellport eines Clients ist meist ein zufälliger hoher Port (≥ 1024); gefiltert wird daher vor allem auf den <b>Zielport</b> des Dienstes.</p>
<h3>Reihenfolge und First Match</h3>
<p>Das Regelwerk wird von oben nach unten durchlaufen. Die <b>erste passende Regel</b> entscheidet, weitere Regeln werden nicht mehr geprüft. Daher gehören spezifische Regeln (Ausnahmen) nach oben, allgemeine nach unten. Am Ende steht eine <b>Deny-All</b>-Regel; viele Systeme verwerfen nicht passende Pakete ohnehin (<b>Implicit Deny</b>). Dieses Whitelist-Prinzip („Default Deny“) ist sicherer als eine Blacklist.</p>
<div class="example"><b>Beispiel:</b>
<table>
<tr><th>Nr.</th><th>Quelle</th><th>Ziel</th><th>Protokoll/Port</th><th>Aktion</th></tr>
<tr><td>1</td><td>192.168.1.0/24</td><td>10.0.0.10</td><td>TCP 443</td><td>allow</td></tr>
<tr><td>2</td><td>192.168.1.50</td><td>10.0.0.10</td><td>TCP 443</td><td>deny</td></tr>
<tr><td>3</td><td>any</td><td>any</td><td>any</td><td>deny</td></tr>
</table>
Regel 2 ist wirkungslos, weil Pakete von 192.168.1.50 bereits von Regel 1 erfasst werden. Die Ausnahme muss vor die allgemeine Regel.</div>
<h3>Stateless vs. Stateful</h3>
<table>
<tr><th>Merkmal</th><th>Stateless (Paketfilter)</th><th>Stateful (Stateful Inspection)</th></tr>
<tr><td>Arbeitsweise</td><td>jedes Paket einzeln</td><td>verfolgt Verbindungen in einer State-Tabelle</td></tr>
<tr><td>Antwortpakete</td><td>eigene Regel nötig</td><td>automatisch erlaubt (ESTABLISHED/RELATED)</td></tr>
<tr><td>Sicherheit</td><td>geringer</td><td>höher, erkennt unpassende Pakete</td></tr>
</table>
<p>Darüber hinaus prüfen <b>Application-Level-Gateways/Proxys</b> und <b>Next-Generation-Firewalls</b> Inhalte bis Schicht 7 (z. B. Applikationserkennung, IPS, TLS-Inspection).</p>
<h3>Typische Ports</h3>
<p>FTP 20/21, SSH 22, Telnet 23, SMTP 25, DNS 53 (UDP/TCP), DHCP 67/68, HTTP 80, POP3 110, NTP 123, IMAP 143, SNMP 161, LDAP 389, HTTPS 443, SMTPS 465, Submission 587, IMAPS 993, POP3S 995, MS-SQL 1433, MySQL 3306, RDP 3389.</p>
<div class="tip"><b>Prüfungstipp:</b> Bei Regelwerksaufgaben jedes Paket gedanklich von Regel 1 an prüfen und beim ersten Treffer stoppen.</div>
`,
    terms: [
      ["Paketfilter", "Firewall, die Pakete anhand von Header-Informationen wie Adressen, Protokoll und Ports filtert."],
      ["First Match", "Prinzip, nach dem die erste zutreffende Regel im Regelwerk über ein Paket entscheidet."],
      ["Implicit Deny", "Implizite Schlussregel: Alle Pakete, auf die keine Regel passt, werden verworfen."],
      ["Stateful Inspection", "Firewall-Technik, die Verbindungszustände in einer State-Tabelle speichert und Antwortpakete automatisch zulässt."],
      ["Stateless Firewall", "Firewall, die jedes Paket isoliert ohne Kenntnis bestehender Verbindungen bewertet."],
      ["DROP vs. REJECT", "DROP verwirft ein Paket stillschweigend, REJECT verwirft es und sendet eine Fehlermeldung an den Absender."],
      ["Next-Generation-Firewall", "Firewall mit zusätzlicher Prüfung auf Anwendungsebene, z. B. Applikationserkennung und Intrusion Prevention."],
      ["Zielport", "Port des angesprochenen Dienstes, z. B. 443 für HTTPS; wichtigstes Filterkriterium für Dienste."]
    ],
    cards: [
      ["Warum gehören spezifische Regeln nach oben?", "Wegen First Match: Eine weiter oben stehende allgemeine Regel würde die spezifische sonst überdecken."],
      ["Welchen Vorteil hat eine Stateful Firewall bei Antwortpaketen?", "Antworten auf erlaubte Verbindungen werden über die State-Tabelle automatisch zugelassen, ohne eigene Rückregel."],
      ["Welche Ports haben SSH, DNS und RDP?", "SSH TCP 22, DNS 53 (UDP/TCP), RDP TCP 3389."],
      ["Was bedeutet Default Deny?", "Alles ist verboten, was nicht ausdrücklich erlaubt wurde (Whitelist-Ansatz)."]
    ]
  },
  {
    id: "ga2-dmz",
    area: "GA2",
    extra: false,
    title: "DMZ & Netzwerkzonen",
    overview: [
      "Eine <b>DMZ</b> ist eine abgeschottete Zone zwischen Internet und internem Netz für öffentlich erreichbare Dienste.",
      "Typische Zonen: <b>WAN/extern</b>, <b>DMZ</b>, <b>LAN/intern</b>, ggf. Management- und Gästezone.",
      "Grundregel: Internet → DMZ eingeschränkt erlaubt, Internet → LAN verboten, DMZ → LAN grundsätzlich verboten.",
      "<b>Zweistufige DMZ</b>: zwei Firewalls (idealerweise verschiedener Hersteller) – sicherer als die einstufige Variante mit einer Firewall und drei Interfaces.",
      "Ein <b>Reverse Proxy</b> in der DMZ nimmt externe Anfragen an und leitet sie kontrolliert an interne Server weiter."
    ],
    content: `
<h3>Zonenkonzept</h3>
<p>Netze werden nach Schutzbedarf in <b>Zonen</b> mit unterschiedlichem Vertrauensniveau eingeteilt. Das <b>externe Netz</b> (Internet, WAN) ist nicht vertrauenswürdig, das <b>interne Netz</b> (LAN) enthält schützenswerte Clients und Server. Dienste, die aus dem Internet erreichbar sein müssen, gehören in eine <b>DMZ</b> (Demilitarisierte Zone). Wird ein DMZ-Server kompromittiert, steht der Angreifer nicht sofort im internen Netz, weil die Firewall Verbindungen von der DMZ ins LAN blockiert.</p>
<h3>Typische Dienste</h3>
<ul>
<li><b>In der DMZ (extern erreichbar):</b> Webserver, Reverse Proxy, Mail-Relay/Mail-Gateway, öffentlicher DNS-Server, VPN-Gateway, FTP-/Dateiaustauschserver.</li>
<li><b>Im LAN (nur intern):</b> Domain-Controller/Verzeichnisdienst, Datenbankserver, Fileserver, ERP-System, interner Mailserver, Clients.</li>
</ul>
<h3>Zugriffskontrolle zwischen Zonen</h3>
<table>
<tr><th>Richtung</th><th>Regel</th></tr>
<tr><td>Internet → DMZ</td><td>nur benötigte Dienste (z. B. TCP 443 zum Webserver)</td></tr>
<tr><td>Internet → LAN</td><td>verboten</td></tr>
<tr><td>LAN → DMZ</td><td>erlaubt für Administration/Nutzung, eingeschränkt</td></tr>
<tr><td>DMZ → LAN</td><td>grundsätzlich verboten, nur eng begrenzte Ausnahmen (z. B. Mail-Relay → interner Mailserver TCP 25)</td></tr>
<tr><td>LAN → Internet</td><td>erlaubt, meist über Proxy und NAT</td></tr>
</table>
<h3>Einstufige und zweistufige DMZ</h3>
<p>Bei der <b>einstufigen DMZ</b> (Three-Legged Firewall) besitzt eine Firewall drei Schnittstellen: WAN, DMZ und LAN. Das ist günstig und einfach, aber die Firewall ist ein <b>Single Point of Failure</b>: Wird sie überwunden, sind alle Zonen offen. Bei der <b>zweistufigen DMZ</b> liegt die DMZ zwischen einer äußeren und einer inneren Firewall. Ein Angreifer muss beide überwinden; setzt man Produkte unterschiedlicher Hersteller ein, wirkt eine Schwachstelle nicht auf beide (Defense in Depth). Nachteile sind höhere Kosten und höherer Verwaltungsaufwand.</p>
<h3>Reverse Proxy</h3>
<p>Ein <b>Reverse Proxy</b> steht in der DMZ, nimmt Anfragen aus dem Internet stellvertretend entgegen und leitet sie an Server im internen Netz weiter. Die internen Server sind so nicht direkt erreichbar. Zusätzlich kann er TLS terminieren, Lastverteilung, Caching und eine Web Application Firewall (WAF) bereitstellen.</p>
<div class="example"><b>Beispiel:</b> Ein Onlineshop betreibt in der DMZ einen Reverse Proxy (TCP 443 aus dem Internet erlaubt). Dieser leitet Anfragen an den Shop-Server weiter; die Datenbank liegt im internen Netz und akzeptiert nur Verbindungen des Shop-Servers auf TCP 3306. Alle übrigen Verbindungen aus der DMZ ins LAN werden blockiert.</div>
`,
    terms: [
      ["DMZ", "Demilitarisierte Zone; durch Firewalls abgegrenztes Netzsegment für öffentlich erreichbare Dienste."],
      ["Einstufige DMZ", "DMZ an einer Firewall mit drei Schnittstellen (WAN, DMZ, LAN); einfach, aber Single Point of Failure."],
      ["Zweistufige DMZ", "DMZ zwischen äußerer und innerer Firewall; Angreifer müssen zwei Sicherheitsstufen überwinden."],
      ["Reverse Proxy", "Server, der externe Anfragen stellvertretend annimmt und an interne Server weiterleitet; verbirgt das Backend."],
      ["Netzwerkzone", "Bereich eines Netzes mit einheitlichem Schutzbedarf und Vertrauensniveau, z. B. LAN, DMZ, WAN."],
      ["Defense in Depth", "Sicherheitsprinzip mehrerer hintereinander geschalteter Schutzmaßnahmen."],
      ["Mail-Relay", "Mailserver in der DMZ, der E-Mails aus dem Internet annimmt, prüft und an den internen Mailserver weitergibt."],
      ["WAF", "Web Application Firewall; filtert HTTP(S)-Verkehr auf Angriffe wie SQL-Injection oder XSS."]
    ],
    cards: [
      ["Warum dürfen DMZ-Server grundsätzlich keine Verbindungen ins LAN aufbauen?", "Damit ein kompromittierter DMZ-Server nicht als Sprungbrett ins interne Netz genutzt werden kann."],
      ["Warum setzt man in einer zweistufigen DMZ oft Firewalls verschiedener Hersteller ein?", "Eine Schwachstelle eines Herstellers betrifft dann nicht beide Firewalls gleichzeitig."],
      ["Nennen Sie drei typische DMZ-Dienste.", "Webserver/Reverse Proxy, Mail-Relay, öffentlicher DNS-Server (auch VPN-Gateway)."],
      ["Wo steht der Datenbankserver eines Webshops?", "Im internen Netz; nur der Applikationsserver darf ihn auf dem DB-Port erreichen."]
    ]
  },
  {
    id: "ga2-nat",
    area: "GA2",
    extra: false,
    title: "NAT – Network Address Translation",
    overview: [
      "NAT übersetzt IP-Adressen (und ggf. Ports) beim Übergang zwischen Netzen, typischerweise privat ↔ öffentlich.",
      "<b>Source NAT / Masquerading / PAT</b>: viele interne Hosts teilen sich eine öffentliche IP für ausgehende Verbindungen.",
      "<b>Destination NAT / Port Forwarding</b>: eingehende Verbindungen auf eine öffentliche IP/Port werden an einen internen Server weitergeleitet.",
      "Private Bereiche nach <b>RFC 1918</b>: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.",
      "NAT ist kein Ersatz für eine Firewall, verbirgt aber die interne Adressstruktur."
    ],
    content: `
<h3>Warum NAT?</h3>
<p>Öffentliche IPv4-Adressen sind knapp. Intern verwenden Unternehmen deshalb <b>private Adressen nach RFC 1918</b>, die im Internet nicht geroutet werden. Damit diese Hosts dennoch ins Internet kommen, übersetzt der Router bzw. die Firewall die Adressen per <b>NAT</b>. Ein Nebeneffekt: Die interne Netzstruktur bleibt von außen verborgen.</p>
<table>
<tr><th>Bereich (RFC 1918)</th><th>CIDR</th><th>Umfang</th></tr>
<tr><td>10.0.0.0 – 10.255.255.255</td><td>10.0.0.0/8</td><td>ca. 16,7 Mio. Adressen</td></tr>
<tr><td>172.16.0.0 – 172.31.255.255</td><td>172.16.0.0/12</td><td>ca. 1 Mio. Adressen</td></tr>
<tr><td>192.168.0.0 – 192.168.255.255</td><td>192.168.0.0/16</td><td>65.536 Adressen</td></tr>
</table>
<p>Nicht zu RFC 1918 gehören z. B. <code>169.254.0.0/16</code> (Link-Local/APIPA) und <code>100.64.0.0/10</code> (Shared Address Space für Carrier-Grade-NAT, RFC 6598).</p>
<h3>Source NAT, Masquerading und PAT</h3>
<p>Beim <b>Source NAT (SNAT)</b> wird die Quelladresse ausgehender Pakete ersetzt. <b>Masquerading</b> ist eine SNAT-Variante, bei der automatisch die (ggf. dynamische) Adresse des WAN-Interfaces verwendet wird. Teilen sich viele Hosts eine öffentliche Adresse, muss zusätzlich der Quellport umgeschrieben werden: <b>PAT</b> (Port Address Translation, auch NAT Overload oder NAPT). Der Router merkt sich in seiner <b>NAT-Tabelle</b> die Zuordnung interne IP:Port ↔ öffentliche IP:Port und übersetzt Antworten zurück.</p>
<h3>Destination NAT und Port Forwarding</h3>
<p>Beim <b>Destination NAT (DNAT)</b> wird die Zieladresse eingehender Pakete ersetzt. Die häufigste Form ist das <b>Port Forwarding</b>: Verbindungen auf einen bestimmten Port der öffentlichen IP werden an einen internen Server (meist in der DMZ) weitergeleitet. Auch der Port kann dabei umgesetzt werden (z. B. extern 8443 → intern 443).</p>
<div class="example"><b>Beispiel:</b> Ein Büro hat die öffentliche Adresse 203.0.113.10. Client 192.168.1.20:51515 öffnet eine Webseite – der Router ersetzt per PAT die Quelle durch 203.0.113.10:40001. Zusätzlich ist ein Port Forwarding eingerichtet: Anfragen an 203.0.113.10:443 gehen an den Webserver 172.16.0.10:443 in der DMZ.</div>
<h3>Grenzen von NAT</h3>
<ul>
<li>Eingehende Verbindungen sind ohne DNAT nicht möglich (Problem für Peer-to-Peer, VoIP, manche VPNs).</li>
<li>Ende-zu-Ende-Prinzip wird verletzt; Protokolle mit IP-Adressen im Nutzdatenteil benötigen ALGs.</li>
<li>Bei IPv6 ist NAT in der Regel unnötig, da genug globale Adressen existieren.</li>
</ul>
`,
    terms: [
      ["NAT", "Network Address Translation; Umschreiben von IP-Adressen in Paketen beim Übergang zwischen Netzen."],
      ["Source NAT (SNAT)", "Ersetzen der Quelladresse ausgehender Pakete, z. B. private durch öffentliche IP."],
      ["Masquerading", "SNAT-Variante, die automatisch die aktuelle IP des ausgehenden Interfaces verwendet; ideal bei dynamischer WAN-IP."],
      ["PAT", "Port Address Translation; viele interne Hosts teilen sich eine öffentliche IP, unterschieden über umgeschriebene Quellports."],
      ["Destination NAT (DNAT)", "Ersetzen der Zieladresse (und ggf. des Zielports) eingehender Pakete."],
      ["Port Forwarding", "DNAT-Form, die Verbindungen auf einen öffentlichen Port an einen internen Host weiterleitet."],
      ["RFC 1918", "Standard der privaten IPv4-Bereiche 10.0.0.0/8, 172.16.0.0/12 und 192.168.0.0/16."],
      ["NAT-Tabelle", "Tabelle des Routers mit den Zuordnungen interner und externer Adress-Port-Paare aktiver Verbindungen."]
    ],
    cards: [
      ["Welche Adressbereiche definiert RFC 1918?", "10.0.0.0/8, 172.16.0.0/12 (bis 172.31.255.255) und 192.168.0.0/16."],
      ["Welche NAT-Art benötigt man, um einen internen Webserver aus dem Internet erreichbar zu machen?", "Destination NAT bzw. Port Forwarding."],
      ["Wodurch unterscheidet PAT mehrere interne Hosts mit derselben öffentlichen IP?", "Durch unterschiedliche (umgeschriebene) Quellports, gespeichert in der NAT-Tabelle."],
      ["Wann nutzt man Masquerading statt statischem SNAT?", "Wenn die öffentliche WAN-Adresse dynamisch vom Provider vergeben wird."]
    ]
  },
  {
    id: "ga2-tls",
    area: "GA2",
    extra: false,
    title: "TLS & Zertifikate",
    overview: [
      "<b>TLS</b> sichert Verbindungen (z. B. HTTPS) durch Verschlüsselung, Integrität und Server-Authentifizierung.",
      "Im Handshake wird asymmetrisch ein Schlüssel ausgehandelt (z. B. ECDHE); die Nutzdaten werden <b>symmetrisch</b> (z. B. AES-GCM) verschlüsselt.",
      "Serverzertifikate folgen dem Standard <b>X.509</b> und binden einen öffentlichen Schlüssel an einen Namen.",
      "Die <b>Vertrauenskette</b> führt vom Serverzertifikat über Intermediate-CAs zur im Client hinterlegten <b>Root-CA</b>.",
      "Geprüft werden Signatur, Gültigkeitszeitraum, Hostname (SAN) und Sperrstatus (<b>CRL</b>/<b>OCSP</b>)."
    ],
    content: `
<h3>Ziele von TLS</h3>
<p><b>Transport Layer Security</b> (aktuell TLS 1.2 und 1.3; SSL und TLS 1.0/1.1 gelten als unsicher) schützt Anwendungsprotokolle wie HTTP (HTTPS, Port 443), SMTP, IMAP oder LDAP. TLS bietet <b>Vertraulichkeit</b> (Verschlüsselung), <b>Integrität</b> (Schutz vor Manipulation) und <b>Authentizität</b> (der Server weist sich per Zertifikat aus, optional auch der Client).</p>
<h3>Handshake (vereinfacht)</h3>
<ol>
<li><b>ClientHello:</b> unterstützte TLS-Versionen, Cipher Suites, Zufallswert, bei TLS 1.3 bereits Key-Share.</li>
<li><b>ServerHello:</b> gewählte Version/Cipher Suite, Key-Share; danach sendet der Server sein <b>Zertifikat</b> (samt Zwischenzertifikaten) und signiert den Handshake mit seinem privaten Schlüssel.</li>
<li>Der Client <b>prüft das Zertifikat</b>; beide Seiten berechnen per (EC)DHE denselben Sitzungsschlüssel.</li>
<li><b>Finished:</b> Beide bestätigen den Handshake; ab jetzt werden die Daten <b>symmetrisch</b> verschlüsselt.</li>
</ol>
<p>Dieses <b>hybride Verfahren</b> kombiniert die sichere Schlüsselvereinbarung der asymmetrischen Kryptografie mit der Geschwindigkeit symmetrischer Verfahren. Ephemerale Schlüssel (ECDHE) sorgen für <b>Perfect Forward Secrecy</b>.</p>
<h3>X.509-Zertifikate</h3>
<p>Ein Zertifikat enthält u. a. Seriennummer, Aussteller (Issuer), Inhaber (Subject), Gültigkeit (<code>notBefore</code>/<code>notAfter</code>), den öffentlichen Schlüssel, Erweiterungen wie <b>Subject Alternative Name (SAN)</b> und Key Usage sowie die <b>Signatur der ausstellenden CA</b>. Browser prüfen den Hostnamen gegen die SAN-Einträge. Ein <b>Wildcard-Zertifikat</b> <code>*.example.de</code> gilt für genau eine Ebene, also <code>www.example.de</code>, nicht aber <code>example.de</code> oder <code>a.b.example.de</code>.</p>
<h3>Vertrauenskette und Prüfung</h3>
<p>Die <b>Root-CA</b> signiert sich selbst und ist im Trust Store von Betriebssystem/Browser hinterlegt. Sie signiert <b>Intermediate-CAs</b>, die wiederum Serverzertifikate ausstellen. Der Client verifiziert jede Signatur mit dem öffentlichen Schlüssel des jeweiligen Ausstellers bis zur vertrauenswürdigen Root.</p>
<table>
<tr><th>Prüfung</th><th>Frage</th></tr>
<tr><td>Signatur/Kette</td><td>Führt die Kette zu einer vertrauten Root-CA?</td></tr>
<tr><td>Gültigkeit</td><td>Liegt das aktuelle Datum zwischen notBefore und notAfter?</td></tr>
<tr><td>Name</td><td>Passt der Hostname zu einem SAN-Eintrag?</td></tr>
<tr><td>Sperrung</td><td>Ist das Zertifikat per <b>CRL</b> (Sperrliste) oder <b>OCSP</b> (Online-Abfrage, ggf. OCSP-Stapling) widerrufen?</td></tr>
</table>
<div class="example"><b>Beispiel:</b> Der private Schlüssel des Webservers shop.example.de wurde kompromittiert. Der Admin lässt das Zertifikat bei der CA sperren; es erscheint in der CRL und OCSP liefert „revoked“. Anschließend wird ein neues Schlüsselpaar erzeugt, ein CSR erstellt und ein neues Zertifikat installiert.</div>
`,
    terms: [
      ["TLS", "Transport Layer Security; Protokoll für verschlüsselte, integritätsgeschützte und authentifizierte Verbindungen."],
      ["X.509", "Standardformat für digitale Zertifikate mit Inhaber, Aussteller, Gültigkeit, öffentlichem Schlüssel und CA-Signatur."],
      ["Root-CA", "Oberste, selbstsignierte Zertifizierungsstelle, deren Zertifikat im Trust Store vorinstalliert ist."],
      ["Intermediate-CA", "Zwischenzertifizierungsstelle, die von der Root-CA signiert ist und Endzertifikate ausstellt."],
      ["CRL", "Certificate Revocation List; von der CA veröffentlichte Liste gesperrter Zertifikate."],
      ["OCSP", "Online Certificate Status Protocol; Echtzeitabfrage des Sperrstatus eines einzelnen Zertifikats."],
      ["SAN", "Subject Alternative Name; Zertifikatserweiterung mit allen Hostnamen, für die das Zertifikat gilt."],
      ["Wildcard-Zertifikat", "Zertifikat für *.domain, gültig für alle Hostnamen genau einer Subdomain-Ebene."],
      ["CSR", "Certificate Signing Request; Zertifikatsantrag mit öffentlichem Schlüssel und Inhaberdaten an die CA."]
    ],
    cards: [
      ["Warum nutzt TLS ein hybrides Verfahren?", "Asymmetrisch für sichere Schlüsselvereinbarung/Authentifizierung, symmetrisch für schnelle Verschlüsselung der Nutzdaten."],
      ["Womit prüft der Client die Signatur eines Serverzertifikats?", "Mit dem öffentlichen Schlüssel der ausstellenden (Intermediate-)CA."],
      ["Gilt *.example.de für example.de?", "Nein, nur für genau eine Ebene darunter, z. B. www.example.de."],
      ["Was ist OCSP-Stapling?", "Der Server liefert eine signierte, aktuelle OCSP-Antwort im Handshake mit, sodass der Client die CA nicht selbst abfragen muss."]
    ]
  },
  {
    id: "ga2-ipv6",
    area: "GA2",
    extra: false,
    title: "IPv6-Adressierung",
    overview: [
      "IPv6-Adressen haben <b>128 Bit</b>, notiert als acht Blöcke à 16 Bit in Hexadezimal.",
      "Typische Aufteilung: Kunde erhält ein <b>/48</b> (oder /56), jedes Subnetz ist ein <b>/64</b> → 2<sup>16</sup> = 65.536 Subnetze pro /48.",
      "Kürzen: führende Nullen je Block weglassen, eine Folge von Null-Blöcken <b>einmalig</b> durch <code>::</code> ersetzen.",
      "Adresstypen: GUA <code>2000::/3</code>, Link-Local <code>fe80::/10</code>, ULA <code>fc00::/7</code>, Multicast <code>ff00::/8</code>.",
      "Autokonfiguration per <b>SLAAC</b> (Router Advertisements) oder <b>DHCPv6</b>; RA-Flags <b>M</b> und <b>O</b> steuern das Verfahren."
    ],
    content: `
<h3>Aufbau und Schreibweise</h3>
<p>Eine IPv6-Adresse besteht aus 128 Bit, dargestellt als acht durch Doppelpunkte getrennte Blöcke zu je vier Hexziffern (16 Bit). Regeln zur Verkürzung:</p>
<ol>
<li><b>Führende Nullen</b> in einem Block dürfen entfallen (<code>0db8</code> → <code>db8</code>, <code>0000</code> → <code>0</code>).</li>
<li><b>Eine</b> zusammenhängende Folge von Null-Blöcken darf durch <code>::</code> ersetzt werden – <b>nur einmal</b> pro Adresse, sonst wäre sie mehrdeutig. Gibt es mehrere Nullfolgen, wird die längste ersetzt (bei Gleichstand die erste).</li>
<li>Nachgestellte Nullen dürfen <b>nicht</b> entfernt werden (<code>0800</code> → <code>800</code>, nicht <code>8</code>).</li>
</ol>
<div class="example"><b>Beispiel:</b> <code>2001:0db8:0000:0000:0008:0800:200c:417a</code> wird zu <code>2001:db8::8:800:200c:417a</code>.</div>
<h3>Präfixe und Subnetting</h3>
<p>Eine Adresse gliedert sich meist in <b>Global Routing Prefix</b> (vom Provider, z. B. /48), <b>Subnet-ID</b> und <b>Interface-ID</b> (64 Bit). Subnetze sind standardmäßig <b>/64</b>, da SLAAC 64 Bit Interface-ID voraussetzt. Anzahl Subnetze = 2<sup>(64 − Präfix)</sup>: aus einem /48 ergeben sich 2<sup>16</sup> = <b>65.536</b> /64-Netze, aus einem /56 2<sup>8</sup> = 256.</p>
<h3>Adresstypen</h3>
<table>
<tr><th>Typ</th><th>Präfix</th><th>Bedeutung</th></tr>
<tr><td>Global Unicast (GUA)</td><td>2000::/3</td><td>weltweit routbar, öffentlich</td></tr>
<tr><td>Link-Local (LLA)</td><td>fe80::/10</td><td>nur im lokalen Segment, auf jedem Interface automatisch vorhanden</td></tr>
<tr><td>Unique Local (ULA)</td><td>fc00::/7 (genutzt fd00::/8)</td><td>privat, nicht im Internet geroutet</td></tr>
<tr><td>Multicast</td><td>ff00::/8</td><td>Gruppenadressen, z. B. ff02::1 alle Knoten; ersetzt Broadcast</td></tr>
<tr><td>Loopback</td><td>::1/128</td><td>eigener Host</td></tr>
</table>
<p>IPv6 kennt <b>keinen Broadcast</b>; Aufgaben wie ARP übernimmt das <b>Neighbor Discovery Protocol (NDP)</b> über ICMPv6 und Multicast.</p>
<h3>Autokonfiguration</h3>
<p>Bei <b>SLAAC</b> sendet der Router <b>Router Advertisements (RA)</b> mit dem /64-Präfix; der Host bildet die Interface-ID selbst – zufällig (Privacy Extensions) oder per <b>EUI-64</b>: MAC-Adresse in der Mitte teilen, <code>FFFE</code> einfügen und das 7. Bit (U/L-Bit) des ersten Bytes invertieren. Aus <code>00:1A:2B:3C:4D:5E</code> wird <code>021a:2bff:fe3c:4d5e</code>.</p>
<table>
<tr><th>M-Flag</th><th>O-Flag</th><th>Verfahren</th></tr>
<tr><td>0</td><td>0</td><td>nur SLAAC (DNS ggf. per RDNSS-Option im RA)</td></tr>
<tr><td>0</td><td>1</td><td>SLAAC + <b>stateless DHCPv6</b> für weitere Optionen (z. B. DNS)</td></tr>
<tr><td>1</td><td>–</td><td><b>stateful DHCPv6</b>: Adresse vom DHCPv6-Server</td></tr>
</table>
<p>Das Default-Gateway lernt der Host immer aus dem RA (Link-Local-Adresse des Routers), nicht per DHCPv6.</p>
`,
    terms: [
      ["GUA", "Global Unicast Address; weltweit eindeutige, routbare IPv6-Adresse aus 2000::/3."],
      ["Link-Local-Adresse", "IPv6-Adresse aus fe80::/10, nur im lokalen Segment gültig und auf jedem IPv6-Interface vorhanden."],
      ["ULA", "Unique Local Address aus fc00::/7 (praktisch fd00::/8); private, nicht im Internet geroutete Adressen."],
      ["SLAAC", "Stateless Address Autoconfiguration; Host bildet seine Adresse selbst aus dem Präfix im Router Advertisement."],
      ["EUI-64", "Verfahren zur Bildung der 64-Bit-Interface-ID aus der MAC-Adresse durch Einfügen von FFFE und Invertieren des U/L-Bits."],
      ["Router Advertisement", "ICMPv6-Nachricht des Routers mit Präfix, Gateway-Information und den Flags M und O."],
      ["Stateful DHCPv6", "DHCPv6-Betrieb, bei dem der Server Adressen vergibt und verwaltet (M-Flag = 1)."],
      ["Stateless DHCPv6", "DHCPv6 liefert nur Zusatzinformationen wie DNS-Server, die Adresse kommt per SLAAC (M = 0, O = 1)."],
      ["NDP", "Neighbor Discovery Protocol; ICMPv6-basiert, ersetzt u. a. ARP und dient zur Router-Erkennung."]
    ],
    cards: [
      ["Wie viele /64-Subnetze enthält ein /48?", "2^16 = 65.536."],
      ["Warum darf :: nur einmal in einer Adresse vorkommen?", "Sonst wäre nicht eindeutig, wie viele Null-Blöcke jede Lücke ersetzt."],
      ["Was bedeuten M = 0 und O = 1 im Router Advertisement?", "Adresse per SLAAC, weitere Parameter (z. B. DNS) per stateless DHCPv6."],
      ["Woher bezieht ein IPv6-Host sein Default-Gateway?", "Aus dem Router Advertisement (Link-Local-Adresse des Routers)."]
    ]
  }
);
FABI_DATA.questions.push(
  { id: "ga2-ipv4-1", topic: "ga2-ipv4", level: 1, type: "number",
    q: "Wie viele nutzbare Host-Adressen hat ein IPv4-Subnetz mit dem Präfix <code>/27</code>? Geben Sie die Anzahl an.",
    answer: 30, tolerance: 0, unit: "Hosts",
    explain: "Hostbits: 32 − 27 = 5. Adressen: 2^5 = 32. Abzüglich Netz- und Broadcastadresse: 32 − 2 = 30 nutzbare Hosts." },
  { id: "ga2-ipv4-2", topic: "ga2-ipv4", level: 2, type: "single",
    q: "Ein Host hat die Adresse <code>192.168.10.77/26</code>. Wie lautet die Broadcastadresse seines Subnetzes?",
    options: ["192.168.10.63", "192.168.10.255", "192.168.10.127", "192.168.10.95"], answer: 2,
    explain: "/26 = 255.255.255.192, Blockgröße 256 − 192 = 64. Subnetze: .0, .64, .128, .192. 77 liegt im Block .64–.127, also Netzadresse 192.168.10.64 und Broadcast 192.168.10.127." },
  { id: "ga2-ipv4-3", topic: "ga2-ipv4", level: 2, type: "number",
    q: "Das Netz <code>10.20.0.0/22</code> soll in gleich große Subnetze mit dem Präfix <code>/26</code> aufgeteilt werden. Wie viele Subnetze entstehen?",
    answer: 16, tolerance: 0, unit: "Subnetze",
    explain: "Geliehene Bits: 26 − 22 = 4. Anzahl Subnetze: 2^4 = 16 (Kontrolle: /22 = 1024 Adressen, /26 = 64 Adressen, 1024 / 64 = 16)." },
  { id: "ga2-ipv4-4", topic: "ga2-ipv4", level: 3, type: "multi",
    q: "Welche der folgenden Adressen sind im Netz <code>10.1.4.0/22</code> gültige, an Hosts vergebbare Adressen? (Mehrere Antworten sind richtig.)",
    options: ["10.1.4.0", "10.1.5.255", "10.1.7.255", "10.1.6.0", "10.1.8.1"], answer: [1, 3],
    explain: "/22 = 255.255.252.0, Blockgröße im 3. Oktett 4: Netz 10.1.4.0 bis Broadcast 10.1.7.255, Hosts 10.1.4.1–10.1.7.254. 10.1.5.255 und 10.1.6.0 liegen mitten im Bereich und sind gültig. 10.1.4.0 ist die Netzadresse, 10.1.7.255 der Broadcast, 10.1.8.1 liegt im nächsten Netz." },
  { id: "ga2-ipv4-5", topic: "ga2-ipv4", level: 3, type: "single",
    q: "Das Netz <code>192.168.1.0/24</code> wird per VLSM aufgeteilt: Abteilung A benötigt 100 Hosts, B 50 Hosts, C 25 Hosts. Die Subnetze werden lückenlos ab 192.168.1.0 vom größten zum kleinsten Bedarf vergeben. Welches Subnetz erhält Abteilung C?",
    options: ["192.168.1.160/27", "192.168.1.192/26", "192.168.1.224/27", "192.168.1.192/27"], answer: 3,
    explain: "A: 100 Hosts → /25 (126 Hosts) = 192.168.1.0–.127. B: 50 Hosts → /26 (62 Hosts) = 192.168.1.128–.191. C: 25 Hosts → /27 (30 Hosts) = 192.168.1.192/27 (.192–.223)." },

  { id: "ga2-vlan-1", topic: "ga2-vlan", level: 1, type: "single",
    q: "Wie viele Byte fügt ein IEEE-802.1Q-Tag in einen Ethernet-Frame ein?",
    options: ["2 Byte", "4 Byte", "8 Byte", "12 Byte"], answer: 1,
    explain: "Der 802.1Q-Tag ist 4 Byte groß: 2 Byte TPID (0x8100) sowie 2 Byte TCI mit 3 Bit PCP, 1 Bit DEI und 12 Bit VLAN-ID." },
  { id: "ga2-vlan-2", topic: "ga2-vlan", level: 2, type: "match",
    q: "Ordnen Sie die Begriffe der passenden Beschreibung zu.",
    pairs: [
      ["Access-Port", "Gehört genau einem VLAN an und überträgt Frames ungetaggt zum Endgerät"],
      ["Trunk-Port", "Transportiert Frames mehrerer VLANs mit 802.1Q-Tag"],
      ["Native VLAN", "Wird auf einem Trunk ungetaggt übertragen"],
      ["Router-on-a-Stick", "Router mit einem Trunk-Link und je VLAN einem Subinterface"],
      ["SVI", "Logische Layer-3-Schnittstelle eines VLANs auf einem Layer-3-Switch"]
    ],
    explain: "Access-Ports verbinden Endgeräte mit einem VLAN, Trunks bündeln VLANs per Tag, das Native VLAN bleibt auf dem Trunk ungetaggt. Inter-VLAN-Routing erfolgt per Router-on-a-Stick (Subinterfaces) oder per SVI auf einem Layer-3-Switch." },
  { id: "ga2-vlan-3", topic: "ga2-vlan", level: 2, type: "multi",
    q: "Welche Aussagen zu VLANs nach IEEE 802.1Q sind korrekt? (Mehrere Antworten sind richtig.)",
    options: [
      "Die VLAN-ID ist 12 Bit lang; nutzbar sind die IDs 1 bis 4094.",
      "Jedes VLAN bildet eine eigene Broadcast-Domäne.",
      "Hosts in unterschiedlichen VLANs am selben Switch können ohne Router direkt kommunizieren.",
      "Die VLAN-ID 4095 ist für Management-VLANs vorgesehen und frei nutzbar.",
      "Der Tag enthält ein 3-Bit-Prioritätsfeld (PCP) für QoS."
    ], answer: [0, 1, 4],
    explain: "12 Bit ergeben 4096 Werte, 0 und 4095 sind reserviert, nutzbar sind 1–4094. Jedes VLAN ist eine eigene Broadcast-Domäne; für die Kommunikation zwischen VLANs ist immer Routing nötig. Das PCP-Feld (3 Bit) dient der Priorisierung nach 802.1p." },
  { id: "ga2-vlan-4", topic: "ga2-vlan", level: 3, type: "single",
    q: "Ein Switch ist per Trunk mit einem Router verbunden. PCs in VLAN 10 (10.0.10.0/24) und VLAN 20 (10.0.20.0/24) erreichen sich gegenseitig nicht; Internetzugang über das Default-Gateway funktioniert in keinem VLAN. Auf dem Router ist nur das physische Interface <code>Gi0/0</code> mit 10.0.10.1/24 konfiguriert. Welche Maßnahme behebt das Problem fachgerecht?",
    options: [
      "Die Switchports der PCs in den Trunk-Modus versetzen.",
      "Auf dem Router Subinterfaces Gi0/0.10 und Gi0/0.20 mit <code>encapsulation dot1Q</code> und den Gateway-Adressen 10.0.10.1 bzw. 10.0.20.1 einrichten.",
      "Alle PCs in VLAN 1 verschieben, damit der Router sie erreicht.",
      "Auf dem Switch das Native VLAN auf 4095 setzen."
    ], answer: 1,
    explain: "Bei Router-on-a-Stick kommen die Frames getaggt am Router an. Er benötigt pro VLAN ein Subinterface mit 802.1Q-Kapselung und passender Gateway-IP. Endgeräte gehören an Access-Ports, VLAN 1 aufzulösen zerstört die Segmentierung und 4095 ist reserviert." },

  { id: "ga2-dhcp-1", topic: "ga2-dhcp", level: 2, type: "match",
    q: "Ordnen Sie den DHCP-Nachrichten ihre Funktion zu.",
    pairs: [
      ["DHCPDISCOVER", "Client sucht per Broadcast einen DHCP-Server"],
      ["DHCPOFFER", "Server bietet dem Client eine IP-Konfiguration an"],
      ["DHCPREQUEST", "Client fordert die angebotene Adresse verbindlich an"],
      ["DHCPACK", "Server bestätigt die Vergabe und die Lease beginnt"],
      ["DHCPNAK", "Server lehnt die angeforderte Adresse ab"]
    ],
    explain: "DORA: Discover (Suche), Offer (Angebot), Request (Anforderung), Acknowledge (Bestätigung). Mit NAK lehnt der Server eine Anfrage ab, z. B. wenn die Adresse nicht ins Subnetz passt." },
  { id: "ga2-dhcp-2", topic: "ga2-dhcp", level: 1, type: "single",
    q: "Welches Transportprotokoll und welche Ports verwendet DHCP (IPv4)?",
    options: ["TCP, Server 67 / Client 68", "UDP, Server 68 / Client 67", "UDP, Server 67 / Client 68", "UDP, Server 53 / Client 54"], answer: 2,
    explain: "DHCP nutzt UDP, da der Client anfangs keine IP-Adresse hat und Broadcasts sendet. Der Server lauscht auf Port 67, der Client auf Port 68." },
  { id: "ga2-dhcp-3", topic: "ga2-dhcp", level: 3, type: "single",
    q: "Der DHCP-Server 10.0.10.5 steht im Server-VLAN 10. Clients im neu angelegten VLAN 30 erhalten nur APIPA-Adressen (169.254.x.x), obwohl auf dem Server ein Scope für 10.0.30.0/24 aktiv ist. Das Routing zwischen den VLANs funktioniert. Was ist die richtige Lösung?",
    options: [
      "Auf der SVI bzw. dem Router-Interface von VLAN 30 <code>ip helper-address 10.0.10.5</code> konfigurieren.",
      "Auf der SVI von VLAN 10 <code>ip helper-address 10.0.30.1</code> konfigurieren.",
      "Die Lease-Dauer des Scopes auf 1 Stunde reduzieren.",
      "In der Firewall TCP-Port 67 zum DHCP-Server freigeben."
    ], answer: 0,
    explain: "DHCPDISCOVER ist ein Broadcast und wird nicht geroutet. Der Relay-Agent muss auf dem Gateway-Interface des Client-Netzes (VLAN 30) laufen und leitet die Anfragen per Unicast an 10.0.10.5 weiter. DHCP nutzt außerdem UDP, nicht TCP." },
  { id: "ga2-dhcp-4", topic: "ga2-dhcp", level: 3, type: "number",
    q: "Ein DHCP-Server vergibt Adressen mit einer Lease-Dauer von 8 Tagen. Nach wie vielen Stunden versucht ein Client standardmäßig erstmals, seine Lease beim bisherigen Server zu verlängern (T1)?",
    answer: 96, tolerance: 0, unit: "h",
    explain: "T1 = 50 % der Lease-Dauer. 8 Tage × 24 h = 192 h; 192 h × 0,5 = 96 h." },

  { id: "ga2-firewall-1", topic: "ga2-firewall", level: 3, type: "single",
    q: "Eine Firewall arbeitet nach dem First-Match-Prinzip mit folgendem Regelwerk:<br>1: deny – Quelle any → Ziel 10.0.0.5, TCP 22<br>2: allow – Quelle 192.168.1.0/24 → Ziel any, TCP 22<br>3: deny – any → any<br>Welches Paket wird durchgelassen?",
    options: [
      "192.168.1.20 → 10.0.0.5, TCP 22",
      "192.168.2.20 → 10.0.0.7, TCP 22",
      "192.168.1.30 → 10.0.0.7, TCP 22",
      "192.168.1.30 → 10.0.0.7, TCP 3389"
    ], answer: 2,
    explain: "A trifft Regel 1 (deny). B liegt nicht in 192.168.1.0/24 und fällt auf Regel 3. C passt nicht zu Regel 1 (anderes Ziel), aber zu Regel 2 → allow. D hat Port 3389, passt nicht zu Regel 2 und wird von Regel 3 verworfen." },
  { id: "ga2-firewall-2", topic: "ga2-firewall", level: 2, type: "match",
    q: "Ordnen Sie den Diensten ihren Standard-Port zu.",
    pairs: [
      ["SSH", "22"],
      ["SMTP", "25"],
      ["DNS", "53"],
      ["HTTPS", "443"],
      ["IMAPS", "993"],
      ["RDP", "3389"]
    ],
    explain: "Standardports: SSH 22/TCP, SMTP 25/TCP, DNS 53/UDP+TCP, HTTPS 443/TCP, IMAPS 993/TCP, RDP 3389/TCP." },
  { id: "ga2-firewall-3", topic: "ga2-firewall", level: 2, type: "multi",
    q: "Welche Aussagen treffen auf eine Stateful-Inspection-Firewall zu? (Mehrere Antworten sind richtig.)",
    options: [
      "Sie speichert aktive Verbindungen in einer Zustandstabelle.",
      "Für Antwortpakete einer erlaubten Verbindung ist keine eigene Rückregel nötig.",
      "Sie bewertet jedes Paket völlig unabhängig von vorherigen Paketen.",
      "Ein TCP-Paket mit gesetztem ACK-Flag ohne zugehörige Verbindung kann sie als ungültig verwerfen.",
      "Sie arbeitet ausschließlich auf Schicht 2 des OSI-Modells."
    ], answer: [0, 1, 3],
    explain: "Stateful Firewalls verfolgen Verbindungen in einer State-Tabelle, lassen Antworten (ESTABLISHED) automatisch zu und erkennen Pakete, die zu keiner Verbindung passen. Die isolierte Paketbewertung beschreibt einen stateless Paketfilter; gefiltert wird auf Schicht 3/4." },
  { id: "ga2-firewall-4", topic: "ga2-firewall", level: 1, type: "single",
    q: "Was bedeutet „Implicit Deny“ in einem Firewall-Regelwerk?",
    options: [
      "Alle Pakete, auf die keine Regel zutrifft, werden verworfen.",
      "Alle Pakete werden erlaubt, solange keine Deny-Regel greift.",
      "Deny-Regeln werden immer vor Allow-Regeln geprüft.",
      "Verworfene Pakete werden automatisch protokolliert und dem Absender gemeldet."
    ], answer: 0,
    explain: "Implicit Deny ist die unsichtbare Schlussregel: Was nicht ausdrücklich erlaubt ist, wird verworfen (Default Deny/Whitelist-Prinzip)." },
  { id: "ga2-dmz-1", topic: "ga2-dmz", level: 1, type: "single",
    q: "Welcher Server gehört in einer klassischen Netzarchitektur in die DMZ?",
    options: ["Domain-Controller", "Öffentlich erreichbarer Webserver", "Interner Datenbankserver der Buchhaltung", "Fileserver mit Personalakten"], answer: 1,
    explain: "In die DMZ gehören Dienste, die aus dem Internet erreichbar sein müssen, etwa Webserver. Domain-Controller, Datenbanken und Fileserver mit sensiblen Daten bleiben im internen Netz." },
  { id: "ga2-dmz-2", topic: "ga2-dmz", level: 3, type: "multi",
    q: "Welche Aussagen zur zweistufigen DMZ im Vergleich zur einstufigen DMZ sind korrekt? (Mehrere Antworten sind richtig.)",
    options: [
      "Die DMZ liegt zwischen einer äußeren und einer inneren Firewall.",
      "Ein Angreifer aus dem Internet muss zwei Firewalls überwinden, um ins LAN zu gelangen.",
      "Die zweistufige DMZ kommt mit einer einzigen Firewall mit drei Schnittstellen aus.",
      "Der Einsatz von Firewalls unterschiedlicher Hersteller verringert das Risiko, dass eine einzige Schwachstelle beide Stufen betrifft.",
      "Die zweistufige DMZ ist günstiger und einfacher zu verwalten."
    ], answer: [0, 1, 3],
    explain: "Bei der zweistufigen DMZ sitzt die DMZ zwischen zwei Firewalls (Defense in Depth); verschiedene Hersteller erhöhen die Sicherheit. Eine Firewall mit drei Interfaces beschreibt die einstufige DMZ; die zweistufige ist teurer und aufwändiger." },
  { id: "ga2-dmz-3", topic: "ga2-dmz", level: 2, type: "single",
    q: "Ein Unternehmen möchte seine interne Webanwendung über HTTPS aus dem Internet erreichbar machen, ohne den Applikationsserver im LAN direkt freizugeben. Welche Komponente wird dazu in der DMZ eingesetzt?",
    options: ["Forward Proxy", "Reverse Proxy", "DHCP-Relay", "Layer-2-Switch"], answer: 1,
    explain: "Ein Reverse Proxy nimmt Anfragen aus dem Internet stellvertretend an und leitet sie kontrolliert an den internen Server weiter; er kann zudem TLS terminieren und als WAF filtern. Ein Forward Proxy vermittelt dagegen ausgehende Anfragen interner Clients." },
  { id: "ga2-dmz-4", topic: "ga2-dmz", level: 3, type: "single",
    q: "Welche Firewall-Regel widerspricht dem DMZ-Konzept am deutlichsten?",
    options: [
      "Internet → Webserver in der DMZ, TCP 443: erlauben",
      "Admin-Netz im LAN → DMZ-Server, TCP 22: erlauben",
      "Webserver in der DMZ → gesamtes LAN, alle Ports: erlauben",
      "Internet → LAN, any: verbieten"
    ], answer: 2,
    explain: "Verbindungen aus der DMZ ins LAN müssen grundsätzlich verboten oder eng auf einzelne Ziele/Ports begrenzt sein. Ein Vollzugriff würde einen kompromittierten Webserver zum Sprungbrett ins interne Netz machen." },

  { id: "ga2-nat-1", topic: "ga2-nat", level: 2, type: "multi",
    q: "Welche der folgenden IPv4-Adressen sind private Adressen nach RFC 1918? (Mehrere Antworten sind richtig.)",
    options: ["10.20.30.40", "172.31.255.1", "172.32.0.1", "192.168.200.5", "169.254.10.1"], answer: [0, 1, 3],
    explain: "RFC 1918: 10.0.0.0/8, 172.16.0.0/12 (172.16.0.0–172.31.255.255) und 192.168.0.0/16. 172.32.0.1 liegt außerhalb des /12, 169.254.0.0/16 ist der Link-Local-Bereich (APIPA) und nicht RFC 1918." },
  { id: "ga2-nat-2", topic: "ga2-nat", level: 2, type: "single",
    q: "Am Internetrouter wird eingerichtet, dass Verbindungen auf <code>203.0.113.10:443</code> an den Server <code>172.16.0.10:443</code> weitergeleitet werden. Um welche NAT-Art handelt es sich?",
    options: ["Source NAT (Masquerading)", "Destination NAT (Port Forwarding)", "PAT für ausgehende Verbindungen", "Statisches Routing"], answer: 1,
    explain: "Bei eingehenden Verbindungen wird die Zieladresse (und ggf. der Zielport) umgeschrieben – das ist Destination NAT bzw. Port Forwarding. SNAT/PAT ändern die Quelladresse ausgehender Pakete." },
  { id: "ga2-nat-3", topic: "ga2-nat", level: 2, type: "match",
    q: "Ordnen Sie die NAT-Begriffe der passenden Beschreibung zu.",
    pairs: [
      ["Source NAT", "Ersetzt die Quelladresse ausgehender Pakete"],
      ["Masquerading", "Verwendet automatisch die aktuelle (dynamische) IP des WAN-Interfaces"],
      ["PAT", "Viele interne Hosts teilen sich eine öffentliche IP, unterschieden über Quellports"],
      ["Destination NAT", "Ersetzt die Zieladresse eingehender Pakete"]
    ],
    explain: "SNAT schreibt die Quelle um; Masquerading ist SNAT mit automatisch ermittelter Interface-Adresse; PAT (NAT Overload) unterscheidet Verbindungen über Ports; DNAT schreibt das Ziel um, z. B. für Port Forwarding." },
  { id: "ga2-nat-4", topic: "ga2-nat", level: 3, type: "number",
    q: "Ein Router führt PAT mit genau einer öffentlichen IPv4-Adresse durch und verwendet für die Übersetzung ausschließlich die Quellports 1024 bis einschließlich 65535. Wie viele gleichzeitige TCP-Verbindungen zu demselben Zielserver und Zielport kann er dadurch maximal übersetzen?",
    answer: 64512, tolerance: 0, unit: "Verbindungen",
    explain: "Jede Verbindung zum selben Ziel benötigt einen eigenen öffentlichen Quellport. Anzahl Ports: 65535 − 1024 + 1 = 64512." },

  { id: "ga2-tls-1", topic: "ga2-tls", level: 3, type: "single",
    q: "Ein Browser erhält das Serverzertifikat von <code>shop.example.de</code>, ausgestellt von einer Intermediate-CA, die wiederum von einer im Trust Store hinterlegten Root-CA signiert ist. Womit prüft der Browser die Signatur des Serverzertifikats?",
    options: [
      "Mit dem privaten Schlüssel des Webservers",
      "Mit dem öffentlichen Schlüssel der Intermediate-CA",
      "Mit dem öffentlichen Schlüssel des Webservers",
      "Mit dem privaten Schlüssel der Root-CA"
    ], answer: 1,
    explain: "Eine Signatur wird stets mit dem öffentlichen Schlüssel des Ausstellers geprüft. Das Serverzertifikat hat die Intermediate-CA signiert; deren Zertifikat wird anschließend mit dem öffentlichen Schlüssel der Root-CA geprüft. Private Schlüssel besitzt der Browser nicht." },
  { id: "ga2-tls-2", topic: "ga2-tls", level: 2, type: "match",
    q: "Ordnen Sie die Begriffe der passenden Beschreibung zu.",
    pairs: [
      ["CRL", "Von der CA veröffentlichte Liste gesperrter Zertifikate"],
      ["OCSP", "Online-Abfrage des Sperrstatus eines einzelnen Zertifikats"],
      ["SAN", "Zertifikatserweiterung mit allen gültigen Hostnamen"],
      ["Root-CA", "Selbstsignierte Vertrauensbasis im Trust Store"],
      ["CSR", "Zertifikatsantrag mit öffentlichem Schlüssel an die CA"]
    ],
    explain: "CRL und OCSP dienen der Sperrprüfung (Liste bzw. Einzelabfrage), der SAN enthält die Hostnamen, die Root-CA ist der Vertrauensanker und der CSR ist der Antrag zur Zertifikatsausstellung." },
  { id: "ga2-tls-3", topic: "ga2-tls", level: 3, type: "multi",
    q: "Für welche Hostnamen ist ein Wildcard-Zertifikat mit dem einzigen SAN-Eintrag <code>*.example.de</code> gültig? (Mehrere Antworten sind richtig.)",
    options: ["www.example.de", "example.de", "mail.example.de", "test.shop.example.de", "shop.example.com"], answer: [0, 2],
    explain: "Das Wildcard steht für genau ein Label: www.example.de und mail.example.de passen. example.de (kein Label) und test.shop.example.de (zwei Labels) passen nicht; shop.example.com ist eine andere Domain." },
  { id: "ga2-tls-4", topic: "ga2-tls", level: 2, type: "single",
    q: "Welches Verfahren verschlüsselt bei TLS die eigentlichen Nutzdaten nach Abschluss des Handshakes?",
    options: [
      "Asymmetrische Verschlüsselung mit dem öffentlichen Schlüssel des Servers (RSA)",
      "Symmetrische Verschlüsselung, z. B. AES-GCM, mit dem ausgehandelten Sitzungsschlüssel",
      "Hashing mit SHA-256",
      "Base64-Kodierung"
    ], answer: 1,
    explain: "TLS ist ein hybrides Verfahren: Der Sitzungsschlüssel wird asymmetrisch (z. B. ECDHE) vereinbart, die Nutzdaten werden aus Performancegründen symmetrisch verschlüsselt. Hashing dient der Integrität, Base64 ist keine Verschlüsselung." },

  { id: "ga2-ipv6-1", topic: "ga2-ipv6", level: 2, type: "number",
    q: "Ein Unternehmen erhält vom Provider das Präfix <code>2001:db8:ab00::/48</code>. Wie viele /64-Subnetze kann es daraus bilden?",
    answer: 65536, tolerance: 0, unit: "Subnetze",
    explain: "Subnetzbits: 64 − 48 = 16. Anzahl /64-Netze: 2^16 = 65.536." },
  { id: "ga2-ipv6-2", topic: "ga2-ipv6", level: 2, type: "single",
    q: "Wie lautet die korrekte und maximal verkürzte Schreibweise von <code>2001:0db8:0000:0000:0008:0800:200c:417a</code>?",
    options: [
      "2001:db8::8:8:200c:417a",
      "2001:db8::8::200c:417a",
      "2001:db8::8:800:200c:417a",
      "2001:db8:0:0:8:800:200c:417a"
    ], answer: 2,
    explain: "Führende Nullen entfallen (0db8 → db8, 0008 → 8, 0800 → 800), die zwei Null-Blöcke werden einmal durch :: ersetzt. Nachgestellte Nullen (0800 → 8) dürfen nicht entfallen, :: darf nur einmal vorkommen, und 2001:db8:0:0:… ist zwar gültig, aber nicht maximal verkürzt." },
  { id: "ga2-ipv6-3", topic: "ga2-ipv6", level: 1, type: "match",
    q: "Ordnen Sie den IPv6-Präfixen den jeweiligen Adresstyp zu.",
    pairs: [
      ["2000::/3", "Global Unicast Address (GUA)"],
      ["fe80::/10", "Link-Local-Adresse"],
      ["fc00::/7", "Unique Local Address (ULA)"],
      ["ff00::/8", "Multicast"],
      ["::1/128", "Loopback"]
    ],
    explain: "GUA 2000::/3 (global routbar), Link-Local fe80::/10 (nur lokales Segment), ULA fc00::/7 (privat), Multicast ff00::/8, Loopback ::1." },
  { id: "ga2-ipv6-4", topic: "ga2-ipv6", level: 3, type: "single",
    q: "Ein Host mit der MAC-Adresse <code>00:1A:2B:3C:4D:5E</code> bildet seine Interface-ID per modifiziertem EUI-64. Wie lautet sie?",
    options: ["001a:2bff:fe3c:4d5e", "021a:2bff:fe3c:4d5e", "021a:2bfe:ff3c:4d5e", "021a:2b3c:4d5e:fffe"], answer: 1,
    explain: "MAC teilen (00:1A:2B | 3C:4D:5E), FF:FE einfügen → 00:1A:2B:FF:FE:3C:4D:5E. Dann das 7. Bit (U/L) des ersten Bytes invertieren: 0x00 → 0x02. Ergebnis 021a:2bff:fe3c:4d5e." },
  { id: "ga2-ipv6-5", topic: "ga2-ipv6", level: 3, type: "single",
    q: "Ein Router sendet Router Advertisements mit dem Präfix 2001:db8:1:10::/64, M-Flag = 0 und O-Flag = 1. Wie erhalten die Clients ihre Konfiguration?",
    options: [
      "Adresse per stateful DHCPv6, Gateway per DHCPv6",
      "Adresse per SLAAC, weitere Informationen wie DNS-Server per stateless DHCPv6",
      "Adresse und DNS-Server ausschließlich per SLAAC, DHCPv6 wird nicht genutzt",
      "Adresse per DHCPv4, da IPv6 keine Autokonfiguration kennt"
    ], answer: 1,
    explain: "M = 0 bedeutet: keine Adressvergabe per DHCPv6, die Adresse wird per SLAAC aus dem /64-Präfix gebildet. O = 1 bedeutet: weitere Konfigurationsdaten (z. B. DNS) per stateless DHCPv6. Das Gateway kommt immer aus dem RA." }
);
