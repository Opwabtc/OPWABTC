import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Marketplace } from './pages/Marketplace';
import { PropertyManagement } from './pages/PropertyManagement';
import { Simulator } from './pages/Simulator';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/properties" element={<Marketplace />} />
        <Route path="/portfolio" element={<Dashboard />} />
        <Route path="/simulator" element={<Simulator />} />
        <Route path="/admin" element={<PropertyManagement />} />
        <Route path="/manage" element={<PropertyManagement />} />
      </Routes>
    </Layout>
  );
}

export default App;
