
#Handles the MongoDB connection and all operations related to the "users" collection 

from db import db
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError, VerificationError, InvalidHashError

password_hasher = PasswordHasher()
users_collection = db["users"]


def create_user(userid, password):
    """Insert a new user document. Hashes password using Argon2.
    Returns the inserted id as a string."""
    existing = users_collection.find_one({"userid": userid})
    if existing:
        return None  # signal that userid is already taken

    new_user = {
        "userid": userid,
        "password": password_hasher.hash(password)  # hash the password before storing
    }
    result = users_collection.insert_one(new_user)
    return str(result.inserted_id)


def find_user_by_userid(userid):
    """Return a single user document matching the userid, or None."""
    return users_collection.find_one({"userid": userid})


def verify_login(userid, password):
    """Return True if userid exists and password matches the stored Argon2 hash."""
    user = find_user_by_userid(userid)

    if not user:
        return False
    
    try:
        return password_hasher.verify(user.get("password"), password)
    
    except VerifyMismatchError:     # incorrect password
        return False

    except InvalidHashError:        # stored value is not a valid Argon2 hash, likely old plaintext user
        return False

    except VerificationError:       # Argon2 verification failed for another verification-related reason
        return False

def forgot_password(userid, password):
    """Update an existing user's password with a new Argon2 hash."""
    user = find_user_by_userid(userid)

    if not user:
        return False
    
    result = users_collection.update_one(
        {'userid': userid}, 
        {'$set': {'password': password_hasher.hash(password)}}
    )
    
    return result.modified_count > 0       # checks whether MongoDB actually changed a document


def get_all_users():
    """Return all users, excluding password field."""
    users = []
    for user in users_collection.find():
        users.append({
            "id": str(user["_id"]),
            "userid": user["userid"]
        })
    return users