import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <>
      <div>Signup Page</div>
      <div className="ml-4 flex max-w-xl flex-col gap-2">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-2 border-black"
          placeholder="Username"
        />
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-black"
          placeholder="password"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-black"
          placeholder="email"
        />
        <div
          className="w-max rounded-lg bg-blue-400 px-4 py-1 text-white"
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
          Sign In
        </div>
      </div>
    </>
  );
}
