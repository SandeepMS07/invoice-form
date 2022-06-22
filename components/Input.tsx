import React from "react";

type InputProps = {
  type: string;
  register: any;
  placeholder: string;
  id: string;
  title: string;
  value?: string;
  onChange?: any;
  error?: any;
};

const Input = ({
  type,
  register,
  placeholder,
  id,
  title,
  value,
  onChange,
  error,
}: InputProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-gray-700 text-xs font-bold mb-1"
      >
        {title}
      </label>
      <input
        type={type}
        {...register}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        id={id}
        className={
          error
            ? "block bg-gray-200 border-[1px] px-7 md:px-2 py-[2px] mb-1 rounded outline-none   placeholder:text-sm placeholder:font-[400] focus:border-blue-900 focus:outline-none focus:drop-shadow-xl border-red-500"
            : "block bg-gray-200 border-[1px] px-7 md:px-2 py-[2px] mb-1 rounded outline-none border-gray-400 placeholder:text-sm placeholder:font-[400] focus:border-blue-900 focus:outline-none focus:drop-shadow-xl"
        }
      />
      <p className="text-red-600 text-xs mb-2">{error}</p>
    </div>
  );
};

export default Input;
