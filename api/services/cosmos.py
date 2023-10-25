from azure.cosmos import CosmosClient
from dotenv import load_dotenv
import os

load_dotenv()


# Get Cosmos DB API
COSMOS_URL = os.getenv('COSMOS_URL')
COSMOS_KEY = os.getenv('COSMOS_KEY')
DATABASE_NAME = os.getenv('DATABASE_NAME')
CONTAINER_NAME = os.getenv('CONTAINER_NAME')

# Initialize Cosmos DB client
client = CosmosClient(COSMOS_URL, credential=COSMOS_KEY)
database = client.get_database_client(DATABASE_NAME)
container = database.get_container_client(CONTAINER_NAME)

# Cosmos post function

def create_item():
    item = request.get_json()  # Get the item from the request body
    container.upsert_item(item)  # Insert the item into the database
    return jsonify(item), 201  # Return the inserted item and a 201 status code