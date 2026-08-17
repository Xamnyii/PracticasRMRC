import { StatusBar } from 'expo-status-bar';
import { LogBox, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';

export default function App() {
  const [bpm, setBpm] = useState("120");
  const [beat, setBeat] = useState(1)
  useEffect(()=> {
    const bpmNumero = parseInt(bpm, 10);
    if (!bpmNumero || bpmNumero <= 0) return;
    const msPorGolpe = 60000 / bpmNumero;
    const reloj = setInterval(() => {
      setBeat((prev) => (prev === 4 ? 1 : prev + 1));
    }, msPorGolpe);
    return () => clearInterval(reloj);

  }, [bpm]);

  

  return (
    <View style={styles.container}>
      
      <Text style ={{
        fontFamily: "monospace",
        fontSize: 100,
        fontWeight: "800",
        color: "#00ff48"

      }}
      >{beat}</Text>
      
      
      
      <Text style ={{
        fontFamily: "monospace",
        fontStyle: "italic",
        fontWeight: "500",
        color: "#e0dcdc"
      }}>Calculadora de BPM</Text>

      <TextInput 
      value={bpm}
      onChangeText={ (text: string) => setBpm(text)}
      style={{
        color: "black",
        backgroundColor: "white",
        width:200,
        padding:8,

      }}
      />


      <Pressable onPress={() => {alert(`Va a una velocidad de ${Math.round(60000 / Number(bpm))} ms por golpe`)}} style={{
        backgroundColor: "#00ff48",
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
      }}>
      <Text style = {{
        fontFamily: "Helvetica",
        fontWeight: "500",
        color: "#FFFFFF"
      }}>
      MS</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292929',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
