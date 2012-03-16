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

Das würde also folgendes geben. Wie erwartet ist die .wrap Klasse nicht mehr vorhanden.

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

    spin(@color, 10);         // return a color with a 10 degree larger in hue than @color
    spin(@color, -10);        // return a color with a 10 degree smaller hue than @color

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

This is useful if you want to create a new color based on another color's channel, for example:

    @new: hsl(hue(@old), 45%, 90%);

`@new` will have `@old`'s *hue*, and its own saturation and lightness.

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
      filter: ~"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='image.png')";
    }

This is called an "escaped value", which will result in:

    .class {
      filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='image.png');
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


