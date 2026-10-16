# ECLIPSE: ASCENSION — Art Bible V1.0

Status: V1.1 – Perspektive und visuelle Zielqualität aktualisiert am 16.10.2026. Kapitel 1: Smaragdwald.

## Acht verbindliche Entscheidungen

1. Grafikstil B: Moderne Fantasy-Pixel-Art.
2. Perspektive: Leicht schräge Draufsicht (3/4-Top-down) nach ausdrücklicher Freigabe des visuellen Referenzbilds. Ersetzt die ursprünglich freigegebene direkte Vogelperspektive. Keine isometrische Kachelprojektion erforderlich.
3. Pixelgrösse B: Mittlere, gut erkennbare Pixel; 32x32-Bodenkacheln als Ausgangsraster.
4. Farbpalette B: Mystischer Smaragdwald.
5. Beleuchtung B: Magisches Waldlicht mit sanften Schatten und dezenten türkisen Akzenten.
6. Grössenverhältnisse B: Ausgewogene Spielobjekte für iPhone und Desktop.
7. Sprite-Standard B: Transparente PNG-Dateien und PNG-Sprite-Sheets für Animationen.
8. Weltaufbau C: Hybrides System aus Waldboden-Tiles, separatem geschwungenem Weg und einzelnen Objektsprites.

## Arena — freigegebene Geometrie

Koordinaten: 960x440. 39 Wegpunkte. Goblinhöhle: (40,377). Weltenbaum: (921,62). Geglättete Kurven bleiben unverändert. Referenz: play/arena-sandbox-user-layout.html.

## Referenz-Farbwerte (noch am Spielbild prüfen)

#142E29, #285743, #477B55, #829A6A, #55C6B4.

## Richtgrössen im Arena-Koordinatensystem

Goblinhöhle: 100x85. Weltenbaum: 145x150. Goblin: 26x26. Kleine Felsen: 24 bis 40. Die Werte sind Darstellungsziele, keine verbindlichen PNG-Abmessungen.

## Asset-Regeln

Transparente RGBA-PNGs. Nearest-Neighbor-Filter ohne Weichzeichnung. Animierte Figuren als Sprite-Sheets mit einheitlichen Frames und dokumentierten Ankerpunkten. Einheitliche Dateinamen in Kleinbuchstaben. Originaldateien erhalten. Kein Ersatz durch vereinfachte Platzhalter ohne Freigabe.

## Ebenen

1. Waldboden-Tiles
2. Weg-Ebene
3. Statische Objekte
4. Figuren und Animationen
5. Magisches Licht und Partikel
6. Benutzeroberfläche

## Noch offen

Die finale interne Renderauflösung und der Umgang mit dem Seitenverhältnis 960:440 sind durch einen echten Browser-Test zu bestimmen. Die Engine ist noch nicht verbindlich festgelegt. Stilreferenzbilder sind keine fertigen Spielassets.

## Nächster Schritt

Goblinhöhle V1 als echtes transparentes PNG entwickeln, in die freigegebene Arena einsetzen und auf dem iPhone prüfen.

## Verbindliches visuelles Ziel: Smaragdwald Visual Target V1.0

Der Game Director hat den zuletzt im Grafikstandard-Chat erzeugten Gesamtstil als Zielqualität ausdrücklich bestätigt: detailreiche moderne Fantasy-Pixel-Art, leicht schräge Draufsicht, üppiger Smaragdwald, atmosphärisches Licht, moosbewachsene Felsen und Höhlen, erkennbare Goblin-Gesichter/Ausrüstung und zurückhaltende türkisfarbene Magie. Alle neuen Assets sollen stilistisch einheitlich sein. Das Referenzbild ist ein Look-Development-Ziel, kein fertiges Spielasset und kein Beleg für echte 26x26-Pixel-Frames. Die Grafik muss als echte PNGs und Sprite-Sheets umgesetzt und auf dem iPhone geprüft werden. Das Referenzbild muss separat als Bilddatei im Repository abgelegt werden, bevor ein stabiler GitHub-Pfad dafür angegeben werden kann. Die freigegebenen 39 Arena-Wegpunkte, Höhlen- und Baumpositionen bleiben unverändert.
