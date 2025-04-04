import db from "../utils/firebase.js";

export const getItems = async (req, res) => {
  try {
    const items = await db.collection("items").get();
    const list = [];
    items.forEach((doc) => {
      list.push({ id: doc.id, name: doc.data().name, price: doc.data().price });
    });
    res.json(list);
  } catch (err) {
    console.error("Firebase Error:", err);
    res.status(500).send("Server Error");
  }
};

export const getItem = async (req, res) => {
  try {
    const item = await db.collection("items").doc(req.params.id).get();
    res.json({
      id: req.params.id,
      name: item.data().name,
      price: item.data().price,
    });
  } catch (err) {
    console.error("Firebase Error:", err);
    res.status(500).send("Server Error");
  }
};

export const postItem = async (req, res) => {
  try {
    const item = await db.collection("items").add(req.body);
    res.status(200).json({
      item_added: true,
      id: item.id,
      name: req.body.name,
      price: req.body.price,
    }); // Mandar estatus 200 (ok) y un json con un mensaje de que se añadió el item.
  } catch (err) {
    console.error("Firebase Error:", err);
    res.status(500).send("Server Error");
  }
};

export const putItem = async (req, res) => {
  try {
    await db.collection("items").doc(req.params.id).update(req.body);
    res.status(200).json({
      item_updated: true,
      id: req.params.id,
      name: req.body.name,
      price: req.body.price,
    });
  } catch (err) {
    console.error("Firebase Error:", err);
    res.status(500).send("Server Error");
  }
};

export const deleteItem = async (req, res) => {
  try {
    await db.collection("items").doc(req.params.id).delete();
    res.status(200).json({ item_deleted: true });
  } catch (err) {
    console.error("Firebase Error:", err);
    res.status(500).send("Server Error");
  }
};
