// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TaxiMicroloan {
    struct LoanApplication {
        address applicant;
        string phoneNumber;
        uint256 loanAmount;
        bool isProcessed;
    }

    LoanApplication[] public applications;

    event LoanApplied(address indexed applicant, string phoneNumber, uint256 loanAmount);

    function applyForLoan(string memory phoneNumber, uint256 loanAmount) public {
        require(loanAmount > 0, "Loan amount must be greater than zero");

        LoanApplication memory newApplication = LoanApplication({
            applicant: msg.sender,
            phoneNumber: phoneNumber,
            loanAmount: loanAmount,
            isProcessed: false
        });

        applications.push(newApplication);

        emit LoanApplied(msg.sender, phoneNumber, loanAmount);
    }

    function getAllApplications() public view returns (LoanApplication[] memory) {
        return applications;
    }

    function processLoan(uint256 index) public {
        require(index < applications.length, "Invalid loan application index");
        require(!applications[index].isProcessed, "Loan is already processed");

        applications[index].isProcessed = true;
    }
}