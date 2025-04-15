import React, { useEffect, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { Button, Modal, Form } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { getBase64 } from '../../utils'
import * as ProductService from '../../services/ProductService'
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from '../LoadingComponent/Loading'
import * as message from '../../components/Message/Message';

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stateProduct, setStateProduct] = useState({
    name: '',
    image: '',
    type: '',
    price: '',
    countInstock: '',
    description: ''
  })

  const mutation = useMutationHooks(
    (data) => {
      const { name, image, type, price, countInstock: countInStock, description } = data
      const res = ProductService.createProduct({ name, image, type, price, countInStock, description })
      return res
    }
  )

  const { data, isLoading, isSuccess, isError } = mutation

  useEffect(() => {
    if (isSuccess && data?.status === 'OK') {
      message.success()
      handleCancel()

    } else if (isError) {
      message.error()
    }
  }, [isSuccess])

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: '',
      image: '',
      type: '',
      price: '',
      countInstock: '',
      description: ''
    })
  };
  const onFinish = () => {
    mutation.mutate(stateProduct)
  }
  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value
    })
  }

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview
    })
  }
  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <div style={{ marginTop: '10px' }}>
        <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={() => setIsModalOpen(true)}><PlusOutlined style={{ fontSize: '60px' }} /></Button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <TableComponent />
      </div>
      <Modal title="Tạo sản phẩm mới" open={isModalOpen} onCancel={handleCancel} okText=''>
        <Loading isLoading={isLoading}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="Name"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <InputComponent value={stateProduct.name} onChange={handleOnchange} name="name" />
            </Form.Item>

            <Form.Item
              label="Type"
              name="Type"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <InputComponent value={stateProduct.type} onChange={handleOnchange} name="type" />
            </Form.Item>

            <Form.Item
              label="Price"
              name="Price"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <InputComponent value={stateProduct.price} onChange={handleOnchange} name="price" />
            </Form.Item>

            <Form.Item
              label="Count inStock"
              name="CountInStock"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <InputComponent value={stateProduct.countInstock} onChange={handleOnchange} name="countInstock" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="Description"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <InputComponent value={stateProduct.description} onChange={handleOnchange} name="description" />
            </Form.Item>

            <Form.Item
              label="Image"
              name="Image"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                <Button >Select File</Button>
                {stateProduct?.image && (
                  <img src={stateProduct?.image} style={{
                    height: '60px',
                    width: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginLeft: '10px'
                  }} alt="" />
                )}
              </WrapperUploadFile>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </Modal>
    </div>
  )
}

export default AdminProduct

