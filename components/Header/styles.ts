import { styled } from "@styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  height: 72px;
  background: ${(p) => p.theme.colors.blue.primary};
  display: flex;
  align-items: center;
  padding: 16px 80px;
  color: ${(p) => p.theme.colors.white};
  justify-content: space-between;
  font-size: 14px;

  div {
    > button {
      background: none;
      border: none;
      outline: none;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${(p) => p.theme.colors.white};
      cursor: pointer;
      position: relative;

      span {
        margin-right: 4px;
        margin-top: 2px;
      }
    }
  }
`;
