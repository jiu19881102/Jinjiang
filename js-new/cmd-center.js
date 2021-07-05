define(['title/output', 'toolbar/output', 'stage/output', 'template/output', 'pagenav/output', 'design/output'], function (title, toolbar, stage, template, pagenav, design) {
    var currentTitle;
    var currentDesign;
    var currentTemplate;
    var currentLayout;
    var currentTypeMap;
    var currentPage;
    var currentFontFamily;
    var currentItem;
    var focusedItem;
    var currentPageList;

    setTimeout(function () {
        currentTitle = 'First Work';
        currentDesign = 'default';
        currentTemplate = 'title';
        currentLayout = 'title';
        currentPage = 0;
        currentPageList = [
            {title: 'Hello world!'},
            {title: 'I\'am Jinks'},
            {title: 'My Family'},
            {title: 'My Friends'},
            {title: 'My Job'},
            {title: 'The END'}
        ];

        title.updateTitle(currentTitle);

        design.build();
        design.save(currentDesign);
        design.setCurrent(currentDesign);

        toolbar.setTextBtns(false);

        template.build();
        template.setCurrent(currentTemplate);

        pagenav.build(currentPageList);
        pagenav.setCurrent(currentPage);

        stage.setDesign(currentDesign);
        stage.setLayout(currentLayout);
        stage.getItem('title').text('Hello World!');
        stage.getItem('content').text('This is a presentation by HTML5.');
    }, 13);

    return {
        changeTitle: function (val) {
            currentTitle = val;
            title.updateTitle(val);
        },
        changeFontFamily: function (val) {
            currentFontFamily = val;
            stage.getItem('slide').css('font-family', val);
        },

        changeItem: function (key) {
            currentItem = key;
            if (key) {
                console.log('change to', key);
            }
            else {
                console.log('cancel');
            }
        },
        focusItem: function (key) {
            focusedItem = key;
            console.log('focus', key);
        },
        blurItem: function (key) {
            focusedItem = null;
            console.log('blur', key);
        },

        previewDesign: function (key) {
            console.log('preview', key);
            design.setCurrent(key);
            stage.setDesign(key);
        },
        saveDesign: function (key) {
            console.log('save', key);
            currentDesign = key;
            design.save(key);
            this.previewDesign(key);
        },
        revertDesign: function () {
            console.log('revert');
            this.previewDesign(currentDesign);
        },

        setTemplate: function (key, layout, typeMap) {
            currentTemplate = key;
            currentLayout = layout;
            currentTypeMap = typeMap;

            stage.setLayout(layout);
            $.each(typeMap, function (key, type) {
                stage.getItem(key).attr('data-type', type);
            });
            template.setCurrent(key);
        },

        changePage: function (index) {
            currentPage = index;
            pagenav.setCurrent(index);
        },
        nextPage: function () {
            if (currentPage < currentPageList.length - 1) {
                currentPage++;
                pagenav.setCurrent(currentPage);
            }
        },
        prevPage: function () {
            if (currentPage > 0) {
                currentPage--;
                pagenav.setCurrent(currentPage);
            }
        },
        addPage: function () {
            var newTitle = {title: 'new'};

            currentPageList.splice(currentPage - (-1), 0, newTitle);
            pagenav.add(currentPage - (-1), newTitle);

            currentPage++;
            pagenav.setCurrent(currentPage);
        },
        clonePage: function () {
            var oldTitle = currentPageList[currentPage];
            var newTitle = {title: oldTitle.title};

            currentPageList.splice(currentPage - (-1), 0, newTitle);
            pagenav.add(currentPage - (-1), newTitle);

            currentPage++;
            pagenav.setCurrent(currentPage);
        },
        removePage: function () {
            if (currentPageList.length == 1) {
                return;
            }
            currentPageList.splice(currentPage, 1);
            pagenav.remove(currentPage);

            if (currentPage > 0) {
                currentPage--;
            }
            pagenav.setCurrent(currentPage);
        },
        moveupPage: function () {
            if (currentPage == 0) {
                return;
            }
            pagenav.move(currentPage, currentPage - 1);
            currentPage--;
            pagenav.setCurrent(currentPage);
        },
        movedownPage: function () {
            if (currentPage == currentPageList.length - 1) {
                return;
            }
            pagenav.move(currentPage, currentPage - (-2));
            currentPage++;
            pagenav.setCurrent(currentPage);
        },

        reset: function () {
            console.log('reset');
        },
        preview: function () {
            console.log('preview');
        },
        publish: function () {
            console.log('publish');
        },
        remove: function () {
            console.log('remove');
        }
    };
});