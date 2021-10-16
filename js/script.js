/* eslint-disable no-inner-declarations */
{
  'use strict';

  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';
  const optArticleTagsSelector = '.post-tags .list';
  const optArticleAuthorsSelector = '.post-author';


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

  function generateTags() {
    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {
      const tagsWrapper = article.querySelectorAll(optArticleTagsSelector);
      let html = '';
      const articleTags = article.getAttribute('data-tags');
      const articleTagsArray = articleTags.split(' ');

      for (let tag of articleTagsArray) {
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</li>';
        html = html + linkHTML;
      }
      tagsWrapper.innerHTML = html;
    }
  }
  generateTags();



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


  function addClickListenersToTags() {

    const links = document.querySelectorAll('.post-tags .list li a');

    for (let link of links) {
      link.addEventListener('click', tagClickHandler);
    }
  }
  addClickListenersToTags();


  function generateAuthors() {
    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {
      const authorsWrapper = article.querySelectorAll(optArticleAuthorsSelector);
      let html = '';
      const articleAuthor = article.getAttribute('data-author');

      const linkHTML = '<a href="#tag-' + articleAuthor + '">';
      html = html + linkHTML;

      authorsWrapper.innerHTML = html;
    }
  }
  generateAuthors();


  function authorClickHandler(event) {
    event.preventDefault();

    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#tag-', '');
    const activeAuthors = author.querySelectorAll('a.active[href^="#tag-"]');

    for (let activeAuthor of activeAuthors) {
      activeAuthor.classList.remove('active');
    }

    const equalAuthors = author.querySelectorAll('a[href="' + href + '"]');

    for (let equalAuthor of equalAuthors) {
      equalAuthor.classList.add('active');
    }
    generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenersToAuthors() {
    const links = document.querySelectorAll('.post-author a');

    for (let link of links) {
      link.addEventListener('click', authorClickHandler);
    }
  }
  addClickListenersToAuthors();
}