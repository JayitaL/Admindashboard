import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Plus, Table, Trash2 } from "lucide-react";
import { useState } from "react";

export function AddTablesPage() {
  const [customTables, setCustomTables] = useState<string[]>([]);
  const [tableName, setTableName] = useState("");

  const handleAddTable = () => {
    if (tableName.trim()) {
      setCustomTables([...customTables, tableName.trim()]);
      setTableName("");
    }
  };

  const handleDeleteTable = (index: number) => {
    setCustomTables(customTables.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Add Tables</h1>
        <p className="text-sm md:text-base text-gray-600 mt-2">Create custom tables for your data management</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add New Table Form */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Create New Table</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="table-name">Table Name</Label>
                <Input
                  id="table-name"
                  placeholder="e.g., Vendors, Suppliers, etc."
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleAddTable();
                    }
                  }}
                />
              </div>
              <Button onClick={handleAddTable} className="w-full" disabled={!tableName.trim()}>
                <Plus className="w-4 h-4 mr-2" />
                Add Table
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Created Tables List */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Created Tables</CardTitle>
          </CardHeader>
          <CardContent>
            {customTables.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Table className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No custom tables created yet</p>
                <p className="text-sm mt-1">Add a table name to get started</p>
              </div>
            ) : (
              <div className="space-y-2">
                {customTables.map((table, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded">
                        <Table className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-900">{table}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteTable(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card className="border-gray-200 mt-6">
        <CardHeader>
          <CardTitle>Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Enter a table name and click "Add Table" to create a new custom table</p>
            <p>• Created tables will appear under the "Users" section in the sidebar</p>
            <p>• You can delete tables by clicking the trash icon</p>
            <p>• Each table can be configured with custom columns and data fields</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
