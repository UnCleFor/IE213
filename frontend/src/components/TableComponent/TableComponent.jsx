import React from 'react'
import { Divider, Radio, Table } from 'antd';
import Loading from '../LoadingComponent/Loading';

const TableComponent = (props) => {
    const { selectionType = 'checkbox', data = [], isLoading = false, columns=[] } = props


    // const columns = [
    //     {
    //         title: 'Name',
    //         dataIndex: 'name',
    //         render: (text) => <a>{text}</a>,
    //     },
    //     {
    //         title: 'Price',
    //         dataIndex: 'price',
    //     },
    //     {
    //         title: 'Type',
    //         dataIndex: 'type',
    //     },
    //     {
    //         title: 'Action',
    //         dataIndex: 'action',
    //         render:(text) => <a>{text}</a>
    //     },
    // ];
    // const data = products?.map((product) => ({
    //     ...product,
    //     key: product._id
    // }))
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };
    return (
        <Loading isLoading={isLoading}>
        <Table
            rowSelection={{
                type: selectionType,
                ...rowSelection,
            }}
            columns={columns}
            dataSource={data}
            {...props}
        />
        </Loading>
    )
}

export default TableComponent
