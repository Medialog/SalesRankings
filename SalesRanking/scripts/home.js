(function(global) {  
    var HomeViewModel,
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
    
    HomeViewModel = kendo.data.ObservableObject.extend({
        absoluteRankingDataSource: null,
        absoluteRankingLastMonthDataSource: null,
        lastMonthGrowthDataSource: null,
        yearGrowthDataSource: null,
        vendorGrowthLastMonthDataSource: null,
        
        init: function () {
            var that = this;
            
            kendo.data.ObservableObject.fn.init.apply(that, []);
            
            /*getData(10, "http://localhost/SalesRankingWeb/api/Clients/GetClientAbsoluteRanking?json=true", "absoluteRankingDataSource", that);
            
            getData(10, "http://localhost/SalesRankingWeb/api/Clients/GetClientLastMonthAbsoluteRanking?json=true", "absoluteRankingLastMonthDataSource", that);
            
            getData(10, "http://localhost/SalesRankingWeb/api/Clients/GetClientLastMonthGrowth?json=true", "lastMonthGrowthDataSource", that);
            
            getData(10, "http://localhost/SalesRankingWeb/api/Clients/ClientRankingByYear?json=true", "yearGrowthDataSource", that);*/
            
            getData(5, "http://localhost/SalesRankingWeb/api/Vendors/GetVendorLastMonthGrowthRanking?json=true", "vendorGrowthLastMonthDataSource", that);
        }        
    });  
    
    app.homeService = {
        viewModel: new HomeViewModel()
    };
})(window);