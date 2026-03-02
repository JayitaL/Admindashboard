import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Plus, ChevronDown, ChevronUp, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface StaffData {
  id: number;
  name: string;
  role: string;
  phone: string;
  email: string;
  assignedPG: string;
  joiningDate: string;
  salary: string;
  status: 'active' | 'on-leave' | 'inactive';
}

const initialStaffData: StaffData[] = [
  {
    id: 1,
    name: "Ramesh Kumar",
    role: "Maintenance Staff",
    phone: "+91 98765 43210",
    email: "ramesh.k@rufrent.com",
    assignedPG: "Sunrise PG",
    joiningDate: "15-Jan-2023",
    salary: "₹18,000",
    status: 'active'
  },
  {
    id: 2,
    name: "Lakshmi Devi",
    role: "Housekeeping",
    phone: "+91 98765 43211",
    email: "lakshmi.d@rufrent.com",
    assignedPG: "Sunset Villa",
    joiningDate: "20-Mar-2023",
    salary: "₹15,000",
    status: 'active'
  },
  {
    id: 3,
    name: "Suresh Babu",
    role: "Security Guard",
    phone: "+91 98765 43212",
    email: "suresh.b@rufrent.com",
    assignedPG: "Green Haven",
    joiningDate: "10-May-2023",
    salary: "₹20,000",
    status: 'on-leave'
  },
  {
    id: 4,
    name: "Anjali Sharma",
    role: "Cook",
    phone: "+91 98765 43213",
    email: "anjali.s@rufrent.com",
    assignedPG: "Blue Sky Residency",
    joiningDate: "05-Jul-2023",
    salary: "₹22,000",
    status: 'active'
  },
];

export function StaffTable() {
  const [staffData, setStaffData] = useState<StaffData[]>(initialStaffData);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    phone: "",
    email: "",
    assignedPG: "",
    joiningDate: "",
    salary: "",
  });

  const handleToggleRow = (staffId: number) => {
    setExpandedRows((prev) =>
      prev.includes(staffId)
        ? prev.filter((id) => id !== staffId)
        : [...prev, staffId]
    );
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.role || !formData.phone || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }

    const newStaff: StaffData = {
      id: staffData.length > 0 ? Math.max(...staffData.map(s => s.id)) + 1 : 1,
      name: formData.name,
      role: formData.role,
      phone: formData.phone,
      email: formData.email,
      assignedPG: formData.assignedPG || "N/A",
      joiningDate: formData.joiningDate || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-'),
      salary: formData.salary || "₹0",
      status: 'active'
    };

    setStaffData((prev) => [...prev, newStaff]);
    setFormData({
      name: "",
      role: "",
      phone: "",
      email: "",
      assignedPG: "",
      joiningDate: "",
      salary: "",
    });
    setAddDialogOpen(false);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Staff Management</h1>
        <p className="text-sm md:text-base text-gray-600 mt-2">Manage staff members across all properties</p>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Staff</CardTitle>
            <Button
              onClick={() => setAddDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add New Staff
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Phone</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Assigned PG</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffData.map((staff) => (
                  <>
                    <tr key={`staff-${staff.id}`} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleToggleRow(staff.id)}
                          className="flex items-center gap-2 font-medium text-blue-600 hover:text-blue-800 text-left"
                        >
                          {expandedRows.includes(staff.id) ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                          {staff.name}
                        </button>
                      </td>
                      <td className="py-4 px-4 text-gray-900">{staff.role}</td>
                      <td className="py-4 px-4 text-gray-900">{staff.phone}</td>
                      <td className="py-4 px-4 text-gray-900">{staff.email}</td>
                      <td className="py-4 px-4 text-gray-900">{staff.assignedPG}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          staff.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : staff.status === 'on-leave'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          <span className={`w-2 h-2 rounded-full mr-2 ${
                            staff.status === 'active' ? 'bg-green-500' : staff.status === 'on-leave'
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`} />
                          {staff.status === 'active' ? 'Active' : staff.status === 'on-leave'
                            ? 'On Leave'
                            : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          <Edit className="w-4 h-4" />
                          Edit
                        </Button>
                      </td>
                    </tr>
                    {/* Expanded Details Row */}
                    {expandedRows.includes(staff.id) && (
                      <tr className="bg-blue-50/30 border-b border-gray-100">
                        <td colSpan={7} className="py-4 px-4">
                          <div className="max-w-4xl">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Staff Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Full Name</p>
                                <p className="text-gray-900">{staff.name}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Role</p>
                                <p className="text-gray-900">{staff.role}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Phone Number</p>
                                <p className="text-gray-900">{staff.phone}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Email Address</p>
                                <p className="text-gray-900">{staff.email}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Assigned PG</p>
                                <p className="text-gray-900">{staff.assignedPG}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Joining Date</p>
                                <p className="text-gray-900">{staff.joiningDate}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Monthly Salary</p>
                                <p className="text-gray-900">{staff.salary}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Employment Status</p>
                                <p className="text-gray-900">
                                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                    staff.status === 'active' 
                                      ? 'bg-green-100 text-green-800' 
                                      : staff.status === 'on-leave'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-red-100 text-red-800'
                                  }`}>
                                    <span className={`w-2 h-2 rounded-full mr-2 ${
                                      staff.status === 'active' ? 'bg-green-500' : staff.status === 'on-leave'
                                        ? 'bg-yellow-500'
                                        : 'bg-red-500'
                                    }`} />
                                    {staff.status === 'active' ? 'Active' : staff.status === 'on-leave'
                                      ? 'On Leave'
                                      : 'Inactive'}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Staff Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Staff</DialogTitle>
            <DialogDescription>
              Enter the details of the new staff member.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="staff-name">Full Name</Label>
                <Input id="staff-name" placeholder="Enter staff name" value={formData.name} onChange={(e) => handleFormChange("name", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" placeholder="Enter role" value={formData.role} onChange={(e) => handleFormChange("role", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="Enter phone number" value={formData.phone} onChange={(e) => handleFormChange("phone", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter email" value={formData.email} onChange={(e) => handleFormChange("email", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="assigned-pg">Assigned PG</Label>
                <Input id="assigned-pg" placeholder="Enter PG name" value={formData.assignedPG} onChange={(e) => handleFormChange("assignedPG", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Monthly Salary</Label>
                <Input id="salary" placeholder="e.g., ₹18,000" value={formData.salary} onChange={(e) => handleFormChange("salary", e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="joining-date">Joining Date</Label>
              <Input id="joining-date" type="date" value={formData.joiningDate} onChange={(e) => handleFormChange("joiningDate", e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Add Staff</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}