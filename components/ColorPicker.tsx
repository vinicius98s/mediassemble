import React, { useEffect, useState } from "react";

import { theme, styled } from "@styles/theme";
import { Box, Flex } from "./Box";
import { Text } from "./Text";

type ColorNames = "green" | "yellow" | "blue" | "purple" | "orange" | "red";
type Color = {
  name: ColorNames;
  hex: string;
};

interface Props {
  onChangeColor?: (color: ColorNames) => void;
  selectedColorName?: ColorNames;
}

const colors: Color[] = [
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

const ColorButton = styled.button<{ background: string; selected: boolean }>`
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

export function useColor(
  defaultColor: ColorNames = "green",
  onChange?: (color: { name: string; hex: string }) => void
): [Color, React.Dispatch<React.SetStateAction<ColorNames>>] {
  const [selectedColor, setSelectedColor] = useState(defaultColor);

  useEffect(() => {
    onChange?.(colors.find((c) => c.name === selectedColor) as Color);
  }, [selectedColor]);

  return [
    colors.find((c) => c.name === selectedColor) as Color,
    setSelectedColor,
  ];
}

const ColorPicker: React.FC<Props> = ({
  selectedColorName = "green",
  onChangeColor,
}) => {
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
          <ColorButton
            key={color.hex}
            background={color.hex}
            selected={selectedColorName === color.name}
            onClick={() => onChangeColor?.(color.name)}
            type="button"
          >
            {selectedColorName === color.name && <img src="/icons/check.svg" />}
          </ColorButton>
        ))}
      </Flex>
    </Box>
  );
};

export default ColorPicker;
