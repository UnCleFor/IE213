import React, { useRef, useState } from 'react';
import { Button, Table, message } from 'antd';
import Loading from '../LoadingComponent/Loading';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const TableComponent = (props) => {
  const {
    selectionType = 'checkbox',
    data = [],
    isLoading = false,
    columns = [],
    deleteAll, // This prop can be undefined to disable delete functionality
    exportFileName = 'data_export',
    exportSheetName = 'Sheet1',
    paginationConfig = {
      defaultPageSize: 10,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '50', '100'],
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
    },
    showDeleteAll = true, // New prop to control delete button visibility
    showExport = true // New prop to control export button visibility
  } = props;

  const [rowSeletedKeys, setRowSeletedKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(paginationConfig.defaultPageSize);
  const tableRef = useRef(null);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSeletedKeys(selectedRowKeys);
    },
    preserveSelectedRowKeys: true,
  };

  const handleDeleteAll = () => {
    deleteAll(rowSeletedKeys);
  };

  const exportToExcel = () => {
    try {
      const exportData = data.map(item => {
        const flatItem = {};

        const flatten = (obj, prefix = '') => {
          Object.entries(obj).forEach(([key, value]) => {
            const newKey = prefix ? `${prefix}.${key}` : key;

            if (['image', 'images', 'key', 'avatar', '__v', 'address', 'password'].some(word => newKey.toLowerCase().includes(word))) return;

            if (Array.isArray(value)) {
              flatItem[newKey] = value.join(', ');
            } else if (typeof value === 'object' && value !== null) {
              flatten(value, newKey);
            } else {
              flatItem[newKey] = value;
            }
          });
        };
        flatten(item);
        return flatItem;
      });
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(exportData);
      XLSX.utils.book_append_sheet(wb, ws, exportSheetName);
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `${exportFileName}.xlsx`);
      message.success('Xuất file Excel thành công!');
    } catch (error) {
      console.error('Lỗi khi xuất Excel:', error);
      message.error('Xuất file Excel thất bại!');
    }
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  return (
    <Loading isLoading={isLoading}>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        {(showExport || (showDeleteAll && deleteAll)) && (
          <div style={{ marginBottom: 16, display: 'flex', gap: '10px' }}>
            {showExport && (
              <Button type="primary" onClick={exportToExcel}>
                Export Excel
              </Button>
            )}
            {showDeleteAll && deleteAll && rowSeletedKeys.length > 0 && (
              <Button danger onClick={handleDeleteAll}>
                Xoá mục đã chọn
              </Button>
            )}
          </div>
        )}
        <Table
          {...props}
          ref={tableRef}
          rowSelection={deleteAll ? { // Only enable row selection if deleteAll is provided
            type: selectionType,
            ...rowSelection,
          } : undefined}
          columns={columns}
          dataSource={data}
          scroll={{ x: 'max-content' }}
          pagination={{
            ...paginationConfig,
            current: currentPage,
            pageSize: pageSize,
          }}
          onChange={handleTableChange}
        />
      </div>
    </Loading>
  );
};

export default TableComponent;