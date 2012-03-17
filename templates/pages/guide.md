Client-seitige Verwendung
=================

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
=================

Installation
------------

[npm](http://github.com/isaacs/npm), die Node Paketverwaltung ist der einfachste Weg LESS auf deinem Server zu installieren:

    $ npm install less

Verwendung
---

Sobald du LESS installiert hast, kannst du den Compiler in Node aufrufen:

    var less = require('less');
    
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

Verwendung in der Kommandozeile
------------------

LESS hat auch eine binary mit der du den Compiler von der Kommandozeile aus aufrufen kannst:

    $ lessc styles.less

Das übergibt das fertige CSS an `stdout`. Du kannst es dann an eine beliebige Datei weiterleiten.

    $ lessc styles.less > styles.css

Um komprimiertes CSS zu erhalten übergebe einfach die `-x`Option. Für eine erweiterte Komprimierung steht auch der [YUI CSS Compressor](http://developer.yahoo.com/yui/compressor/css.html) über die `--yui-compress` Option zur Verfügung.
