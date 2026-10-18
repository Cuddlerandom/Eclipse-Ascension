# ECLIPSE: ASCENSION – Phaser-Migrationsplan

**Beschluss der Projektleitung: 18.10.2026** – Phaser ist ab jetzt die Ziel-Engine für die aktive Weiterentwicklung. Die bisherige Canvas-Version bleibt als funktionierende Referenz und darf nicht ohne Freigabe entfernt werden.

## Unveränderliche Vorgaben
- Freigegebener Fantasy-2D-Grafikstil, Originalgrafiken und Gameplay-Vision bleiben bestehen.
- Mobile-first: spielbarer iPhone-Safari-Link nach jeder grösseren Etappe über GitHub Pages.
- Keine kostenpflichtigen Phaser-Dienste/Accounts erforderlich.
- Original-Sprite-Defekte werden an den Assets behoben; ein Rendererwechsel behebt sie nicht.
- Arbeiten nachvollziehbar committen, bestehende Version nicht überschreiben.
- Aktuelle isolierte Prototypen: `play/phaser-warrior-test.html` und `play/phaser-battle-v02.html`. Beide sind noch keine vollwertige Portierung.
- Für neue Entwicklungsarbeit zuerst bestehende Projektregeln und relevante Dateien prüfen; fehlende Regeldateien nicht erfinden.

## Technische Zielstruktur
- `play/phaser/index.html` – stabiler Einstieg für den Phaser-Spielaufbau.
- `play/phaser/src/` – modulare JavaScript-Systeme (Szenen, Welt, Einheiten, Kampf, Eingabe, HUD).
- `assets/` – Originalgrafiken als gemeinsame Assetquelle, keine ungeprüften Ersatzgrafiken.
- Phaser-Version fixieren, Renderereinstellungen bewusst wählen, Touch und Performance auf iPhone testen.

## Geplante Etappen
1. **Grundgerüst:** Phaser-Einstieg, Scene-/Asset-/Kamera-/Touch-Grundlagen; auf GitHub Pages laden.
2. **Smaragdwald:** freigegebene Weg- und Umgebungsassets aus Google Drive/GitHub einbinden, Übergänge prüfen.
3. **Einheiten:** echte Goblin- und Heldenassets mit korrekten Ankern/Frames; Framefehler dokumentieren und gezielt korrigieren.
4. **Gameplay:** Wegfindung, Wellen, Angriffe, Leben, Gold, Platzierung, Upgrades, UI.
5. **Qualität:** Performance, Animationen, Kamera, Safari-Touch, Vergleich gegen bisherige Arena.
6. **Umstellung:** erst nach Abnahme den Phaser-Einstieg zum primären Spiel-Link machen.

## Abnahmebedingungen
- Auf dem iPhone spielbar, keine blockierenden Ladefehler.
- Design entspricht den freigegebenen Vorlagen.
- Animationen vollständig, keine abgeschnittenen Frames.
- Kerngameplay gegenüber Referenz erhalten.
- Alte Version bleibt bis zur Abnahme erreichbar.

**Status:** Phaser-Umstieg beschlossen, Umsetzung in Etappen; noch keine abgeschlossene Portierung und kein bestätigter iPhone-Browser-Abnahmetest.
