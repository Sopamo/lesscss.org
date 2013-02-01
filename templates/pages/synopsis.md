<div style="text-align:center;margin-top: 10px;margin-bottom: 10px;>
Werbung<br>
<script type="text/javascript" src="http://banners.webmasterplan.com/view.asp?ref=624865&js=1&site=5938&b=7&target=_blank&title=STRATO+LivePages+-+jetzt+bestellen!" ></script><noscript><a href="http://partners.webmasterplan.com/click.asp?ref=624865&site=5938&type=b7&bnb=7" target="_blank">
<img src="http://banners.webmasterplan.com/view.asp?ref=624865&site=5938&b=7" border="0" alt="STRATO LivePages - jetzt bestellen!" width="468" height="60" /></a><br /></noscript>
</div>

Variablen
---------

Mit Variablen kannst du oft gebrauchte Werte an einer zentralen Stelle definieren und sie dann überall in deiner CSS Datei verwenden. Somit musst du bei globalen Änderungen nur noch eine einzige Zeile ändern.

<table class="code-example" cellpadding="0">
  <tr><td>
  <pre class="less-example">
  <code>// LESS

@color: #4D926F;

#header {
  color: @color;
}
h2 {
  color: @color;
}</code></pre>
  </td><td>
  <pre class="css-output"><code>/* Generiertes CSS */

#header {
  color: #4D926F;
}
h2 {
  color: #4D926F;
}</code></pre></td>
  </tr>
</table>
		
Mixins
------

Mit Mixins kannst du alle Werte einer Klasse an eine andere Klasse übergeben. Dafür musst du nur den Namen der Klasse angeben. Das Prinzip ist ähnlich wie bei Variablen, jedoch auf ganze Klassen erweitert. Mixins können sich auch wie Funktionen verhalten, also Parameter akzeptieren. Ein Beispiel:

<table class="code-example" cellpadding="0">
  <tr><td>
  <pre class="less-example"><code>// LESS

.rounded-corners (@radius: 5px) {
  border-radius: @radius;
  -webkit-border-radius: @radius;
  -moz-border-radius: @radius;
}

#header {
  .rounded-corners;
}
#footer {
  .rounded-corners(10px);
}</code></pre></td>

<td>
  <pre class="css-output"><code>/* Generiertes CSS */

#header {
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
}
#footer {
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
}</code></pre>
  </td></tr>
</table>

Verschachtelung
------------

Anstatt lange Selektoren zu schreiben um Vererbungen zu erzeugen, kannst du in LESS einfach Selektoren ineinander verschachteln. Dadurch wird die Struktur klarer und du hast weniger zu tippen.

<table class="code-example" cellpadding="0">
  <tr><td>
  <pre class="less-example">
<code>// LESS

#header {
  h1 {
    font-size: 26px;
    font-weight: bold;
  }
  p { font-size: 12px;
    a { text-decoration: none;
      &:hover { border-width: 1px }
    }
  }
}

</code></pre></td>

<td>
  <pre class="css-output"><code>/* Generiertes CSS */

#header h1 {
  font-size: 26px;
  font-weight: bold;
}
#header p {
  font-size: 12px;
}
#header p a {
  text-decoration: none;
}
#header p a:hover {
  border-width: 1px;
}

</code></pre>
  </td></tr>
</table>
		
Funktionen & Operatoren
----------------------

Hängen manche Elemente in deiner CSS Datei mit anderen zusammen?
Mit Operatoren kannst du Werte und Farben addieren, subtrahieren, dividieren und multiplizieren. Dadurch kannst du komplexe Zusammenhänge innerhalb deiner CSS Datei erstellen.
Funktionen funktionieren genauso wie in JavaScript. Dadurch kannst du die Werte genau so manipulieren wie du möchtest.

<table class="code-example" cellpadding="0">
  <tr><td>
  <pre class="less-example">
<code>// LESS

@the-border: 1px;
@base-color: #111;
@red:        #842210;

#header {
  color: (@base-color * 3);
  border-left: @the-border;
  border-right: (@the-border * 2);
}
#footer { 
  color: (@base-color + #003300);
  border-color: desaturate(@red, 10%);
}

</code></pre></td>

<td>
  <pre class="css-output"><code>/* Generiertes CSS */

#header {
  color: #333;
  border-left: 1px;
  border-right: 2px;
}
#footer { 
  color: #114411;
  border-color: #7d2717;
}

</code></pre>
  </td></tr>
</table>

