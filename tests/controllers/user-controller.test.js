const {
  getUsers,
  getSingleUser,
  addUser,
  updateUser,
  deleteUser,
} = require("../../controllers/user-controller");

const User = require("../../models/user");

jest.mock("../../models/user");

describe("User Controller", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      params: {},
      body: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  describe("getUsers", () => {
    it("should return all users with status 200", async () => {
      const users = [
        { _id: "1", name: "John" },
        { _id: "2", name: "Sarah" },
      ];

      User.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(users),
      });

      await getUsers(req, res);

      expect(User.find).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(users);
    });

    it("should return status 500 when finding users fails", async () => {
      User.find.mockReturnValue({
        sort: jest.fn().mockRejectedValue(new Error("Database error")),
      });

      await getUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("getSingleUser", () => {
    it("should return a user by ID", async () => {
      const user = {
        _id: "123",
        name: "John",
      };

      req.params.id = "123";

      User.findById.mockResolvedValue(user);

      await getSingleUser(req, res);

      expect(User.findById).toHaveBeenCalledWith("123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(user);
    });

    it("should return status 500 when finding a user fails", async () => {
      req.params.id = "123";

      User.findById.mockRejectedValue(new Error("Database error"));

      await getSingleUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalled();
    });

    it("should return null when user is not found", async () => {
      req.params.id = "missing-id";

      User.findById.mockResolvedValue(null);

      await getSingleUser(req, res);

      expect(User.findById).toHaveBeenCalledWith("missing-id");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(null);
    });
  });

  describe("addUser", () => {
    it("should create a user and return status 201", async () => {
      const userData = {
        name: "John",
        email: "john@example.com",
        password: "password123",
      };

      const savedUser = {
        _id: "123",
        ...userData,
      };

      req.body = userData;

      User.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(savedUser),
      }));

      await addUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(savedUser);
    });

    it("should return status 500 when saving fails", async () => {
      req.body = {
        name: "John",
      };

      User.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error("Validation error")),
      }));

      await addUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("updateUser", () => {
    it("should update a user and return status 200", async () => {
      const updatedUser = {
        _id: "123",
        name: "Updated John",
      };

      req.params.id = "123";
      req.body = {
        name: "Updated John",
      };

      User.findByIdAndUpdate.mockResolvedValue(updatedUser);

      await updateUser(req, res);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith("123", req.body);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedUser);
    });

    it("should return status 500 when update fails", async () => {
      req.params.id = "123";

      User.findByIdAndUpdate.mockRejectedValue(new Error("Database error"));

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalled();
    });

    it("should return null when user to update is not found", async () => {
      req.params.id = "missing-id";
      req.body = {
        name: "Updated John",
      };

      User.findByIdAndUpdate.mockResolvedValue(null);

      await updateUser(req, res);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        "missing-id",
        req.body,
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(null);
    });
  });

  describe("deleteUser", () => {
    it("should delete a user and return status 200", async () => {
      const deletedUser = {
        _id: "123",
        name: "John",
      };

      req.params.id = "123";

      User.findByIdAndDelete.mockResolvedValue(deletedUser);

      await deleteUser(req, res);

      expect(User.findByIdAndDelete).toHaveBeenCalledWith("123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(deletedUser);
    });

    it("should return status 500 when deletion fails", async () => {
      req.params.id = "123";

      User.findByIdAndDelete.mockRejectedValue(new Error("Database error"));

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalled();
    });

    it("should return null when user to delete is not found", async () => {
      req.params.id = "missing-id";

      User.findByIdAndDelete.mockResolvedValue(null);

      await deleteUser(req, res);

      expect(User.findByIdAndDelete).toHaveBeenCalledWith("missing-id");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(null);
    });
  });
});
