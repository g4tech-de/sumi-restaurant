function jump(id) {
    window.location.hash = id;
    history.replaceState({}, document.title, window.location.href.substr(0, window.location.href.indexOf('#')));
}