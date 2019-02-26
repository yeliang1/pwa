(function() {
    /**
     * �����鼮�б�Ƭ��domԪ�أ�
     * @param {Object} book �鼮�������
     */
    function createCard(book) {
        var li = document.createElement('li');
        // var img = document.createElement('img');
        var title = document.createElement('div');
        var author = document.createElement('div');
        var desc = document.createElement('div');
        var publisher = document.createElement('span');
        var price = document.createElement('span');
        title.className = 'title';
        author.className = 'author';
        desc.className = 'desc';
        // img.src = book.image;
        title.innerText = book.title;
        author.innerText = book.author;
        publisher.innerText = book.publisher;
        price.innerText = book.price;

        book.publisher && desc.appendChild(publisher);
        book.price && desc.appendChild(price);
        // li.appendChild(img);
        li.appendChild(title);
        li.appendChild(author);
        li.appendChild(desc);

        return li;
    }

    /**
     * ���ݻ�ȡ�������б������鼮չʾ�б�
     * @param {Array} list �鼮�б�����
     */
    function fillList(list) {
        list.forEach(function (book) {
            var node = createCard(book);
            document.querySelector('#js-list').appendChild(node);
        });
    }

    /**
     * ����tipչʾ����ʾ������
     * @param {string | undefined} text tip����ʾ����
     */
    function tip(text) {
        if (text === undefined) {
            document.querySelector('#js-tip').style = 'display: none';
        }
        else {
            document.querySelector('#js-tip').innerHTML = text;
            document.querySelector('#js-tip').style = 'display: block';
        }
    }

    /**
     * ����loading������չʾ
     * @param {boolean | undefined} isloading �Ƿ�չʾloading
     */
    function loading(isloading) {
        if (isloading) {
            tip();
            document.querySelector('#js-loading').style = 'display: block';
        }
        else {
            document.querySelector('#js-loading').style = 'display: none';
        }
    }
    
    /**
     * �����û�������
     * ʹ��XMLHttpRequest��ѯ��չʾ�����б�
     */
    function queryBook() {
        var input = document.querySelector('#js-search-input');
        var query = input.value;
        var xhr = new XMLHttpRequest();
        var url = '/book?q=' + query + '&fields=id,title,image,author,publisher,price';
        if (query === '') {
            tip('������ؼ���');
            return;
        }
        document.querySelector('#js-list').innerHTML = '';
        document.querySelector('#js-thanks').style = 'display: none';
        loading(true);
        xhr.timeout = 60000;
        xhr.onreadystatechange = function () {
            var response = {};
            if (xhr.readyState === 4 && xhr.status === 200) {
                loading(false);
                try {
                    response = JSON.parse(xhr.responseText);
                }
                catch (e) {
                    response = xhr.responseText;
                }
                tip();
                if (response.books.length === 0) {
                    tip('�޽��');
                }
                else {
                    input.blur();
                    fillList(response.books);
                    document.querySelector('#js-thanks').style = 'display: block';
                }
            }
        };
        xhr.open('GET', url, true);
        xhr.send(null);
    }

    /**
     * ��������������ť����¼�
     */
    document.querySelector('#js-search-btn').addEventListener('click', function () {
        queryBook();
    });

    /**
     * �������س����¼�
     */
    window.addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
            queryBook();
        }
    });
})();