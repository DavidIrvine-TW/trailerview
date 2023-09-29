import React from "react";
import Pagination from "@mui/material/Pagination";

const paginationComponent = ({ totalPages, setPage, page }) => {
  const pageNumber = totalPages > 500 ? '500' : totalPages
  const handlePageChange = (event, value) => {
    setPage(value);
    console.log(value)
    scrollToTop();
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-center items-center justify-center mt-[2rem] bg-background py-4">
      <Pagination
        color="primary"
        count={pageNumber}
        variant="outlined"
        shape="rounded"
        hidePrevButton
        hideNextButton
        size="large"
        onChange={handlePageChange}
        boundaryCount={1}
        page={page}
        sx={{
          '& .MuiPaginationItem-root': {
            fontSize: '1.25rem',
            color: '#e0e0e0', // Set text color for non-selected pages
          },
          '& .MuiPaginationItem-page.Mui-selected': {
            backgroundColor: '#fafafa',
            color: '#FC4747', // Set text color for selected page
          },
        }}
      />
    </div>
  );
};

export default paginationComponent;
