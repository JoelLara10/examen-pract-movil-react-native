import { registerRootComponent } from 'expo';
import { Slot } from 'expo-router';

function App() {
  return <Slot />; // Esto renderiza las rutas dentro de /app
}

export default registerRootComponent(App);
