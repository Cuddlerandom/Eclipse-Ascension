# Krieger Level 1 V1 – technischer Eingangstest (18.10.2026)

Branch: test/krieger-level1-v1-sprites. Keine Änderungen an main.

## Paketprüfung
- Krieger_Level1_V1_BROWSERGETESTET(1).zip: 104 einzelne RGBA-PNGs, alle 160×160; 16 Sheets; 4 Richtungen × idle/run/attack/hit.
- Manifest: Anker (80,144); idle 6@7fps, run 8@11fps, attack 8@12fps, hit 4@8fps.
- TESTBERICHT.json: loaded_in_browser=null; Browserlauf durch Administrator-Sperre blockiert; keine Browserfreigabe bestätigt.
- Pixelgenau identische Frames in mehreren Animationsreihen, besonders attack_000/001/002/006 (vorne/hinten/rechts); Wiederholungen auch bei idle/run. Schwertbewegung und Posen visuell prüfen und gegebenenfalls nachzeichnen.
- AGENTS.md auf main unter Repository-Root nicht gefunden (404); Projektregeln vor Merge erneut prüfen.

## Integrationsstatus
- Original-PNGs **noch nicht im Repository**. Kein Ersatz durch nachgezeichnete Grafiken oder Fake-Sprites.
- Die bereitgestellte GitHub-Schnittstelle erlaubt binäre Uploads grundsätzlich über Blob-API, jedoch ist das lokal hochgeladene ZIP nicht direkt an die GitHub-Schnittstelle übertragbar. Ohne Original-PNGs im Branch kein seriöser Renderer-/Browser-Test.
- Bestehendes Gameplay bleibt unverändert.

## Rückmeldung Grafikwerkstatt
1. Identische Frames in Angriffszyklen (insbesondere 000/001/002/006) prüfen; Bewegung kann visuell stocken.
2. Idle/Run-Duplikate und richtungsabhängige Posen prüfen.
3. Browser-Test im tatsächlichen Spielrenderer ist noch offen; ZIP-Dateiname ist kein Nachweis.
4. Transparenz/Anker sind technisch konsistent laut PNG/Manifest; Bodenposition, Schwertschwünge und Übergänge im Arena-Renderer noch nicht bestätigt.
