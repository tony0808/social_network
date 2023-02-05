function deleteBlog(blog_id) {
    let xhttp = new XMLHttpRequest();
    const method = 'DELETE';
    const url = 'http://localhost:3000/blog/list/' + blog_id;
    xhttp.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            location.href='/blog/list';
        }
        else if(this.status === 400) {
            console.log('error occured');
        }
    };
    xhttp.open(method, url);
    xhttp.setRequestHeader('Content-type', 'text/plain');
    xhttp.send(blog_id);

    return false;
}

function updateBlog(blog_id) {
    let xhttp = new XMLHttpRequest();
    const method = 'POST';
    const url = 'http://localhost:3000/blog/edit/' + blog_id;

    // get the form data and convert it to JSON 
    const formData = new FormData(document.getElementById('blog-update-form'));
    const object = {};
    formData.forEach((value, key) => object[key] = value);
    const jsonData = JSON.stringify(object);
    console.log(jsonData);
    xhttp.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            console.log('good');
            location.href='/blog/list';
        }
        else if(this.status === 400) {
            console.log('error occured');
        }
    };
    xhttp.open(method, url);
    xhttp.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xhttp.send(jsonData);

    return false;
}