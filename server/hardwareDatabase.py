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
    myDB = client["haas"]
    myCol = myDB["hardwareSets"]
    myQuery = {'hwName': hwSetName}
    cursor = myCol.find_one(myQuery)
    if cursor == None:
        myDB["hardwareSets"].insert_one({
            'hwName': hwSetName,
            'capacity': initCapacity,
            'availability': initCapacity,
        })
    else:
        print(f"Error: hardware set '{hwSetName}' already exists")

# Function to query a hardware set by its name
#Returns a list containing capacity and availability
def queryHardwareSet(client, hwSetName):
    # Query and return a hardware set from the database
    myDB = client["haas"]
    myCol = myDB["hardwareSets"]
    myQuery = {'hwName': hwSetName}
    cursor = myCol.find_one(myQuery)
    if cursor == None:
        print(f"Error: hardware set '{hwSetName}' not found")
    #Extract values
    capacity = cursor.get('capacity')
    available = cursor.get('availability')
    return capacity, available

# Function to update the availability of a hardware set
def updateAvailability(client, hwSetName, newAvailability):
    # Update the availability of an existing hardware set
    myDB = client["haas"]
    myCol = myDB["hardwareSets"]
    query = {'hwName': hwSetName}
    update = { "$set": {'availability': newAvailability}}

    result = myCol.update_one(query, update)

    if result.matched_count == 0:
        print(f"Error: hardware set '{hwSetName}' not found")
    elif result.modified_count == 0:
        print(f"Warning: '{hwSetName}' found but availability unchanged")
    else:
        print(f"Updated '{hwSetName}' availability to {newAvailability}")


# Function to request space from a hardware set
def requestSpace(client, hwSetName, amount):
    # Request a certain amount of hardware and update availability
    capacity, avail = queryHardwareSet(client, hwSetName)
    newAmt = avail - amount
    if newAmt >= 0:
        updateAvailability(client, hwSetName, newAmt)
        print(f"Successfully requested {amount} of {hwSetName}!")
    else:
        print(f"Error: Not enough hardware for set '{hwSetName}'")



# Function to get all hardware set names
def getAllHwNames(client):
    # Get and return a list of all hardware set names
    myDB = client["haas"]
    myCol = myDB["hardwareSets"]

    cursor = myCol.find({}, {"hwName": 1, "_id": 0})
    return [doc["hwName"] for doc in cursor]

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