
const form_id = 'login-form';

document.getElementById(form_id).onsubmit = function() {

    // this object exchanges data with the server behind the scenes
    let xhttp = new XMLHttpRequest();

    const url = 'http://localhost:3000/account/login';
    const method = 'POST';

    // get the form data and convert it to JSON 
    const formData = new FormData(document.getElementById(form_id));
    const object = {};
    formData.forEach((value, key) => object[key] = value);
    const jsonData = JSON.stringify(object);

    // this function is called when the readyState property changes
    // in our case, code 4 means that the request has finished and the response is ready
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            clearErrorArea();
            location.href = '/blog/home';
        }
        else if(this.status === 400) {
            clearErrorArea();
            error_handler(this.responseText);
        }
    }

    // send request to the server containing the form data in json form
    xhttp.open(method, url);
    xhttp.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xhttp.send(jsonData);
    
    return false;
}

function clearErrorArea() {
    let errorAreas = ['username-error-msg', 'password-error-msg'];
    for(index in errorAreas) {
        let errorArea = document.getElementById(errorAreas[index]);
        errorArea.innerHTML = '';
    }
}

function error_handler(text) {

    let field_id = '';
    let msg = '';

    if(text === 'incorrect username') {
        field_id = 'username-error-msg';        
    }
    else if(text === 'incorrect password') {
        field_id = 'password-error-msg'
    }
    let error_field = document.getElementById(field_id);
    error_field.innerHTML = text;
    error_field.style.color = 'rgb(255, 0, 0)';
}