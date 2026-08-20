const request = require("supertest");
const app = require("../../app");

const User = require("../../models/user");

jest.mock("../../models/user");

describe("User API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /users", () => {
    it("should return all users with status 200", async () => {
      const users = [
        {
          _id: "1",
          name: "John",
          email: "john@example.com",
        },
        {
          _id: "2",
          name: "Sarah",
          email: "sarah@example.com",
        },
      ];

      User.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(users),
      });

      const response = await request(app).get("/users");

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(users);
    });

    it("should return status 500 when finding users fails", async () => {
      User.find.mockReturnValue({
        sort: jest.fn().mockRejectedValue(new Error("Database error")),
      });

      const response = await request(app).get("/users");

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({
        error: "Something went wrong ...",
      });
    });
  });

  describe("GET /users/:id", () => {
    it("should return a user by ID with status 200", async () => {
      const user = {
        _id: "123",
        name: "John",
        email: "john@example.com",
      };

      User.findById.mockResolvedValue(user);

      const response = await request(app).get("/users/123");

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(user);
      expect(User.findById).toHaveBeenCalledWith("123");
    });

    it("should return null when user is not found", async () => {
      User.findById.mockResolvedValue(null);

      const response = await request(app).get("/users/missing-id");

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeNull();
    });

    it("should return status 500 when finding a user fails", async () => {
      User.findById.mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/users/123");

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({
        error: "Something went wrong ...",
      });
    });
  });

  describe("POST /users", () => {
    it("should create a user with status 201", async () => {
      const userData = {
        name: "John",
        email: "john@example.com",
        password: "password123",
      };

      const savedUser = {
        _id: "123",
        ...userData,
      };

      User.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(savedUser),
      }));

      const response = await request(app).post("/users").send(userData);

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(savedUser);
      expect(User).toHaveBeenCalledWith(userData);
    });

    it("should return status 500 when saving user fails", async () => {
      const userData = {
        name: "John",
        email: "john@example.com",
      };

      User.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error("Validation error")),
      }));

      const response = await request(app).post("/users").send(userData);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({
        error: "Something went wrong ...",
      });
    });
  });

  describe("PATCH /users/:id", () => {
    it("should update a user with status 200", async () => {
      const updateData = {
        name: "Updated John",
      };

      const updatedUser = {
        _id: "123",
        name: "Updated John",
      };

      User.findByIdAndUpdate.mockResolvedValue(updatedUser);

      const response = await request(app).patch("/users/123").send(updateData);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(updatedUser);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith("123", updateData);
    });

    it("should return null when user to update is not found", async () => {
      User.findByIdAndUpdate.mockResolvedValue(null);

      const response = await request(app).patch("/users/missing-id").send({
        name: "Updated John",
      });

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeNull();
    });

    it("should return status 500 when updating user fails", async () => {
      User.findByIdAndUpdate.mockRejectedValue(new Error("Database error"));

      const response = await request(app).patch("/users/123").send({
        name: "Updated John",
      });

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({
        error: "Something went wrong ...",
      });
    });
  });

  describe("DELETE /users/:id", () => {
    it("should delete a user with status 200", async () => {
      const deletedUser = {
        _id: "123",
        name: "John",
      };

      User.findByIdAndDelete.mockResolvedValue(deletedUser);

      const response = await request(app).delete("/users/123");

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(deletedUser);

      expect(User.findByIdAndDelete).toHaveBeenCalledWith("123");
    });

    it("should return null when user to delete is not found", async () => {
      User.findByIdAndDelete.mockResolvedValue(null);

      const response = await request(app).delete("/users/missing-id");

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeNull();
    });

    it("should return status 500 when deleting user fails", async () => {
      User.findByIdAndDelete.mockRejectedValue(new Error("Database error"));

      const response = await request(app).delete("/users/123");

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({
        error: "Something went wrong ...",
      });
    });
  });
});
