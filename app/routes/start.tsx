import { Navbar } from "~/components/Navbar/Navbar";
import type { LoaderFunction } from "remix";
import { Outlet } from "remix";

export const loader: LoaderFunction = async ({ request }) => {
  return {};
};

export default function () {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </>
  );
}
