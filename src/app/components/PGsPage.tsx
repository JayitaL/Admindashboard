import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Building2, MapPin, Users, Plus, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Upload, X, Image as ImageIcon, Video, Edit, Trash2, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const pgs = [
  {
    id: 1,
    name: "Sunrise PG",
    location: "Koramangala, Bangalore",
    capacity: 20,
    occupied: 18,
  },
  {
    id: 2,
    name: "Sunset Villa",
    location: "HSR Layout, Bangalore",
    capacity: 15,
    occupied: 12,
  },
  {
    id: 3,
    name: "Green Haven",
    location: "Indiranagar, Bangalore",
    capacity: 25,
    occupied: 22,
  },
  {
    id: 4,
    name: "Blue Sky Residency",
    location: "Whitefield, Bangalore",
    capacity: 30,
    occupied: 28,
  },
];

interface PGMedia {
  images: File[];
  videos: File[];
}

interface PGData {
  id: number;
  name: string;
  location: string;
  owner: string;
  manager: string;
  totalRooms: number;
  occupiedRooms: number;
  monthlyRent: string;
  amenities: string[];
  media: PGMedia;
  status: 'active' | 'under-maintenance' | 'closed';
}

const initialPgsData: PGData[] = [
  {
    id: 1,
    name: "Sunrise PG",
    location: "Koramangala, Bangalore",
    owner: "Rajesh Kumar",
    manager: "Vikram Singh",
    totalRooms: 20,
    occupiedRooms: 18,
    monthlyRent: "₹8,000",
    amenities: ["WiFi", "AC", "Laundry"],
    media: {
      images: [],
      videos: []
    },
    status: 'active'
  },
  {
    id: 2,
    name: "Sunset Villa",
    location: "HSR Layout, Bangalore",
    owner: "Rajesh Kumar",
    manager: "Kavya Nair",
    totalRooms: 15,
    occupiedRooms: 12,
    monthlyRent: "₹10,000",
    amenities: ["WiFi", "Gym", "Parking"],
    media: {
      images: [],
      videos: []
    },
    status: 'active'
  },
  {
    id: 3,
    name: "Green Haven",
    location: "Whitefield, Bangalore",
    owner: "Priya Sharma",
    manager: "Kavya Nair",
    totalRooms: 25,
    occupiedRooms: 22,
    monthlyRent: "₹7,500",
    amenities: ["WiFi", "AC", "Food"],
    media: {
      images: [],
      videos: []
    },
    status: 'under-maintenance'
  },
  {
    id: 4,
    name: "Blue Sky Residency",
    location: "Indiranagar, Bangalore",
    owner: "Amit Patel",
    manager: "Arun Mehta",
    totalRooms: 30,
    occupiedRooms: 28,
    monthlyRent: "₹12,000",
    amenities: ["WiFi", "AC", "Gym", "Food"],
    media: {
      images: [],
      videos: []
    },
    status: 'closed'
  },
];

export function PGsPage() {
  const [pgsData, setPgsData] = useState<PGData[]>(initialPgsData);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [mediaDialogOpen, setMediaDialogOpen] = useState(false);
  const [viewMediaDialogOpen, setViewMediaDialogOpen] = useState(false);
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState<File[]>([]);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [selectedPgId, setSelectedPgId] = useState<number | null>(null);
  const [tempImages, setTempImages] = useState<File[]>([]);
  const [tempVideos, setTempVideos] = useState<File[]>([]);
  const [selectedPgIds, setSelectedPgIds] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    owner: "",
    manager: "",
    totalRooms: "",
    monthlyRent: "",
    amenities: "",
  });

  const handleToggleRow = (pgId: number) => {
    setExpandedRows((prev) =>
      prev.includes(pgId)
        ? prev.filter((id) => id !== pgId)
        : [...prev, pgId]
    );
  };

  const handleAddPG = () => {
    setFormData({
      name: "",
      location: "",
      owner: "",
      manager: "",
      totalRooms: "",
      monthlyRent: "",
      amenities: "",
    });
    setAddDialogOpen(true);
  };

  const handleEditSelected = () => {
    if (selectedPgIds.length === 1) {
      const pg = pgsData.find(p => p.id === selectedPgIds[0]);
      if (pg) {
        setSelectedPgId(selectedPgIds[0]);
        setFormData({
          name: pg.name,
          location: pg.location,
          owner: pg.owner,
          manager: pg.manager,
          totalRooms: pg.totalRooms.toString(),
          monthlyRent: pg.monthlyRent,
          amenities: pg.amenities.join(", "),
        });
        setEditDialogOpen(true);
      }
    } else if (selectedPgIds.length === 0) {
      alert("Please select a PG to edit");
    } else {
      alert("Please select only one PG to edit");
    }
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitAddPG = () => {
    if (!formData.name || !formData.location || !formData.owner || !formData.manager || !formData.totalRooms || !formData.monthlyRent) {
      alert("Please fill in all required fields");
      return;
    }

    const newPG: PGData = {
      id: pgsData.length > 0 ? Math.max(...pgsData.map(p => p.id)) + 1 : 1,
      name: formData.name,
      location: formData.location,
      owner: formData.owner,
      manager: formData.manager,
      totalRooms: parseInt(formData.totalRooms),
      occupiedRooms: 0,
      monthlyRent: formData.monthlyRent,
      amenities: formData.amenities ? formData.amenities.split(",").map(a => a.trim()) : [],
      media: {
        images: [],
        videos: []
      },
      status: 'active'
    };

    setPgsData(prev => [...prev, newPG]);
    setAddDialogOpen(false);
    setFormData({
      name: "",
      location: "",
      owner: "",
      manager: "",
      totalRooms: "",
      monthlyRent: "",
      amenities: "",
    });
  };

  const handleSubmitEditPG = () => {
    if (!formData.name || !formData.location || !formData.owner || !formData.manager || !formData.totalRooms || !formData.monthlyRent) {
      alert("Please fill in all required fields");
      return;
    }

    if (selectedPgId !== null) {
      setPgsData(prev => prev.map(pg => 
        pg.id === selectedPgId 
          ? {
              ...pg,
              name: formData.name,
              location: formData.location,
              owner: formData.owner,
              manager: formData.manager,
              totalRooms: parseInt(formData.totalRooms),
              monthlyRent: formData.monthlyRent,
              amenities: formData.amenities ? formData.amenities.split(",").map(a => a.trim()) : [],
            }
          : pg
      ));
      setEditDialogOpen(false);
      setSelectedPgId(null);
      setSelectedPgIds([]);
      setFormData({
        name: "",
        location: "",
        owner: "",
        manager: "",
        totalRooms: "",
        monthlyRent: "",
        amenities: "",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditDialogOpen(false);
    setSelectedPgId(null);
    setFormData({
      name: "",
      location: "",
      owner: "",
      manager: "",
      totalRooms: "",
      monthlyRent: "",
      amenities: "",
    });
  };

  const handleDeleteSelected = () => {
    if (selectedPgIds.length === 0) {
      return;
    }
    setPgsData(pgsData.filter(pg => !selectedPgIds.includes(pg.id)));
    setSelectedPgIds([]);
  };

  const toggleSelectPg = (pgId: number) => {
    setSelectedPgIds(prev =>
      prev.includes(pgId) ? prev.filter(id => id !== pgId) : [...prev, pgId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedPgIds.length === pgsData.length) {
      setSelectedPgIds([]);
    } else {
      setSelectedPgIds(pgsData.map(pg => pg.id));
    }
  };

  const openMediaDialog = (pgId: number) => {
    setSelectedPgId(pgId);
    const pg = pgsData.find(p => p.id === pgId);
    if (pg) {
      setTempImages(pg.media.images);
      setTempVideos(pg.media.videos);
    }
    setMediaDialogOpen(true);
  };

  const openViewMediaDialog = (pgId: number) => {
    setSelectedPgId(pgId);
    setViewMediaDialogOpen(true);
  };

  const closeMediaDialog = () => {
    setMediaDialogOpen(false);
    setTempImages([]);
    setTempVideos([]);
    setSelectedPgId(null);
  };

  const closeViewMediaDialog = () => {
    setViewMediaDialogOpen(false);
    setSelectedPgId(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (tempImages.length + files.length <= 5) {
      setTempImages([...tempImages, ...files]);
    } else {
      alert("You can only upload up to 5 images");
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (tempVideos.length + files.length <= 2) {
      setTempVideos([...tempVideos, ...files]);
    } else {
      alert("You can only upload up to 2 videos");
    }
  };

  const removeImage = (index: number) => {
    setTempImages(tempImages.filter((_, i) => i !== index));
  };

  const removeVideo = (index: number) => {
    setTempVideos(tempVideos.filter((_, i) => i !== index));
  };

  const handleMediaUpload = () => {
    if (selectedPgId !== null) {
      const updatedPgsData = pgsData.map(pg => {
        if (pg.id === selectedPgId) {
          return {
            ...pg,
            media: {
              images: tempImages,
              videos: tempVideos
            }
          };
        }
        return pg;
      });
      setPgsData(updatedPgsData);
    }
    closeMediaDialog();
  };

  const openImageViewer = (images: File[], index: number) => {
    setCurrentImages(images);
    setCurrentImageIndex(index);
    setImageViewerOpen(true);
  };

  const closeImageViewer = () => {
    setImageViewerOpen(false);
    setCurrentImages([]);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (currentImageIndex < currentImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">PGs</h1>
        <p className="text-sm md:text-base text-gray-600 mt-2">Manage your paying guest properties</p>
      </div>

      {/* Cards View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        {pgs.map((pg) => (
          <Card key={pg.id} className="border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{pg.name}</CardTitle>
                  <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>{pg.location}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Occupancy</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {pg.occupied}/{pg.capacity}
                </span>
              </div>
              <div className="mt-3 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(pg.occupied / pg.capacity) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table View */}
      <Card className="border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All PGs</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleAddPG}
                size="icon"
                title="Add New PG"
              >
                <Plus className="w-4 h-4" />
              </Button>
              <Button
                onClick={handleEditSelected}
                size="icon"
                title="Edit Selected"
                disabled={selectedPgIds.length !== 1}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                onClick={handleDeleteSelected}
                size="icon"
                title="Delete Selected"
                disabled={selectedPgIds.length === 0}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    <input
                      type="checkbox"
                      checked={selectedPgIds.length === pgsData.length}
                      onChange={toggleSelectAll}
                      className="mr-2"
                    />
                    Select
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Location</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Owner</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Manager</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Occupancy</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Monthly Rent</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Current Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Media</th>
                </tr>
              </thead>
              <tbody>
                {pgsData.map((pg) => [
                  <tr key={`pg-${pg.id}`} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <input
                          type="checkbox"
                          checked={selectedPgIds.includes(pg.id)}
                          onChange={() => toggleSelectPg(pg.id)}
                          className="mr-2"
                        />
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleToggleRow(pg.id)}
                          className="flex items-center gap-2 font-medium text-blue-600 hover:text-blue-800 text-left"
                        >
                          {expandedRows.includes(pg.id) ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                          {pg.name}
                        </button>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-3 h-3" />
                          <span>{pg.location}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-900">{pg.owner}</td>
                      <td className="py-4 px-4 text-gray-900">{pg.manager}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-600" />
                          <span className="text-gray-900 font-semibold">
                            {pg.occupiedRooms}/{pg.totalRooms}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-900 font-semibold">{pg.monthlyRent}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          pg.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : pg.status === 'under-maintenance'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          <span className={`w-2 h-2 rounded-full mr-2 ${
                            pg.status === 'active' ? 'bg-green-500' : pg.status === 'under-maintenance'
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`} />
                          {pg.status === 'active' ? 'Active' : pg.status === 'under-maintenance'
                            ? 'Under Maintenance'
                            : 'Closed'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openMediaDialog(pg.id)}
                            className="flex items-center gap-2"
                          >
                            <Upload className="w-4 h-4" />
                            Upload
                          </Button>
                          {(pg.media.images.length > 0 || pg.media.videos.length > 0) ? (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openViewMediaDialog(pg.id)}
                                className="flex items-center gap-2 bg-blue-50 border-blue-200 hover:bg-blue-100"
                              >
                                <Eye className="w-4 h-4" />
                                View
                              </Button>
                              <div className="text-xs text-gray-600 space-y-0.5">
                                {pg.media.images.length > 0 && (
                                  <div className="flex items-center gap-1">
                                    <ImageIcon className="w-3 h-3" />
                                    <span>{pg.media.images.length}/5 images</span>
                                  </div>
                                )}
                                {pg.media.videos.length > 0 && (
                                  <div className="flex items-center gap-1">
                                    <Video className="w-3 h-3" />
                                    <span>{pg.media.videos.length}/2 videos</span>
                                  </div>
                                )}
                              </div>
                            </>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openViewMediaDialog(pg.id)}
                              className="flex items-center gap-2 bg-gray-50 border-gray-200 hover:bg-gray-100"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>,
                    // Expanded Details Row
                    expandedRows.includes(pg.id) && (
                      <tr key={`pg-expanded-${pg.id}`} className="bg-blue-50/30 border-b border-gray-100">
                        <td colSpan={9} className="py-4 px-4">
                          <div className="max-w-4xl">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">PG Name</p>
                                <p className="text-gray-900">{pg.name}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Full Address</p>
                                <p className="text-gray-900">{pg.location}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Property Owner</p>
                                <p className="text-gray-900">{pg.owner}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Property Manager</p>
                                <p className="text-gray-900">{pg.manager}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Total Rooms</p>
                                <p className="text-gray-900">{pg.totalRooms} rooms</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Occupied Rooms</p>
                                <p className="text-gray-900">{pg.occupiedRooms} rooms</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Monthly Rent</p>
                                <p className="text-gray-900">{pg.monthlyRent}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Current Status</p>
                                <p className="text-gray-900">
                                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                    pg.status === 'active' 
                                      ? 'bg-green-100 text-green-800' 
                                      : pg.status === 'under-maintenance'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-red-100 text-red-800'
                                  }`}>
                                    <span className={`w-2 h-2 rounded-full mr-2 ${
                                      pg.status === 'active' ? 'bg-green-500' : pg.status === 'under-maintenance'
                                        ? 'bg-yellow-500'
                                        : 'bg-red-500'
                                    }`} />
                                    {pg.status === 'active' ? 'Active' : pg.status === 'under-maintenance'
                                      ? 'Under Maintenance'
                                      : 'Closed'}
                                  </span>
                                </p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Amenities</p>
                                <p className="text-gray-900">{pg.amenities.join(", ")}</p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  ])}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* View Media Dialog */}
      <Dialog open={viewMediaDialogOpen} onOpenChange={setViewMediaDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>View Media</DialogTitle>
            <DialogDescription>
              {selectedPgId && `Media for ${pgsData.find(pg => pg.id === selectedPgId)?.name}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {selectedPgId && (() => {
              const pg = pgsData.find(p => p.id === selectedPgId);
              if (!pg) return null;

              return (
                <>
                  {/* Images Section */}
                  {pg.media.images.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-gray-700" />
                        <h3 className="text-lg font-semibold text-gray-900">
                          Images ({pg.media.images.length})
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {pg.media.images.map((file, index) => (
                          <div key={index} className="relative border rounded-lg p-2 bg-gray-50 cursor-pointer hover:shadow-lg transition-shadow">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`PG Image ${index + 1}`}
                              className="w-full h-48 object-cover rounded cursor-pointer"
                              onClick={() => openImageViewer(pg.media.images, index)}
                            />
                            <p className="text-xs text-gray-600 mt-2 truncate">{file.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Videos Section */}
                  {pg.media.videos.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Video className="w-5 h-5 text-gray-700" />
                        <h3 className="text-lg font-semibold text-gray-900">
                          Videos ({pg.media.videos.length})
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {pg.media.videos.map((file, index) => (
                          <div key={index} className="relative border rounded-lg p-4 bg-gray-50">
                            <video
                              src={URL.createObjectURL(file)}
                              controls
                              className="w-full h-64 rounded bg-black"
                            />
                            <div className="mt-2">
                              <p className="text-sm font-medium truncate">{file.name}</p>
                              <p className="text-xs text-gray-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* No Media Message */}
                  {pg.media.images.length === 0 && pg.media.videos.length === 0 && (
                    <div className="text-center py-12">
                      <div className="flex justify-center mb-4">
                        <div className="p-4 bg-gray-100 rounded-full">
                          <ImageIcon className="w-12 h-12 text-gray-400" />
                        </div>
                      </div>
                      <p className="text-gray-600">No media uploaded for this PG yet.</p>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
          <DialogFooter>
            <Button onClick={closeViewMediaDialog}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Media Upload Dialog */}
      <Dialog open={mediaDialogOpen} onOpenChange={setMediaDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Upload Media</DialogTitle>
            <DialogDescription>
              Upload up to 5 images and 2 videos for the PG property.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Images Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Images (Max 5)</Label>
                <span className="text-sm text-gray-600">{tempImages.length}/5</span>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="flex flex-col items-center gap-2">
                  <ImageIcon className="w-10 h-10 text-gray-400" />
                  <p className="text-sm text-gray-600">Click to upload images</p>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    disabled={tempImages.length >= 5}
                    className="max-w-xs"
                  />
                </div>
              </div>
              {tempImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {tempImages.map((file, index) => (
                    <div key={index} className="relative border rounded-lg p-2">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <p className="text-xs text-gray-600 mt-1 truncate">{file.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Videos Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Videos (Max 2)</Label>
                <span className="text-sm text-gray-600">{tempVideos.length}/2</span>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="flex flex-col items-center gap-2">
                  <Video className="w-10 h-10 text-gray-400" />
                  <p className="text-sm text-gray-600">Click to upload videos</p>
                  <Input
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={handleVideoUpload}
                    disabled={tempVideos.length >= 2}
                    className="max-w-xs"
                  />
                </div>
              </div>
              {tempVideos.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tempVideos.map((file, index) => (
                    <div key={index} className="relative border rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <Video className="w-8 h-8 text-blue-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-gray-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <button
                          onClick={() => removeVideo(index)}
                          className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeMediaDialog}>
              Cancel
            </Button>
            <Button onClick={handleMediaUpload}>
              Upload Media
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add PG Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New PG</DialogTitle>
            <DialogDescription>
              Enter the details of the new PG property to add it to the system.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pg-name">PG Name</Label>
                <Input
                  id="pg-name"
                  placeholder="Enter PG name"
                  value={formData.name}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Enter location"
                  value={formData.location}
                  onChange={(e) => handleFormChange("location", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="owner">Owner</Label>
                <Input
                  id="owner"
                  placeholder="Enter owner name"
                  value={formData.owner}
                  onChange={(e) => handleFormChange("owner", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manager">Manager</Label>
                <Input
                  id="manager"
                  placeholder="Enter manager name"
                  value={formData.manager}
                  onChange={(e) => handleFormChange("manager", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="total-rooms">Total Rooms</Label>
                <Input
                  id="total-rooms"
                  type="number"
                  placeholder="Enter total rooms"
                  value={formData.totalRooms}
                  onChange={(e) => handleFormChange("totalRooms", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthly-rent">Monthly Rent</Label>
                <Input
                  id="monthly-rent"
                  placeholder="e.g., ₹8,000"
                  value={formData.monthlyRent}
                  onChange={(e) => handleFormChange("monthlyRent", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amenities">Amenities</Label>
              <Input
                id="amenities"
                placeholder="Enter amenities (comma separated)"
                value={formData.amenities}
                onChange={(e) => handleFormChange("amenities", e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitAddPG}>Add PG</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit PG Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit PG</DialogTitle>
            <DialogDescription>
              Update the details of the selected PG property.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pg-name">PG Name</Label>
                <Input
                  id="pg-name"
                  placeholder="Enter PG name"
                  value={formData.name}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Enter location"
                  value={formData.location}
                  onChange={(e) => handleFormChange("location", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="owner">Owner</Label>
                <Input
                  id="owner"
                  placeholder="Enter owner name"
                  value={formData.owner}
                  onChange={(e) => handleFormChange("owner", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manager">Manager</Label>
                <Input
                  id="manager"
                  placeholder="Enter manager name"
                  value={formData.manager}
                  onChange={(e) => handleFormChange("manager", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="total-rooms">Total Rooms</Label>
                <Input
                  id="total-rooms"
                  type="number"
                  placeholder="Enter total rooms"
                  value={formData.totalRooms}
                  onChange={(e) => handleFormChange("totalRooms", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthly-rent">Monthly Rent</Label>
                <Input
                  id="monthly-rent"
                  placeholder="e.g., ₹8,000"
                  value={formData.monthlyRent}
                  onChange={(e) => handleFormChange("monthlyRent", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amenities">Amenities</Label>
              <Input
                id="amenities"
                placeholder="Enter amenities (comma separated)"
                value={formData.amenities}
                onChange={(e) => handleFormChange("amenities", e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button onClick={handleSubmitEditPG}>Update PG</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Viewer Dialog */}
      <Dialog open={imageViewerOpen} onOpenChange={setImageViewerOpen}>
        <DialogContent className="max-w-5xl p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>
              Image {currentImageIndex + 1} of {currentImages.length}
            </DialogTitle>
          </DialogHeader>
          <div className="relative p-6">
            {currentImages.length > 0 && (
              <>
                <div className="flex items-center justify-center bg-black rounded-lg overflow-hidden">
                  <img
                    src={URL.createObjectURL(currentImages[currentImageIndex])}
                    alt={`PG Image ${currentImageIndex + 1}`}
                    className="max-h-[70vh] w-auto object-contain"
                  />
                </div>
                
                {/* Navigation Buttons */}
                {currentImages.length > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <Button
                      onClick={prevImage}
                      disabled={currentImageIndex === 0}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </Button>
                    <span className="text-sm text-gray-600">
                      {currentImageIndex + 1} / {currentImages.length}
                    </span>
                    <Button
                      onClick={nextImage}
                      disabled={currentImageIndex === currentImages.length - 1}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                
                {/* Image Info */}
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">{currentImages[currentImageIndex].name}</p>
                </div>
              </>
            )}
          </div>
          <DialogFooter className="px-6 pb-6">
            <Button onClick={closeImageViewer}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}