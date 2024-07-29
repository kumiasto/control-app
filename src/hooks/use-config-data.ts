import { useSelector } from "react-redux";
import { RootStateType } from "../redux/store";

function useConfigData() {
  const configSwitchOptions = useSelector<
    RootStateType,
    Record<keyof RootStateType["configSwitchOptions"], boolean>
  >((state) => state.configSwitchOptions);

  const brightness = useSelector<RootStateType, number>(
    (state) => state.brightness
  );
  const timeLeft = useSelector<RootStateType, number>(
    (state) => state.timeLeft
  );

  const { duskTillDawn, nightVision, flashing } = configSwitchOptions;

  return {
    duskTillDawn,
    nightVision,
    flashing,
    brightness,
    timeLeft,
  };
}

export default useConfigData;
