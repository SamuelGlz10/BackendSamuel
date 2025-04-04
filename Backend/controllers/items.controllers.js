import { sqlConnect, sql } from "../utils/sql.js";

export const getItems = async (req, res) => {
  try {
    const pool = await sqlConnect();
    const data = await pool.request().query("SELECT * FROM Items");

    // console.log(data);
    res.json(data.recordset);
  } catch (err) {
    console.error("SQL Query Error:", err);
    res.status(500).send("Server Error");
  }
};

export const getItem = async (req, res) => {
  try {
    const pool = await sqlConnect();
    const data = await pool
      .request()
      .input("myID", sql.Int, req.params.id)
      .query("SELECT * FROM Items WHERE ItemID = @myID");

    // console.log(data);
    res.json(data.recordset);
  } catch (err) {
    console.error("SQL Query Error:", err);
    res.status(500).send("Server Error");
  }
};

export const postItem = async (req, res) => {
  try {
    const pool = await sqlConnect();
    await pool
      .request()
      .input("name", sql.VarChar, req.body.name)
      .input("price", sql.Float, req.body.price)
      .query("INSERT INTO Items (Nombre, Precio) VALUES (@name, @price)");
    const data = await pool
      .request()
      .input("name", sql.VarChar, req.body.name)
      .query("SELECT * FROM Items WHERE Nombre = @name");

    // console.log(data);
    res.status(200).json({ item_added: true, item: data.recordset[0] }); // Mandar estatus 200 (ok) y un json con un mensaje de que se añadió el item.
  } catch (err) {
    console.error("SQL Query Error:", err);
    res.status(500).send("Server Error");
  }
};

export const putItem = async (req, res) => {
  try {
    const pool = await sqlConnect();
    const data = await pool
      .request()
      .input("ID", sql.Int, req.params.id)
      .input("name", sql.VarChar, req.body.name)
      .input("price", sql.Float, req.body.price)
      .query(
        "UPDATE Items SET Nombre = @name, Precio = @price WHERE ItemID = @ID"
      );

    // console.log(data);
    res.status(200).json({ item_updated: true }); // Mandar estatus 200 (ok) y un json con un mensaje de que se añadió el item.
  } catch (err) {
    console.error("SQL Query Error:", err);
    res.status(500).send("Server Error");
  }
};

export const deleteItem = async (req, res) => {
  try {
    const pool = await sqlConnect();
    const data = await pool
      .request()
      .input("myID", sql.Int, req.params.id)
      .query("DELETE FROM Items WHERE ItemID = @myID");

    // console.log(data);
    res.status(200).json({ item_deleted: true });
  } catch (err) {
    console.error("SQL Query Error:", err);
    res.status(500).send("Server Error");
  }
};
