import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./constants/routes.ts";
import { Suspense } from "react";
import Loading from "./components/shared/Loading.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {routes.map(({ path, Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
