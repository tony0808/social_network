
const form_id = 'signup-form';

document.getElementById(form_id).onsubmit = function() {
    
    // this object exchanges data with the server behind the scenes
    let xhttp = new XMLHttpRequest();

    const url = 'http://localhost:3000/account/create';
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
            location.href='/';
        }
        else if(this.status === 400) {
            clearErrorArea()
            let jsonResponseText = processResponseText(this.responseText);
            let responseObj = JSON.parse(jsonResponseText);
            updateErrorArea(responseObj);
        }
    }

    // send request to the server containing the form data in json form
    xhttp.open(method, url);
    xhttp.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xhttp.send(jsonData);
    
    return false;
}

function updateErrorArea(obj) {

    // this array contains the names of the fields that cause the error
    let error_fields = [];
    
    // The object contains a property for each required field
    // If the field caused an error then the value is set to an error message,
    // otherwise it is an empty string
    Object.entries(obj).forEach(([key, val]) => {
        if(val != "") {
            error_fields.push(key);
        }
    });
    
    // We get the id of the corresponding field error html element 
    // and update it
    for(let index in error_fields) {
        let field_id = error_fields[index];
        field_id += '-error-msg';
        let error_area = document.getElementById(field_id);
        error_area.innerHTML = "This field is required";
        error_area.style.color = 'rgb(255, 0, 0)';
    }
}

function clearErrorArea() {
    let errorAreas = ['firstname-error-msg', 'username-error-msg', 'password-error-msg', 'email-error-msg'];

    for(let index in errorAreas) {
        let error_area = document.getElementById(errorAreas[index]);
        error_area.innerHTML = '';
    }
}

function processResponseText(text) {
    let jsonText = "";
    let numOfBrackets = 0;

    for(let i=0; i<text.length-1; i++) {
        if(text[i] == '{') {
            numOfBrackets += 1;
        } 
        if(numOfBrackets > 1) {
            jsonText += text[i];
        }
    }
    return jsonText;
}