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
      className="w-full max-w-87 input-standard"
    />
  );
}
