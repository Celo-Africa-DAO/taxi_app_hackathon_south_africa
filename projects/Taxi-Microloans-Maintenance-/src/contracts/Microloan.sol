// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LoanApplication {
    struct Loan {
        uint id;
        address applicant;
        string name;
        string contact;
        string taxiDetails;
        uint amount;
        string purpose;
        string repaymentPlan;
        uint interestRate;
        string status; // "pending", "approved", "rejected"
        string[] messages; // Messages for communication
        bool repaid;
    }

    mapping(uint => Loan) public loans;
    uint public loanCount;

    event LoanRequested(
        uint id,
        address indexed applicant,
        string name,
        uint amount,
        string status
    );

    event LoanStatusUpdated(
        uint id,
        string status
    );

    event MessageAdded(
        uint id,
        string message
    );

    function requestLoan(
        string memory _name,
        string memory _contact,
        string memory _taxiDetails,
        uint _amount,
        string memory _purpose,
        string memory _repaymentPlan,
        uint _interestRate
    ) public {
        require(_amount > 0, "Loan amount must be greater than zero");
        
        loanCount++;
        
        loans[loanCount] = Loan(
            loanCount,
            msg.sender,
            _name,
            _contact,
            _taxiDetails,
            _amount,
            _purpose,
            _repaymentPlan,
            _interestRate,
            "pending",
            new string[](0), // Initialize messages array as an empty array
            false // Repaid status
        );

        emit LoanRequested(loanCount, msg.sender, _name, _amount, "pending");
    }

    function updateLoanStatus(uint _id, string memory _status) public {
        require(_id > 0 && _id <= loanCount, "Loan does not exist");
        
        Loan storage loan = loans[_id];
        
        // Optional: Add access control here

        loan.status = _status;

        emit LoanStatusUpdated(_id, _status);
    }

    function addMessage(uint _id, string memory _message) public {
        require(_id > 0 && _id <= loanCount, "Loan does not exist");
        
        Loan storage loan = loans[_id];
        
        loan.messages.push(_message);

        emit MessageAdded(_id, _message);
    }

    function markAsRepaid(uint _id) public {
        require(_id > 0 && _id <= loanCount, "Loan does not exist");
        
        Loan storage loan = loans[_id];
        
        require(!loan.repaid, "Loan already marked as repaid");
        
        loan.repaid = true;
    }

    function getLoan(uint _id) public view returns (Loan memory) {
        require(_id > 0 && _id <= loanCount, "Loan does not exist");
        
        return loans[_id];
    }
}