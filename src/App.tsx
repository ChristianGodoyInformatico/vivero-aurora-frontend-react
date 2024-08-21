import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AppRoutes from './routes';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className=""> {/* Agregar padding para evitar que el contenido se solape con el navbar */}
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
}

export default App;

// import TaskForm from './components/TaskForm';
// import TaskList from './components/TaskList';

// function App() {
//   return (
//     <div className="bg-zinc-900 h-screen text-white flex items-center justify-center">
//       <div className="bg-gray-950 p-4 w-1/5">
//         <h1  className="text-3xl font-bold text-center block my-2">Vivero Aurora</h1>
//         <TaskList />
//         <TaskForm />
//       </div>
//     </div>
//   )
// }

// export default App
