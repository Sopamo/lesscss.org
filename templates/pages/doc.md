LESS ist eine Erweiterung für CSS und ist deswegen nicht nur Abwärtskompatibel, sondern die zusätzlichen Features nutzen <em>ebenso</em> CSS Syntax. Dadurch wird das Lernen von LESS ein <em>Kinderspiel</em>. Und notfalls kann man immer noch CSS verwenden.

Variablen
---------

Das ist so ziemlich selbsterklärend:

    @nice-blue: #5B83AD;
    @light-blue: @nice-blue + #111;

    #header { color: @light-blue; }

Wird zu:

    #header { color: #6c94be; }

Es ist außerdem möglich Variablen mit einem variablen Namen zu definieren:

    @fnord: "Ich bin fnord.";
    @var: 'fnord';
    content: @@var;

Wird umgewandelt zu:

    content: "Ich bin fnord.";

Denk daran, dass Variablen in LESS eigentlich Konstanten sind. Daher können sie nur einmal definiert werden.

Mixins
------

In LESS können Attribute einer Klasse ganz einfach einer anderen übergeben werden.
Wenn wir beispielsweise folgende Klasse nehmen:

    .bordered {
      border-top: dotted 1px black;
      border-bottom: solid 2px black;
    }

Wenn wir diese Attribute nun in einer anderen Klasse verwenden möchten, fügen wir einfach den Namen
der Klasse deren Attribute wir übernehmen möchten ein:

    #menu a {
      color: #111;
      .bordered;
    }
    .post a {
      color: red;
      .bordered;
    }

Die Werte der `.bordered` Klasse tauchen nun wie durch Magie in `#menu a` und `.post a` auf:

    #menu a {
      color: #111;
      border-top: dotted 1px black;
      border-bottom: solid 2px black;
    }
    .post a {
      color: red;
      border-top: dotted 1px black;
      border-bottom: solid 2px black;
    }

Jede beliebige CSS *Klasse*, *id* oder *element* kann so verwendet werden.

Mixins mit Parametern
-----------------

LESS bietet eine spezielle Art CSS Regeln zu definieren. Sie können genauso wie Klassen eingesetzt werden, akzeptieren allerdings auch Parameter. Hier ein Beispiel:

    .border-radius (@radius) {
      border-radius: @radius;
      -moz-border-radius: @radius;
      -webkit-border-radius: @radius;
    }

Und so werden sie eingesetzt:

    #header {
      .border-radius(4px);
    }
    .button {
      .border-radius(6px);  
    }

Es können auch Standardwerte vorgegeben werden:

    .border-radius (@radius: 5px) {
      border-radius: @radius;
      -moz-border-radius: @radius;
      -webkit-border-radius: @radius;
    }

Der Aufruf sieht dann so aus:

    #header {
      .border-radius;  
    }

Und wird einen 5px border-radius einfügen.

Wenn man einen Mixin ohne Parameter definiert, wird die Klasse nicht im fertigen CSS auftauchen, man kann sie allerdings wie gewohnt in LESS einsetzen.

    .wrap () {
      text-wrap: wrap;
      white-space: pre-wrap;
      white-space: -moz-pre-wrap;
      word-wrap: break-word;
    }

    pre { .wrap }

Das würde also folgendes ausgeben. Wie erwartet ist die .wrap Klasse nicht mehr vorhanden.

    pre {
      text-wrap: wrap;
      white-space: pre-wrap;
      white-space: -moz-pre-wrap;
      word-wrap: break-word;
    }

### Die Variable `@arguments`

`@arguments` hat innerhalb von Mixins eine besondere Bedeutung. Die Variable enthält alle Parameter die beim Aufruf des Mixins mitgegeben wurden. Das ist sehr nützlich wenn man sich nicht um jeden einzelnen Parameter kümmern möchte:

    .box-shadow (@x: 0, @y: 0, @blur: 1px, @color: #000) {
      box-shadow: @arguments;
      -moz-box-shadow: @arguments;
      -webkit-box-shadow: @arguments;
    }
    .box-shadow(2px, 5px);

Das ergibt dann:

      box-shadow: 2px 5px 1px #000;
      -moz-box-shadow: 2px 5px 1px #000;
      -webkit-box-shadow: 2px 5px 1px #000;
      
## Pattern-matching und Guards

Manchmal möchte man das Verhalten eines Mixins anhand der übergebenen Parameter verändern.
Zum Einstieg ein einfaches Beispiel:

    .mixin (@s, @color) { ... }

    .class {
      .mixin(@switch, #888);
    }

Wenn wir nun möchten, dass sich `.mixin` je nach Inhalt der Variable `@switch` unterschiedlich verhält, können wir `.mixin` wie folgt definieren:

    .mixin (dark, @color) {
      color: darken(@color, 10%);
    }
    .mixin (light, @color) {
      color: lighten(@color, 10%);
    }
    .mixin (@_, @color) {
      display: block;
    }

Wenn wir anschließend folgendes schreiben:

    @switch: light;

    .class {
      .mixin(@switch, #888);
    }

Erhalten wir dieses CSS:

    .class {
      color: #a2a2a2;
      display: block;
    }

Hier wurde die Farbe, die `.mixin` übergeben wurde wie erwartet aufgehellt. Wenn der Inhalt von `@switch` `dark` gewesen wäre, hätten wir eine dunklere Farbe erhalten.

Das erklärt sich folgendermaßen:

- Die erste Definition von `.mixin` wurde nicht aufgerufen, weil sie `dark` als erstes Argument erwartet hat.
- Die zweite Definiton wurde aufgerufen, da sie `light` erwartet hat.
- Die dritte `.mixin` Definition wurde ebenfalls aufgerufen, da sie einen beliebigen Parameter akzeptiert.

Es ist auch möglich die Anzahl der Variablen zu prüfen:

    .mixin (@a) {
      color: @a;
    }
    .mixin (@a, @b) {
      color: fade(@a, @b);
    }

Wenn wir `.mixin` nun mit einem einzelnen Parameter aufrufen, wird die erste Definition verwendet. Bei *zwei* Parametern wie erwartet die zweite Definition.

### Guards

Guards sind nützlich wenn man mathematische Vergleiche nutzen möchte. Wenn du bereits mit funktionalem programmieren vertraut bist wird das für dich nichts Neues sein. 

Um so nah wie möglich an der deklarativen Natur von CSS zu bleiben, verwendet LESS **guarded mixins** anstatt von if/else Anweisungen um zwischen Anweisungen zu unterscheiden.
Wir haben hier also eine Ähnliche Syntax wie die `@media` Anweisung.

Hier ein Beispiel:

    .mixin (@a) when (lightness(@a) >= 50%) {
      background-color: black;
    }
    .mixin (@a) when (lightness(@a) < 50%) {
      background-color: white;
    }
    .mixin (@a) {
      color: @a;
    }

Das Besondere ist das Schlüsselwort **`when`**. Es leitet eine Guard-Anweisung ein. Wenn wir nun folgenden Code schreiben:

    .class1 { .mixin(#ddd) }
    .class2 { .mixin(#555) }


Erhalten wir dieses Ergebnis:

    .class1 {
      background-color: black;
      color: #ddd;
    }
    .class2 {
      background-color: white;
      color: #555;
    }

Hier eine komplette Liste von Vergleichsoperatoren die in Guards verwendet werden können: **`> >= = =< <`**
Alle Werte außer `true` sind ungleich `true`. Wenn wir also diese Guards verwenden:

    .truth (@a) when (@a) { ... }
    .truth (@a) when (@a = true) { ... }

Dann werden die Mixins nur aufgerufen wenn als Parameter `true` übergeben wird.

    .class {
      .truth(40); // Passt auf keines der Mixins oben
    }

Mehrere Guards werden mit einem Komma '`,`' getrennt. Wenn einer der Guards true zurückgibt, wird das Mixin aufgerufen.

    .mixin (@a) when (@a > 10), (@a < -10) { ... }

Es ist auch möglich Parameter untereinander zu vergleichen. Auch andere Variablen können verwendet werden:

    @media: mobile;

    .mixin (@a) when (@media = mobile) { ... }
    .mixin (@a) when (@media = desktop) { ... }

    .max (@a, @b) when (@a > @b) { width: @a }
    .max (@a, @b) when (@a < @b) { width: @b }

Es ist außerdem möglich den Typ der Parameter zu prüfen. Dafür werden die *is\** Funktionen verwendet:

    .mixin (@a, @b: 0) when (isnumber(@b)) { ... }
    .mixin (@a, @b: black) when (iscolor(@b)) { ... }

Die die verfügbaren Funktionen:

- `iscolor`
- `isnumber`
- `isstring`
- `iskeyword`
- `isurl`

Man kann auch auf die Einheit des übergebenen Wertes prüfen:

- `ispixel`
- `ispercentage`
- `isem`

Nicht zuletzt kannst du das Schlüsselwort **`and`** verwenden um mehrere Bedingungen innerhalb eines Guards zu prüfen:

    .mixin (@a) when (isnumber(@a)) and (@a > 0) { ... }

Und **`not`** um Bedingungen zu verneinen:

    .mixin (@b) when not (@b > 0) { ... }

Verschachtelte Regeln
------------

Mit LESS kann man neben dem üblichen `cascading` auch *nesting* - also das Verschachteln von Regeln - einsetzen. So kann man etwa das folgende CSS...

    #header { color: black; }
    #header .navigation {
      font-size: 12px;
    }
    #header .logo { 
      width: 300px; 
    }
    #header .logo:hover {
      text-decoration: none;
    }

... in LESS so schreiben:

    #header {
      color: black;

      .navigation {
        font-size: 12px;
      }
      .logo {
        width: 300px;
        &:hover { text-decoration: none }
      }
    }

Oder so:

    #header        { color: black;
      .navigation  { font-size: 12px }
      .logo        { width: 300px;
        &:hover    { text-decoration: none }
      }
    }

The resulting code is more concise, and mimics the structure of your `DOM tree`.
Dadurch ist der Code kompakter und gleicht der Struktur des `Dom trees`-

Wichtig ist hier der `&` Kombinator. Er wird als Platzhalter für das Elternelement verwendet. Das ist besonders für Pseudoklassen wie `:hover` und `:focus` praktisch.

Hier ein Beispiel:

    .bordered {
      &.float {
        float: left; 
      }
      .top {
        margin: 5px; 
      }
    }

Das ergibt:

    .bordered.float {
      float: left;  
    }
    .bordered .top {
      margin: 5px;
    }

Berechnungen
----------

Es kann mit jeder Zahl, Farbe oder Variable gerechnet werden. Hier einige Beispiele:

    @base: 5%;
    @filler: @base * 2;
    @other: @base + @filler;

    color: #888 / 4;
    background-color: @base-color + #111;
    height: 100% / 2 + @filler;

Das Ergebnis ist genau so wie wir es erwarten - LESS versteht den Unterschied zwischen Farben und Einheiten. Wenn eine Einheit in einer Berechnung enthalten ist, wird LESS sie beibehalten:

    @var: 1px + 5;

Wir erhalten also `6px`.

Auch Klammern können verwendet werden:

    width: (@var + 5) * 2;

In zusammengesetzten Werten sind sie Pflicht:

    border: (@width * 2) solid black;

Farbfunktionen
---------------

LESS bietet eine Vielzahl an Funktionen um Farben zu verändern. Intern werden die Farben zum *HSL*-Farbraum konvertiert. Anschließend werden die Kanäle manipuliert:

    lighten(@color, 10%);     // Eine 10% *hellere* Farbe als @color
    darken(@color, 10%);      // Eine 10% *dunklere* Farbe als @color

    saturate(@color, 10%);    // Ergibt eine Farbe mit 10% *höherer* Sättigung
    desaturate(@color, 10%);  // Ergibt eine Farbe mit 10% *niedrigerer* Sättigung

    fadein(@color, 10%);      // Ergibt eine Farbe mit 10% *niedrigerer* Transparenz
    fadeout(@color, 10%);     // Ergibt eine Farbe mit 10% *höherer* Transparenz
    fade(@color, 50%);        // Ergibt @color mit 50% Transparenz

    spin(@color, 10);         // Ergibt eine Farbe mit 10 Grad nach *oben* verschobenem Farbton
    spin(@color, -10);        // Ergibt eine Farbe mit 10 Grad nach *unten* verschobenem Farbton

    mix(@color1, @color2);    // Ein Mix aus @color1 und @color2

Die Verwendung ist unkompliziert:

    @base: #f04615;

    .class {
      color: saturate(@base, 5%);
      background-color: lighten(spin(@base, 8), 25%);
    }

Du kannst auch ganz einfach Farbinformationen extrahieren:

    hue(@color);        // Ergibt den `Farbton` von @color
    saturation(@color); // Ergibt die `Sättigung` von @color
    lightness(@color);  // Ergibt die `Helligkeit` von @color
    alpha(@color);      // Ergibt den `Alpha Kanal` - als die Transparenz - von @color

Das ist besonders nützlich, wenn du eine neue Farbe anhand von verschiedenen anderen Farben erstellen möchtest:

    @new: hsl(hue(@old), 45%, 90%);

`@new` hat somit `@old`s *Farbton* und seine eigene Sättigung und Helligkeit.

Mathematische Funktionen
--------------

LESS bietet einige mathematischen Funktionen mit denen du Zahlenwerte berechnen kannst:

    round(1.67); // Ergibt `2`
    ceil(2.4);   // Ergibt `3`
    floor(2.6);  // Ergibt `2`

Wenn du einen Wert in eine Prozentzahl umwandeln möchtest kannst du die `percentage` Funktion verwenden:

    percentage(0.5); // Ergibt `50%`

Namensräume - bekannt als `Namespaces`
----------

Manchmal ist es sinnvoll deine Variablen und Mixins zu gruppieren. Das sorgt für bessere Organisation und Abkapselung.
Das Ganze ist recht intuitiv. Wenn du einige Mixins und Variablen unter `#bundle` gruppieren möchtest geht das so:

    #bundle {
      .button () {
        display: block;
        border: 1px solid black;
        background-color: grey;
        &:hover { background-color: white }
      }
      .tab { ... }
      .citation { ... }
    }

Wenn wir nun `.button` zu `#header a` hinzufügen möchten schreiben wir folgendes:

    #header a {
      color: orange;
      #bundle > .button;
    }

Geltungsbereich
-----

Der Geltungsbereich in LESS funktioniert so wie in Programmiersprachen. Zuerst werden Variablen und Mixins lokal gesucht und falls sie nicht gefunden werden im nächst höheren Geltungsbereich.

    @var: red;

    #page {
      @var: white;
      #header {
        color: @var; // white
      }
    }

    #footer {
      color: @var; // red
    }

Kommentare
--------

Die üblichen CSS Kommentare bleiben in LESS erhalten.

    /* Ich bin ein CSS Kommentar */
    .class { color: black }

In LESS können auch einzeilige Kommentare verwendet werden. Sie erscheinen allerdings nicht im fertigen CSS.

    // Hi, I'm a silent comment, I won't show up in your CSS
    .class { color: white }

Importieren
---------

Du kannst `.less` Dateien importieren. Dadurch sind dann alle Variablen und Mixins verfügbar.
Die Erweiterung `.less` ist optional:

    @import "lib.less";
    @import "lib";

Dateien mit der Erweiterung `.css` rührt der LESS Parser nicht an.

    @import "lib.css";

Dadurch wird der CSS Code aus der lib.css einfach in die aktuelle Datei eingefügt.

String interpolation
--------------------

Variablen können, ähnlich wie bei ruby oder PHP, in Strings eingebaut werden. Dafür gibt es das `@{name}` Konstrukt:

    @base-url: "http://assets.fnord.com";
    background-image: url("@{base-url}/images/bg.png");

Escapen
--------

Manchmal braucht man CSS welches entweder kein valides CSS ist, oder welches LESS nicht erkennen kann.
Solche Werte kann man ausgeben indem man sie mit einem `~`beginnen lässt:

    .class {
      filter: ~"ms:alwaysHasItsOwnSyntax.For.Stuff()";
    }

Das Ergebnis ist dann:

    .class {
      filter: ms:alwaysHasItsOwnSyntax.For.Stuff();
    }

JavaScript
---------------------

JavaScript expressions can be evaluated as values inside .less files. This is done by wrapping the expression
with back-ticks:
Auch JavaScript kann in LESS verwendet werden. Dazu muss man den Ausdruck in Backticks "\`" setzen.

    @var: `"hallo".toUpperCase() + '!'`;

Wird zu:

    @var: "HALLO!";

Es ist auch möglich Interpolation und Escapen gleichzeitig zu verwenden:

    @str: "hello";
    @var: ~`"@{str}".toUpperCase() + '!'`;

Wird zu:

    @var: HELLO!;

Du kannst sogar auf die JavaScript Objekte wie `document` zugreifen!

    @height: `document.body.clientHeight`;

If you want to parse a JavaScript string as a hex color, you may use the `color` function:
Wenn du einen JavaScript string in 

    @color: color(`window.colors.baseColor`);
    @darkcolor: darken(@color, 10%);
