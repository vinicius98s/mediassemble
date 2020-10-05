import React, { useState } from "react";

import { theme, styled } from "@styles/theme";
import { Box, Flex } from "./Box";
import { Text } from "./Text";
import Button from "./Button";

interface Props {
  onChangeColor?: (color: string) => void;
}

const colors = [
  {
    name: "green",
    hex: theme.colors.collections.green,
  },
  {
    name: "yellow",
    hex: theme.colors.collections.yellow,
  },
  {
    name: "blue",
    hex: theme.colors.collections.blue,
  },
  {
    name: "purple",
    hex: theme.colors.collections.purple,
  },
  {
    name: "orange",
    hex: theme.colors.collections.orange,
  },
  {
    name: "red",
    hex: theme.colors.collections.red,
  },
];

const Color = styled.button<{ background: string; selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => p.background};
  border-radius: 50%;
  outline: none;
  width: 40px;
  height: 40px;
  border: ${(p) => (p.selected ? "2px solid #D1E8FF" : "none")};
  margin-right: ${(p) => p.theme.space[6]}px;
  cursor: pointer;
`;

const ColorPicker: React.FC<Props> = () => {
  const [selectedColor, setSelectedColor] = useState("green");

  return (
    <Box>
      <Text
        fontSize={12}
        lineHeight="15px"
        letterSpacing="0.15px"
        fontWeight="600"
        mb={3}
        textAlign="left"
      >
        Escolha sua cor
      </Text>
      <Flex>
        {colors.map((color) => (
          <Color
            key={color.hex}
            background={color.hex}
            selected={selectedColor === color.name}
            onClick={() => setSelectedColor(color.name)}
          >
            {selectedColor === color.name && <img src="/icons/check.svg" />}
          </Color>
        ))}
      </Flex>
      <Flex justifyContent="center" mt="80px">
        <Button>SALVAR COLEÇÃO</Button>
      </Flex>
    </Box>
  );
};

export default ColorPicker;
