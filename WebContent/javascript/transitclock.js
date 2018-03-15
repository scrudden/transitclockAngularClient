(function() {
	var app = angular.module('transitclock', []);

	app.controller('vehicleeventController',['$http', function($http) {
			var transitclock=this;
			var vehicleevents = {};

			this.updateEvents = function(vehicleevents)
			{
				$http({url:'http://127.0.0.1:8080/vehicleevents/findByVehicleId', method:'GET', params: {vehicleId:vehicleevents.vehicleid}}
					).then(function successCallback(response){
						transitclock.vehicleevents = response.data;
					}, function errorCallback(response) {
						console.log(response);
					});
			}
	}]);

	app.controller('avlreportController',['$http', function($http) {
		var transitclock=this;
		var avlreports = {};
		this.updateReports = function(avlreports)
		{
			console.log("Calling updateReports on avlreportController.")
			$http({url:'http://127.0.0.1:8080/avlreports/findByVehicleId', method:'GET', params: {vehicleId:avlreports.vehicleid}}
				).then(function successCallback(response){
					transitclock.avlreports = response.data;
				}, function errorCallback(response) {
					console.log(response);
				});
		}
	}]);
	app.controller('predictionaccuracyController',['$http', function($http) {
		var transitclock=this;
		var predictionaccuaracys = {};
		this.updatePredictions = function(predictionaccuaracys)
		{
			console.log("Calling updatePredictions on predictionaccuracyController.")
			$http({url:'http://127.0.0.1:8080/predictionaccuracy/findByRouteId', method:'GET', params: {routeId:predictionaccuaracys.routeid}}
				).then(function successCallback(response){
					transitclock.predictionaccuaracys = response.data;
				}, function errorCallback(response) {
					console.log(response);
				});
		}
	}]);

	app.controller('stoppathpredictionController',['$http', function($http) {
		var transitclock=this;

		var chardata = [];

		var chart = new Object();

		var stoppathpredictions = {};
		/*
		var data=
		data.addColumn("Time");
		data.addColumn("Prediction");
		*/
		this.secondsfromMidnight = function (d) {
  		var e = new Date(d);
  		return d - e.setHours(0,0,0,0);
		};

		this.updatePredictions = function(stoppathpredictions)
		{
			console.log("Calling updatePredictions on stoppathpredictionController.");
			var chartdata=[];
			var xkey='x';
			var ykey='y';

			$http({url:'http://127.0.0.1:8080/stoppathpredictions/findByStopPathIndex', method:'GET', params: {travelTime:true, stopPathIndex:stoppathpredictions.stopPathIndex}}
				).then(function successCallback(response){
					transitclock.stoppathpredictions = response.data;

					for (var i = 0; i < transitclock.stoppathpredictions.length; i++)
					{
    				var entry = transitclock.stoppathpredictions[i];

        		var datamap=new Object();

						datamap[xkey]= i*100;
						datamap[ykey]= i*1000;

						chartdata.push(datamap);
					}

					var chartDataSet=new Object();

					chartDataSet['datasets']=[];
					chartDataSet['datasets'][0]=new Object();
					chartDataSet['datasets'][0]['data']=chartdata;

					var chart=Object();
					chart['data']=chartDataSet;
					chart['type']='line';
					chart['options']={
				    title: {
				      display: true,
				      text: 'Chart.js Scatter Chart'
				    },
				    scales: {
				      xAxes: [{
				        position: 'bottom',
				        gridLines: {
				          zeroLineColor: "rgba(0,255,0,1)"
				        },
				        scaleLabel: {
				          display: true,
				          labelString: 'x axis'
				        }
				      }],
				      yAxes: [{
				        position: 'right',
				        gridLines: {
				          zeroLineColor: "rgba(0,255,0,1)"
				        },
				        scaleLabel: {
				          display: true,
				          labelString: 'y axis'
				        }
				      }]
    				}
					};

					console.log(JSON.stringify(chart));

					var ctx = document.getElementById("stoppathpredictionChart");
					var stoppathpredictionChart = new  Chart.Scatter(ctx, chart);

				}, function errorCallback(response) {
					console.log(response);
				});
		}
	}]);

})();
