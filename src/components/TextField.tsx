import { useState, type Dispatch, type SetStateAction } from "react";
import { Eye, EyeSlash } from "~/svgs";
import classNames from "~/utils/classNames";

function determineBorderColor(
  focused: boolean,
  isValid: boolean,
  input: string,
): string {
  if (focused) {
    // if focused and valid, sumit-700
    if (isValid) {
      return "border-summit-700 hover:border-summit-700";
    }
    // if focused and invalid but empty, sumit-700
    if (input === "") {
      return "border-summit-700 hover:border-summit-700";
    }
    // if focused and invalid and not empty, red-500
    return "border-red-500 hover:border-red-500";
  } else {
    // if not focused and valid, gray-300
    if (isValid) {
      return "border-gray-300";
    }
    // if not focused and invalid but empty, gray-300
    if (input === "") {
      return "border-gray-300";
    }
    // if not focused and invalid, red-500
    return "border-red-500 hover:border-red-500";
  }
}

export default function TextField({
  className,
  input,
  setInput,
  label,
  password = false,

  isValid = true,
  errorMessage = "",
  validate = false,

}: {
  className?: string;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  label: string;
  password?: boolean;

  isValid?: boolean;
  errorMessage?: string;
  validate?: boolean;

}) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="flex w-full flex-col gap-1">
        <div
          className={classNames(
            "flex items-center rounded-lg border px-3 py-2 hover:border-summit-300",
            className ?? "",
            determineBorderColor(focused, isValid, input),
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
          {validate && (
            <div
              className={classNames(
                "h-1.5 w-1.5 rounded-full",
                isValid ? "bg-green-500" : "bg-red-500",
                input === "" ? "hidden" : "visible",
              )}
            />
          )}
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
        {errorMessage != "" && !isValid && input != "" && (
          <div className="text-xs text-red-700">{errorMessage}</div>
        )}
      </div>
    </>
  );
}
