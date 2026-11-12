window.FABI_DATA = window.FABI_DATA || { topics: [], questions: [] };
FABI_DATA.topics.push(
  {
    id: "wiso-rechnen",
    area: "WISO",
    extra: false,
    title: "Kaufmännisches Rechnen",
    overview: [
      "<b>Bezugskalkulation:</b> Listenpreis − Rabatt = Zieleinkaufspreis − Skonto = Bareinkaufspreis + Bezugskosten = Bezugspreis.",
      "<b>Deckungsbeitrag</b> je Stück = Verkaufspreis − variable Stückkosten; DB gesamt = DB je Stück × Menge.",
      "<b>Break-even-Menge</b> = Fixkosten ÷ Deckungsbeitrag je Stück.",
      "<b>Amortisationsdauer</b> = Anschaffungskosten ÷ jährlicher Rückfluss (Einsparung bzw. Gewinn + Abschreibung).",
      "<b>Budgetabweichung:</b> absolut = Ist − Plan; prozentual = Abweichung ÷ Plan × 100.",
      "Dreisatz und Prozentrechnung (Grundwert, Prozentwert, Prozentsatz) sind die Basis fast aller WISO-Rechnungen."
    ],
    content: `
<h3>Bezugskalkulation (Einkaufskalkulation)</h3>
<p>Mit der Bezugskalkulation ermittelt man, was eine Ware den Betrieb tatsächlich kostet. Rabatt wird vom <b>Listenpreis</b> abgezogen, Skonto erst vom bereits rabattierten <b>Zieleinkaufspreis</b>. Bezugskosten (Fracht, Verpackung, Versicherung) werden zum Schluss addiert.</p>
<table>
<tr><th>Schritt</th><th>Rechenweg</th></tr>
<tr><td>Listeneinkaufspreis</td><td>Ausgangswert laut Angebot</td></tr>
<tr><td>− Liefererrabatt</td><td>% vom Listenpreis</td></tr>
<tr><td>= Zieleinkaufspreis</td><td></td></tr>
<tr><td>− Liefererskonto</td><td>% vom Zieleinkaufspreis</td></tr>
<tr><td>= Bareinkaufspreis</td><td></td></tr>
<tr><td>+ Bezugskosten</td><td>fester Betrag</td></tr>
<tr><td>= Bezugspreis (Einstandspreis)</td><td></td></tr>
</table>
<div class="example"><b>Beispiel:</b> Listenpreis 1.000 €, 10 % Rabatt, 2 % Skonto, 20 € Versand: 1.000 − 100 = 900 € Zieleinkaufspreis; 900 − 18 = 882 € Bareinkaufspreis; 882 + 20 = 902 € Bezugspreis.</div>
<h3>Deckungsbeitrag und Break-even</h3>
<p>Der <b>Deckungsbeitrag (DB)</b> zeigt, wie viel ein verkauftes Stück zur Deckung der Fixkosten beiträgt: DB/Stück = Preis − variable Stückkosten. Der <b>Break-even-Point</b> (Gewinnschwelle) ist erreicht, wenn der gesamte DB die Fixkosten genau deckt: Break-even-Menge = Fixkosten ÷ DB/Stück. Darüber entsteht Gewinn, darunter Verlust.</p>
<h3>Amortisationsrechnung</h3>
<p>Die statische <b>Amortisationsdauer</b> gibt an, nach wie vielen Jahren eine Investition durch die Rückflüsse (z. B. Kosteneinsparungen) wieder hereingeholt ist: Amortisationsdauer = Investition ÷ jährlicher Rückfluss. Je kürzer, desto geringer das Risiko.</p>
<h3>Budgetabweichung</h3>
<p>Im Controlling vergleicht man Plan- und Istwerte. <b>Absolute Abweichung</b> = Ist − Plan, <b>relative Abweichung</b> = (Ist − Plan) ÷ Plan × 100 %. Positive Werte bei Kosten bedeuten eine Budgetüberschreitung.</p>
<h3>Dreisatz und Prozentrechnung</h3>
<ul>
<li><b>Proportionaler Dreisatz:</b> „je mehr, desto mehr“ – über die Einheit rechnen (dividieren, dann multiplizieren).</li>
<li><b>Antiproportionaler Dreisatz:</b> „je mehr, desto weniger“ (z. B. mehr Mitarbeiter, weniger Tage) – multiplizieren, dann dividieren.</li>
<li><b>Prozentrechnung:</b> Prozentwert = Grundwert × Prozentsatz ÷ 100. Bei vermehrtem Grundwert (z. B. Bruttopreis inkl. 19 % USt) gilt: Grundwert = Bruttowert ÷ 1,19.</li>
</ul>
<div class="tip"><b>Prüfungstipp:</b> Skonto nie vom Listenpreis rechnen! Schreiben Sie jeden Kalkulationsschritt mit Zwischenergebnis auf – das bringt auch bei Folgefehlern Teilpunkte.</div>
`,
    terms: [
      ["Listeneinkaufspreis", "Preis laut Angebot oder Preisliste des Lieferers vor Abzug von Rabatt und Skonto."],
      ["Rabatt", "Preisnachlass (z. B. Mengen- oder Treuerabatt), der vom Listenpreis abgezogen wird."],
      ["Skonto", "Preisnachlass für Zahlung innerhalb einer kurzen Frist; wird vom Zieleinkaufspreis berechnet."],
      ["Bezugspreis", "Einstandspreis einer Ware: Bareinkaufspreis zuzüglich Bezugskosten wie Fracht oder Verpackung."],
      ["Deckungsbeitrag", "Differenz aus Erlös und variablen Kosten; dient zur Deckung der Fixkosten."],
      ["Break-even-Menge", "Absatzmenge, bei der Erlöse und Gesamtkosten gleich sind (Gewinn = 0); Fixkosten ÷ DB je Stück."],
      ["Amortisationsdauer", "Zeitraum, bis die Anschaffungskosten einer Investition durch Rückflüsse gedeckt sind."],
      ["Budgetabweichung", "Differenz zwischen Ist- und Planwert, absolut in € oder relativ in % des Planwerts."]
    ],
    cards: [
      ["Wovon wird Skonto in der Bezugskalkulation berechnet?", "Vom Zieleinkaufspreis (Listenpreis nach Abzug des Rabatts)."],
      ["Wie berechnet man die Break-even-Menge?", "Fixkosten ÷ (Verkaufspreis − variable Stückkosten)."],
      ["Investition 10.000 €, jährliche Einsparung 2.500 € – Amortisationsdauer?", "10.000 ÷ 2.500 = 4 Jahre."],
      ["Plan 20.000 €, Ist 21.000 € – relative Abweichung?", "(21.000 − 20.000) ÷ 20.000 × 100 = +5 %."]
    ]
  },
  {
    id: "wiso-unternehmensformen",
    area: "WISO",
    extra: false,
    title: "Unternehmensformen",
    overview: [
      "<b>Personengesellschaften</b> (GbR, OHG, KG): mindestens ein Gesellschafter haftet persönlich und unbeschränkt.",
      "<b>Kapitalgesellschaften</b> (GmbH, UG, AG) sind juristische Personen; es haftet nur das Gesellschaftsvermögen.",
      "GmbH: Mindeststammkapital <b>25.000 €</b>; UG (haftungsbeschränkt): ab 1 €, 25 % des Jahresüberschusses in die Rücklage.",
      "KG: <b>Komplementär</b> haftet unbeschränkt, <b>Kommanditist</b> nur bis zur Höhe seiner Einlage.",
      "AG: Grundkapital mind. 50.000 €; Organe Vorstand, Aufsichtsrat, Hauptversammlung.",
      "Kaufleute und Handelsgesellschaften werden ins <b>Handelsregister</b> eingetragen (Abteilung A: Einzelkaufleute/Personengesellschaften, B: Kapitalgesellschaften)."
    ],
    content: `
<h3>Natürliche und juristische Personen</h3>
<p><b>Natürliche Personen</b> sind Menschen; sie sind ab Geburt rechtsfähig. <b>Juristische Personen</b> sind Personenvereinigungen oder Vermögensmassen, denen die Rechtsordnung eigene Rechtsfähigkeit verleiht (z. B. GmbH, AG, eingetragener Verein). Sie handeln durch ihre <b>Organe</b>. OHG und KG sind zwar rechtsfähige Personengesellschaften, aber keine juristischen Personen.</p>
<h3>Überblick der Rechtsformen</h3>
<table>
<tr><th>Rechtsform</th><th>Gründer</th><th>Mindestkapital</th><th>Haftung</th><th>Geschäftsführung</th></tr>
<tr><td>Einzelunternehmen</td><td>1</td><td>keines</td><td>unbeschränkt mit Privatvermögen</td><td>Inhaber</td></tr>
<tr><td>GbR</td><td>ab 2</td><td>keines</td><td>unbeschränkt, gesamtschuldnerisch</td><td>alle gemeinsam (sofern nicht anders vereinbart)</td></tr>
<tr><td>OHG</td><td>ab 2</td><td>keines</td><td>unbeschränkt, unmittelbar, solidarisch</td><td>jeder Gesellschafter</td></tr>
<tr><td>KG</td><td>mind. 1 Komplementär + 1 Kommanditist</td><td>keines</td><td>Komplementär unbeschränkt; Kommanditist bis zur Einlage</td><td>Komplementär</td></tr>
<tr><td>GmbH</td><td>ab 1</td><td>25.000 € Stammkapital (Hälfte bei Anmeldung einzuzahlen, mind. 12.500 €)</td><td>nur Gesellschaftsvermögen</td><td>Geschäftsführer</td></tr>
<tr><td>UG (haftungsbeschränkt)</td><td>ab 1</td><td>1 €, Rücklage 25 % des Jahresüberschusses</td><td>nur Gesellschaftsvermögen</td><td>Geschäftsführer</td></tr>
<tr><td>AG</td><td>ab 1</td><td>50.000 € Grundkapital</td><td>nur Gesellschaftsvermögen</td><td>Vorstand</td></tr>
</table>
<h3>Organe der Kapitalgesellschaften</h3>
<ul>
<li><b>GmbH:</b> Geschäftsführer (Leitung und Vertretung), Gesellschafterversammlung (Beschlussorgan), Aufsichtsrat nur ab bestimmter Größe (Mitbestimmung, i. d. R. ab 500 Arbeitnehmern).</li>
<li><b>AG:</b> Vorstand (leitet), Aufsichtsrat (bestellt und überwacht den Vorstand), Hauptversammlung (Versammlung der Aktionäre, z. B. Gewinnverwendung, Wahl der Anteilseignervertreter im Aufsichtsrat).</li>
</ul>
<h3>Handelsregister</h3>
<p>Das Handelsregister ist ein öffentliches, elektronisch beim Amtsgericht geführtes Verzeichnis. <b>Abteilung A</b> enthält Einzelkaufleute und Personenhandelsgesellschaften (e. K., OHG, KG), <b>Abteilung B</b> Kapitalgesellschaften (GmbH, UG, AG). Bei Kapitalgesellschaften wirkt die Eintragung <b>konstitutiv</b>: Erst mit Eintragung entsteht die Gesellschaft als juristische Person.</p>
<div class="example"><b>Beispiel:</b> Zwei Fachinformatiker gründen ein IT-Systemhaus. Wollen sie ihr Privatvermögen schützen, aber kein hohes Startkapital aufbringen, bietet sich eine UG (haftungsbeschränkt) an, die später durch Rücklagenbildung auf 25.000 € zur GmbH aufgestockt werden kann.</div>
<div class="tip"><b>Prüfungstipp:</b> „Unbeschränkt, unmittelbar, solidarisch“ ist die klassische Formel für die Haftung der OHG-Gesellschafter und des Komplementärs.</div>
`,
    terms: [
      ["Juristische Person", "Rechtlich verselbstständigte Organisation mit eigener Rechtsfähigkeit (z. B. GmbH, AG), die durch Organe handelt."],
      ["Natürliche Person", "Jeder Mensch; rechtsfähig ab Vollendung der Geburt."],
      ["Komplementär", "Vollhafter einer KG; haftet unbeschränkt mit dem Privatvermögen und führt die Geschäfte."],
      ["Kommanditist", "Teilhafter einer KG; haftet nur bis zur Höhe seiner Einlage und ist von der Geschäftsführung ausgeschlossen."],
      ["Stammkapital", "Satzungsmäßiges Mindestkapital einer GmbH, mindestens 25.000 €."],
      ["UG (haftungsbeschränkt)", "Variante der GmbH mit Mindeststammkapital ab 1 €; muss 25 % des Jahresüberschusses in eine Rücklage einstellen."],
      ["Hauptversammlung", "Organ der AG, in dem die Aktionäre ihre Rechte ausüben, z. B. über die Gewinnverwendung beschließen."],
      ["Handelsregister", "Öffentliches Verzeichnis beim Amtsgericht über Kaufleute und Handelsgesellschaften (Abteilung A und B)."]
    ],
    cards: [
      ["Wie haften OHG-Gesellschafter?", "Unbeschränkt (mit Privatvermögen), unmittelbar (direkt vom Gläubiger in Anspruch nehmbar) und solidarisch (jeder für die gesamte Schuld)."],
      ["Welche drei Organe hat eine AG?", "Vorstand, Aufsichtsrat und Hauptversammlung."],
      ["In welche Abteilung des Handelsregisters wird eine GmbH eingetragen?", "In Abteilung B (Kapitalgesellschaften)."],
      ["Ist eine OHG eine juristische Person?", "Nein, sie ist eine rechtsfähige Personenhandelsgesellschaft, aber keine juristische Person."]
    ]
  },
  {
    id: "wiso-vwl",
    area: "WISO",
    extra: false,
    title: "Volkswirtschaftliche Grundlagen",
    overview: [
      "Der <b>Gleichgewichtspreis</b> liegt im Schnittpunkt von Angebots- und Nachfragekurve; dort wird die größte Menge umgesetzt.",
      "Nachfrageüberhang → Preis steigt; Angebotsüberhang → Preis sinkt.",
      "Marktformen nach Anzahl der Anbieter: <b>Monopol</b> (einer), <b>Oligopol</b> (wenige), <b>Polypol</b> (viele).",
      "<b>Inflation</b> senkt die Kaufkraft: Realwert = Nominalwert ÷ (1 + Inflationsrate).",
      "Konjunkturphasen: Aufschwung, Boom (Hochkonjunktur), Abschwung, Depression/Tiefstand.",
      "<b>Magisches Viereck</b> (StabG 1967): Preisniveaustabilität, hoher Beschäftigungsstand, außenwirtschaftliches Gleichgewicht, stetiges und angemessenes Wirtschaftswachstum."
    ],
    content: `
<h3>Angebot, Nachfrage und Preisbildung</h3>
<p>Auf einem Markt treffen Angebot und Nachfrage aufeinander. Die <b>Nachfragekurve</b> fällt (je höher der Preis, desto weniger wird nachgefragt), die <b>Angebotskurve</b> steigt (je höher der Preis, desto mehr wird angeboten). Im Schnittpunkt liegen <b>Gleichgewichtspreis</b> und <b>Gleichgewichtsmenge</b>; der Markt wird geräumt.</p>
<ul>
<li>Preis über dem Gleichgewicht → <b>Angebotsüberhang</b> → Anbieter senken die Preise.</li>
<li>Preis unter dem Gleichgewicht → <b>Nachfrageüberhang</b> → Preise steigen.</li>
<li>Steigt die Nachfrage (Kurve verschiebt sich nach rechts), steigen ceteris paribus Gleichgewichtspreis und -menge.</li>
</ul>
<h3>Marktformen</h3>
<table>
<tr><th>Anbieter</th><th>Marktform</th><th>Beispiel</th></tr>
<tr><td>einer</td><td>Angebotsmonopol</td><td>Netzbetreiber Schienennetz</td></tr>
<tr><td>wenige</td><td>Angebotsoligopol</td><td>Mobilfunknetzbetreiber, Mineralölkonzerne</td></tr>
<tr><td>viele</td><td>Polypol</td><td>Wochenmarkt, Handwerksbetriebe</td></tr>
</table>
<h3>Inflation und Kaufkraft</h3>
<p><b>Inflation</b> ist ein anhaltender Anstieg des allgemeinen Preisniveaus, gemessen am Verbraucherpreisindex (Warenkorb). Dadurch sinkt die <b>Kaufkraft</b> des Geldes. Der <b>Realwert</b> eines Betrags ergibt sich aus Nominalwert ÷ (1 + Inflationsrate). Die EZB strebt mittelfristig eine Inflationsrate von 2 % an.</p>
<div class="example"><b>Beispiel:</b> Ein Gehalt steigt nominal um 3 %, die Inflation beträgt 5 %. Real kann sich der Arbeitnehmer weniger leisten als zuvor (Reallohnverlust, ca. 1,03 ÷ 1,05 ≈ −1,9 %).</div>
<h3>Wirtschaftskreislauf</h3>
<p>Im einfachen Wirtschaftskreislauf tauschen <b>Haushalte</b> und <b>Unternehmen</b> Güter und Faktorleistungen (Arbeit, Kapital, Boden) gegen Geld (Konsumausgaben, Einkommen). Der erweiterte Kreislauf ergänzt <b>Staat</b>, <b>Banken</b> (Ersparnis, Kredite) und <b>Ausland</b> (Exporte, Importe).</p>
<h3>Konjunkturphasen</h3>
<ol>
<li><b>Aufschwung (Expansion):</b> steigende Produktion und Nachfrage, sinkende Arbeitslosigkeit.</li>
<li><b>Boom (Hochkonjunktur):</b> Kapazitäten voll ausgelastet, Arbeitskräfte knapp, steigende Preise und Zinsen.</li>
<li><b>Abschwung (Rezession):</b> rückläufige Nachfrage und Investitionen, steigende Arbeitslosigkeit.</li>
<li><b>Depression (Tiefstand):</b> niedrige Auslastung, hohe Arbeitslosigkeit, pessimistische Erwartungen.</li>
</ol>
<h3>Magisches Viereck</h3>
<p>Das Stabilitäts- und Wachstumsgesetz nennt vier Ziele, die gleichzeitig kaum vollständig erreichbar sind (daher „magisch“): Preisniveaustabilität, hoher Beschäftigungsstand, außenwirtschaftliches Gleichgewicht und stetiges, angemessenes Wirtschaftswachstum. Ergänzt um gerechte Einkommensverteilung und Umweltschutz spricht man vom <b>magischen Sechseck</b>.</p>
`,
    terms: [
      ["Gleichgewichtspreis", "Preis, bei dem angebotene und nachgefragte Menge übereinstimmen; Schnittpunkt der Angebots- und Nachfragekurve."],
      ["Nachfrageüberhang", "Situation, in der zum geltenden Preis mehr nachgefragt als angeboten wird; führt zu Preissteigerungen."],
      ["Monopol", "Marktform mit nur einem Anbieter und vielen Nachfragern."],
      ["Oligopol", "Marktform mit wenigen, meist großen Anbietern, die sich gegenseitig beobachten."],
      ["Polypol", "Marktform mit vielen Anbietern und vielen Nachfragern; einzelne haben kaum Preismacht."],
      ["Inflation", "Anhaltender Anstieg des allgemeinen Preisniveaus, der die Kaufkraft des Geldes mindert."],
      ["Kaufkraft", "Menge an Gütern, die man mit einem bestimmten Geldbetrag erwerben kann."],
      ["Magisches Viereck", "Vier gesamtwirtschaftliche Ziele des Stabilitätsgesetzes, die in Zielkonflikten zueinander stehen."]
    ],
    cards: [
      ["Was passiert bei einem Angebotsüberhang mit dem Preis?", "Der Preis sinkt, bis sich das Gleichgewicht einstellt."],
      ["Wie berechnet man den Realwert von 1.000 € bei 2 % Inflation nach einem Jahr?", "1.000 ÷ 1,02 ≈ 980,39 €."],
      ["Welche Ziele erweitern das magische Viereck zum Sechseck?", "Gerechte Einkommens- und Vermögensverteilung sowie Umweltschutz."],
      ["Nennen Sie die vier Konjunkturphasen.", "Aufschwung, Boom (Hochkonjunktur), Abschwung (Rezession), Depression (Tiefstand)."]
    ]
  },
  {
    id: "wiso-kostenrechnung",
    area: "WISO",
    extra: false,
    title: "Kostenrechnung & Wirtschaftlichkeitsvergleich",
    overview: [
      "<b>Fixkosten</b> fallen unabhängig von der Menge an (Miete, Gehälter, Leasingrate).",
      "<b>Variable Kosten</b> ändern sich mit der Menge (Material, Strom je Stück, Toner je Seite).",
      "Gesamtkosten K = K<sub>fix</sub> + k<sub>var</sub> × x; Stückkosten k = K ÷ x.",
      "Die <b>kritische Menge</b> ist die Menge, bei der zwei Alternativen gleich teuer sind: (K<sub>fix,A</sub> − K<sub>fix,B</sub>) ÷ (k<sub>var,B</sub> − k<sub>var,A</sub>).",
      "<b>Kauf vs. Leasing:</b> Gesamtkosten über die gleiche Nutzungsdauer vergleichen (inkl. Gebühren, Wartung, Restwert)."
    ],
    content: `
<h3>Kostenarten nach Abhängigkeit von der Menge</h3>
<table>
<tr><th>Kostenart</th><th>Verhalten</th><th>Beispiele (IT)</th></tr>
<tr><td>Fixkosten</td><td>konstant, unabhängig von der Ausbringungsmenge</td><td>Miete Serverraum, Gehälter, Softwarelizenz-Flatrate, Leasingrate</td></tr>
<tr><td>Variable Kosten</td><td>steigen mit der Menge</td><td>Toner und Papier je Seite, Materialkosten je Gerät, Cloud-Kosten pro Nutzung</td></tr>
</table>
<p>Die <b>Gesamtkosten</b> berechnen sich als K = K<sub>fix</sub> + k<sub>var</sub> · x. Die <b>Stückkosten</b> sind k = K ÷ x. Mit steigender Menge sinken die Stückkosten, weil sich die Fixkosten auf mehr Einheiten verteilen (<b>Fixkostendegression</b>).</p>
<h3>Kritische Menge (Wirtschaftlichkeitsvergleich)</h3>
<p>Haben zwei Alternativen unterschiedliche Fix- und variable Kosten, gibt es eine Menge, bei der beide gleich teuer sind. Ansatz: Kostenfunktionen gleichsetzen.</p>
<pre>K_fix,A + k_var,A · x = K_fix,B + k_var,B · x
x = (K_fix,A − K_fix,B) ÷ (k_var,B − k_var,A)</pre>
<p>Unterhalb der kritischen Menge ist die Alternative mit den <b>niedrigeren Fixkosten</b> günstiger, oberhalb die mit den <b>niedrigeren variablen Kosten</b>.</p>
<div class="example"><b>Beispiel:</b> Drucker A: 500 € Fixkosten/Jahr, 0,04 €/Seite. Drucker B: 200 € Fixkosten/Jahr, 0,07 €/Seite. Kritische Menge = (500 − 200) ÷ (0,07 − 0,04) = 10.000 Seiten. Wer mehr als 10.000 Seiten im Jahr druckt, wählt Drucker A.</div>
<h3>Kauf vs. Leasing</h3>
<p>Beim <b>Kauf</b> fällt der Kaufpreis an (ggf. mit Finanzierungskosten), das Gerät gehört dem Unternehmen und kann am Ende einen Restwert haben. Beim <b>Leasing</b> zahlt man über die Vertragslaufzeit Raten und eventuell eine Abschlussgebühr; das Gerät bleibt Eigentum des Leasinggebers.</p>
<ul>
<li>Vorteile Leasing: Liquidität bleibt erhalten, planbare Raten, regelmäßiger Technologiewechsel, oft Service inklusive.</li>
<li>Nachteile Leasing: meist höhere Gesamtkosten, kein Eigentum, Vertragsbindung.</li>
<li>Vergleich immer über denselben Zeitraum: Summe aller Zahlungen (Raten × Monate + Gebühren) gegenüber Kaufpreis + Wartung − Restwert.</li>
</ul>
<div class="tip"><b>Prüfungstipp:</b> Geben Sie bei der kritischen Menge immer an, welche Alternative unterhalb bzw. oberhalb günstiger ist – das wird häufig mitgefragt.</div>
`,
    terms: [
      ["Fixkosten", "Kosten, die unabhängig von der produzierten oder genutzten Menge in gleicher Höhe anfallen."],
      ["Variable Kosten", "Kosten, die sich mit der Ausbringungs- oder Nutzungsmenge verändern."],
      ["Gesamtkosten", "Summe aus Fixkosten und variablen Kosten: K = K_fix + k_var × x."],
      ["Stückkosten", "Gesamtkosten geteilt durch die Menge; Kosten je Einheit."],
      ["Fixkostendegression", "Sinken der fixen Stückkosten bei steigender Menge, da sich die Fixkosten auf mehr Einheiten verteilen."],
      ["Kritische Menge", "Menge, bei der zwei Alternativen gleich hohe Gesamtkosten verursachen."],
      ["Leasing", "Miete eines Wirtschaftsguts gegen regelmäßige Raten; Eigentum verbleibt beim Leasinggeber."]
    ],
    cards: [
      ["Welche Alternative ist unterhalb der kritischen Menge günstiger?", "Die Alternative mit den niedrigeren Fixkosten."],
      ["Fixkosten 1.000 €, variable Kosten 2 €/Stk., 500 Stück – Stückkosten?", "(1.000 + 1.000) ÷ 500 = 4 €/Stück."],
      ["Nennen Sie zwei Vorteile des Leasings.", "Schonung der Liquidität, planbare Raten, einfacher Technologiewechsel."]
    ]
  },
  {
    id: "wiso-beschaffung",
    area: "WISO",
    extra: false,
    title: "Beschaffung & Angebotsvergleich",
    overview: [
      "Der <b>quantitative Angebotsvergleich</b> vergleicht Bezugspreise (Listenpreis − Rabatt − Skonto + Bezugskosten).",
      "Der <b>qualitative Vergleich</b> (Nutzwertanalyse) bewertet Kriterien wie Service, Lieferzeit, Qualität mit Gewichtungen.",
      "Nutzwert = Σ (Gewichtung × Punkte); der höchste Nutzwert gewinnt.",
      "<b>TCO</b> (Total Cost of Ownership) berücksichtigt neben dem Kaufpreis alle Folgekosten über die Nutzungsdauer.",
      "Die <b>optimale Bestellmenge</b> minimiert die Summe aus Bestell- und Lagerhaltungskosten."
    ],
    content: `
<h3>Bezugsquellenermittlung</h3>
<p>Vor einer Anfrage müssen geeignete Lieferer gefunden werden. <b>Interne Quellen</b> sind Liefererdatei, frühere Bestellungen, ERP-Stammdaten; <b>externe Quellen</b> sind Fachmessen, Online-Marktplätze, Branchenverzeichnisse, Fachzeitschriften, Vertreterbesuche und Ausschreibungsplattformen.</p>
<h3>Quantitativer Angebotsvergleich</h3>
<p>Hier zählt der <b>Bezugspreis</b>. Für jedes Angebot wird die Bezugskalkulation durchgeführt (Listenpreis − Rabatt = Zieleinkaufspreis − Skonto = Bareinkaufspreis + Bezugskosten = Bezugspreis). Das Angebot mit dem niedrigsten Bezugspreis ist rein rechnerisch das günstigste.</p>
<h3>Qualitativer Angebotsvergleich – Nutzwertanalyse</h3>
<p>Nicht nur der Preis entscheidet. Mit der <b>Nutzwertanalyse</b> werden auch „weiche“ Kriterien bewertet:</p>
<ol>
<li>Kriterien festlegen (z. B. Preis, Lieferzeit, Service, Garantie, Zuverlässigkeit, Umweltaspekte).</li>
<li>Kriterien gewichten (Summe der Gewichte = 100 % bzw. 1).</li>
<li>Jedes Angebot je Kriterium mit Punkten bewerten (z. B. 1–10).</li>
<li>Gewichtete Punkte = Gewicht × Punkte; Summe ergibt den Nutzwert.</li>
</ol>
<table>
<tr><th>Kriterium</th><th>Gewicht</th><th>Anbieter X (Punkte / gewichtet)</th><th>Anbieter Y (Punkte / gewichtet)</th></tr>
<tr><td>Preis</td><td>50 %</td><td>6 / 3,0</td><td>8 / 4,0</td></tr>
<tr><td>Service</td><td>30 %</td><td>9 / 2,7</td><td>5 / 1,5</td></tr>
<tr><td>Lieferzeit</td><td>20 %</td><td>7 / 1,4</td><td>7 / 1,4</td></tr>
<tr><td><b>Nutzwert</b></td><td>100 %</td><td><b>7,1</b></td><td><b>6,9</b></td></tr>
</table>
<div class="example"><b>Beispiel:</b> Obwohl Anbieter Y günstiger ist, gewinnt Anbieter X wegen des deutlich besseren Services (Vor-Ort-Austausch innerhalb von 4 Stunden) die Nutzwertanalyse.</div>
<h3>Folgekosten und TCO</h3>
<p>Die <b>Total Cost of Ownership</b> umfasst Anschaffungskosten sowie alle Betriebs- und Folgekosten: Verbrauchsmaterial (Toner), Wartungsverträge, Energie, Lizenzen, Schulung, Support und Entsorgung. Ein günstiger Drucker mit teurem Toner kann über vier Jahre deutlich teurer sein als ein teureres Gerät.</p>
<h3>Lieferzeiten, Service und optimale Bestellmenge</h3>
<p>Lieferzeit, Liefertreue, Reaktionszeiten (SLA), Garantie und Hotline-Erreichbarkeit sind wichtige qualitative Kriterien. Die <b>optimale Bestellmenge</b> ist die Menge, bei der die Summe aus <b>Bestellkosten</b> (sinken bei großen, seltenen Bestellungen) und <b>Lagerhaltungskosten</b> (steigen bei großen Beständen) minimal ist.</p>
<div class="tip"><b>Prüfungstipp:</b> Prüfen Sie bei der Nutzwertanalyse, ob die Gewichte zusammen 100 % ergeben, und rechnen Sie Prozent als Dezimalzahl (40 % = 0,4).</div>
`,
    terms: [
      ["Bezugsquellenermittlung", "Suche nach geeigneten Lieferern über interne (Liefererdatei) und externe Quellen (Messen, Internet)."],
      ["Quantitativer Angebotsvergleich", "Vergleich von Angeboten anhand messbarer Größen, vor allem des Bezugspreises."],
      ["Qualitativer Angebotsvergleich", "Vergleich nach nicht rein monetären Kriterien wie Service, Qualität, Zuverlässigkeit."],
      ["Nutzwertanalyse", "Entscheidungsverfahren, bei dem gewichtete Kriterienpunkte zu einem Nutzwert je Alternative addiert werden."],
      ["TCO (Total Cost of Ownership)", "Gesamtkosten eines Wirtschaftsguts über den Lebenszyklus inkl. aller Folgekosten."],
      ["Folgekosten", "Kosten, die nach der Anschaffung durch Betrieb, Wartung, Verbrauchsmaterial und Entsorgung entstehen."],
      ["Optimale Bestellmenge", "Bestellmenge, bei der die Summe aus Bestell- und Lagerhaltungskosten am geringsten ist."]
    ],
    cards: [
      ["Wie berechnet man den Nutzwert?", "Summe aus (Gewichtung × vergebene Punkte) über alle Kriterien."],
      ["Nennen Sie drei Folgekosten eines Druckers.", "Toner, Wartung, Strom (auch Papier, Ersatzteile, Entsorgung)."],
      ["Warum steigen bei großen Bestellmengen die Lagerkosten?", "Es wird mehr Kapital gebunden und mehr Lagerfläche benötigt; Risiko von Schwund und Veralterung steigt."]
    ]
  },
  {
    id: "wiso-datenschutz",
    area: "WISO",
    extra: false,
    title: "Datenschutz (DSGVO/BDSG) & Social Engineering",
    overview: [
      "Die DSGVO schützt <b>personenbezogene Daten</b> natürlicher Personen; ergänzend gilt in Deutschland das BDSG.",
      "Art. 5 DSGVO: Rechtmäßigkeit, Treu und Glauben, Transparenz, Zweckbindung, Datenminimierung, Richtigkeit, Speicherbegrenzung, Integrität und Vertraulichkeit, Rechenschaftspflicht.",
      "Jede Verarbeitung braucht eine <b>Rechtsgrundlage</b> nach Art. 6 (z. B. Einwilligung, Vertrag, rechtliche Verpflichtung, berechtigtes Interesse).",
      "Datenpannen sind binnen <b>72 Stunden</b> der Aufsichtsbehörde zu melden (Art. 33).",
      "Datenschutzbeauftragter Pflicht, wenn i. d. R. mind. <b>20 Personen</b> ständig mit automatisierter Verarbeitung beschäftigt sind (§ 38 BDSG).",
      "Bußgelder bis <b>20 Mio. €</b> oder <b>4 %</b> des weltweiten Jahresumsatzes (der höhere Betrag)."
    ],
    content: `
<h3>Grundsätze der Verarbeitung (Art. 5 DSGVO)</h3>
<ul>
<li><b>Rechtmäßigkeit, Treu und Glauben, Transparenz:</b> Verarbeitung nur mit Rechtsgrundlage und für Betroffene nachvollziehbar.</li>
<li><b>Zweckbindung:</b> Daten nur für festgelegte, eindeutige Zwecke erheben.</li>
<li><b>Datenminimierung:</b> nur so viele Daten wie für den Zweck nötig.</li>
<li><b>Richtigkeit:</b> Daten sachlich richtig und aktuell halten.</li>
<li><b>Speicherbegrenzung:</b> Daten löschen, sobald sie nicht mehr benötigt werden.</li>
<li><b>Integrität und Vertraulichkeit:</b> Schutz durch geeignete technische und organisatorische Maßnahmen.</li>
<li><b>Rechenschaftspflicht:</b> Der Verantwortliche muss die Einhaltung nachweisen können.</li>
</ul>
<h3>Rechtsgrundlagen (Art. 6 Abs. 1 DSGVO)</h3>
<table>
<tr><th>Buchstabe</th><th>Rechtsgrundlage</th><th>Beispiel</th></tr>
<tr><td>a</td><td>Einwilligung</td><td>Newsletter-Anmeldung</td></tr>
<tr><td>b</td><td>Vertragserfüllung</td><td>Lieferadresse für eine Bestellung</td></tr>
<tr><td>c</td><td>Rechtliche Verpflichtung</td><td>Lohndaten ans Finanzamt, Aufbewahrungspflichten</td></tr>
<tr><td>d</td><td>Lebenswichtige Interessen</td><td>Notfallversorgung</td></tr>
<tr><td>e</td><td>Öffentliche Aufgabe</td><td>Behördenhandeln</td></tr>
<tr><td>f</td><td>Berechtigtes Interesse</td><td>Videoüberwachung des Serverraums</td></tr>
</table>
<h3>Betroffenenrechte</h3>
<p>Auskunft (Art. 15), Berichtigung (Art. 16), Löschung/„Recht auf Vergessenwerden“ (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20), Widerspruch (Art. 21). Eine Einwilligung kann jederzeit mit Wirkung für die Zukunft widerrufen werden.</p>
<h3>Pflichten des Verantwortlichen</h3>
<p>Bei einer Datenschutzverletzung ist die Aufsichtsbehörde <b>unverzüglich, möglichst binnen 72 Stunden</b> nach Bekanntwerden zu informieren (Art. 33); bei hohem Risiko sind auch Betroffene zu benachrichtigen (Art. 34). Ein <b>Datenschutzbeauftragter</b> ist nach § 38 BDSG zu benennen, wenn in der Regel mindestens 20 Personen ständig mit der automatisierten Verarbeitung personenbezogener Daten beschäftigt sind. <b>TOMs</b> (technische und organisatorische Maßnahmen, Art. 32) sind z. B. Verschlüsselung, Zugriffskonzepte, Backups, Schulungen und Pseudonymisierung.</p>
<h3>Social Engineering und Phishing</h3>
<p><b>Social Engineering</b> manipuliert Menschen (Zeitdruck, Autorität, Hilfsbereitschaft), um an Daten oder Zugänge zu gelangen. <b>Phishing</b> nutzt gefälschte E-Mails oder Webseiten. Prävention: Mitarbeiterschulungen, Absender und Links prüfen, Mehr-Faktor-Authentisierung, Rückruf über bekannte Nummer, Meldeweg für Verdachtsfälle, E-Mail-Filter.</p>
<div class="example"><b>Beispiel:</b> Eine angebliche Geschäftsführerin fordert per E-Mail dringend eine Überweisung („CEO-Fraud“). Richtig: nicht reagieren, über eine bekannte Telefonnummer rückfragen und den Vorfall der IT-Sicherheit melden.</div>
`,
    terms: [
      ["Personenbezogene Daten", "Alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen."],
      ["Zweckbindung", "Grundsatz, dass Daten nur für festgelegte, eindeutige und legitime Zwecke verarbeitet werden dürfen."],
      ["Datenminimierung", "Grundsatz, nur die für den Zweck erforderlichen Daten zu verarbeiten."],
      ["Einwilligung", "Freiwillige, informierte, eindeutige Willensbekundung der betroffenen Person; jederzeit widerrufbar."],
      ["Berechtigtes Interesse", "Rechtsgrundlage nach Art. 6 Abs. 1 lit. f, wenn Interessen des Verantwortlichen die Rechte der Betroffenen überwiegen."],
      ["TOMs", "Technische und organisatorische Maßnahmen zur Sicherstellung eines angemessenen Schutzniveaus (Art. 32 DSGVO)."],
      ["Datenschutzbeauftragter", "Berät und überwacht den Verantwortlichen; Pflicht u. a. ab 20 Personen mit ständiger automatisierter Verarbeitung."],
      ["Social Engineering", "Manipulation von Menschen, um vertrauliche Informationen oder Zugänge zu erlangen."],
      ["Phishing", "Betrugsversuch über gefälschte Nachrichten oder Webseiten, um Zugangsdaten abzugreifen."]
    ],
    cards: [
      ["Innerhalb welcher Frist ist eine Datenpanne der Aufsichtsbehörde zu melden?", "Unverzüglich, möglichst binnen 72 Stunden nach Bekanntwerden."],
      ["Wie hoch können DSGVO-Bußgelder maximal sein?", "Bis 20 Mio. € oder 4 % des weltweiten Vorjahresumsatzes – je nachdem, welcher Betrag höher ist."],
      ["Nennen Sie drei Maßnahmen gegen Phishing.", "Schulungen, Mehr-Faktor-Authentisierung, E-Mail-Filter (auch Links prüfen, Meldeprozess)."],
      ["Was bedeutet Speicherbegrenzung?", "Personenbezogene Daten dürfen nur so lange gespeichert werden, wie es für den Zweck erforderlich ist."]
    ]
  },
  {
    id: "wiso-rechnungswesen",
    area: "WISO",
    extra: false,
    title: "Entgeltabrechnung & Umsatzsteuer",
    overview: [
      "Nettoentgelt = Bruttoentgelt − Lohnsteuer − Solidaritätszuschlag − Kirchensteuer − Sozialversicherungsbeiträge (AN-Anteil).",
      "Der Arbeitgeber trägt zusätzlich seinen <b>Arbeitgeberanteil</b> zur Sozialversicherung (Personalkosten = Brutto + AG-Anteil).",
      "<b>Forderungen</b> = Ansprüche gegen Kunden; <b>Verbindlichkeiten</b> = Schulden gegenüber Lieferern.",
      "Regelsteuersatz USt: <b>19 %</b>; Brutto = Netto × 1,19; Netto = Brutto ÷ 1,19.",
      "Zahllast = Umsatzsteuer − Vorsteuer.",
      "Pflichtangaben einer Rechnung regelt <b>§ 14 Abs. 4 UStG</b>."
    ],
    content: `
<h3>Vom Brutto- zum Nettoentgelt</h3>
<p>Vom <b>Bruttoentgelt</b> werden Steuern und Sozialversicherungsbeiträge des Arbeitnehmers abgezogen:</p>
<ul>
<li><b>Lohnsteuer</b> laut Lohnsteuertabelle (abhängig von Steuerklasse).</li>
<li><b>Solidaritätszuschlag</b> 5,5 % der Lohnsteuer – fällt seit 2021 für die meisten Arbeitnehmer wegen Freigrenze weg.</li>
<li><b>Kirchensteuer</b> 8 % (Bayern, Baden-Württemberg) bzw. 9 % der Lohnsteuer bei Kirchenmitgliedschaft.</li>
<li><b>Sozialversicherung (AN-Anteil):</b> Kranken-, Renten-, Arbeitslosen- und Pflegeversicherung, grundsätzlich etwa je zur Hälfte von Arbeitnehmer und Arbeitgeber getragen (Kinderlose zahlen in der PV einen Zuschlag allein).</li>
</ul>
<p>Der <b>Arbeitgeberanteil</b> wird nicht vom Lohn abgezogen, sondern zusätzlich vom Arbeitgeber gezahlt; die Unfallversicherung (Berufsgenossenschaft) trägt der Arbeitgeber allein.</p>
<div class="example"><b>Beispiel:</b> Brutto 3.000 €, Lohnsteuer 300 €, Kirchensteuer 9 % = 27 €, SV-AN-Anteil 20 % = 600 €. Netto = 3.000 − 300 − 27 − 600 = 2.073 €.</div>
<h3>Forderungen und Verbindlichkeiten</h3>
<table>
<tr><th>Begriff</th><th>Bedeutung</th><th>Bilanzseite</th></tr>
<tr><td>Forderungen aus Lieferungen und Leistungen</td><td>Kunde schuldet uns Geld (Rechnung gestellt, noch nicht bezahlt)</td><td>Aktiva</td></tr>
<tr><td>Verbindlichkeiten aus Lieferungen und Leistungen</td><td>Wir schulden einem Lieferer Geld</td><td>Passiva</td></tr>
</table>
<h3>Umsatzsteuer und Vorsteuer</h3>
<p>Unternehmen schlagen auf ihre Verkaufspreise <b>Umsatzsteuer</b> (Regelsatz 19 %, ermäßigt 7 %) auf. Die beim Einkauf gezahlte Umsatzsteuer heißt <b>Vorsteuer</b> und kann vom Finanzamt zurückgefordert werden. Abgeführt wird nur die <b>Zahllast</b> = Umsatzsteuer − Vorsteuer. Wirtschaftlich trägt der Endverbraucher die Steuer.</p>
<pre>Brutto = Netto × 1,19
Netto  = Brutto ÷ 1,19
USt    = Brutto − Netto = Brutto ÷ 1,19 × 0,19</pre>
<h3>Pflichtangaben einer Rechnung (§ 14 Abs. 4 UStG)</h3>
<ol>
<li>Vollständiger Name und Anschrift des leistenden Unternehmers und des Leistungsempfängers</li>
<li>Steuernummer oder Umsatzsteuer-Identifikationsnummer des Leistenden</li>
<li>Ausstellungsdatum</li>
<li>Fortlaufende, einmalig vergebene Rechnungsnummer</li>
<li>Menge und handelsübliche Bezeichnung der Lieferung bzw. Art und Umfang der Leistung</li>
<li>Zeitpunkt der Lieferung oder Leistung</li>
<li>Nach Steuersätzen aufgeschlüsseltes Entgelt sowie im Voraus vereinbarte Entgeltminderungen</li>
<li>Anzuwendender Steuersatz und Steuerbetrag bzw. Hinweis auf Steuerbefreiung</li>
</ol>
<div class="tip"><b>Prüfungstipp:</b> Bankverbindung und Unterschrift sind keine umsatzsteuerlichen Pflichtangaben. Kleinbetragsrechnungen bis 250 € brutto haben vereinfachte Anforderungen.</div>
`,
    terms: [
      ["Bruttoentgelt", "Vereinbartes Arbeitsentgelt vor Abzug von Steuern und Sozialversicherungsbeiträgen."],
      ["Nettoentgelt", "Auszahlungsbetrag nach Abzug von Lohnsteuer, Soli, Kirchensteuer und SV-Arbeitnehmeranteil."],
      ["Arbeitgeberanteil", "Teil der Sozialversicherungsbeiträge, den der Arbeitgeber zusätzlich zum Bruttoentgelt trägt."],
      ["Forderung", "Anspruch des Unternehmens gegenüber einem Kunden auf Zahlung; steht auf der Aktivseite."],
      ["Verbindlichkeit", "Zahlungsverpflichtung des Unternehmens gegenüber Dritten, z. B. Lieferern; steht auf der Passivseite."],
      ["Umsatzsteuer", "Steuer auf Lieferungen und Leistungen, Regelsatz 19 %, ermäßigt 7 %."],
      ["Vorsteuer", "Beim Einkauf an Lieferer gezahlte Umsatzsteuer, die vom Finanzamt erstattet bzw. verrechnet wird."],
      ["Zahllast", "An das Finanzamt abzuführender Betrag: Umsatzsteuer minus Vorsteuer."]
    ],
    cards: [
      ["Wie berechnet man aus einem Bruttobetrag mit 19 % USt den Nettobetrag?", "Netto = Brutto ÷ 1,19."],
      ["Ist die Bankverbindung eine Pflichtangabe nach § 14 UStG?", "Nein."],
      ["USt 5.000 €, Vorsteuer 3.000 € – Zahllast?", "2.000 €."],
      ["Wer trägt die gesetzliche Unfallversicherung?", "Allein der Arbeitgeber."]
    ]
  }
);

FABI_DATA.questions.push(
  // wiso-rechnen
  { id: "wiso-rechnen-1", topic: "wiso-rechnen", level: 3, type: "number",
    q: "Ein IT-Systemhaus kauft einen Server. Listeneinkaufspreis 2.400,00 €, Liefererrabatt 15 %, Liefererskonto 2 %, Bezugskosten (Fracht/Verpackung) 45,00 €. Berechnen Sie den Bezugspreis in € (auf zwei Nachkommastellen runden).",
    answer: 2044.20, tolerance: 0.01, unit: "€",
    explain: "Rabatt: 2.400 × 15 % = 360 € → Zieleinkaufspreis 2.040,00 €. Skonto: 2.040 × 2 % = 40,80 € → Bareinkaufspreis 1.999,20 €. + Bezugskosten 45,00 € = Bezugspreis 2.044,20 €." },
  { id: "wiso-rechnen-2", topic: "wiso-rechnen", level: 2, type: "number",
    q: "Ein Unternehmen verkauft Netzwerk-Switches für 120 € pro Stück. Die variablen Kosten betragen 75 € pro Stück, die Fixkosten 36.000 € pro Jahr. Wie viele Switches müssen jährlich verkauft werden, um die Gewinnschwelle (Break-even-Menge) zu erreichen? Geben Sie die Anzahl in Stück an.",
    answer: 800, tolerance: 0, unit: "Stück",
    explain: "Deckungsbeitrag je Stück = 120 − 75 = 45 €. Break-even-Menge = 36.000 ÷ 45 = 800 Stück." },
  { id: "wiso-rechnen-3", topic: "wiso-rechnen", level: 2, type: "number",
    q: "Eine neue Virtualisierungsumgebung kostet 18.000 €. Durch die Konsolidierung spart das Unternehmen jährlich 4.800 € an Strom- und Wartungskosten. Berechnen Sie die statische Amortisationsdauer in Jahren (auf zwei Nachkommastellen runden).",
    answer: 3.75, tolerance: 0.01, unit: "Jahre",
    explain: "Amortisationsdauer = Investition ÷ jährliche Einsparung = 18.000 ÷ 4.800 = 3,75 Jahre." },
  { id: "wiso-rechnen-4", topic: "wiso-rechnen", level: 2, type: "number",
    q: "Für ein IT-Projekt war ein Budget von 25.000 € geplant. Tatsächlich sind Kosten von 27.750 € angefallen. Berechnen Sie die prozentuale Budgetabweichung bezogen auf den Planwert in % (ganze Zahl).",
    answer: 11, tolerance: 0.01, unit: "%",
    explain: "Absolute Abweichung = 27.750 − 25.000 = 2.750 €. Prozentual: 2.750 ÷ 25.000 × 100 = 11 % (Budgetüberschreitung)." },
  { id: "wiso-rechnen-5", topic: "wiso-rechnen", level: 1, type: "number",
    q: "Drei Techniker benötigen für den Rollout von Arbeitsplatzrechnern 12 Arbeitstage. Wie viele Arbeitstage benötigen vier Techniker bei gleicher Arbeitsleistung? Geben Sie die Anzahl der Tage an.",
    answer: 9, tolerance: 0, unit: "Tage",
    explain: "Antiproportionaler Dreisatz: 3 × 12 = 36 Techniker-Tage; 36 ÷ 4 = 9 Tage." },

  // wiso-unternehmensformen
  { id: "wiso-unternehmensformen-1", topic: "wiso-unternehmensformen", level: 1, type: "single",
    q: "Wie hoch ist das gesetzliche Mindeststammkapital einer GmbH?",
    options: ["1 €", "12.500 €", "25.000 €", "50.000 €"], answer: 2,
    explain: "Das Mindeststammkapital der GmbH beträgt 25.000 € (§ 5 GmbHG). 12.500 € ist der Mindestbetrag, der bei Anmeldung eingezahlt sein muss; 50.000 € ist das Mindestgrundkapital der AG, 1 € das Minimum der UG." },
  { id: "wiso-unternehmensformen-2", topic: "wiso-unternehmensformen", level: 2, type: "match",
    q: "Ordnen Sie die Begriffe der passenden Beschreibung zu.",
    pairs: [
      ["Komplementär", "Haftet unbeschränkt mit dem Privatvermögen für die Schulden der KG"],
      ["Kommanditist", "Haftet nur bis zur Höhe seiner Einlage"],
      ["UG (haftungsbeschränkt)", "Gründung ab 1 € Stammkapital, Pflicht zur Rücklage von 25 % des Jahresüberschusses"],
      ["Hauptversammlung", "Versammlung der Aktionäre als Organ der AG"]
    ],
    explain: "Komplementär = Vollhafter der KG, Kommanditist = Teilhafter. Die UG ist eine GmbH-Variante mit geringem Mindestkapital und Rücklagenpflicht. Die Hauptversammlung ist neben Vorstand und Aufsichtsrat ein Organ der AG." },
  { id: "wiso-unternehmensformen-3", topic: "wiso-unternehmensformen", level: 3, type: "multi",
    q: "Welche der folgenden Unternehmen sind juristische Personen? (Mehrere Antworten sind richtig.)",
    options: ["Netzwerk-Service GmbH", "Müller & Schmidt OHG", "Cloud Solutions AG", "Einzelunternehmer Jan Weber e. K.", "IT-Start UG (haftungsbeschränkt)"],
    answer: [0, 2, 4],
    explain: "GmbH, AG und UG sind Kapitalgesellschaften und damit juristische Personen. Die OHG ist eine rechtsfähige Personenhandelsgesellschaft, aber keine juristische Person; der Einzelunternehmer ist eine natürliche Person." },
  { id: "wiso-unternehmensformen-4", topic: "wiso-unternehmensformen", level: 2, type: "single",
    q: "Ein Lieferer hat eine offene Forderung über 40.000 € gegen die Becker & Lang OHG. Wie haften die Gesellschafter Becker und Lang?",
    options: [
      "Nur mit ihren Einlagen in die OHG",
      "Jeder nur zur Hälfte, also mit je 20.000 €",
      "Unbeschränkt, unmittelbar und solidarisch – der Lieferer kann von jedem Gesellschafter die vollen 40.000 € verlangen",
      "Zuerst haftet ausschließlich das Gesellschaftsvermögen, die Gesellschafter haften gar nicht"
    ], answer: 2,
    explain: "OHG-Gesellschafter haften unbeschränkt (auch mit Privatvermögen), unmittelbar (direkt) und solidarisch (gesamtschuldnerisch). Der Gläubiger kann daher die gesamte Summe von jedem einzelnen Gesellschafter fordern." },

  // wiso-vwl
  { id: "wiso-vwl-1", topic: "wiso-vwl", level: 3, type: "number",
    q: "Ein Unternehmen hält 50.000 € als Rücklage auf einem unverzinsten Konto. Die Inflationsrate beträgt im folgenden Jahr 4 %. Welchen Realwert (Kaufkraft in heutigen Preisen) haben die 50.000 € nach einem Jahr? Geben Sie das Ergebnis in € an (auf zwei Nachkommastellen runden).",
    answer: 48076.92, tolerance: 0.01, unit: "€",
    explain: "Realwert = Nominalwert ÷ (1 + Inflationsrate) = 50.000 ÷ 1,04 = 48.076,92 €. Die Kaufkraft sinkt also um rund 1.923,08 €." },
  { id: "wiso-vwl-2", topic: "wiso-vwl", level: 2, type: "single",
    q: "Auf einem Markt für Grafikkarten wird zum aktuellen Preis deutlich mehr nachgefragt als angeboten. Welche Entwicklung ist bei freier Preisbildung zu erwarten?",
    options: [
      "Es besteht ein Angebotsüberhang, der Preis sinkt.",
      "Es besteht ein Nachfrageüberhang, der Preis steigt in Richtung Gleichgewichtspreis.",
      "Es besteht ein Nachfrageüberhang, der Preis sinkt.",
      "Der Markt ist im Gleichgewicht, der Preis bleibt konstant."
    ], answer: 1,
    explain: "Übersteigt die nachgefragte Menge die angebotene Menge, liegt ein Nachfrageüberhang vor. Der Preis steigt, bis Angebot und Nachfrage im Gleichgewichtspreis übereinstimmen." },
  { id: "wiso-vwl-3", topic: "wiso-vwl", level: 1, type: "match",
    q: "Ordnen Sie die Marktformen der passenden Beschreibung zu.",
    pairs: [
      ["Angebotsmonopol", "Ein Anbieter, viele Nachfrager"],
      ["Angebotsoligopol", "Wenige Anbieter, viele Nachfrager"],
      ["Polypol", "Viele Anbieter, viele Nachfrager"],
      ["Nachfragemonopol", "Viele Anbieter, ein Nachfrager"]
    ],
    explain: "Die Marktformen werden nach der Anzahl der Marktteilnehmer unterschieden: Monopol = einer, Oligopol = wenige, Polypol = viele. Beim Nachfragemonopol steht ein einziger Nachfrager vielen Anbietern gegenüber." },
  { id: "wiso-vwl-4", topic: "wiso-vwl", level: 2, type: "multi",
    q: "Welche Ziele gehören zum magischen Viereck nach dem Stabilitäts- und Wachstumsgesetz? (Vier Antworten sind richtig.)",
    options: ["Gerechte Einkommensverteilung", "Preisniveaustabilität", "Hoher Beschäftigungsstand", "Schutz der Umwelt", "Außenwirtschaftliches Gleichgewicht", "Stetiges und angemessenes Wirtschaftswachstum"],
    answer: [1, 2, 4, 5],
    explain: "Das magische Viereck umfasst Preisniveaustabilität, hohen Beschäftigungsstand, außenwirtschaftliches Gleichgewicht und stetiges, angemessenes Wachstum. Gerechte Einkommensverteilung und Umweltschutz erweitern es zum magischen Sechseck." },
  { id: "wiso-vwl-5", topic: "wiso-vwl", level: 3, type: "single",
    q: "Die Produktionskapazitäten der Unternehmen sind voll ausgelastet, Fachkräfte sind kaum zu finden, die Preise und Zinsen steigen deutlich. In welcher Konjunkturphase befindet sich die Volkswirtschaft?",
    options: ["Depression", "Abschwung (Rezession)", "Aufschwung (Expansion)", "Boom (Hochkonjunktur)"], answer: 3,
    explain: "Volle Kapazitätsauslastung, Arbeitskräftemangel sowie steigende Preise und Zinsen sind typische Merkmale des Booms. Im Aufschwung sind die Kapazitäten noch nicht voll ausgelastet und das Preisniveau ist noch relativ stabil." },

  // wiso-kostenrechnung
  { id: "wiso-kostenrechnung-1", topic: "wiso-kostenrechnung", level: 2, type: "number",
    q: "Ein Rechenzentrum hat monatliche Fixkosten von 12.000 € und variable Kosten von 8 € je betriebener virtueller Maschine. Im Monat werden 2.500 virtuelle Maschinen betrieben. Berechnen Sie die Stückkosten je VM in € (auf zwei Nachkommastellen runden).",
    answer: 12.80, tolerance: 0.01, unit: "€",
    explain: "Gesamtkosten = 12.000 + 8 × 2.500 = 12.000 + 20.000 = 32.000 €. Stückkosten = 32.000 ÷ 2.500 = 12,80 €." },
  { id: "wiso-kostenrechnung-2", topic: "wiso-kostenrechnung", level: 3, type: "number",
    q: "Zwei Drucksysteme stehen zur Auswahl. System A: Fixkosten 4.000 € pro Jahr, 0,05 € pro Seite. System B: Fixkosten 1.600 € pro Jahr, 0,08 € pro Seite. Berechnen Sie die kritische Menge (Seiten pro Jahr), bei der beide Systeme gleich teuer sind.",
    answer: 80000, tolerance: 0, unit: "Seiten",
    explain: "4.000 + 0,05x = 1.600 + 0,08x → 2.400 = 0,03x → x = 80.000 Seiten. Unterhalb ist B (geringere Fixkosten), oberhalb A (geringere variable Kosten) günstiger." },
  { id: "wiso-kostenrechnung-3", topic: "wiso-kostenrechnung", level: 3, type: "number",
    q: "Ein Notebook kann für 3.600 € gekauft oder für 36 Monate geleast werden. Beim Leasing fallen eine monatliche Rate von 115 € sowie eine einmalige Abschlussgebühr von 150 € an. Weitere Kosten und ein Restwert bleiben unberücksichtigt. Um wie viel € ist das Leasing über die Laufzeit teurer als der Kauf?",
    answer: 690, tolerance: 0.01, unit: "€",
    explain: "Leasingkosten = 36 × 115 + 150 = 4.140 + 150 = 4.290 €. Mehrkosten gegenüber Kauf = 4.290 − 3.600 = 690 €." },
  { id: "wiso-kostenrechnung-4", topic: "wiso-kostenrechnung", level: 1, type: "single",
    q: "Welche der folgenden Kosten ist eine typische Fixkostenart eines IT-Dienstleisters?",
    options: ["Tonerverbrauch je gedruckter Seite", "Monatliche Miete für die Büroräume", "Materialkosten je montiertem PC", "Versandkosten je ausgelieferter Bestellung"], answer: 1,
    explain: "Die Miete fällt unabhängig von der Leistungsmenge in gleicher Höhe an und ist damit fix. Toner, Material und Versand je Einheit steigen mit der Menge und sind variabel." },

  // wiso-beschaffung
  { id: "wiso-beschaffung-1", topic: "wiso-beschaffung", level: 3, type: "number",
    q: "Für neue Firewalls werden zwei Anbieter per Nutzwertanalyse verglichen (Punkte 1–10). Gewichtung: Preis 40 %, Service 35 %, Lieferzeit 25 %. Anbieter A: Preis 8, Service 6, Lieferzeit 7. Anbieter B: Preis 6, Service 9, Lieferzeit 8. Berechnen Sie den Nutzwert des Anbieters mit dem höheren Nutzwert (auf zwei Nachkommastellen runden).",
    answer: 7.55, tolerance: 0.01, unit: "Punkte",
    explain: "A: 0,4 × 8 + 0,35 × 6 + 0,25 × 7 = 3,2 + 2,1 + 1,75 = 7,05. B: 0,4 × 6 + 0,35 × 9 + 0,25 × 8 = 2,4 + 3,15 + 2,0 = 7,55. Anbieter B hat den höheren Nutzwert: 7,55." },
  { id: "wiso-beschaffung-2", topic: "wiso-beschaffung", level: 2, type: "number",
    q: "Ein Abteilungsdrucker kostet in der Anschaffung 1.200 €. Pro Jahr fallen 90 € Wartung und 160 € Tonerkosten an. Berechnen Sie die Gesamtkosten (TCO) für eine Nutzungsdauer von 4 Jahren in €.",
    answer: 2200, tolerance: 0.01, unit: "€",
    explain: "Jährliche Folgekosten = 90 + 160 = 250 €; für 4 Jahre 1.000 €. TCO = 1.200 + 1.000 = 2.200 €." },
  { id: "wiso-beschaffung-3", topic: "wiso-beschaffung", level: 3, type: "number",
    q: "Zwei Angebote für ein Storage-System: Angebot A: Listenpreis 950 €, 10 % Rabatt, 2 % Skonto, Versandkosten 30 €. Angebot B: Listenpreis 900 €, kein Rabatt, 3 % Skonto, versandkostenfrei. Berechnen Sie den Bezugspreis des günstigeren Angebots in € (auf zwei Nachkommastellen runden).",
    answer: 867.90, tolerance: 0.01, unit: "€",
    explain: "A: 950 − 95 = 855 € Zieleinkaufspreis; 855 − 17,10 = 837,90 € Bareinkaufspreis; + 30 = 867,90 €. B: 900 − 27 = 873,00 €. Angebot A ist mit 867,90 € günstiger." },
  { id: "wiso-beschaffung-4", topic: "wiso-beschaffung", level: 2, type: "multi",
    q: "Welche der folgenden Kriterien gehören zum qualitativen Angebotsvergleich? (Mehrere Antworten sind richtig.)",
    options: ["Qualität des Vor-Ort-Services", "Höhe des Listenpreises", "Termintreue und Zuverlässigkeit des Lieferers", "Rabattsatz in Prozent", "Umweltzertifizierung des Herstellers", "Skontosatz"],
    answer: [0, 2, 4],
    explain: "Service, Zuverlässigkeit und Umweltaspekte sind qualitative Kriterien. Listenpreis, Rabatt und Skonto gehen in den quantitativen (rechnerischen) Angebotsvergleich ein." },
  { id: "wiso-beschaffung-5", topic: "wiso-beschaffung", level: 2, type: "single",
    q: "Was kennzeichnet die optimale Bestellmenge?",
    options: [
      "Die Menge, bei der der Lieferer den höchsten Mengenrabatt gewährt",
      "Die Menge, bei der die Summe aus Bestellkosten und Lagerhaltungskosten minimal ist",
      "Die Menge, bei der die Lagerhaltungskosten null sind",
      "Die größte Menge, die in das Lager passt"
    ], answer: 1,
    explain: "Große Bestellmengen senken die Bestellkosten, erhöhen aber die Lagerhaltungskosten. Die optimale Bestellmenge liegt dort, wo die Summe beider Kostenarten am geringsten ist." },

  // wiso-datenschutz
  { id: "wiso-datenschutz-1", topic: "wiso-datenschutz", level: 1, type: "single",
    q: "Bei einem Hackerangriff wurden Kundendaten entwendet. Innerhalb welcher Frist muss der Verantwortliche die Datenschutzverletzung in der Regel der zuständigen Aufsichtsbehörde melden?",
    options: ["24 Stunden", "72 Stunden", "7 Tage", "1 Monat"], answer: 1,
    explain: "Nach Art. 33 DSGVO ist eine Verletzung des Schutzes personenbezogener Daten unverzüglich und möglichst binnen 72 Stunden nach Bekanntwerden der Aufsichtsbehörde zu melden." },
  { id: "wiso-datenschutz-2", topic: "wiso-datenschutz", level: 2, type: "match",
    q: "Ordnen Sie die Grundsätze aus Art. 5 DSGVO der passenden Beschreibung zu.",
    pairs: [
      ["Zweckbindung", "Daten dürfen nur für vorher festgelegte, eindeutige Zwecke verarbeitet werden."],
      ["Datenminimierung", "Es dürfen nur so viele Daten erhoben werden, wie für den Zweck erforderlich sind."],
      ["Speicherbegrenzung", "Daten sind zu löschen, sobald sie für den Zweck nicht mehr benötigt werden."],
      ["Richtigkeit", "Daten müssen sachlich korrekt und auf dem neuesten Stand sein."],
      ["Integrität und Vertraulichkeit", "Daten sind durch geeignete Maßnahmen vor unbefugtem Zugriff und Verlust zu schützen."]
    ],
    explain: "Die Grundsätze aus Art. 5 Abs. 1 DSGVO bilden das Fundament jeder Verarbeitung; ergänzend gilt die Rechenschaftspflicht nach Art. 5 Abs. 2." },
  { id: "wiso-datenschutz-3", topic: "wiso-datenschutz", level: 3, type: "single",
    q: "Die Personalabteilung übermittelt im Rahmen der monatlichen Lohnabrechnung die Lohnsteuerdaten der Beschäftigten an das Finanzamt. Auf welche Rechtsgrundlage nach Art. 6 Abs. 1 DSGVO stützt sich diese Verarbeitung?",
    options: ["lit. a – Einwilligung der Beschäftigten", "lit. f – berechtigtes Interesse des Arbeitgebers", "lit. c – Erfüllung einer rechtlichen Verpflichtung", "lit. d – Schutz lebenswichtiger Interessen"], answer: 2,
    explain: "Der Arbeitgeber ist gesetzlich (Einkommensteuergesetz) zur Übermittlung der Lohnsteuerdaten verpflichtet, daher greift Art. 6 Abs. 1 lit. c. Eine Einwilligung wäre ungeeignet, da sie freiwillig und widerrufbar sein muss." },
  { id: "wiso-datenschutz-4", topic: "wiso-datenschutz", level: 2, type: "multi",
    q: "Welche der folgenden Rechte stehen betroffenen Personen nach der DSGVO zu? (Mehrere Antworten sind richtig.)",
    options: ["Recht auf Auskunft über die gespeicherten Daten", "Recht auf Einsicht in die Daten anderer Kunden", "Recht auf Berichtigung unrichtiger Daten", "Recht auf Löschung", "Recht auf pauschale Entschädigung von 500 € je Speichervorgang", "Recht auf Datenübertragbarkeit"],
    answer: [0, 2, 3, 5],
    explain: "Die DSGVO gewährt u. a. Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17) und Datenübertragbarkeit (Art. 20). Einsicht in fremde Daten oder pauschale Entschädigungen je Speicherung sind nicht vorgesehen." },
  { id: "wiso-datenschutz-5", topic: "wiso-datenschutz", level: 3, type: "single",
    q: "Ein IT-Dienstleister hat 30 Beschäftigte, davon arbeiten 22 ständig mit der automatisierten Verarbeitung personenbezogener Kundendaten. Eine besonders risikoreiche Verarbeitung findet nicht statt. Was gilt für die Benennung eines Datenschutzbeauftragten?",
    options: [
      "Es besteht keine Pflicht, da erst ab 250 Beschäftigten ein Datenschutzbeauftragter nötig ist.",
      "Es besteht eine Pflicht, da in der Regel mindestens 20 Personen ständig mit der automatisierten Verarbeitung beschäftigt sind (§ 38 BDSG).",
      "Es besteht keine Pflicht, da nur Behörden einen Datenschutzbeauftragten benennen müssen.",
      "Es besteht eine Pflicht erst ab 50 Personen, die mit der Verarbeitung beschäftigt sind."
    ], answer: 1,
    explain: "Nach § 38 Abs. 1 BDSG müssen nichtöffentliche Stellen einen Datenschutzbeauftragten benennen, wenn in der Regel mindestens 20 Personen ständig mit der automatisierten Verarbeitung personenbezogener Daten beschäftigt sind. 22 ≥ 20, also besteht die Pflicht." },
  { id: "wiso-datenschutz-6", topic: "wiso-datenschutz", level: 2, type: "single",
    q: "Eine Mitarbeiterin erhält eine E-Mail, angeblich von der IT-Abteilung, mit der Aufforderung, über einen Link „dringend innerhalb einer Stunde“ ihr Passwort zu bestätigen. Wie sollte sie reagieren?",
    options: [
      "Den Link öffnen und das Passwort eingeben, damit das Konto nicht gesperrt wird",
      "Die E-Mail an alle Kollegen weiterleiten, damit diese ebenfalls ihr Passwort bestätigen",
      "Nicht auf den Link klicken, die E-Mail über den vorgesehenen Meldeweg an die IT-Sicherheit melden und ggf. telefonisch über eine bekannte Nummer rückfragen",
      "Auf die E-Mail antworten und nach dem Grund fragen"
    ], answer: 2,
    explain: "Zeitdruck und angebliche Autorität sind typische Merkmale von Phishing/Social Engineering. Richtig ist, nicht zu klicken, den Vorfall zu melden und über einen unabhängigen, bekannten Kanal zu verifizieren." },

  // wiso-rechnungswesen
  { id: "wiso-rechnungswesen-1", topic: "wiso-rechnungswesen", level: 3, type: "number",
    q: "Eine Fachinformatikerin erhält ein Bruttogehalt von 3.200,00 €. Lohnsteuer laut Tabelle: 380,00 €, Solidaritätszuschlag: 0,00 €, Kirchensteuer: 9 % der Lohnsteuer. Arbeitnehmeranteile zur Sozialversicherung (vom Brutto): Krankenversicherung 8,55 %, Rentenversicherung 9,3 %, Arbeitslosenversicherung 1,3 %, Pflegeversicherung 1,7 %. Berechnen Sie das Nettoentgelt in € (auf zwei Nachkommastellen runden).",
    answer: 2118.60, tolerance: 0.01, unit: "€",
    explain: "Kirchensteuer = 380 × 9 % = 34,20 €. SV-Satz AN = 8,55 + 9,3 + 1,3 + 1,7 = 20,85 % → 3.200 × 20,85 % = 667,20 €. Netto = 3.200 − 380 − 0 − 34,20 − 667,20 = 2.118,60 €." },
  { id: "wiso-rechnungswesen-2", topic: "wiso-rechnungswesen", level: 2, type: "number",
    q: "Ein Kunde bestellt eine Softwareschulung zum Nettopreis von 1.450,00 €. Berechnen Sie den Bruttorechnungsbetrag inklusive 19 % Umsatzsteuer in € (auf zwei Nachkommastellen runden).",
    answer: 1725.50, tolerance: 0.01, unit: "€",
    explain: "Umsatzsteuer = 1.450 × 19 % = 275,50 €. Brutto = 1.450 + 275,50 = 1.725,50 € (bzw. 1.450 × 1,19)." },
  { id: "wiso-rechnungswesen-3", topic: "wiso-rechnungswesen", level: 2, type: "number",
    q: "Eine Eingangsrechnung über Netzwerkkomponenten lautet auf 2.380,00 € brutto inklusive 19 % Umsatzsteuer. Wie hoch ist die enthaltene Vorsteuer in € (auf zwei Nachkommastellen runden)?",
    answer: 380.00, tolerance: 0.01, unit: "€",
    explain: "Netto = 2.380 ÷ 1,19 = 2.000,00 €. Vorsteuer = 2.380 − 2.000 = 380,00 € (bzw. 2.000 × 19 %)." },
  { id: "wiso-rechnungswesen-4", topic: "wiso-rechnungswesen", level: 2, type: "multi",
    q: "Welche Angaben sind nach § 14 Abs. 4 UStG Pflichtangaben einer Rechnung (keine Kleinbetragsrechnung)? (Mehrere Antworten sind richtig.)",
    options: ["Fortlaufende Rechnungsnummer", "Unterschrift des Ausstellers", "Steuernummer oder USt-Identifikationsnummer des leistenden Unternehmers", "Bankverbindung des Ausstellers", "Zeitpunkt der Lieferung oder Leistung", "Anzuwendender Steuersatz und Steuerbetrag"],
    answer: [0, 2, 4, 5],
    explain: "Rechnungsnummer, Steuernummer/USt-IdNr., Leistungszeitpunkt sowie Steuersatz und -betrag sind Pflichtangaben nach § 14 Abs. 4 UStG. Unterschrift und Bankverbindung sind umsatzsteuerlich nicht vorgeschrieben." },
  { id: "wiso-rechnungswesen-5", topic: "wiso-rechnungswesen", level: 2, type: "number",
    q: "Ein IT-Systemhaus hat im Voranmeldungszeitraum Umsatzsteuer in Höhe von 8.500,00 € in Rechnung gestellt und Vorsteuer in Höhe von 5.200,00 € gezahlt. Berechnen Sie die Zahllast an das Finanzamt in €.",
    answer: 3300, tolerance: 0.01, unit: "€",
    explain: "Zahllast = Umsatzsteuer − Vorsteuer = 8.500 − 5.200 = 3.300 €." },
  { id: "wiso-rechnungswesen-6", topic: "wiso-rechnungswesen", level: 1, type: "single",
    q: "Ihr Unternehmen hat einem Kunden eine Rechnung über eine Netzwerkinstallation gestellt, die noch nicht bezahlt wurde. Wie wird dieser offene Betrag aus Sicht Ihres Unternehmens bezeichnet?",
    options: ["Verbindlichkeit aus Lieferungen und Leistungen", "Forderung aus Lieferungen und Leistungen", "Vorsteuer", "Rückstellung"], answer: 1,
    explain: "Ein Anspruch auf Zahlung gegenüber einem Kunden ist eine Forderung (Aktivseite). Eine Verbindlichkeit wäre eine eigene Schuld gegenüber einem Lieferer." }
);
