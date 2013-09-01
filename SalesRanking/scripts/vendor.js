(function(global) {  
    var VendorViewModel,
        VendorListViewModel,
        app = global.app = global.app || {};
    
    function getData(pageSize, url, dataSourceToSet, viewModel){
            var dataSource = new kendo.data.DataSource({
                pageSize: pageSize,
                transport: {
                    read: {
                        url: url,
                        dataType: "json"
                    }
                }
            });
            viewModel.set(dataSourceToSet, dataSource);
        };
    
    VendorViewModel = kendo.data.ObservableObject.extend({
        
        vendorsDataSource: null,
        
        init: function () {
            var that = this;
            kendo.data.ObservableObject.fn.init.apply(that, []);
        },
        
        initializeViewDesign: function(e) {
            var view = e.view;
        },
        
        loadData: function(e) {
            e.view.loader.show();
            var uid = e.view.params.uid;
            if(uid)
                e.view.header.find('[data-role="navbar"]').data('kendoMobileNavBar').title(uid)
            e.view.loader.hide();
        }
        
    });
    
    VendorListViewModel = kendo.data.ObservableObject.extend({
        
        vendorsLoaded: false,
        theView: null,
        
        init: function () {
            var that = this;
            kendo.data.ObservableObject.fn.init.apply(that, []);
        },
        
        bindVendors: function(e) {
            if(app.vendorService.listViewModel.vendorsLoaded) return;
            e.view.loader.show();
            var dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "data/VendorList.json",//"http://localhost/SalesRankingWeb/api/Vendors/List?json=true",
                        dataType: "json"
                    }
                },
                change: function() {
                    /*var data = this.data();
                    for(var i=0; i< data.length; i++){
                        
                    }*/
                }   
            });
            dataSource.read();
            $("#vendorFilterListView").kendoMobileListView({
                dataSource: dataSource,
                template: $("#vendorFilterListViewTmpl").html()
            }).kendoTouch({
                filter: ">li",
                enableSwipe: false,
                tap: function(e){
                    app.vendorService.listViewModel.closeFilterPopover(e);
                    var vendorName = $(e.touch.currentTarget).find("span").html();
                    kendo.mobile.application.navigate("#tabstrip-vendor?uid=" + vendorName);
                }
            });
            app.vendorService.listViewModel.vendorsLoaded = true;
            e.view.loader.hide();
        },
        
        closeFilterPopover: function(e) {
            var popover = e.sender.element.closest('[data-role=popover]').data('kendoMobilePopOver');
            popover.close();
        }
        
    });
    
    
    
    app.vendorService = {
        viewModel: new VendorViewModel(),
        listViewModel: new VendorListViewModel()
    };
})(window);