import supertest from "supertest";
import mongoose from "mongoose";
import { app, server } from "../src/server/index";
import Role from "../src/models/Role";

const api = supertest(app);

beforeEach(async () => {
  await Role.deleteMany({});
});

describe("GET end point /api/roles", () => {
  test("Expect return status 200 get /api/roles", async () => {
    await api
      .get("/api/roles")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("GET end point /api/roles with roles insert", async () => {
    await new Role({ name: "admin" }).save();

    const response = await api
      .get("/api/roles")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].name).toBe("admin");
  });
});

describe("Create roles", () => {
  test("role admin insert", async () => {
    await new Role({ name: "admin" }).save();

    const rolesSaved = await Role.find().lean();

    expect(rolesSaved).toHaveLength(1);
    expect(rolesSaved[0].name).toBe("admin");
  });

  test("role moderator insert", async () => {
    await new Role({ name: "moderator" }).save();

    const rolesSaved = await Role.find().lean();

    expect(rolesSaved).toHaveLength(1);
    expect(rolesSaved[0].name).toBe("moderator");
  });

  test("role user insert", async () => {
    await new Role({ name: "user" }).save();

    const rolesSaved = await Role.find().lean();

    expect(rolesSaved).toHaveLength(1);
    expect(rolesSaved[0].name).toBe("user");
  });
});

afterAll(async () => {
  await Role.deleteMany({});
  server.close();
  mongoose.connection.close();
});
