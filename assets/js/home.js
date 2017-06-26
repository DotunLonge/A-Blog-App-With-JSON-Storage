   document.addEventListener("DOMContentLoaded", (event) => {

       let _JSON_URL = '../assets/JSON/articles.json';
       var articles;

       let navbar = document.createElement('div')
       navbar.className = 'navBar'

       let newPostButtton = document.createElement('button')
       newPostButtton.className = 'newPostButton'
       newPostButtton.innerHTML = 'Post A Story'

       let body = document.body;

       body.appendChild(navbar)
       navbar.appendChild(newPostButtton)

       newPostButtton.addEventListener('click', () => {
           console.log('smart')
       });

       let construct = (titleData, descriptionData, datePublishedData, articleImageData, publishedByData) => {

           let holder = document.createElement('div')
           holder.className = 'xs-12 sm-6 md-4 holder'

           insideThings = document.createElement('div')
           insideThings.className = 'insideThing'

           let title = document.createElement('span')
           title.className = 'title'
           let titleText = document.createElement('h4')
           titleText.innerHTML = titleData;
           title.appendChild(titleText)

           let datePublished = document.createElement('h5')
           datePublished.className = 'datePublished'
           datePublished.innerHTML = datePublishedData;

           let articleImage = document.createElement('div')
           articleImage.className = 'articleImage'
           articleImage.style.backgroundImage = `url(${articleImageData})`

           let publishedBy = document.createElement('span')
           publishedBy.className = 'publishedBy'
           let publishedByText = document.createElement('h5')
           publishedByText.innerHTML = publishedByData;
           publishedBy.appendChild(publishedByText);

           body.appendChild(holder)
           holder.appendChild(insideThings)
           insideThings.appendChild(articleImage)

           articleImage.appendChild(title)
           insideThings.appendChild(datePublished)
           articleImage.appendChild(publishedBy)

           return 'done';
       }

       let removeLoader = () => {
           setTimeout(() => {
               document.querySelector('.loading').className = 'loading hide';
           }, 3000);
       }

       let fetchArticles = () => {
           let reader = new XMLHttpRequest();
           reader.open("GET", _JSON_URL, true);

           reader.onreadystatechange = () => {
               if (reader.readyState == 4) {
                   articles = JSON.parse(reader.responseText);
                   if (articles !== undefined || null) {

                       for (each in articles) {
                           let Title = articles[each].Title;
                           let Description = articles[each].Description;
                           let datePublished = articles[each].datePublished;
                           let articleImage = articles[each].articleImage;
                           let publishedBy = articles[each].publishedBy;
                           let call = construct(Title, Description, datePublished, articleImage, publishedBy);
                           call == 'done' ? removeLoader() : " ";
                       }
                   }
               }
           }
           reader.send();
       }

       setTimeout(() => {
           fetchArticles();
       }, 5000)
   })