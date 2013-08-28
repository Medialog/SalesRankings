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
        },
        
        createClientLastMonthGrowthChart: function () {
            app.homeService.viewModel.drawClientLastMonthGrowthChart();
            app.homeService.viewModel.bindResizeEvent();
        },
        
        drawClientLastMonthGrowthChart: function() {
            var $columnChart = $("#clientcolumn-chart");

            columnChart = $columnChart.kendoChart({
                dataSource: new kendo.data.DataSource({
        data: [
          { client: "SIC", value: 47.1, vendors: "António" },
          { client: "TVI", value: 40.5, vendors: "aa" },
          { client: "RTP1", value: 31.5, vendors: "zz" },
          { client: "Eurosport", value: 30.0, vendors: "xx" },
          { client: "BBC", value: 14.1, vendors: "aaa" },
          { client: "SIC Mulher", value: 6.9, vendors: "aaa" },
          { client: "TVI24", value: 6.2, vendors: "aaa" }
        ]
      }),
                theme: app.chartsTheme,
                renderAs: "svg",
                title: {
                    position: "top",
                    text: "Crescimento Clientes Último Mês"
                },
                legend: {
                    position: "bottom"
                },
                chartArea: {
                    background: ""
                },
                seriesDefaults: {
                    type: "column"
                },
                series: [
                    {
                        field: 'value'
                    }
                ],
                categoryAxis: {
                    field: "client",
                    majorGridLines: {
                        visible: false
                    },
                    labels:{
                        template: '#: data.value #'
                    }
                },
                valueAxis: {
                    labels: {
                        template: '#: data.value # %'
                    },
                    line: {
                        visible: false
                    }
                },
                tooltip: {
                    visible: true,
                    template: kendo.template('#: value # % #: dataItem.vendors #')
                }
            }).data("kendoChart");
        },
        
        bindResizeEvent: function () {
            $(window).on("resize.columnChart", $.proxy(app.homeService.viewModel.drawClientLastMonthGrowthChart, app.homeService.viewModel));
        },

        unbindResizeEvent: function () {
            $(window).off("resize.columnChart");
        }
        
    });
    
    
    
    app.homeService = {
        viewModel: new HomeViewModel()
    };
})(window);