var previousPage;

let _JSON_URL = '../assets/JSON/articles.json';
let nD = (what) => document.createElement(what);

const NewButton = (classname = 'newPostButton', inner) => {
    let newButton = nD('button')
    newButton.className = 'newPostButton'
    newButton.innerHTML = inner
    return newButton
}

let navbar = nD('div')
navbar.className = 'navBar'

let saveButton = NewButton()
saveButton.innerHTML = "Save For Now"

let publishButton = NewButton()
publishButton.innerHTML = "Publish My Story"

let newPostButton = NewButton()
newPostButton.innerHTML = 'Post Your Story'

let goBackButton = NewButton()
goBackButton.innerHTML = 'Go Back'

let body = document.body;

let generalHolder = nD('div');
generalHolder.className = 'generalHolder';

let createArticles = (articles) => {
    for (each in articles) {
        let Title = articles[each].Title;
        let Description = articles[each].Description;
        let datePublished = articles[each].datePublished;
        let articleImage = articles[each].articleImage;
        let publishedBy = articles[each].publishedBy;
        construct(Title, Description, datePublished, articleImage, publishedBy);
    }
}

let myAsyncFunction = (url, type = "GET") => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(type, url)
        xhr.onload = () => resolve(xhr.responseText)
        xhr.onerror = () => reject(xhr.statusText)
        xhr.send();
    })
}

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
    readView.className = 'xs-12 sm-12 md-8 holder readView'

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
    articleImage.appendChild(title);
    articleImage.appendChild(publishedBy);
    articleImage.appendChild(datePublished);
    readView.appendChild(description)

    document.querySelector('.articleImage').focus()
    loadNextPage(readView);

}

goBackButton.addEventListener('click', (event) => {

    goBack(event.target.getAttribute('data-where'));

})

loadNextPage = (NextPage) => {

    new Promise((resolve, reject) => {
        Loader('show');
        generalHolder.innerHTML = "";
        generalHolder.appendChild(NextPage);
        navbar.appendChild(goBackButton)
        resolve('hide')
    }).then((value) => {
        setTimeout(() => {
            Loader(value);
            navbar.appendChild(goBackButton);
        }, 3000)
    })

};

goBack = (who) => {

    let removeCreateViewButtons = () => {
        saveButton.style.display = 'none';
        publishButton.style.display = 'none';
    }

    who == undefined || null ? "" : removeCreateViewButtons()

    newPostButton.style.display = "block";
    navbar.style.height = "80px";

    Loader('show');

    generalHolder.innerHTML = ""

    new Promise((resolve, reject) => {
        fetchArticles((articles) => {
            createArticles(articles)
        })

        resolve('hide')

    }).then((value) => {
        setTimeout(() => {
            navbar.removeChild(goBackButton);
            Loader(value);
        }, 2000)
    })

}


let fetchArticles = (articleGettingFunction) => {

    myAsyncFunction(_JSON_URL).then((response) => {

        articleGettingFunction(JSON.parse(response));

    })

}

document.addEventListener("DOMContentLoaded", (event) => {
    body.appendChild(navbar)
    navbar.appendChild(newPostButton)
    body.appendChild(generalHolder);

    newPostButton.addEventListener('click', (event) => {

        newPostButton.style.display = 'none';
        navbar.style.height = "100vh";
        navbar.style.positon = "fixed";

        navbar.appendChild(saveButton)
        navbar.appendChild(publishButton)

        let boxem = nD('div');
        boxem.style.width = '90%';
        boxem.style.margin = 'auto';

        let titleBox = nD('input')
        titleBox.className = 'inputField';
        titleBox.setAttribute('placeholder', "What's The Title Of Your Story");

        let authorBox = nD('input')
        authorBox.className = 'inputField';
        authorBox.setAttribute('placeholder', "What's Your Name");

        let contentBox = nD('textarea')
        contentBox.className = 'contentBox';
        contentBox.setAttribute('placeholder', "Start Here");
        goBackButton.setAttribute('data-where', "fromCreateView")
        navbar.appendChild(goBackButton)

        navbar.appendChild(boxem)
        boxem.appendChild(titleBox)
        boxem.appendChild(authorBox)

        navbar.appendChild(contentBox)

    });
    /*
     This Fetches The Articles
     */

    //This Creates Everything
    new Promise((resolve, reject) => {
        fetchArticles((articles) => {
            createArticles(articles)
        })
        resolve('hide')
    }).then((value) => {
        setTimeout(() => {
            Loader(value)
        }, 4000)
    })
})