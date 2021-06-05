pragma solidity >=0.4.17;

contract Campaign{
    struct Request{
        string description;
        uint value;
        address payable recipient;
        bool complete;
        mapping(address=>bool) approvals;
        uint approvalCount;
    }
    
    address public manager;
    uint public minimumContribution;
    mapping(address=>bool) public approvers;
    uint public approversCount;
    uint numRequests;
    mapping (uint => Request) requests;
    
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
    
    constructor(uint minimum, address campaignCreator) public {
        manager = campaignCreator;
        minimumContribution = minimum;
    }
    
    function contribute() public payable{
        require(msg.value > minimumContribution);
        
        approvers[msg.sender] = true;
        
        approversCount++;
    }
    
    function createRequest (string memory description, uint value,
            address payable recipient) public restricted{
                Request storage r = requests[numRequests++];
                r.description = description;
                r.value = value;
                r.recipient = recipient;
                r.complete = false;
                r.approvalCount = 0;
    }
    
    function approveRequest(uint index) public{
        Request storage request = requests[index];
        
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finalizeRequest(uint index) public restricted{
        Request storage request = requests[index];
        
        require(!request.complete);
        require(request.approvalCount > (approversCount/2));
        
        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns(uint, uint, uint, uint, address){
       return(
            minimumContribution,
            address(this).balance,
            numRequests,
            approversCount,
            manager
       );
    }

    function getRequestCount() public view returns(uint){
        return numRequests;
    }
}

contract CampaignFactory{
    Campaign[] deployedCampaigns;
    
    function createCampaign(uint minimum) public{
            Campaign newCampaign = new Campaign(minimum, msg.sender);
            deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns (Campaign[] memory){
        return deployedCampaigns;
    }
}



