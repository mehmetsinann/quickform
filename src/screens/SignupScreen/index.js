import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef } from "react";
import { Formik } from "formik";
import { styles } from "./styles";
import { auth, db } from "../../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";

export default function SignupScreen({ navigation }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();

  function handleSignUp(values) {
    setIsLoading(true);
    auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(async (userCredential) => {
        const user = {
          name: userCredential.user.displayName,
          email: userCredential.user.email,
          photoURL: userCredential.user.photoURL,
          uid: userCredential.user.uid,
        };
        db.collection("users").doc(`${userCredential.user.uid}`).set(user);
        dispatch(setUser(user));
        setIsLoading(true);
        navigation.reset({
          index: 0,
          routes: [{ name: "HomeScreen" }],
        });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
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
              style={[
                styles.signUpButton,
                { backgroundColor: isLoading ? "#AEDC5D" : "#78BB07" },
              ]}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              {!isLoading ? (
                <Text style={styles.singUpButtonText}>Create my account</Text>
              ) : (
                <ActivityIndicator color={"white"} />
              )}
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
