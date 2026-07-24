import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import TheThree from '@/pages/TheThree';
import TheTown from '@/pages/TheTown';
import Shops from '@/pages/Shops';
import Townsfolk from '@/pages/Townsfolk';
import Quests from '@/pages/Quests';
import Encounters from '@/pages/Encounters';
import Gallery from '@/pages/Gallery';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="the-three" element={<TheThree />} />
        <Route path="the-town" element={<TheTown />} />
        <Route path="shops" element={<Shops />} />
        <Route path="townsfolk" element={<Townsfolk />} />
        <Route path="quests" element={<Quests />} />
        <Route path="encounters" element={<Encounters />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
