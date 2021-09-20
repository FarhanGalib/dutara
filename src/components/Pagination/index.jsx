import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Pagination1 = ({ postsPerPage, totalPosts, paginate }) => {
    const [val, setVal] = useState(1);
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    const handleChange = (e, v) => {
        paginate(v);
        setVal(v);
    };
    return (
        // <nav>
        //   <ul className='pagination'>
        //     {pageNumbers.map(number => (
        //       <li key={number} className='page-item'>
        //         <p onClick={() => paginate(number)}  className='page-link'>
        //           {number}
        //         </p>
        //       </li>
        <Stack spacing={2}>
            <Pagination
                count={pageNumbers.length}
                page={val}
                onChange={handleChange}
                variant="outlined"
                color="primary"
                shape="rounded"
            />
            <br />
            <br />
        </Stack>
        //      ))}
        //    </ul>
        //  </nav>
    );
};

export default Pagination1;
