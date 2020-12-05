const { Router } = require("express");
const { Role } = require("../db");
const { AuthHandler } = require("../middlewares");
const {
  BadRequestError,
  NotFoundError,
  ServerError,
} = require("../utils/error");
const { Response } = require("../utils/response");

const route = Router();

route.get("/", AuthHandler, async (req, res, next) => {
  try {
    const data = await Role.get_all();
    res.json(new Response(data));
  } catch (error) {
    next(new ServerError(error));
  }
});

route.get("/:id", AuthHandler, async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Role.get_by_key_value("id", id);
    if (data) {
      res.json(new Response(data));
    } else {
      next(new NotFoundError("Role not found!"));
    }
  } catch (error) {
    next(new ServerError(error));
  }
});

route.post("/", AuthHandler, async (req, res, next) => {
  try {
    const { name, priviledges, description } = req.body;
    // Validate request
    if (!(name && priviledges)) {
      next(new BadRequestError());
    }

    const { firstname, lastname } = req.user || {};
    const created_by = `${firstname} ${lastname}`;
    const data = await Role.save(name, priviledges, description, created_by);
    res.json(new Response(data));
  } catch (error) {
    next(new ServerError(error));
  }
});

route.delete("/:id", AuthHandler, async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if role exist
    const role = await Role.get_by_key_value("id", id);
    if (!role) {
      next(new NotFoundError("Role not found!"));
    }

    await Role.delete_one(id);
    res.json(new Response(null, "Role deleted successfully!"));
  } catch (error) {
    next(new ServerError(error));
  }
});

module.exports = route;
