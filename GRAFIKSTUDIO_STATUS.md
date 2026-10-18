# ECLIPSE: ASCENSION – Übergabe an das Grafikstudio 🎨

**Stand:** 18. Oktober 2026  
**Verantwortung:** Hauptzentrale 🛠️ pflegt diesen Status bei relevanten Gameplay-/Designänderungen.  
**Wichtig:** Vor neuen Entwürfen diese Datei und die freigegebenen Designvorgaben prüfen. Bei Widersprüchen Rückfrage an die Hauptzentrale/Projektleitung.

## Zweck und Zusammenarbeit
Diese Datei verbindet die technische Entwicklung der spielbaren Arena mit der Grafikwerkstatt. Sie ist **kein automatischer Nachrichtendienst**. Das Grafikstudio soll sie vor neuen Arbeiten aktiv lesen. Die Hauptzentrale aktualisiert sie bei Änderungen, die Grafiken oder Animationen beeinflussen. **Keine bestehende Designfreigabe wird dadurch ersetzt.**

## Aktueller Spielstand
- Repository: `Cuddlerandom/Eclipse-Ascension` (**nicht** `Cuddlerandom/eclipse`).
- Spielbare Arena: [Arena auf GitHub Pages](https://cuddlerandom.github.io/Eclipse-Ascension/play/arena-sandbox-user-layout.html).
- Technischer Prototyp: **Gameplay V0.7**. Grafikplatzhalter sind vorübergehend; fertige freigegebene Originalgrafiken sollen nicht durch vereinfachte Neuentwürfe ersetzt werden.
- Welt: 2400 × 1600 Welteinheiten, verschiebbare Kamera und Zoom auf Mobilgeräten, gewundener Gegnerweg, **12 feste Helden-Einsatzpositionen**.
- Verteidigung: 20 Startleben, 180 Startgold; 5 Wellen im derzeitigen Prototyp.
- Prototyp V0.4: Krieger-Bewegung und Zielpriorisierung wurden vom Projektleiter auf dem iPhone als funktionierend bestätigt.
- Prototyp V0.5: Goblin-Plünderer als Basistyp implementiert. **Gameplay V0.7:** Goblin-Späher und Schildträger integriert; Browser-Endtest V0.7 noch ausstehend.

## Unsere drei spielbaren Helden
| Held | Aufgabe / Verhalten | Basiswerte im aktuellen Prototyp |
|---|---|---|
| **Krieger** ⚔️ | Nahkampf; verlässt seinen Einsatzpunkt, verfolgt Gegner nur innerhalb seiner Einsatzreichweite und kehrt zurück | 65 Gold; Reichweite 270; Schaden 48; Angriff alle 0,70 s |
| **Bogenschütze** 🏹 | Fernkampf; bleibt am Einsatzpunkt | 60 Gold; Reichweite 300; Schaden 27; Angriff alle 0,42 s |
| **Magier** ✨ | Fernkampf; bleibt am Einsatzpunkt; Flächenschaden | 85 Gold; Reichweite 245; Schaden 34; Angriff alle 1,05 s; Splashradius 90 |

- Jeder Held kann im **laufenden Durchgang bis Level 5** verbessert werden. Upgrade-Kosten: 50 / 90 / 150 / 250 Gold.
- Jeder Held besitzt individuell wählbare Zielpriorität: **Erster, Letzter, Stärkster, Schwächster**.
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
- **Schildträger:** robuster Tank. **Gameplay V0.7 vorläufig freigegeben:** 220 HP, Tempo 55, 25 % Reduktion physischer Treffer von Krieger/Bogenschütze, Magier ignoriert Rüstung, 25 Gold, 1 Basisleben bei Durchbruch. Keine weitere Spezialfähigkeit. In Welle 1 testbar. Die Werte sind bis zum Spieltest vorläufig.
- **Bannerträger:** Unterstützer.
- **Sprengmeister:** Spezialist.
- **Schamane:** magischer Unterstützer.

**Achtung:** Für die übrigen drei Rollen enthält diese Statusdatei keine detaillierte Designfreigabe oder endgültige Mechanik. Bestehende Originalkonzepte der Gegnerwerkstatt haben Vorrang; nichts aus der Kurzbeschreibung als final interpretieren.

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

- **2026-10-18:** Gameplay V0.7: Späher mit 55 HP / 155 Tempo / 18 Gold bestätigt und ab Welle 2 in die Arena integriert. Browser-Test steht aus.

- **2026-10-18:** Gameplay V0.7: Schildträger mit 220 HP / 55 Tempo / 25 % physischer Schadensreduktion / 25 Gold integriert. **Verbindliche Testregel:** Alle neu integrierten Gegnertypen erscheinen bereits in Welle 1, damit der Projektleiter sofort testen kann. Aktuell rotieren Plünderer, Späher und Schildträger ab dem ersten Spawn. Die Regel gilt für zukünftige neue Gegner in der Testphase; Wellenverteilung später separat balancieren.
