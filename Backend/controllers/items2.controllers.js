import Item from "../utils/item.model.js";

export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.error("MongoDB Error:", err);
    res.status(500).send("Server Error");
  }
};

export const getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.json(item);
  } catch (err) {
    console.error("MongoDB Error:", err);
    res.status(500).send("Server Error");
  }
};

export const postItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(200).json({ item_added: true, item: newItem });
  } catch (err) {
    console.error("MongoDB Error:", err);
    res.status(500).send("Server Error");
  }
};

export const putItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(item);
    res.status(200).json({ item_updated: true }); // Mandar estatus 200 (ok) y un json con un mensaje de que se añadió el item.
  } catch (err) {
    console.error("MongoDB Error:", err);
    res.status(500).send("Server Error");
  }
};

export const deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).json({ item_deleted: true });
  } catch (err) {
    console.error("MongoDB Error:", err);
    res.status(500).send("Server Error");
  }
};
