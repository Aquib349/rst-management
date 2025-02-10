import React, { useState, useEffect } from "react";

// Mock data
const initialMenuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic tomato and mozzarella",
    price: 12.99,
    category: "Pizza",
    available: true,
  },
  {
    id: 2,
    name: "Caesar Salad",
    description: "Romaine lettuce with parmesan",
    price: 8.99,
    category: "Salad",
    available: true,
  },
];

const categories = ["Pizza", "Salad", "Pasta", "Drinks", "Desserts"];

const Menus = () => {
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    available: true,
  });

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      // Update existing item
      setMenuItems(
        menuItems.map((item) =>
          item.id === editingItem.id ? { ...formData, id: item.id } : item
        )
      );
    } else {
      // Add new item
      setMenuItems([...menuItems, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      available: true,
    });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  return (
    <div className="menu-management">
      <header className="menu-header">
        <h1>Menu Management</h1>
        <button className="add-item-btn" onClick={() => setIsModalOpen(true)}>
          Add New Item
        </button>
      </header>

      <div className="toolbar">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="menu-items-grid">
        {filteredItems.map((item) => (
          <div key={item.id} className="menu-item-card">
            <div className="item-header">
              <h3>{item.name}</h3>
              <span>${item.price}</span>
            </div>
            <p className="item-description">{item.description}</p>
            <div className="item-footer">
              <span
                className={`availability ${
                  item.available ? "available" : "out-of-stock"
                }`}
              >
                {item.available ? "Available" : "Out of Stock"}
              </span>
              <div className="item-actions">
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingItem ? "Edit Menu Item" : "Add New Menu Item"}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Item Name:
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </label>

              <label>
                Description:
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </label>

              <label>
                Price:
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
              </label>

              <label>
                Category:
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Available:
                <input
                  type="checkbox"
                  checked={formData.available}
                  onChange={(e) =>
                    setFormData({ ...formData, available: e.target.checked })
                  }
                />
              </label>

              <div className="modal-actions">
                <button type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit">
                  {editingItem ? "Save Changes" : "Add Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menus;
