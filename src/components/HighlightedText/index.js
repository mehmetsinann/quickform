import React from "react";
import { Text } from "react-native";

export const HighlightedText = ({ text, searchTerm, style }) => {
  const lowerCaseText = text.toLowerCase();
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  const searchTermIndex = lowerCaseText.indexOf(lowerCaseSearchTerm[0]);

  if (searchTermIndex === -1) {
    // searchTerm is not found in text, return the original text
    return <Text style={style}>{text}</Text>;
  }

  const beforeTerm = text.substring(0, searchTermIndex);
  const term = text.substring(
    searchTermIndex,
    searchTermIndex + searchTerm.length
  );
  const afterTerm = text.substring(searchTermIndex + searchTerm.length);

  return (
    <Text style={style}>
      {beforeTerm}
      <Text style={{ backgroundColor: "yellow" }}>{term}</Text>
      {afterTerm}
    </Text>
  );
};
