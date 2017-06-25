   document.addEventListener("DOMContentLoaded", (event) => {
       let _JSON_URL = '../assets/JSON/articles.json';

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
           reader.open("GET", _JSON_URL, false);

           reader.onreadystatechange = () => {
               if (reader.readyState == 4) {
                   var articles = JSON.parse(reader.responseText);

               }
           }
           reader.send();

       }

       fetchArticles();



   })