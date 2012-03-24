(function () {
        if (/Microsoft/.test(navigator.appName)) { return }

        window.onload = function () {
          var headers = document.querySelectorAll('#docs h2, #guide h1');
          var menu = document.getElementById('menu');
          var init = menu.offsetTop;
          var docked;

          for (var i = 0; i < headers.length; i++) {
            headers[i].id = '-' + headers[i].innerHTML.toLowerCase().replace(/ /g, '-');
          }

          window.onscroll = function () {
            if (!docked && (menu.offsetTop - scrollTop() < 0)) {
              menu.style.top = 0;
              menu.style.position = 'fixed';
              menu.className = 'docked';
              docked = true;
            } else if (docked && scrollTop() <= init) {
              menu.style.position = 'absolute';
              menu.style.top = init + 'px';
              menu.className = menu.className.replace('docked', '');
              docked = false;
            }
          };


          (function () {
            var link     = document.getElementById('guide-link'),
                menu     = document.getElementById('menu'),
                dropdown = document.getElementById('dropdown');

            link.onmouseover = function () {
              link.className = 'dark-red';
              dropdown.style.display = 'block';
            };
            link.onmouseout = function (e) {
              if (e.relatedTarget === dropdown) { return }
              link.className = link.className.replace('dark-red', '');
              hide ();
            };
            dropdown.onmouseout = function (e) {
              var t = e.relatedTarget;

              if (e.target == link) { return }

              while (t !== document.body) {
                if (t == dropdown) { return }
                else               { t = t.parentNode }
              } 
              link.className = link.className.replace('dark-red', '');
              hide ();
            };

            function hide() { dropdown.style.display = 'none' }
          })();
        };
        function scrollTop() {
          return document.body.scrollTop || document.documentElement.scrollTop;
        }
      })();