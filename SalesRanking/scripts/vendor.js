(function(global) {  
    var VendorViewModel,
        app = global.app = global.app || {};
    
    function getData(pageSize, url, dataSourceToSet, viewModel){
            var that = this;
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
            
            getData(1000, "http://localhost/SalesRankingWeb/api/Clients/GetClientAbsoluteRanking?json=true", "vendorsDataSource", that);
        },
        
        initializeViewDesign: function() {
            
        },
        
        closeFilterPopover: function(e) {
            var popover = e.sender.element.closest('[data-role=popover]').data('kendoMobilePopOver');
            popover.close();
        }
        
    });
    
    
    
    app.vendorService = {
        viewModel: new VendorViewModel()
    };
})(window);