import React from "react";

import { styled } from "@styles/theme";

interface Props {
  name: string;
}

const Wrapper = styled.div`
  width: 100%;
  height: 72px;
  background: ${(p) => p.theme.colors.blue.primary};
  display: flex;
  align-items: center;
  padding: 16px 128px;
  color: ${(p) => p.theme.colors.white};
  justify-content: space-between;
  font-size: 14px;

  button {
    background: none;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    color: ${(p) => p.theme.colors.white};

    span {
      margin-right: 4px;
    }
  }
`;

const Header: React.FC<Props> = ({ name }) => {
  return (
    <Wrapper>
      <img src="/images/logo-white.png" />
      <button>
        <span>
          Bem-vindo, <b>{name}</b>
        </span>
        <i
          data-eva="arrow-down"
          data-eva-fill="#ffffff"
          data-eva-height="20"
          data-eva-width="20"
        />
      </button>
    </Wrapper>
  );
};

export default Header;
