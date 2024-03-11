import { useState, type Dispatch, type SetStateAction } from "react";
import { Eye, EyeSlash } from "~/svgs";
import classNames from "~/utils/classNames";

export default function TextField({
  className,
  input,
  setInput,
  label,
  password = false,
}: {
  className?: string;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  label: string;
  password?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div
        className={classNames(
          "flex rounded-lg border px-3 py-2 hover:border-summit-300",
          className ?? "",
          focused
            ? "border-summit-700 hover:border-summit-700"
            : "border-gray-300",
        )}
      >
        <input
          className="w-full border-none p-0 text-sm placeholder:text-sm placeholder:text-gray-500 focus:border-none focus:ring-0"
          onChange={(e) => setInput(e.target.value)}
          placeholder={label}
          type={password ? (showPassword ? "text" : "password") : "text"}
          value={input}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {password && (
          <div
            className="flex cursor-pointer items-center justify-center text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? (
              <EyeSlash className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </div>
        )}
      </div>
    </>
  );
}
