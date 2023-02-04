function deleteBlog(blog_id) {
    let xhttp = new XMLHttpRequest();

    const method = 'DELETE';
    const url = 'http://localhost:3000/blog/list/' + blog_id;
    xhttp.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            location.href='/blog/home';
        }
        else if(this.status === 400) {
            console.log('error occured');
        }
    };

    xhttp.open(method, url);
    xhttp.setRequestHeader('Content-type', 'text/plain');
    xhttp.send(blog_id);
}