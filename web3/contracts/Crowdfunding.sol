// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

library SafeMath {
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");
        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        uint256 c = a - b;
        return c;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }
        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");
        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0, "SafeMath: division by zero");
        uint256 c = a / b;
        return c;
    }
}

contract CrowdFunding {
    modifier noReentrancy() {
        require(!locked, "Reentrant call");
        locked = true;
        _;
        locked = false;
    }
    enum CampaignStatus { Open, Closed, Refund }
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
        CampaignStatus status;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;
    bool private locked;

    receive() external payable {}
    
    function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(_deadline > block.timestamp, "The deadline should be a date in the future.");
        require(_target > 0, "Target amount must be greater than 0");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;
        campaign.status = CampaignStatus.Open;

        numberOfCampaigns = SafeMath.add(numberOfCampaigns, 1);

        return SafeMath.sub(numberOfCampaigns, 1);
    }

    function donateToCampaign(uint256 _id) public payable {
        require(campaigns[_id].status == CampaignStatus.Open, "Campaign is closed");
        uint256 amount = msg.value;
        require(amount > 0, "Amount should be positive and more than 0");
        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        campaign.amountCollected = SafeMath.add(campaign.amountCollected, amount);
    }

    function getDonators(uint256 _id) external view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() external view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);
        for(uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }
        return allCampaigns;
    }

    function refundDonors(uint256 _id) public {
        Campaign storage campaign = campaigns[_id];

        require(msg.sender == campaign.owner, "Only the campaign owner can refund funds");
        require(campaign.amountCollected > 0, "No fund to refund");

        for (uint256 i = 0; i < campaign.donators.length; i++) {
            address payable donor = payable(campaign.donators[i]);
            uint256 donationAmount = campaign.donations[i];

            (bool sent, ) = donor.call{value: donationAmount}("");
            require(sent, "Failed to refund donor");
        }
        delete campaign.donators;
        delete campaign.donations;

        campaign.status = CampaignStatus.Refund;
        campaign.amountCollected = 0;
    }
    function reopenCampaingFromRefund(uint256 _id) public {
        Campaign storage campaign = campaigns[_id];
        require(msg.sender == campaign.owner, "Only the campaign owner can reopen the campaign");
        require(campaign.status == CampaignStatus.Refund, "Only Refund status can reopen the campaign");

        campaign.status = CampaignStatus.Open;
    }
    function withdrawFunds(uint256 _id) public {
        Campaign storage campaign = campaigns[_id];

        require(msg.sender == campaign.owner, "Only the campaign owner can withdraw funds");
        require(campaign.status == CampaignStatus.Open, "Campaign is closed");
        // require(block.timestamp >= campaign.deadline, "Withdrawal is only allowed after the campaign deadline");
        require(campaign.amountCollected > campaign.target / 2, "Funds can only be withdrawn if more than 50% of the target is reached");
        campaign.status = CampaignStatus.Closed;

        (bool sent,) = payable(campaign.owner).call{value: campaign.amountCollected}("");
        require(sent, "Failed to send funds to the campaign owner");
    }
}