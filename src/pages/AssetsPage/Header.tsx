import { ToggleButton } from "@components/ToggleButton";
import TractianLogo from "@assets/logo.svg";
import GoldIcon from "@assets/icons/Gold.svg";

export default function Header() {
  return (
    <header className="bg-blue-dark px-4 py-3 flex items-center justify-between ">
      <img src={TractianLogo} alt="Tractian" />
      <div className="flex gap-2.5">
        <ToggleButton className="text-xs" toggled>
          <img src={GoldIcon} alt="Unit" /> Apex Unit
        </ToggleButton>
        <ToggleButton className="text-xs">
          <img src={GoldIcon} alt="Unit" /> Tobias Unit
        </ToggleButton>
        <ToggleButton className="text-xs">
          <img src={GoldIcon} alt="Unit" /> Jaguar Unit
        </ToggleButton>
      </div>
    </header>
  );
}
