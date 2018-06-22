(function () {
    var model = [{
      name: 'cat1',
      clicks: 0
    }, {
      name: 'cat2',
      clicks: 0
    }, {
      name: 'cat3',
      clicks: 0
    }, {
      name: 'cat4',
      clicks: 0
    }, {
      name: 'cat5',
      clicks: 0
    }];

    var listView = {
      $catList: document.getElementById('catlist'),
      render: function () {
        this.$catList.style.listStyle = 'none';
        this.$catList.style.cursor = 'pointer';
        for (let i = 0; i < model.length; i++) {
          const catName = model[i].name;
          const listelement = document.createElement('li');
          listelement.textContent = catName;
          listelement.style.fontSize = '20px';
          const catObj = octopus.getCat(i);
          octopus.addlistener(catObj, i, listelement);
          this.$catList.appendChild(listelement);
        }
      }
    };

    var catView = {
      $catImage: document.getElementById('catimg'),
      $catName: document.getElementById('catname'),
      $clicks: document.getElementById('clicks'),
      render: function (cat) {
        this.$catImage.setAttribute('src', './img/' + cat.name  + '.jpg')
        this.$catName.innerText = cat.name;
        this.$clicks.innerText = cat.clicks;
      }
    };

    var octopus = {
      init: function () {
        catView.render(model[0]);
        listView.render();
        catView.$catImage.addEventListener('click', function () {
          model[catView.$catImage.dataset.catid].clicks++;
          catView.render(model[catView.$catImage.dataset.catid]);
        });
      },

      getCat: function (idx) {
        return model[idx];
      },
      addlistener: function (obj, idx, element) {
        element.addEventListener('click', function () {
          catView.render(obj);
          catView.$catImage.dataset.catid = idx;
        });
      }

    };

    octopus.init();
    
  })();