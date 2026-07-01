from app.blockchain.blockchain_service import BlockchainService

service = BlockchainService()

print(service.connection_status())

print("\nTesting get_votes...")

try:
    result = service.get_votes(1)
    print(result)
except Exception as e:
    print("ERROR:", e)

print(service.get_nonce())

print(service.is_validator(service.account.address))

print()

print("Registering validator...")

result = service.register_validator(
    service.account.address,
    "Owner Validator"
)

print(result)

print()

print("Validator Status:")

print(service.is_validator(service.account.address))

print()

print("Minting Credits")

result = service.mint_credits(1)

print(result)

print("Submitting Project")

result = service.submit_project(
    project_id=1,
    project_name="Solar Farm",
    organization="Green Energy Ltd",
    owner=service.account.address,
    credits=100,
    ml_score=20,
    llm_score=15,
    overall_score=18
)

print(result)

print(service.get_project(1))

print(service.vote_project(1, True))

print(service.mint_credits(1))