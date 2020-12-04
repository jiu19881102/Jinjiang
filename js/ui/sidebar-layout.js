/**
    @fileOverview
    aside layout list
    @author Jinjiang<zhaojinjiang@yahoo.com.cn>
 */




/**
    侧边栏中布局列表的构造器
    @constructor
 */
function Layout() {
    var root = $('#panel-layout');
    var list = $('#panel-layout-list');
    var current;
    var that = this;

    function initData(layoutArray) {
        list.empty();
        $.each(layoutArray, function (index, layout) {
            var li = $('<li></li>').
                attr('title', layout.title).
                attr('data-key', layout.key);
            list.append(li);
        });
    }

    /**
        设置当前选中项
     */
    function setCurrent(data) {
        list.find('li').each(function (index, item) {
            item = $(item);
            if (item.attr('data-key') == data) {
                if (current) {
                    current.removeClass('current');
                }
                item.addClass('current');
                current = item;
            }
        })
    }

    list.delegate('li', 'click', function () {
        var key = $(this).attr('data-key');
        that.notify('layout', key);
    });

    this.initData = initData;
    this.current = current;
    this.setCurrent = setCurrent;
}


reg(Layout);



