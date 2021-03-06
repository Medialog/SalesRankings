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
        lastMonthGrowthDataSourceByClient: null,
        vendorRankingInMonthDataSource: null,
        vendorGrowthInMonthDataSource: null,
        vendorName: "",
        vendorBestClient: "",
        vendorTotalEarned: "",
        vendorObjective: "",
        vendorImage: "",
        
        init: function () {
            var that = this;
            kendo.data.ObservableObject.fn.init.apply(that, []);
        },
        
        initializeViewDesign: function(e) {
            var view = e.view;
        },
        
        createLastMonthGrowthChart: function() {
            app.vendorService.viewModel.drawLastMonthGrowthChart();
            app.vendorService.viewModel.bindResizeEvent();  
        },
        
        createVendorRankingInMonthChart: function() {
            app.vendorService.viewModel.drawVendorRankingInMonthChart(); 
            app.vendorService.viewModel.bindVendorRankingResizeEvent();
        },
        
        createVendorGrowthRankingInMonthChart: function() {
            app.vendorService.viewModel.drawVendorGrowthRankingInMonthChart(); 
            app.vendorService.viewModel.bindVendorGrowthRankingResizeEvent();
        },
        
        drawLastMonthGrowthChart: function() {
            var $clientsColumnChart = $("#vendorclientscolumn-chart");

            clientsColumnChart = $clientsColumnChart.kendoChart({
                dataSource: this.lastMonthGrowthDataSourceByClient,
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
                        field: "Growth",
                        colorField: "UserColor"
                    }
                ],
                categoryAxis: {
                    field: "Clients",
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
                    template: kendo.template('#: value #% Ranking clientes:#: dataItem.Ranking #º')
                },
                
            }).data("kendoChart");
        },
        
        drawVendorRankingInMonthChart: function() {
            var $vendorRankingInMonthColumnChart = $("#vendorrankingcolumn-chart");

            vendorRankingColumnChart = $vendorRankingInMonthColumnChart.kendoChart({
                dataSource: this.vendorRankingInMonthDataSource,
                theme: app.chartsTheme,
                renderAs: "svg",
                title: {
                    position: "top",
                    text: "Ranking Venda Último Mês"
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
                        field: "Performed",
                        colorField: "UserColor"
                    }
                ],
                categoryAxis: {
                    field: "Vendor",
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
                    template: kendo.template('#: value #%. Atingido #: dataItem.Achieved # de #: dataItem.Target #')
                },
                
            }).data("kendoChart");
        },

        drawVendorGrowthRankingInMonthChart: function() {
            var $vendorGrowthRankingInMonthColumnChart = $("#vendorgrowthrankingcolumn-chart");

            vendorGrowthRankingColumnChart = $vendorGrowthRankingInMonthColumnChart.kendoChart({
                dataSource: this.vendorGrowthInMonthDataSource,
                theme: app.chartsTheme,
                renderAs: "svg",
                title: {
                    position: "top",
                    text: "Crescimento Último Mês"
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
                        field: "Growth",
                        colorField: "UserColor"
                    }
                ],
                categoryAxis: {
                    field: "Vendor",
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
                    template: kendo.template('#: value #%')
                },
                
            }).data("kendoChart");
        },
        
        bindResizeEvent: function () {
            $(window).on("resize.clientsColumnChart", $.proxy(app.vendorService.viewModel.drawLastMonthGrowthChart, app.vendorService.viewModel));
        },
        
        bindVendorRankingResizeEvent: function () {
            $(window).on("resize.vendorRankingColumnChart", $.proxy(app.vendorService.viewModel.drawVendorRankingInMonthChart, app.vendorService.viewModel));
        },
        
        bindVendorGrowthRankingResizeEvent: function () {
            $(window).on("resize.vendorGrowthRankingColumnChart", $.proxy(app.vendorService.viewModel.drawVendorGrowthRankingInMonthChart, app.vendorService.viewModel));
        },

        unbindResizeEvent: function () {
            $(window).off("resize.clientsColumnChart");
            $(window).off("resize.vendorRankingColumnChart");
            $(window).off("resize.vendorGrowthRankingColumnChart");
        },
        
        loadData: function(e) {
            try{
                e.view.loader.show();
                var uid = e.view.params.uid;
                if(!uid && app.vendorService.viewModel.vendorName)
                    uid = app.vendorService.viewModel.vendorName;
                if(!uid)
                    uid = "Abertura De Clientes";
                e.view.header.find('.view-title-container .viewTitle').text(uid);
                var dataSource = new kendo.data.DataSource({
                    transport: {
                        read: {
                            url: "data/Detail/" + getFileByUid(uid) + ".json", //"http://localhost/SalesRankingWeb/api/Vendors/Details?json=true&vendorName=" + uid,
                            dataType: "json"
                        }
                    },
                    change: function() {
                        app.vendorService.viewModel.vendorName = this.data()[0].Name;
                        app.vendorService.viewModel.vendorBestClient = "Melhor cliente: " + this.data()[0].BestClient;
                        app.vendorService.viewModel.vendorTotalEarned = "Total vendas anual: " + this.data()[0].TotalSales + "€";
                        app.vendorService.viewModel.vendorObjective = "Objectivo anual: " + this.data()[0].TotalTarget + "€";
                        app.vendorService.viewModel.vendorImage = vendorImage(app.vendorService.viewModel.vendorName);
                        var lastMonthVariationTmpl = kendo.template($("#lastMonthVariationTmpl").html());
                        $(".lastMonthVariationContainer").html(lastMonthVariationTmpl({
                            MonthSales: this.data()[0].MonthSales, LastMonthSales: this.data()[0].LastMonthSales
                        }));
                        var monthGrowthRankingVariationTmpl = kendo.template($("#monthGrowthRankingVariationTmpl").html());
                        $(".monthRankingByVendorVariationContainer").html(monthGrowthRankingVariationTmpl({
                            MonthRankByTarget: this.data()[0].MonthRankByTarget,
                            PrevMonthRankByTarget: this.data()[0].PrevMonthRankByTarget
                        }));
                        var rankingsByVendorContainerTmpl = kendo.template($("#rankingsByVendorContainerTmpl").html());
                        $(".rankingsByVendorContainer").html(rankingsByVendorContainerTmpl({
                            OverallRankBySales: this.data()[0].OverallRankBySales,
                            OverallRankByTarget: this.data()[0].OverallRankByTarget,
                            OverallRankLastMonth: this.data()[0].OverallRankLastMonth,
                            GrowthRankLastMonthByTarget: this.data()[0].GrowthRankLastMonthByTarget
                        }));
                        kendo.bind($(".vendorInfo .spanVendorName"), app.vendorService.viewModel);
                        kendo.bind($(".vendorInfo .spanVendorBestClient"), app.vendorService.viewModel);
                        kendo.bind($(".vendorInfo .spanVendorTotalEarned"), app.vendorService.viewModel);
                        kendo.bind($(".vendorInfo .spanVendorObjective"), app.vendorService.viewModel);
                        kendo.bind($(".vendorInfoContainer .vendorImg"), app.vendorService.viewModel);
                        kendo.bind($(".lastMonthVariation"), app.vendorService.viewModel);
                        
                        //getData(6, "http://localhost/SalesRankingWeb/api/Vendors/GetVendorLastMonthGrowthRankingByClient?json=true&vendorName=" + this.data()[0].Name,
                        //    "lastMonthGrowthDataSourceByClient", app.vendorService.viewModel);
                        getData(6, "data/VendorClientsChart/" +  getFileByUid(this.data()[0].Name) + ".json",
                            "lastMonthGrowthDataSourceByClient", app.vendorService.viewModel);  
                        app.vendorService.viewModel.createLastMonthGrowthChart();
                        
                        //getData(50, "http://localhost/SalesRankingWeb/api/Vendors/GetVendorRankingInMonth?json=true&vendorName=" + this.data()[0].Name,
                        //    "vendorRankingInMonthDataSource", app.vendorService.viewModel);
                        getData(50, "data/VendorRankingChart/" + getFileByUid(this.data()[0].Name) + ".json",
                            "vendorRankingInMonthDataSource", app.vendorService.viewModel);
                        app.vendorService.viewModel.createVendorRankingInMonthChart();
                        
                        //getData(50, "http://localhost/SalesRankingWeb/api/Vendors/GetVendorLastMonthGrowthRanking?json=true&vendorName=" + this.data()[0].Name,
                        //    "vendorGrowthInMonthDataSource", app.vendorService.viewModel);
                        getData(50, "data/VendorGrowthRankingChart/" + getFileByUid(this.data()[0].Name) + ".json",
                            "vendorGrowthInMonthDataSource", app.vendorService.viewModel);
                        app.vendorService.viewModel.createVendorGrowthRankingInMonthChart();
                        
                    }
                });
                dataSource.read();
            }
            catch(exc){
            }
            finally{
                e.view.loader.hide();
            }
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
            try{
                if(app.vendorService.listViewModel.vendorsLoaded) return;
                e.view.loader.show();
                var dataSource = new kendo.data.DataSource({
                    transport: {
                        read: {
                            url: "data/VendorList.json",//"http://localhost/SalesRankingWeb/api/Vendors/List?json=true",
                            dataType: "json"
                        }
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
                        var vendorName = $(e.touch.currentTarget).find("label").text();
                        kendo.mobile.application.navigate("#tabstrip-vendor?uid=" + vendorName);
                    }
                });
                app.vendorService.listViewModel.vendorsLoaded = true;    
            }
            catch(exc){}
            finally{
                e.view.loader.hide();
            }
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