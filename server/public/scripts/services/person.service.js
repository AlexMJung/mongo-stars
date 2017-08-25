myApp.service('PersonService', ['$http', function($http) {
    console.log('Person service loaded.');

    var self = this;
    self.gottenPeople = { list: [] };
    self.theLostPeople= { list: [] };


    self.searchPerson = function (PersonSearch) {
        $http.get('/person/' + PersonSearch ).then(function (response) {
            self.theLostPeople.list = response.data;
            console.log('get response: ', self.theLostPeople);
        });
    };

    self.getPeople = function() {
        $http.get('/person').then(function(response) {
            self.gottenPeople.list = response.data;
            console.log('get response: ', self.gottenPeople);
        });
    };

    self.addPeople = function(newPerson) { 
        console.log('going to send this object to the server: ', newPerson);
               
        $http.post('/person', newPerson).then(function(response) {
            console.log('service post response: ', response);
            self.getPeople();            
        });
    };

    self.updatePerson = function (currentPerson) {
    console.log('service is going to send info', currentPerson);
        $http.put('/person/' + currentPerson._id, currentPerson).then(function(response){
            console.log('service update', response);
            self.getPeople();
        })
};
//add points start
    self.updatePoints = function (currentPerson) {
        console.log('service is going to send info', currentPerson);
        $http.put('/person/' + currentPerson._id + '/addPoints', currentPerson).then(function (response) {
            console.log('service update', response);
            self.getPeople();
        })
    };
//add points end

    self.deletePerson = function(personId){
    $http.delete('/person/' + personId).then(function(response){
        self.getPeople();
    })        
    };

}]);