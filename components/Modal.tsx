import React, { useEffect } from "react";
import ReactModal from "react-modal";

import { styled } from "@styles/theme";

import { Flex } from "./Box";
import { H1 } from "./Text";

type Props = {
  title: string;
  minHeight?: number;
} & ReactModal["props"];

const CloseIcon = styled.button`
  position: absolute;
  top: 20px;
  right: 22px;

  cursor: pointer;
  border: none;
  outline: none;
  background: none;
`;

const Modal: React.FC<Props> = ({
  children,
  title,
  minHeight = 520,
  onRequestClose,
  ...props
}) => {
  useEffect(() => {
    ReactModal.setAppElement("#__next");
  }, []);

  return (
    <ReactModal
      {...props}
      style={{
        content: {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "none",
          borderRadius: 12,
          padding: 0,
          maxWidth: 700,
          width: "100%",
          maxHeight: "unset",
          minHeight,
          position: "relative",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        },
      }}
    >
      <CloseIcon onClick={onRequestClose}>
        <img src="/icons/close.svg" />
      </CloseIcon>
      <Flex justifyContent="center">
        <H1
          fontSize="28px"
          mt={7}
          mb={10}
          fontWeight="500"
          letterSpacing="-0.5px"
        >
          {title}
        </H1>
      </Flex>
      {children}
    </ReactModal>
  );
};

export default Modal;
