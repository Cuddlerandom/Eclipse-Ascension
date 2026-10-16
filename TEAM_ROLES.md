# ECLIPSE: ASCENSION – Verbindliche Rollenregeln V2.0

**Verantwortlich für Regeln, Koordination und technische Freigaben: Hauptzentrale 🛠️.** Bei Unklarheiten klärt die Hauptzentrale die Zuständigkeit.

## Zuständigkeiten

1. **Projektleiter 👑:** Entscheidet über Gameplay, Design, Prioritäten, Designfreigabe und endgültige Spielfreigabe. Keine Pflicht zu technischer Reparatur, Dateiübertragung oder Fehlerkoordination.
2. **Grafikstudio 🎨:** Erstellt und überarbeitet Originalgrafiken, Animationen, Sprite-Sheets und sinnvolle Varianten nach Art Bible und freigegebenem Design; prüft Vollständigkeit und künstlerische Qualität; pflegt einheitliche Namen/Versionen und legt Originaldateien in Google Drive ab. Liefert pro Asset eine technische Übergabebeschreibung. Darf technische Probleme dokumentieren, führt aber **keine** rein technischen Reparaturen, Renderer-Tests oder Spielcode-Integration durch.
3. **Hauptzentrale 🛠️:** Prüft Assets technisch, behebt rein technische Bildfehler ohne Designänderung, kontrolliert Transparenz/Kanten/Skalierung, integriert echte Originalgrafiken in GitHub, verantwortet Browser-/Renderer-Tests, Spielmechaniken, Gegnerlogik, Arena, funktionierende Vorschauen und technische Dokumentation. Künstlerische Änderungen gehen zurück ans Grafikstudio.

## Verbindlicher Ablauf

1. **Entwurf:** Grafikstudio produziert das Asset.
2. **Designfreigabe:** Projektleiter genehmigt das Aussehen.
3. **Technische Prüfung:** Hauptzentrale prüft, korrigiert nötigenfalls technisch und integriert das Asset.
4. **Spielfreigabe:** Projektleiter beurteilt die tatsächliche Darstellung in einer funktionierenden Spielvorschau.

**Designfreigabe ist keine technische Freigabe.** Kein Asset als spielbereit melden, solange technische Prüfung oder funktionierender Browser-Test fehlen. Keine vereinfachten Ersatzgrafiken anstelle freigegebener Originale ohne ausdrückliche Zustimmung des Projektleiters.

## Pflichtangaben jeder Asset-Übergabe

- Asset-Name und Versionsnummer
- Google-Drive-Dateilink
- Tatsächliches Dateiformat und Pixelabmessungen
- Bekannter Transparenzstatus
- Vorgesehene Position und Darstellungsgrösse, sofern festgelegt
- Bekannte technische Einschränkungen
- Noch offene Prüfungen
- Bei Animationen: Frame-Anzahl, Reihenfolge, Abmessungen und Timing, soweit zutreffend

## Ablage und Schutz bestehender Freigaben

- **Google Drive:** Originale und freigegebene Grafiken.
- **GitHub:** Spielcode, integrierte Assets, Renderer-Vorschauen, technische Dokumentation und diese Regeln.
- **Smaragdwald:** Freigegebene 39-Punkte-Wegführung nicht ohne Zustimmung verändern.

## Aktuelle Priorität: Goblinhöhle V1.0

**Zuerst Fehlerursache in bestehender Vorschau feststellen, dann beheben, dann im Browser testen.** Prüfpunkte: echte Original-PNG, korrekter Asset-Pfad, Ladevorgang, drawImage-Aufruf, sichtbare Position, Skalierung, Ebenen, Transparenz und Browserfehler. Keine weiteren gleichartigen ungetesteten Vorschauen als Lösung ausgeben.

**Diagnose 2026-10-16:** Die GitHub-Datei `play/arena-sandbox-user-layout.html` zeichnet an der Höhlenposition nur einen grünen Kreis (`circle(route[0],22,'#40d366')`). In dieser Datei gibt es keinen PNG-Ladevorgang und keinen `drawImage`-Aufruf für die Goblinhöhle. Das erklärt das Fehlen des Originals **in dieser Arena**. Ob andere frühere HTML-Vorschauen zusätzliche Fehler haben, ist separat zu prüfen. Die tatsächliche Integration und Browser-Endprüfung stehen aus.

Stand: 2026-10-16.
