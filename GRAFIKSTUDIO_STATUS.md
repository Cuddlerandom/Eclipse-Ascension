# ECLIPSE: ASCENSION – Übergabe an das Grafikstudio 🎨

**Stand:** 18. Oktober 2026  
**Verantwortung:** Hauptzentrale 🛠️ pflegt diesen Status bei relevanten Gameplay-/Designänderungen.  
**Wichtig:** Vor neuen Entwürfen diese Datei und die freigegebenen Designvorgaben prüfen. Bei Widersprüchen Rückfrage an die Hauptzentrale/Projektleitung.


### Phaser-Engine-Vergleich V0.1 – 18.10.2026
**Neu auf `main`, Commit `b55eb83`:** Isolierter Phaser-3-Prototyp unter https://cuddlerandom.github.io/Eclipse-Ascension/play/phaser-warrior-test.html (Datei `play/phaser-warrior-test.html`). Phaser 3.90.0 via jsDelivr; lädt **dieselben 16 Original-Krieger-Sheets** mit 160×160-Frames; separate Testszene mit vereinfachtem bisherigen Weg, automatisch laufendem Krieger, Steuerung für Idle/Run/Attack und vier Richtungen. **Zweck:** Vergleich der Sprite-Darstellung/Animation im Phaser-Renderer gegen unseren bisherigen Canvas-Renderer. **Kein Engine-Wechsel beschlossen; kein Ersatz der Arena; keine Sprite-Reparatur.** Live-Browser-/iPhone-Test und Leistungsbewertung stehen noch aus. Werkstatt soll die Grafiken weiterhin mit dem Sprite Inspector frameweise prüfen; falls derselbe Bilddefekt in Phaser auftritt, ist das ein starkes Indiz für den Asset-Inhalt (nicht endgültiger Beweis). Kein neues Design ohne Freigabe.

### NEUER BEFUND – Phaser-Vergleich auf iPhone (18.10.2026)
**Direkte Rückmeldung der Projektleitung nach Test:** „Immernoch gleich“ – der sichtbare Krieger-Fehler (unvollständige/versetzte Körper- bzw. Schildteile) tritt auch in der separaten Phaser-Testszene auf. Damit ist **ein alleiniger Fehler des bisherigen Canvas-Renderers unwahrscheinlicher**. Beide Implementierungen verwenden dieselben 16 V1.0-Original-Sprite-Sheets und 160×160-Kacheln; ein gemeinsames Asset-/Frame-Inhaltsproblem ist jetzt die **führende Arbeitshypothese**, aber noch kein abschliessender Nachweis. **Priorität für Werkstatt:** keine weitere Engine-Migration und vorerst keine Zwischenbilder; zuerst die Original-Frames, insbesondere Idle/Attack, mit Sprite Inspector einzeln auf über die Kachelgrenze wandernde Schild-/Schwert-/Körperteile, falsche Anker und Transparenzfehler prüfen und fehlerhafte Frame-IDs exakt melden. V1.0 nicht überschreiben. Danach gezielte korrigierte V1.1 exportieren und mit beiden Renderern vergleichen. **Wichtig:** Projektleitung bestätigte Gleichheit des sichtbaren Fehlers, nicht eine technische Ursachenanalyse oder vollständige FPS-/Performancebewertung.

## AKTUELLER ARBEITSSTAND & NÄCHSTE SCHRITTE – 18.10.2026 (verbindliche Kurzfassung)

**Priorität P0: Krieger Level 1 V1.0 – fehlende/versetzte Teile in Idle und Attack.** Die Projektleitung beobachtet im stark gezoomten iPhone-Spielbild, dass im Idle Teile der Figur unvollständig wirken und während des Angriffs Körper-/Schildteile scheinbar verschwinden bzw. jenseits einer unsichtbaren rechteckigen Grenze wieder erscheinen. Eine zusätzliche Zoomaufnahme wurde besprochen. **Der Effekt ist ernst zu nehmen; die genaue Ursache ist noch nicht bewiesen.** Das ist nicht automatisch ein FPS-Problem, und zusätzliche Zwischenbilder allein beheben ihn nicht.

**Bereits technisch erledigt und nachgewiesen:**
- Alle **16 Original-PNGs** liegen in `assets/heroes/krieger/level1-v1/`; Originale bislang **nicht verändert**.
- **Alle 16 PNG-IHDR-Abmessungen aus GitHub geprüft:** pro Richtung `idle` = **960×160** (6 Frames), `run` = **1280×160** (8), `attack` = **1280×160** (8), `hit` = **640×160** (4). Die Sheets haben somit die vom Renderer erwartete Gesamtgeometrie. **Nicht geprüft/bewiesen:** ob die *Pixel innerhalb* der 160×160-Kacheln vollständig, korrekt ausgerichtet und frei von überlaufenden Körperteilen sind.
- Animationssteuerung im Spiel auf `main` verbessert: Run/Idle aus Bewegungsdaten statt Zeichenframe-Differenzen, kurze Bewegungs-Toleranz, Attack-Start und Zielausrichtung (Commit `18fdd0b`). **Noch kein bestätigter iPhone-Browser-Abnahmetest.**
- **NEU: Sprite Inspector V1.0**, `play/sprite-inspector.html`, Commit `f0aa2f2`. Öffentlicher Link: **https://cuddlerandom.github.io/Eclipse-Ascension/play/sprite-inspector.html**. Vier Richtungen, vier Animationen, Frame-Slider, Einzelschritt, 25/50/100/200%-Playback, 160×160-Kachelgrenzen, Fussanker-Hilfslinie und automatische Alpha-/Randkontaktberichte. Tool auf `main` committed; **Browser-/iPhone-Funktionstest steht aus**. Randkontakt ist ein **Hinweis**, kein automatischer Beweis für einen Defekt.

**Arbeitsauftrag Grafikwerkstatt – JETZT:**
1. Inspector öffnen und **zuerst Idle + Attack in allen vier Richtungen**, danach Run + Hit, **jeden Frame einzeln** kontrollieren. Die von der Projektleitung beschriebenen Schild-/Körperteile ausserhalb der Kachelgrenze gezielt suchen. Nicht aus PNG-Gesamtbreite auf korrekte Einzelbilder schliessen.
2. Für jeden auffälligen Frame **exakten Dateinamen, Richtung, Animation, 0-basierten Frame-Index, sichtbaren Fehler und mögliche Korrektur** dokumentieren; möglichst Screenshot mit Kachelrahmen beilegen. Transparente Löcher, abgeschnittene Gliedmassen, Teile am gegenüberliegenden Rand, lose Pixelinseln und wechselnde Fussanker (Soll **80,144**) prüfen.
3. **Erst nach Ursachenklärung** defekte Original-Frames in einer **neuen, sauber versionierten V1.1** korrigieren; V1.0 unangetastet lassen. Bei Platzmangel innerhalb 160×160 **nicht blind skalieren**: mit Hauptzentrale einheitlich grössere Frame-Kacheln/Anker/Renderer-Parameter abstimmen. Neue Frames dürfen nicht in Nachbarkacheln überlaufen.
4. **Danach**, nicht davor, flüssigere Animationen durch echte Zwischenbilder prüfen: Run etwa 12–16, Attack etwa 12, Idle optional 8, Hit optional 6–8 Frames je Richtung. Das sind **Zielvorschläge, keine Designfreigabe**. Kein blosses Duplizieren. Übergabe mit Manifest: Abmessungen, Anzahl, FPS, Fussanker, Richtung, Version.
5. Ergebnisse in GitHub dokumentieren und Hauptzentrale zur **Integration und iPhone-Abnahme** übergeben. Bestehendes Gameplay und freigegebenes Charakterdesign beibehalten.

**Zuständigkeiten:** Hauptzentrale 🛠️ verantwortet Inspector, Renderer, Integration, technische Prüfung und Commits; Grafikwerkstatt 🎨 verantwortet Sprite-Inhaltsprüfung, Reparatur und neue Zwischenbilder; Projektleitung 👑 nimmt die Darstellung auf dem iPhone ab. **Keine Behauptung einer bereits erfolgten visuellen Abnahme.** Arbeiten ausschliesslich in **`Cuddlerandom/Eclipse-Ascension`**; nach Projektleitungsfreigabe direkt auf `main`, nachvollziehbar und reversibel.

---

## AKTUELLE ÜBERGABE AN DIE GRAFIKWERKSTATT – 18.10.2026

**Verbindlich ab jetzt:** Die Projektleitung hat die Arbeit direkt auf `main` freigegeben. Separater Testbranch ist für normale Iterationen nicht mehr erforderlich. Jede Änderung in einem nachvollziehbaren Commit; bei Problemen per Revert zurück. Testspielstände müssen derzeit nicht erhalten bleiben. **Nur Repository `Cuddlerandom/Eclipse-Ascension` bearbeiten, nicht `Cuddlerandom/eclipse`.**

**Krieger Level 1 V1.0 – technischer Stand:** Alle 16 originalen Sprite-Sheets (vier Blickrichtungen × Idle/Run/Attack/Hit) sind in `assets/heroes/krieger/level1-v1/` einsortiert. Dateimuster: `sheet_<richtung>_<animation>.png`, Richtungen `vorne`, `hinten`, `links`, `rechts`; Animationen `idle`, `run`, `attack`, `hit`. Der Arena-Renderer referenziert diesen Ordner; erwartete Frames 160×160, Fussanker (80,144). Das bisher zusätzlich im `assets/`-Root liegende ZIP wurde als redundante Kopie aus dem aktuellen Stand entfernt (Git-Historie bleibt erhalten). **Die tatsächliche Darstellung, Sheet-Ausrichtung, Alpha-Kanten, Animationsübergänge und der iPhone-Browsertest sind noch nicht abschliessend geprüft; daher keine endgültige grafische Abnahme behaupten.** Die Hit-Animation ist als Asset vorhanden, wird ohne Heldenschadensmechanik derzeit nicht regulär ausgelöst. Bestehendes Gameplay nicht ohne separate Absprache ändern.

**Dateiordnung für neue Grafiken:** `assets/heroes/<klasse>/<stufe-version>/` für Helden; `assets/environments/<gebiet>/<set-version>/` für Umgebungen. Keine neuen Sprite-Sheets lose in `assets/` hochladen. Übergaben mit eindeutigem Versionsnamen und ggf. Manifest; nur Originalgrafiken, keine vereinfachten Ersatzbilder. Änderungen an Renderer und Dateipfaden gemeinsam committen.

**Aktuelle Gameplay-Basis:** V0.17 (100 Wellen, 150 Startgold, 20 Leben, freie Heldenplatzierung, Krieger 100 / Bogenschütze 90 / Magier 130 Grundkosten; Goblin-Killgold 1/2/5/6/8/10 nach Typ). Frühere Abschnitte dieses Dokuments sind chronologische Historie und enthalten teils überholte Werte. Dieser aktuelle Abschnitt und die tatsächlichen Spieldateien haben für den heutigen Stand Vorrang.

**An Grafikwerkstatt:** Bitte diese Übergabe als aktuelle technische Rückmeldung lesen. Für Krieger Level 1 zunächst vier Richtungen, Attack-Silhouette und saubere Animationen prüfen. Eventuelle konkrete Grafikfehler mit Dateiname, Richtung, Animation und Frame melden; keine Designfreigaben eigenmächtig ändern.


### Videorückmeldung Krieger – 18.10.2026
Die Projektleitung hat eine 22,7 Sekunden lange iPhone-Bildschirmaufnahme der Arena bereitgestellt. Krieger Level 1 ist sichtbar, bewegt sich zwischen Patrouillenposition und Goblins und kämpft; die Animation wirkt laut Projektleitung nicht flüssig. **Technischer Verdacht im Renderer:** Bewegungsrichtung und Run/Idle-Zustand werden aus der Differenz zwischen zwei Zeichenaufrufen abgeleitet (`spriteLastX/Y` in `warriorPose`). Bei ungleichmässiger Bildrate oder kleinen Bewegungsschritten kann dies unruhige Wechsel erzeugen. Attack wird zeitlich begrenzt ausgelöst, während der Run-Zustand unmittelbar aus Positionsdifferenzen folgt. Dies ist noch keine bestätigte Ursache. **Bitte vor einer Neuzeichnung keine Sprites ersetzen**; die Hauptzentrale prüft die technische Animationssteuerung. Werkstatt soll separat Doppelbilder, Bewegungszyklen, Fussanker und Richtungsübergänge der Original-Sheets prüfen und konkrete Dateinamen/Frames melden. Ein vollständiger Frame-für-Frame-Browsertest liegt noch nicht vor.


### Technische Freigabe zur weiteren Sprite-Prüfung – 18.10.2026
**Hauptzentrale hat die Animationssteuerung auf `main` korrigiert (Commit `18fdd0b`).** Run/Idle-Zustand wird jetzt in der Spiel-Update-Schleife aus der tatsächlichen Bewegung mit kurzer Toleranz berechnet; Angriff startet zeitlich neu, blickt zum Ziel und wiederholt die letzten Angriffsframes nicht zyklisch. Gameplay und alle 16 Original-Sheets unverändert. **Werkstatt kann nun die grafische Überarbeitung V1.1 angehen:** echte zusätzliche Zwischenbilder insbesondere Run (Ziel 12–16 statt 8 Frames je Richtung), Attack (Ziel 12 statt 8), Idle (optional 8 statt 6), Hit (optional 6–8 statt 4), konsistente Fussanker (80,144), vier Richtungen, kein blosses Duplizieren. Die Framezahlen sind Vorschläge, keine neue Freigabe. **Wichtig:** Bei neuem Export Manifest und Sheet-Framezahl/FPS angeben, damit die Hauptzentrale den Renderer anpassen kann. iPhone-Browser-Abnahme des Fixes steht noch aus; technische Änderung ist implementiert, aber visuelle Glätte nicht bestätigt.


### DRINGEND – Zoom-Video Krieger: sichtbare Bildfragmentierung (18.10.2026)
Projektleitung lieferte zusätzliche 11,53-s-iPhone-Zoomaufnahme (30 FPS). Bei Einzelbildprüfung sichtbar: In Laufpose lösen sich kleine dunkle/braune Pixelgruppen optisch vom Bein-/Rumpfbereich (etwa Videosekunde 4,5); bei Angriffs-/Bewegungsphasen um ca. 10,5 s wirken Teile unterhalb des Kriegers isoliert; bei anderen Frames um 8,5 s ist die Figur weitgehend vollständig. **Befund:** zeitweise unvollständige/fragmentierte Silhouette; nicht bloss geringe Animations-FPS. Noch offen, ob die Original-Frames fehlerhaft sind oder der Renderer die Sheets falsch zuschneidet. Renderer schneidet jede Zeile mit `drawImage(sheet, frame*160,0,160,160,...)` aus und setzt horizontale 160×160-Frames voraus. **Grafikwerkstatt:** Originaldateien `sheet_{vorne,hinten,links,rechts}_{idle,run,attack,hit}.png` vollständig auf echte Bildabmessungen, gleichmässige Frame-Kachelung, Transparenz, isolierte Pixelgruppen und vollständige Gliedmassen prüfen; betroffene Richtung/Animation/Frame-ID dokumentieren. **Hauptzentrale:** Sprite-Sheet-Geometrie und Frame-Cropping technisch validieren; bis dahin keine endgültige Schuldzuweisung oder Freigabe. Bitte nicht nur zusätzliche Frames produzieren, bevor die Fragmentierung geklärt ist.


### VERIFIZIERT – Original-PNG-Sheet-Abmessungen (18.10.2026)
Die Hauptzentrale hat **alle 16 Original-PNGs direkt aus GitHub mit `encoding=base64` ausgelesen und die PNG-IHDR-Breite/Höhe geprüft**. Ergebnis in **allen vier Richtungen (vorne/hinten/links/rechts)**: Idle **960×160 = 6 Frames à 160×160**, Run **1280×160 = 8 Frames**, Attack **1280×160 = 8 Frames**, Hit **640×160 = 4 Frames**. **Damit ist die Annahme falscher Sheet-Gesamtabmessungen oder falscher Frame-Breite im bestehenden Renderer widerlegt.** Der Renderer liest exakt diese horizontalen 160×160-Kacheln. Noch nicht überprüft: Pixelinhalt/Transparenz/überstehende oder innerhalb des Frames abgeschnittene Gliedmassen und Schilde; aus IHDR allein folgt keine Bildvollständigkeit. **Konkreter Auftrag Werkstatt:** Bitte insbesondere Attack und Idle für jede Richtung FRAMEWEISE mit sichtbarer 160×160-Rahmenmarkierung prüfen; auf Teile am gegenüberliegenden Kachelrand, fehlende Schild-/Schwert-/Körperpixel, getrennte Pixelinseln, wechselnde Ankerpunkte und transparente Lücken achten. Ergebnisse mit Richtung+Animation+Frame-Index (0-basiert) melden und defekte Frames korrigieren, bevor zusätzliche V1.1-Zwischenbilder entstehen. Für neue Sheets dürfen überstehende Ausrüstungsteile nicht in die Nachbarkachel hineinragen; gegebenenfalls einheitlich grössere Kacheln samt Renderer-Metadaten vereinbaren. **Status: Frame-Geometrie bestätigt; tatsächliche Pixeldefekte noch nicht abschliessend bewiesen.**


### NEUES WERKZEUG – Sprite Inspector V1.0 (18.10.2026)
**Fertig auf `main`, Commit `f0aa2f2`:** `play/sprite-inspector.html`, öffentlicher Testlink: https://cuddlerandom.github.io/Eclipse-Ascension/play/sprite-inspector.html . Zeigt die originalen 16 Krieger-Sheets (4 Richtungen × Idle/Run/Attack/Hit), einzeln gerahmte 160×160-Frames, einstellbare Abspielgeschwindigkeit (25/50/100/200 %), Frame-Step, Hilfslinien und pro Frame automatisch berechnete sichtbare Pixelzahl, Bounding Box und Randkontakte. **Werkstatt:** bitte Attack und Idle in allen Richtungen durchgehen, problematische Frame-Nummern melden; markierte Randkontakte sind Verdachtsmomente, nicht automatisch Fehler. Das Tool verändert keine Originalgrafiken. Browser-/iPhone-Test des neuen Inspectors noch nicht bestätigt.

## Zweck und Zusammenarbeit
Diese Datei verbindet die technische Entwicklung der spielbaren Arena mit der Grafikwerkstatt. Sie ist **kein automatischer Nachrichtendienst**. Das Grafikstudio soll sie vor neuen Arbeiten aktiv lesen. Die Hauptzentrale aktualisiert sie bei Änderungen, die Grafiken oder Animationen beeinflussen. **Keine bestehende Designfreigabe wird dadurch ersetzt.**

## Aktueller Spielstand
- Repository: `Cuddlerandom/Eclipse-Ascension` (**nicht** `Cuddlerandom/eclipse`).
- Spielbare Arena: [Arena auf GitHub Pages](https://cuddlerandom.github.io/Eclipse-Ascension/play/arena-sandbox-user-layout.html).
- Technischer Prototyp: **Gameplay V0.13**. Grafikplatzhalter sind vorübergehend; fertige freigegebene Originalgrafiken sollen nicht durch vereinfachte Neuentwürfe ersetzt werden.
- Welt: 2400 × 1600 Welteinheiten, verschiebbare Kamera und Zoom auf Mobilgeräten, gewundener Gegnerweg, **freie Heldenplatzierung ohne feste Obergrenze**.
- Verteidigung: 20 Startleben, 180 Startgold; 5 Wellen im derzeitigen Prototyp.
- Prototyp V0.4: Krieger-Bewegung und Zielpriorisierung wurden vom Projektleiter auf dem iPhone als funktionierend bestätigt.
- Prototyp V0.5: Goblin-Plünderer als Basistyp implementiert. **Gameplay V0.10:** Goblin-Späher und Schildträger integriert; Browser-Endtest V0.7 noch ausstehend.

## Unsere drei spielbaren Helden
| Held | Aufgabe / Verhalten | Basiswerte im aktuellen Prototyp |
|---|---|---|
| **Krieger** ⚔️ | Nahkampf; verlässt seinen Einsatzpunkt, verfolgt Gegner nur innerhalb seiner Einsatzreichweite und kehrt zurück | 65 Gold; Reichweite 270; Schaden 48; Angriff alle 0,70 s |
| **Bogenschütze** 🏹 | Fernkampf; bleibt am Einsatzpunkt | 60 Gold; Reichweite 300; Schaden 27; Angriff alle 0,42 s |
| **Magier** ✨ | Fernkampf; bleibt am Einsatzpunkt; Flächenschaden | 85 Gold; Reichweite 245; Schaden 34; Angriff alle 1,05 s; Splashradius 90 |

- Jeder Held kann im **laufenden Durchgang bis Level 5** verbessert werden. Upgrade-Kosten: 50 / 90 / 150 / 250 Gold.
- Jeder Held hat **zwei Zielprioritäten** (primär und Ersatz): **Erster, Letzter, Stärkster, Schwächster, Unterstützer**. Unterstützer zielt auf Bannerträger und später Schamanen; ohne solchen Gegner in Reichweite greift die Ersatzpriorität. Beide gelten nur innerhalb der Heldenreichweite.
- Eine dauerhafte Skilltree-Währung ist als spätere Funktion geplant, **noch nicht implementiert**.
- **Grafikbedarf:** konsistente Fantasy-Pixel-Art-Designs, transparente Originalsprites; Krieger braucht mindestens Idle, Laufen, Angriff, Treffer, Tod; Fernkämpfer mindestens Idle, Angriff, Treffer, Tod. Exakte Framezahlen/Ankerpunkte erst nach technischer Abstimmung festlegen.

## Goblin-Armee – Schritt für Schritt
Es sind **sechs Goblinrollen** geplant. Nicht alle gleichzeitig zeichnen oder technisch integrieren; Freigaben einzeln abstimmen.

### 1. Goblin-Plünderer – als erster Basistyp
- **Gameplay V0.5 freigegeben:** einfacher Standardgegner **ohne Spezialfähigkeit**, **elementar neutral**.
- Startwerte für Gameplay: **100 HP**, **85 Welteinheiten/s**, **15 Gold Belohnung**, **1 verlorenes Basisleben** bei Durchbruch, **0 Rüstung**.
- Läuft den vorgegebenen Weg entlang; kein eigener Heldenangriff im aktuellen Prototyp.
- Die Arena verwendet zunächst einen simplen grünen Platzhalter. Das ist **keine Designvorlage** für die finale Figur.
- Künstlerische Ausarbeitung nur nach bereits freigegebenem Plünderer-Design aus der Gegnerwerkstatt.

### 2. Goblin-Späher – nächster Gameplay-Schritt
- **Design V1.0 freigegeben** laut Abstimmung mit der Gegnerwerkstatt.
- Rolle: **flinker Läufer / reiner Sprinter**, klein und kompakt; wilder Stammesläufer; überdrehtes, wildes Gesicht; helles Limettengrün.
- Sprintanimation: **grosse Sprungschritte**, zusätzliche Animation mit zufälliger Kombination.
- **Elementar neutral**.
- **Gameplaywerte V0.6 vom Projektleiter bestätigt:** 55 HP, Tempo 155 Welteinheiten/s, 18 Gold Belohnung, 0 Rüstung, 1 Basisleben bei Durchbruch. Keine Spezialfähigkeit, keine Ausweichchance, elementar neutral. Im Prototyp bereits ab Welle 1 jeder dritte Spawn ein Späher; grüner Platzhalter ist kein finales Design.

### 3–6. Weitere geplante Rollen
- **Schildträger:** robuster Tank. **Gameplay V0.10 vorläufig freigegeben:** 220 HP, Tempo 55, 25 % Reduktion physischer Treffer von Krieger/Bogenschütze, Magier ignoriert Rüstung, 25 Gold, 1 Basisleben bei Durchbruch. Keine weitere Spezialfähigkeit. In Welle 1 testbar. Die Werte sind bis zum Spieltest vorläufig.
- **Bannerträger:** Unterstützer. **Gameplay V0.10 vorläufig:** 90 HP, Tempo 75, 22 Gold, 1 Basisleben bei Durchbruch; gewährt anderen Goblins im Umkreis 180 einen nicht stapelbaren +20-%-Geschwindigkeitsbonus, solange er lebt. Er selbst profitiert nicht. Der Bannerträger ist ab Welle 1 testbar. Werte sind vorläufige Testwerte, nicht separat als final freigegeben. Platzhalterflagge ist kein freigegebenes Grafikdesign.
- **Sprengmeister:** Spezialist.
- **Schamane:** magischer Unterstützer.

**Achtung:** Für die übrigen drei Rollen enthält diese Statusdatei keine detaillierte Designfreigabe oder endgültige Mechanik. Bestehende Originalkonzepte der Gegnerwerkstatt haben Vorrang; nichts aus der Kurzbeschreibung als final interpretieren.


## Technischer Sprite-Exportstandard V1.0 (18.10.2026)
Dieser Standard gilt für die Vorbereitung neuer Exporte. Bestehende freigegebene Originalgrafiken bleiben unverändert; Altbestände nicht ohne Freigabe überschreiben. Der aktuelle Arena-Renderer nutzt noch Kreisplatzhalter und muss für PNGs angepasst werden.

- Massstab: 1 Asset-Pixel = 1 Welteinheit bei Zoom 1.0; Kamera-Zoom im Renderer. Transparente RGBA-PNGs mit echtem Alphakanal, keine Schachbrett-Hintergründe, keine integrierten HP-Balken.
- Alle Goblins: einheitliche Frame-Canvas **128 × 160 px**, Bodenanker **(64,144)** ab linker oberer Ecke. Sichtbare Zielgrössen inkl. Ausrüstung ungefähr: Plünderer 55×70, Späher 45×55, Schildträger 75×85, Bannerträger 60×105 (mit Fahne), Sprengmeister 60×75, Schamane 60×85 px.
- Alle Helden: einheitliche Frame-Canvas **160 × 160 px**, Bodenanker **(80,144)**. Sichtbare Zielgrössen inkl. Ausrüstung ungefähr: Krieger 75×100, Bogenschütze 70×95, Magier 75×105 px.
- Alle Frames einer Figur: gleiche Canvasgrösse, gleicher Bodenanker und identische Ausrichtung; keine automatischen Zuschnitte. Ausrüstung und Bewegungen müssen im Frame bleiben, sonst vorab technische Abstimmung.
- Pro Animation Einzel-PNGs mit laufender Framezahl (z. B. idle_000.png, run_000.png, attack_000.png); optionale Sprite-Sheets. Framezahl und FPS im Manifest dokumentieren, noch nicht pauschal vorgegeben.
- Manifest pro Figur mit Version, Abmessungen, Anker, sichtbarer Zielgrösse, Animationen, FPS und Transparenzstatus. Rendern über Fussanker, nicht Canvasmitte. Pixel-Art ohne Glättung (imageSmoothingEnabled=false), Kollisions-/Trefferzone unabhängig vom transparenten Canvas.
- **Altbestand beachten:** Goblin V0.7 mit bereits vereinbartem Anker **(32,60)** bleibt als Original bestehen und darf nicht stillschweigend als V1.0 exportiert oder behandelt werden. Renderer-spezifische Anpassung oder gesondert freigegebene Exportvariante nötig.
- Vor endgültiger Freigabe auf Transparenz, Kanten, Skalierung, Bodenposition und Darstellung im echten mobilen Browser prüfen.


### Verbindliche Animationsregel – Betäubung durch Sprengmeister
- **Nur Fernkampfhelden (Bogenschütze und Magier) können durch den Goblin-Sprengmeister betäubt werden.**
- **Nahkampfhelden (aktuell Krieger) sind gegen diese Betäubung vollständig immun.** Der Sprengmeister wählt sie niemals als Bombenziel.
- **Grafikwerkstatt: Für Nahkampfhelden KEINE Betäubungs-/Stun-Animationsframes produzieren.** Solche Frames sind für die aktuelle Mechanik unnötig und nicht beauftragt.
- Falls später andere Betäubungsquellen oder neue Regeln eingeführt werden, ist dafür eine gesonderte Freigabe erforderlich.

## Grafik-Pipeline und Zuständigkeiten
1. **Grafikstudio 🎨:** Originaldesign, Animationen, Sprite-Sheets und Varianten; speichert Originaldateien in **Google Drive**; übergibt Asset-Version, Link, Dateiformat, Pixelgrösse, Transparenzstatus, Animationstiming und bekannte Einschränkungen.
2. **Projektleiter 👑:** genehmigt das Aussehen und später die tatsächliche Spielansicht.
3. **Hauptzentrale 🛠️:** prüft Transparenz, Kanten, Skalierung und Renderer; integriert die **echten freigegebenen Originaldateien** in GitHub und testet die Browserdarstellung.
4. **Designfreigabe ≠ technische Freigabe ≠ endgültige Spielfreigabe.**
5. Freigegebene Weg-/Umweltgestaltung (insbesondere Smaragdwald) nicht ohne Zustimmung ändern.

## Nächste Schritte
1. Plünderer V0.5 in der Arena vom Projektleiter testen lassen und gegebenenfalls Werte korrigieren.
2. Goblin-Späher und Schildträger V0.7 direkt ab Welle 1 in der Arena testen; Balancing und Wellenmischung prüfen.
3. Fertige Originalgrafiken von Google Drive technisch prüfen und nach Freigabe im tatsächlichen Spielrenderer einsetzen.
4. Diese Datei bei relevanten Änderungen aktualisieren; die Grafikwerkstatt liest sie **vor jeder neuen Designphase**.

## Änderungsprotokoll
- **2026-10-18:** Erste gemeinsame Status- und Übergabedatei erstellt. Gameplay V0.5, drei Helden, Zielprioritäten, Plünderer und nächster Späher-Schritt dokumentiert.

- **2026-10-18:** Gameplay V0.10: Späher mit 55 HP / 155 Tempo / 18 Gold bestätigt und ab Welle 2 in die Arena integriert. Browser-Test steht aus.

- **2026-10-18:** Gameplay V0.10: Schildträger mit 220 HP / 55 Tempo / 25 % physischer Schadensreduktion / 25 Gold integriert. **Verbindliche Testregel:** Alle neu integrierten Gegnertypen erscheinen bereits in Welle 1, damit der Projektleiter sofort testen kann. Aktuell rotieren Plünderer, Späher und Schildträger ab dem ersten Spawn. Die Regel gilt für zukünftige neue Gegner in der Testphase; Wellenverteilung später separat balancieren.

- **2026-10-18:** V0.8: zwei individuelle Zielprioritäten je Held (Primär-/Ersatzpriorität), neue Option „Unterstützer“, Bannerträger mit temporärem +20-%-Geschwindigkeitsbuff (Radius 180). Ab Welle 1 rotieren Plünderer, Späher, Schildträger, Bannerträger. Bannerträger-Basiswerte sind vorläufig; Browser-Endtest ausstehend.

- **2026-10-18 V0.9:** Zielsystem neu: Nur Fernkämpfer wählen Gegnerklasse (Standard: Plünderer/Späher; Tank: Schildträger; Unterstützung: Bannerträger, später Schamane) und Zielauswahl (Erster/Letzter/Stärkster/Schwächster). Fehlt die Klasse in Reichweite, gilt die Zielauswahl für alle Gegner. Nahkämpfer haben keine manuellen Zielprioritäten: Nahkampf-KI bevorzugt Gegner in Schlagreichweite, hält laufende Kämpfe möglichst aufrecht, verteidigt den Abschnitt und bleibt im Wachradius. Umsetzung commit ed1028e, Browser-Endtest ausstehend.

- **2026-10-18 V0.10:** Goblin-Sprengmeister als vorläufiger Gameplay-Platzhalter integriert (75 HP, Tempo 95, 25 Gold, Klasse Standard). Betäubungsbombe sucht ausschliesslich nächsten Fernkämpfer (Bogenschütze/Magier) in Radius 180; ein Held pro Wurf, 2 Sekunden Betäubung, 12 Sekunden Abklingzeit, danach 5 Sekunden zusätzlicher Betäubungsschutz. Keine Bomben auf Krieger, keine Flächenbetäubung, kein direkter Heldenschaden. Ab Welle 1 testbar. Freie Heldenplatzierung als spätere Änderung geplant. Commit 5e072d8, Browser-Endtest ausstehend.

- **2026-10-18:** Sprite-Exportstandard V1.0 für neue Exporte festgelegt: Goblins 128×160 / Anker (64,144); Helden 160×160 / Anker (80,144); sichtbare Zielgrössen, RGBA, Animationsmanifest und V0.7-Altbestand-Ausnahme. Renderer-Einbau und Browser-Test noch offen.

- **2026-10-18 Schamane:** Goblin-Schamane im Gameplay integriert: 80 HP, Tempo 70, 30 Gold, Unterstützung; alle 5 Sekunden +30 HP für genau einen anderen verletzten Goblin im Radius 180, Priorität niedrigster HP-Prozentsatz, keine Selbstheilung, keine Überheilung. Ab Welle 1 testbar. Vorläufiger visueller Platzhalter, keine Originalgrafik-Freigabe. Commit 58c82af; Browser-Test ausstehend.

- **2026-10-18:** Animationsregel verbindlich präzisiert: Sprengmeister betäubt ausschliesslich Fernkämpfer; Krieger/Nahkämpfer immun. Keine Stun-Frames für Nahkämpfer produzieren.

- **2026-10-18 Gameplay V0.12:** Freie Heldenplatzierung umgesetzt: keine 12 festen Einsatzplätze und keine zahlenmässige Heldenobergrenze; Begrenzung durch Gold, Abstand zu Weg (mindestens 100 Welteinheiten von Weg-Mittellinie), andere gebaute Helden (mindestens 95 Einheiten Mittelpunktabstand) und Kartenrand. Antippen freier Fläche öffnet Heldenauswahl; gebaute Helden antippen für Upgrade/Zielauswahl. Krieger-Patrouille, Fernkämpfer und Goblinfähigkeiten bleiben erhalten. Commit 2a042e5; Browser-Test noch ausstehend. Für Grafikwerkstatt: keine zusätzlichen festen Heldenplatz-Assets mehr produzieren.

- **2026-10-18 Gameplay V0.13 – Balancing C:** Baukosten steigen getrennt je Heldenklasse nach Anzahl bereits gebauter Helden dieser Klasse. Aufschläge für Held 1–5: 0 / +10 / +25 / +45 / +70 Gold; ab Held 6 jeweils weitere +30 Gold. Beispiele: Krieger 65/75/90/110/135, Bogenschütze 60/70/85/105/130, Magier 85/95/110/130/155. Freie Platzierung ohne Heldenlimit bleibt. Zukünftige Kontermechaniken gegen reine Kriegerarmeen sind **nur geplant**, noch nicht implementiert; Nahkämpfer bleiben gegen Sprengmeister-Betäubung immun, **keine Stun-Frames für Nahkämpfer**. Spielcommit d1f3177; Browser-Test ausstehend.

- **2026-10-18 Gameplay V0.14 Testbalancing:** Wellengegnerzahl 12/18/27/39/54 statt 9/12/15/18/21. Krieger: Schaden 40 statt 48, Angriffsintervall 0,8 statt 0,7 Sekunden, Patrouillenradius 190 statt 270. Schildträger: physische Schadensreduktion 35% statt 25%; Magier ignoriert Rüstung weiterhin. Gegner-HP unverändert, sechs Goblintypen weiterhin ab Welle 1, Nahkämpfer weiterhin immun gegen Sprengmeister-Betäubung (keine Stun-Frames). Spielcommit 226cb3a; Browser-Test ausstehend. Keine neuen Grafikframes aufgrund dieser Balancingwerte nötig.

- **2026-10-18 Gameplay V0.15 – 100 Wellen:** Testarena jetzt 100 statt 5 Wellen. Gegnerzahl je Welle `min(100, round(9 + 2.5*w + 4*sqrt(w)))`; HP-Multiplikator ab Welle 11 `1 + max(0,w-10)*0.035 + max(0,w-40)*0.012`; Geschwindigkeit ab Welle 16 bis max. +30% (`1 + min(0.3,max(0,w-15)*0.004)`). Wellenbonus 35 + 5 Gold je vollendete 5 Wellen. Gegnerarten bleiben im bestehenden Sechserzyklus; Fähigkeiten und Stun-Immunität unverändert. Vorläufige Skalierungswerte, noch nicht browser- oder langzeitsimuliert. Spielcommit 277e5b4. Keine neuen Grafikframes erforderlich.

- **2026-10-18 Gameplay V0.16 – Ökonomie-Testbalancing:** Startgold 150 (statt 180); Helden-Grundkosten Krieger 100, Bogenschütze 90, Magier 130; pro Klasse Aufschläge 0/25/60/105/160 Gold für Held 1–5, ab Held 6 jeweils weitere 65. Goblin-Gold: Plünderer 5, Späher 4, Schildträger 8, Bannerträger 7, Sprengmeister 8, Schamane 10. Wellenbonus 20 + 5 je vollendete 10 Wellen. Alle drei Heldenklassen betroffen; 100 Wellen und freie Platzierung unverändert. Werte vorläufig, Simulation/Browser-Test ausstehend. Spielcommit 726429c. Keine zusätzlichen Grafikframes erforderlich.

- **2026-10-18 Gameplay V0.17 – Gold nach Goblin-Gefahr:** Kill-Belohnungen neu: Plünderer 1, Späher 2, Schildträger 5, Bannerträger 6, Sprengmeister 8, Schamane 10 Gold. Belohnung bleibt unabhängig von der Wellenzahl. Alle anderen V0.16-Wirtschaftsregeln bleiben bestehen. Spielcommit 8cddd90. Noch kein Browser-Test; keine neuen Grafikframes erforderlich.

### VERBINDLICHER ENGINE-BESCHLUSS – 18.10.2026
Die Projektleitung hat **Phaser als Ziel-Engine für die aktive Weiterentwicklung von ECLIPSE: ASCENSION freigegeben**, auch wenn die Portierung zunächst Rückschritte bei den Features bedeutet. Die Canvas-Arena bleibt als Referenz erhalten. Technischer Migrationsplan: [PHASER_MIGRATION.md](PHASER_MIGRATION.md). **Grafikstil und freigegebene Originalassets unverändert beibehalten.** Asset-/Framefehler weiterhin im Sprite Inspector prüfen und in der Grafikwerkstatt beheben; Phaser korrigiert keine fehlerhaften Quellframes. Phaser-Kampf V0.2 ist ein isolierter Gameplay-Prototyp mit Goblin-Platzhaltern, keine Freigabe von Ersatzgrafiken. iPhone-Abnahme noch offen.
