import React, { createRef, CSSProperties } from "react";

import useClickOutsideElement from "@hooks/useClickOutsideElement";

import { styled } from "@styles/theme";

interface Props {
  showOptions?: boolean;
  onClickOutside?: (event: MouseEvent, ref?: HTMLElement | undefined) => void;
  style?: CSSProperties;
  options: Array<{
    label: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    disabled?: boolean;
  }>;
}

const Wrapper = styled.div`
  position: absolute;
  background: #ffffff;
  color: ${(p) => p.theme.colors.dark.primary};
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
`;

const Dropdown: React.FC<Props> = ({
  options,
  showOptions,
  onClickOutside,
  style,
}) => {
  const ref = createRef<HTMLDivElement>();

  if (onClickOutside) {
    useClickOutsideElement({ ref, onClickOutside }, [ref]);
  }

  if (showOptions) {
    return (
      <Wrapper ref={ref} style={{ ...style }}>
        <ul>
          {options.map(({ label, onClick, disabled }, i) => (
            <li key={i}>
              <button disabled={disabled} onClick={onClick}>
                {label}
              </button>
            </li>
          ))}
        </ul>
      </Wrapper>
    );
  }

  return null;
};

export default Dropdown;
