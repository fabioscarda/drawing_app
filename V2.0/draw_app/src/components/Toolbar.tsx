interface ToolbarProps {
  setColor: (color: string) => void;
  setSize: (size: number) => void;
}

function Toolbar({ setColor, setSize }: ToolbarProps) {
  return (
    <div>
      <input
        type="color"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setColor(e.target.value)
        }
      />

      <input
        type="range"
        min="1"
        max="50"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSize(Number(e.target.value))
        }
      />
    </div>
  );
}

export default Toolbar;