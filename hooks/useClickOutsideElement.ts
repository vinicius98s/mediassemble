import React from "react";
import { useEffect } from "react";

type Props = {
  ref: React.RefObject<HTMLElement> | React.RefObject<HTMLElement>[];
  onClickOutside: (event: MouseEvent, ref?: HTMLElement) => void;
};

const handleSingleReference = (
  event: MouseEvent,
  ref: React.RefObject<HTMLElement>,
  onClickOutside: Props["onClickOutside"]
): void => {
  if (ref.current && !ref.current.contains(event.target as Node)) {
    onClickOutside(event, ref.current);
  }
};

const handleMultipleReferences = (
  event: MouseEvent,
  refs: React.RefObject<HTMLElement>[],
  onClickOutside: Props["onClickOutside"]
): void => {
  const clickedOutsideAllElements = refs.every(
    (el) => !el.current?.contains(event.target as Node)
  );

  if (clickedOutsideAllElements) {
    onClickOutside(event);
  }
};

export default function useClickOutsideElement(
  { ref, onClickOutside }: Props,
  depsArray: React.DependencyList
): void {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (Array.isArray(ref)) {
        handleMultipleReferences(event, ref, onClickOutside);
      } else {
        handleSingleReference(event, ref, onClickOutside);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [...depsArray]);
}
