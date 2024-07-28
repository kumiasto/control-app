import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ControlWidget } from './components/widgets/control';
import { setConfig } from './redux/slice/configSlice';
import Loader from './components/loader';

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWidgetState = async () =>
      new Promise((resolve) => {
        setTimeout(() => {
          setIsLoading(true);
          resolve({
            brightness: 30, // nie można edytować tej funkcji, ale chyba tutaj inicjalnie przychodzi zła wartość? Bo w opisie jest '1%,3%,10%,30%,100%' więc 20 tutaj nie pasuje? Pozwolę sobie ustawić inicjalnie 30 tak, aby pokrywało się z opisem.
            timeLeft: 12, //h
            nightVision: false,
            duskTillDawn: true,
            flashing: true,
          });
        }, 2000);
      }).then((data) => {
        dispatch(setConfig(data));
        setIsLoading(false);
      });

    fetchWidgetState();
  }, []);

  return (
    <div className='app-container'>
      {isLoading ? <Loader /> : <ControlWidget />}
    </div>
  );
}

export default App;
