import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Building2, Mail, Phone, MapPin, Users, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { useState } from "react";

const managers = [
  {
    id: 1,
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    phone: "+91 98765 43220",
    address: "Koramangala, Bangalore",
    pgsManaged: ["Sunrise PG"],
    guestsManaged: 18,
    experience: "3 years",
    joinDate: "Feb 2024",
    status: "active",
  },
  {
    id: 2,
    name: "Kavya Nair",
    email: "kavya.nair@email.com",
    phone: "+91 98765 43221",
    address: "HSR Layout, Bangalore",
    pgsManaged: ["Sunset Villa", "Green Haven"],
    guestsManaged: 34,
    experience: "5 years",
    joinDate: "Jan 2024",
    status: "active",
  },
  {
    id: 3,
    name: "Arun Mehta",
    email: "arun.mehta@email.com",
    phone: "+91 98765 43222",
    address: "Whitefield, Bangalore",
    pgsManaged: ["Blue Sky Residency"],
    guestsManaged: 28,
    experience: "4 years",
    joinDate: "Mar 2024",
    status: "active",
  },
  {
    id: 4,
    name: "Deepa Iyer",
    email: "deepa.iyer@email.com",
    phone: "+91 98765 43223",
    address: "Indiranagar, Bangalore",
    pgsManaged: ["Ocean View PG"],
    guestsManaged: 15,
    experience: "2 years",
    joinDate: "May 2024",
    status: "active",
  },
];

export function ManagersTable() {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const handleToggleRow = (managerId: number) => {
    setExpandedRows((prev) =>
      prev.includes(managerId)
        ? prev.filter((id) => id !== managerId)
        : [...prev, managerId]
    );
  };

  const handleAddManager = () => {
    setAddDialogOpen(true);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Managers</h1>
        <p className="text-sm md:text-base text-gray-600 mt-2">Manage PG managers</p>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>All Managers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Contact</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Address</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">PGs Managed</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Guests</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Experience</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Join Date</th>
                </tr>
              </thead>
              <tbody>
                {managers.map((manager) => (
                  <>
                    <tr key={manager.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleToggleRow(manager.id)}
                          className="flex items-center gap-2 font-medium text-blue-600 hover:text-blue-800 text-left"
                        >
                          {expandedRows.includes(manager.id) ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                          {manager.name}
                        </button>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="w-3 h-3" />
                            <span>{manager.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-3 h-3" />
                            <span>{manager.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-3 h-3" />
                          <span>{manager.address}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          {manager.pgsManaged.map((pg, idx) => (
                            <div key={`pg-${manager.id}-${idx}`} className="flex items-center gap-2 text-sm text-gray-900">
                              <Building2 className="w-3 h-3 text-blue-600" />
                              <span>{pg}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-gray-900 font-semibold">
                          <Users className="w-4 h-4 text-gray-600" />
                          <span>{manager.guestsManaged}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{manager.experience}</td>
                      <td className="py-4 px-4 text-gray-600">{manager.joinDate}</td>
                    </tr>
                    {/* Expanded Details Row */}
                    {expandedRows.includes(manager.id) && (
                      <tr className="bg-blue-50/30 border-b border-gray-100">
                        <td colSpan={7} className="py-4 px-4">
                          <div className="max-w-4xl">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Full Name</p>
                                <p className="text-gray-900">{manager.name}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Email Address</p>
                                <p className="text-gray-900">{manager.email}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Phone Number</p>
                                <p className="text-gray-900">{manager.phone}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Current Address</p>
                                <p className="text-gray-900">{manager.address}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Properties Managed</p>
                                <p className="text-gray-900">{manager.pgsManaged.join(", ")}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Total Guests</p>
                                <p className="text-gray-900">{manager.guestsManaged} guests</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Years of Experience</p>
                                <p className="text-gray-900">{manager.experience}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Joining Date</p>
                                <p className="text-gray-900">{manager.joinDate}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Account Status</p>
                                <p className="text-gray-900 capitalize">{manager.status}</p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
                {/* Add new row */}
                <tr className="border-b border-gray-100 bg-blue-50/50 hover:bg-blue-50">
                  <td colSpan={7} className="py-4 px-4">
                    <button
                      onClick={handleAddManager}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium w-full"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Manager</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Manager</DialogTitle>
            <DialogDescription>
              Enter the details of the new manager to add them to the system.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Enter address" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pgsManaged">PGs Managed</Label>
                <Input id="pgsManaged" placeholder="Enter PG names (comma separated)" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guestsManaged">Guests Managed</Label>
                <Input id="guestsManaged" type="number" placeholder="Enter number of guests" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="experience">Experience</Label>
                <Input id="experience" placeholder="e.g., 3 years" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="joinDate">Join Date</Label>
                <Input id="joinDate" placeholder="e.g., Feb 2024" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Input id="status" placeholder="active/inactive" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setAddDialogOpen(false)}>Add Manager</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}