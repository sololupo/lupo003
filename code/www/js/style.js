
    (function() {
        var path = '//easy.myfonts.net/v2/js?sid=197656(font-family=Tumbly)&key=kYtQ8mJgbn',
            protocol = ('https:' == document.location.protocol ? 'https:' : 'http:'),
            trial = document.createElement('script');
        trial.type = 'text/javascript';
        trial.async = true;
        trial.src = protocol + path;
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(trial);
    })();
