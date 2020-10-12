import React, { useState } from "react";

import { Wrapper } from "./styles";

import useAuth from "@hooks/useAuth";
import Dropdown from "@components/Dropdown";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [showOptions, setShowOptions] = useState(false);

  const toggleShowOptions = () => {
    setShowOptions(!showOptions);
  };

  const onClickOutsideDropdown = (e: MouseEvent) => {
    const path = e.composedPath();
    for (const el of path) {
      if ((el as HTMLElement).id === "show-options") {
        return;
      }
    }
    setShowOptions(false);
  };

  return (
    <Wrapper>
      <img src="/images/logo-white.png" />
      <div>
        <button id="show-options" onClick={toggleShowOptions}>
          <span>
            Bem-vindo, <b>{user?.name}</b>
          </span>
          <img src="/icons/arrow-down.svg" />
        </button>
        <Dropdown
          style={{
            width: 110,
            right: 80,
            marginTop: 8,
          }}
          onClickOutside={onClickOutsideDropdown}
          showOptions={showOptions}
          options={[
            { label: "Meu perfil", disabled: true },
            { label: "Logout", onClick: logout },
          ]}
        />
      </div>
    </Wrapper>
  );
};

export default Header;
