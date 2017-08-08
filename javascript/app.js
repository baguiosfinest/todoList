(function () {

  var app = angular.module("todoApp", []);

  var dd = new Date("2017-7-20");

  app.controller("TodoController", function ($scope, $window) {

    $scope.title = "My Awesome ToDo App";

    $scope.saved = localStorage.getItem("savedList");

    $scope.sortOrder = 'dateAdded';

    // Test
    $scope.showSel = () => {
      console.log($scope.sortOrder);
    }

    $scope.todoLists = (localStorage.getItem("savedList") !== null ) ? JSON.parse($scope.saved) : [{
        name: "Angular",
        done: false,
        dateAdded: dd.toDateString(),
        duration: 1
      },
      {
        name: "Javascript",
        done: true,
        dateAdded: dd.toDateString(),
        duration: 2
      },
      {
        name: "CSS",
        done: false,
        dateAdded: dd.toDateString(),
        duration: 3
      },
      {
        name: "HTML 5",
        done: true,
        dateAdded: dd.toDateString(),
        duration: 4
      }];

    $scope.addTodo = function(){
      $scope.todo = {
        name: $scope.todoName,
        done: false,
        dateAdded: (new Date()).toDateString(),
        duration: 2
      };
      $scope.todoLists.push($scope.todo);
      $scope.todoName = "";
      localStorage.setItem("savedList", JSON.stringify($scope.todoLists));
      //console.log($scope.todoLists);
    }

    //console.log($scope.saved);
    //console.log($scope.todoLists);

    $scope.clearStorage = function(){
      alert('Local Storage Cleared! Back to default items.');
      localStorage.clear();
      $window.location.reload();

    }

    $scope.showItems = () => {
      console.log($scope.todoLists);
      console.log($scope.savedArchive);
    }

    $scope.update = () => {
      localStorage.setItem("savedList", JSON.stringify($scope.todoLists));
      localStorage.setItem("archiveList", JSON.stringify($scope.archiveList));
    }

    $scope.remove = ($index) => {
      ($scope.todoLists).splice($index,1);
      $scope.update();
      console.log($scope.todoLists);
    }


    // Long Cut
    $scope.removeToo = function(todo){
      ($scope.todoLists).splice(($scope.todoLists).indexOf(todo), 1)
      $scope.update();
      console.log(($scope.todoLists).indexOf(todo) + " Removed.");
    }

    $scope.remaining = (finished) => {
      let count = 0;
      for(var i = 0; i < $scope.todoLists.length ; i++){
        if(typeof finished === 'undefined'){
          if(!$scope.todoLists[i].done){
            count++;
          }
        }else{
          if($scope.todoLists[i].done){
            count++;
          }
        }

      }
      return count;
    }


    //$scope.archiveList = ($scope.archiveList !== null)? JSON.parse(localStorage.getItem("archiveList")) : [];
    $scope.savedArchive = localStorage.getItem("archiveList");
    $scope.archiveList = (localStorage.getItem("archiveList") !== null)? JSON.parse($scope.savedArchive) : [];
    $scope.archive = () => {
      var indx = 0;
      if($scope.remaining(true) > 0){
        console.log("Archiving Items...");

        for(var i = 0; i < $scope.todoLists.length; i++){
          if($scope.todoLists[i].done){
            ($scope.todoLists).splice(i,1);
            $scope.archiveList.push($scope.todoLists[i]);
          }
        }

        $scope.update();
        console.log($scope.archiveList);

      }else{
        console.log($scope.remaining(true));
        console.log("No Items to Archive.");
      }
    }




  });

})();
