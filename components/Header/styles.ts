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

    > div {
      position: absolute;
      background: white;
      color: ${(p) => p.theme.colors.dark.primary};
      width: 110px;
      right: 80px;
      margin-top: 8px;
      border-radius: 4px;
      box-shadow: 0px 1px 10px -1px rgba(0, 0, 0, 0.08);
      padding: 2px;

      ul {
        list-style: none;

        li {
          button {
            cursor: pointer;
            border: none;
            outline: none;
            width: 100%;
            text-align: left;
            padding: 16px 8px;
            background: white;
            border-radius: 4px;
            font-weight: 500;

            :disabled {
              color: #adb5bd;
              cursor: initial;
            }

            :not(:disabled):hover {
              background: #dee2e6;
            }
          }
        }
      }
    }
  }
`;
