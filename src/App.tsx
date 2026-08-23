import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Settings from './pages/Settings';
import PeriodicTable from './pages/PeriodicTable';
import ElementDetail from './pages/ElementDetail';
import Calculator from './pages/Calculator';
import Solubility from './pages/Solubility';
import Formulas from './pages/Formulas';
import Dictionary from './pages/Dictionary';
import Facts from './pages/Facts';
import Reactions from './pages/Reactions';
import Electro from './pages/Electro';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="table" element={<PeriodicTable />} />
        <Route path="table/:n" element={<ElementDetail />} />
        <Route path="calculator" element={<Calculator />} />
        <Route path="solubility" element={<Solubility />} />
        <Route path="electro" element={<Electro />} />
        <Route path="formulas" element={<Formulas />} />
        <Route path="dictionary" element={<Dictionary />} />
        <Route path="facts" element={<Facts />} />
        <Route path="reactions" element={<Reactions />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
