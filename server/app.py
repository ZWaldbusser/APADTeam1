
# Main Flask entrypoint. Defines API routes and delegates database
# operations to the appropriate database module.

from flask import Flask, jsonify, request
from flask_cors import CORS

import db
import usersDatabase as users_db
import projectsDatabase as projects_db
import hardwareDatabase as hardware_db

app = Flask(__name__)
CORS(app)  # allows the React frontend (different port) to call this API


# Health check route to confirm the server is running

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Flask server is running"}), 200


@app.route("/api/health/db", methods=["GET"])
def db_health():
    """Quick way to confirm the server can actually reach MongoDB."""
    try:
        db.ping()
        return jsonify({"database": "connected", "db_name": db.db.name}), 200
    except Exception as e:
        return jsonify({"database": "unreachable", "error": str(e)}), 503


# user routes (signup, login, fetch users)

@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()

    if not data or "userid" not in data or "password" not in data:
        return jsonify({"error": "userid and password are required"}), 400

    new_id = users_db.create_user(data["userid"], data["password"])

    if new_id is None:
        return jsonify({"error": "userid already exists"}), 409

    return jsonify({"message": "User created", "id": new_id}), 201


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data or "userid" not in data or "password" not in data:
        return jsonify({"error": "userid and password are required"}), 400

    success = users_db.verify_login(data["userid"], data["password"])

    if not success:
        return jsonify({"error": "Invalid userid or password"}), 401

    return jsonify({"message": "Login successful"}), 200


@app.route("/api/users", methods=["GET"])
def get_users():
    return jsonify(users_db.get_all_users()), 200


# Project routes (create project, get project, list projects)

@app.route("/api/projects", methods=["POST"])
def create_project():
    data = request.get_json()
    required_fields = ["name", "description", "projectID", "owner"]

    if not data or not all(field in data for field in required_fields):
        return jsonify({"error": "name, description, projectID, and owner are required"}), 400

    created = projects_db.createProject(
        db.client, data["name"], data["projectID"], data["description"]
    )

    if not created:
        return jsonify({"error": "projectID already exists"}), 409

    projects_db.addUser(db.client, data["projectID"], data["owner"])

    return jsonify({"message": "Project created", "projectID": data["projectID"]}), 201


@app.route("/api/projects/<project_id>", methods=["GET"])
def get_project(project_id):
    project = projects_db.queryProject(db.client, project_id)

    if not project:
        return jsonify({"error": "Project not found"}), 404

    return jsonify({
        "id": str(project["_id"]),
        "name": project["projectName"],
        "description": project["description"],
        "projectID": project["projectId"],
        "users": project.get("users", [])
    }), 200


@app.route("/api/projects", methods=["GET"])
def get_projects():
    projects = []
    for project in db.db["projects"].find():
        projects.append({
            "id": str(project["_id"]),
            "name": project.get("projectName"),
            "description": project.get("description"),
            "projectID": project.get("projectId"),
            "users": project.get("users", [])
        })
    return jsonify(projects), 200


# Hardware routes (view hardware, checkout, check-in)

@app.route("/api/hardware", methods=["GET"])
def get_hardware():
    return jsonify(hardware_db.get_all_hardware()), 200


@app.route("/api/hardware/checkout", methods=["POST"])
def checkout_hardware():
    data = request.get_json()

    if not data or "name" not in data or "quantity" not in data:
        return jsonify({"error": "name and quantity are required"}), 400

    success, message = hardware_db.checkout_hardware(data["name"], data["quantity"])

    if not success:
        return jsonify({"error": message}), 400

    return jsonify({"message": message}), 200


@app.route("/api/hardware/checkin", methods=["POST"])
def checkin_hardware():
    data = request.get_json()

    if not data or "name" not in data or "quantity" not in data:
        return jsonify({"error": "name and quantity are required"}), 400

    success, message = hardware_db.checkin_hardware(data["name"], data["quantity"])

    if not success:
        return jsonify({"error": message}), 400

    return jsonify({"message": message}), 200


if __name__ == "__main__":
    # Fail loudly at startup if the database is unreachable, instead of
    # letting every request hang or 500 later.
    try:
        db.ping()
        print(f"[OK] Connected to MongoDB database: {db.db.name}")
    except Exception as e:
        print(f"[ERROR] Could not connect to MongoDB: {e}")

    app.run(debug=True, port=5000)