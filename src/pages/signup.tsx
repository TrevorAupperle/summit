import { signIn } from "next-auth/react";
import { useState } from "react";
import { SignInUp } from "~/components/signinup";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <>
      <SignInUp />
      {/* <div className="bg-Summit-100 flex min-h-screen ">
        <div className="bg-white container flex max-w-sm flex-col items-center justify-start">
          <div>Signup Page</div>
          <div className=" ml-4 flex max-w-xl flex-col gap-2">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-black border-2"
              placeholder="Username"
            />
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-black border-2"
              placeholder="password"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-black border-2"
              placeholder="email"
            />
            <div
              className="bg-blue-400 text-white w-max rounded-lg px-4 py-1"
              onClick={() => {
                if (!username || !password || !email)
                  return alert("Please fill in all fields");
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
      </div> */}
    </>
  );
}
