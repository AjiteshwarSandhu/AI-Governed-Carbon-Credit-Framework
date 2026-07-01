// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarbonCreditManager is ERC1155, Ownable, Pausable, ReentrancyGuard{

    // ============================================================
    // CONSTANTS
    // ============================================================

    uint256 public nextTokenId = 1;
    uint256 public requiredValidators = 1;

    // ============================================================
    // ENUMS
    // ============================================================

    enum ProjectStatus {
        Pending,
        Approved,
        Rejected,
        Minted,
        Retired
    }

    // ============================================================
    // STRUCTS
    // ============================================================

    struct Validator {

        bool registered;

        string name;

        uint256 joinedAt;

    }

    struct CarbonProject {

        uint256 projectId;

        string projectName;

        string organization;

        address owner;

        uint256 credits;

        uint256 mlRiskScore;

        uint256 llmRiskScore;

        uint256 overallRiskScore;

        string uci;

        ProjectStatus status;

        bool minted;

        bool retired;

        uint256 submittedAt;

    }

    // ============================================================
    // STORAGE
    // ============================================================

    mapping(address => Validator) public validators;

    mapping(uint256 => CarbonProject) private projects;

    mapping(uint256 => bool) public projectExists;

    uint256[] private projectIds;

    // ============================================================
    // GOVERNANCE STORAGE
   // ============================================================

    // validator => voted?
    mapping(uint256 => mapping(address => bool)) private hasVoted;

     // project => approvals
    mapping(uint256 => uint256) public approvalCount;

     // project => rejections
    mapping(uint256 => uint256) public rejectionCount;

    mapping(uint256 => uint256) public projectToken;

    mapping(uint256 => uint256) public tokenProject;

    mapping(uint256 => string) public tokenUCI;

    // ============================================================
    // EVENTS
    // ============================================================

    event ValidatorRegistered(
        address indexed validator,
        string name
    );

    event ValidatorRemoved(
        address indexed validator
    );

    event ProjectSubmitted(
        uint256 indexed projectId,
        string projectName,
        address indexed owner
    );

    event VoteCast(

    uint256 indexed projectId,
    address indexed validator,
    bool approved
    );

    event ProjectApproved(
    uint256 indexed projectId
    );

event ProjectRejected(

    uint256 indexed projectId

);

     event CreditsMinted(
    uint256 indexed projectId,
    uint256 indexed tokenId,
    address indexed owner,
    uint256 amount,
    string uci
);

event CreditsRetired(
    uint256 indexed projectId,
    uint256 indexed tokenId,
    uint256 amount
);

    // ============================================================
    // MODIFIERS
    // ============================================================

    modifier onlyValidator() {

        require(
            validators[msg.sender].registered,
            "Not a validator"
        );

        _;

    }

    modifier validProject(uint256 projectId) {

        require(
            projectExists[projectId],
            "Project not found"
        );

        _;

    }

    // ============================================================
    // CONSTRUCTOR
    // ============================================================

    constructor(
    string memory baseURI
    )
    ERC1155(baseURI)
    Ownable(msg.sender)
    {

    }

    // ============================================================
    // VALIDATOR MANAGEMENT
    // ============================================================

    function registerValidator(
        address validator,
        string memory name
    )
        external
        onlyOwner
    {

        require(
            validator != address(0),
            "Invalid address"
        );

        require(
            !validators[validator].registered,
            "Already registered"
        );

        validators[validator] = Validator({

            registered: true,

            name: name,

            joinedAt: block.timestamp

        });

        emit ValidatorRegistered(
            validator,
            name
        );

    }

    function removeValidator(
        address validator
    )
        external
        onlyOwner
    {

        require(
            validators[validator].registered,
            "Validator not found"
        );

        delete validators[validator];

        emit ValidatorRemoved(
            validator
        );

    }

    function isValidator(
        address validator
    )
        external
        view
        returns(bool)
    {

        return validators[validator].registered;

    }

         function voteProject(

    uint256 projectId,

    bool approve

)
    external
    onlyValidator
    whenNotPaused
    validProject(projectId)
{

    CarbonProject storage project = projects[projectId];

    require(
        project.status == ProjectStatus.Pending,
        "Voting closed"
    );

    require(
        !hasVoted[projectId][msg.sender],
        "Already voted"
    );

    hasVoted[projectId][msg.sender] = true;

    if (approve) {

        approvalCount[projectId]++;

    } else {

        rejectionCount[projectId]++;

    }

    emit VoteCast(

        projectId,

        msg.sender,

        approve

    );

    _checkConsensus(projectId);

}

         function _checkConsensus(
    uint256 projectId
)
    internal
{

    CarbonProject storage project = projects[projectId];

    if (
        approvalCount[projectId] >= requiredValidators
    ) {

        project.status = ProjectStatus.Approved;

        emit ProjectApproved(projectId);

    }

    if (
        rejectionCount[projectId] >= requiredValidators
    ) {

        project.status = ProjectStatus.Rejected;

        emit ProjectRejected(projectId);

    }

}

       function hasValidatorVoted(

    uint256 projectId,

    address validator

)
    external
    view
    returns(bool)
{

    return hasVoted[projectId][validator];

}



      function getVotes(

    uint256 projectId

)
    external
    view
    returns(

        uint256 approvals,

        uint256 rejections

    )
{

    return (

        approvalCount[projectId],

        rejectionCount[projectId]

    );

}


     function _generateUCI(
    uint256 projectId,
    address owner,
    uint256 tokenId
)
    internal
    view
    returns(string memory)
{
    bytes32 hash = keccak256(
        abi.encodePacked(
            projectId,
            owner,
            tokenId,
            block.timestamp,
            block.chainid
        )
    );

    return string(
        abi.encodePacked(
            "UCI-",
            _toHex(hash)
        )
    );
}


   function mintCredits(
    uint256 projectId
)
    external
    onlyOwner
    whenNotPaused
    nonReentrant
    validProject(projectId)
{
    CarbonProject storage project = projects[projectId];

    require(
        project.status == ProjectStatus.Approved,
        "Project not approved"
    );

    require(
        !project.minted,
        "Already minted"
    );

    uint256 tokenId = nextTokenId;

    nextTokenId++;

    _mint(
        project.owner,
        tokenId,
        project.credits,
        ""
    );

    string memory uci = _generateUCI(
        projectId,
        project.owner,
        tokenId
    );

    project.uci = uci;

    project.status = ProjectStatus.Minted;

    project.minted = true;

    projectToken[projectId] = tokenId;

    tokenProject[tokenId] = projectId;

    tokenUCI[tokenId] = uci;

    emit CreditsMinted(
        projectId,
        tokenId,
        project.owner,
        project.credits,
        uci
    );
}


     function retireCredits(
    uint256 projectId
)
    external
    whenNotPaused
    nonReentrant
    validProject(projectId)
{
    CarbonProject storage project = projects[projectId];

    require(
        project.minted,
        "Not minted"
    );

    require(
        !project.retired,
        "Already retired"
    );

    require(
        msg.sender == project.owner,
        "Not owner"
    );

    uint256 tokenId = projectToken[projectId];

    _burn(
        msg.sender,
        tokenId,
        project.credits
    );

    project.retired = true;

    project.status = ProjectStatus.Retired;

    emit CreditsRetired(
        projectId,
        tokenId,
        project.credits
    );
}

     function getProjectToken(
    uint256 projectId
)
    external
    view
    returns(uint256)
{
    return projectToken[projectId];
}

function getTokenProject(
    uint256 tokenId
)
    external
    view
    returns(uint256)
{
    return tokenProject[tokenId];
}

function getUCI(
    uint256 tokenId
)
    external
    view
    returns(string memory)
{
    return tokenUCI[tokenId];
}


  function _toHex(bytes32 data)
    internal
    pure
    returns(string memory)
{
    bytes memory alphabet = "0123456789abcdef";

    bytes memory str = new bytes(64);

    for(uint i = 0; i < 32; i++) {

        str[i*2] = alphabet[
            uint(uint8(data[i] >> 4))
        ];

        str[1+i*2] = alphabet[
            uint(uint8(data[i] & 0x0f))
        ];

    }

    return string(str);
}

 function pause()
    external
    onlyOwner
{
    _pause();
}

function unpause()
    external
    onlyOwner
{
    _unpause();
}

    // ============================================================
    // PROJECT REGISTRY
    // ============================================================

    function submitApprovedProject(

        uint256 projectId,

        string memory projectName,

        string memory organization,

        address owner,

        uint256 credits,

        uint256 mlRiskScore,

        uint256 llmRiskScore,

        uint256 overallRiskScore

    )
        external
        whenNotPaused
        onlyOwner
    {

        require(
            !projectExists[projectId],
            "Project already exists"
        );

        require(
            owner != address(0),
            "Invalid owner"
        );

        projects[projectId] = CarbonProject({

            projectId: projectId,

            projectName: projectName,

            organization: organization,

            owner: owner,

            credits: credits,

            mlRiskScore: mlRiskScore,

            llmRiskScore: llmRiskScore,

            overallRiskScore: overallRiskScore,

            uci: "",

            status: ProjectStatus.Pending,

            minted: false,

            retired: false,

            submittedAt: block.timestamp

        });

        projectExists[projectId] = true;

        projectIds.push(projectId);

        emit ProjectSubmitted(

            projectId,

            projectName,

            owner

        );

    }

    // ============================================================
    // VIEW FUNCTIONS
    // ============================================================

    function getProject(
        uint256 projectId
    )
        external
        view
        validProject(projectId)
        returns (CarbonProject memory)
    {

        return projects[projectId];

    }

    function totalProjects()
        external
        view
        returns(uint256)
    {

        return projectIds.length;

    }

    function getProjectIds()
        external
        view
        returns(uint256[] memory)
    {

        return projectIds;

    }

    function totalValidators()
    external
    view
    returns(uint256)
{
    uint256 count = 0;

    // We'll improve this later if we keep a validator array.
    return count;
}

function totalMintedProjects()
    external
    view
    returns(uint256)
{
    return nextTokenId - 1;
}

function supportsInterface(
    bytes4 interfaceId
)
    public
    view
    override(ERC1155)
    returns (bool)
{
    return super.supportsInterface(interfaceId);
}

}