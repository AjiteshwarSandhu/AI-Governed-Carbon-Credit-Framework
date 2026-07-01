import json
import os
from pathlib import Path
from typing import Any, Dict

from dotenv import load_dotenv
from web3 import Web3
from eth_account import Account

load_dotenv()


class BlockchainService:
    """
    Service responsible for interacting with the
    CarbonCreditManager smart contract deployed on Polygon Amoy.
    """

    def __init__(self):

        # -------------------------------
        # Environment Variables
        # -------------------------------

        self.rpc_url = os.getenv("BLOCKCHAIN_RPC_URL")
        self.private_key = os.getenv("PRIVATE_KEY")
        self.contract_address = os.getenv("CONTRACT_ADDRESS")
        self.owner_address = os.getenv("OWNER_ADDRESS")

        if not self.rpc_url:
            raise ValueError("BLOCKCHAIN_RPC not found in .env")

        if not self.private_key:
            raise ValueError("PRIVATE_KEY not found in .env")

        if not self.contract_address:
            raise ValueError("CONTRACT_ADDRESS not found in .env")

        # -------------------------------
        # Connect to Polygon
        # -------------------------------

        self.web3 = Web3(Web3.HTTPProvider(self.rpc_url))

        if not self.web3.is_connected():
            raise ConnectionError(
                "Unable to connect to Polygon Amoy."
            )

        # -------------------------------
        # Load ABI
        # -------------------------------

        abi_path = (
            Path(__file__)
            .parent
            / "contract_abi.json"
        )

        with open(abi_path, "r") as file:
            abi = json.load(file)

        # -------------------------------
        # Contract Instance
        # -------------------------------

        self.contract = self.web3.eth.contract(
            address=self.web3.to_checksum_address(
                self.contract_address
            ),
            abi=abi
        )

        # -------------------------------
        # Wallet
        # -------------------------------

        self.account = Account.from_key(
            self.private_key
        )

        print("=" * 60)
        print("Blockchain Connected")
        print("=" * 60)
        print("Network Connected :", self.web3.is_connected())
        print("Wallet           :", self.account.address)
        print("Contract         :", self.contract_address)
        print("=" * 60)

        # ============================================================
        # Helper Functions
        # ============================================================

    def get_nonce(self) -> int:
            """
            Returns latest transaction nonce.
            """

            return self.web3.eth.get_transaction_count(
                self.account.address
            )

    def get_gas_price(self):

            return self.web3.eth.gas_price

    def wait_for_receipt(self, tx_hash):

            return self.web3.eth.wait_for_transaction_receipt(
                tx_hash
            )

    def build_transaction(
                self,
                function
        ):
            """
            Builds unsigned transaction.
            """

            return function.build_transaction({

                "from": self.account.address,

                "nonce": self.get_nonce(),

                "gasPrice": self.get_gas_price(),

                "chainId": 80002

            })

    def sign_transaction(
                self,
                transaction
        ):

            return self.account.sign_transaction(
                transaction
            )

    def send_transaction(
                self,
                signed_transaction
        ):

            return self.web3.eth.send_raw_transaction(
                signed_transaction.raw_transaction
            )
        
    # ============================================================
    # Health Check
    # ============================================================

    def connection_status(self):

        return {

            "connected": self.web3.is_connected(),

            "wallet": self.account.address,

            "contract": self.contract_address,

            "chain_id": self.web3.eth.chain_id

        }

    # ============================================================
    # Read Operations
    # ============================================================

    def get_project(self, project_id: int) -> Dict[str, Any]:
        """
        Returns project details from blockchain.
        """

        try:

            project = self.contract.functions.getProject(
                project_id
            ).call()

            return {
                "project_id": project[0],
                "project_name": project[1],
                "organization": project[2],
                "owner": project[3],
                "credits": project[4],
                "ml_risk_score": project[5],
                "llm_risk_score": project[6],
                "overall_risk_score": project[7],
                "uci": project[8],
                "status": project[9],
                "minted": project[10],
                "retired": project[11],
                "submitted_at": project[12]
            }

        except Exception as e:

            raise Exception(
                f"Unable to fetch project: {str(e)}"
            )


    def get_project_token(
        self,
        project_id: int
    ) -> int:

        return self.contract.functions.getProjectToken(
            project_id
        ).call()


    def get_uci(
        self,
        token_id: int
    ) -> str:

        return self.contract.functions.getUCI(
            token_id
        ).call()


    def get_votes(
        self,
        project_id: int
    ):

        approvals, rejections = (
            self.contract.functions
            .getVotes(project_id)
            .call()
        )

        return {
            "approvals": approvals,
            "rejections": rejections
        }
    
    # ============================================================
    # Submit Project
    # ============================================================

    def submit_project(
        self,
        project_id: int,
        project_name: str,
        organization: str,
        owner: str,
        credits: int,
        ml_score: int,
        llm_score: int,
        overall_score: int
    ) -> Dict[str, Any]:

        try:

            tx = self.build_transaction(

                self.contract.functions.submitApprovedProject(

                    project_id,

                    project_name,

                    organization,

                    self.web3.to_checksum_address(owner),

                    credits,

                    ml_score,

                    llm_score,

                    overall_score

                )

            )

            signed_tx = self.sign_transaction(tx)

            tx_hash = self.send_transaction(
                signed_tx
            )

            receipt = self.wait_for_receipt(
                tx_hash
            )

            return {

                "success": True,

                "transaction_hash": tx_hash.hex(),

                "block_number": receipt.blockNumber,

                "gas_used": receipt.gasUsed

            }

        except Exception as e:

            return {

                "success": False,

                "error": str(e)

            }

    # ============================================================
    # Validator Voting
    # ============================================================

    def vote_project(
        self,
        project_id: int,
        approve: bool
    ) -> Dict[str, Any]:
        """
        Cast validator vote for a project.
        """

        try:

            tx = self.build_transaction(

                self.contract.functions.voteProject(
                    project_id,
                    approve
                )

            )

            signed_tx = self.sign_transaction(tx)

            tx_hash = self.send_transaction(
                signed_tx
            )

            receipt = self.wait_for_receipt(
                tx_hash
            )

            votes = self.get_votes(project_id)

            return {

                "success": True,

                "transaction_hash": tx_hash.hex(),

                "block_number": receipt.blockNumber,

                "gas_used": receipt.gasUsed,

                "approvals": votes["approvals"],

                "rejections": votes["rejections"]

            }

        except Exception as e:

            return {

                "success": False,

                "error": str(e)

            }

    # ============================================================
    # Validator Status
    # ============================================================

    def has_validator_voted(
        self,
        project_id: int,
        validator: str
    ) -> bool:

        return self.contract.functions.hasValidatorVoted(

            project_id,

            self.web3.to_checksum_address(
                validator
            )

        ).call()

    def is_validator(
        self,
        validator: str
    ) -> bool:

        return self.contract.functions.isValidator(

            self.web3.to_checksum_address(
                validator
            )

        ).call()

    def register_validator(
        self,
        validator: str,
        name: str
    ) -> Dict[str, Any]:

        try:

            tx = self.build_transaction(

                self.contract.functions.registerValidator(

                    self.web3.to_checksum_address(
                        validator
                    ),

                    name

                )

            )

            signed_tx = self.sign_transaction(tx)

            tx_hash = self.send_transaction(
                signed_tx
            )

            receipt = self.wait_for_receipt(
                tx_hash
            )

            return {

                "success": True,

                "transaction_hash": tx_hash.hex(),

                "block_number": receipt.blockNumber

            }

        except Exception as e:

            return {

                "success": False,

                "error": str(e)

            }

    # ============================================================
    # Mint Carbon Credits
    # ============================================================

    def mint_credits(
        self,
        project_id: int
    ) -> Dict[str, Any]:
        """
        Mint ERC1155 carbon credits for an approved project.
        """

        try:

            tx = self.build_transaction(

                self.contract.functions.mintCredits(
                    project_id
                )

            )

            signed_tx = self.sign_transaction(tx)

            tx_hash = self.send_transaction(
                signed_tx
            )

            receipt = self.wait_for_receipt(
                tx_hash
            )

            token_id = self.get_project_token(
                project_id
            )

            uci = self.get_uci(
                token_id
            )

            return {

                "success": True,

                "transaction_hash": tx_hash.hex(),

                "block_number": receipt.blockNumber,

                "gas_used": receipt.gasUsed,

                "token_id": token_id,

                "uci": uci

            }

        except Exception as e:

            return {

                "success": False,

                "error": str(e)

            }

        # ============================================================
        # Retire Carbon Credits
        # ============================================================

    def retire_credits(
            self,
            project_id: int
    ) -> Dict[str, Any]:
        """
        Retire (burn) ERC1155 carbon credits.
        """

        try:

            tx = self.build_transaction(

                self.contract.functions.retireCredits(
                    project_id
                )

            )

            signed_tx = self.sign_transaction(tx)

            tx_hash = self.send_transaction(
                signed_tx
            )

            receipt = self.wait_for_receipt(
                tx_hash
            )

            return {

                "success": True,

                "transaction_hash": tx_hash.hex(),

                "block_number": receipt.blockNumber,

                "gas_used": receipt.gasUsed

            }

        except Exception as e:

            return {

                "success": False,

                "error": str(e)

            }

