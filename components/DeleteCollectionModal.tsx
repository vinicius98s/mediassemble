import styled from "@emotion/styled";
import React, { useState } from "react";

import { Flex } from "./Box";
import Button from "./Button";
import Modal from "./Modal";
import { Text } from "./Text";

const DeleteTextWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  span {
    max-width: 528px;
  }
`;

const DeleteCollectionModal: React.FC = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  return (
    <Modal
      isOpen={isDeleteModalOpen}
      onRequestClose={() => setIsDeleteModalOpen(false)}
      minHeight={480}
      title="Deletar coleção?"
    >
      <DeleteTextWrapper>
        <Text fontSize="20px" fontWeight="400" lineHeight="30px">
          Tem certeza que deseja deletar a coleção <b>Escola</b>?
          <br />
          <br />
          Essa ação é permanente e <b>não pode ser restaurada!</b>
        </Text>
        <Flex mt="96px">
          <Button mr={4} onClick={() => setIsDeleteModalOpen(false)}>
            CANCELAR
          </Button>
          <Button variant="danger">DELETAR</Button>
        </Flex>
      </DeleteTextWrapper>
    </Modal>
  );
};

export default DeleteCollectionModal;
