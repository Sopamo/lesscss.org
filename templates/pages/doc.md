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

In trying to stay as close as possible to the declarative nature of CSS, LESS has opted to implement
conditional execution via **guarded mixins** instead of if/else statements, in the vein of `@media`
query feature specifications.
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

The full list of comparison operators usable in guards are: **`> >= = =< <`**. Additionally, the keyword `true`
is the only truthy value, making these two mixins equivalent:
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

Last but not least, you may use the **`and`** keyword to provide additional conditions inside a guard:
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

Notice the `&` combinator--it's used when you want a nested selector to be concatenated to its parent selector, instead
of acting as a descendant. This is especially important for pseudo-classes like `:hover` and `:focus`.

For example:

    .bordered {
      &.float {
        float: left; 
      }
      .top {
        margin: 5px; 
      }
    }

Will output

    .bordered.float {
      float: left;  
    }
    .bordered .top {
      margin: 5px;
    }

Operations
----------

Any number, color or variable can be operated on. Here are a couple of examples:

    @base: 5%;
    @filler: @base * 2;
    @other: @base + @filler;

    color: #888 / 4;
    background-color: @base-color + #111;
    height: 100% / 2 + @filler;

The output is pretty much what you expect—LESS understands the difference between colors and units. If a unit is used in an operation, like in:

    @var: 1px + 5;

LESS will use that unit for the final output—`6px` in this case.

Brackets are also authorized in operations:

    width: (@var + 5) * 2;

And are required in compound values:

    border: (@width * 2) solid black;

Color functions
---------------

LESS provides a variety of functions which transform colors. Colors are first converted to
the *HSL* color-space, and then manipulated at the channel level:

    lighten(@color, 10%);     // return a color which is 10% *lighter* than @color
    darken(@color, 10%);      // return a color which is 10% *darker* than @color

    saturate(@color, 10%);    // return a color 10% *more* saturated than @color
    desaturate(@color, 10%);  // return a color 10% *less* saturated than @color

    fadein(@color, 10%);      // return a color 10% *less* transparent than @color
    fadeout(@color, 10%);     // return a color 10% *more* transparent than @color
    fade(@color, 50%);        // return @color with 50% transparency

    spin(@color, 10);         // return a color with a 10 degree larger in hue than @color
    spin(@color, -10);        // return a color with a 10 degree smaller hue than @color

    mix(@color1, @color2);    // return a mix of @color1 and @color2

Using them is pretty straightforward:

    @base: #f04615;

    .class {
      color: saturate(@base, 5%);
      background-color: lighten(spin(@base, 8), 25%);
    }

You can also extract color information:

    hue(@color);        // returns the `hue` channel of @color
    saturation(@color); // returns the `saturation` channel of @color
    lightness(@color);  // returns the 'lightness' channel of @color
    alpha(@color);      // returns the 'alpha' channel of @color

This is useful if you want to create a new color based on another color's channel, for example:

    @new: hsl(hue(@old), 45%, 90%);

`@new` will have `@old`'s *hue*, and its own saturation and lightness.

Math functions
--------------

LESS provides a couple of handy math functions you can use on number values:

    round(1.67); // returns `2`
    ceil(2.4);   // returns `3`
    floor(2.6);  // returns `2`

If you need to turn a value into a percentage, you can do so with the `percentage` function:

    percentage(0.5); // returns `50%`

Namespaces
----------

Sometimes, you may want to group your variables or mixins, for organizational purposes, or just to offer some encapsulation.
You can do this pretty intuitively in LESS—say you want to bundle some mixins and variables under `#bundle`, for later re-use, or for distributing:

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

Now if we want to mixin the `.button` class in our `#header a`, we can do:

    #header a {
      color: orange;
      #bundle > .button;
    }

Scope
-----

Scope in LESS is very similar to that of programming languages. Variables and mixins are first looked up locally,
and if they aren't found, the compiler will look in the parent scope, and so on.

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

Comments
--------

CSS-style comments are preserved by LESS:

    /* Hello, I'm a CSS-style comment */
    .class { color: black }

Single-line comments are also valid in LESS, but they are 'silent',
they don't show up in the compiled CSS output:

    // Hi, I'm a silent comment, I won't show up in your CSS
    .class { color: white }

Importing
---------

You can import `.less` files, and all the variables and mixins in them will be made available to the main file.
The `.less` extension is optional, so both of these are valid:

    @import "lib.less";
    @import "lib";

If you want to import a CSS file, and don't want LESS to process it, just use the `.css` extension:

    @import "lib.css";

The directive will just be left as is, and end up in the CSS output.

String interpolation
--------------------

Variables can be embeded inside strings in a similar way to ruby or PHP, with the `@{name}` construct:

    @base-url: "http://assets.fnord.com";
    background-image: url("@{base-url}/images/bg.png");

Escaping
--------

Sometimes you might need to output a CSS value which is either not valid CSS syntax,
or uses proprietary syntax which LESS doesn't recognize.

To output such value, we place it inside a string prefixed with `~`, for example:

    .class {
      filter: ~"ms:alwaysHasItsOwnSyntax.For.Stuff()";
    }

This is called an "escaped value", which will result in:

    .class {
      filter: ms:alwaysHasItsOwnSyntax.For.Stuff();
    }

JavaScript evaluation
---------------------

JavaScript expressions can be evaluated as values inside .less files. This is done by wrapping the expression
with back-ticks:

    @var: `"hello".toUpperCase() + '!'`;

Becomes:

    @var: "HELLO!";

Note that you may also use interpolation and escaping as with strings:

    @str: "hello";
    @var: ~`"@{str}".toUpperCase() + '!'`;

Becomes:

    @var: HELLO!;

It is also possible to access the JavaScript environment:

    @height: `document.body.clientHeight`;

If you want to parse a JavaScript string as a hex color, you may use the `color` function:

    @color: color(`window.colors.baseColor`);
    @darkcolor: darken(@color, 10%);
