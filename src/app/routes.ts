import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { PGsPage } from "./components/PGsPage";
import { RequestsPage } from "./components/RequestsPage";
import { TablesPage } from "./components/TablesPage";
import { OwnersTable } from "./components/OwnersTable";
import { ManagersTable } from "./components/ManagersTable";
import { GuestsTable } from "./components/GuestsTable";
import { PGsTable } from "./components/PGsTable";
import { AddTablesPage } from "./components/AddTablesPage";
import { AddAmenitiesPage } from "./components/AddAmenitiesPage";
import { GuestsPage } from "./components/GuestsPage";
import { PaymentsPage } from "./components/PaymentsPage";
import { ReportsPage } from "./components/ReportsPage";
import { SettingsPage } from "./components/SettingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "pgs", Component: PGsPage },
      { path: "guests", Component: GuestsPage },
      { path: "requests", Component: RequestsPage },
      { path: "tables", Component: TablesPage },
      { path: "tables/owners", Component: OwnersTable },
      { path: "tables/managers", Component: ManagersTable },
      { path: "tables/guests", Component: GuestsTable },
      { path: "tables/pgs", Component: PGsTable },
      { path: "add-tables", Component: AddTablesPage },
      { path: "add-amenities", Component: AddAmenitiesPage },
      { path: "payments", Component: PaymentsPage },
      { path: "reports", Component: ReportsPage },
      { path: "settings", Component: SettingsPage },
    ],
  },
]);