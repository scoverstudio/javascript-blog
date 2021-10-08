'use strict'

// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
//   });

const links = document.querySelectorAll('.titles a');

const titleClickHandler = function(){
    event.preventDefault();

    const clickedElement = this;
    const articleSelector = clickedElement.getAttribute('href');

    
    
    const activeLinks = document.querySelectorAll('.titles a.active');
    const activeArticles = document.querySelectorAll('.post');

    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

    /* [IN PROGRESS] add class 'active' to the clicked link */
    clickedElement.classList.add('active')
    console.log('clickedElement:', clickedElement);

  }


  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }