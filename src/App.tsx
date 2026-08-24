import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

// Trang chủ nạp thẳng: đó là chỗ người dùng vào đầu tiên, tách ra chỉ tổ nháy
// một cái rồi mới hiện. Mười hai trang còn lại nạp KHI BẤM VÀO, mỗi trang một
// gói riêng — mở app để tra một nguyên tố thì khỏi phải tải kèm máy tính pH,
// bộ cân bằng và bộ sinh đề.
//
// Lối này app đã dùng sẵn cho kho hình cấu tạo (Formulas.tsx) — nay áp cho cả
// các trang.
const PeriodicTable = lazy(() => import('./pages/PeriodicTable'));
const ElementDetail = lazy(() => import('./pages/ElementDetail'));
const Calculator = lazy(() => import('./pages/Calculator'));
const Solubility = lazy(() => import('./pages/Solubility'));
const Formulas = lazy(() => import('./pages/Formulas'));
const Dictionary = lazy(() => import('./pages/Dictionary'));
const Facts = lazy(() => import('./pages/Facts'));
const Reactions = lazy(() => import('./pages/Reactions'));
const Electro = lazy(() => import('./pages/Electro'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Settings = lazy(() => import('./pages/Settings'));

/** Chỗ giữ nhịp trong lúc gói của trang đang về. Không chữ nghĩa gì để khỏi
 *  phải dịch, và để không nháy chữ lạ lên màn hình khi mạng nhanh. */
function DangNap() {
  return (
    <div className="p-6">
      <div className="h-6 w-40 rounded bg-base-800 animate-pulse" />
      <div className="mt-4 h-32 rounded-xl bg-base-900 animate-pulse" />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="*"
          element={
            <Suspense fallback={<DangNap />}>
              <Routes>
                <Route path="table" element={<PeriodicTable />} />
                <Route path="table/:n" element={<ElementDetail />} />
                <Route path="calculator" element={<Calculator />} />
                <Route path="solubility" element={<Solubility />} />
                <Route path="electro" element={<Electro />} />
                <Route path="quiz" element={<Quiz />} />
                <Route path="formulas" element={<Formulas />} />
                <Route path="dictionary" element={<Dictionary />} />
                <Route path="facts" element={<Facts />} />
                <Route path="reactions" element={<Reactions />} />
                <Route path="settings" element={<Settings />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
