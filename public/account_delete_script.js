
document.getElementById('positive-delete-button').onclick = function() {

    let xhttp = new XMLHttpRequest();

    const method = 'DELETE';
    const url = 'http://localhost:3000/account/delete';

    xhttp.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            location.href = '/';
        }
        else if (this.status === 400) {
            console.log(this.responseText);
        }
    };

    xhttp.open(method, url);
    xhttp.send();
};

document.getElementById('negative-delete-button').onclick = function() {
    location.href = '/blog/settings';
}