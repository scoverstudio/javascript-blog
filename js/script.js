{
'use strict'

// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
//   });

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';


const titleClickHandler = function(e){
    e.preventDefault();

    const clickedElement = this;
    const articleSelector = clickedElement.getAttribute('href');
    const targetArticle = document.querySelector(articleSelector);

    const activeLinks = document.querySelectorAll('.titles a.active');
    const activeArticles = document.querySelectorAll('.post');

    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

    clickedElement.classList.add('active')
    targetArticle.classList.add('active');
  }


  const titleList = document.querySelector(optTitleListSelector);

  const clearMessages = function() {
    titleList.innerHTML = '';
  }

  const generateTitleLinks = function() {
    clearMessages();
    const articles = document.querySelectorAll(optArticleSelector);
    let html = '';

    for(let article of articles){
      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      html = html + linkHTML;
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }

    const firstArticle = document.querySelector('.titles a:nth-child(1)');
    firstArticle.classList.add('active');
  }
  
  generateTitleLinks();
}