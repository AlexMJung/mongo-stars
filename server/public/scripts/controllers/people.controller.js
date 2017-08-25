myApp.controller('PeopleController', ['PersonService', 
function (PersonService) {
    console.log('People Controller loaded.');
    
    var self = this;
    self.newPerson = {};
    PersonService.getPeople();
    self.gottenPeople = PersonService.gottenPeople;    
    // self.PersonSearch = {};
    self.theLostPeople= PersonService.theLostPeople;

    self.addPerson = function() {
        // have service send this to the server
        console.log('clicked to add new person');
        PersonService.addPeople(self.newPerson);
        console.log(self.newPerson)
    }

    self.updatePerson = function(currentPerson){
        currentPerson.location = "Oz";
        PersonService.updatePerson(currentPerson);
    }
//add points start
    self.addPoints = function (currentPerson) {
        currentPerson.internetPts = currentPerson.internetPts + 100;
        PersonService.updatePoints(currentPerson);
    }
//add points ends
    self.deletePerson = function(personId) {
        PersonService.deletePerson(personId);
    }


//search folks starts
    self.searchPerson = function () {
        PersonService.searchPerson(self.PersonSearch);        
    }


//ends

console.log(self.theLostPeople.list);




}]);
