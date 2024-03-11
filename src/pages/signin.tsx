import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import TextField from "~/components/TextField";
import { ArrowRight, ChevronLeft } from "~/svgs";
import classNames from "~/utils/classNames";
import LoginCarousel from "~/components/LoginCarousel";
import { useDebounce } from "~/utils/useDebounce";
import { validateEmail } from "~/utils/validations";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useToast } from "~/components/shadcn/ui/use-toast";

export default function Signin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signInDisabled, setSignInDisabled] = useState(true);

  useEffect(() => {
    if (username.length >= 6 && password != "") setSignInDisabled(false);
    else setSignInDisabled(true);
  }, [username, password]);

  const [signInError, setSignInError] = useState("");
  const { toast } = useToast();
  useEffect(() => {
    if (signInError !== "") {
      toast({
        variant: "destructive",
        title: "Sign in error",
        description: signInError,
      });
      setSignInError("");
    }
  }, [signInError, toast]);

  const [newUsername, setNewUsername] = useState("");
  const [newUsernameErrorMessage, setNewUsernameErrorMessage] = useState("");
  const [newUsernameValid, setNewUsernameValid] = useState(false);
  const debouncedNewUsername = useDebounce(newUsername, 1000);
  const usernameCheck = api.credentials.findUsername.useQuery({
    username: debouncedNewUsername,
  });
  useEffect(() => {
    if (debouncedNewUsername === "") {
      setNewUsernameErrorMessage("");
      return setNewUsernameValid(true);
    }

    if (debouncedNewUsername.length >= 8 && debouncedNewUsername.length <= 16) {
      if (usernameCheck.data === null) {
        setNewUsernameErrorMessage("");
        return setNewUsernameValid(true);
      } else {
        setNewUsernameErrorMessage("Username is already taken");
        return setNewUsernameValid(false);
      }
    } else {
      setNewUsernameErrorMessage(
        "Username must be between 8 and 16 characters",
      );
      return setNewUsernameValid(false);
    }
  }, [debouncedNewUsername, usernameCheck.data]);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const debouncedEmail = useDebounce(email, 1000);
  const emailCheck = api.user.findEmail.useQuery({
    email: debouncedEmail,
  });
  useEffect(() => {
    if (debouncedEmail === "") {
      setEmailErrorMessage("");
      return setValidEmail(true);
    }
    if (validateEmail(debouncedEmail)) {
      if (emailCheck.data === null) {
        setEmailErrorMessage("");
        setValidEmail(true);
      } else {
        setEmailErrorMessage("Email is already in use");
        setValidEmail(false);
      }
    } else {
      debouncedEmail != "" && setValidEmail(false);
      setEmailErrorMessage("Please enter a valid email address");
    }
  }, [debouncedEmail, emailCheck.data]);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const debouncedNewPassword = useDebounce(newPassword, 500);
  const debouncedConfirmPassword = useDebounce(confirmPassword, 500);
  const [newPasswordLengthIsOk, setNewPasswordLengthIsOk] = useState(false);
  const [newPasswordContainsUpper, setNewPasswordContainsUpper] =
    useState(false);
  const [newPasswordContainsSpecial, setNewPasswordContainsSpecial] =
    useState(false);
  const [newPasswordMatchesConfirm, setNewPasswordMatchesConfirm] =
    useState(false);
  const [newPasswordIsValid, setNewPasswordIsValid] = useState(false);
  useEffect(() => {
    if (debouncedNewPassword === "") {
      setNewPasswordLengthIsOk(false);
      setNewPasswordContainsUpper(false);
      setNewPasswordContainsSpecial(false);
      setNewPasswordMatchesConfirm(false);
      return setNewPasswordIsValid(false);
    }
    let validLength, validUpper, validSpecial, validMatches;

    // Check if password is at least 8 characters
    if (debouncedNewPassword.length >= 8) {
      setNewPasswordLengthIsOk(true);
      validLength = true;
    } else {
      setNewPasswordLengthIsOk(false);
      validLength = false;
    }

    // Check if password contains an uppercase
    if (/[A-Z]/.test(debouncedNewPassword)) {
      setNewPasswordContainsUpper(true);
      validUpper = true;
    } else {
      setNewPasswordContainsUpper(false);
      validUpper = false;
    }

    // Check if password contains special character
    if (/(?=.*[!@#$%^&*])/.test(debouncedNewPassword)) {
      setNewPasswordContainsSpecial(true);
      validSpecial = true;
    } else {
      setNewPasswordContainsSpecial(false);
      validSpecial = false;
    }

    // Check if password matches confirm password
    if (debouncedNewPassword === debouncedConfirmPassword) {
      setNewPasswordMatchesConfirm(true);
      validMatches = true;
    } else {
      setNewPasswordMatchesConfirm(false);
      validMatches = false;
    }

    // If all of the above pass, then password is valid
    if (validLength && validUpper && validSpecial && validMatches)
      setNewPasswordIsValid(true);
    else setNewPasswordIsValid(false);
  }, [debouncedNewPassword, debouncedConfirmPassword]);

  const [createAccountDisabled, setCreateAccountDisabled] = useState(true);
  useEffect(() => {
    if (validEmail && newUsernameValid && newPasswordIsValid)
      setCreateAccountDisabled(false);
    else setCreateAccountDisabled(true);
  }, [validEmail, newPasswordIsValid, newUsernameValid]);
  const [registering, setRegistering] = useState(false);

  return (
    <>
      <div className="flex min-h-screen gap-8 bg-summit-100 px-8 py-6 font-sans">
        {!registering ? (
          <div className="flex flex-col gap-8 rounded-lg bg-white px-12 pb-8 pt-12">
            <div className="flex flex-col gap-6">
              <Image
                src="/logos/HorizontalTealEdited.svg"
                alt="Summit Logo"
                height={100}
                width={100}
              />
              <h1 className="text-xl font-semibold text-summit-700">
                Welcome to Summit
              </h1>
            </div>
            <div className="flex flex-col gap-4">
              <TextField
                input={username}
                setInput={setUsername}
                label={"Username"}
                className="w-72"
              />
              <div className="flex flex-col items-end gap-1">
                <TextField
                  input={password}
                  setInput={setPassword}
                  label={"Password"}
                  className="w-72"
                  password
                />
                <Link
                  href="/forgot-password"
                  className="text-xs text-summit-700 underline-offset-4 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <button
              className={classNames(
                "w-full rounded-lg py-2 text-center text-sm font-semibold",
                signInDisabled
                  ? "bg-gray-300 text-gray-500"
                  : "bg-summit-700 text-white hover:bg-summit-700/95",
              )}
              disabled={signInDisabled}
              onClick={() =>
                signIn("signin", {
                  username,
                  password,
                  redirect: false,
                }).then((res) => {
                  if (res?.ok) {
                    void router.push("/");
                  } else {
                    if (res?.error) {
                      setSignInError(
                        res.error || "There was an error signing in",
                      );
                      setPassword("");
                    }
                  }
                })
              }
            >
              Sign in
            </button>
            <div className="flex items-center gap-2">
              <div className="h-px w-full bg-gray-300" />
              <p className="text-xs text-gray-500">or</p>
              <div className="h-px w-full bg-gray-300" />
            </div>
            <button
              className="flex justify-center gap-3 rounded-lg border border-gray-300 p-2 text-sm font-semibold hover:border-gray-400"
              onClick={() =>
                signIn("google", { redirect: true, callbackUrl: "/" })
              }
            >
              <Image
                src="/svgs/Google.svg"
                alt="Google Logo"
                height={20}
                width={20}
              />
              Sign in with Google
            </button>
            <button
              className="flex items-center justify-center gap-1 text-xs text-gray-500 underline-offset-4 hover:text-summit-700 hover:underline"
              onClick={() => {
                setRegistering(true);
                setUsername("");
                setPassword("");
              }}
            >
              Don&apos;t have an account?{" "}
              <span className="text-summit-700">Create one</span>
              <ArrowRight className="mt-[2px] h-3 w-3 text-summit-700" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-8 rounded-lg bg-white px-12 pb-8 pt-12">
            <div className="flex flex-col gap-6">
              <Image
                src="/logos/HorizontalTealEdited.svg"
                alt="Summit Logo"
                height={100}
                width={100}
              />
              <h1 className="text-xl font-semibold text-summit-700">
                Create an account
              </h1>
            </div>
            <div className="flex flex-col gap-4">
              <TextField
                label={"Email"}
                input={email}
                setInput={setEmail}
                isValid={validEmail}
                errorMessage={emailErrorMessage}
                validate
                className="w-72"
              />
              <TextField
                input={newUsername}
                setInput={setNewUsername}
                isValid={newUsernameValid}
                errorMessage={newUsernameErrorMessage}
                validate
                label={"Username"}
                className="w-72"
              />
              <TextField
                input={newPassword}
                setInput={setNewPassword}
                label={"Password"}
                className="w-72"
                password
              />
              <TextField
                input={confirmPassword}
                setInput={setConfirmPassword}
                label={"Confirm Password"}
                className="w-72"
                password
              />
              <div className="flex justify-center">
                <div className="flex flex-col gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div
                      className={classNames(
                        "h-1.5 w-1.5 rounded-full",
                        newPasswordLengthIsOk
                          ? "bg-green-500"
                          : newPassword === ""
                            ? "bg-gray-400"
                            : "bg-red-500",
                      )}
                    />
                    <div
                      className={classNames(
                        newPasswordLengthIsOk
                          ? "text-green-500"
                          : newPassword === ""
                            ? "text-gray-400"
                            : "text-red-500",
                      )}
                    >
                      Must contain at least 8 characters
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={classNames(
                        "h-1.5 w-1.5 rounded-full",
                        newPasswordContainsUpper
                          ? "bg-green-500"
                          : newPassword === ""
                            ? "bg-gray-400"
                            : "bg-red-500",
                      )}
                    />
                    <div
                      className={classNames(
                        newPasswordContainsUpper
                          ? "text-green-500"
                          : newPassword === ""
                            ? "text-gray-400"
                            : "text-red-500",
                      )}
                    >
                      Must contain one uppercase letter
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={classNames(
                        "h-1.5 w-1.5 rounded-full",
                        newPasswordContainsSpecial
                          ? "bg-green-500"
                          : newPassword === ""
                            ? "bg-gray-400"
                            : "bg-red-500",
                      )}
                    />
                    <div
                      className={classNames(
                        newPasswordContainsSpecial
                          ? "text-green-500"
                          : newPassword === ""
                            ? "text-gray-400"
                            : "text-red-500",
                      )}
                    >
                      Must contain a special character (i.e. !,?,/,&,$)
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={classNames(
                        "h-1.5 w-1.5 rounded-full",
                        newPasswordMatchesConfirm
                          ? "bg-green-500"
                          : newPassword === ""
                            ? "bg-gray-400"
                            : "bg-red-500",
                      )}
                    />
                    <div
                      className={classNames(
                        newPasswordMatchesConfirm
                          ? "text-green-500"
                          : newPassword === ""
                            ? "text-gray-400"
                            : "text-red-500",
                      )}
                    >
                      Passwords must match
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              className={classNames(
                "w-full rounded-lg py-2 text-center text-sm font-semibold",
                createAccountDisabled
                  ? "bg-gray-300 text-gray-500"
                  : "bg-summit-700 text-white hover:bg-summit-700/95",
              )}
              disabled={createAccountDisabled}
              onClick={() =>
                signIn("signup", {
                  username: newUsername,
                  password: newPassword,
                  email: email,
                  redirect: true,
                  callbackUrl: "/",
                })
              }
            >
              Create account
            </button>
            <div className="flex items-center gap-2">
              <div className="h-px w-full bg-gray-300" />
              <p className="text-xs text-gray-500">or</p>
              <div className="h-px w-full bg-gray-300" />
            </div>
            <button
              className="flex justify-center gap-3 rounded-lg border border-gray-300 p-2 text-sm font-semibold hover:border-gray-400"
              onClick={() =>
                signIn("google", { redirect: true, callbackUrl: "/" })
              }
            >
              <Image
                src="/svgs/Google.svg"
                alt="Google Logo"
                height={20}
                width={20}
              />
              Sign up with Google
            </button>
            <button
              className="flex items-center justify-center gap-1 text-xs text-gray-500 underline-offset-4 hover:text-summit-700 hover:underline"
              onClick={() => {
                setRegistering(false);
                setNewUsername("");
                setNewPassword("");
                setConfirmPassword("");
                setEmail("");
              }}
            >
              Already have an account?{" "}
              <span className="text-summit-700">Sign in</span>
              <ArrowRight className="mt-[2px] h-3 w-3 text-summit-700" />
            </button>
          </div>
        )}
        <div className="flex w-full flex-col justify-between">
          <div className="flex w-full justify-end">
            <button className="flex items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline">
              <ChevronLeft className="h-6 w-6 rounded-full bg-summit-700/20 p-1" />
              Back to home
            </button>
          </div>
          <LoginCarousel />

        </div>
      </div>
    </>
  );
}
