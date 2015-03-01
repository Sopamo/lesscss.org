<div style="text-align:center;margin-top: 0px;margin-bottom: 20px;">
Werbung<br>
<!-- BEGIN PARTNER PROGRAM - DO NOT CHANGE THE PARAMETERS OF THE HYPERLINK -->
<script language="javascript" type="text/javascript" src="http://banners.webmasterplan.com/view.asp?ref=624865&site=9192&type=html&hnb=1&js=1"></script>
<noscript><a href="http://partners.webmasterplan.com/click.asp?ref=624865&site=9192&type=b1&bnb=1" target="_blank">
<img src="http://banners.webmasterplan.com/view.asp?ref=624865&site=9192&b=1" border="0" title="Leaderboard / Super Banner (728 x 90)" alt="Leaderboard / Super Banner (728 x 90)"/></a><br /></noscript>
<!-- END PARTNER PROGRAM -->
</div>

Client-seitige Verwendung
=========================

Die Client-seitige Verwendung ist der einfachste Weg um loszulegen und gut für die Entwicklung. Für die Produktivumgebung, besonders wenn Performance wichtig ist, empfehlen wir LESS mit node oder einem der vielen third party Tools zu kompilieren.

Binde deine `.less` Stylesheets mit dem `rel Attribut` "`stylesheet/less`" ein:

    <link rel="stylesheet/less" type="text/css" href="styles.less">

Lade anschließend die `less.js` Datei herunter (du findest sie ganz oben auf der Seite) und binde sie im `<head>` Bereich deiner Seite ein:

    <script src="less.js" type="text/javascript"></script>

Achte darauf deine Stylesheets *vor* dem Script einzubinden.

Watch mode
----------

Der *Watch mode* ist eine Client-seitiges Feature mit dem deine LESS Dateien automatisch neu geladen werden wenn du sie änderst.

Zum aktivieren hänge '`#!watch`' an die URL an und lade die Seite neu. Alternativ kannst du auch `less.watch()` in der Konsole aufrufen.

Server-seitige Verwendung
=========================

Installation
------------

[npm](http://github.com/isaacs/npm), die Node Paketverwaltung ist der einfachste Weg LESS auf deinem Server zu installieren:

    $ npm install less

Verwendung mit der Kommandozeile
--------------------------------

Sobald du LESS installiert hast, kannst du den Compiler in Node aufrufen:

    $ lessc styles.less

Dies wird den das kompilierte CSS an `stdout` zurückgeben. Du kannst es dann an einen Datei deiner Wahl weiter leiten:

 $ lessc styles.less > styles.css

Um komprimiertes CSS auszugeben, übergib einfach die `-x` Option. Außerdem ist auch der [YUI CSS Compressor](http://developer.yahoo.com/yui/compressor/css.html) verfügbar, der mit `--yui-compress` aktiviert werden kann.

Um alle Optionen anzuzeigen, rufe lessc ohne Parameter auf.

Verwendung im Code
------------------

Du kannst den Kompiler von Node aus aufrufen:
    
    less.render('.class { width: 1 + 1 }', function (e, css) {
        console.log(css);
    });

Das ergibt:

    .class {
      width: 2;
    }

Du kannst den Parser und Compiler auch einzeln aufrufen:

    var parser = new(less.Parser);

    parser.parse('.class { width: 1 + 1 }', function (err, tree) {
        if (err) { return console.error(err) }
        console.log(tree.toCSS());
    });

Konfiguration
-------------

Du kannst dem Compiler außerdem einige Einstellungen mitgeben:

    var parser = new(less.Parser)({
        paths: ['.', './lib'], // Den Suchpfad für @import festlegen
        filename: 'style.less' // Für schönere Fehlermeldungen einen Dateinamen festlegen
    });

    parser.parse('.class { width: 1 + 1 }', function (e, tree) {
        tree.toCSS({ compress: true }); // CSS komprimieren
    });

Third Party Tools
=================

Es gibt eine Menge an Programmen die im Github wiki genauer beschrieben sind:

<a href="https://github.com/cloudhead/less.js/wiki/Command-Line-use-of-LESS">Kommandozeilen Tools</a>

<a href="https://github.com/cloudhead/less.js/wiki/GUI-compilers-that-use-LESS.js">GUI Tools</a>