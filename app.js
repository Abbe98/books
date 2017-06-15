if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}

fetch('books.json').then(response => {
  return response.json();
}).then(data => render(data));

function render(data) {
  var options = {
    valueNames: ['title', 'authors', 'category', 'series', 'notes'],
    item: '<li><h3 class="title"></h3><p class="outer-authors">Authors: <span class="authors"><span></p><p class="outer-notes">Notes: <span class="notes"></span></p><b class="category"></b> <b class="series"></b></li>'
  };

  var booksList = new List('books', options, data);

  booksList.on('updated', function(list) {
    document.querySelector('.count').innerHTML = list.matchingItems.length;
  });
  booksList.update();

  document.querySelector('#sort-category').addEventListener('click', function(e) {
    booksList.sort('category', {order: 'desc'});
  });
  document.querySelector('#sort-series').addEventListener('click', function(e) {
    booksList.sort('series', {order: 'desc'});
  });

  document.querySelectorAll('.notes').forEach(function(element) {
    if (element.innerHTML == '') {
      element.parentNode.style.display = 'none';
    }
  });

  document.querySelectorAll('.series').forEach(function(element) {
    if (element.innerHTML == '') {
      element.style.display = 'none';
    }
  });
}

document.querySelector('#byabbe-se').addEventListener('click', e => {
  document.location = 'https://byabbe.se';
});

let currentContext = '';
document.querySelectorAll('.list')[0].addEventListener('contextmenu', e => {
  let target = e.target;
  let bookContainer;
  switch (e.target.tagName) {
    case 'SPAN':
      currentContext = target.parentElement.parentElement.children[0].innerText;
      break;
    case 'P':
      currentContext = target.parentElement.children[0].innerText;
      break;
    case 'B':
      currentContext = target.parentElement.children[0].innerText;
      break;
    case 'LI':
      currentContext = target.children[0].innerText;
      break;
    default:
      currentContext = target.innerText;
  }
});

document.querySelector('#amazon-search').addEventListener('click', e => {
  document.location = 'https://www.amazon.com/s?field-keywords=' + currentContext;
});

document.querySelector('#bokus-search').addEventListener('click', e => {
  document.location = 'http://www.bokus.com/cgi-bin/product_search.cgi?search_word=' + currentContext;
});
