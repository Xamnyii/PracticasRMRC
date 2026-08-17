import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

const sonidos = {
  1: require('./assets/Sonidos/1.mp3'),
  2: require('./assets/Sonidos/2.mp3'),
  3: require('./assets/Sonidos/3.mp3'),
  4: require('./assets/Sonidos/4.mp3'),
};

export default function App() {
  const [bpm, setBpm] = useState("120");
  const [beat, setBeat] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  async function reproducirGolpe(numero: number) {
    try {
      const { sound } = await Audio.Sound.createAsync(
        sonidos[numero as keyof typeof sonidos]
      );
      await sound.playAsync();
    } catch (error) {
      console.log("Error al reproducir audio:", error);
    }
  }

  useEffect(() => {
    if (!isPlaying) return;

    const bpmNumero = parseInt(bpm, 10);
    if (!bpmNumero || bpmNumero <= 0) return;

    const msPorGolpe = 60000 / bpmNumero;
    const reloj = setInterval(() => {
      setBeat((prev) => {
        const siguiente = prev === 4 ? 1 : prev + 1;
        reproducirGolpe(siguiente);
        return siguiente;
      });
    }, msPorGolpe);

    return () => clearInterval(reloj);
  }, [bpm, isPlaying]);

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "#0d0a10", padding: 20, borderRadius: 10, borderWidth: 2, borderColor: "white" }}>
      <Text style={{
        fontFamily: "monospace",
        fontSize: 100,
        fontWeight: "800",
        color: "#00ff48"
      }}>
        {beat}
      </Text>
      
      <Text style={{
        fontFamily: "monospace",
        fontStyle: "italic",
        fontWeight: "500",
        color: "#e0dcdc"
      }}>
        Calculadora de BPM
      </Text>

      <TextInput 
        value={bpm}
        onChangeText={(text: string) => setBpm(text)}
        keyboardType="numeric"
        style={{
          color: "black",
          backgroundColor: "white",
          width: 200,
          padding: 8,
          marginVertical: 10,
        }}
      />

      <Pressable 
        onPress={() => setIsPlaying((prev) => !prev)} 
        style={{
          backgroundColor: isPlaying ? "#ff4444" : "#00ff48",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
          marginVertical: 10,
        }}
      >
        <Text style={{
          fontFamily: "Helvetica",
          fontWeight: "700",
          color: isPlaying ? "#FFFFFF" : "#000000"
        }}>
          {isPlaying ? "DETENER" : "INICIAR"}
        </Text>
      </Pressable>

      <Pressable 
        onPress={() => {
          alert(`Va a una velocidad de ${Math.round(60000 / Number(bpm))} ms por golpe`);
        }} 
        style={{
          backgroundColor: "#444444",
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{
          fontFamily: "Helvetica",
          fontWeight: "500",
          color: "#FFFFFF"
        }}>
          MS
        </Text>
      </Pressable>
      
      <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1633',
    alignItems: 'center',
    justifyContent: 'center',
  },
});