import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background-light">
        <div className="max-w-7xl mx-auto p-6">
          <Outlet />
        </div>
      </main>
    </>
  );
}
