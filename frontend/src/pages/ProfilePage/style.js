import styled from "styled-components";
import { Upload } from "antd";

export const WrapperLabel = styled.label`
    color: black;
    font-size: 13px;
    line-height: 30px;
    font-weight: 600;
    width: 100px
`
export const WrapperInput = styled.div`
    display: flex;
    align-items: center;
    gap: 10px 
`
export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        height: 30px; 
        width: 60px;
        borderRadius: 50%
    }
    & .ant-upload-list-item.ant-upload-list-item-done {
        display: none
    }
`