import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Mail, Phone, Building2, Calendar, AlertCircle, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";

const guests = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    phone: "+91 98765 43230",
    pg: "Sunrise PG",
    room: "101",
    joinDate: "Jan 15, 2026",
    monthlyRent: "₹12,000",
    guestStatus: "active",
    serviceTickets: 2,
    emergencyContact: "+91 98765 00001",
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya.patel@email.com",
    phone: "+91 98765 43231",
    pg: "Sunset Villa",
    room: "205",
    joinDate: "Dec 10, 2025",
    monthlyRent: "₹10,000",
    guestStatus: "active",
    serviceTickets: 0,
    emergencyContact: "+91 98765 00002",
  },
  {
    id: 3,
    name: "Amit Kumar",
    email: "amit.kumar@email.com",
    phone: "+91 98765 43232",
    pg: "Green Haven",
    room: "303",
    joinDate: "Feb 1, 2026",
    monthlyRent: "₹15,000",
    guestStatus: "active",
    serviceTickets: 1,
    emergencyContact: "+91 98765 00003",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    email: "sneha.reddy@email.com",
    phone: "+91 98765 43233",
    pg: "Blue Sky Residency",
    room: "402",
    joinDate: "Jan 20, 2026",
    monthlyRent: "₹13,000",
    guestStatus: "dormant",
    serviceTickets: 5,
    emergencyContact: "+91 98765 00004",
  },
  {
    id: 5,
    name: "Karan Verma",
    email: "karan.verma@email.com",
    phone: "+91 98765 43234",
    pg: "Sunrise PG",
    room: "105",
    joinDate: "Nov 5, 2025",
    monthlyRent: "₹12,000",
    guestStatus: "active",
    serviceTickets: 3,
    emergencyContact: "+91 98765 00005",
  },
  {
    id: 6,
    name: "Anjali Singh",
    email: "anjali.singh@email.com",
    phone: "+91 98765 43235",
    pg: "Green Haven",
    room: "201",
    joinDate: "Oct 12, 2025",
    monthlyRent: "₹15,000",
    guestStatus: "dormant",
    serviceTickets: 1,
    emergencyContact: "+91 98765 00006",
  },
];

export function GuestsTable() {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const handleToggleRow = (guestId: number) => {
    setExpandedRows((prev) =>
      prev.includes(guestId)
        ? prev.filter((id) => id !== guestId)
        : [...prev, guestId]
    );
  };

  const handleAddGuest = () => {
    setAddDialogOpen(true);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Guests</h1>
        <p className="text-sm md:text-base text-gray-600 mt-2">Manage all guests information</p>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>All Guests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Contact</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">PG & Room</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Join Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Monthly Rent</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Service Tickets</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Emergency</th>
                </tr>
              </thead>
              <tbody>
                {guests.map((guest) => (
                  <>
                    <tr key={guest.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleToggleRow(guest.id)}
                          className="flex items-center gap-2 font-medium text-blue-600 hover:text-blue-800 text-left"
                        >
                          {expandedRows.includes(guest.id) ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                          {guest.name}
                        </button>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="w-3 h-3" />
                            <span className="truncate max-w-[180px]">{guest.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-3 h-3" />
                            <span>{guest.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-sm text-gray-900">
                          <Building2 className="w-3 h-3 text-blue-600" />
                          <span>{guest.pg}</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">Room {guest.room}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-3 h-3" />
                          <span>{guest.joinDate}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-900 font-semibold">{guest.monthlyRent}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <AlertCircle
                            className={`w-4 h-4 ${
                              guest.serviceTickets > 3 ? "text-red-600" : "text-gray-600"
                            }`}
                          />
                          <span
                            className={`font-semibold ${
                              guest.serviceTickets > 3 ? "text-red-600" : "text-gray-900"
                            }`}
                          >
                            {guest.serviceTickets}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-3 h-3" />
                          <span>{guest.emergencyContact}</span>
                        </div>
                      </td>
                    </tr>
                    {/* Expanded Details Row */}
                    {expandedRows.includes(guest.id) && (
                      <tr className="bg-blue-50/30 border-b border-gray-100">
                        <td colSpan={7} className="py-4 px-4">
                          <div className="max-w-4xl">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Full Name</p>
                                <p className="text-gray-900">{guest.name}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Email Address</p>
                                <p className="text-gray-900">{guest.email}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Phone Number</p>
                                <p className="text-gray-900">{guest.phone}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Emergency Contact</p>
                                <p className="text-gray-900">{guest.emergencyContact}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Property Name</p>
                                <p className="text-gray-900">{guest.pg}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Room Number</p>
                                <p className="text-gray-900">Room {guest.room}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Join Date</p>
                                <p className="text-gray-900">{guest.joinDate}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Monthly Rent</p>
                                <p className="text-gray-900">{guest.monthlyRent}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Guest Status</p>
                                <Badge
                                  variant={guest.guestStatus === "active" ? "default" : "secondary"}
                                  className={
                                    guest.guestStatus === "active"
                                      ? "bg-green-100 text-green-700 hover:bg-green-100"
                                      : "bg-orange-100 text-orange-700 hover:bg-orange-100"
                                  }
                                >
                                  {guest.guestStatus}
                                </Badge>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Service Tickets Count</p>
                                <p
                                  className={`font-semibold ${
                                    guest.serviceTickets > 3 ? "text-red-600" : "text-gray-900"
                                  }`}
                                >
                                  {guest.serviceTickets} tickets
                                </p>
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
                      onClick={handleAddGuest}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium w-full"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Guest</span>
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
            <DialogTitle>Add New Guest</DialogTitle>
            <DialogDescription>
              Add a new guest to the system by filling out the form below.
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
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input id="emergencyContact" placeholder="Enter emergency contact" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pg">PG</Label>
                <Input id="pg" placeholder="Enter PG name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="room">Room</Label>
                <Input id="room" placeholder="Enter room number" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="joinDate">Join Date</Label>
                <Input id="joinDate" placeholder="e.g., Jan 15, 2026" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlyRent">Monthly Rent</Label>
                <Input id="monthlyRent" placeholder="e.g., ₹12,000" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="guestStatus">Guest Status</Label>
                <Input id="guestStatus" placeholder="active/dormant" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serviceTickets">Service Tickets</Label>
                <Input id="serviceTickets" type="number" placeholder="Enter number" defaultValue="0" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setAddDialogOpen(false)}>Add Guest</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}