import { styled } from "@styles/theme";

export const Wrapper = styled.div`
  display: grid;
  height: calc(100vh - 334px);
  grid-template-columns: 1.5fr 2fr;
  grid-column-gap: 32px;
`;

export const UploadInput = styled.button`
  max-width: 540px;
  box-shadow: 0px 1px 10px 2px rgba(0, 150, 199, 0.1);
  border-radius: 12px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%230096C7FF' opacity='0.3' stroke-width='4' stroke-dasharray='15%2c 15' stroke-dashoffset='82' stroke-linecap='square'/%3e%3c/svg%3e");
  cursor: pointer;
  transition: 0.3s;
  border: none;
  outline: none;
  background-color: transparent;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  :disabled {
    cursor: initial;
    filter: grayscale(100%);
  }

  img {
    width: 50%;
  }

  input[type="file"] {
    display: none;
  }

  :not(:disabled):hover {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%230096C7FF' opacity='1' stroke-width='4' stroke-dasharray='15%2c 15' stroke-dashoffset='82' stroke-linecap='square'/%3e%3c/svg%3e");
  }
`;
