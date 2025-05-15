import { AuthContext } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { useState } from "react";
interface USER{
  id:number,
  name:string,
  email:string,
  image:string
}
export default function RootLayout() {
  const [user,setUser] = useState<USER |undefined>(undefined);
  return (
    <AuthContext.Provider value={{user,setUser}}>
      <Stack>
        <Stack.Screen name="index" options={{headerShown:false}} />
        <Stack.Screen
          name="landing"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(auth)/SignUp"
          options={{
            headerTransparent: true,
            headerTitle: " ",
          }}
        />
        <Stack.Screen
          name="(auth)/SignIn"
          options={{
            headerTransparent: true,
            headerTitle: " ",
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="add-post/index"
          options={{
            headerTitle:'Add New Post'
          }}
        />
        <Stack.Screen
          name="add-post/addClub"
          options={{
            headerTitle:'Add New Club'
          }}
        />
        <Stack.Screen name="explore-clubs/index" options={{
          headerTitle:'Explore Club',
          headerTransparent:false
        }}/>
        <Stack.Screen name="add-event/index" options={{
          headerTitle:'Add New Event',
          headerTransparent:false
        }}/>
        <Stack.Screen name="screens/vtu" options={{
          headerShown:true,
          headerTitle:"Vtu",
          headerShadowVisible:true
        }}/>
        <Stack.Screen name="screens/smvit" options={{
          headerShown:false
        }}/>
        <Stack.Screen name="screens/aicte" options={{
          headerShown:true,
          headerTitle:'Aicte',
          headerShadowVisible:true,
        }}/>
        <Stack.Screen name="screens/smvitNotification" options={{
          headerShown:false
        }}/>
        <Stack.Screen name="screens/vtuNotification" options={{
          headerShown:true,
          headerTitle:'VTU Notifications',
        }}/>
        <Stack.Screen name="vtuScreens/examination" options={{
          headerShown:false,
          // title:"Back",
          // headerShadowVisible:false

        }}/>
        <Stack.Screen name="vtuScreens/scheme" options={{
          headerShown:false,
          // title:"Back",
          // headerShadowVisible:false
        }}/>
        <Stack.Screen name="vtuScreens/pyq" options={{
          headerShown:true,
          headerTitle:"Previous Year Paper"
        }}/>
        {/* <Stack.Screen name="aicte-screens/Notification" options={{
          headerShown:false
        }}/> */}
        <Stack.Screen name="aicte-screens" options={{
          headerShown:false
        }}/>
      </Stack>
    </AuthContext.Provider>
  );
}
