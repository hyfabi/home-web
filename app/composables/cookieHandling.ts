
function setCookie(name: string, value : object) {
    setCookie(name, value, 400)
}

function setCookie(name: string, value : object, days: number) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

// Usage
//setCookie('user', JSON.stringify({ id: 1, name: 'John' }), 7);

function getCookie(name : string) :string | undefined {
    return document.cookie
        .split('; ')
        .find(row => row.startsWith(name + '='))
        ?.split('=')[1];
}

//const user = JSON.parse(decodeURIComponent(getCookie('user')));