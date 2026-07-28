
#Handles the MongoDB connection and all operations related to the "users" collection 

from db import db

users_collection = db["users"]


def create_user(userid, password):
    """Insert a new user document. Returns the inserted id as a string."""
    existing = users_collection.find_one({"userid": userid})
    if existing:
        return None  # signal that userid is already taken

    new_user = {
        "userid": userid,
        "password": password  # plain text for now, will be hashed in a later sprint
    }
    result = users_collection.insert_one(new_user)
    return str(result.inserted_id)


def find_user_by_userid(userid):
    """Return a single user document matching the userid, or None."""
    return users_collection.find_one({"userid": userid})


def verify_login(userid, password):
    """Basic check: does userid exist and does password match."""
    user = find_user_by_userid(userid)
    if not user:
        return False
    return user.get("password") == password


def get_all_users():
    """Return all users, excluding password field."""
    users = []
    for user in users_collection.find():
        users.append({
            "id": str(user["_id"]),
            "userid": user["userid"]
        })
    return users