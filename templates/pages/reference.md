#Index

	escape(@string);             // Ein URL kodierter String

	ceil(@number);               // Rundet auf zu einem Integer
	floor(@number);              // Rundet ab zu einem Integer
	percentage(@number);         // Konvertiert zu %, z.B. 0.5 -> 50%
	round(number, [places: 0]);	 // Rundet eine Zahl zu einer Zahl mit places Nachkommastellen

	rgb(@r, @g, @b);                             // Konvertiert zu einer Farbe
	rgba(@r, @g, @b, @a);                        // Konvertiert zu einer Farbe
	argb(@color);                                // Erstellt: #AARRGGBB
	hsl(@hue, @saturation, @lightness);          // Erstellt eine Farbe
	hsla(@hue, @saturation, @lightness, @alpha); // Erstellt eine Farbe
	hsv(@hue, @saturation, @value);              // Erstellt eine Farbe
	hsva(@hue, @saturation, @value, @alpha);     // Erstellt eine Farbe

    hue(@color);        // Gibt den `Farbton` von @color zurück
    saturation(@color); // Gibt den `Sättigungs` Kanal von @color zurück
    lightness(@color);  // Gibt den 'Helligkeits' Kanal von @color zurück
    red(@color);        // Gibt den 'roten' Kanal von @color zurück
    green(@color);      // Gibt den 'grünen' Kanal von @color zurück
    blue(@color);       // Gibt den 'blauen' Kanal von @color zurück
    alpha(@color);      // Gibt den 'alpha' Kanal von @color zurück
    luma(@color);       // Gibt den 'luma' Wert (wahrgenommene Helligkeit) von @color zurück

    saturate(@color, 10%);   // Gibt eine Farbe zurück, die 10% Punkte *mehr* gesättigt ist
    desaturate(@color, 10%); // Gibt eine Farbe zurück, die 10% Punkte *weniger* gesättigt ist
    lighten(@color, 10%);    // Gibt eine Farbe zurück, die 10% Punkte *heller* ist
    darken(@color, 10%);     // Gibt eine Farbe zurück, die 10% Punkte *dunkler* ist
    fadein(@color, 10%);     // Gibt eine Farbe zurück, die 10% Punkte *weniger* transparent ist
    fadeout(@color, 10%);    // Gibt eine Farbe zurück, die 10% Punkte *mehr* transparent ist
    fade(@color, 50%);       // Gibt @color mit 50% Transparenz zurück
    spin(@color, 10);        // Gibt @color mit 10 Grad höherem Farbton zurück
    mix(@color1, @color2, [@weight: 50%]);  // Gibt einen Mix aus @color1 und @color2 zurück
	greyscale(@color);       // Gibt einen Grauton, eine zu 100% entsättigte Farbe zurück
    contrast(@color1, @darkcolor, @lightcolor);
	    // Gibt @darkcolor zurück, wenn @color1 mehr als 43% Luma hat
		// ansonsten gib $lightcolor zurück

	multiply(@color1, @color2);
	screen(@color1, @color2);
	overlay(@color1, @color2);
	softlight(@color1, @color2);
	hardlight(@color1, @color2);
	difference(@color1, @color2);
	exclusion(@color1, @color2);
	average(@color1, @color2);
	negation(@color1, @color2);

#String Funktionen
###escape

Wendet [URL-encoding](http://de.wikipedia.org/wiki/URL-Encoding) auf `=`, `:`, `#`, `;`, `(` und `)` an.

Parameter:

* `string`: Ein zu escapender String

Gibt zurück: `string`

Beispiel:

    escape('a=1')

Ausgabe:

    a%3D1
#Mathematische Funktionen
###ceil
Rundet auf zu einem Integer

Parameter:

* `number`: Ein Float

Gibt zurück: `integer`

Beispiel:

    ceil(2.4)

Ausgabe:

    3
###floor
Rundet ab zu einem Integer

Parameter:

* `number`: Ein Float

Gibt zurück: `integer`

Beispiel:

    floor(2.6)

Ausgabe:

    2
###percentage
Konvertiert einen Float zu einen Prozent String

Parameter:

* `number`: Ein Float

Ausgabe: `string`

Beispiel:

    percentage(0.5)

Ausgabe:

    50%
###round
Rundet.

Parameter:

* `number`: Ein Float
* `decimalPlaces`: Optional: Die Anzahl der Dezimalstellen auf die gerundet werden soll. Default: 0

Ausgabe: `number`

Beispiel:

    round(1.67)

Ausgabe:

    2

Beispiel:

    round(1.67, 1)

Ausgabe:

    1.7
#Farbfunktionen
##Farbdefinition
###rgb
Erstellt eine Farbe ohne Transparenz von dezimalen Rot-, Grün- und Blauwerten. Es können auch Literale als Farbewerte wie in normalem HTML/CSS verwendet werden um Farben zu definieren. Zum Beispiel `#ff0000`.

Parameter:

* `red`: Eine Zahl 0-255.
* `green`: Eine Zahl 0-255.
* `blue`: Eine Zahl 0-255.

Ausgabe: `color`

Beispiel:

    rgb(90, 129, 32)

Ausgabe:

    #5a8120
###rgba
Erstellt ein transparentes Farbobjekt von dezimalen Rot-, Grün, Blau- und Alphawerten.

Parameter:

* `red`: Eine Zahl 0-255.
* `green`: Eine Zahl 0-255.
* `blue`: Eine Zahl 0-255.
* `alpha`: Eine Zahl 0-255.

Ausgabe: `color`

Beispiel:

    rgba(90, 129, 32, 0.5)

Ausgabe:

    rgba(90, 129, 32, 0.5)
###argb
Erstellt eine Hexadezimale Version der Farbe im `#AARRGGBB` Format (**NICHT** `#RRGGBBAA`!).

Parameter:

* `color`: Ein Farbobjekt

Ausgabe: `string`

Beispiel:

    argb(rgba(90, 23, 148, 0.5));

Ausgabe:

    #805a1794
###hsl
Erstellt ein Farbobjekt ohne Transparenz von Farbton-, Sättigungs- und Helligkeitswerten.

Parameter:

* `hue`: Eine Gradzahl von 0-360.
* `saturation`: Eine Prozentzahl von 0-100%.
* `lightness`: Eine Prozentzahl von 0-100%.

Ausgabe: `color`

Beispiel:

    hsl(90, 100%, 50%)

Ausgabe:

    #80ff00

Das ist nützlich wenn man eine neue Farbe anhand von einem anderen Farbkanal erstellen möchte.
Ein Beispiel:

    @new: hsl(hue(@old), 45%, 90%);

`@new` wird `@old`'s *Farbton* haben, aber seine eigene Sättigung und Helligkeit.

###hsla
Erstellt ein transparentes Farbobjekt von Farbton-, Sättigungs- und Helligkeitswerten.

Parameter:

* `hue`: Eine Gradzahl von 0-360
* `saturation`: Eine Prozentzahl von 0-100%.
* `lightness`: Eine Prozentzahl von 0-100%.
* `alpha`: Ein Float zwischen 0-1

Ausgabe: `color`

Beispiel:

    hsl(90, 100%, 50%, 0.5)

Ausgabe:

    rgba(128, 255, 0, 0.5)
###hsv
Erstellt ein Farbobjekt ohne Transparenz von Farbton-, Sättigungswert und Dunkelstufe. Dies ist nicht das Gleiche wie `hsl`.

Parameter:

* `hue`: Eine Gradzahl von 0-360.
* `saturation`: Eine Prozentzahl von 0-100%.
* `value`: Eine Prozentzahl von 0-100%.

Ausgabe: `color`

Beispiel:

    hsv(90, 100%, 50%)

Ausgabe:

###hsva
Erstellt ein transparentes Farbobjekt von Farbton-, Sättigungswert und Dunkelstufe. Dies ist nicht das Gleiche wie `hsla`.

Parameter:

* `hue`: Eine Gradzahl von 0-360.
* `saturation`: Eine Prozentzahl von 0-100%.
* `value`: Eine Prozentzahl von 0-100%.
* `alpha`: Ein Float zwischen 0-1.

Ausgabe: `color`

Beispiel:

    hsva(90, 100%, 50%, 0.5)

Ausgabe:

##Farbkanal Information
###hue
Extrahiert den Farbton Kanal von einem Farbobjekt

Parameter:

* `color`: Ein Farbobjekt

Ausgabe: `integer` 0-360

Beispiel:

    hue(hsl(90, 100%, 50%))

Ausgabe:

    90
###saturation
Extrahiert den Sättigungskanal von einem Farbobjekt

Parameter:

* `color`: Ein Farbobjekt

Ausgabe: `percentage` 0-100

Beispiel:

    saturation(hsl(90, 100%, 50%))

Ausgabe:

    100%
###lightness
Extrahiert den Helligkeitskanal von einem Farbobjekt

Parameter:

* `color`: Ein Farbobjekt

Ausgabe: `percentage` 0-100

Beispiel:

    lightness(hsl(90, 100%, 50%))

Ausgabe:

    50%
###red
Extrahiert den roten Kanal von einem Farbobjekt

Parameter:

* `color`: Ein Farbobjekt

Ausgabe: `integer` 0-255

Beispiel:

    red(rgb(10, 20, 30))

Ausgabe:

    10
###green
Extrahiert den grünen Kanal von einem Farbobjekt

Parameter:

* `color`: Ein Farbobjekt

Ausgabe: `integer` 0-255

Beispiel:

    green(rgb(10, 20, 30))

Ausgabe:

    20
###blue
Extrahiert den blauen Kanal von einem Farbobjekt

Parameter:

* `color`: Ein Farbobjekt

Ausgabe: `integer` 0-255

Beispiel:

    blue(rgb(10, 20, 30))

Ausgabe:

    30
###alpha
Extrahiert den alpha Kanal von einem Farbobjekt

Parameter:

* `color`: Ein Farbobjekt

Ausgabe: `float` 0-1

Beispiel:

    alpha(rgba(10, 20, 30, 0.5))

Ausgabe:

    0.5
###luma
Berechnet den [luma](http://en.wikipedia.org/wiki/Luma_(video)) (wahrgenommene Helligkeit) Wert von einem Farbobjekt Nutzt SMPTE C / Rec. 709 Koeffizienten wie in [WCAG 2.0](http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef) vorgeschlagen. Diese Berechnung wird ebenfalls in der contrast Funktion verwendet.

Parameter:

* `color`: Ein Farbobjekt

Ausgabe: `percentage` 0-100%

Beispiel:

    luma(rgb(100, 200, 30))

Ausgabe:

    65%
##Farboperationen
Farboperationen akzeptieren generell die Parameter in den gleichen Einheiten in denen Sie sie ändern. Prozentwerte werden absolut behandelt. Wenn man also einen 10% Wert um 10% erhöht, erhält man 20% und nicht 11%. Die Werte werden außerdem in den erlaubten Bereichen gehalten.

###saturate
Erhöht die Sättigung einer Farbe um einen absoluten Wert.

Parameter:

* `color`: Ein Farbobjekt
* `amount`: Eine Prozentzahl von 0-100%.

Ausgabe: `color`

Beispiel:

    saturate(hsl(90, 90%, 50%), 10%)

Ausgabe:

    #80ff00 (hsl(90, 100%, 50%))
###desaturate
Vermindert die Sättigung einer Farbe um einen absoluten Wert.

Parameter:

* `color`: Ein Farbobjekt
* `amount`: Eine Prozentzahl von 0-100%.

Ausgabe: `color`

Beispiel:

    desaturate(hsl(90, 90%, 50%), 10%)

Ausgabe:

    #80e51a (hsl(90, 80%, 50%))
###lighten
Erhöht die Helligkeit einer Farbe um einen absoluten Wert.

Parameter:

* `color`: Ein Farbobjekt
* `amount`: Eine Prozentzahl 0-100%.

Ausgabe: `color`

Beispiel:

    lighten(hsl(90, 90%, 50%), 10%)

Ausgabe:

    #99f53d (hsl(90, 90%, 60%))
###darken
Vermindert die Helligkeit einer Farbe um einen absoluten Wert.

Parameter:

* `color`: Ein Farbobjekt
* `amount`: Eine Prozentzahl von 0-100%.

Ausgabe: `color`

Beispiel:

    darken(hsl(90, 90%, 50%), 10%)

Ausgabe:

    #66c20a (hsl(90, 90%, 40%))
###fadein
Vermindert die Transparenz (oder erhöht die Deckkraft) einer Farbe. Dies hat keinen Effekt auf Farben ohne Transparenz. Die entgegengesetzte Funktion heißt `fadeout`.

Parameter:

* `color`: Ein Farbobjekt
* `amount`: Eine Prozentzahl von 0-100%.

Ausgabe: `color`

Beispiel:

    fadein(hsla(90, 90%, 50%, 0.5), 10%)

Ausgabe:

    rgba(128, 242, 13, 0.6) (hsla(90, 90%, 50%, 0.6))
###fadeout
Erhöht die Transparenz (oder vermindert die Deckkraft) einer Farbe. Dies hat keinen Effekt auf Farben ohne Transparenz. Die entgegengesetzte Funktion heißt `fadein`.

Parameter:

* `color`: Ein Farbobjekt
* `amount`: Eine Prozentzahl von 0-100%.

Ausgabe: `color`

Beispiel:

    fadeout(hsla(90, 90%, 50%, 0.5), 10%)

Ausgabe:

    rgba(128, 242, 13, 0.4) (hsla(90, 90%, 50%, 0.6))
###fade
Setzt die absolute Transparenz einer Farbe. Kann auch auf Farben angewendet werden die noch nicht Transparent sind.

Parameter:

* `color`: Ein Farbobjekt
* `amount`: Eine Prozentzahl von 0-100%.

Ausgabe: `color`

Beispiel:

    fade(hsl(90, 90%, 50%), 10%)

Ausgabe:

    rgba(128, 242, 13, 0.1) (hsla(90, 90%, 50%, 0.1))
###spin
Rotiert den Farbwert einer Farbe in eine Richtung. Es ist auch möglich Werte größer als 360 oder kleiner als 0 anzugeben. 720 wäre etwa das gleiche wie 360. Anzumerken ist, dass Farben zu RGB konvertiert werden wodurch der Farbton nicht beibehalten wird (Da der Farbton bei Farben ohne Sättigung keine Relevanz hat). Beispielsweise sollte man dies also nicht tun:

    @c: saturate(spin('#aaaaaa', 10), 10%);

Sondern dies:

    @c: spin(saturate('#aaaaaa', 10%), 10);

Farben werden immer als RGB Werte zurück gegeben, `spin` auf einen Grauwert anzuwenden wird also nichts verändern.

Parameter:

* `color`: Ein Farbobjekt
* `angle`: Eine Gradzahl um die rotiert werden soll (+ oder -)

Ausgabe: `color`

Beispiel:

    spin(hsl(10, 90%, 50%), 20)
    spin(hsl(10, 90%, 50%), -20)

Ausgabe:

    #f27f0d (hsl(30, 90%, 50%))
    #f20d33 (hsl(350, 90%, 50%))
###mix
Mixe zwei Farben in variablem Verhältnis. Auch Transparenz wird hier berücksichtigt.

Parameter:

* `color1`: Ein Farbobjekt
* `color1`: Ein Farbobjekt
* `weight`: Optional, eine Prozentangabe um die Gewichtung zwischen den Farben festzulegen. Default: 50

Ausgabe: `color`

Beispiel:

    mix(#ff0000, #0000ff, 50)
    mix(rgba(100,0,0,1.0), rgba(0,100,0,0.5), 50)

Ausgabe:

    #800080
    rgba(75, 25, 0, 0.75);
###greyscale
Entfernt alle Sättigungswerte von einer Farbe. Da die Sättigung allerdings nicht vom Farbton abhängt, könnten die Ergebnisse seltsam aussehen. `Luma` könnte also bessere Resultate liefern.

Parameter:

* `color`: Ein Farbobjekt

Ausgabe: `color`

Beispiel:

    greyscale(hsl(90, 90%, 50%))

Ausgabe:

    #808080 (hsl(90, 0%, 50%))
###contrast
Entscheidet welcher der beiden Werte einen höheren Kontrast bietet. Dies ist nützlich um sicher zu gehen, dass eine Farbe auf einem Hintergrund lesbar bleibt. Diese Funktion funktioniert genauso wie die [contrast Funktion in Compass für SASS](http://compass-style.org/reference/compass/utilities/color/contrast/). Im Einklang mit [WCAG 2.0](http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef) werden die Farben anhand ihres Luma Wertes und nicht anhand der Helligkeit verglichen.

Parameter:

* `color`: Ein Farbobjekt mit dem verglichen wird
* `dark`: Eine dunkle Farbe (Standard ist Schwarz).
* `light`: Eine helle Farbe (Standard ist Weiß).
* `threshold`: Eine Prozentzahl von 0-100% die festlegt, wann "dunkel" und wann "hell" verwendet wird (Standard ist 43%). Man sollte hier für helle Farbpaletten eher einen niedrigen Wert wählen, für dunkle einen höheren.

Ausgabe: `color`

Beispiel:

    contrast(#aaaaaa)
    contrast(#222222, #101010)
    contrast(#222222, #101010, #dddddd)
    contrast(hsl(90, 100%, 50%),#000000,#ffffff,40%);
    contrast(hsl(90, 100%, 50%),#000000,#ffffff,60%);

Ausgabe:

    #000000 (black)
    #ffffff (white)
    #dddddd
    #000000 (black)
    #ffffff (white)

##Farbmischungen
Diese Funktionen sind _ähnlich_ wie die, die man in Photoeditoren wie Photoshop, Firework oder GIMP findet. Sie können also dazu verwendet werden, dass die CSS Farben zu denen aus deinen Bildern passen.

###multiply
Multipliziert zwei Farben. Die RGB Kanäle der beiden Farben werden multipliziert und durch 255 geteilt. Das Ergebnis ist eine dunklere Farbe.

Parameter:

* `color1`: Ein Farbobjekt das multipliziert wird.
* `color2`: Ein Farbobjekt das multipliziert wird.

Ausgabe: `color`

Beispiele:

    multiply(#ff6600, #000000);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/000000/ffffff&text=000000)
![Color 3](http://placehold.it/100x40/000000/ffffff&text=000000)

    multiply(#ff6600, #333333);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/333333/ffffff&text=333333)
![Color 3](http://placehold.it/100x40/331400/ffffff&text=331400)

    multiply(#ff6600, #666666);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/666666/ffffff&text=666666)
![Color 3](http://placehold.it/100x40/662900/ffffff&text=662900)

    multiply(#ff6600, #999999);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/999999/ffffff&text=999999)
![Color 3](http://placehold.it/100x40/993d00/ffffff&text=993d00)

    multiply(#ff6600, #cccccc);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/cccccc/000000&text=cccccc)
![Color 3](http://placehold.it/100x40/cc5200/ffffff&text=cc5200)

    multiply(#ff6600, #ffffff);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/ffffff/000000&text=ffffff)
![Color 3](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)

    multiply(#ff6600, #ff0000);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/ff0000/ffffff&text=ff0000)
![Color 3](http://placehold.it/100x40/ff0000/ffffff&text=ff0000)

    multiply(#ff6600, #00ff00);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/00ff00/ffffff&text=00ff00)
![Color 3](http://placehold.it/100x40/006600/ffffff&text=006600)

    multiply(#ff6600, #0000ff);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/0000ff/ffffff&text=0000ff)
![Color 3](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)

###screen
Das Gegenteil von `multiply`. Das Ergebnis ist eine hellere Farbe.

Parameter:

* `color1`: Ein Farbobjekt auf das _screen_ angewendet wird.
* `color2`: Ein Farbobjekt auf das _screen_ angewendet wird.

Ausgabe: `color`

Beispiele:

    screen(#ff6600, #000000);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/000000/ffffff&text=000000)
![Color 3](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)

    screen(#ff6600, #333333);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/333333/ffffff&text=333333)
![Color 3](http://placehold.it/100x40/ff8533/ffffff&text=ff8533)

    screen(#ff6600, #666666);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/666666/ffffff&text=666666)
![Color 3](http://placehold.it/100x40/ffa366/ffffff&text=ffa366)

    screen(#ff6600, #999999);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/999999/ffffff&text=999999)
![Color 3](http://placehold.it/100x40/ffc299/000000&text=ffc299)

    screen(#ff6600, #cccccc);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/cccccc/000000&text=cccccc)
![Color 3](http://placehold.it/100x40/ffe0cc/000000&text=ffe0cc)

    screen(#ff6600, #ffffff);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/ffffff/000000&text=ffffff)
![Color 3](http://placehold.it/100x40/ffffff/000000&text=ffffff)

    screen(#ff6600, #ff0000);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/ff0000/ffffff&text=ff0000)
![Color 3](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)

    screen(#ff6600, #00ff00);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/999999/00ff00&text=00ff00)
![Color 3](http://placehold.it/100x40/ffff00/ffffff&text=ffff00)

    screen(#ff6600, #0000ff);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/999999/0000ff&text=0000ff)
![Color 3](http://placehold.it/100x40/ff66ff/000000&text=ff66ff)

###overlay
Kombiniert die Effekte von `multiply` und `screen`. Macht helle Kanäle heller und dunkle dunkler. **Anmerkung**: Relevant für die Entscheidung sind die Werte der ersten übergebenen Farbe.

Parameter:

* `color1`: Eine Farbe auf die overlay angewendet wird. Dies ist die entscheidende Farbe ob das Ergebnis heller oder dunkler wird.
* `color2`: Eine Farbe auf die overlay angewendet wird.

Ausgabe: `color`

Beispiele:

    overlay(#ff6600, #000000);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/000000/ffffff&text=000000)
![Color 3](http://placehold.it/100x40/ff0000/ffffff&text=ff0000)

    overlay(#ff6600, #333333);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/333333/ffffff&text=333333)
![Color 3](http://placehold.it/100x40/ff2900/ffffff&text=ff2900)

    overlay(#ff6600, #666666);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/666666/ffffff&text=666666)
![Color 3](http://placehold.it/100x40/ff5200/ffffff&text=ff5200)

    overlay(#ff6600, #999999);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/999999/ffffff&text=999999)
![Color 3](http://placehold.it/100x40/ff7a00/ffffff&text=ff7a00)

    overlay(#ff6600, #cccccc);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/cccccc/000000&text=cccccc)
![Color 3](http://placehold.it/100x40/ffa300/ffffff&text=ffa300)

    overlay(#ff6600, #ffffff);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/ffffff/000000&text=ffffff)
![Color 3](http://placehold.it/100x40/ffcc00/ffffff&text=ffcc00)

    overlay(#ff6600, #ff0000);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/ff0000/ffffff&text=ff0000)
![Color 3](http://placehold.it/100x40/ff0000/ffffff&text=ff0000)

    overlay(#ff6600, #00ff00);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/00ff00/ffffff&text=00ff00)
![Color 3](http://placehold.it/100x40/ffcc00/ffffff&text=ffcc00)

    overlay(#ff6600, #0000ff);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/0000ff/ffffff&text=0000ff)
![Color 3](http://placehold.it/100x40/ff0000/ffffff&text=ff0000)

###softlight
Ähnlich wie `overlay`, verhindert aber, dass reines Schwarz in reines Schwarz resultiert und reines Weiß in reines Weiß.

Parameter:

* `color1`: Eine Farbe auf die _softlight_ angewendet wird.
* `color2`: Eine Farbe auf die _softlight_ angewendet wird.

Ausgabe: `color`

Beispiele:

    softlight(#ff6600, #000000);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/000000/ffffff&text=000000)
![Color 3](http://placehold.it/100x40/ff2900/ffffff&text=ff2900)

    softlight(#ff6600, #333333);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/333333/ffffff&text=333333)
![Color 3](http://placehold.it/100x40/ff4100/ffffff&text=ff4100)

    softlight(#ff6600, #666666);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/666666/ffffff&text=666666)
![Color 3](http://placehold.it/100x40/ff5a00/ffffff&text=ff5a00)

    softlight(#ff6600, #999999);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/999999/ffffff&text=999999)
![Color 3](http://placehold.it/100x40/ff7200/ffffff&text=ff7200)

    softlight(#ff6600, #cccccc);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/cccccc/000000&text=cccccc)
![Color 3](http://placehold.it/100x40/ff8b00/ffffff&text=ff8b00)

    softlight(#ff6600, #ffffff);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/ffffff/000000&text=ffffff)
![Color 3](http://placehold.it/100x40/ffa300/ffffff&text=ffa300)

    softlight(#ff6600, #ff0000);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/ff0000/ffffff&text=ff0000)
![Color 3](http://placehold.it/100x40/ff2900/ffffff&text=ff2900)

    softlight(#ff6600, #00ff00);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/00ff00/ffffff&text=00ff00)
![Color 3](http://placehold.it/100x40/ffa300/ffffff&text=ffa300)

    softlight(#ff6600, #0000ff);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/0000ff/ffffff&text=0000ff)
![Color 3](http://placehold.it/100x40/ff2900/ffffff&text=ff2900)

###hardlight
Ähnlich wie `overlay`, nutzt aber die zweite Farbe um helle und dunkle Kanäle auszusuchen anstatt der Ersten.

Parameter:

* `color1`: Eine Farbe auf die _hardlight_ angewendet wird.
* `color2`: Eine Farbe auf die _hardlight_ angewendet wird. Dies ist die entscheidende Farbe ob das Ergebnis heller oder dunkler wird.

Ausgabe: `color`

Beispiele:

    hardlight(#ff6600, #000000);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/000000/ffffff&text=000000)
![Color 3](http://placehold.it/100x40/000000/ffffff&text=000000)

    hardlight(#ff6600, #333333);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/333333/ffffff&text=333333)
![Color 3](http://placehold.it/100x40/662900/ffffff&text=662900)

    hardlight(#ff6600, #666666);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/666666/ffffff&text=666666)
![Color 3](http://placehold.it/100x40/cc5200/ffffff&text=cc5200)

    hardlight(#ff6600, #999999);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/999999/ffffff&text=999999)
![Color 3](http://placehold.it/100x40/ff8533/ffffff&text=ff8533)

    hardlight(#ff6600, #cccccc);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/cccccc/000000&text=cccccc)
![Color 3](http://placehold.it/100x40/ff2900/ffffff&text=ff2900)

    hardlight(#ff6600, #ffffff);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/ffffff/000000&text=ffffff)
![Color 3](http://placehold.it/100x40/ffffff/000000&text=ffffff)

    hardlight(#ff6600, #ff0000);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/ff0000/ffffff&text=ff0000)
![Color 3](http://placehold.it/100x40/ff0000/ffffff&text=ff0000)

    hardlight(#ff6600, #00ff00);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/00ff00/ffffff&text=00ff00)
![Color 3](http://placehold.it/100x40/00ff00/ffffff&text=00ff00)

    hardlight(#ff6600, #0000ff);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/0000ff/ffffff&text=0000ff)
![Color 3](http://placehold.it/100x40/0000ff/ffffff&text=0000ff)

###difference
Subtrahiert die zweite Farbe von der Ersten. Die Operation wird auf den RGB Kanälen ausgeführt. Das Ergebnis ist eine dunklere Farbe.

Parameter:

* `color1`: Ein Farbobjekt das den Minuenden darstellt.
* `color2`: Ein Farbobjekt das den Subtrahenden darstellt.

Ausgabe: `color`

Beispiele:

    difference(#ff6600, #000000);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/000000/ffffff&text=000000)
![Color 3](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)

    difference(#ff6600, #333333);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/333333/ffffff&text=333333)
![Color 3](http://placehold.it/100x40/cc3333/ffffff&text=cc3333)

    difference(#ff6600, #666666);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/666666/ffffff&text=666666)
![Color 3](http://placehold.it/100x40/990066/ffffff&text=990066)

    difference(#ff6600, #999999);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/999999/ffffff&text=999999)
![Color 3](http://placehold.it/100x40/663399/ffffff&text=663399)

    difference(#ff6600, #cccccc);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/cccccc/000000&text=cccccc)
![Color 3](http://placehold.it/100x40/3366cc/ffffff&text=3366cc)

    difference(#ff6600, #ffffff);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/ffffff/000000&text=ffffff)
![Color 3](http://placehold.it/100x40/0099ff/ffffff&text=0099ff)

    difference(#ff6600, #ff0000);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/ff0000/ffffff&text=ff0000)
![Color 3](http://placehold.it/100x40/006600/ffffff&text=006600)

    difference(#ff6600, #00ff00);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/00ff00/ffffff&text=00ff00)
![Color 3](http://placehold.it/100x40/ff9900/ffffff&text=ff9900)

    difference(#ff6600, #0000ff);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/0000ff/ffffff&text=0000ff)
![Color 3](http://placehold.it/100x40/ff66ff/000000&text=ff66ff)

###exclusion
Ähnlicher Effekt wie `difference` mit niedrigerem Kontrast.

Parameter:

* `color1`: Ein Farbobjekt das den Minuenden darstellt.
* `color2`: Ein Farbobjekt das den Subtrahenden darstellt.

Ausgabe: `color`

Beispiele:

    exclusion(#ff6600, #000000);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/000000/ffffff&text=000000)
![Color 3](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)

    exclusion(#ff6600, #333333);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/333333/ffffff&text=333333)
![Color 3](http://placehold.it/100x40/cc7033/ffffff&text=cc7033)

    exclusion(#ff6600, #666666);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/666666/ffffff&text=666666)
![Color 3](http://placehold.it/100x40/997a66/ffffff&text=997a66)

    exclusion(#ff6600, #999999);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/999999/ffffff&text=999999)
![Color 3](http://placehold.it/100x40/668599/ffffff&text=668599)

    exclusion(#ff6600, #cccccc);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/cccccc/000000&text=cccccc)
![Color 3](http://placehold.it/100x40/338fcc/ffffff&text=338fcc)

    exclusion(#ff6600, #ffffff);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/ffffff/000000&text=ffffff)
![Color 3](http://placehold.it/100x40/0099ff/ffffff&text=0099ff)

    exclusion(#ff6600, #ff0000);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/ff0000/ffffff&text=ff0000)
![Color 3](http://placehold.it/100x40/006600/ffffff&text=006600)

    exclusion(#ff6600, #00ff00);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/00ff00/ffffff&text=00ff00)
![Color 3](http://placehold.it/100x40/ff9900/ffffff&text=ff9900)

    exclusion(#ff6600, #0000ff);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/0000ff/ffffff&text=0000ff)
![Color 3](http://placehold.it/100x40/ff66ff/000000&text=ff66ff)

###average
Berechnet den Durchschnitt von zwei Farben. Die Operation wird auf die RGB Kanäle angewendet.

Parameter:

* `color1`: Ein Farbobjekt
* `color2`: Ein Farbobjekt

Ausgabe: `color`

Beispiele:

    average(#ff6600, #000000);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/000000/ffffff&text=000000)
![Color 3](http://placehold.it/100x40/803300/ffffff&text=803300)

    average(#ff6600, #333333);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/333333/ffffff&text=333333)
![Color 3](http://placehold.it/100x40/994d1a/ffffff&text=994d1a)

    average(#ff6600, #666666);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/666666/ffffff&text=666666)
![Color 3](http://placehold.it/100x40/b36633/ffffff&text=b36633)

    average(#ff6600, #999999);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/999999/ffffff&text=999999)
![Color 3](http://placehold.it/100x40/cc804d/ffffff&text=cc804d)

    average(#ff6600, #cccccc);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/cccccc/000000&text=cccccc)
![Color 3](http://placehold.it/100x40/e69966/ffffff&text=e69966)

    average(#ff6600, #ffffff);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/ffffff/000000&text=ffffff)
![Color 3](http://placehold.it/100x40/ffb380/000000&text=ffb380)

    average(#ff6600, #ff0000);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/ff0000/ffffff&text=ff0000)
![Color 3](http://placehold.it/100x40/ff3300/ffffff&text=ff3300)

    average(#ff6600, #00ff00);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/00ff00/ffffff&text=00ff00)
![Color 3](http://placehold.it/100x40/80b300/ffffff&text=80b300)

    average(#ff6600, #0000ff);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/0000ff/ffffff&text=0000ff)
![Color 3](http://placehold.it/100x40/803380/ffffff&text=803380)

###negation
Das Gegenteil von `difference`. Das Ergebnis ist eine hellere Farbe.

Parameter:

* `color1`: Ein Farbobjekt das den Minuenden darstellt.
* `color2`: Ein Farbobjekt das den Subtrahenden darstellt.

Ausgabe: `color`

Beispiel:

    negation(#ff6600, #000000);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/000000/ffffff&text=000000)
![Color 3](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)

    negation(#ff6600, #333333);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/333333/ffffff&text=333333)
![Color 3](http://placehold.it/100x40/cc9933/ffffff&text=cc9933)

    negation(#ff6600, #666666);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/666666/ffffff&text=666666)
![Color 3](http://placehold.it/100x40/99cc66/ffffff&text=99cc66)

    negation(#ff6600, #999999);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/999999/ffffff&text=999999)
![Color 3](http://placehold.it/100x40/66ff99/ffffff&text=66ff99)

    negation(#ff6600, #cccccc);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/cccccc/000000&text=cccccc)
![Color 3](http://placehold.it/100x40/33cccc/ffffff&text=33cccc)

    negation(#ff6600, #ffffff);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/ffffff/000000&text=ffffff)
![Color 3](http://placehold.it/100x40/0099ff/ffffff&text=0099ff)

    negation(#ff6600, #ff0000);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/ff0000/ffffff&text=ff0000)
![Color 3](http://placehold.it/100x40/006600/ffffff&text=006600)

    negation(#ff6600, #00ff00);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/00ff00/ffffff&text=00ff00)
![Color 3](http://placehold.it/100x40/ff9900/ffffff&text=ff9900)

    negation(#ff6600, #0000ff);

![Color 1](http://placehold.it/100x40/ff6600/ffffff&text=ff6600)
![Color 2](http://placehold.it/100x40/0000ff/ffffff&text=0000ff)
![Color 3](http://placehold.it/100x40/ff66ff/ffffff&text=ff66ff)