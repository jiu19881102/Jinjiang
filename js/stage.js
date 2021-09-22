define(['data', 'types', 'ctrl'], function (dataManager, typeMap, ctrlManager) {
    var itemKeyMap = ['title', 'content', 'content2', 'subtitle', 'subtitle2'];

    return {
        init: function (vm) {
            vm.previewItem = function (key) {
                var page = vm.currentPage();
                var itemData = dataManager.getItem(page, key);
                var dom = $('#slide-' + key);
                var output = dom.find('.output');
                var typeHelper = typeMap[itemData.type];

                if (typeHelper) {
                    typeHelper.preview(itemData, output);
                }
            };
            vm.previewAll = function () {
                itemKeyMap.forEach(function (key) {
                    vm.previewItem(key);
                });
            };

            vm.resizeItem = function (key) {
                var page = vm.currentPage();
                var itemData = dataManager.getItem(page, key);
                var dom = $('#slide-' + key);
                var output = dom.find('.output');
                var typeHelper = typeMap[itemData.type];

                if (typeHelper && typeHelper.resize) {
                    typeHelper.resize(itemData, output);
                }
            };
            vm.resizeAll = function () {
                itemKeyMap.forEach(function (key) {
                    vm.resizeItem(key);
                });
            };

            vm.editItem = function (vm, e) {
                var output = $(e.currentTarget);
                var dom = output.parent();
                var key = dom.attr('data-key');
                var page = vm.currentPage();
                var itemData = dataManager.getItem(page, key);
                var typeHelper = typeMap[itemData.type];

                e.stopPropagation();
                vm.currentItem(key);

                if (typeHelper) {
                    vm.currentItemDataCopy(JSON.parse(JSON.stringify(itemData)));
                    if (typeHelper.init && !typeHelper.initialized) {
                        typeHelper.init();
                        typeHelper.initialized = true;
                    }
                    typeHelper.showEditor(key, page, itemData, output);
                }
            };

            vm.finishEdit = function () {
                var page = vm.currentPage();
                var key = vm.currentItem();
                var newPageData;

                var changed = dataManager.checkItemChanged(
                        page, key,
                        vm.currentItemDataCopy()
                    );
                if (changed) {
                    if (key == 'title') {
                        newPageData = JSON.parse(JSON.stringify(vm.pageList.slice(page, page + 1)[0]));
                        newPageData.title = dataManager.getValue(page, key);
                        vm.pageList.splice(page, 1, newPageData);
                    }
                    dataManager.save();
                    vm.previewItem(key);
                }

                vm.currentItem('');
            };

            vm.currentSid.subscribe(function () {
                setTimeout(vm.previewAll, 13);
            });

            ctrlManager.init($('#editor-stage'));
        }
    };
});