import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Wifi, Tv, AirVent, Utensils, Dumbbell, Car } from "lucide-react";

const existingAmenities = [
  { name: "WiFi", icon: Wifi, pgs: ["Sunrise PG", "Sunset Villa", "Green Haven"] },
  { name: "TV", icon: Tv, pgs: ["Sunrise PG", "Blue Sky Residency"] },
  { name: "AC", icon: AirVent, pgs: ["All PGs"] },
  { name: "Meals", icon: Utensils, pgs: ["Sunrise PG", "Green Haven"] },
  { name: "Gym", icon: Dumbbell, pgs: ["Blue Sky Residency"] },
  { name: "Parking", icon: Car, pgs: ["All PGs"] },
];

export function AddAmenitiesPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Add Amenities</h1>
        <p className="text-sm md:text-base text-gray-600 mt-2">Add and manage amenities for your PGs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Add New Amenity Form */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Add New Amenity</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amenity-name">Amenity Name</Label>
                <Input id="amenity-name" placeholder="e.g., Swimming Pool" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pg-select">Select PG</Label>
                <Select>
                  <SelectTrigger id="pg-select">
                    <SelectValue placeholder="Choose a PG" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All PGs</SelectItem>
                    <SelectItem value="sunrise">Sunrise PG</SelectItem>
                    <SelectItem value="sunset">Sunset Villa</SelectItem>
                    <SelectItem value="green">Green Haven</SelectItem>
                    <SelectItem value="blue">Blue Sky Residency</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Add details about this amenity..."
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full">
                Add Amenity
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Existing Amenities */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Existing Amenities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {existingAmenities.map((amenity, index) => {
                const Icon = amenity.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">{amenity.name}</h4>
                      <div className="flex flex-wrap gap-2">
                        {amenity.pgs.map((pg, pgIndex) => (
                          <Badge key={pgIndex} variant="secondary" className="text-xs">
                            {pg}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}