import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    text: "",
    category: "",
    priority: "Medium",
    dueDate: ""
  });

  const navigate = useNavigate();

  // ✅ Check auth + fetch tasks
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tasks", {
          headers: { Authorization: token },
        });
        setTasks(res.data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      }
    };

    fetchTasks();
  }, [navigate]);

  // ✅ Handle add task
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/tasks", formData, {
        headers: { Authorization: token },
      });
      setTasks((prev) => [...prev, res.data]);
      setFormData({ text: "", category: "", priority: "Medium", dueDate: "" });
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  // ✅ Toggle complete
  const toggleComplete = async (id) => {
    const token = localStorage.getItem("token");
    const res = await axios.put(`http://localhost:5000/api/tasks/complete/${id}`, {}, {
      headers: { Authorization: token },
    });
    setTasks((prev) =>
      prev.map((task) => (task._id === id ? res.data : task))
    );
  };

  // ✅ Delete task
  const deleteTask = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: token },
    });
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Your Tasks</h1>

        <form onSubmit={handleAddTask} className="bg-white p-4 rounded shadow mb-6">
          <input type="text" name="text" placeholder="Task" required value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            className="w-full p-2 mb-2 border rounded" />

        <select name="category" value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        className="w-full p-2 mb-2 border rounded">
        <option value="">Select Category</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Study">Study</option>
        <option value="Shopping">Shopping</option>
        <option value="Fitness">Fitness</option>
        <option value="Finance">Finance</option>
        <option value="Health">Health</option>
        <option value="Travel">Travel</option>
        <option value="Misc">Miscellaneous</option>
        </select>


          <select name="priority" value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            className="w-full p-2 mb-2 border rounded">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input type="date" name="dueDate" value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            className="w-full p-2 mb-4 border rounded" />

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Add Task
          </button>
        </form>

        <ul className="space-y-3">
          {tasks.map((task) => (
            <li key={task._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <h3 className={`font-semibold ${task.completed ? "line-through text-gray-400" : ""}`}>
                  {task.text}
                </h3>
                <p className="text-sm text-gray-500">
                  {task.category} | {task.priority} | Due: {task.dueDate?.split("T")[0]}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toggleComplete(task._id)}
                  className="px-2 py-1 bg-green-500 text-white rounded">
                  ✅
                </button>
                <button onClick={() => deleteTask(task._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded">
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
