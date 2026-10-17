# Smaragdwald Wegsystem V1.2 – technische Übergabe

Repository: Cuddlerandom/Eclipse-Ascension. Branch: feature/smaragdwald-weg-v1.2.

Quelle: https://drive.google.com/file/d/1IblV7HXWHFcSthWOBVIgSzCFPGFJbrr3/view

Alle 20 RGBA-PNGs einzeln und bytegenau aus dem Original-ZIP unter `assets/environments/smaragdwald/weg-v1.2/`. Abmessungen und technische Einschränkungen stehen im unveränderten `manifest.json` und `UEBERGABE.txt`. SHA-256-Prüfsummen: `sha256.json`.

## Integration

- `play/index.html`: Die spielbare Babylon-Alpha verwendet eine zusammenhängende Wegfläche mit gemeinsamen Randpunkten und längenbasierten Texturkoordinaten. Originalgrafik ersetzt die bisherigen braunen Wegkästen. Gameplay-Spline, Bausperren, Geschwindigkeiten, Wellen, Wirtschaft und Kampfcode unverändert.
- `play/arena-sandbox-user-layout.html`: Die V1.1-ZIP-/60-Kachel-Überschreibung entfällt. Der Renderer verwendet wieder die 39 freigegebenen Punkte und rundet die Kurven mit maximal 23 Arena-Pixeln Radius ab. Der Goblin folgt derselben geglätteten Mittellinie. Die Originalpunkte sowie Höhlen-/Baumpositionen bleiben erhalten. Leichte Anschlussanpassungen hat der Projektleiter am 17.10.2026 ausdrücklich erlaubt.
- Alle 20 Dateien werden einzeln geladen und validiert. Für die durchgehende Strecke wird der saubere Ost-West-Streifen `gerade_ew_b.png` entlang der Tangente angeordnet. T-Stücke, Kreuzungen und Sackgassen werden auf dieser unverzweigten Strecke nicht künstlich platziert. Sie bleiben als Originale verfügbar.
- Nur der transparente Extraktionsrand des Streifens (x ausserhalb 12..175) wird beim Rendern ausgespart. Gespiegelte Wiederholungen verbinden gleiche Randpixel. Die PNGs werden weder neu gezeichnet noch verändert; Kurven entstehen durch Texturprojektion. Die übrigen künstlerischen Kurvenstücke sind wegen unterschiedlicher Anschlussgeometrien keine nahtlosen Grid-Kacheln.
- Nearest-Neighbor, Alpha und unveränderte Farben. Die 2D-Wegfläche wird zwischengespeichert, statt jeden Frame neu aufgebaut.

## Prüfung am 17.10.2026

- 20/20 Originale byteidentisch mit dem ZIP; PNG-Integrität, RGBA und transparente Pixel geprüft.
- `node tests/road-v1.2.cjs`: Endpunkte, Rundung, kontinuierliche Abtastung und 20 eindeutige Assetnamen bestanden.
- JavaScript-Syntax und `git diff --check` bestanden.
- Chromium: Arena 1280×720 mit 39 Punkten, 2906 geglätteten Proben, laufendem Original-Goblin und 20 geladenen PNGs. Sichtprüfung: keine periodischen transparenten Anschlusslücken mehr.
- Chromium/WebGL: Alpha 1280×720 und 844×390. Textur bereit, 410 Wegvertices, Welle 1 startet und spawnt Gegner; Pause hält Bewegung an; Tempo schaltet auf 2×. Keine JavaScript- oder HTTP-Fehler im lokalen Test.
- Im lokalen Test wurde die unveränderte Babylon-CDN-Datei über den Testserver bereitgestellt, weil der isolierte Chromium-Prozess keinen direkten Internetzugang besitzt. Die Produktionsdatei lädt weiterhin das bestehende Babylon-CDN.

## Freigabe

Technisch zur Prüfung übergeben. Kein Merge nach main und keine endgültige Spielfreigabe durch diesen Branch. Die Hauptzentrale prüft den PR; der Projektleiter beurteilt die tatsächliche Spielansicht. Die bestehende 3D-Alpha enthält weiterhin die vorher vorhandenen geometrischen Objektgrafiken – deren Austausch gehört nicht zu diesem Wegauftrag.
