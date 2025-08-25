import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useFetchPokemons } from "@/app/lib/useFetchPokemons";
import { TableHead } from "@mui/material";
import { Pokemon } from "@/app/entities";
import { useEffect } from "react";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function CustomPaginationActionsTable({
  search,
  onSelect,
}: {
  search: string;
  onSelect: (pokemon: Pokemon) => void;
}) {
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(5);
  const [offset, setOffset] = React.useState(0);

  const { isLoading, pokemons, count } = useFetchPokemons({
    offset,
    limit,
    search,
  });

  useEffect(() => {
    setPage(0);
    setOffset(0);
  }, [search]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    setOffset(newPage * limit);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper style={{ width: "100%", height: "100%" }}>
      <TableContainer
        style={{
          maxHeight: "calc(100vh - 140px)",
        }}
      >
        <Table sx={{ minWidth: 500 }} stickyHeader aria-label="sticky table">
          <TableHead
            sx={{
              "& .MuiTableCell-head": {
                backgroundColor: "gray",
                color: "primary.contrastText",
                fontWeight: 600,
              },
            }}
          >
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nome</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={2}>
                  <div className="flex items-center justify-center p-5">
                    <p>Carregando dados...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {pokemons.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={2}>
                      <div className="flex items-center justify-center p-5">
                        <p>Nenhum dado encontrado!</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {pokemons.length > 0 &&
                  pokemons.map((row, index) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "rgba(0,0,0,0.04)",
                        },
                      }}
                      onClick={() => onSelect(row)}
                    >
                      <TableCell component="td" scope="row">
                        {index + 1 + offset}
                      </TableCell>

                      <TableCell component="td" scope="row">
                        {row.name}
                      </TableCell>
                    </TableRow>
                  ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 25]}
        count={count}
        rowsPerPage={limit}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
        labelRowsPerPage="Linhas por página"
        labelDisplayedRows={({ from, to, count }) => {
          return `${from}-${to} de ${count}`;
        }}
      />
    </Paper>
  );
}
