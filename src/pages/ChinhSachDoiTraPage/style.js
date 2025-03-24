import styled from "styled-components";

export const PolicyContainer = styled.div`
  max-width: 900px;
  margin: 50px auto;
  padding: 30px;
  background: #fff;
  color: #222;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 10px;
  color: #333;
`;

export const Content = styled.div`
  font-size: 18px;
  line-height: 1.6;
  color: #444;

  p {
    margin-bottom: 10px;
  }

  strong {
    color: #000;
  }
`;
