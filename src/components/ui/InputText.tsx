type Props = {
  value: string;
  placeholder?: string;
  onChange: (text: string) => void;
};

/**
 * テキスト入力コンポーネント
 */
export function InputText({ value, placeholder, onChange }: Props) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full max-w-[348px] border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500"
    />
  );
}
