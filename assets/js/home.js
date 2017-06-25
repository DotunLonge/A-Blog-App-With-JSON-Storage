   document.addEventListener("DOMContentLoaded", (event) => {
       let _JSON_URL = '../assets/JSON/articles.json';
       let navbar = document.createElement('div')
       var articles;
       navbar.className = 'navBar'

       let newPostButtton = document.createElement('button')
       newPostButtton.className = 'newPostButton'
       newPostButtton.innerHTML = 'New Post'

       let body = document.body;

       body.appendChild(navbar)
       navbar.appendChild(newPostButtton)

       newPostButtton.addEventListener('click', () => {
           console.log('smart')
       });


       let fetchArticles = () => {
           let reader = new XMLHttpRequest();
           reader.open("GET", _JSON_URL, false);

           reader.onreadystatechange = () => {
               if (reader.readyState == 4) {
                   articles = JSON.parse(reader.responseText);
               }
           }
           reader.send();
       }
       fetchArticles();


       let construct = (titleData, descriptionData, datePublishedData, articleImageData, publishedByData) => {
           let holder = document.createElement('div')
           holder.className = 'xs-12 sm-6 md-4 holder'

           insideThings = document.createElement('div')
           insideThings.className = 'insideThing'

           let title = document.createElement('h4')
           title.className = 'title';
           title.innerHTML = titleData;

           let description = document.createElement('div')
           description.className = 'description';
           description.innerHTML = descriptionData.substring(0, 10);

           let articleImage = document.createElement('div')
           articleImage.className = 'articleImage';
           articleImage.style.backgroundImage = `url${articleImageData}`;

           let datePublished = document.createElement('h5')
           datePublished.className = 'datePublished'
           datePublished.innerHTML = datePublishedData;

           let publishedBy = document.createElement('h5')
           publishedBy.className = 'publishedBy';
           publishedBy.innerHTML = publishedByData;


           body.appendChild(holder)
           holder.appendChild(insideThings);
           insideThings.appendChild(title);
           insideThings.appendChild(description);
           insideThings.appendChild(articleImage)
           insideThings.appendChild(datePublished)
           insideThings.appendChild(publishedBy)

       }

       for (each in articles) {
           let Title = articles[each].Title;
           let Description = articles[each].Description;
           let datePublished = articles[each].datePublished;
           let articleImage = articles[each].articleImage;
           let publishedBy = articles[each].publishedBy;

           construct(Title, Description, datePublished, articleImage, publishedBy);

       }



   })