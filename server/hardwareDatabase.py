# Import necessary libraries and modules
from pymongo import MongoClient

'''
Structure of Hardware Set entry:
HardwareSet = {
    'hwName': hwSetName,
    'capacity': initCapacity,
    'availability': initCapacity
}
'''

# Function to create a new hardware set
def createHardwareSet(client, hwSetName, initCapacity):
    # Create a new hardware set in the database
    pass

# Function to query a hardware set by its name
def queryHardwareSet(client, hwSetName):
    # Query and return a hardware set from the database
    pass

# Function to update the availability of a hardware set
def updateAvailability(client, hwSetName, newAvailability):
    # Update the availability of an existing hardware set
    pass

# Function to request space from a hardware set
def requestSpace(client, hwSetName, amount):
    # Request a certain amount of hardware and update availability
    pass

# Function to get all hardware set names
def getAllHwNames(client):
    # Get and return a list of all hardware set names
    pass

#To test database connectivity: python hardwareDatabase.py
if __name__ == "__main__":
    import os
    from dotenv import load_dotenv

    load_dotenv()
    client = MongoClient(os.environ["MONGO_URI"])

    # sanity check the connection first
    print("Ping:", client.admin.command("ping"))   # {'ok': 1.0}

    # exercise each function
    createHardwareSet(client, "TestRig", 100)
    print("Created. All names:", getAllHwNames(client))
    print("Query:", queryHardwareSet(client, "TestRig"))

    requestSpace(client, "TestRig", 30)
    print("After request 30:", queryHardwareSet(client, "TestRig"))

    updateAvailability(client, "TestRig", 100)
    print("After reset:", queryHardwareSet(client, "TestRig"))

    # cleanup so re-runs stay clean
    client["haas"]["hardwareSets"].delete_many({"hwName": "TestRig"})