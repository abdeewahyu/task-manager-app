import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div className="flex items-center bg-blue-400 min-h-screen">
      <div className="max-w-xl mx-auto w-full bg-white p-6 rounded-xl shadow-xl">
        <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-8">
          Task Manager
        </h1>
        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
}

export default App;
