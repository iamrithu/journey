interface MenuItemProps {
  onclick: () => void;
  label: String;
}

const MenuItem: React.FC<MenuItemProps> = ({ onclick, label }) => {
  return (
    <div
      className="
            px-4
            rounded-xl
            py-3
            hover:bg-neutral-200
            transition
            font-semibold
    "
      onClick={onclick}
    >
      {label}
    </div>
  );
};

export default MenuItem;
