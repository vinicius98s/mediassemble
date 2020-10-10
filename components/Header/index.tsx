import React, { createRef, useState } from "react";

import { Wrapper } from "./styles";

import useAuth from "@hooks/useAuth";
import useClickOutsideElement from "@hooks/useClickOutsideElement";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [showOptions, setShowOptions] = useState(false);

  const optionsBoxRef = createRef<HTMLDivElement>();

  const toggleShowOptions = () => {
    setShowOptions(!showOptions);
  };

  useClickOutsideElement(
    {
      ref: optionsBoxRef,
      onClickOutside: (e) => {
        const path = e.composedPath();
        for (const el of path) {
          if ((el as HTMLElement).id === "show-options") {
            return;
          }
        }

        setShowOptions(false);
      },
    },
    [optionsBoxRef]
  );

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
        {showOptions && (
          <div ref={optionsBoxRef}>
            <ul>
              <li>
                <button disabled>Meu perfil</button>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Header;
