import { Drawer } from "expo-router/drawer";
import CustomDrawer from "../../components/CustomDrawer";

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,

        // Drawer width (Google style)
        drawerStyle: {
          width: 300,
          backgroundColor: "#FFFFFF",
        },

        // Dim the screen behind
        overlayColor: "rgba(0,0,0,0.2)",

        // Disable swipe edge stretch
        drawerType: "front",

        // Label styles (we override with custom drawer anyway)
        drawerLabelStyle: {
          marginLeft: -10,
        },
      }}
    >
      <Drawer.Screen name="home" />
      <Drawer.Screen name="explore" />
      <Drawer.Screen name="appointments" />
      <Drawer.Screen name="reports" />
      <Drawer.Screen name="profile" />
      <Drawer.Screen name="settings" />
    </Drawer>
  );
}
