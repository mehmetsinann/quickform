import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Formik } from "formik";
import axios from "axios";
import { setUser } from "../../redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { styles } from "./styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();

  // console.log(token);
  function handleLogin(values) {
    signInWithEmailAndPassword(auth, values.email, values.password).then(
      (userCredential) => {
        console.log("==========", userCredential.user);
        dispatch(setUser(userCredential.user.providerData[0]));
        navigation.reset({
          index: 0,
          routes: [{ name: "HomeScreen" }],
        });
      }
    );
  }

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validateOnMount={true}
      onSubmit={(values) => {
        handleLogin(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
      }) => (
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Text style={styles.loginText}>Sign In </Text>
          <View style={styles.textInputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType={"email-address"}
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordRef.current.focus();
              }}
              ref={emailRef}
              blurOnSubmit={false}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry={true}
              ref={passwordRef}
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
              <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                marginTop: 15,
              }}
            >
              <Text>Don't you have an account yet?</Text>
              <TouchableOpacity
                onPress={() => navigation.replace("SignupScreen")}
              >
                <Text style={{ color: "#0099ff", fontWeight: "bold" }}>
                  {" "}
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
}
