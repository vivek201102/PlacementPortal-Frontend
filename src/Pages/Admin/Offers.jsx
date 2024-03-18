import { DataGrid } from "@mui/x-data-grid";
import React from "react"


const Offers = ({ offers }) => {
    const nestedColumns = [
        { field: 'company', headerName: 'Company', width: 150 },
        { field: 'amount', headerName: 'Amount', width: 150 },
        // Add more fields as needed
    ];

    return (
        <div style={{ height: 300, width: '100%' }}>
            <DataGrid
                rows={offers}
                columns={nestedColumns}
                pageSize={5}
            />
        </div>
    );
};

export default Offers