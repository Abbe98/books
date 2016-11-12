var xhr = new XMLHttpRequest();
xhr.open('GET', 'books.json', true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    if (xhr.status >= 200 && xhr.status < 300) {
      var data = JSON.parse(xhr.responseText);

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
  }
};
xhr.send();