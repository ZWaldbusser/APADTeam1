
#Handles the MongoDB connection and all operations related to the "users" collection 

from db import db
import bcrypt
from bson import ObjectId

users_collection = db["users"]


def create_user(userid, password):
    existing = users_collection.find_one({"userid": userid})
    if existing:
        return None

    hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    new_user = {
        "userid": userid,
        "password": hashed
    }
    result = users_collection.insert_one(new_user)
    return str(result.inserted_id)


def find_user_by_userid(userid):
    """Return a single user document matching the userid, or None."""
    return users_collection.find_one({"userid": userid})


def verify_login(userid, password):
    """Returns the user's id as a string if valid, else None."""
    user = find_user_by_userid(userid)
    if not user:
        return None
    if not bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        return None
    return str(user["_id"])

def forgot_password(userid, password):
    """Basic check: does userid exist and does password match."""
    user = find_user_by_userid(userid)
    if not user:
        return False
    return users_collection.update_one({'userid': userid}, {'$set': {'password': password}})


def get_all_users():
    """Return all users, excluding password field."""
    users = []
    for user in users_collection.find():
        users.append({
            "id": str(user["_id"]),
            "userid": user["userid"]
        })
    return users

def find_user_by_id(user_id):
    """Return a single user document matching the MongoDB _id, or None."""
    try:
        return users_collection.find_one({"_id": ObjectId(user_id)})
    except Exception:
        return None