const SERVER_URL = 'http://class-server.herokuapp.com/collections/thanksgiving-2016';

function GifController ($scope, $http) {
  $scope.gifs = [];
  $scope.errors = {};
  function init() {
    $http.get(SERVER_URL).then(function (resp) {
      console.log(resp.data);
      $scope.gifs = resp.data;
    });
  };

  init();

  $scope.validateName = function (url) {

    if (name === '') {
      $scope.errors.name = "You have to supply a name";
    }
  }

  $scope.validateUrl = function (url) {
    if (!url.startsWith('http')) {
      $scope.errors.url = "Must be a valid URL starting with http or https.";
    }

    if (url === '') {
      $scope.errors.url = "";
    }
  }

  $scope.addGif = function (gif) {
    if ($scope.validateUrl(gif.url)) {
      $http.post(SERVER_URL, gif).then(function (resp) {
        let gif = resp.data;
        $scope.gifs.push(gif);
        console.log($scope.gifs);
      });
    }
  }

  $scope.deleteMe = function (gif) {
    $http.delete(SERVER_URL + gif._id).then(function (resp) {
      console.log(resp);
      $scope.gifs = $scope.gifs.filter( x => X._id !== gif._id);
    });


}

GifController.$inject = ['$scope','$http'];
export { GifController };