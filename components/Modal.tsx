import React, { useEffect } from "react";
import ReactModal from "react-modal";
import { Flex } from "./Box";
import { H1 } from "./Text";

type Props = {
  title: string;
} & ReactModal["props"];

const Modal: React.FC<Props> = ({ children, title, ...props }) => {
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
          maxWidth: 800,
          width: "100%",
          maxHeight: "unset",
          minHeight: 544,
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        },
      }}
    >
      <Flex justifyContent="center">
        <H1
          fontSize="34px"
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
