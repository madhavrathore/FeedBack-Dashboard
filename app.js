var app = angular.module("reviewApp",[]);
app.controller("reviewController",function($scope,$http)
{
	$scope.reviews = [];
	$scope.productId =1;
	$scope.viewerId = 1;
	$scope.isLoading = false;
	$scope.errorMessage = false;

	$scope.currentPage = 1;
	$scope.pageSize = 3;
	$scope.totalPages = 0;

	$scope.loadReviews= function(){
		if(!$scope.productId || $scope.productId == undefined){
			$scope.errorMessage = 'Please select productId';
		}
		if(!$scope.viewerId || $scope.viewerId == undefined){
			$scope.errorMessage = 'Please select viewerId';
		}
		$scope.isLoading = true;
		var url = "http://www.i2ce.in/reviews/" + $scope.productId + "/" + $scope.viewerId;
		$http({
			method : "GET",
			url : url
		}).then (function(response) {
			$scope.isLoading = false;
			$scope.errorMessage=false;
			$scope.reviews = response.data.reviews;
			$scope.totalPages = Math.ceil($scope.reviews.length / $scope.pageSize); 
			console.log($scope.reviews.length);
		}),function error(response){
			$scope.errorMessage = response.data.message;	
		};
	};

		$scope.loadReviews();

});

app.filter('startIndex', function(){
	return function(data, start){
		start = +start;
		return data.slice(start);
	}
});


