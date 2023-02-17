import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef } from "react";
import { Formik } from "formik";
import { styles } from "./styles";
import { auth } from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";

export default function SignupScreen({ navigation }) {
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  //sign up işleminden sonra logine yönlendirme yapılacak
  function handleSignUp(values) {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        console.log("==========", userCredential.user);
        dispatch(setUser(userCredential.user.providerData[0]));
        navigation.reset({
          index: 0,
          routes: [{ name: "HomeScreen" }],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    /*<SafeAreaView>*/
    <Formik
      initialValues={{ email: "", password: "" }}
      validateOnMount={true}
      onSubmit={(values) => handleSignUp(values)}
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
        <View style={styles.container}>
          <Text style={styles.signupText}>Sign Up</Text>
          <View style={styles.textInputContainer}>
            <Text style={styles.labelText}>Email</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType={"email-address"}
              ref={emailRef}
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordRef.current.focus();
              }}
              blurOnSubmit={false}
            />
            <Text style={styles.labelText}>Password</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry={true}
              ref={passwordRef}
            />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                {isChecked ? (
                  <Ionicons
                    style={{ marginLeft: 30 }}
                    name="checkbox"
                    size={23}
                    color="#0099ff"
                  />
                ) : (
                  <Ionicons
                    style={{ marginLeft: 30 }}
                    name="square-outline"
                    size={23}
                    color="gray"
                  />
                )}
              </TouchableOpacity>

              <Text style={styles.agreeText}>I agree to the</Text>
              <Text style={styles.termsText}> Terms of Service</Text>
            </View>

            <TouchableOpacity
              style={styles.signUpButton}
              onPress={handleSubmit}
            >
              <Text style={styles.singUpButtonText}>Create my account</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                marginTop: 15,
              }}
            >
              <Text>Already have an account?</Text>
              <TouchableOpacity
                onPress={() => navigation.replace("LoginScreen")}
              >
                <Text style={{ color: "#0099ff", fontWeight: "bold" }}>
                  {" "}
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Formik>
    /*</SafeAreaView>*/
  );
}
