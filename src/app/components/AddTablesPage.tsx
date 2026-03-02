import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Plus, Trash2, Key, Link2, Download } from "lucide-react";
import { useState } from "react";
import { useTables, TableAttribute, TableDefinition } from "../contexts/TablesContext";
import { toast } from "sonner";

const DATA_TYPES = [
  "VARCHAR(255)",
  "TEXT",
  "INTEGER",
  "BIGINT",
  "DECIMAL",
  "FLOAT",
  "BOOLEAN",
  "DATE",
  "DATETIME",
  "TIMESTAMP",
  "JSON",
  "UUID",
];

export function AddTablesPage() {
  const { tables, addTable, deleteTable: deleteTableFromContext } = useTables();
  const [currentTable, setCurrentTable] = useState<TableDefinition>({
    id: "",
    tableName: "",
    attributes: [],
    description: "",
  });

  const addAttribute = () => {
    const newAttribute: TableAttribute = {
      id: `attr-${Date.now()}`,
      columnName: "",
      dataType: "VARCHAR(255)",
      isPrimaryKey: false,
      isRequired: false,
      isUnique: false,
      defaultValue: "",
      relation: "",
    };
    setCurrentTable({
      ...currentTable,
      attributes: [...currentTable.attributes, newAttribute],
    });
  };

  const updateAttribute = (id: string, field: keyof TableAttribute, value: any) => {
    setCurrentTable({
      ...currentTable,
      attributes: currentTable.attributes.map((attr) =>
        attr.id === id ? { ...attr, [field]: value } : attr
      ),
    });
  };

  const deleteAttribute = (id: string) => {
    setCurrentTable({
      ...currentTable,
      attributes: currentTable.attributes.filter((attr) => attr.id !== id),
    });
  };

  const saveTable = () => {
    if (currentTable.tableName.trim() && currentTable.attributes.length > 0) {
      const tableToSave = {
        ...currentTable,
        id: `table-${Date.now()}`,
      };
      
      // Generate Prisma schema for this table
      const prismaSchema = generatePrismaSchema(tableToSave);
      
      addTable(tableToSave);
      
      // Show success message with schema preview
      toast.success("Table saved successfully!", {
        description: "Prisma schema generated and ready for download",
      });
      
      setCurrentTable({
        id: "",
        tableName: "",
        attributes: [],
        description: "",
      });
    }
  };

  const generatePrismaSchema = (table: TableDefinition): string => {
    const modelName = capitalizeFirstLetter(table.tableName);
    let schema = `\nmodel ${modelName} {\n`;

    table.attributes.forEach((attr) => {
      const fieldName = attr.columnName;
      const fieldType = mapDataTypeToPrisma(attr.dataType);
      const isOptional = !attr.isRequired && !attr.isPrimaryKey ? "?" : "";
      const isPrimary = attr.isPrimaryKey ? " @id @default(autoincrement())" : "";
      const isUnique = attr.isUnique && !attr.isPrimaryKey ? " @unique" : "";
      const hasDefault = attr.defaultValue && !attr.isPrimaryKey ? ` @default(${formatDefaultValue(attr.defaultValue, fieldType)})` : "";

      schema += `  ${fieldName}${" ".repeat(Math.max(1, 20 - fieldName.length))}${fieldType}${isOptional}${isPrimary}${isUnique}${hasDefault}\n`;
    });

    schema += `}\n`;
    return schema;
  };

  const mapDataTypeToPrisma = (dataType: string): string => {
    const typeMap: { [key: string]: string } = {
      "VARCHAR(255)": "String",
      "TEXT": "String",
      "INTEGER": "Int",
      "BIGINT": "BigInt",
      "DECIMAL": "Decimal",
      "FLOAT": "Float",
      "BOOLEAN": "Boolean",
      "DATE": "DateTime",
      "DATETIME": "DateTime",
      "TIMESTAMP": "DateTime",
      "JSON": "Json",
      "UUID": "String",
    };
    return typeMap[dataType] || "String";
  };

  const formatDefaultValue = (value: string, type: string): string => {
    if (type === "String") return `"${value}"`;
    if (type === "Boolean") return value.toLowerCase();
    if (type === "DateTime") return value === "now()" ? "now()" : `"${value}"`;
    return value;
  };

  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const downloadPrismaSchema = () => {
    if (tables.length === 0) {
      toast.error("No tables to export");
      return;
    }

    let fullSchema = `// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// User-generated tables
`;

    tables.forEach((table) => {
      fullSchema += generatePrismaSchema(table);
    });

    // Create and download file
    const blob = new Blob([fullSchema], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "schema.prisma";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("Prisma schema downloaded!");
  };

  const deleteTable = (id: string) => {
    deleteTableFromContext(id);
  };

  const hasPrimaryKey = currentTable.attributes.some((attr) => attr.isPrimaryKey);

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Add Tables</h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Create custom database tables with attributes, relations, and constraints
          </p>
        </div>
        {tables.length > 0 && (
          <Button
            onClick={downloadPrismaSchema}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Prisma Schema
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Create New Table Form */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Create New Table</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Table Name and Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="table-name">Table Name *</Label>
                <Input
                  id="table-name"
                  placeholder="e.g., vendors, products, orders"
                  value={currentTable.tableName}
                  onChange={(e) =>
                    setCurrentTable({ ...currentTable, tableName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="table-description">Description</Label>
                <Input
                  id="table-description"
                  placeholder="Brief description of the table"
                  value={currentTable.description}
                  onChange={(e) =>
                    setCurrentTable({ ...currentTable, description: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Attributes Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">Attributes / Columns</Label>
                <Button onClick={addAttribute} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Attribute
                </Button>
              </div>

              {currentTable.attributes.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                  <p className="text-gray-500">No attributes added yet</p>
                  <p className="text-sm text-gray-400 mt-1">Click "Add Attribute" to get started</p>
                </div>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">
                            Column Name *
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">
                            Data Type *
                          </th>
                          <th className="px-3 py-2 text-center text-xs font-medium text-gray-700">
                            <div className="flex items-center justify-center gap-1">
                              <Key className="w-3 h-3" />
                              Primary
                            </div>
                          </th>
                          <th className="px-3 py-2 text-center text-xs font-medium text-gray-700">
                            Required
                          </th>
                          <th className="px-3 py-2 text-center text-xs font-medium text-gray-700">
                            Unique
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">
                            Default Value
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">
                            <div className="flex items-center gap-1">
                              <Link2 className="w-3 h-3" />
                              Relation
                            </div>
                          </th>
                          <th className="px-3 py-2 text-center text-xs font-medium text-gray-700">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentTable.attributes.map((attr) => (
                          <tr key={attr.id} className="hover:bg-gray-50">
                            <td className="px-3 py-2">
                              <Input
                                placeholder="column_name"
                                value={attr.columnName}
                                onChange={(e) =>
                                  updateAttribute(attr.id, "columnName", e.target.value)
                                }
                                className="h-8 text-sm"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <Select
                                value={attr.dataType}
                                onValueChange={(value) =>
                                  updateAttribute(attr.id, "dataType", value)
                                }
                              >
                                <SelectTrigger className="h-8 text-sm" size="sm">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {DATA_TYPES.map((type) => (
                                    <SelectItem key={type} value={type}>
                                      {type}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="px-3 py-2 text-center">
                              <div className="flex justify-center">
                                <Checkbox
                                  checked={attr.isPrimaryKey}
                                  onCheckedChange={(checked) =>
                                    updateAttribute(attr.id, "isPrimaryKey", checked)
                                  }
                                />
                              </div>
                            </td>
                            <td className="px-3 py-2 text-center">
                              <div className="flex justify-center">
                                <Checkbox
                                  checked={attr.isRequired}
                                  onCheckedChange={(checked) =>
                                    updateAttribute(attr.id, "isRequired", checked)
                                  }
                                />
                              </div>
                            </td>
                            <td className="px-3 py-2 text-center">
                              <div className="flex justify-center">
                                <Checkbox
                                  checked={attr.isUnique}
                                  onCheckedChange={(checked) =>
                                    updateAttribute(attr.id, "isUnique", checked)
                                  }
                                />
                              </div>
                            </td>
                            <td className="px-3 py-2">
                              <Input
                                placeholder="NULL"
                                value={attr.defaultValue}
                                onChange={(e) =>
                                  updateAttribute(attr.id, "defaultValue", e.target.value)
                                }
                                className="h-8 text-sm"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <Input
                                placeholder="table.column"
                                value={attr.relation}
                                onChange={(e) =>
                                  updateAttribute(attr.id, "relation", e.target.value)
                                }
                                className="h-8 text-sm"
                              />
                            </td>
                            <td className="px-3 py-2 text-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteAttribute(attr.id)}
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {!hasPrimaryKey && currentTable.attributes.length > 0 && (
                <div className="flex items-center gap-2 text-amber-600 text-sm">
                  <Key className="w-4 h-4" />
                  <span>Warning: No primary key defined. It's recommended to have at least one.</span>
                </div>
              )}
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
              <Button
                onClick={saveTable}
                disabled={!currentTable.tableName.trim() || currentTable.attributes.length === 0}
                className="min-w-[150px]"
              >
                Save Table
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Created Tables List */}
        {tables.length > 0 && (
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Created Tables ({tables.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tables.map((table) => (
                  <div
                    key={table.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg">{table.tableName}</h3>
                        {table.description && (
                          <p className="text-sm text-gray-600 mt-1">{table.description}</p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTable(table.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">
                        Attributes: {table.attributes.length}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {table.attributes.map((attr) => (
                          <div
                            key={attr.id}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-xs"
                          >
                            {attr.isPrimaryKey && <Key className="w-3 h-3" />}
                            <span className="font-medium">{attr.columnName}</span>
                            <span className="text-blue-600">({attr.dataType})</span>
                            {attr.relation && <Link2 className="w-3 h-3" />}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}