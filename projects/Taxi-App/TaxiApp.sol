<<<<<<< HEAD
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PaymentContract {
    address public owner;
    mapping(address => uint) public balances;

    constructor() {
        owner = msg.sender;
    }

    function topUp() public payable {
        balances[msg.sender] += msg.value;
    }

    function payDriver(address payable _driver, uint _amount) public {
        require(balances[msg.sender] >= _amount, "Insufficient funds");
        balances[msg.sender] -= _amount;
        _driver.transfer(_amount);
    }

    function getBalance() public view returns (uint) {
        return balances[msg.sender];
    }
}

contract RideSharingContract {
    struct Ride {
        address passenger;
        address driver;
        string pickupLocation;
        string dropoffLocation;
        uint fare;
        bool completed;
    }

    Ride[] public rides;
    mapping(address => uint) public rideIndexes;

    function createRide(string memory _pickup, string memory _dropoff, uint _fare) public {
        rides.push(Ride(msg.sender, address(0), _pickup, _dropoff, _fare, false));
        rideIndexes[msg.sender] = rides.length - 1;
    }

    function acceptRide(uint _rideIndex) public {
        require(rides[_rideIndex].driver == address(0), "Ride already accepted");
        rides[_rideIndex].driver = msg.sender;
    }

    function completeRide(uint _rideIndex) public {
        require(rides[_rideIndex].driver == msg.sender, "Only the assigned driver can complete the ride");
        rides[_rideIndex].completed = true;
    }

    function getRide(uint _rideIndex) public view returns (Ride memory) {
        return rides[_rideIndex];
    }
}

contract LoyaltyRewardsContract {
    mapping(address => uint) public loyaltyPoints;
    mapping(address => uint) public rewards;

    function addLoyaltyPoints(address _user, uint _points) public {
        loyaltyPoints[_user] += _points;
    }

    function redeemPoints(uint _points) public {
        require(loyaltyPoints[msg.sender] >= _points, "Not enough loyalty points");
        loyaltyPoints[msg.sender] -= _points;
        rewards[msg.sender] += _points / 10; 
    }

    function checkPoints() public view returns (uint) {
        return loyaltyPoints[msg.sender];
    }

    function checkRewards() public view returns (uint) {
        return rewards[msg.sender];
    }
}
=======
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PaymentContract {
    address public owner;
    mapping(address => uint) public balances;

    constructor() {
        owner = msg.sender;
    }

    function topUp() public payable {
        balances[msg.sender] += msg.value;
    }

    function payDriver(address payable _driver, uint _amount) public {
        require(balances[msg.sender] >= _amount, "Insufficient funds");
        balances[msg.sender] -= _amount;
        _driver.transfer(_amount);
    }

    function getBalance() public view returns (uint) {
        return balances[msg.sender];
    }
}

contract RideSharingContract {
    struct Ride {
        address passenger;
        address driver;
        string pickupLocation;
        string dropoffLocation;
        uint fare;
        bool completed;
    }

    Ride[] public rides;
    mapping(address => uint) public rideIndexes;

    function createRide(string memory _pickup, string memory _dropoff, uint _fare) public {
        rides.push(Ride(msg.sender, address(0), _pickup, _dropoff, _fare, false));
        rideIndexes[msg.sender] = rides.length - 1;
    }

    function acceptRide(uint _rideIndex) public {
        require(rides[_rideIndex].driver == address(0), "Ride already accepted");
        rides[_rideIndex].driver = msg.sender;
    }

    function completeRide(uint _rideIndex) public {
        require(rides[_rideIndex].driver == msg.sender, "Only the assigned driver can complete the ride");
        rides[_rideIndex].completed = true;
    }

    function getRide(uint _rideIndex) public view returns (Ride memory) {
        return rides[_rideIndex];
    }
}

contract LoyaltyRewardsContract {
    mapping(address => uint) public loyaltyPoints;
    mapping(address => uint) public rewards;

    function addLoyaltyPoints(address _user, uint _points) public {
        loyaltyPoints[_user] += _points;
    }

    function redeemPoints(uint _points) public {
        require(loyaltyPoints[msg.sender] >= _points, "Not enough loyalty points");
        loyaltyPoints[msg.sender] -= _points;
        rewards[msg.sender] += _points / 10; 
    }

    function checkPoints() public view returns (uint) {
        return loyaltyPoints[msg.sender];
    }

    function checkRewards() public view returns (uint) {
        return rewards[msg.sender];
    }
}
>>>>>>> 5c1529be39bb8c0dfac2f3824d6e2143bf62502f
