'use strict'

// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
//   });

const links = document.querySelectorAll('.titles a');

const titleClickHandler = function(){
    console.log('Link was clicked!');
    
    const activeLinks = document.querySelectorAll('.titles a.active');
    const activeArticles = document.querySelectorAll('.post');

    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }
  }



  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }