type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

/**
 * ボタンコンポーネント
 */
export function Button({ children, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="h-10 w-20 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium rounded-md transition-colors duration-200"
    >
      {children}
    </button>
  );
}
