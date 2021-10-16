{
  'use strict';

  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';
  const optArticleTagsSelector = '.post-tags .list';


  const titleClickHandler = function (e) {
    e.preventDefault();

    const clickedElement = this;
    const articleSelector = clickedElement.getAttribute('href');
    const targetArticle = document.querySelector(articleSelector);

    const activeLinks = document.querySelectorAll('.titles a.active');
    const activeArticles = document.querySelectorAll('.post');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    clickedElement.classList.add('active');
    targetArticle.classList.add('active');

  };


  const titleList = document.querySelector(optTitleListSelector);

  const clearMessages = function () {
    titleList.innerHTML = '';
  };

  const generateTitleLinks = function (customSelector = '') {
    clearMessages();
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';
    console.log(customSelector);

    for (let article of articles) {
      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      html = html + linkHTML;
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }

    const firstArticle = document.querySelector('.titles a:nth-child(1)');
    firstArticle.classList.add('active');
  };

  generateTitleLinks();

  // eslint-disable-next-line no-inner-declarations
  function generateTags() {
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for (let article of articles) {
      const tagsWrapper = article.querySelectorAll(optArticleTagsSelector);
      let html = '';
      const articleTags = article.getAttribute('data-tags');
      const articleTagsArray = articleTags.split(' ');

      for (let tag of articleTagsArray) {
        console.log(tag);
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</li>';
        html = html + linkHTML;
      }
      tagsWrapper.innerHTML = html;
    }
  }
  generateTags();


  // eslint-disable-next-line no-inner-declarations
  function tagClickHandler(event) {
    event.preventDefault();

    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');
    const activeTags = tag.querySelectorAll('a.active[href^="#tag-"]');

    for (let activeTag of activeTags) {
      activeTag.classList.remove('active');
    }

    const equalTags = tag.querySelectorAll('a[href="' + href + '"]');

    for (let equalTag of equalTags) {
      equalTag.classList.add('active');
    }

    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  // eslint-disable-next-line no-inner-declarations
  function addClickListenersToTags() {
    /* find all links to tags */

    /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

    /* END LOOP: for each link */
  }

  addClickListenersToTags();
}