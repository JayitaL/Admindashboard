import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Building2, Mail, Phone, MapPin, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";

const owners = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 98765 43210",
    address: "Koramangala, Bangalore",
    pgsOwned: ["Sunrise PG", "Sunset Villa"],
    totalRooms: 35,
    joinDate: "Jan 2024",
    status: "active",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43211",
    address: "HSR Layout, Bangalore",
    pgsOwned: ["Green Haven"],
    totalRooms: 25,
    joinDate: "Mar 2024",
    status: "active",
  },
  {
    id: 3,
    name: "Amit Patel",
    email: "amit.patel@email.com",
    phone: "+91 98765 43212",
    address: "Whitefield, Bangalore",
    pgsOwned: ["Blue Sky Residency"],
    totalRooms: 30,
    joinDate: "Jun 2024",
    status: "active",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    email: "sneha.reddy@email.com",
    phone: "+91 98765 43213",
    address: "Indiranagar, Bangalore",
    pgsOwned: ["Ocean View PG"],
    totalRooms: 20,
    joinDate: "Sep 2024",
    status: "active",
  },
];

export function OwnersTable() {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const handleToggleRow = (ownerId: number) => {
    setExpandedRows((prev) =>
      prev.includes(ownerId)
        ? prev.filter((id) => id !== ownerId)
        : [...prev, ownerId]
    );
  };

  const handleAddOwner = () => {
    setAddDialogOpen(true);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Owners</h1>
        <p className="text-sm md:text-base text-gray-600 mt-2">Manage property owners</p>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>All Owners</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Contact</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Address</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">PGs Owned</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Total Rooms</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Join Date</th>
                </tr>
              </thead>
              <tbody>
                {owners.map((owner) => (
                  <>
                    <tr key={owner.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleToggleRow(owner.id)}
                          className="flex items-center gap-2 font-medium text-blue-600 hover:text-blue-800 text-left"
                        >
                          {expandedRows.includes(owner.id) ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                          {owner.name}
                        </button>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="w-3 h-3" />
                            <span>{owner.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-3 h-3" />
                            <span>{owner.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-3 h-3" />
                          <span>{owner.address}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          {owner.pgsOwned.map((pg, idx) => (
                            <div key={`pg-${owner.id}-${idx}`} className="flex items-center gap-2 text-sm text-gray-900">
                              <Building2 className="w-3 h-3 text-blue-600" />
                              <span>{pg}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-900 font-semibold">{owner.totalRooms}</td>
                      <td className="py-4 px-4 text-gray-600">{owner.joinDate}</td>
                    </tr>
                    {/* Expanded Details Row */}
                    {expandedRows.includes(owner.id) && (
                      <tr className="bg-blue-50/30 border-b border-gray-100">
                        <td colSpan={6} className="py-4 px-4">
                          <div className="max-w-4xl">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Full Name</p>
                                <p className="text-gray-900">{owner.name}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Email Address</p>
                                <p className="text-gray-900">{owner.email}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Phone Number</p>
                                <p className="text-gray-900">{owner.phone}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Current Address</p>
                                <p className="text-gray-900">{owner.address}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Properties Owned</p>
                                <p className="text-gray-900">{owner.pgsOwned.join(", ")}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Total Rooms</p>
                                <p className="text-gray-900">{owner.totalRooms} rooms</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Joining Date</p>
                                <p className="text-gray-900">{owner.joinDate}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Account Status</p>
                                <p className="text-gray-900 capitalize">{owner.status}</p>
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
                  <td colSpan={6} className="py-4 px-4">
                    <button
                      onClick={handleAddOwner}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium w-full"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Owner</span>
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
            <DialogTitle>Add New Owner</DialogTitle>
            <DialogDescription>Enter the details of the new owner.</DialogDescription>
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
                <Label htmlFor="pgsOwned">PGs Owned</Label>
                <Input id="pgsOwned" placeholder="Enter PG names (comma separated)" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalRooms">Total Rooms</Label>
                <Input id="totalRooms" type="number" placeholder="Enter total rooms" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="joinDate">Join Date</Label>
                <Input id="joinDate" placeholder="e.g., Jan 2024" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Input id="status" placeholder="active/inactive" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setAddDialogOpen(false)}>Add Owner</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}