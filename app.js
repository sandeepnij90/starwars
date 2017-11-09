var myApp = angular.module("myApp", []);

myApp.controller("mainController", ($scope, $http) => {
  $scope.personSelected = "enter a character";
  $scope.hidden = true;
  $scope.clearText = function() {
    $scope.personSelected = "";
  }

  // consume the people api
  $http.get("https://swapi.co/api/people").then(response => {
    $scope.peopleList = response.data.results;
  });

  // get the value of input and sort through people until match
  $scope.searchPeople = function() {
    if ($scope.peopleList == undefined) {
      alert("please wait for the content to be downloaded");
    } else {
      $scope.person = $scope.peopleList.filter(person => {
        if (person.name.toLowerCase() !== $scope.personSelected.toLowerCase()) {
          return false
        } else {
          return true;
        }
      })

      // if isnt found then generate error
      if ($scope.person.length == 0) {
        $scope.hidden = true;
        $scope.errorMessage = "No character found"
      } else {
        $scope.errorMessage = "";
        $scope.age = $scope.person[0].birth_year;
        $scope.gender = $scope.person[0].gender;
        $scope.haircolour = $scope.person[0].hair_color;
        $scope.eyecolour = $scope.person[0].eye_color;
        $scope.height = $scope.person[0].height + "cm";
        $scope.weight = $scope.person[0].mass + "kg";

        // get planet and fill in the relative data
        $http.get($scope.person[0].homeworld).then(response => {
          $scope.planet = response.data;
          setPlanet();
        });
      }
    }
  }

  function setPlanet() {
    $scope.planetName = $scope.planet.name;
    $scope.planetDiameter = $scope.planet.diameter;
    $scope.planetClimate = $scope.planet.climate;
    $scope.planetGravity = $scope.planet.gravity;
    $scope.planetPopulation = $scope.planet.population;
    $scope.hidden = false;
  }
})
