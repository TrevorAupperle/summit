import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const imageLoader = ({}) => {
  return `src/icons/SummitLogo.svg`;
};
export const SignInUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  return (
    <>
      <div className="bg-Summit-100 flex min-h-screen p-[48px]">
        <div className="bg-white container flex max-w-sm flex-col rounded-lg px-[48px] py-[32px] shadow-lg">
          <Image
            className=" mb-[32px] flex flex-col  justify-center gap-2"
            src="/icons/SummitLogo.svg"
            alt="Summit Logo"
            width="150"
            height="100"
          />
          <div className="container">
            <div className="text-Summit-700 mb-6 font-noto text-[20px] font-semibold">
              Create an account
            </div>
            <div className=" flex flex-col  gap-2 font-noto text-[20px]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" border-Gray-300 text-Gray-400 my-2 rounded-[8px] border-[1px] px-3 py-2 font-noto text-[14px]"
                placeholder="Email"
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-Gray-300 font my-2 rounded-[8px] border-[1px] px-3 py-2 font-noto text-[14px]"
                placeholder="Username"
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-Gray-300 font my-2 rounded-[8px] border-[1px] px-3 py-2 font-noto text-[14px] "
                placeholder="Password"
              />
              <button
                type="button"
                aria-label={
                  showPassword ? "Password Visible" : "Password Invisible."
                }
                className="text-black font-noto text-[14px] underline"
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
              >
                {showPassword ? "Hide Password" : "Show Password"}
              </button>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-Gray-300 font my-2 rounded-[8px] border-[1px] px-3 py-2 font-noto text-[14px] "
                placeholder="Confirm Password"
              />
              <div
                className="bg-blue-400 text-white w-max rounded-lg px-4 py-1 font-noto"
                onClick={() => {
                  if (!username || !password || !email)
                    return alert("Please fill in all fields");
                  if (password !== confirmPassword)
                    return alert("Passwords do not match");
                  return signIn("signup", {
                    username,
                    password,
                    email,
                    redirect: true,
                    callbackUrl: "/",
                  });
                }}
              >
                Sign up
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
