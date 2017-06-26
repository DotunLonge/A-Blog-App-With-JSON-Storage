var previousPage;
document.addEventListener("DOMContentLoaded", (event) => {

    let _JSON_URL = '../assets/JSON/articles.json';
    let nD = (what) => document.createElement(what);

    let navbar = nD('div')
    navbar.className = 'navBar'


    let newPostButtton = nD('button')
    newPostButtton.className = 'newPostButton'
    newPostButtton.innerHTML = 'Post A Story'

    let goBackButton = nD('button')
    goBackButton.className = 'newPostButton'
    goBackButton.innerHTML = 'Go Back'


    let body = document.body;

    let generalHolder = nD('div');
    generalHolder.className = 'generalHolder';

    let reader = new XMLHttpRequest();



    body.appendChild(navbar)
    navbar.appendChild(newPostButtton)

    body.appendChild(generalHolder)
    newPostButtton.addEventListener('click', () => {
        console.log('smart')
    });



    let construct = (titleData, descriptionData, datePublishedData, articleImageData, publishedByData) => {

        let holder = nD('button')
        holder.className = 'xs-12 sm-6 md-4 holder'

        insideThings = nD('div')
        insideThings.className = 'insideThing'

        let title = nD('span')
        title.className = 'title'

        let titleText = nD('h4')
        titleText.innerHTML = titleData;
        title.appendChild(titleText)

        let datePublished = nD('span')
        datePublished.className = 'datePublished'
        let datePublishedText = nD('h5')
        datePublishedText.innerHTML = datePublishedData;
        datePublished.appendChild(datePublishedText)

        let articleImage = nD('div')
        articleImage.className = 'articleImage'
        articleImage.style.backgroundImage = `url(${articleImageData})`

        let publishedBy = nD('span')
        publishedBy.className = 'publishedBy'

        let publishedByText = nD('h5')

        publishedByText.innerHTML = publishedByData
        publishedBy.appendChild(publishedByText)

        generalHolder.appendChild(holder)
        holder.appendChild(insideThings)
        insideThings.appendChild(articleImage)

        articleImage.appendChild(title)
        articleImage.appendChild(publishedBy)
        articleImage.appendChild(datePublished)

        holder.setAttribute('data-title', titleText.innerHTML);

        holder.addEventListener('click', () => {
            loadContent(titleData, articleImageData, publishedByData, datePublishedData, descriptionData);
        })

        return 'done';
    }

    let Loader = (doWhat) => {
        switch (doWhat) {
            case 'show':
                document.querySelector('.loading').className = 'loading';
                break;
            case 'hide':
                document.querySelector('.loading').className = 'loading hide';
                break;
        }
    }


    let loadContent = (titleData, articleImageData, publishedByData, datePublishedData, descriptionData) => {
        let readView = nD('div')
        readView.className = 'xs-12 sm-12 md-12 holder readView'

        let description = nD('div')
        description.innerHTML = descriptionData

        let title = nD('span')
        title.className = 'title'

        let titleText = nD('h4')
        titleText.innerHTML = titleData;
        title.appendChild(titleText)

        let datePublished = nD('span')
        datePublished.className = 'datePublished'
        let datePublishedText = nD('h5')
        datePublishedText.innerHTML = datePublishedData;
        datePublished.appendChild(datePublishedText)

        let articleImage = nD('div')
        articleImage.className = 'articleImage'
        articleImage.style.backgroundImage = `url(${articleImageData})`

        let publishedBy = nD('span')
        publishedBy.className = 'publishedBy'

        let publishedByText = nD('h5')
        publishedByText.innerHTML = publishedByData
        publishedBy.appendChild(publishedByText)


        readView.appendChild(articleImage);
        readView.appendChild(title);
        readView.appendChild(publishedBy);
        readView.appendChild(datePublished);
        readView.appendChild(description)

        document.querySelector('.articleImage').focus()
        loadNextPage(readView);

    }

    goBackButton.addEventListener('click', () => {
        goBack();
    })


    loadNextPage = (NextPage) => {
        Loader('show');
        generalHolder.innerHTML = "";
        navbar.appendChild(goBackButton);

        setTimeout(() => {
            Loader('hide');
            generalHolder.appendChild(NextPage);
        }, 3000)
    };

    goBack = () => {
            Loader('show');
            generalHolder.innerHTML = ""

            fetchArticles(function(articles) {
                for (each in articles) {
                    let Title = articles[each].Title;
                    let Description = articles[each].Description;
                    let datePublished = articles[each].datePublished;
                    let articleImage = articles[each].articleImage;
                    let publishedBy = articles[each].publishedBy;
                    construct(Title, Description, datePublished, articleImage, publishedBy);
                }
            })
            setTimeout(() => {
                navbar.removeChild(goBackButton);
                Loader('hide');
            }, 2000)
        }
        /*
         This Fetches The Articles
         */

    let fetchArticles = (loadedJSON) => {
        reader.open("GET", _JSON_URL, true);
        reader.onreadystatechange = () => {
            if (reader.readyState == 4) {
                loadedJSON(JSON.parse(reader.responseText));
            }
        }
        reader.send();
    }

    //This Creates Everything

    setTimeout(() => {
        fetchArticles(function(articles) {
            for (each in articles) {
                let Title = articles[each].Title;
                let Description = articles[each].Description;
                let datePublished = articles[each].datePublished;
                let articleImage = articles[each].articleImage;
                let publishedBy = articles[each].publishedBy;
                construct(Title, Description, datePublished, articleImage, publishedBy);

            }
            Loader('hide')
        });
    }, 4000)

})