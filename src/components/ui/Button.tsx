type Props = {
  children: React.ReactNode;
};

/**
 * ボタンコンポーネント
 */
export function Button({ children }: Props) {
  return (
    <button
      type="submit"
      className="h-10 w-20 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium rounded-md transition-colors duration-200"
    >
      {children}
    </button>
  );
}
