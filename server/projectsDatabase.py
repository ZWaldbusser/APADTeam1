# Import necessary libraries and modules
from pymongo import MongoClient

import hardwareDatabase

'''
Structure of Project entry:
Project = {
    'projectName': projectName,
    'projectId': projectId,
    'description': description,
    'hwSets': {HW1: 0, HW2: 10, ...},
    'users': [user1, user2, ...]
}
'''

# Function to query a project by its ID
# returns the project document if successful, else returns None
def queryProject(client, projectId):
    # Query and return a project from the database
    myDB = client["Haas_db"]
    myCol = myDB["projects"]
    myQuery = {'projectId': projectId}
    cursor = myCol.find_one(myQuery)

    if cursor == None:
        print(f"Error: project '{projectId}' was not found")
        return None
    return cursor



# Function to create a new project.
# returns True if successful. Returns False if project already exists
def createProject(client, projectName, projectId, description, owner):
    # Create a new project in the database
    myDB = client["haas"]
    myCol = myDB["projects"]
    myQuery = {'projectId': projectId}
    cursor = myCol.find_one(myQuery)
    if cursor == None:
        myDB["projects"].insert_one({
            'projectName': projectName,
            'projectId': projectId,
            'description': description,
            'hwSets': {},
            'users': [owner]
        })
        return True
    else:
        print(f"Error: project '{projectId}' already exists")
        return False


# Function to add a user to a project. 
# returns True if successful. Returns False if project was not found
def addUser(client, projectId, userId):
    # Add a user to the specified project
    myDB = client["haas"]
    myCol = myDB["projects"]
    if myCol.find_one({"users": userId}):
        print(f"User '{userId} already in project.")
        return False
    myQuery = {'projectId': projectId}
    cursor = myCol.find_one(myQuery)
    if cursor == None:
        print(f"Error: project '{projectId}' was not found")
        return False
    myCol.update_one(
        {"projectId": projectId},
        {"$addToSet": {"users": userId}}
    )
    return True


# Function to update hardware usage in a project
# returns True if the project exists and the update was applied
def updateUsage(client, projectId, hwSetName, newUsage=0):
    # Update the usage of a hardware set in the specified project
    if newUsage < 0:
        print(f"Error: usage for '{hwSetName}' cannot be negative")
        return False
    myDB = client["haas"]
    myCol = myDB["projects"]
    myQuery = {'projectId': projectId}
    cursor = myCol.find_one(myQuery)
    if cursor == None:
        print(f"Error: project '{projectId}' was not found")
        return False
    result = myCol.update_one(
        {"projectId": projectId},
        {"$set": {f"hwSets.{hwSetName}": newUsage}}
    )

    return result.matched_count > 0


# Function to check out hardware for a project
# returns True if the project exists and the check-out was successful, else returns False
def checkOutHW(client, projectId, hwSetName, qty, userId):
    # Check out hardware for the specified project and update availability
    myDB = client["haas"]
    myCol = myDB["projects"]
    myQuery = {'projectId': projectId}
    cursor = myCol.find_one(myQuery)
    if cursor == None:
        print(f"Error: project '{projectId}' was not found")
        return False
    myCol.update_one(
        {"projectId": projectId},
        {
            "$inc": {f"hwSets.{hwSetName}": qty},
            "$addToSet": {"users": userId}
        }

    )
    return True

# Function to check in hardware for a project
# returns True if the project exists and the check-in was successful, else returns False
def checkInHW(client, projectId, hwSetName, qty, userId):
    # Check in hardware for the specified project and update availability
    if qty <= 0:
        print(f"Error: quantity for check-in must be positive")
        return False
    myDB = client["haas"]
    myCol = myDB["projects"]
    myQuery = {'projectId': projectId}
    cursor = myCol.find_one(myQuery)
    if cursor == None:
        print(f"Error: project '{projectId}' was not found")
        return False
    current_usage = cursor.get("hwSets", {}).get(hwSetName, 0)
    if current_usage < qty:
        print(f"Error: not enough hardware checked out for '{hwSetName}'")
        return False
    result = myCol.update_one(
        {"projectId": projectId},
        {
            "$inc": {f"hwSets.{hwSetName}": -qty},
            "$addToSet": {"users": userId}
        }
    )
    return result.matched_count > 0

