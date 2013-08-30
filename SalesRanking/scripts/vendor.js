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
    
    function touchstart(e){
        
    }
    
    function navigate(e) {
        var itemUID = $(e.touch.currentTarget).data("uid");
        kendo.mobile.application.navigate("#tabstrip-vendor?uid=" + itemUID);
    }
    
    VendorViewModel = kendo.data.ObservableObject.extend({
        
        vendorsDataSource: null,
        
        init: function () {
            var that = this;
            kendo.data.ObservableObject.fn.init.apply(that, []);
            
            //getData(500, "http://localhost/SalesRankingWeb/api/Vendors/List?json=true", "vendorsDataSource", that);
        },
        
        initializeViewDesign: function() {
            
        },
        
        bindVendors: function() {
           getData(5, "http://localhost/SalesRankingWeb/api/Vendors/List?json=true", "vendorsDataSource", app.vendorService.viewModel);
        }
        
    });
    
    VendorListViewModel = kendo.data.ObservableObject.extend({
        
        vendorsLoaded: false,
        
        init: function () {
            var that = this;
            kendo.data.ObservableObject.fn.init.apply(that, []);
        },
        
        bindVendors: function() {
            if(app.vendorService.listViewModel.vendorsLoaded) return;
            var dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "http://localhost/SalesRankingWeb/api/Vendors/List?json=true",
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
                    var itemUID = $(e.touch.currentTarget).data("uid");
                    kendo.mobile.application.navigate("#tabstrip-vendor?uid=" + itemUID);
                }
            });
            app.vendorService.listViewModel.vendorsLoaded = true;
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