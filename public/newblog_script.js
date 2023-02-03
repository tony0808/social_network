
const form_id = 'blog-create-form';

document.getElementById(form_id).onsubmit = function() {

    // this object exchanges data with the server behind the scenes
    let xhttp = new XMLHttpRequest();

    const url = 'http://localhost:3000/blog/create';
    const method = 'POST';
    
    // get the form data and convert it to JSON
    const formData = new FormData(document.getElementById(form_id));
    const object = {};
    formData.forEach((value, key) => object[key] = value);
    const jsonData = JSON.stringify(object);
    console.log(jsonData);
    // this function is called when the readyState property changes
    // in our case, code 4 means that the request has finished and the response is ready
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById('blog-error-msg').innerHTML = '';
            location.href='/blog/home';
        }
        else if(this.status === 400) {
            let errorArea = document.getElementById('blog-error-msg');
            errorArea.innerHTML = this.responseText;
            errorArea.style.color = 'rgb(255, 0, 0)';
        }
    }

    // send request to the server containing the form data in json form
    xhttp.open(method, url);
    xhttp.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xhttp.send(jsonData);

    return false;
}