import React, { useState } from 'react'
import { Button, Divider, Radio, Table } from 'antd';
import Loading from '../LoadingComponent/Loading';

const TableComponent = (props) => {
  //console.log('props in TableComponent:', props);  // In toàn bộ props để kiểm tra handleDeleteManyProducts
  const { selectionType = 'checkbox', data = [], isLoading = false, columns = [],deleteAll } = props
  const [rowSeletedKeys, setRowSeletedKeys] = useState([]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSeletedKeys(selectedRowKeys)
      console.log(`selectedRowKeys: ${selectedRowKeys}`);
    },
    // getCheckboxProps: (record) => ({
    //     disabled: record.name === 'Disabled User',
    //     // Column configuration not to be checked
    //     name: record.name,
    // }),
  };
  const handleDeleteAll = () => {
    // console.log('handle',handleDeleteManyProducts)
    deleteAll(rowSeletedKeys)
  }
  return (
    <Loading isLoading={isLoading}>
      <div
        style={{
          width: '100%',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch', // giúp cuộn mượt trên iOS
        }}
      >
      {rowSeletedKeys.length > 0 && (
         <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Button danger onClick={handleDeleteAll}>
          Xoá mục đã chọn
        </Button>
      </div>
      )}
       
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
          scroll={{ x: 'max-content' }} // auto scroll ngang khi bảng quá rộng
          pagination={false}
          {...props}
        />
      </div>
    </Loading>
  );
};

export default TableComponent
