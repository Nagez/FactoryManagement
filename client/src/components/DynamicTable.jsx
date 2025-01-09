import React from "react";
import "./DynamicTable.css";

const DynamicTable = ({ columns, data }) => {
  return (
    <div className="dynamic-table-container">
      <table className="dynamic-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {typeof column.render === "function"
                      ? column.render(row[column.key], row)
                      : row[column.key] instanceof Object // Check if it's a Link component
                      ? row[column.key] // If it's a React element (e.g., Link), just render it
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="no-data-message">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
