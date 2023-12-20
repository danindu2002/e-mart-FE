import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

/**
 * Renders a customizable table with columns, data, and optional actions column.
 * *props used to customize the table
 * @data - Array of objects representing the data to be displayed in the table.
 * @columns - Array of column headers for the table.
 * @page - Current page number for pagination.
 * @rowsPerPage - Number of rows to display per page.
 * @count - Total count of data items for pagination calculation.
 * @onPageChange - Callback function triggered on page change.
 * @onRowsPerPageChange - Callback function triggered on rows per page change.
 * @renderActions - Optional callback function to render custom actions in the last column.
 */

interface DataTableProps {
  data: Array<Object>;
  columns: string[];
  page: number;
  rowsPerPage: number;
  count: number;
  noDataMessage?: string;
  onPageChange: (item: React.MouseEvent | null, newPage: number) => void;
  onRowsPerPageChange: (item: React.ChangeEvent) => void;
  renderActions?: (item: any) => JSX.Element;
}

export default function DataTable({
  data,
  columns,
  page,
  rowsPerPage,
  count,
  noDataMessage = "No Data Available",
  onPageChange,
  onRowsPerPageChange,
  renderActions,
}: DataTableProps) {
  return (
    <TableContainer
      component={Paper}
      sx={{ width: { xs: "90%", md: "100%" }, mt: "10px", boxShadow: "none" }}
    >
      <Table
        sx={{
          minWidth: 500,
          "& .MuiTableRow-root:hover": {
            backgroundColor: "#efeeed",
          },
        }}
      >
        <TableHead>
          <TableRow>
            {columns.map((header: any, index: any) => (
              <TableCell key={index} sx={{ fontWeight: "bold" }}>
                {header}
              </TableCell>
            ))}
            <TableCell sx={{ fontWeight: "bold" }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.length > 0 ? (
            data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item: any, index: any) => (
                <TableRow
                  key={index}
                  // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {Object.entries(item).map(([key, value]) => (
                    <TableCell key={key}>{<>{value}</>}</TableCell>
                  ))}
                  {renderActions ? (
                    <TableCell align="right">
                      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        {renderActions(item)}
                      </Box>
                    </TableCell>
                  ) : (
                    <TableCell align="right"></TableCell>
                  )}
                </TableRow>
              ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 1} align="center">
                {noDataMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </TableContainer>
  );
}
