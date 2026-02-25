import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Building2, MapPin, Users } from "lucide-react";

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

export function PGsPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">PGs</h1>
        <p className="text-sm md:text-base text-gray-600 mt-2">Manage your paying guest properties</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
    </div>
  );
}