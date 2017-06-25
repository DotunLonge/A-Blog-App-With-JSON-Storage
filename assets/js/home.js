   document.addEventListener("DOMContentLoaded", (event) => {
       let _JSON_URL = '../assets/JSON/articles.json';
       let jsonText = null;


       let navbar = document.createElement('div')
       navbar.className = 'navBar'

       let newPostButtton = document.createElement('button')
       newPostButtton.className = 'newPostButton'
       newPostButtton.innerHTML = 'New Post'
       navbar.appendChild(newPostButtton)

       let body = document.body;
       body.appendChild(navbar)


       newPostButtton.addEventListener('click', () => {
           console.log('smart')
       });

       let fetchArticles = () => {
           let reader = new XMLHttpRequest();
           reader.open("GET", _JSON_URL, true);
           reader.onreadystatechange = () => {
               reader.readyState == 4 ?
                   reader.status == 200 || reader.status == 0 ?
                   jsonText = reader.responseText : console.log("could not read json") : console.log('reader.readyState != 4');
           }
           reader.send();

       }

       fetchArticles();



   })