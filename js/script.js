{
  'use strict';

  const opts = {
    articleSelector: '.post',
    titleSelector: '.post-title',
    titleListSelector: '.titles',
    articleTagsSelector: '.post-tags .list',
    articleAuthorsSelector: '.post-author',
    authorsListSelector: '.authors',
    cloudClassCount: '5',
    cloudClassPrefix: 'tag-size-',
  }

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


  const titleList = document.querySelector(opts.titleListSelector);

  const clearMessages = function () {
    titleList.innerHTML = '';
  };

  const generateTitleLinks = function (customSelector = '') {
    clearMessages();
    const articles = document.querySelectorAll(opts.articleSelector + customSelector);
    let html = '';

    for (let article of articles) {
      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(opts.titleSelector).innerHTML;
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

  const calculateTagsParams = function (tags) {
    const params = {
      max: 0,
      min: 999999,
    };
    for (let tag in tags) {
      if (tags[tag] > params.max) {
        params.max = tags[tag];
      }
      if (tags[tag] < params.min) {
        params.min = tags[tag];
      }
    }
    return params;
  };

  const calculateTagClass = function (count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (opts.cloudClassCount - 1) + 1);
    return opts.cloudClassPrefix + classNumber;
  };

  const generateTags = function () {

    const allTags = {};
    const articles = document.querySelectorAll(opts.articleSelector);

    for (let article of articles) {
      const tagsWrapper = article.querySelector(opts.articleTagsSelector);
      let html = '';
      const articleTags = article.getAttribute('data-tags');
      const articleTagsArray = articleTags.split(' ');

      for (let tag of articleTagsArray) {
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</li>     ';
        html = html + linkHTML;
        if (!allTags[tag]) {
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      }
      tagsWrapper.innerHTML = html;
      const tagList = document.querySelector('.tags');
      const tagsParams = calculateTagsParams(allTags);
      let allTagsHTML = '';
      for (let tag in allTags) {
        const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
        allTagsHTML += '<li><a class="' + tagLinkHTML + '" href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ')</a></li>';

      }
      tagList.innerHTML = allTagsHTML;
    }
  };
  generateTags();

  const tagClickHandler = function (event) {
    event.preventDefault();

    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    for (let activeTag of activeTags) {
      activeTag.classList.remove('active');
    }

    const equalTags = document.querySelectorAll('a[href="' + href + '"]');

    for (let equalTag of equalTags) {
      equalTag.classList.add('active');
    }

    generateTitleLinks('[data-tags~="' + tag + '"]');
  };


  const addClickListenersToTags = function () {

    const links = document.querySelectorAll('.post-tags .list li a');

    for (let link of links) {
      link.addEventListener('click', tagClickHandler);
    }
    const linksCloud = document.querySelectorAll('.tags li a');

    for (let linkCloud of linksCloud) {
      linkCloud.addEventListener('click', tagClickHandler);
    }
  };
  addClickListenersToTags();




  const generateAuthors = function () {
    let allAuthors = {};
    const articles = document.querySelectorAll(opts.articleSelector);

    for (let article of articles) {
      const authorsWrapper = article.querySelector(opts.articleAuthorsSelector);
      const articleAuthor = article.getAttribute('data-author');
      const linkHTML = '<a href="#tag-' + articleAuthor + '">' + articleAuthor + '</a><br>';

      authorsWrapper.innerHTML = linkHTML;

      const articleAuthorsArray = articleAuthor.split(' ');
      for (let author of articleAuthorsArray) {
        if (!allAuthors[author]) {
          allAuthors[author] = 1;
        } else {
          allAuthors[author]++;
        }
      };
    }
    const authorList = document.querySelector(opts.authorsListSelector);
    let allAuthorsHTML = '';
    for (let author in allAuthors) {
      allAuthorsHTML += '<li><a href="#tag-' + author + '">' + author + ' (' + allAuthors[author] + ')</a></li>';
    }
    authorList.innerHTML = allAuthorsHTML;
  };
  generateAuthors();


  const authorClickHandler = function (event) {
    event.preventDefault();

    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#tag-', '');
    const activeAuthors = document.querySelectorAll('a.active[href^="#tag-"]');

    for (let activeAuthor of activeAuthors) {
      activeAuthor.classList.remove('active');
    }

    const equalAuthors = document.querySelectorAll('a[href="' + href + '"]');

    for (let equalAuthor of equalAuthors) {
      equalAuthor.classList.add('active');
    }
    generateTitleLinks('[data-author="' + author + '"]');
  };

  const addClickListenersToAuthors = function () {
    const links = document.querySelectorAll('.post-author a');
    const linksCloud = document.querySelectorAll('.authors a');

    for (let link of links) {
      link.addEventListener('click', authorClickHandler);
    }
    for (let linkCloud of linksCloud) {
      linkCloud.addEventListener('click', authorClickHandler);
    }
  };
  addClickListenersToAuthors();
}