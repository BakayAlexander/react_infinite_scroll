import { Routes, Route, Navigate } from 'react-router-dom';
import FirstExample from './FirstExample';
import Home from './Home';
import SecondExample from './SecondExample';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/first" element={<FirstExample />} />
      <Route exact path="/second" element={<SecondExample />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
