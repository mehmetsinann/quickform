import React from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { AntDesign } from "@expo/vector-icons";

export const HeaderBar = ({
  title,
  rightButton,
  leftButton,
  isSearch,
  setIsSearch,
  searchValue,
  setSearchValue,
  backgroundColor,
}) => {
  const search = () => {
    return (
      <View style={styles.searchContainer}>
        <TextInput
          value={searchValue}
          onChange={setSearchValue}
          placeholder="search"
          style={{ paddingHorizontal: 10, width: "100%" }}
          autoFocus
        />
        <TouchableOpacity
          onPress={() => {
            setIsSearch(false);
            setSearchValue("");
          }}
          style={styles.closeSearch}
        >
          <AntDesign name="closecircle" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  const main = () => {
    return (
      <View style={[styles.mainContainer]}>
        {(leftButton && leftButton()) || <View style={{ width: 24 }}></View>}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {(rightButton && rightButton()) || <View style={{ width: 24 }}></View>}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: backgroundColor }]}
    >
      <View style={styles.innerContainer}>{isSearch ? search() : main()}</View>
    </SafeAreaView>
  );
};

export default HeaderBar;
