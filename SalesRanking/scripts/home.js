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
            
            getData(5, "data/GetClientAbsoluteRanking.json", "absoluteRankingDataSource", that);
            
            getData(5, "data/GetClientLastMonthAbs.json", "absoluteRankingLastMonthDataSource", that);
            
            getData(8, "data/GetClientLastMonthGrowth.json", "lastMonthGrowthDataSource", that);
            
            getData(5, "data/ClientRankingByYear.json", "yearGrowthDataSource", that);
            
            getData(5, "data/GetVendorLastMonthGrowth.json", "vendorGrowthLastMonthDataSource", that);

            
            /*getData(5, "http://localhost/SalesRankingWeb/api/Clients/GetClientAbsoluteRanking?json=true", "absoluteRankingDataSource", that);
            
            getData(5, "http://localhost/SalesRankingWeb/api/Clients/GetClientLastMonthAbsoluteRanking?json=true", "absoluteRankingLastMonthDataSource", that);
            
            getData(8, "http://localhost/SalesRankingWeb/api/Clients/GetClientLastMonthGrowth?json=true", "lastMonthGrowthDataSource", that);
            
            getData(5, "http://localhost/SalesRankingWeb/api/Clients/ClientRankingByYear?json=true", "yearGrowthDataSource", that);
            
            getData(5, "http://localhost/SalesRankingWeb/api/Vendors/GetVendorLastMonthGrowthRanking?json=true", "vendorGrowthLastMonthDataSource", that);*/
        },
        
        initializeViewDesign: function() {
            app.homeService.viewModel.createClientLastMonthGrowthChart();
        },
        
        createClientLastMonthGrowthChart: function () {
            app.homeService.viewModel.drawClientLastMonthGrowthChart();
            app.homeService.viewModel.bindResizeEvent();
        },
        
        drawClientLastMonthGrowthChart: function() {
            var $columnChart = $("#clientcolumn-chart");

            columnChart = $columnChart.kendoChart({
                dataSource: this.lastMonthGrowthDataSource,
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
                        field: "Growth"
                    }
                ],
                categoryAxis: {
                    field: "Client",
                    majorGridLines: {
                        visible: false
                    },
                    labels:{
                        template: '#: data.value.toString().length > 25 ? data.value.substring(0,25) + "..." : data.value #',
                        rotation: -90
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
                    template: kendo.template('#: value #% Vendedor:#: dataItem.Vendors #')
                },
                
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